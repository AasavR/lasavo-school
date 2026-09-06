import subprocess

def deploy():
    print("Deploying dist assets to Netlify site 706486b0-c52c-415e-bbe1-2133fb649347...")
    cmd = ["npx", "netlify", "deploy", "--prod", "--site", "706486b0-c52c-415e-bbe1-2133fb649347", "--dir", "dist"]
    res = subprocess.run(cmd, capture_output=True, text=True, shell=True)
    out_text = f"STDOUT:\n{res.stdout}\nSTDERR:\n{res.stderr}"
    print(out_text)
    with open("deploy_out.txt", "w", encoding="utf-8") as f:
        f.write(out_text)

if __name__ == "__main__":
    deploy()
