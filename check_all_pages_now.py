import urllib.request
import json
import os

token = open("meta_token.txt", encoding="utf-8").read().strip()
url = f"https://graph.facebook.com/v19.0/me/accounts?fields=id,name,access_token,instagram_business_account,connected_instagram_account&access_token={token}"

lines = []
try:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as res:
        data = json.loads(res.read().decode("utf-8"))
        pages = data.get("data", [])
        lines.append(f"TOTAL PAGES FOUND: {len(pages)}")
        for p in pages:
            lines.append(f"Page Name: '{p.get('name')}' | ID: {p.get('id')}")
            lines.append(f"  instagram_business_account: {p.get('instagram_business_account')}")
            lines.append(f"  connected_instagram_account: {p.get('connected_instagram_account')}")

            # Query page token directly
            p_tok = p.get("access_token", token)
            p_id = p.get("id")
            p_url = f"https://graph.facebook.com/v19.0/{p_id}?fields=instagram_business_account,connected_instagram_account&access_token={p_tok}"
            try:
                p_req = urllib.request.Request(p_url, headers={"User-Agent": "Mozilla/5.0"})
                with urllib.request.urlopen(p_req) as p_res:
                    p_data = json.loads(p_res.read().decode("utf-8"))
                    lines.append(f"  Direct Page Query: {p_data}")
            except Exception as pe:
                lines.append(f"  Direct Page Query Error: {pe}")

except Exception as e:
    lines.append(f"Query Error: {e}")

res_text = "\n".join(lines)
print(res_text)
with open("pages_detail.txt", "w", encoding="utf-8") as f:
    f.write(res_text)
