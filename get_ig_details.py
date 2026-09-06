import urllib.request
import json

token = open("meta_token.txt", encoding="utf-8").read().strip()
p_id = "101616129005771"

url = f"https://graph.facebook.com/v19.0/{p_id}?fields=instagram_business_account{{id,username,name}}&access_token={token}"

lines = []
try:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as res:
        data = json.loads(res.read().decode("utf-8"))
        lines.append(f"Result for Lasavo Page (ID: {p_id}):")
        lines.append(json.dumps(data, indent=2))
except Exception as e:
    lines.append(f"Error: {e}")

res_text = "\n".join(lines)
print(res_text)
with open("ig_details.txt", "w", encoding="utf-8") as f:
    f.write(res_text)
