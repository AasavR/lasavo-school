import urllib.request
import json

token = open("meta_token.txt", encoding="utf-8").read().strip()
url = f"https://graph.facebook.com/v19.0/me/accounts?fields=id,name,instagram_business_account,connected_instagram_account&access_token={token}"

try:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as res:
        data = json.loads(res.read().decode("utf-8"))
        with open("result.json", "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
        print("SUCCESS! Saved to result.json")
except Exception as e:
    with open("result.json", "w", encoding="utf-8") as f:
        f.write(str(e))
    print("ERROR:", e)
