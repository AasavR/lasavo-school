import urllib.request
import urllib.error
import json

token = open("meta_token.txt", encoding="utf-8").read().strip()
p_id = "1222908690916687"

url = f"https://graph.facebook.com/v19.0/{p_id}?fields=id,name,access_token,instagram_business_account{{id,username,name}},connected_instagram_account{{id,username,name}}&access_token={token}"

lines = []
try:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as res:
        data = json.loads(res.read().decode("utf-8"))
        lines.append("DIRECT PAGE QUERY SUCCESS:")
        lines.append(json.dumps(data, indent=2))
except urllib.error.HTTPError as e:
    lines.append(f"HTTP Error {e.code}: {e.read().decode('utf-8', errors='ignore')}")
except Exception as e:
    lines.append(f"General Error: {e}")

res_text = "\n".join(lines)
with open("page_1222_out.txt", "w", encoding="utf-8") as f:
    f.write(res_text)
print(res_text)
