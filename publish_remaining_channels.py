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
    sys.stdout.reconfigure(encoding="utf-8")

TOKEN_FILE = "meta_token.txt"
LOG_FILE = "publish_results.txt"

# 3 Remaining Independent Brand Channels (Astrolas explicitly SKIPPED as it reached 84 posts)
REMAINING_BRANDS = [
    {
        "name": "Lasavo School",
        "csv_file": "lasavo_school_master_content.csv",
        "handle": "@lasavoschool",
        "keywords": ["lasavo school", "classroom", "avatar teacher", "parent tms", "stem", "education"],
        "media_url": "https://picsum.photos/id/1062/1080/1920.jpg"
    },
    {
        "name": "Lasavo ASIC",
        "csv_file": "lasavo_asic_master_content.csv",
        "handle": "@lasavoasic",
        "keywords": ["lasavo asic", "compute node", "hardware", "liquid cooling", "datacenter", "bim", "cad"],
        "media_url": "https://picsum.photos/id/1060/1080/1920.jpg"
    },
    {
        "name": "Lasavo RWA",
        "csv_file": "lasavo_rwa_master_content.csv",
        "handle": "@lasavorwa",
        "keywords": ["lasavo rwa", "tokenization", "proof of reserve", "fractional", "otc", "escrow"],
        "media_url": "https://picsum.photos/id/1074/1080/1920.jpg"
    }
]

def log(msg):
    print(msg)
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(msg + "\n")

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

def run_publisher():
    with open(LOG_FILE, "w", encoding="utf-8") as f:
        f.write("=== UNIFORM PUBLISHER FOR REMAINING 3 CHANNELS (ASTROLAS SKIPPED) ===\n\n")

    token = "EAAW98viOK9oBScYNRpatqdgrAgclRZCZBSvzVcVHWRW5jplDHIsHwf8LggJ9qTl4pQVUEQmznUj52GuVFnML9doxIrXeGXWDTdO4FZAan3fAz6m4dlFMIbZB2PQmlOAt9Y8HMvJmz1HUZBjaUFxqfbpk2WNAl1eF45ZAg4Hd4S7rRwQZAaSWnHLwRLZCuLCJT8SLAhZBF8dw3xX8jzMoNZCcULnMmojq5NmHCdeN4ynkivhPgOntSrJLXo9IVSZC9Iu4otFTW9VahFqifr9AbqgJOAZD"
    if os.path.exists(TOKEN_FILE):
        with open(TOKEN_FILE, "r", encoding="utf-8") as tf:
            read_t = tf.read().strip()
            if read_t:
                token = read_t

    log("1. Authenticating & Discovering Connected Facebook Pages & Instagram IDs...")
    
    url = f"https://graph.facebook.com/v19.0/me/accounts?fields=id,name,access_token,instagram_business_account&access_token={token}"
    status, text = http_get(url)
    
    page_ig_map = {}
    
    if status == 200:
        pages = json.loads(text).get("data", [])
        log(f"✅ Found {len(pages)} Facebook Pages:")
        for p in pages:
            p_id = p.get("id")
            p_name = p.get("name")
            p_tok = p.get("access_token", token)
            ig_obj = p.get("instagram_business_account", {})
            ig_id = ig_obj.get("id") if isinstance(ig_obj, dict) else None
            
            log(f" 📌 Facebook Page '{p_name}' (ID: {p_id}) -> Linked IG ID: {ig_id}")
            page_ig_map[p_name.lower()] = {"page_id": p_id, "page_token": p_tok, "ig_id": ig_id}
    else:
        log(f"⚠️ Account Query ({status}): {text}")

    log("\n🛑 STATUS: 'Astrolas' (@astrolasofficial) is EXPLICITLY SKIPPED as requested (reached 84 posts).")
    log("🚀 Launching Uniform Publishing for: Lasavo School, Lasavo ASIC, and Lasavo RWA...\n")

    for brand_info in REMAINING_BRANDS:
        b_name = brand_info["name"]
        csv_file = brand_info["csv_file"]
        handle = brand_info["handle"]
        media_url = brand_info["media_url"]
        
        log(f"\n================================================================================")
        log(f"🎓 UNIFORM BATCH: Starting Live Publishing for '{b_name.upper()}' ({handle})")
        log(f"================================================================================")

        if not os.path.exists(csv_file):
            log(f"⚠️ CSV file {csv_file} not found. Skipping...")
            continue

        posts = []
        with open(csv_file, mode="r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for r in reader:
                posts.append(r)

        log(f"Loaded {len(posts)} posts for '{b_name}'...")

        # Match connected IG ID and Page ID
        matched_info = page_ig_map.get(b_name.lower(), {})
        target_ig_id = matched_info.get("ig_id")
        target_page_id = matched_info.get("page_id")
        target_page_token = matched_info.get("page_token", token)

        for idx, post in enumerate(posts, 1):
            caption_full = f"{post['Caption']}\n\n💳 Direct Payment: {post['Payment Link']}\n✈️ Telegram: {post['Telegram Link']}"
            hook = post.get("Title/Hook", "Reel")

            log(f"[{idx}/{len(posts)}] [{b_name.upper()}] [{post.get('Content Type', 'Reel')}] '{hook}'")
            log(f"     Target Instagram Handle: {handle} (IG ID: {target_ig_id})")
            log(f"     Target Facebook Page ID: {target_page_id}")
            log(f"     Media URL: {media_url}")

            # A. Publish to Instagram (if IG ID linked)
            if target_ig_id:
                ig_container_url = f"https://graph.facebook.com/v19.0/{target_ig_id}/media"
                ig_payload = {"image_url": media_url, "caption": caption_full, "access_token": target_page_token}
                ig_status, ig_text = http_post(ig_container_url, ig_payload)
                
                if ig_status == 200:
                    try:
                        creation_id = json.loads(ig_text).get("id")
                        log(f"   ✅ IG Container Created (ID: {creation_id}). Publishing to {handle}...")
                        time.sleep(2)
                        pub_url = f"https://graph.facebook.com/v19.0/{target_ig_id}/media_publish"
                        pub_status, pub_text = http_post(pub_url, {"creation_id": creation_id, "access_token": target_page_token})
                        if pub_status == 200:
                            pub_id = json.loads(pub_text).get("id")
                            log(f"   🎉 [{b_name.upper()} INSTAGRAM LIVE!] Published to {handle} -> Media ID: {pub_id}")
                        else:
                            log(f"   ❌ [IG Publish Response]: {pub_text}")
                    except Exception as e:
                        log(f"   ❌ [IG Exception]: {e}")
                else:
                    log(f"   ❌ [IG Container Response]: {ig_text}")
            else:
                log(f"   ℹ️ Note: Instagram ID for '{b_name}' pending page link. Publishing to FB Page...")

            # B. Publish to dedicated Facebook Page
            if target_page_id:
                fb_url = f"https://graph.facebook.com/v19.0/{target_page_id}/feed"
                fb_payload = {
                    "message": caption_full,
                    "link": post['Payment Link'],
                    "access_token": target_page_token
                }
                fb_status, fb_text = http_post(fb_url, fb_payload)
                if fb_status == 200:
                    try:
                        fb_id = json.loads(fb_text).get("id")
                        log(f"   🎉 [{b_name.upper()} FACEBOOK LIVE!] Posted to Page ID {target_page_id} (Post ID: {fb_id})")
                    except Exception:
                        log(f"   🎉 [{b_name.upper()} FACEBOOK LIVE!] Posted to Page")
                else:
                    log(f"   ❌ [Facebook Response]: {fb_text}")

            log("-" * 80)
            time.sleep(1)

    log("\n=== UNIFORM PUBLISHING FOR REMAINING 3 CHANNELS COMPLETED ===")

if __name__ == "__main__":
    run_publisher()
