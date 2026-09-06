import json
import os
import sys
import urllib.request
import urllib.parse
import urllib.error

# Ensure stdout uses utf-8
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

PAGES_DATA = [
    {"name": "Lasavo", "id": "101616129005771", "token": "EAAW98viOK9oBSYOPJIq3ujXeU7X2gx7zqQT2CCXykvZBsUnrjZCIyMGMgYcgZB1Sra1WgJezn33ubA5Gy8y4NhByZAKVKCaoLZC1moVigHhvqBLkZCnyvgKkLeeFYfyl4SH6VtoRd4g0FZBoGRShgckNZCtBTGimqVj3FYLnV1URdL1qEZAtR8Y7lG9DO2kv3qWX3RI6VWSt6nZAqEAxdTpLw2VoF0Uyh5U8jOShASwN68"},
    {"name": "YaariYan", "id": "101302365013124", "token": "EAAW98viOK9oBSZArlffZBSGZCZBDUAL41jcbgtKS0e0nNxwLlR7IJSMYQD3woZCLzt0wZBONnQIMVbJallGgosMAsUfFQI2tEzlfMPZCqZAtDvjw2DvqXhMLP6CWa1TrfmpalbnzupGFAAiPDn37NPkeJpsJF50OQZCZChLkfGONB15lwHw2xELM15UIZC5RGlNdvJsOIxgqEGMNUE9IFZB2Yq1DCMZBZCvBNULxu1GoQPW1UP"},
    {"name": "AA SAV", "id": "100430174985138", "token": "EAAW98viOK9oBSZA6iUySYuMTQfgkZAqQ7hxXSMWXia6OakObEeo4RyZBUpAWcSQivqEc1RJlL5Xb9SiequdU9EmJaNs4aPXGEbLmDYeuZBO1QZCZASNCEVZAmagmQ11ZBBPMZCnb5mZB4IKX3arZCxo9fjb8bTKQhaUxsHMuBQKbxXp84WBmF9MjMmZBqbR9Hy1CKJgOdwKb1BdDR3ecfdQM5ZCBR1EYPz1MeCs5FPykZBRc7o"}
]

def http_get(url):
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req) as res:
            return res.status, res.read().decode("utf-8")
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode("utf-8")
    except Exception as e:
        return 500, str(e)

def check_pages():
    print("=== CHECKING INSTAGRAM BUSINESS ACCOUNTS FOR ALL PAGES ===")
    for p in PAGES_DATA:
        url = f"https://graph.facebook.com/v19.0/{p['id']}?fields=instagram_business_account,name&access_token={p['token']}"
        status, text = http_get(url)
        print(f"\n📌 Page: '{p['name']}' (ID: {p['id']})")
        print(f"   └─ Response ({status}): {text}")

if __name__ == "__main__":
    check_pages()
