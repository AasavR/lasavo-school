import shutil
import os
import csv

ARTIFACTS_DIR = r"C:\Users\Chetna Bhatia\.gemini\antigravity\brain\0ed23377-6c27-4815-bb71-6fefe44bc3dc"
WORKSPACE_DIR = r"c:\Users\Chetna Bhatia\Downloads\lasavo-school"

# Map generated image files
image_map = {
    "lasavo_books_speed_reading_ai_1788720269139.jpg": "lasavo_books_speed_reading_ai.jpg",
    "lasavo_books_fantasy_3d_map_1788720285858.jpg": "lasavo_books_fantasy_3d_map.jpg",
    "lasavo_books_financial_freedom_1788720307290.jpg": "lasavo_books_financial_freedom.jpg",
    "lasavo_books_multilingual_ai_1788720469764.jpg": "lasavo_books_multilingual_ai.jpg",
    "lasavo_books_rare_manuscript_1788720490231.jpg": "lasavo_books_rare_manuscript.jpg",
    "lasavo_books_coding_manual_1788720655190.jpg": "lasavo_books_coding_manual.jpg"
}

public_assets = os.path.join(WORKSPACE_DIR, "public", "social_assets")
dist_assets = os.path.join(WORKSPACE_DIR, "dist", "social_assets")

os.makedirs(public_assets, exist_ok=True)
os.makedirs(dist_assets, exist_ok=True)

for src_name, dst_name in image_map.items():
    src_path = os.path.join(ARTIFACTS_DIR, src_name)
    if os.path.exists(src_path):
        shutil.copy(src_path, os.path.join(public_assets, dst_name))
        shutil.copy(src_path, os.path.join(dist_assets, dst_name))
        print(f"Copied {src_name} -> {dst_name}", flush=True)
    else:
        print(f"WARNING: {src_path} not found!", flush=True)

# 40 Fabulous Reels definition
reels_data = [
    # Category 1: Speed & Productivity Reading
    ("Fabulous Reel 1", "AI RSVP Speed Reader: Read 1,000 WPM", 
     "Double your reading speed in 7 days! Experience Lasavo Books AI RSVP mode with real-time text highlights & target focus tracking. 💳 Unlimited Reader Pass (₹499/mo): https://rzp.io/l/lasavo-books-monthly Join Telegram: https://t.me/LasavoBooks #SpeedReading #LasavoBooks #ReadFaster #ProductivityHacks #EdTech",
     "lasavo_books_speed_reading_ai.jpg"),
    
    ("Fabulous Reel 2", "How High Performers Read 52 Books a Year", 
     "Stop falling behind on your reading list. Access 15-minute executive summaries and neural audiobooks on Lasavo Books. 💳 Single Pass (₹299): https://rzp.io/l/lasavo-books-single Telegram: https://t.me/LasavoBooks #BookLover #ExecutiveMindset #SelfImprovement #ReadingGoals",
     "lasavo_books_executive_summary.jpg"),

    ("Fabulous Reel 3", "Active Memory Retention: Instant AI Quizzes", 
     "Turn every chapter into active recall flashcards & spaced repetition quizzes automatically! 💳 Unlimited Pass (₹499/mo): https://rzp.io/l/lasavo-books-monthly Join: https://t.me/LasavoBooks #ActiveRecall #StudyHacks #ExamPrep #LasavoBooks",
     "lasavo_books_speed_reading_ai.jpg"),

    ("Fabulous Reel 4", "Banish Reading Fatigue with Smart Focus Mode", 
     "Read comfortably at night with ambient dark mode, customizable fonts, and kinetic text highlights. 💳 VIP Pass (₹2,999): https://rzp.io/l/lasavo-books-lifetime Telegram: https://t.me/LasavoBooks #NightReading #BookTok #FocusMode #DigitalLibrary",
     "lasavo_books_holographic_library.jpg"),

    # Category 2: Executive & Business Leadership
    ("Fabulous Reel 5", "Master Bestselling Business Books in 15 Minutes", 
     "Get actionable insights, bulleted executive takeaways, and high-energy audio summaries for top business classics. 💳 Unlimited Pass (₹499/mo): https://rzp.io/l/lasavo-books-monthly Telegram: https://t.me/LasavoBooks #BusinessBooks #Leadership #ExecutiveSummaries #CareerGrowth",
     "lasavo_books_executive_summary.jpg"),

    ("Fabulous Reel 6", "The 100-Year Life Executive Reading Vault", 
     "Discover future-proof strategies for career longevity, wealth preservation, and modern AI adaptation. 💳 Single Pass (₹299): https://rzp.io/l/lasavo-books-single Telegram: https://t.me/LasavoBooks #FutureOfWork #CareerStrategy #ExecutiveReads #GrowthMindset",
     "lasavo_books_executive_summary.jpg"),

    ("Fabulous Reel 7", "Negotiation & Influence Masterclass Summaries", 
     "Master high-stakes tactics from top global negotiation classics with 15-minute interactive breakdowns. 💳 Unlimited Pass (₹499/mo): https://rzp.io/l/lasavo-books-monthly Telegram: https://t.me/LasavoBooks #Negotiation #SalesMastery #Influence #LasavoBooks",
     "lasavo_books_financial_freedom.jpg"),

    ("Fabulous Reel 8", "CEO Reading Secrets: Daily Micro-Learning", 
     "Transform your daily 15-minute commute into a masterclass with Lasavo Books audio summaries. 💳 VIP Lifetime Pass (₹2,999): https://rzp.io/l/lasavo-books-lifetime Telegram: https://t.me/LasavoBooks #CommuterLearning #CEOReads #LeadershipHacks #EdTech",
     "lasavo_books_executive_summary.jpg"),

    # Category 3: Interactive 3D Kids & Bedtime Stories
    ("Fabulous Reel 9", "Magic 3D Storybooks: Characters Come Alive!", 
     "Make storytime unforgettable! Watch 3D interactive storybooks respond to your child's touch. 💳 Unlimited Reader Pass (₹499/mo): https://rzp.io/l/lasavo-books-monthly Join: https://t.me/LasavoBooks #KidsBooks #InteractiveStories #ParentingMagic #EdTech",
     "lasavo_books_kids_interactive_story.jpg"),

    ("Fabulous Reel 10", "Soothe Kids to Sleep with Calming AI Narrations", 
     "Gentle bedtime tales paired with serene night-sky visuals and calming voice synthesis. 💳 Single Pass (₹299): https://rzp.io/l/lasavo-books-single Telegram: https://t.me/LasavoBooks #BedtimeStories #EarlyChildhood #ParentingHacks #SleepWell",
     "lasavo_books_kids_interactive_story.jpg"),

    ("Fabulous Reel 11", "Early Phonics & Interactive Vocabulary Popups", 
     "Help toddlers and primary readers master pronunciation with tap-to-speak interactive words. 💳 Unlimited Reader Pass (₹499/mo): https://rzp.io/l/lasavo-books-monthly Telegram: https://t.me/LasavoBooks #PhonicsFun #EarlyLearning #KidsLiteracy #Parenting",
     "lasavo_books_kids_interactive_story.jpg"),

    ("Fabulous Reel 12", "STEM Storybooks: Science & Math Made Magical", 
     "Introduce kids to space exploration, basic physics, and biology through interactive 3D story adventures. 💳 VIP Pass (₹2,999): https://rzp.io/l/lasavo-books-lifetime Telegram: https://t.me/LasavoBooks #STEMforKids #ScienceFun #FutureGenius #LasavoBooks",
     "lasavo_books_kids_interactive_story.jpg"),

    # Category 4: AI Audiobooks & Neural Voice Studio
    ("Fabulous Reel 13", "Studio-Quality AI Audiobooks with Ambient Music", 
     "Experience ultra-realistic human-like neural voices synchronized with subtle ambient soundscapes. 💳 Unlimited Pass (₹499/mo): https://rzp.io/l/lasavo-books-monthly Join: https://t.me/LasavoBooks #AudiobookLover #AIVoice #CommuteReads #BookWorm",
     "lasavo_books_ai_audiobook_studio.jpg"),

    ("Fabulous Reel 14", "Hands-Free Voice Controls for Road Trips", 
     "Drive safely while listening to your favorite books! Hands-free voice commands & smart resume. 💳 Single Pass (₹299): https://rzp.io/l/lasavo-books-single Telegram: https://t.me/LasavoBooks #RoadTripReads #CommuterLife #AudiobooksOnTheGo #LasavoBooks",
     "lasavo_books_ai_audiobook_studio.jpg"),

    ("Fabulous Reel 15", "Adjust Narrator Pace from 0.75x to 3.0x", 
     "Binge-listen to full books with hyper-clear pitch-preserved speed scaling up to 3.0x speed. 💳 Unlimited Pass (₹499/mo): https://rzp.io/l/lasavo-books-monthly Telegram: https://t.me/LasavoBooks #SpeedListening #ProductivityHack #AudiobookAddict #EdTech",
     "lasavo_books_ai_audiobook_studio.jpg"),

    ("Fabulous Reel 16", "Custom Narrator Voice Selection Engine", 
     "Switch between warm storytelling tones, professional executive voices, or theatrical cast narrations. 💳 VIP Lifetime Pass (₹2,999): https://rzp.io/l/lasavo-books-lifetime Telegram: https://t.me/LasavoBooks #AIAudio #VoiceTech #BookTok #LasavoBooks",
     "lasavo_books_ai_audiobook_studio.jpg"),

    # Category 5: Sci-Fi & Fantasy Immersive Universes
    ("Fabulous Reel 17", "Step Inside Sci-Fi & Fantasy 3D Interactive Maps", 
     "Explore realm maps, character lineage trees, and weapon lore in real-time as you read epic novels. 💳 Single Pass (₹299): https://rzp.io/l/lasavo-books-single Join: https://t.me/LasavoBooks #SciFiBooks #FantasyReads #BookTok #HolographicReader",
     "lasavo_books_fantasy_3d_map.jpg"),

    ("Fabulous Reel 18", "Choose Your Own Adventure Interactive Novels", 
     "Your decisions shape the story outcome! Experience branch-narrative thriller and fantasy sagas. 💳 Unlimited Reader Pass (₹499/mo): https://rzp.io/l/lasavo-books-monthly Telegram: https://t.me/LasavoBooks #InteractiveNovel #ChoiceStory #BookWorm #LasavoBooks",
     "lasavo_books_fantasy_3d_map.jpg"),

    ("Fabulous Reel 19", "Soundtrack-Enhanced Epic World-Building", 
     "Battle scenes get cinematic orchestral soundscapes while tavern scenes play cozy acoustic ambiance. 💳 VIP Lifetime Pass (₹2,999): https://rzp.io/l/lasavo-books-lifetime Telegram: https://t.me/LasavoBooks #EpicFantasy #CinematicReading #ImmersiveBooks #BookTok",
     "lasavo_books_fantasy_3d_map.jpg"),

    ("Fabulous Reel 20", "Digital Sci-Fi Archives & Cyberpunk Novels", 
     "Unlock hundreds of indie cyberpunk, space opera, and dystopian classics in 3D holographic mode. 💳 Single Pass (₹299): https://rzp.io/l/lasavo-books-single Telegram: https://t.me/LasavoBooks #CyberpunkReads #SciFiGeek #DigitalVault #LasavoBooks",
     "lasavo_books_holographic_library.jpg"),

    # Category 6: Financial Literacy & Wealth Creation
    ("Fabulous Reel 21", "100 Financial & Investment Classics Breakdown", 
     "Master personal finance, real estate, stock investing, and wealth building from top financial authors. 💳 Unlimited Reader Pass (₹499/mo): https://rzp.io/l/lasavo-books-monthly Join: https://t.me/LasavoBooks #PersonalFinance #Investing101 #WealthCreation #FinancialFreedom",
     "lasavo_books_financial_freedom.jpg"),

    ("Fabulous Reel 22", "Deconstruct Macro-Economics in 15-Minute Lessons", 
     "Understand inflation, interest rates, and global market cycles through simplified 3D infographics. 💳 Single Pass (₹299): https://rzp.io/l/lasavo-books-single Telegram: https://t.me/LasavoBooks #Economics #SmartMoney #MarketInsights #LasavoBooks",
     "lasavo_books_financial_freedom.jpg"),

    ("Fabulous Reel 23", "The Psychology of Money & Decision Making", 
     "Learn why human behavior governs financial success and how to build unshakeable money habits. 💳 Unlimited Reader Pass (₹499/mo): https://rzp.io/l/lasavo-books-monthly Telegram: https://t.me/LasavoBooks #BehavioralFinance #MindsetShift #MoneyHabits #BookSummary",
     "lasavo_books_financial_freedom.jpg"),

    ("Fabulous Reel 24", "Build Your Financial Independence Reading List", 
     "Curated micro-reading tracks designed to guide you step-by-step toward financial independence. 💳 VIP Lifetime Pass (₹2,999): https://rzp.io/l/lasavo-books-lifetime Telegram: https://t.me/LasavoBooks #FIREMovement #FinancialLiteracy #WealthBuilding #LasavoBooks",
     "lasavo_books_financial_freedom.jpg"),

    # Category 7: Developer & Coding Interactive Manuals
    ("Fabulous Reel 25", "Run Live Code Snippets Directly Inside Tech Manuals", 
     "No setup required! Execute Python, JS, and Rust code directly inside interactive programming textbooks. 💳 Unlimited Reader Pass (₹499/mo): https://rzp.io/l/lasavo-books-monthly Join: https://t.me/LasavoBooks #CodingBooks #LearnToCode #SoftwareEngineering #DevCommunity",
     "lasavo_books_coding_manual.jpg"),

    ("Fabulous Reel 26", "Interactive Data Structures & Algorithm Visualizer", 
     "See sorting algorithms, tree traversals, and dynamic programming step-by-step in real-time visuals. 💳 Single Pass (₹299): https://rzp.io/l/lasavo-books-single Telegram: https://t.me/LasavoBooks #AlgorithmVisualizer #ComputerScience #TechDev #LasavoBooks",
     "lasavo_books_coding_manual.jpg"),

    ("Fabulous Reel 27", "AI & Machine Learning Engineering Manuals", 
     "Master PyTorch, Transformers, and LLM architecture with interactive Jupyter-style textbook notebooks. 💳 Unlimited Pass (₹499/mo): https://rzp.io/l/lasavo-books-monthly Telegram: https://t.me/LasavoBooks #AIMachineLearning #LLMDev #TechBooks #EdTech",
     "lasavo_books_coding_manual.jpg"),

    ("Fabulous Reel 28", "Full-Stack Web Dev Interactive Bootcamp Library", 
     "From HTML/CSS basics to high-scale backend system design—all in interactive code-enabled ebooks. 💳 VIP Lifetime Pass (₹2,999): https://rzp.io/l/lasavo-books-lifetime Telegram: https://t.me/LasavoBooks #FullStackDev #CodeBootcamp #DevTips #LasavoBooks",
     "lasavo_books_coding_manual.jpg"),

    # Category 8: Multilingual Reader Engine
    ("Fabulous Reel 29", "Read Any Book in 30+ Languages Simultaneously", 
     "Side-by-side bilingual reading with instant sentence-level translation & neural audio playback. 💳 Unlimited Reader Pass (₹499/mo): https://rzp.io/l/lasavo-books-monthly Join: https://t.me/LasavoBooks #LanguageLearning #BilingualReads #GlobalBooks #EdTech",
     "lasavo_books_multilingual_ai.jpg"),

    ("Fabulous Reel 30", "Learn Spanish, Japanese, & French Through Fiction", 
     "Immerse yourself in authentic literature with instant vocabulary tooltips and dual audio channels. 💳 Single Pass (₹299): https://rzp.io/l/lasavo-books-single Telegram: https://t.me/LasavoBooks #LearnSpanish #LearnJapanese #Polyglot #LasavoBooks",
     "lasavo_books_multilingual_ai.jpg"),

    ("Fabulous Reel 31", "Instant Technical Terminology & Idiom Lookup", 
     "Never struggle with complex regional phrases or technical slang—AI contextual translation is built-in. 💳 Unlimited Pass (₹499/mo): https://rzp.io/l/lasavo-books-monthly Telegram: https://t.me/LasavoBooks #PolyglotLife #TranslationEngine #SmartReader #EdTech",
     "lasavo_books_multilingual_ai.jpg"),

    ("Fabulous Reel 32", "Global Classics Translated in Natural Local Accents", 
     "Listen to world literature narrated in authentic regional accents and native pronunciation. 💳 VIP Lifetime Pass (₹2,999): https://rzp.io/l/lasavo-books-lifetime Telegram: https://t.me/LasavoBooks #WorldLiterature #CulturalReads #AIAudio #LasavoBooks",
     "lasavo_books_multilingual_ai.jpg"),

    # Category 9: Mindfulness & Deep Work Reading Strategies
    ("Fabulous Reel 33", "Deep Work & Focus Strategy Library", 
     "Conquer digital distractions! Curated reading lists & audiobooks dedicated to deep focus & productivity. 💳 Single Pass (₹299): https://rzp.io/l/lasavo-books-single Join: https://t.me/LasavoBooks #DeepWork #FocusHacks #Productivity #LasavoBooks",
     "lasavo_books_executive_summary.jpg"),

    ("Fabulous Reel 34", "Guided Reflection & Journaling Ambient Reader", 
     "Pause reading at chapter checkpoints with built-in reflection prompts & personal digital notebook sync. 💳 Unlimited Pass (₹499/mo): https://rzp.io/l/lasavo-books-monthly Telegram: https://t.me/LasavoBooks #Journaling #Mindfulness #SelfReflection #BookLover",
     "lasavo_books_ai_audiobook_studio.jpg"),

    ("Fabulous Reel 35", "Philosophy & Stoic Wisdom Daily Audio Bites", 
     "Start your morning with 5-minute stoic lessons from Marcus Aurelius, Seneca, and Epictetus. 💳 Unlimited Pass (₹499/mo): https://rzp.io/l/lasavo-books-monthly Telegram: https://t.me/LasavoBooks #Stoicism #DailyWisdom #PhilosophyReads #Mindset",
     "lasavo_books_executive_summary.jpg"),

    ("Fabulous Reel 36", "Calm Ambient Soundscapes for Stress Relief", 
     "Rainfall, fireplace crackles, and soft piano soundtracks designed to maximize reading relaxation. 💳 VIP Lifetime Pass (₹2,999): https://rzp.io/l/lasavo-books-lifetime Telegram: https://t.me/LasavoBooks #CalmReading #MentalHealth #RelaxingVibes #LasavoBooks",
     "lasavo_books_holographic_library.jpg"),

    # Category 10: Rare Manuscripts & Global Reader Club
    ("Fabulous Reel 37", "Explore Restored 13th-Century Rare Manuscripts", 
     "Step inside digital archives of ancient manuscripts restored in crystal-clear HD holographic view. 💳 VIP Lifetime Pass (₹2,999): https://rzp.io/l/lasavo-books-lifetime Join: https://t.me/LasavoBooks #RareBooks #HistoryBuff #ClassicLiterature #DigitalArchive",
     "lasavo_books_rare_manuscript.jpg"),

    ("Fabulous Reel 38", "Interactive Annotations & Global Reader Notes", 
     "Discover shared marginalia, insightful highlights, and community reviews from readers worldwide. 💳 Single Pass (₹299): https://rzp.io/l/lasavo-books-single Telegram: https://t.me/LasavoBooks #BookClub #GlobalReaders #CommunityReading #LasavoBooks",
     "lasavo_books_rare_manuscript.jpg"),

    ("Fabulous Reel 39", "The Ultimate 10,000 Interactive Digital Library", 
     "One subscription unlocks 10,000+ interactive ebooks, audiobooks, 3D stories, and tech manuals. 💳 Unlimited Pass (₹499/mo): https://rzp.io/l/lasavo-books-monthly Telegram: https://t.me/LasavoBooks #DigitalLibrary #AllInOne #BookLover #ReadingRevolution",
     "lasavo_books_holographic_library.jpg"),

    ("Fabulous Reel 40", "Join the Lasavo Books Telegram Community Today!", 
     "Connect with 50,000+ avid readers, receive daily book recommendations, and get exclusive discounts. 💳 Unlimited Pass (₹499/mo): https://rzp.io/l/lasavo-books-monthly Telegram: https://t.me/LasavoBooks #BookCommunity #TelegramClub #LasavoBooks #ReadMore",
     "lasavo_books_holographic_library.jpg")
]

csv_file_path = os.path.join(WORKSPACE_DIR, "lasavo_books_40_fabulous_reels.csv")
headers = ["Brand", "Platform", "Content Type", "Title/Hook", "Caption", "Payment Link", "Telegram Link", "Image Asset"]

with open(csv_file_path, "w", encoding="utf-8", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(headers)
    for idx, (content_type, title, caption, asset) in enumerate(reels_data, 1):
        writer.writerow([
            "Lasavo Books",
            "Instagram Reel",
            content_type,
            title,
            caption,
            "https://rzp.io/l/lasavo-books-monthly",
            "https://t.me/LasavoBooks",
            asset
        ])

print(f"Successfully generated {csv_file_path} with 40 Reels!")
