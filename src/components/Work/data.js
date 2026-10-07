// All entries come from github.com/YaseenBashaT (repos, READMEs, PRs).
// `art` picks the illustration drawn in ProjectArt.

export const featured = [
  {
    id: 'scrb',
    title: 'SCRB Sahayak',
    kind: 'KSP Datathon 2026',
    year: '2026',
    art: 'rows',
    blurb:
      'Bilingual (English / Kannada) conversational AI over the Karnataka Police crime database. Every answer shows the exact query that ran and how many records it touched.',
    points: [
      'Role-based access enforced server-side, so a constable can never read another district',
      'Voice in and out, criminal network graph, live audit trail, PDF export',
    ],
    stack: ['Zoho Catalyst', 'QuickML', 'Sarvam AI', 'JavaScript'],
    live: 'https://sahayak-50044040740.development.catalystappsail.in',
    repo: 'https://github.com/YaseenBashaT/scrb-sahayak',
  },
  {
    id: 'triage',
    title: 'Enterprise IT Triage Agent',
    kind: 'OpenEnv · 12th of 31,000+',
    year: '2026',
    art: 'bars',
    blurb:
      'An RL environment and trained agent for IT ticket triage, built for the OpenEnv hackathon by Meta, Hugging Face and PyTorch. Top 100 finalist. Two-person team; I owned reward design and GRPO training.',
    points: [
      'Six independent rewards (format, resolution, citation grounding, calibration, parsimony, repetition) so gaming one costs on the others',
      'The model exploited my parsimony reward within four hours. Rebuilding it made the rest of the run work',
      '200 GRPO steps on an A100: calibration 0.53 → 0.98, parsimony 0.25 → 0.94',
    ],
    stack: ['PyTorch', 'TRL / GRPO', 'Qwen2.5-3B', 'OpenEnv', 'Hugging Face'],
    live: 'https://huggingface.co/spaces/yahid/triage_agent_env',
    model: 'https://huggingface.co/yahid/triage-agent-qwen3b',
    repo: 'https://github.com/Yahid-Basha/triage_agent_env',
  },
  {
    id: 'memops',
    title: 'MemOps',
    kind: 'Incident memory · solo',
    year: '2026',
    art: 'graph',
    blurb:
      'Remembers how your team fixed production incidents, so whoever gets paged at 3am does not start from nothing. 17 incidents across 10 services in a live D3 dashboard.',
    points: [
      'Paste an alert, get past incidents ranked by real embedding similarity from Cognee, plus a synthesized fix',
      'Approving a fix re-indexes the graph and shows a true before / after, never an invented diff',
      'Cut an O(n) LLM call fan-out with one shared dataset; provider is a swappable config value',
    ],
    stack: ['Cognee', 'FastAPI', 'Groq · Llama-3.3-70B', 'React', 'D3.js'],
    live: 'https://mem-ops.vercel.app',
    repo: 'https://github.com/YaseenBashaT/Hangover-MemOps',
  },
  {
    id: 'analyzer',
    title: 'GitHub Repository Analyzer',
    kind: 'Top 3 of 108 teams',
    year: '2025',
    art: 'code',
    blurb:
      'Retrieval-augmented Q&A over codebases you have never seen. Built for the PythonGuru × Supervity AI Hackathon, where it placed top 3 of 108 teams.',
    points: [
      'BM25 ranking picks the relevant context before it reaches the LLM: under 5 seconds across 50+ repos tested',
      'Multi-LLM layer swappable across Groq, Gemini and Hugging Face Inference',
    ],
    stack: ['Python', 'Streamlit', 'LangChain', 'rank-bm25', 'GitPython'],
    repo: 'https://github.com/YaseenBashaT/97-Yaseen-Basha/tree/main/Intelligent-Github-Repository-Analyzer',
  },
  {
    id: 'resume',
    title: 'AI Resume Analyzer',
    kind: 'LLM tooling',
    year: '2025',
    art: 'doc',
    blurb:
      'Upload a resume and get scored feedback across multiple dimensions, skills extraction and role detection. Switch between analysis moods (professional, brutal, witty) without re-running.',
    points: [
      'PDF, DOC, DOCX and TXT parsing',
      'Fast inference on Groq, mood switching is instant',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Groq'],
    repo: 'https://github.com/YaseenBashaT/AI-Resume-Analyzer',
  },
  {
    id: 'route',
    title: 'Safe Route Map',
    kind: 'ML + maps',
    year: '2026',
    art: 'route',
    blurb:
      'Accident prediction and route-safety app for India. An XGBoost model scores road segments, and routes are drawn and compared on an interactive map.',
    points: [
      'XGBoost model served through a FastAPI prediction service',
      'Leaflet + OSRM routing, Supabase auth and edge functions',
    ],
    stack: ['React', 'TypeScript', 'XGBoost', 'FastAPI', 'Leaflet'],
    repo: 'https://github.com/YaseenBashaT/safe-route-map',
  },
]

export const more = [
  {
    title: 'Quiz Analysis System',
    note: 'NEET quiz analytics with topic-wise trends and study recommendations',
    stack: 'Python · Data viz',
    year: '2025',
    href: 'https://github.com/YaseenBashaT/Quiz-Analysis-System',
  },
  {
    title: 'This portfolio',
    note: 'The site you are on. React, Sass and a lot of easing curves',
    stack: 'React · Sass',
    year: '2023',
    href: 'https://github.com/YaseenBashaT/Porfolio',
  },
]

export const opensource = [
  {
    repo: 'huggingface/trl',
    stars: '19k',
    note: 'Train transformer language models with reinforcement learning',
    prs: [
      {
        n: 7439,
        title: 'Honor logits_scaling and lm_head_multiplier in the fused LM head',
        status: 'merged',
        date: 'Oct 2026',
        diff: '+94',
      },
      {
        n: 6654,
        title: '[GRPO] Apply the completion mask elementwise in the luspo loss aggregation',
        status: 'merged',
        date: 'Aug 2026',
        diff: '+86 −2',
      },
      {
        n: 6648,
        title: '[GRPO] Fix entropy bonus normalization inconsistency across loss types',
        status: 'merged',
        date: 'Aug 2026',
        diff: '+59 −44',
      },
    ],
  },
  {
    repo: 'BerriAI/litellm',
    stars: '60k',
    note: 'AI gateway: 100+ LLM APIs in OpenAI format',
    prs: [
      {
        n: 43197,
        title: 'fix(gemini): forward seed to the Gemini API instead of rejecting it',
        status: 'merged',
        date: 'Sep 2026',
        diff: '+29',
      },
      {
        n: 35689,
        title: 'fix(router): honor wildcard and provider-stripped fallback keys in context_window / content_policy fallbacks',
        status: 'open',
        date: 'Aug 2026',
      },
    ],
  },
  {
    repo: 'vllm-project/vllm',
    stars: '93k',
    note: 'High-throughput, memory-efficient inference and serving engine for LLMs',
    prs: [
      {
        n: 51846,
        title: '[Bugfix][Frontend] Fix prompt_logprobs=0 bypassing admission guards and chat echo',
        status: 'open',
        date: 'Aug 2026',
      },
    ],
  },
  {
    repo: 'meshery/meshery',
    stars: '',
    note: 'The cloud native manager',
    prs: [
      {
        n: 16027,
        title: 'feat: Add ClickHouse design to Meshery catalog',
        status: 'open',
        date: 'Oct 2025',
      },
    ],
  },
]

export const more_os = {
  title: 'Earlier: seating-arranger, a merged CSS fix (Sep 2024)',
  href: 'https://github.com/anand2468/seating-arranger/pull/1',
}

export const hackathons = [
  {
    when: 'Jul 2026',
    tag: 'Hackathon',
    title: 'KSP Datathon 2026 · Challenge 1',
    text: 'Karnataka State Police datathon. Shipped SCRB Sahayak, a bilingual conversational AI on Zoho Catalyst with role-based access, voice and an audit trail.',
    href: 'https://github.com/YaseenBashaT/scrb-sahayak',
  },
  {
    when: 'Apr 2026',
    tag: 'Hackathon · 12th of 31,000+',
    title: 'OpenEnv Hackathon · Top 100 finalist',
    text: 'Hosted by Meta, Hugging Face and PyTorch. Our RL agent for enterprise IT triage placed 12th of 31,000+ registrations. I owned reward design and GRPO training.',
    href: 'https://huggingface.co/spaces/yahid/triage_agent_env',
  },
  {
    when: 'Mar 2026',
    tag: 'Program',
    title: 'SmartBridge · IntelliSQL',
    text: 'Team of four. Natural-language to SQL on Gemini. I owned the SQLite schema and the query-execution pipeline as backend developer and data engineer.',
    href: 'https://github.com/YaseenBashaT/SmartBridge-IntelliSQL',
  },
  {
    when: '2025',
    tag: 'Hackathon · Top 3 of 108',
    title: 'PythonGuru × Supervity AI Hackathon',
    text: 'Placed top 3 of 108 teams with the GitHub Repository Analyzer, a RAG tool that answers questions about unfamiliar codebases in under five seconds.',
    href: 'https://github.com/YaseenBashaT/97-Yaseen-Basha/tree/main/Intelligent-Github-Repository-Analyzer',
  },
  {
    when: 'Ongoing',
    tag: 'Practice',
    title: 'LeetCode',
    text: 'Daily problem solving in Python and Java, alongside the DSA certification from Apna College.',
    href: 'https://leetcode.com/u/yaseenbashat/',
  },
]
