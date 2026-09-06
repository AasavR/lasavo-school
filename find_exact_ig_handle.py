import urllib.request
import json
import os

TOKEN_FILE = "meta_token.txt"
OUT_FILE = "exact_ig_results.txt"

def find_ig():
    if not os.path.exists(TOKEN_FILE):
        print("meta_token.txt missing")
        return

    token = open(TOKEN_FILE, "r", encoding="utf-8").read().strip()
    out = [f"Token Length: {len(token)}"]

    # Query me/accounts with all instagram fields
    url = f"https://graph.facebook.com/v19.0/me/accounts?fields=id,name,access_token,instagram_business_account{{id,username,name}},connected_instagram_account{{id,username,name}}&access_token={token}"

    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req) as res:
            pages = json.loads(res.read().decode("utf-8")).get("data", [])
            out.append(f"Discovered {len(pages)} Facebook Pages:")
            
            for p in pages:
                p_id = p.get("id")
                p_name = p.get("name")
                p_tok = p.get("access_token")
                ig_bus = p.get("instagram_business_account")
                conn_ig = p.get("connected_instagram_account")
                
                out.append(f"\nFB Page: '{p_name}' (ID: {p_id})")
                out.append(f"  ├─ instagram_business_account: {ig_bus}")
                out.append(f"  └─ connected_instagram_account: {conn_ig}")

                # Try querying with Page Access Token
                p_url = f"https://graph.facebook.com/v19.0/{p_id}?fields=instagram_business_account{{id,username,name}},connected_instagram_account{{id,username,name}}&access_token={p_tok}"
                try:
                    p_req = urllib.request.Request(p_url, headers={"User-Agent": "Mozilla/5.0"})
                    with urllib.request.urlopen(p_req) as p_res:
                        p_data = json.loads(p_res.read().decode("utf-8"))
                        out.append(f"  └─ Page Token Query: {p_data}")
                except Exception as pe:
                    out.append(f"  └─ Page Token Error: {pe}")

    except Exception as e:
        out.append(f"Error querying me/accounts: {e}")

    res_str = "\n".join(out)
    print(res_str)
    with open(OUT_FILE, "w", encoding="utf-8") as f:
        f.write(res_str)

if __name__ == "__main__":
    find_ig()
