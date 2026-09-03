import requests

TOKEN = "EAAW98viOK9oBSf80Hvq0LWL52Pugn9erI4SLFp0pFJBZAjOHFdzfn3n0nqmSJmbKwqnseDeQUxgmLf6ZCoW4uheXOPYXT209z1TwpObgZB6XY8VIlaqZCMvloG3eczBf2QkMf22QXscbA3EBVlNpb2tF8ZByZBqUa2rDP7nvh5Vnzui3PP4FQglP3JJtJkN7SKwBrFX7096u32mHup1qCCAUM6JZA9usZARqJ0s7IdUBWRATIRFghA1TbCQlix6xO6bejj2WZCln4n6V5BKPRXZCoZD"

with open("meta_log.txt", "w", encoding="utf-8") as log:
    log.write("=== Testing Meta Graph API Token ===\n")
    
    # 1. Test /me
    url_me = f"https://graph.facebook.com/v19.0/me?access_token={TOKEN}"
    res_me = requests.get(url_me)
    log.write(f"/me Status: {res_me.status_code}\n")
    log.write(f"/me Response: {res_me.text}\n\n")

    # 2. Test /me/accounts
    url_acc = f"https://graph.facebook.com/v19.0/me/accounts?access_token={TOKEN}"
    res_acc = requests.get(url_acc)
    log.write(f"/me/accounts Status: {res_acc.status_code}\n")
    log.write(f"/me/accounts Response: {res_acc.text}\n")

print("Test complete.")
