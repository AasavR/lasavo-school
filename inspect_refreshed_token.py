import urllib.request
import urllib.error
import json

token = open("meta_token.txt", encoding="utf-8").read().strip()
log_lines = [f"Refreshed Token Length: {len(token)}"]

# 1. me?fields=id,name
u_me = f"https://graph.facebook.com/v19.0/me?access_token={token}"
try:
    with urllib.request.urlopen(urllib.request.Request(u_me, headers={"User-Agent": "Mozilla/5.0"})) as r_me:
        log_lines.append(f"User Info: {r_me.read().decode('utf-8')}")
except Exception as me_err:
    log_lines.append(f"User Info Error: {me_err}")

# 2. me/accounts?fields=id,name,access_token,instagram_business_account{id,username,name}
u_acc = f"https://graph.facebook.com/v19.0/me/accounts?fields=id,name,access_token,instagram_business_account{{id,username,name}}&access_token={token}"

try:
    req = urllib.request.Request(u_acc, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as res:
        pages = json.loads(res.read().decode("utf-8")).get("data", [])
        log_lines.append(f"\nDiscovered {len(pages)} Facebook Pages:")
        for p in pages:
            p_id = p.get("id")
            p_name = p.get("name")
            ig_obj = p.get("instagram_business_account")
            log_lines.append(f"  FB Page: '{p_name}' (ID: {p_id})")
            if ig_obj:
                log_lines.append(f"    └─ LINKED INSTAGRAM ACCOUNT: @{ig_obj.get('username')} (ID: {ig_obj.get('id')}, Name: {ig_obj.get('name')})")
            else:
                log_lines.append(f"    └─ instagram_business_account: None")
except Exception as e:
    log_lines.append(f"me/accounts Error: {e}")

res_text = "\n".join(log_lines)
with open("refreshed_token_inspection.txt", "w", encoding="utf-8") as f:
    f.write(res_text)
print(res_text)
