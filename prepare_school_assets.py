import shutil
import os
import csv

ARTIFACTS_DIR = r"C:\Users\Chetna Bhatia\.gemini\antigravity\brain\0ed23377-6c27-4815-bb71-6fefe44bc3dc"
WORKSPACE_DIR = r"c:\Users\Chetna Bhatia\Downloads\lasavo-school"

# Map generated image files
image_map = {
    "lasavo_school_cbse_icse_ai_1788721729050.jpg": "lasavo_school_cbse_icse_ai.jpg",
    "lasavo_school_k12_global_1788721899457.jpg": "lasavo_school_k12_global.jpg",
    "lasavo_school_primary_kids_1788721917594.jpg": "lasavo_school_primary_kids.jpg",
    "lasavo_school_ncert_mastery_1788721963134.jpg": "lasavo_school_ncert_mastery.jpg"
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

# 30 Distinct Reels for Lasavo School (K-12: CBSE, ICSE, NCERT & Global)
reels_data = [
    # Category 1: CBSE & ICSE Board Exam Mastery (Classes 9-12)
    ("School Reel 1", "CBSE Class 10 & 12 Board Exam Secrets", 
     "Master CBSE board exam prep with 24/7 AI tutors! Instant 3D step-by-step math derivations & physics formulas. 💳 Annual Pass (₹2,999/yr): https://rzp.io/l/lasavo-school-annual Telegram: https://t.me/LasavoSchool #CBSEBoardExams #Class10 #Class12 #LasavoSchool #EdTech",
     "lasavo_school_cbse_icse_ai.jpg"),

    ("School Reel 2", "Ace ICSE Class 10 Board Exams with AI Tutors", 
     "Crack ICSE Mathematics, Chemistry, & Biology with interactive 3D model explanations and solved past papers. 💳 Monthly Pass (₹499/mo): https://rzp.io/l/lasavo-school-monthly Telegram: https://t.me/LasavoSchool #ICSEBoard #Class10ICSE #ExamPrep #SmartLearning",
     "lasavo_school_cbse_icse_ai.jpg"),

    ("School Reel 3", "24/7 AI Homework Solver for Class 9 to 12", 
     "Stuck on a tough calculus or organic chemistry problem at 11 PM? Snap a photo for step-by-step instant breakdown! 💳 Monthly Pass (₹499/mo): https://rzp.io/l/lasavo-school-monthly Join: https://t.me/LasavoSchool #HomeworkHelp #Class12Physics #Calculus #LasavoSchool",
     "lasavo_school_cbse_icse_ai.jpg"),

    ("School Reel 4", "Score 95%+ in CBSE Class 12 Physics & Math", 
     "Learn Newton's laws, electrostatics, and integration with interactive 3D simulation diagrams! 💳 Annual Pass (₹2,999/yr): https://rzp.io/l/lasavo-school-annual Telegram: https://t.me/LasavoSchool #CBSEClass12 #PhysicsExams #MathTutor #EdTech",
     "lasavo_school_cbse_icse_ai.jpg"),

    ("School Reel 5", "ICSE English Literature & Commercial Studies Simplified", 
     "Understand Shakespearean plays, poetry analysis, and commercial applications with 15-minute AI summaries. 💳 Monthly Pass (₹499/mo): https://rzp.io/l/lasavo-school-monthly Telegram: https://t.me/LasavoSchool #ICSEEnglish #CommercialStudies #SmartStudent #LasavoSchool",
     "lasavo_school_cbse_icse_ai.jpg"),

    # Category 2: NCERT 3D Diagram & Textbook Mastery (Classes 6-12)
    ("School Reel 6", "Master Every NCERT Science & Math Chapter", 
     "Line-by-line NCERT textbook explanations, 3D molecular structures, and instant chapter-end solution walkthroughs. 💳 Annual Pass (₹2,999/yr): https://rzp.io/l/lasavo-school-annual Telegram: https://t.me/LasavoSchool #NCERTSolutions #NCERTMath #ScienceClass10 #LasavoSchool",
     "lasavo_school_ncert_mastery.jpg"),

    ("School Reel 7", "Instant NCERT Chemistry 3D Reaction Engine", 
     "Visualize organic mechanisms, periodic trends, and chemical bonding in 3D holographic models. 💳 Monthly Pass (₹499/mo): https://rzp.io/l/lasavo-school-monthly Telegram: https://t.me/LasavoSchool #NCERTChemistry #OrganicChemistry #NEETPrep #EdTech",
     "lasavo_school_ncert_mastery.jpg"),

    ("School Reel 8", "NCERT Class 6 to 10 Social Science Made Easy", 
     "History maps, geography 3D terrain globes, and civic concepts brought to life with interactive timelines. 💳 Annual Pass (₹2,999/yr): https://rzp.io/l/lasavo-school-annual Telegram: https://t.me/LasavoSchool #NCERTHistory #SocialScience #Class10SST #LasavoSchool",
     "lasavo_school_ncert_mastery.jpg"),

    ("School Reel 9", "Step-by-Step Exemplar Math Problem Solver", 
     "Master NCERT Exemplar & HOTS (High Order Thinking Skills) questions with personalized AI guidance. 💳 Monthly Pass (₹499/mo): https://rzp.io/l/lasavo-school-monthly Telegram: https://t.me/LasavoSchool #NCERTExemplar #HOTSQuestions #MathGenius #ExamPrep",
     "lasavo_school_ncert_mastery.jpg"),

    ("School Reel 10", "NCERT Class 11 & 12 Biology 3D Anatomy Tutor", 
     "Explore human physiology, cell biology, and genetics with 3D rotatable anatomical models. 💳 Annual Pass (₹2,999/yr): https://rzp.io/l/lasavo-school-annual Telegram: https://t.me/LasavoSchool #NCERTBiology #Anatomy3D #NEET2026 #LasavoSchool",
     "lasavo_school_ncert_mastery.jpg"),

    # Category 3: Primary K-5 Gamified Learning & Interactive Avatars (Grades 1-5)
    ("School Reel 11", "Gamified Learning Adventure for Grades 1 to 5", 
     "Make math & phonics fun! Meet friendly 3D AI avatar teachers, earn star coins, and level up daily. 💳 Monthly Pass (₹499/mo): https://rzp.io/l/lasavo-school-monthly Telegram: https://t.me/LasavoSchool #KidsLearning #PrimarySchool #GamifiedEd #ParentingHacks",
     "lasavo_school_primary_kids.jpg"),

    ("School Reel 12", "Interactive Phonics & Reading Quest for Beginners", 
     "Help your 6 to 9 year old build flawless reading fluency with tap-to-pronounce 3D story quests. 💳 Annual Pass (₹2,999/yr): https://rzp.io/l/lasavo-school-annual Telegram: https://t.me/LasavoSchool #PhonicsQuest #EarlyReading #Grade1to3 #LasavoSchool",
     "lasavo_school_primary_kids.jpg"),

    ("School Reel 13", "Mental Math Marvels for Primary Students", 
     "Master addition, multiplication tables, and word problems through fun 3D puzzle challenges. 💳 Monthly Pass (₹499/mo): https://rzp.io/l/lasavo-school-monthly Telegram: https://t.me/LasavoSchool #MentalMath #MathGames #KidsBrainTrain #EdTech",
     "lasavo_school_primary_kids.jpg"),

    ("School Reel 14", "Geography & Science Quests for Young Explorers", 
     "Travel the world virtually! Explore rain forests, solar systems, and oceans with 3D AI guides. 💳 Annual Pass (₹2,999/yr): https://rzp.io/l/lasavo-school-annual Telegram: https://t.me/LasavoSchool #ScienceKids #GeographyQuest #YoungGenius #LasavoSchool",
     "lasavo_school_primary_kids.jpg"),

    ("School Reel 15", "Personalized Learning Pace for Every Child", 
     "No stress, no pressure. Lasavo School AI adapts difficulty dynamically to match your child's learning speed. 💳 Monthly Pass (₹499/mo): https://rzp.io/l/lasavo-school-monthly Telegram: https://t.me/LasavoSchool #AdaptiveLearning #ChildDevelopment #Parenting #EdTech",
     "lasavo_school_primary_kids.jpg"),

    # Category 4: Middle & High School STEM, Physics & Coding (Grades 6-10)
    ("School Reel 16", "Learn Python & Scratch Coding for K-12 Students", 
     "Build real games, web apps, and AI bots directly inside Lasavo School's interactive cloud coding environment! 💳 Annual Pass (₹2,999/yr): https://rzp.io/l/lasavo-school-annual Telegram: https://t.me/LasavoSchool #CodingForKids #LearnPython #FutureDev #LasavoSchool",
     "lasavo_school_k12_global.jpg"),

    ("School Reel 17", "Interactive 3D Physics Lab in Your Pocket", 
     "Conduct virtual pendulum experiments, optics ray-tracing, and electric circuit simulations safely at home. 💳 Monthly Pass (₹499/mo): https://rzp.io/l/lasavo-school-monthly Telegram: https://t.me/LasavoSchool #VirtualLab #PhysicsLab #STEMEducation #EdTech",
     "lasavo_school_k12_global.jpg"),

    ("School Reel 18", "Robotics & Artificial Intelligence Essentials for Kids", 
     "Demystify how AI works! Learn neural networks, sensor logic, and computer vision with interactive lessons. 💳 Annual Pass (₹2,999/yr): https://rzp.io/l/lasavo-school-annual Telegram: https://t.me/LasavoSchool #RoboticsForKids #AIEducation #FutureSkills #LasavoSchool",
     "lasavo_school_k12_global.jpg"),

    ("School Reel 19", "Astronomy & Space Science Holographic Classroom", 
     "Explore planetary orbits, black holes, and rocket trajectory math with immersive 3D space models. 💳 Monthly Pass (₹499/mo): https://rzp.io/l/lasavo-school-monthly Telegram: https://t.me/LasavoSchool #SpaceScience #AstronomyClass #FutureAstronaut #EdTech",
     "lasavo_school_k12_global.jpg"),

    ("School Reel 20", "Algebra & Geometry Visual Proof Engine", 
     "Never memorize formulas blindly again! Understand pythagorean theorems, trigonometry, and coordinate geometry visually. 💳 Annual Pass (₹2,999/yr): https://rzp.io/l/lasavo-school-annual Telegram: https://t.me/LasavoSchool #VisualMath #GeometryProof #MathTutor #LasavoSchool",
     "lasavo_school_cbse_icse_ai.jpg"),

    # Category 5: Global IB, Cambridge (IGCSE) & International Curricula (Grades 1-12)
    ("School Reel 21", "Global K-12 AI School for International Students", 
     "Aligned with IB (PYP, MYP, DP), Cambridge IGCSE, and US Common Core standards for global learners worldwide. 💳 Annual Pass (₹2,999/yr): https://rzp.io/l/lasavo-school-annual Telegram: https://t.me/LasavoSchool #IBWorldSchool #IGCSE #GlobalEducation #LasavoSchool",
     "lasavo_school_k12_global.jpg"),

    ("School Reel 22", "Cambridge IGCSE Math & Science Exam Booster", 
     "Master extended math papers, physics past papers, and chemistry structured questions with AI feedback. 💳 Monthly Pass (₹499/mo): https://rzp.io/l/lasavo-school-monthly Telegram: https://t.me/LasavoSchool #IGCSEMath #CambridgeExams #GlobalStudent #EdTech",
     "lasavo_school_k12_global.jpg"),

    ("School Reel 23", "IB Diploma Programme (DP) Internal Assessment Guide", 
     "Get AI structure reviews for Theory of Knowledge (TOK), Extended Essays, and IA research projects. 💳 Annual Pass (₹2,999/yr): https://rzp.io/l/lasavo-school-annual Telegram: https://t.me/LasavoSchool #IBDiploma #IBTOK #ExtendedEssay #LasavoSchool",
     "lasavo_school_k12_global.jpg"),

    ("School Reel 24", "Multilingual Global Classroom: Learn in 30+ Languages", 
     "Toggle curriculum explanations in English, Spanish, Hindi, French, Japanese, and Arabic seamlessly. 💳 Monthly Pass (₹499/mo): https://rzp.io/l/lasavo-school-monthly Telegram: https://t.me/LasavoSchool #MultilingualEd #GlobalLearner #PolyglotKids #EdTech",
     "lasavo_school_k12_global.jpg"),

    ("School Reel 25", "AP & SAT Exam Prep for High School Global Scholars", 
     "Prepare for AP Calculus, Physics, & Digital SAT exams with targeted practice modules and score analytics. 💳 Annual Pass (₹2,999/yr): https://rzp.io/l/lasavo-school-annual Telegram: https://t.me/LasavoSchool #SATPointers #APCalculus #CollegePrep #LasavoSchool",
     "lasavo_school_cbse_icse_ai.jpg"),

    # Category 6: Parent Dashboard, Progress Analytics & Olympiad Prep
    ("School Reel 26", "Real-Time Parent Dashboard & Progress Reports", 
     "Track your child's daily study hours, topic mastery percentage, and weak areas instantly from your phone! 💳 Monthly Pass (₹499/mo): https://rzp.io/l/lasavo-school-monthly Telegram: https://t.me/LasavoSchool #ParentDashboard #SmartParenting #EdTechAnalytics #LasavoSchool",
     "lasavo_parent_dashboard.jpg"),

    ("School Reel 27", "National & International Science Olympiad Prep", 
     "Prepare for NSO, IMO, and Cyber Olympiad exams with mock tests, speed drills, and rank predictors. 💳 Annual Pass (₹2,999/yr): https://rzp.io/l/lasavo-school-annual Telegram: https://t.me/LasavoSchool #OlympiadPrep #MathOlympiad #ScienceGenius #LasavoSchool",
     "lasavo_school_cbse_icse_ai.jpg"),

    ("School Reel 28", "Daily Micro-Quizzes & Spaced Repetition Flashcards", 
     "Lock concepts into long-term memory with 5-minute daily AI review quizzes before bedtime. 💳 Monthly Pass (₹499/mo): https://rzp.io/l/lasavo-school-monthly Telegram: https://t.me/LasavoSchool #SpacedRepetition #StudyHacks #ExamSuccess #EdTech",
     "lasavo_school_ncert_mastery.jpg"),

    ("School Reel 29", "Safe, Ad-Free & Distraction-Free Digital School", 
     "No ads, no social media distractions—just pure interactive learning designed for peace of mind. 💳 Annual Pass (₹2,999/yr): https://rzp.io/l/lasavo-school-annual Telegram: https://t.me/LasavoSchool #SafeLearning #ChildSafety #DigitalSchool #LasavoSchool",
     "lasavo_school_primary_kids.jpg"),

    ("School Reel 30", "Join the Lasavo School Global Student Community!", 
     "Unlock unlimited K-12 learning across CBSE, ICSE, NCERT, and Global Curricula for your child today! 💳 Annual Pass (₹2,999/yr): https://rzp.io/l/lasavo-school-annual Telegram: https://t.me/LasavoSchool #LasavoSchool #FutureOfEducation #K12School #EnrollNow",
     "lasavo_school_k12_global.jpg")
]

csv_file_path = os.path.join(WORKSPACE_DIR, "lasavo_school_30_distinct_reels.csv")
headers = ["Brand", "Platform", "Content Type", "Title/Hook", "Caption", "Payment Link", "Telegram Link", "Image Asset"]

with open(csv_file_path, "w", encoding="utf-8", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(headers)
    for idx, (content_type, title, caption, asset) in enumerate(reels_data, 1):
        writer.writerow([
            "Lasavo School",
            "Instagram Reel",
            content_type,
            title,
            caption,
            "https://rzp.io/l/lasavo-school-annual",
            "https://t.me/LasavoSchool",
            asset
        ])

print(f"Successfully generated {csv_file_path} with 30 Reels!", flush=True)
