import urllib.request
import json
import os

TOKEN_FILE = "meta_token.txt"
OUT_FILE = "deep_ig_results.txt"

def deep_discover():
    if not os.path.exists(TOKEN_FILE):
        print("meta_token.txt not found")
        return

    with open(TOKEN_FILE, "r", encoding="utf-8") as f:
        token = f.read().strip()

    log_lines = [f"Token Length: {len(token)}"]

    # 1. Query me/accounts with expanded fields
    fields = "id,name,username,access_token,instagram_business_account,connected_instagram_account"
    url = f"https://graph.facebook.com/v19.0/me/accounts?fields={fields}&access_token={token}"

    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req) as res:
            data = json.loads(res.read().decode("utf-8"))
            pages = data.get("data", [])
            log_lines.append(f"Discovered {len(pages)} Facebook Pages:")

            for p in pages:
                p_id = p.get("id")
                p_name = p.get("name")
                p_tok = p.get("access_token")
                ig_bus = p.get("instagram_business_account")
                conn_ig = p.get("connected_instagram_account")

                log_lines.append(f"\n📌 Page: '{p_name}' (ID: {p_id})")
                log_lines.append(f"   ├─ instagram_business_account: {ig_bus}")
                log_lines.append(f"   └─ connected_instagram_account: {conn_ig}")

                # Also test querying page ID directly with page access token
                direct_url = f"https://graph.facebook.com/v19.0/{p_id}?fields=instagram_business_account,connected_instagram_account&access_token={p_tok}"
                try:
                    d_req = urllib.request.Request(direct_url, headers={"User-Agent": "Mozilla/5.0"})
                    with urllib.request.urlopen(d_req) as d_res:
                        d_data = json.loads(d_res.read().decode("utf-8"))
                        log_lines.append(f"   └─ Direct Page Token Query: {d_data}")
                except Exception as de:
                    log_lines.append(f"   └─ Direct Query Error: {de}")

    except Exception as e:
        log_lines.append(f"me/accounts Query Error: {e}")

    result_str = "\n".join(log_lines)
    print(result_str)
    with open(OUT_FILE, "w", encoding="utf-8") as f:
        f.write(result_str)

if __name__ == "__main__":
    deep_discover()
