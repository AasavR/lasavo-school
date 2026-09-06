import urllib.request
import urllib.error
import json
import os

TOKEN_FILE = "meta_token.txt"
OUT_FILE = "pages_discovery.txt"

def discover():
    if not os.path.exists(TOKEN_FILE):
        print("meta_token.txt not found")
        return

    with open(TOKEN_FILE, "r", encoding="utf-8") as f:
        token = f.read().strip()

    url = f"https://graph.facebook.com/v19.0/me/accounts?access_token={token}"
    out = []
    
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req) as res:
            data = json.loads(res.read().decode("utf-8"))
            pages = data.get("data", [])
            out.append(f"Total Facebook Pages Found: {len(pages)}")
            
            for idx, p in enumerate(pages, 1):
                p_id = p.get("id")
                p_name = p.get("name")
                p_tok = p.get("access_token")
                out.append(f"\n[{idx}] FB Page Name: '{p_name}' | FB Page ID: {p_id}")
                
                # Check linked IG account
                ig_url = f"https://graph.facebook.com/v19.0/{p_id}?fields=instagram_business_account&access_token={p_tok}"
                try:
                    ig_req = urllib.request.Request(ig_url, headers={"User-Agent": "Mozilla/5.0"})
                    with urllib.request.urlopen(ig_req) as ig_res:
                        ig_data = json.loads(ig_res.read().decode("utf-8"))
                        ig_obj = ig_data.get("instagram_business_account")
                        if ig_obj:
                            ig_id = ig_obj.get("id")
                            # Query IG handle/username
                            u_url = f"https://graph.facebook.com/v19.0/{ig_id}?fields=username,name&access_token={token}"
                            u_req = urllib.request.Request(u_url, headers={"User-Agent": "Mozilla/5.0"})
                            with urllib.request.urlopen(u_req) as u_res:
                                u_data = json.loads(u_res.read().decode("utf-8"))
                                username = u_data.get("username", "")
                                name = u_data.get("name", "")
                                out.append(f"    └─ Linked Instagram Business Account: @{username} (ID: {ig_id}, Name: {name})")
                        else:
                            out.append("    └─ No Instagram Business Account linked to this Facebook Page.")
                except Exception as e:
                    out.append(f"    └─ IG Account Query Error: {e}")

    except Exception as e:
        out.append(f"Error querying me/accounts: {e}")

    res_text = "\n".join(out)
    print(res_text)
    with open(OUT_FILE, "w", encoding="utf-8") as f:
        f.write(res_text)

if __name__ == "__main__":
    discover()
