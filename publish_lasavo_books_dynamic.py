import csv
import json
import os
import sys
import time
import urllib.request
import urllib.parse
import urllib.error

TOKEN_FILE = "meta_token.txt"
CSV_FILE = "lasavo_books_master_content.csv"
LOG_FILE = "lasavo_books_dynamic_pub.log"
BASE_ASSET_URL = "https://lasavo-school.netlify.app/social_assets/"

def log(msg):
    print(msg)
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(str(msg) + "\n")

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

def run():
    with open(LOG_FILE, "w", encoding="utf-8") as f:
        f.write("=== LASAVO BOOKS FB & IG PUBLISHER ===\n")

    if not os.path.exists(TOKEN_FILE):
        log("ERROR: meta_token.txt not found!")
        return

    with open(TOKEN_FILE, "r", encoding="utf-8") as f:
        token = f.read().strip()

    # Query Pages
    accounts_url = f"https://graph.facebook.com/v19.0/me/accounts?access_token={token}"
    status, text = http_get(accounts_url)

    if status != 200:
        log(f"ERROR: Unable to query Meta pages ({status}): {text}")
        return

    pages = json.loads(text).get("data", [])
    log(f"Discovered {len(pages)} Facebook Pages under User Token:")

    lasavo_page = None
    for p in pages:
        p_name = p.get("name", "")
        log(f" - Page: '{p_name}' (ID: {p.get('id')})")
        if "lasavo" in p_name.lower():
            lasavo_page = p

    if not lasavo_page and pages:
        lasavo_page = pages[0]

    if not lasavo_page:
        log("ERROR: No Facebook Pages found under token.")
        return

    p_id = lasavo_page.get("id")
    p_name = lasavo_page.get("name")
    p_tok = lasavo_page.get("access_token", token)

    log(f"\nSELECTED FACEBOOK PAGE: '{p_name}' (ID: {p_id})")

    # Check linked IG account
    ig_url = f"https://graph.facebook.com/v19.0/{p_id}?fields=instagram_business_account&access_token={p_tok}"
    ig_status, ig_text = http_get(ig_url)
    ig_id = None
    if ig_status == 200:
        ig_obj = json.loads(ig_text).get("instagram_business_account")
        if ig_obj:
            ig_id = ig_obj.get("id")
            log(f"Linked Instagram Business Account ID: {ig_id}")

    if not os.path.exists(CSV_FILE):
        log(f"ERROR: {CSV_FILE} not found!")
        return

    with open(CSV_FILE, "r", encoding="utf-8") as f:
        items = list(csv.DictReader(f))

    log(f"\nStarting publishing of {len(items)} items to '{p_name}'...")

    success_count = 0
    fail_count = 0

    for idx, item in enumerate(items, 1):
        content_type = item.get("Content Type", "")
        title = item.get("Title/Hook", "")
        caption = item.get("Caption", "")
        image_asset = item.get("Image Asset", "")
        image_url = BASE_ASSET_URL + image_asset

        log(f"\n[{idx}/{len(items)}] Publishing '{title}' ({content_type})")
        log(f"Asset URL: {image_url}")

        if ig_id:
            # Publish to Instagram
            container_url = f"https://graph.facebook.com/v19.0/{ig_id}/media"
            c_data = {
                "image_url": image_url,
                "caption": caption,
                "access_token": token
            }
            c_status, c_text = http_post(container_url, c_data)
            log(f"  IG Container Response ({c_status}): {c_text}")

            if c_status == 200:
                creation_id = json.loads(c_text).get("id")
                time.sleep(2)
                pub_url = f"https://graph.facebook.com/v19.0/{ig_id}/media_publish"
                p_data = {
                    "creation_id": creation_id,
                    "access_token": token
                }
                p_status, p_text = http_post(pub_url, p_data)
                log(f"  IG Publish Response ({p_status}): {p_text}")
                if p_status == 200:
                    success_count += 1
                else:
                    fail_count += 1
            else:
                fail_count += 1
        else:
            # Publish to Facebook Page
            fb_photo_url = f"https://graph.facebook.com/v19.0/{p_id}/photos"
            fb_data = {
                "url": image_url,
                "message": caption,
                "access_token": p_tok
            }
            fb_status, fb_text = http_post(fb_photo_url, fb_data)
            log(f"  FB Post Response ({fb_status}): {fb_text}")
            if fb_status == 200:
                success_count += 1
            else:
                fail_count += 1

        time.sleep(1)

    log(f"\n==================================================")
    log(f"Publishing Complete! Success: {success_count}, Failed: {fail_count}")
    log(f"==================================================")

if __name__ == "__main__":
    run()
