import urllib.request
import json
import os

token = open("meta_token.txt", encoding="utf-8").read().strip()
url = f"https://graph.facebook.com/v19.0/me?access_token={token}"

lines = [f"Token Length: {len(token)}"]
try:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as res:
        data = json.loads(res.read().decode("utf-8"))
        lines.append(f"Token is ACTIVE! User Name: '{data.get('name')}' | ID: {data.get('id')}")
except Exception as e:
    lines.append(f"Token Check Error: {e}")

res_text = "\n".join(lines)
print(res_text)
with open("token_now.txt", "w", encoding="utf-8") as f:
    f.write(res_text)
