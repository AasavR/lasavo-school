import urllib.request
import urllib.error
import json

token = open("meta_token.txt", encoding="utf-8").read().strip()
log = []

# 1. Fetch Pages and Page Tokens
url = f"https://graph.facebook.com/v19.0/me/accounts?fields=id,name,access_token&access_token={token}"

try:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as res:
        pages = json.loads(res.read().decode("utf-8")).get("data", [])
        log.append(f"Found {len(pages)} Pages:")
        
        for p in pages:
            p_id = p.get("id")
            p_name = p.get("name")
            p_tok = p.get("access_token")
            log.append(f"\n--- PAGE: '{p_name}' (ID: {p_id}) ---")

            # Query Page fields with Page Access Token
            p_url = f"https://graph.facebook.com/v19.0/{p_id}?fields=instagram_business_account,connected_instagram_account,page_backed_instagram_accounts&access_token={p_tok}"
            try:
                p_req = urllib.request.Request(p_url, headers={"User-Agent": "Mozilla/5.0"})
                with urllib.request.urlopen(p_req) as p_res:
                    p_data = json.loads(p_res.read().decode("utf-8"))
                    log.append(f"Page Token Response: {json.dumps(p_data, indent=2)}")
            except Exception as pe:
                log.append(f"Page Token Query Error: {pe}")

except Exception as e:
    log.append(f"Error: {e}")

res_text = "\n".join(log)
with open("page_tokens_ig.txt", "w", encoding="utf-8") as f:
    f.write(res_text)
print("SAVED page_tokens_ig.txt")
