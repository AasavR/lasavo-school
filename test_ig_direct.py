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

TOKEN = "EAAW98viOK9oBScYNRpatqdgrAgclRZCZBSvzVcVHWRW5jplDHIsHwf8LggJ9qTl4pQVUEQmznUj52GuVFnML9doxIrXeGXWDTdO4FZAan3fAz6m4dlFMIbZB2PQmlOAt9Y8HMvJmz1HUZBjaUFxqfbpk2WNAl1eF45ZAg4Hd4S7rRwQZAaSWnHLwRLZCuLCJT8SLAhZBF8dw3xX8jzMoNZCcULnMmojq5NmHCdeN4ynkivhPgOntSrJLXo9IVSZC9Iu4otFTW9VahFqifr9AbqgJOAZD"
IG_ID = "17841432225471313"  # @astrolasofficial

# Direct public image URL
IMAGE_URL = "https://picsum.photos/1080/1080.jpg"
CAPTION = "🔮 Did you know your name carries a hidden vibrational frequency? Try Astrolas Chaldean Numerology today! 💳 https://rzp.io/l/astrolas-starter #Astrolas #Chaldean"

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

def test_direct():
    print(f"=== TESTING DIRECT INSTAGRAM PUBLISHING WITH PUBLIC IMAGE URL ===")
    
    # Step 1: Create Container
    container_url = f"https://graph.facebook.com/v19.0/{IG_ID}/media"
    payload = {
        "image_url": IMAGE_URL,
        "caption": CAPTION,
        "access_token": TOKEN
    }
    
    status, text = http_post(container_url, payload)
    print(f"Step 1 Container Creation Response ({status}): {text}")
    
    if status == 200:
        creation_id = json.loads(text).get("id")
        print(f"✅ Container Created (ID: {creation_id}). Waiting 3 seconds before publishing...")
        time.sleep(3)
        
        # Step 2: Publish Container
        pub_url = f"https://graph.facebook.com/v19.0/{IG_ID}/media_publish"
        pub_status, pub_text = http_post(pub_url, {"creation_id": creation_id, "access_token": TOKEN})
        print(f"Step 2 Media Publish Response ({pub_status}): {pub_text}")
        if pub_status == 200:
            print(f"🎉 INSTAGRAM POST LIVE! Media ID: {json.loads(pub_text).get('id')}")

if __name__ == "__main__":
    test_direct()
