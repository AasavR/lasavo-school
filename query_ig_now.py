import urllib.request
import urllib.error
import json

token = open("meta_token.txt", encoding="utf-8").read().strip()
log = [f"Token Length: {len(token)}"]

url = f"https://graph.facebook.com/v19.0/me/accounts?fields=id,name,access_token,instagram_business_account{{id,username,name}},connected_instagram_account{{id,username,name}}&access_token={token}"

try:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as res:
        pages = json.loads(res.read().decode("utf-8")).get("data", [])
        log.append(f"Pages count: {len(pages)}")
        for p in pages:
            p_id = p.get("id")
            p_name = p.get("name")
            p_tok = p.get("access_token")
            log.append(f"Page Name: '{p_name}' | ID: {p_id}")
            log.append(f"  instagram_business_account: {p.get('instagram_business_account')}")
            log.append(f"  connected_instagram_account: {p.get('connected_instagram_account')}")

            # Direct page token query
            p_url = f"https://graph.facebook.com/v19.0/{p_id}?fields=instagram_business_account,connected_instagram_account&access_token={p_tok}"
            try:
                p_req = urllib.request.Request(p_url, headers={"User-Agent": "Mozilla/5.0"})
                with urllib.request.urlopen(p_req) as p_res:
                    p_data = json.loads(p_res.read().decode("utf-8"))
                    log.append(f"  Direct Page Token Response: {p_data}")
            except Exception as pe:
                log.append(f"  Direct Page Token Error: {pe}")
except Exception as e:
    log.append(f"Query Error: {e}")

res_text = "\n".join(log)
with open("query_ig_now.txt", "w", encoding="utf-8") as f:
    f.write(res_text)
print("SUCCESSFULLY WROTE query_ig_now.txt")
