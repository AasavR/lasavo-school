import os
import time
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

try:
    from openai import OpenAI, RateLimitError, APIError
except ImportError:
    print("[!] 'openai' package not found. Please install it using: pip install openai python-dotenv")
    OpenAI = None


def get_nvidia_client():
    """Initializes and returns an OpenAI client configured for NVIDIA NIM endpoints."""
    api_key = os.getenv("NVIDIA_API_KEY")
    base_url = os.getenv("NVIDIA_BASE_URL", "https://integrate.api.nvidia.com/v1")

    if not api_key or api_key == "nvapi-your_api_key_here":
        raise ValueError(
            "Missing NVIDIA_API_KEY! Please add your key to `.env` or set the NVIDIA_API_KEY environment variable.\n"
            "Get your key at: https://build.nvidia.com"
        )

    return OpenAI(base_url=base_url, api_key=api_key)


def call_nvidia_nim(prompt: str, model: str = None, max_retries: int = 5, retry_delay: int = 10) -> str:
    """
    Calls NVIDIA NIM API endpoint with automatic retry for rate limits (HTTP 429).
    
    :param prompt: User message / prompt string
    :param model: Target model ID (e.g., 'moonshotai/kimi-k2.5', 'meta/llama-3.3-70b-instruct')
    :param max_retries: Number of retry attempts on rate limit
    :param retry_delay: Delay in seconds between retry attempts
    """
    if OpenAI is None:
        return "Error: `openai` package is missing. Run `pip install openai python-dotenv`."

    client = get_nvidia_client()
    target_model = model or os.getenv("NVIDIA_MODEL", "meta/llama-3.3-70b-instruct")

    messages = [{"role": "user", "content": prompt}]

    for attempt in range(1, max_retries + 1):
        try:
            print(f"[+] Sending request to NVIDIA NIM model '{target_model}' (Attempt {attempt}/{max_retries})...")
            response = client.chat.completions.create(
                model=target_model,
                messages=messages,
                temperature=0.5,
                max_tokens=1024
            )
            return response.choices[0].message.content

        except RateLimitError as e:
            print(f"[!] Rate limited (429)! Cooling down for {retry_delay} seconds... ({e})")
            time.sleep(retry_delay)
        except APIError as e:
            print(f"[!] NVIDIA API Error: {e}")
            if attempt == max_retries:
                raise e
            time.sleep(5)
        except Exception as e:
            print(f"[!] Unexpected Error: {e}")
            raise e

    raise RuntimeError("Exceeded maximum retries due to persistent rate limits.")


if __name__ == "__main__":
    print("=== NVIDIA NIM API Connector Test ===")
    test_prompt = "Hello! Explain NVIDIA NIM endpoints in 2 sentences."
    try:
        result = call_nvidia_nim(test_prompt)
        print("\n--- Response ---")
        print(result)
    except Exception as err:
        print(f"\n[!] Execution halted: {err}")
