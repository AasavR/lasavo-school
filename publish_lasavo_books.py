import csv
import json
import os
import sys
import time
import urllib.request
import urllib.parse
import urllib.error

# Ensure stdout uses utf-8
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

TOKEN_FILE = "meta_token.txt"
CSV_FILE = "lasavo_books_master_content.csv"
LOG_FILE = "lasavo_books_publish_log.txt"

BASE_ASSET_URL = "https://lasavo-school.netlify.app/social_assets/"

def log(msg):
    print(msg)
    try:
        with open(LOG_FILE, "a", encoding="utf-8") as f:
            f.write(msg + "\n")
    except Exception:
        pass

def http_get(url):
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req) as res:
            return res.status, res.read().decode("utf-8")
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode("utf-8")
    except Exception as e:
        return 500, str(e)

def http_post(url, data_dict):
    try:
        encoded_data = urllib.parse.urlencode(data_dict).encode("utf-8")
        req = urllib.request.Request(url, data=encoded_data, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req) as res:
            return res.status, res.read().decode("utf-8")
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode("utf-8")
    except Exception as e:
        return 500, str(e)

def load_token():
    if os.path.exists(TOKEN_FILE):
        with open(TOKEN_FILE, "r", encoding="utf-8") as f:
            t = f.read().strip()
            if t:
                return t
    return None

def publish_lasavo_books():
    log("==================================================")
    log("   LASAVO BOOKS SOCIAL MEDIA PUBLISHING WORKFLOW  ")
    log("==================================================")
    
    token = load_token()
    if not token:
        log("ERROR: Access token missing in meta_token.txt")
        return

    # Check if CSV exists
    if not os.path.exists(CSV_FILE):
        log(f"ERROR: {CSV_FILE} not found!")
        return

    with open(CSV_FILE, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        items = list(reader)

    log(f"Loaded {len(items)} content items for Lasavo Books from {CSV_FILE}")

    # Discover Pages and IG accounts
    accounts_url = f"https://graph.facebook.com/v19.0/me/accounts?access_token={token}"
    status, text = http_get(accounts_url)
    
    pages = []
    if status == 200:
        pages = json.loads(text).get("data", [])
        log(f"Discovered {len(pages)} Facebook Pages under User Token.")
    else:
        log(f"User accounts query returned status {status}: {text}")

    target_page = None
    target_ig_id = None

    for p in pages:
        p_name = p.get("name", "")
        if "lasavo" in p_name.lower() or "book" in p_name.lower() or "school" in p_name.lower():
            target_page = p
            p_id = p.get("id")
            p_tok = p.get("access_token", token)
            # Query linked IG account
            ig_url = f"https://graph.facebook.com/v19.0/{p_id}?fields=instagram_business_account&access_token={p_tok}"
            ig_st, ig_tx = http_get(ig_url)
            if ig_st == 200:
                ig_data = json.loads(ig_tx).get("instagram_business_account", {})
                target_ig_id = ig_data.get("id")
            break

    log(f"Target FB Page: {target_page.get('name') if target_page else 'Default Account'}")
    log(f"Target IG Account ID: {target_ig_id if target_ig_id else '17841432225471313 (Default)'}")

    # Publishing Loop
    success_count = 0
    fail_count = 0

    for idx, item in enumerate(items, 1):
        content_type = item.get("Content Type", "")
        title = item.get("Title/Hook", "")
        caption = item.get("Caption", "")
        image_asset = item.get("Image Asset", "")
        image_url = BASE_ASSET_URL + image_asset

        log(f"\n--- [{idx}/{len(items)}] Publishing '{title}' ({content_type}) ---")
        log(f"Asset URL: {image_url}")

        if "Instagram" in item.get("Platform", "") or "Reel" in content_type:
            ig_id = target_ig_id or "17841432225471313"
            # Container creation
            container_url = f"https://graph.facebook.com/v19.0/{ig_id}/media"
            container_data = {
                "image_url": image_url,
                "caption": caption,
                "access_token": token
            }
            c_status, c_text = http_post(container_url, container_data)
            log(f"IG Container Response ({c_status}): {c_text}")

            if c_status == 200:
                creation_id = json.loads(c_text).get("id")
                # Publish
                pub_url = f"https://graph.facebook.com/v19.0/{ig_id}/media_publish"
                pub_data = {
                    "creation_id": creation_id,
                    "access_token": token
                }
                time.sleep(2)
                p_status, p_text = http_post(pub_url, pub_data)
                log(f"IG Publish Response ({p_status}): {p_text}")
                if p_status == 200:
                    success_count += 1
                else:
                    fail_count += 1
            else:
                fail_count += 1
        elif target_page:
            # Facebook Page Post
            p_id = target_page.get("id")
            p_tok = target_page.get("access_token", token)
            fb_url = f"https://graph.facebook.com/v19.0/{p_id}/photos"
            fb_data = {
                "url": image_url,
                "caption": caption,
                "access_token": p_tok
            }
            fb_status, fb_text = http_post(fb_url, fb_data)
            log(f"FB Photos Response ({fb_status}): {fb_text}")
            if fb_status == 200:
                success_count += 1
            else:
                fail_count += 1

    log(f"\n==================================================")
    log(f"Publishing Completed! Success: {success_count}, Failures: {fail_count}")
    log(f"==================================================")

if __name__ == "__main__":
    publish_lasavo_books()
