import urllib.request
import json

token = open("meta_token.txt", encoding="utf-8").read().strip()
lines = [f"Token length: {len(token)}"]

# 1. Test direct query to IG ID 17841432225471313
u1 = f"https://graph.facebook.com/v19.0/17841432225471313?fields=username,name&access_token={token}"
try:
    with urllib.request.urlopen(urllib.request.Request(u1, headers={"User-Agent": "Mozilla/5.0"})) as r1:
        d1 = json.loads(r1.read().decode("utf-8"))
        lines.append(f"Direct IG 17841432225471313 -> Username: @{d1.get('username')}, Name: {d1.get('name')}")
except Exception as e:
    lines.append(f"Direct IG query error: {e}")

# 2. Test me/accounts
u2 = f"https://graph.facebook.com/v19.0/me/accounts?access_token={token}"
try:
    with urllib.request.urlopen(urllib.request.Request(u2, headers={"User-Agent": "Mozilla/5.0"})) as r2:
        pages = json.loads(r2.read().decode("utf-8")).get("data", [])
        lines.append(f"Discovered {len(pages)} Facebook Pages:")
        for p in pages:
            lines.append(f"  FB Page: '{p.get('name')}' (ID: {p.get('id')})")
except Exception as e:
    lines.append(f"me/accounts error: {e}")

res_text = "\n".join(lines)
with open("final_ig_discovery.txt", "w", encoding="utf-8") as f:
    f.write(res_text)
print("DONE! Wrote to final_ig_discovery.txt")
