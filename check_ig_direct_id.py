import urllib.request
import json

token = open("meta_token.txt", encoding="utf-8").read().strip()
ig_id = "17841432225471313"

url = f"https://graph.facebook.com/v19.0/{ig_id}?fields=username,name&access_token={token}"

lines = []
try:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as res:
        data = json.loads(res.read().decode("utf-8"))
        lines.append(f"IG ID {ig_id} Username: @{data.get('username')} | Name: {data.get('name')}")
except Exception as e:
    lines.append(f"Error querying IG ID {ig_id}: {e}")

res_text = "\n".join(lines)
print(res_text)
with open("ig_id_direct.txt", "w", encoding="utf-8") as f:
    f.write(res_text)
