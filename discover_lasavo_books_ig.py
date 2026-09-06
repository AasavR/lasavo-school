import urllib.request
import urllib.error
import json
import os

TOKEN_FILE = "meta_token.txt"
OUT_FILE = "lasavo_books_ig_discovery.txt"

def discover():
    if not os.path.exists(TOKEN_FILE):
        print("meta_token.txt missing")
        return

    token = open(TOKEN_FILE, "r", encoding="utf-8").read().strip()
    lines = [f"Token Length: {len(token)}"]

    # 1. me?fields=id,name
    u_me = f"https://graph.facebook.com/v19.0/me?access_token={token}"
    try:
        with urllib.request.urlopen(urllib.request.Request(u_me, headers={"User-Agent": "Mozilla/5.0"})) as r_me:
            lines.append(f"User Info: {r_me.read().decode('utf-8')}")
    except Exception as me_err:
        lines.append(f"User Info Error: {me_err}")

    # 2. Query me/accounts
    u_acc = f"https://graph.facebook.com/v19.0/me/accounts?fields=id,name,access_token,instagram_business_account{{id,username,name}},connected_instagram_account{{id,username,name}}&access_token={token}"

    try:
        req = urllib.request.Request(u_acc, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req) as res:
            pages = json.loads(res.read().decode("utf-8")).get("data", [])
            lines.append(f"\nDiscovered {len(pages)} Facebook Pages:")
            for p in pages:
                p_id = p.get("id")
                p_name = p.get("name")
                p_tok = p.get("access_token", token)
                ig_bus = p.get("instagram_business_account")
                conn_ig = p.get("connected_instagram_account")

                lines.append(f"\nPage Name: '{p_name}' | ID: {p_id}")
                lines.append(f"  ├─ instagram_business_account: {ig_bus}")
                lines.append(f"  └─ connected_instagram_account: {conn_ig}")

                # Query Page Token directly
                p_url = f"https://graph.facebook.com/v19.0/{p_id}?fields=instagram_business_account{{id,username,name}},connected_instagram_account{{id,username,name}}&access_token={p_tok}"
                try:
                    p_req = urllib.request.Request(p_url, headers={"User-Agent": "Mozilla/5.0"})
                    with urllib.request.urlopen(p_req) as p_res:
                        p_data = json.loads(p_res.read().decode("utf-8"))
                        lines.append(f"  └─ Direct Page Token Query: {p_data}")
                except Exception as pe:
                    lines.append(f"  └─ Direct Page Token Error: {pe}")

    except Exception as e:
        lines.append(f"me/accounts Error: {e}")

    res_text = "\n".join(lines)
    with open(OUT_FILE, "w", encoding="utf-8") as f:
        f.write(res_text)
    print("SAVED lasavo_books_ig_discovery.txt")

if __name__ == "__main__":
    discover()
