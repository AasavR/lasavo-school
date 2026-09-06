import urllib.request
import urllib.error
import json

token = open("meta_token.txt", encoding="utf-8").read().strip()
lines = [f"Token Length: {len(token)}"]

url = f"https://graph.facebook.com/v19.0/me/accounts?access_token={token}"

try:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as res:
        data = json.loads(res.read().decode("utf-8"))
        lines.append("me/accounts SUCCESS:")
        lines.append(json.dumps(data, indent=2))
except urllib.error.HTTPError as e:
    err_txt = e.read().decode("utf-8", errors="ignore")
    lines.append(f"HTTP Error {e.code}: {err_txt}")
except Exception as e:
    lines.append(f"General Error: {e}")

res_text = "\n".join(lines)
print(res_text)
with open("deep_token_debug.txt", "w", encoding="utf-8") as f:
    f.write(res_text)
