import json
import os
import sys
import urllib.request
import urllib.parse
import urllib.error

TOKEN_FILE = "meta_token.txt"

def http_get(url):
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req) as res:
            return res.status, res.read().decode("utf-8")
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode("utf-8")
    except Exception as e:
        return 500, str(e)

def discover_ig_ids():
    token = ""
    if os.path.exists(TOKEN_FILE):
        with open(TOKEN_FILE, "r", encoding="utf-8") as tf:
            token = tf.read().strip()
    if not token:
        print("ERROR: No token in meta_token.txt")
        return

    print("=== DYNAMIC INSTAGRAM BUSINESS ID DISCOVERY ===")
    url = f"https://graph.facebook.com/v19.0/me/accounts?access_token={token}"
    status, text = http_get(url)
    
    if status == 200:
        data = json.loads(text)
        pages = data.get("data", [])
        print(f"Found {len(pages)} Facebook Pages:")
        for p in pages:
            p_id = p.get("id")
            p_name = p.get("name")
            p_tok = p.get("access_token", token)
            print(f"Page: '{p_name}' (ID: {p_id})")
            
            ig_url = f"https://graph.facebook.com/v19.0/{p_id}?fields=instagram_business_account&access_token={p_tok}"
            ig_status, ig_text = http_get(ig_url)
            print(f"  Response ({ig_status}): {ig_text}")
    else:
        print(f"User Accounts Query Error ({status}): {text}")

if __name__ == "__main__":
    discover_ig_ids()
