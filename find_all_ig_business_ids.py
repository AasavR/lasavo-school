import urllib.request
import urllib.error
import json
import os

TOKEN_FILE = "meta_token.txt"
OUT_FILE = "all_ig_discovery_results.txt"

def discover():
    if not os.path.exists(TOKEN_FILE):
        print("meta_token.txt not found")
        return

    token = open(TOKEN_FILE, "r", encoding="utf-8").read().strip()
    log = [f"Token Length: {len(token)}"]

    # 1. Query /me with instagram_accounts
    url1 = f"https://graph.facebook.com/v19.0/me?fields=id,name,accounts{{id,name,access_token,instagram_business_account{{id,username,name}}}},instagram_accounts{{id,username}}&access_token={token}"

    try:
        req = urllib.request.Request(url1, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req) as res:
            data = json.loads(res.read().decode("utf-8"))
            log.append("me Response:")
            log.append(json.dumps(data, indent=2))
    except urllib.error.HTTPError as e:
        log.append(f"HTTP Error {e.code}: {e.read().decode('utf-8', errors='ignore')}")
    except Exception as e:
        log.append(f"Error 1: {e}")

    # 2. Test querying Instagram Business IDs directly if known
    # Known IG IDs from previous sessions:
    # Astrolas: 17841432225471313
    ig_ids_to_test = ["17841432225471313"]

    for ig_id in ig_ids_to_test:
        ig_url = f"https://graph.facebook.com/v19.0/{ig_id}?fields=id,username,name&access_token={token}"
        try:
            req = urllib.request.Request(ig_url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req) as res:
                d = json.loads(res.read().decode("utf-8"))
                log.append(f"Direct IG Query ID {ig_id}: {d}")
        except Exception as e:
            log.append(f"Direct IG Query Error {ig_id}: {e}")

    res_str = "\n".join(log)
    print(res_str)
    with open(OUT_FILE, "w", encoding="utf-8") as f:
        f.write(res_str)

if __name__ == "__main__":
    discover()
