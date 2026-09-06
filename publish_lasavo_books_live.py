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
LOG_FILE = "lasavo_books_live_run.txt"
BASE_ASSET_URL = "https://lasavo-school.netlify.app/social_assets/"

def log(msg):
    print(msg)
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(str(msg) + "\n")

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
        f.write("--- LIVE LASAVO BOOKS PUBLISHING ---\n")

    if not os.path.exists(TOKEN_FILE):
        log("ERROR: meta_token.txt not found")
        return

    with open(TOKEN_FILE, "r", encoding="utf-8") as f:
        token = f.read().strip()

    if not os.path.exists(CSV_FILE):
        log(f"ERROR: {CSV_FILE} not found")
        return

    with open(CSV_FILE, "r", encoding="utf-8") as f:
        items = list(csv.DictReader(f))

    log(f"Loaded {len(items)} items from {CSV_FILE}")
    ig_id = "17841432225471313" # Verified Instagram Business Account ID

    success = 0
    fail = 0

    for idx, item in enumerate(items, 1):
        content_type = item.get("Content Type", "")
        title = item.get("Title/Hook", "")
        caption = item.get("Caption", "")
        image_asset = item.get("Image Asset", "")
        image_url = BASE_ASSET_URL + image_asset

        log(f"\n[{idx}/{len(items)}] Publishing '{title}' ({content_type})")
        log(f"Asset: {image_url}")

        if "Instagram" in item.get("Platform", "") or "Reel" in content_type:
            # 1. Create Media Container
            container_url = f"https://graph.facebook.com/v19.0/{ig_id}/media"
            c_data = {
                "image_url": image_url,
                "caption": caption,
                "access_token": token
            }
            c_status, c_text = http_post(container_url, c_data)
            log(f"Container Status: {c_status} -> Response: {c_text}")

            if c_status == 200:
                creation_id = json.loads(c_text).get("id")
                time.sleep(2)
                # 2. Publish Container
                pub_url = f"https://graph.facebook.com/v19.0/{ig_id}/media_publish"
                p_data = {
                    "creation_id": creation_id,
                    "access_token": token
                }
                p_status, p_text = http_post(pub_url, p_data)
                log(f"Publish Status: {p_status} -> Media ID: {p_text}")
                if p_status == 200:
                    success += 1
                else:
                    fail += 1
            else:
                fail += 1

        time.sleep(1)

    log(f"\nFinished! Success: {success}, Failed: {fail}")

if __name__ == "__main__":
    run()
