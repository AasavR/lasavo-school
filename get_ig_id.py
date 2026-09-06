import urllib.request
import json

token = open("meta_token.txt", encoding="utf-8").read().strip()

# 1. me/accounts
url = f"https://graph.facebook.com/v19.0/me/accounts?access_token={token}"
out = []

try:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as res:
        pages = json.loads(res.read().decode("utf-8")).get("data", [])
        out.append(f"Pages count: {len(pages)}")
        for p in pages:
            p_id = p.get("id")
            p_name = p.get("name")
            p_tok = p.get("access_token", token)
            out.append(f"PAGE: {p_name} | ID: {p_id}")

            # Query instagram_business_account
            ig_url = f"https://graph.facebook.com/v19.0/{p_id}?fields=instagram_business_account&access_token={p_tok}"
            try:
                ig_req = urllib.request.Request(ig_url, headers={"User-Agent": "Mozilla/5.0"})
                with urllib.request.urlopen(ig_req) as ig_res:
                    ig_data = json.loads(ig_res.read().decode("utf-8"))
                    out.append(f"  -> IG Object: {ig_data}")
            except Exception as ie:
                out.append(f"  -> IG Error: {ie}")
except Exception as e:
    out.append(f"General Error: {e}")

res_text = "\n".join(out)
with open("ig_id.txt", "w", encoding="utf-8") as f:
    f.write(res_text)
print("WROTE FILE ig_id.txt!")
