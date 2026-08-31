/**
 * Pre-loaded Cross-Session Past Chat History
 * Demonstrates RAG retrieval across multiple distinct past chat sessions (e.g. Latvia & Riga visits)
 */

export const INITIAL_PAST_CHAT_SESSIONS = [
  {
    id: "session-latvia-1",
    title: "Latvia Trip #1 - Spring Tech Conference in Riga",
    date: "2023-05-18",
    category: "Travel & Tech",
    tags: ["Latvia", "Riga", "Grand Palace", "Rozengrāls", "Black Balsam", "Tech Summit"],
    messages: [
      {
        sender: "user",
        timestamp: "2023-05-18 10:15",
        text: "I am traveling to Latvia for the first time! Heading to Riga for a European Tech Summit."
      },
      {
        sender: "ai",
        timestamp: "2023-05-18 10:16",
        text: "That sounds exciting! Riga, the capital of Latvia, has incredible Art Nouveau architecture and a rich Baltic history. Where are you staying?"
      },
      {
        sender: "user",
        timestamp: "2023-05-18 10:20",
        text: "I checked into the Grand Palace Hotel in Riga's Old Town. The location is super central. Yesterday evening I walked near the Daugava River and had dinner at Rozengrāls, a famous medieval underground tavern in Old Riga. Tried Riga Black Balsam, the herbal liqueur!"
      },
      {
        sender: "ai",
        timestamp: "2023-05-18 10:22",
        text: "Rozengrāls is iconic! And Black Balsam is Latvia's national liqueur, crafted since 1752. How was the conference?"
      },
      {
        sender: "user",
        timestamp: "2023-05-18 18:45",
        text: "The Riga Tech Summit went great. Presented our AI framework at the National Library of Latvia (the Castle of Light). Weather was mild spring around 18°C. Really loved Riga!"
      }
    ]
  },
  {
    id: "session-latvia-2",
    title: "Latvia Trip #2 - Winter Christmas Markets & Baltic Tour",
    date: "2024-12-20",
    category: "Travel & Leisure",
    tags: ["Latvia", "Riga", "Christmas Market", "St. Peter's Church", "Dome Square", "Winter"],
    messages: [
      {
        sender: "user",
        timestamp: "2024-12-20 14:02",
        text: "Just arrived in Latvia for the second time! Back in Riga, but this time for winter vacation during the Christmas season."
      },
      {
        sender: "ai",
        timestamp: "2024-12-20 14:03",
        text: "Welcome back to Latvia! Riga in winter is magical with snowy cobbled streets. How does it compare to your first visit?"
      },
      {
        sender: "user",
        timestamp: "2024-12-20 16:30",
        text: "Much colder! It is -4°C and snowing. On my first trip back in May 2023, it was spring. Today I spent hours at the Riga Christmas Market in Dome Square, drinking hot mulled cider and eating grey peas with bacon (traditional Latvian dish). Also climbed St. Peter's Church tower for a panorama of snowy Riga and the frozen Daugava River."
      },
      {
        sender: "ai",
        timestamp: "2024-12-20 16:35",
        text: "St. Peter's tower gives the best view of Old Riga! Are you staying in the same hotel near Old Town?"
      },
      {
        sender: "user",
        timestamp: "2024-12-20 19:10",
        text: "This time I am staying at the Pullman Riga Old Town hotel, which is right next to the Parliament. Visited the House of the Blackheads covered in Christmas lights. Having visited Latvia twice now, Riga has become one of my favorite Baltic destinations!"
      }
    ]
  },
  {
    id: "session-ai-research",
    title: "Vector Search & RAG Memory Systems",
    date: "2025-01-10",
    category: "AI & Engineering",
    tags: ["RAG", "Embeddings", "Vector DB", "Cosine Similarity", "Cross-Session Memory"],
    messages: [
      {
        sender: "user",
        timestamp: "2025-01-10 11:00",
        text: "How does RAG (Retrieval-Augmented Generation) enable long-term cross-session memory for AI chatbots?"
      },
      {
        sender: "ai",
        timestamp: "2025-01-10 11:02",
        text: "RAG chunks prior conversation logs, generates dense vector embeddings, stores them in a vector index, and retrieves relevant historical context via cosine similarity when a user asks a query."
      },
      {
        sender: "user",
        timestamp: "2025-01-10 11:15",
        text: "That means if a user asks about Latvia or Riga months after past chats, RAG can pull context from both Trip 1 (Spring 2023) and Trip 2 (Winter 2024) to construct a complete cross-session synthesis!"
      }
    ]
  },
  {
    id: "session-work-notes",
    title: "Q1 Project Planning & Tokyo Conference",
    date: "2025-02-05",
    category: "Work & Planning",
    tags: ["Work", "Tokyo", "Japan", "Project Alpha", "Deadlines"],
    messages: [
      {
        sender: "user",
        timestamp: "2025-02-05 09:30",
        text: "Planning work trip to Tokyo for April 2025 for Project Alpha release."
      },
      {
        sender: "ai",
        timestamp: "2025-02-05 09:32",
        text: "April is cherry blossom season in Tokyo! Make sure your travel dates align with your team milestones."
      }
    ]
  }
];

export const PRESET_SAMPLE_QUERIES = [
  {
    label: "Show me all context of Latvia, Riga",
    query: "show me all the context of Latvia, Riga",
    icon: "🗺️",
    badge: "User Example"
  },
  {
    label: "Compare my two trips to Latvia",
    query: "Compare my first trip to Latvia in May 2023 with my second trip in December 2024. What changed?",
    icon: "⚖️",
    badge: "Cross-Session RAG"
  },
  {
    label: "Where did I stay and eat in Riga?",
    query: "List all the hotels, restaurants, food, and drinks I mentioned during my stays in Riga, Latvia.",
    icon: "🏨",
    badge: "Entity Extraction"
  },
  {
    label: "How does RAG memory work?",
    query: "Explain how RAG pulls information across multiple past chat sessions to answer queries.",
    icon: "🧠",
    badge: "Architecture"
  }
];
