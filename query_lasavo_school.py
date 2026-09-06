import urllib.request
import json
import os

token = open("meta_token.txt", encoding="utf-8").read().strip()
page_id = "1336265312897596"  # Lasavo School Facebook Page ID from screenshot

url = f"https://graph.facebook.com/v19.0/{page_id}?fields=id,name,username,instagram_business_account,connected_instagram_account&access_token={token}"

try:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=15) as res:
        data = json.loads(res.read().decode("utf-8"))
        print("=== LASAVO SCHOOL PAGE DETAILS ===", flush=True)
        print(json.dumps(data, indent=2), flush=True)
        with open("lasavo_school_details.json", "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
except Exception as e:
    print(f"Error querying Lasavo School Page ID {page_id}: {e}", flush=True)
