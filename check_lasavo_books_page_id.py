import urllib.request
import json
import os

TOKEN_FILE = "meta_token.txt"
PAGE_ID = "1222908690916687"
OUT_FILE = "lasavo_books_page_query.txt"

def check_page():
    if not os.path.exists(TOKEN_FILE):
        print("meta_token.txt missing")
        return

    token = open(TOKEN_FILE, "r", encoding="utf-8").read().strip()
    lines = [f"Token Length: {len(token)}", f"Targeting Lasavo Books Page ID: {PAGE_ID}"]

    # 1. Query Page details directly
    url1 = f"https://graph.facebook.com/v19.0/{PAGE_ID}?fields=id,name,access_token,instagram_business_account{{id,username,name}},connected_instagram_account{{id,username,name}}&access_token={token}"

    try:
        req = urllib.request.Request(url1, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req) as res:
            d = json.loads(res.read().decode("utf-8"))
            lines.append("\n=== DIRECT PAGE QUERY RESPONSE ===")
            lines.append(json.dumps(d, indent=2))
            
            ig_bus = d.get("instagram_business_account")
            if ig_bus:
                lines.append(f"\nSUCCESS! Found Instagram Business Account ID: {ig_bus.get('id')} (@{ig_bus.get('username')})")
            else:
                lines.append("\ninstagram_business_account field was None in user token call.")
    except Exception as e:
        lines.append(f"Direct Page Query Error: {e}")

    res_str = "\n".join(lines)
    print(res_str)
    with open(OUT_FILE, "w", encoding="utf-8") as f:
        f.write(res_str)

if __name__ == "__main__":
    check_page()
