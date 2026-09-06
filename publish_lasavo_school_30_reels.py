import csv
import json
import os
import sys
import time
import urllib.request
import urllib.parse
import urllib.error

TOKEN_FILE = "meta_token.txt"
CSV_FILE = "lasavo_school_30_distinct_reels.csv"
LOG_FILE = "lasavo_school_30_pub.log"
BASE_ASSET_URL = "https://lasavo-school.netlify.app/social_assets/"

IG_USER_ID = "17841430304418498"   # Instagram Business Account for @lasavoschool
FB_PAGE_ID = "1336265312897596"    # Facebook Page ID for Lasavo School

def log(msg):
    print(msg, flush=True)
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(str(msg) + "\n")
        f.flush()

def http_post(url, data_dict):
    try:
        encoded_data = urllib.parse.urlencode(data_dict).encode("utf-8")
        req = urllib.request.Request(url, data=encoded_data, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=30) as res:
            return res.status, res.read().decode("utf-8")
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode("utf-8")
    except Exception as e:
        return 500, str(e)

def run():
    with open(LOG_FILE, "w", encoding="utf-8") as f:
        f.write("=== 30 DISTINCT REELS LASAVO SCHOOL PUBLISHER ===\n")

    if not os.path.exists(TOKEN_FILE):
        log("ERROR: meta_token.txt missing!")
        return

    token = open(TOKEN_FILE, "r", encoding="utf-8").read().strip()
    log(f"Token Loaded (Length: {len(token)})")
    log(f"Target Instagram Business Account: @lasavoschool (ID: {IG_USER_ID})")
    log(f"Target Facebook Page: Lasavo School (ID: {FB_PAGE_ID})")

    if not os.path.exists(CSV_FILE):
        log(f"ERROR: {CSV_FILE} missing!")
        return

    with open(CSV_FILE, "r", encoding="utf-8") as f:
        items = list(csv.DictReader(f))

    log(f"\nStarting direct publishing of {len(items)} items to @lasavoschool on Instagram...")

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

        # 1. Create IG Container
        ig_c_url = f"https://graph.facebook.com/v19.0/{IG_USER_ID}/media"
        ig_c_data = {
            "image_url": image_url,
            "caption": caption,
            "access_token": token
        }
        c_st, c_tx = http_post(ig_c_url, ig_c_data)
        log(f"  [IG Container] Status ({c_st}): {c_tx}")

        if c_st == 200:
            creation_id = json.loads(c_tx).get("id")
            time.sleep(2)
            # 2. Publish IG Container
            ig_pub_url = f"https://graph.facebook.com/v19.0/{IG_USER_ID}/media_publish"
            p_data = {
                "creation_id": creation_id,
                "access_token": token
            }
            p_st, p_tx = http_post(ig_pub_url, p_data)
            log(f"  [IG Publish] Status ({p_st}): {p_tx}")
            if p_st == 200:
                ig_success += 1
            else:
                fail_count += 1
        else:
            fail_count += 1

        time.sleep(1.5)

    log(f"\n==================================================")
    log(f"Lasavo School Direct Publishing Complete! IG Success: {ig_success}, Failures: {fail_count}")
    log(f"==================================================")

if __name__ == "__main__":
    run()
