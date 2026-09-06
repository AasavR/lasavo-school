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
LOG_FILE = "master_publishing_results.txt"
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

def run_master():
    with open(LOG_FILE, "w", encoding="utf-8") as f:
        f.write("=== LASAVO BOOKS MASTER FB & IG PUBLISHER ===\n")

    if not os.path.exists(TOKEN_FILE):
        log("ERROR: meta_token.txt not found!")
        return

    with open(TOKEN_FILE, "r", encoding="utf-8") as f:
        token = f.read().strip()

    log(f"Token Loaded (Length: {len(token)})")

    # Step 1: Discover Pages and IG Accounts
    accounts_url = f"https://graph.facebook.com/v19.0/me/accounts?fields=id,name,access_token,instagram_business_account{{id,username,name}}&access_token={token}"
    status, text = http_get(accounts_url)

    if status != 200:
        log(f"ERROR querying me/accounts ({status}): {text}")
        return

    pages = json.loads(text).get("data", [])
    log(f"Discovered {len(pages)} Facebook Pages under User Token:")

    target_page = None
    target_ig_id = None
    target_ig_username = None

    for p in pages:
        p_name = p.get("name", "")
        p_id = p.get("id")
        ig_obj = p.get("instagram_business_account")
        log(f" - Page: '{p_name}' (ID: {p_id}) | IG: {ig_obj}")

        if "lasavo" in p_name.lower():
            target_page = p
            if ig_obj:
                target_ig_id = ig_obj.get("id")
                target_ig_username = ig_obj.get("username")

    if not target_page and pages:
        target_page = pages[0]

    p_id = target_page.get("id")
    p_name = target_page.get("name")
    p_tok = target_page.get("access_token", token)

    log(f"\nSELECTED FACEBOOK PAGE: '{p_name}' (ID: {p_id})")
    if target_ig_id:
        log(f"SELECTED INSTAGRAM BUSINESS ACCOUNT: @{target_ig_username} (ID: {target_ig_id})")
    else:
        log("NOTE: No direct IG Business ID returned by Graph API for this token; publishing to Facebook Page pipeline.")

    if not os.path.exists(CSV_FILE):
        log(f"ERROR: {CSV_FILE} not found!")
        return

    with open(CSV_FILE, "r", encoding="utf-8") as f:
        items = list(csv.DictReader(f))

    log(f"\nStarting publishing of {len(items)} master items...")

    fb_success = 0
    ig_success = 0
    fail_count = 0

    for idx, item in enumerate(items, 1):
        content_type = item.get("Content Type", "")
        title = item.get("Title/Hook", "")
        caption = item.get("Caption", "")
        image_asset = item.get("Image Asset", "")
        image_url = BASE_ASSET_URL + image_asset

        log(f"\n[{idx}/{len(items)}] Publishing '{title}' ({content_type})")
        log(f"Asset URL: {image_url}")

        # 1. Publish to Facebook Page
        fb_photo_url = f"https://graph.facebook.com/v19.0/{p_id}/photos"
        fb_data = {
            "url": image_url,
            "message": caption,
            "access_token": p_tok
        }
        fb_st, fb_tx = http_post(fb_photo_url, fb_data)
        log(f"  FB Post Status ({fb_st}): {fb_tx}")
        if fb_st == 200:
            fb_success += 1

        # 2. Publish to Instagram if ID is available
        if target_ig_id:
            c_url = f"https://graph.facebook.com/v19.0/{target_ig_id}/media"
            c_data = {
                "image_url": image_url,
                "caption": caption,
                "access_token": token
            }
            c_st, c_tx = http_post(c_url, c_data)
            log(f"  IG Container Status ({c_st}): {c_tx}")
            if c_st == 200:
                creation_id = json.loads(c_tx).get("id")
                time.sleep(2)
                pub_url = f"https://graph.facebook.com/v19.0/{target_ig_id}/media_publish"
                p_data = {"creation_id": creation_id, "access_token": token}
                p_st, p_tx = http_post(pub_url, p_data)
                log(f"  IG Publish Status ({p_st}): {p_tx}")
                if p_st == 200:
                    ig_success += 1

        time.sleep(1)

    log(f"\n==================================================")
    log(f"Master Run Completed! FB Posts Published: {fb_success}, IG Posts Published: {ig_success}")
    log(f"==================================================")

if __name__ == "__main__":
    run_master()
