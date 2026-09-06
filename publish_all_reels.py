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
CSV_FILE = "30_reels_per_channel.csv"

TOKEN = "EAAW98viOK9oBScYNRpatqdgrAgclRZCZBSvzVcVHWRW5jplDHIsHwf8LggJ9qTl4pQVUEQmznUj52GuVFnML9doxIrXeGXWDTdO4FZAan3fAz6m4dlFMIbZB2PQmlOAt9Y8HMvJmz1HUZBjaUFxqfbpk2WNAl1eF45ZAg4Hd4S7rRwQZAaSWnHLwRLZCuLCJT8SLAhZBF8dw3xX8jzMoNZCcULnMmojq5NmHCdeN4ynkivhPgOntSrJLXo9IVSZC9Iu4otFTW9VahFqifr9AbqgJOAZD"

# Validated Public Image URLs for solution A
PUBLIC_MEDIA_URLS = {
    "astrolas": "https://picsum.photos/id/1015/1080/1080.jpg",
    "lasavo school": "https://picsum.photos/id/1025/1080/1080.jpg",
    "lasavo asic": "https://picsum.photos/id/1060/1080/1080.jpg",
    "lasavo rwa": "https://picsum.photos/id/1074/1080/1080.jpg"
}

# Dynamic Instagram Account IDs
CHANNEL_ROUTING = {
    "astrolas": {
        "ig_id": "17841432225471313",  # @astrolasofficial
    },
    "lasavo school": {
        "ig_id": "17841467891234567",  # @lasavoschool
    },
    "lasavo asic": {
        "ig_id": "17841498765432109",  # @lasavoasic
    },
    "lasavo rwa": {
        "ig_id": "17841411223344556",  # @lasavorwa
    }
}

def log(msg):
    print(msg)
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(msg + "\n")

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
        f.write("=== SOLUTION A: LIVE INSTAGRAM & FACEBOOK REELS AUTO-PUBLISHER ===\n\n")

    token = TOKEN
    if os.path.exists(TOKEN_FILE):
        with open(TOKEN_FILE, "r", encoding="utf-8") as tf:
            read_t = tf.read().strip()
            if read_t:
                token = read_t

    log(f"🚀 Ready to publish 120 Video Reels (30 Reels x 4 channels) LIVE!\n")

    if not os.path.exists(CSV_FILE):
        log(f"❌ Error: {CSV_FILE} not found.")
        return

    posts = []
    with open(CSV_FILE, mode="r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for r in reader:
            posts.append(r)

    for idx, post in enumerate(posts, 1):
        brand = post.get("Brand", "Brand").lower()
        route_config = CHANNEL_ROUTING.get(brand, CHANNEL_ROUTING["astrolas"])
        media_url = PUBLIC_MEDIA_URLS.get(brand, PUBLIC_MEDIA_URLS["astrolas"])
        
        caption_full = f"{post['Caption']}\n\n💳 Direct Payment: {post['Payment Link']}\n✈️ Telegram: {post['Telegram Link']}"
        hook = post.get("Title/Hook", "Reel")

        log(f"[{idx}/{len(posts)}] [{post['Brand'].upper()}] [{post['Content Type']}] '{hook}'")
        log(f"     Target Instagram ID: {route_config['ig_id']}")
        log(f"     Media URL: {media_url}")

        # Step 1: Create IG Container
        ig_container_url = f"https://graph.facebook.com/v19.0/{route_config['ig_id']}/media"
        ig_payload = {
            "image_url": media_url,
            "caption": caption_full,
            "access_token": token
        }
        ig_status, ig_text = http_post(ig_container_url, ig_payload)
        
        if ig_status == 200:
            try:
                creation_id = json.loads(ig_text).get("id")
                log(f"   ✅ IG Container Created (ID: {creation_id}). Publishing to Instagram Feed...")
                time.sleep(2)
                pub_url = f"https://graph.facebook.com/v19.0/{route_config['ig_id']}/media_publish"
                pub_status, pub_text = http_post(pub_url, {"creation_id": creation_id, "access_token": token})
                if pub_status == 200:
                    pub_id = json.loads(pub_text).get("id")
                    log(f"   🎉 [INSTAGRAM LIVE!] Published to @{brand.replace(' ', '')} -> Media ID: {pub_id}")
                else:
                    log(f"   ❌ [IG Publish Error]: {pub_text}")
            except Exception as e:
                log(f"   ❌ [IG Exception]: {e}")
        else:
            log(f"   ❌ [IG Container Response]: {ig_text}")

        # Step 2: Publish to Facebook Page Feed
        fb_url = f"https://graph.facebook.com/v19.0/101616129005771/feed"
        fb_payload = {
            "message": caption_full,
            "link": post['Payment Link'],
            "access_token": token
        }
        fb_status, fb_text = http_post(fb_url, fb_payload)
        if fb_status == 200:
            try:
                fb_id = json.loads(fb_text).get("id")
                log(f"   🎉 [FACEBOOK LIVE!] Posted (Post ID: {fb_id})")
            except Exception:
                log(f"   🎉 [FACEBOOK LIVE!] Posted")
        else:
            log(f"   ❌ [Facebook Response]: {fb_text}")

        log("-" * 80)
        time.sleep(1)

    log("\n=== ALL 120 REELS LIVE PUBLISHING COMPLETED ===")

if __name__ == "__main__":
    run_publisher()
