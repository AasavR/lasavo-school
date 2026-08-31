import os
import sys
from crewai import Agent, Crew, Process, Task
from crewai.tools import tool

# Reconfigure stdout for UTF-8 encoding on Windows
if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

try:
    from duckduckgo_search import DDGS
except ImportError:
    DDGS = None

# Define DuckDuckGo Web Search Tool for CrewAI
@tool("DuckDuckGo Web Search")
def web_search_tool(query: str) -> str:
    """Searches the live web using DuckDuckGo and returns top search result snippets."""
    if DDGS is None:
        return "DuckDuckGo search package not installed. Run: pip install duckduckgo-search"
    
    results = []
    try:
        with DDGS() as ddgs:
            for r in ddgs.text(query, max_results=5):
                results.append(f"Title: {r.get('title')}\nURL: {r.get('href')}\nSnippet: {r.get('body')}\n")
    except Exception as e:
        return f"Error executing search: {str(e)}"
    
    return "\n---\n".join(results) if results else "No results found."

def run_swarm():
    """
    Initializes and runs the free autonomous multi-agent swarm.
    Backend options:
    1. Ollama local: OPENAI_API_BASE="http://localhost:11434/v1", model="ollama/llama3.1"
    2. Google Gemini Free API: set GEMINI_API_KEY env var
    3. Groq Free API: set GROQ_API_KEY env var
    """
    
    # Configure LLM Model (Default: Ollama local or Groq/Gemini via OpenAI endpoint)
    llm_model = os.getenv("SWARM_LLM_MODEL", "ollama/llama3.1")
    
    print("[+] Initializing Autonomous Multi-Agent Swarm...")
    print(f"[+] Using LLM Backend: {llm_model}")

    # 1. Define Specialized Agents
    researcher = Agent(
        role="Market & Web Researcher",
        goal="Discover high-signal trends and real-time facts on requested topics using live web search",
        backstory="An expert technical researcher skilled at querying web APIs, parsing search snippets, and identifying core insights.",
        tools=[web_search_tool],
        verbose=True,
        llm=llm_model
    )

    writer = Agent(
        role="Content & Intelligence Strategist",
        goal="Synthesize raw search findings into a structured, executive-ready Markdown briefing report",
        backstory="A strategic analyst who excels at distilling complex data points into clear takeaways, key bullet points, and recommendations.",
        verbose=True,
        llm=llm_model
    )

    # 2. Define Tasks
    task_research = Task(
        description="Search the web for 5 breakthrough topics in autonomous AI agent swarms and multi-agent systems in 2026.",
        expected_output="A structured bulleted list of 5 key breakthrough topics with source snippets and URLs.",
        agent=researcher
    )

    task_report = Task(
        description="Draft a concise actionable briefing report in Markdown based on the research findings.",
        expected_output="A publication-ready Markdown report with Executive Summary, 5 Key Breakthroughs, and Strategic Takeaways.",
        agent=writer
    )

    # 3. Assemble Swarm Crew
    swarm_crew = Crew(
        agents=[researcher, writer],
        tasks=[task_research, task_report],
        process=Process.sequential
    )

    print("\n[RUN] Executing Swarm Workflow...")
    try:
        result = swarm_crew.kickoff()
        print("\n================ Swarm Final Output ================\n")
        print(result)

        output_filename = "swarm_report.md"
        with open(output_filename, "w", encoding="utf-8") as f:
            f.write(str(result))
        print(f"\n[OK] Report successfully saved to {output_filename}")
    except Exception as e:
        print(f"\n[Notice] CrewAI Swarm Execution: {e}")
        print("Tip: Ensure local Ollama is running (`ollama serve`) or set GEMINI_API_KEY / GROQ_API_KEY environment variables!")

if __name__ == "__main__":
    run_swarm()
