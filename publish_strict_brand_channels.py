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

BRAND_FILE_MAPPING = {
    "astrolas": {
        "file": "astrolas_master_content.csv",
        "default_ig_id": "17841432225471313"
    },
    "lasavo school": {
        "file": "lasavo_school_master_content.csv",
        "default_ig_id": None
    },
    "lasavo asic": {
        "file": "lasavo_asic_master_content.csv",
        "default_ig_id": None
    },
    "lasavo rwa": {
        "file": "lasavo_rwa_master_content.csv",
        "default_ig_id": None
    }
}

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
        f.write("=== STRICT BRAND ISOLATED PUBLISHER ===\n\n")

    token = "EAAW98viOK9oBScYNRpatqdgrAgclRZCZBSvzVcVHWRW5jplDHIsHwf8LggJ9qTl4pQVUEQmznUj52GuVFnML9doxIrXeGXWDTdO4FZAan3fAz6m4dlFMIbZB2PQmlOAt9Y8HMvJmz1HUZBjaUFxqfbpk2WNAl1eF45ZAg4Hd4S7rRwQZAaSWnHLwRLZCuLCJT8SLAhZBF8dw3xX8jzMoNZCcULnMmojq5NmHCdeN4ynkivhPgOntSrJLXo9IVSZC9Iu4otFTW9VahFqifr9AbqgJOAZD"
    if os.path.exists(TOKEN_FILE):
        with open(TOKEN_FILE, "r", encoding="utf-8") as tf:
            read_t = tf.read().strip()
            if read_t:
                token = read_t

    log("1. Discovering Linked Facebook Pages & Instagram Business IDs...")
    
    url = f"https://graph.facebook.com/v19.0/me/accounts?access_token={token}"
    status, text = http_get(url)
    
    discovered_ig_map = {}
    
    if status == 200:
        pages = json.loads(text).get("data", [])
        log(f"Found {len(pages)} Facebook Pages:")
        for p in pages:
            p_id = p.get("id")
            p_name = p.get("name")
            p_tok = p.get("access_token", token)
            
            ig_url = f"https://graph.facebook.com/v19.0/{p_id}?fields=instagram_business_account&access_token={p_tok}"
            ig_status, ig_text = http_get(ig_url)
            
            ig_id = None
            if ig_status == 200:
                try:
                    ig_id = json.loads(ig_text).get("instagram_business_account", {}).get("id")
                except Exception:
                    pass
            
            log(f" 📌 Page '{p_name}' (ID: {p_id}) -> Linked IG ID: {ig_id}")
            discovered_ig_map[p_name.lower()] = {"page_id": p_id, "page_token": p_tok, "ig_id": ig_id}

    # Process Lasavo School CSV strictly to Lasavo School
    school_csv = BRAND_FILE_MAPPING["lasavo school"]["file"]
    if os.path.exists(school_csv):
        posts = []
        with open(school_csv, mode="r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for r in reader:
                posts.append(r)
                
        log(f"\n🎓 Processing {len(posts)} Lasavo School Posts STRICTLY to Lasavo School Channel...")
        for idx, post in enumerate(posts, 1):
            target_ig = discovered_ig_map.get("lasavo school", {}).get("ig_id") or "17841467891234567"
            media_url = "https://picsum.photos/id/1025/1080/1080.jpg"
            caption_full = f"{post['Caption']}\n\n💳 Direct Payment: {post['Payment Link']}\n✈️ Telegram: {post['Telegram Link']}"
            
            log(f"[{idx}/{len(posts)}] [LASAVO SCHOOL] '{post.get('Title/Hook', 'Reel')}' -> Target IG ID: {target_ig}")
            
            ig_container_url = f"https://graph.facebook.com/v19.0/{target_ig}/media"
            ig_payload = {"image_url": media_url, "caption": caption_full, "access_token": token}
            ig_status, ig_text = http_post(ig_container_url, ig_payload)
            
            if ig_status == 200:
                creation_id = json.loads(ig_text).get("id")
                time.sleep(2)
                pub_url = f"https://graph.facebook.com/v19.0/{target_ig}/media_publish"
                pub_status, pub_text = http_post(pub_url, {"creation_id": creation_id, "access_token": token})
                if pub_status == 200:
                    log(f"   🎉 [LASAVO SCHOOL LIVE!] Published to @lasavoschool -> ID: {json.loads(pub_text).get('id')}")
                else:
                    log(f"   ❌ [IG Publish Response]: {pub_text}")
            else:
                log(f"   ❌ [IG Container Response]: {ig_text}")

            time.sleep(1)

    log("\n=== STRICT BRAND ISOLATED PUBLISHING COMPLETED ===")

if __name__ == "__main__":
    run_publisher()
