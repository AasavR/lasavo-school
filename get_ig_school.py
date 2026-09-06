import urllib.request
import json

token = open("meta_token.txt", encoding="utf-8").read().strip()
ig_id = "17841430304418498"

url = f"https://graph.facebook.com/v19.0/{ig_id}?fields=id,username,name,profile_picture_url&access_token={token}"

try:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=15) as res:
        data = json.loads(res.read().decode("utf-8"))
        print("=== INSTAGRAM ACCOUNT DETAILS ===", flush=True)
        print(json.dumps(data, indent=2), flush=True)
except Exception as e:
    print(f"Error querying IG ID {ig_id}: {e}", flush=True)
