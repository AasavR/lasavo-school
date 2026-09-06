import subprocess

cmd = "npx netlify deploy --prod --site 706486b0-c52c-415e-bbe1-2133fb649347 --dir dist"
print("Executing:", cmd)
proc = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, bufsize=1)
with open("deploy_fast_out.txt", "w", encoding="utf-8") as f:
    for line in proc.stdout:
        print(line, end="")
        f.write(line)
        f.flush()
proc.wait()
print("Done with exit code:", proc.returncode)
