import urllib.request
import urllib.error

url = "https://lasavo-school.netlify.app/social_assets/lasavo_books_holographic_library.jpg"
out = []
try:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as res:
        out.append(f"HTTP Status: {res.status}")
        out.append(f"Content-Type: {res.headers.get('Content-Type')}")
        out.append(f"Content-Length: {res.headers.get('Content-Length')}")
except urllib.error.HTTPError as e:
    out.append(f"HTTP Error {e.code}: {e.read().decode('utf-8', errors='ignore')[:300]}")
except Exception as e:
    out.append(f"Error: {e}")

res_text = "\n".join(out)
print(res_text)
with open("test_url_out.txt", "w", encoding="utf-8") as f:
    f.write(res_text)
