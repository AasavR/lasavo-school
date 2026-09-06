import json
import os
import sys
import urllib.request
import urllib.parse
import urllib.error

# Ensure stdout uses utf-8
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

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

def query_all():
    token = "EAAW98viOK9oBScYNRpatqdgrAgclRZCZBSvzVcVHWRW5jplDHIsHwf8LggJ9qTl4pQVUEQmznUj52GuVFnML9doxIrXeGXWDTdO4FZAan3fAz6m4dlFMIbZB2PQmlOAt9Y8HMvJmz1HUZBjaUFxqfbpk2WNAl1eF45ZAg4Hd4S7rRwQZAaSWnHLwRLZCuLCJT8SLAhZBF8dw3xX8jzMoNZCcULnMmojq5NmHCdeN4ynkivhPgOntSrJLXo9IVSZC9Iu4otFTW9VahFqifr9AbqgJOAZD"
    if os.path.exists(TOKEN_FILE):
        with open(TOKEN_FILE, "r", encoding="utf-8") as tf:
            read_t = tf.read().strip()
            if read_t:
                token = read_t

    print("=== QUERYING ALL CONNECTED INSTAGRAM & FACEBOOK ACCOUNTS ===")
    
    # 1. Query /me/accounts (Pages)
    pages_url = f"https://graph.facebook.com/v19.0/me/accounts?fields=id,name,access_token,instagram_business_account&access_token={token}"
    status, text = http_get(pages_url)
    print(f"Pages API Status ({status}): {text}")
    
    # 2. Query /me (Direct User/Page Info)
    me_url = f"https://graph.facebook.com/v19.0/me?fields=id,name,instagram_business_account&access_token={token}"
    me_status, me_text = http_get(me_url)
    print(f"Me API Status ({me_status}): {me_text}")

if __name__ == "__main__":
    query_all()
