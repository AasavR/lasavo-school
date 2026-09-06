import urllib.request
import json
import os

token = open("meta_token.txt", encoding="utf-8").read().strip()
url = f"https://graph.facebook.com/v19.0/me/accounts?fields=id,name,access_token,instagram_business_account{{id,username,name}},connected_instagram_account{{id,username,name}}&access_token={token}"

out = [f"Token Length: {len(token)}"]

try:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as res:
        data = json.loads(res.read().decode("utf-8"))
        pages = data.get("data", [])
        out.append(f"Pages count: {len(pages)}")
        for p in pages:
            p_id = p.get("id")
            p_name = p.get("name")
            p_tok = p.get("access_token")
            out.append(f"Page Name: '{p_name}' | ID: {p_id}")
            out.append(f"  instagram_business_account: {p.get('instagram_business_account')}")
            out.append(f"  connected_instagram_account: {p.get('connected_instagram_account')}")

            # Try page token query for instagram_business_account
            p_url = f"https://graph.facebook.com/v19.0/{p_id}?fields=instagram_business_account{{id,username,name}}&access_token={p_tok}"
            try:
                p_req = urllib.request.Request(p_url, headers={"User-Agent": "Mozilla/5.0"})
                with urllib.request.urlopen(p_req) as p_res:
                    p_data = json.loads(p_res.read().decode("utf-8"))
                    out.append(f"  Page Token Response: {p_data}")
            except Exception as pe:
                out.append(f"  Page Token Error: {pe}")
except Exception as e:
    out.append(f"Query Error: {e}")

res_text = "\n".join(out)
with open("direct_ig_out.txt", "w", encoding="utf-8") as f:
    f.write(res_text)
print("SAVED direct_ig_out.txt!")
