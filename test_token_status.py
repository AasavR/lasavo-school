import urllib.request
import urllib.error
import json
import os

TOKEN_FILE = "meta_token.txt"
OUT_FILE = "token_result.txt"

def check_token():
    out = []
    if not os.path.exists(TOKEN_FILE):
        out.append("meta_token.txt does not exist.")
    else:
        with open(TOKEN_FILE, "r", encoding="utf-8") as f:
            token = f.read().strip()

        out.append(f"Token length: {len(token)}")
        url = f"https://graph.facebook.com/v19.0/me?access_token={token}"
        
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req) as res:
                out.append("Status 200 SUCCESS:")
                out.append(res.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            out.append(f"HTTP Error {e.code}:")
            out.append(e.read().decode("utf-8"))
        except Exception as e:
            out.append(f"General Error: {e}")

    res_str = "\n".join(out)
    print(res_str)
    with open(OUT_FILE, "w", encoding="utf-8") as f:
        f.write(res_str)

if __name__ == "__main__":
    check_token()
