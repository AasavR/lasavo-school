import csv
import json
import os
import sys
import requests

# Set stdout UTF-8 encoding for Windows terminals
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

CSV_FILE = "social_media_content_import.csv"
JSON_PIPELINE_FILE = "social_media_pipeline.json"
ASSETS_DIR = "social_media_assets"

# User's Official Meta Graph API Access Token
META_PAGE_ACCESS_TOKEN = os.getenv("META_PAGE_ACCESS_TOKEN", "EAAW98viOK9oBSf80Hvq0LWL52Pugn9erI4SLFp0pFJBZAjOHFdzfn3n0nqmSJmbKwqnseDeQUxgmLf6ZCoW4uheXOPYXT209z1TwpObgZB6XY8VIlaqZCMvloG3eczBf2QkMf22QXscbA3EBVlNpb2tF8ZByZBqUa2rDP7nvh5Vnzui3PP4FQglP3JJtJkN7SKwBrFX7096u32mHup1qCCAUM6JZA9usZARqJ0s7IdUBWRATIRFghA1TbCQlix6xO6bejj2WZCln4n6V5BKPRXZCoZD")

def load_content():
    posts = []
    if not os.path.exists(CSV_FILE):
        print(f"Error: {CSV_FILE} not found.")
        return posts

    with open(CSV_FILE, mode="r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            posts.append(row)
    return posts

def get_meta_accounts():
    """
    Fetch connected Facebook Pages and Instagram Business Accounts using Meta Graph API
    """
    if not META_PAGE_ACCESS_TOKEN:
        print("[Meta Graph API] No access token configured.")
        return [], []

    url = f"https://graph.facebook.com/v19.0/me/accounts?access_token={META_PAGE_ACCESS_TOKEN}"
    fb_pages = []
    ig_accounts = []
    
    try:
        res = requests.get(url, timeout=10)
        if res.status_code == 200:
            data = res.json()
            pages = data.get("data", [])
            print(f"[Meta Graph API SUCCESS] Authenticated! Found {len(pages)} Facebook Pages:")
            for p in pages:
                page_id = p.get("id")
                page_name = p.get("name")
                page_token = p.get("access_token", META_PAGE_ACCESS_TOKEN)
                fb_pages.append({"id": page_id, "name": page_name, "access_token": page_token})
                print(f"  - FB Page: {page_name} (ID: {page_id})")
                
                # Check for connected Instagram Business Account
                ig_url = f"https://graph.facebook.com/v19.0/{page_id}?fields=instagram_business_account&access_token={page_token}"
                ig_res = requests.get(ig_url, timeout=10)
                if ig_res.status_code == 200:
                    ig_data = ig_res.json()
                    ig_biz = ig_data.get("instagram_business_account", {})
                    if ig_biz.get("id"):
                        ig_accounts.append({"id": ig_biz.get("id"), "page_id": page_id, "access_token": page_token})
                        print(f"    └─ Connected Instagram Biz Account ID: {ig_biz.get('id')}")
            return fb_pages, ig_accounts
        else:
            print(f"[Meta Graph API Error] ({res.status_code}): {res.text}")
            return [], []
    except Exception as e:
        print(f"[Meta Graph API Connection Exception]: {e}")
        return [], []

def post_to_facebook_page(page_id, page_token, message, link=None):
    url = f"https://graph.facebook.com/v19.0/{page_id}/feed"
    payload = {
        "message": message,
        "access_token": page_token
    }
    if link:
        payload["link"] = link
        
    try:
        res = requests.post(url, data=payload, timeout=10)
        if res.status_code == 200:
            post_id = res.json().get("id")
            print(f"  [Meta FB SUCCESS] Published to FB Page (Post ID: {post_id})")
            return post_id
        else:
            print(f"  [Meta FB Error] ({res.status_code}): {res.text}")
            return None
    except Exception as e:
        print(f"  [Meta FB Exception]: {e}")
        return None

def process_and_push():
    posts = load_content()
    print(f"=== Meta Graph API Social Content Publisher ===\n")

    fb_pages, ig_accounts = get_meta_accounts()

    print(f"\n[INFO] Loaded {len(posts)} total posts for execution.\n")

    for idx, post in enumerate(posts, 1):
        image_file = os.path.join(ASSETS_DIR, post["Image Asset"])
        print(f"[{idx}/{len(posts)}] [{post['Brand']}] [{post['Platform']}] Scheduled: {post['Scheduled Date']}")
        print(f"     Caption: {post['Caption'][:85]}...")
        print(f"     Payment Link: {post['Payment Link']}")
        print(f"     Asset Exists: {os.path.exists(image_file)}")
        
        # Publish to Facebook Pages via Meta Graph API if Page connected
        if fb_pages:
            for page in fb_pages:
                fb_msg = f"{post['Caption']}\n\n💳 Direct Payment: {post['Payment Link']}"
                post_to_facebook_page(page["id"], page["access_token"], fb_msg, post["Payment Link"])

        print("-" * 70)

    print("\n[SUCCESS] Meta Graph API processing completed!")

if __name__ == "__main__":
    process_and_push()
