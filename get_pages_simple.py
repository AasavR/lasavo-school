import urllib.request
import urllib.error
import json

token = open("meta_token.txt", encoding="utf-8").read().strip()
url = f"https://graph.facebook.com/v19.0/me/accounts?access_token={token}"

lines = []
try:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as res:
        data = json.loads(res.read().decode("utf-8"))
        pages = data.get("data", [])
        lines.append(f"Found {len(pages)} Facebook Pages:")
        for p in pages:
            lines.append(f"Page Name: '{p.get('name')}' | ID: {p.get('id')}")
except urllib.error.HTTPError as e:
    err_body = e.read().decode("utf-8", errors="ignore")
    lines.append(f"HTTP Error {e.code}: {err_body}")
except Exception as e:
    lines.append(f"General Error: {e}")

res_text = "\n".join(lines)
print(res_text)
with open("simple_pages.txt", "w", encoding="utf-8") as out:
    out.write(res_text)
