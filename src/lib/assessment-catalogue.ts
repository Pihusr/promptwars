import { AssessableSkill } from "@/types/assessment";
import { Mission, Interest } from "@/types/onboarding";

export interface GoalDefinition {
  slug: string;
  title: string;
  category: string;
  description: string;
  skills: AssessableSkill[];
}

export const GOAL_CATALOGUE: Record<string, GoalDefinition> = {
  "full-stack-web-cloud-engineer": {
    slug: "full-stack-web-cloud-engineer",
    title: "Full-Stack Web & Cloud Engineer",
    category: "Software Engineering",
    description: "Build robust frontend web apps, server-rendered UIs, REST APIs, relational PostgreSQL databases, and containerized cloud services.",
    skills: [
      {
        skillSlug: "javascript",
        name: "JavaScript",
        description: "Modern ECMAScript (ES6+), async/await, closures, promises, and the event loop.",
        skillType: "hard",
        importance: "critical",
        targetLevel: 5,
        scenarioQuestion: {
          id: "sq-js-event-loop",
          prompt: "In JavaScript, if you execute a synchronous loop alongside `setTimeout(fn, 0)` and `Promise.resolve().then(fn)`, which executes first?",
          options: [
            { id: "A", label: "The Promise microtask callback executes before setTimeout macrotask." },
            { id: "B", label: "setTimeout executes immediately before any Promise callbacks." },
            { id: "C", label: "Both execute concurrently in parallel worker threads." },
            { id: "D", label: "The browser halts execution until user clicks." },
          ],
          correctOptionId: "A",
        },
      },
      {
        skillSlug: "typescript",
        name: "TypeScript",
        description: "Static typing, generics, interfaces, type narrowing, and strict compile safety.",
        skillType: "hard",
        importance: "critical",
        targetLevel: 5,
        scenarioQuestion: {
          id: "sq-ts-generics",
          prompt: "Why would you use a generic type parameter `<T>` instead of `any` in a TypeScript API helper?",
          options: [
            { id: "A", label: "To preserve type safety and infer input/output types without losing autocomplete." },
            { id: "B", label: "Because `any` runs slower in the JavaScript runtime." },
            { id: "C", label: "Generics automatically convert JSON into SQL database tables." },
            { id: "D", label: "TypeScript forbids compiling any code with `any`." },
          ],
          correctOptionId: "A",
        },
      },
      {
        skillSlug: "react",
        name: "React",
        description: "Component lifecycle, state management, hooks (useEffect, useMemo), and Server Components.",
        skillType: "hard",
        importance: "critical",
        targetLevel: 5,
        scenarioQuestion: {
          id: "sq-react-state",
          prompt: "When updating state in React based on the previous state value, what is the best practice?",
          options: [
            { id: "A", label: "Use a functional state updater: `setCount((prev) => prev + 1)`." },
            { id: "B", label: "Directly mutate the state variable: `count = count + 1`." },
            { id: "C", label: "Reload the entire window via `window.location.reload()`." },
            { id: "D", label: "Store state in a global window variable instead." },
          ],
          correctOptionId: "A",
        },
      },
      {
        skillSlug: "html-css",
        name: "HTML & CSS",
        description: "Semantic HTML5, CSS Grid, Flexbox, responsive breakpoints, and Tailwind tokens.",
        skillType: "hard",
        importance: "high",
        targetLevel: 4,
      },
      {
        skillSlug: "nodejs",
        name: "Node.js",
        description: "Server-side JavaScript, event-driven runtime, Express/Next middleware, and npm packages.",
        skillType: "hard",
        importance: "critical",
        targetLevel: 4,
      },
      {
        skillSlug: "rest-apis",
        name: "REST API Development",
        description: "RESTful architecture, status codes (200, 400, 401, 500), payload validation, and CORS.",
        skillType: "hard",
        importance: "high",
        targetLevel: 5,
      },
      {
        skillSlug: "sql",
        name: "SQL & Relational Databases",
        description: "PostgreSQL schema design, primary/foreign keys, joins, indexes, and transactions.",
        skillType: "hard",
        importance: "critical",
        targetLevel: 4,
        scenarioQuestion: {
          id: "sq-sql-index",
          prompt: "Why do we add a B-tree index to a frequently queried column like `user_id` in PostgreSQL?",
          options: [
            { id: "A", label: "To speed up search queries from full table scan O(N) to index scan O(log N)." },
            { id: "B", label: "To automatically encrypt the table data on disk." },
            { id: "C", label: "To prevent users from inserting duplicate names." },
            { id: "D", label: "To allow the frontend to access the database without an API." },
          ],
          correctOptionId: "A",
        },
      },
      {
        skillSlug: "git-github",
        name: "Git & GitHub",
        description: "Branching strategies, commit hygiene, merge conflict resolution, and pull request reviews.",
        skillType: "hard",
        importance: "high",
        targetLevel: 4,
      },
      {
        skillSlug: "docker",
        name: "Docker & Containers",
        description: "Containerizing apps, writing clean Dockerfiles, and orchestrating local dev with Docker Compose.",
        skillType: "hard",
        importance: "medium",
        targetLevel: 3,
      },
      {
        skillSlug: "cloud-fundamentals",
        name: "Cloud Fundamentals",
        description: "Serverless functions, object storage (S3), environment variables, and CDN caching.",
        skillType: "hard",
        importance: "medium",
        targetLevel: 3,
      },
      {
        skillSlug: "problem-solving",
        name: "Problem-Solving",
        description: "Deconstructing complex bugs, breaking down user stories, and tracing runtime errors.",
        skillType: "soft",
        importance: "high",
        targetLevel: 4,
      },
      {
        skillSlug: "teamwork",
        name: "Teamwork & Collaboration",
        description: "Working effectively in multidisciplinary sprint teams, code reviews, and pair programming.",
        skillType: "soft",
        importance: "high",
        targetLevel: 4,
      },
    ],
  },

  "cybersecurity-systems-specialist": {
    slug: "cybersecurity-systems-specialist",
    title: "Cybersecurity & Systems Specialist",
    category: "Security & Systems",
    description: "Defend systems, audit web applications against the OWASP Top 10, configure Linux security, and manage secure identity authentication.",
    skills: [
      {
        skillSlug: "cybersecurity",
        name: "Cybersecurity Fundamentals",
        description: "OWASP Top 10 vulnerabilities (SQLi, XSS, CSRF), threat modeling, and defensive security posture.",
        skillType: "hard",
        importance: "critical",
        targetLevel: 5,
        scenarioQuestion: {
          id: "sq-sec-sqli",
          prompt: "What is the most effective engineering defense against SQL Injection in web backends?",
          options: [
            { id: "A", label: "Using parameterized queries / prepared statements with ORMs." },
            { id: "B", label: "Validating user input only with client-side JavaScript regex." },
            { id: "C", label: "Changing database passwords every week." },
            { id: "D", label: "Disabling SQL database logs entirely." },
          ],
          correctOptionId: "A",
        },
      },
      {
        skillSlug: "linux-cli",
        name: "Linux & Command Line",
        description: "Bash scripting, file permissions (chmod/chown), SSH keys, process management, and syslog audits.",
        skillType: "hard",
        importance: "critical",
        targetLevel: 5,
        scenarioQuestion: {
          id: "sq-linux-perm",
          prompt: "In Linux, what permission mode does `chmod 600 id_rsa` set on an SSH private key?",
          options: [
            { id: "A", label: "Read and write for owner only; no permissions for group and others." },
            { id: "B", label: "Full execute permissions for every user on the system." },
            { id: "C", label: "Read only for public web visitors." },
            { id: "D", label: "Deletes the SSH key immediately." },
          ],
          correctOptionId: "A",
        },
      },
      {
        skillSlug: "python",
        name: "Python for Security",
        description: "Automated network scanning, log parsing scripts, and exploit analysis tools.",
        skillType: "hard",
        importance: "high",
        targetLevel: 4,
      },
      {
        skillSlug: "cloud-fundamentals",
        name: "Cloud & Network Isolation",
        description: "IAM least-privilege policies, VPC security groups, firewall rules, and audit trails.",
        skillType: "hard",
        importance: "high",
        targetLevel: 4,
      },
      {
        skillSlug: "docker",
        name: "Docker & Container Security",
        description: "Running non-root containers, minimal base images (Alpine/Distroless), and vulnerability scanning.",
        skillType: "hard",
        importance: "medium",
        targetLevel: 3,
      },
      {
        skillSlug: "sql",
        name: "SQL & Relational Databases",
        description: "Understanding relational injection vectors and database access control permissions.",
        skillType: "hard",
        importance: "high",
        targetLevel: 4,
      },
      {
        skillSlug: "git-github",
        name: "Git & Secret Management",
        description: "Preventing leaked API keys/tokens in commits, using git-secrets, and branch protection.",
        skillType: "hard",
        importance: "medium",
        targetLevel: 4,
      },
      {
        skillSlug: "data-structures-algorithms",
        name: "Data Structures & Algorithms",
        description: "Algorithmic analysis, bitwise operations, hashing functions, and buffer boundary checks.",
        skillType: "hard",
        importance: "medium",
        targetLevel: 3,
      },
      {
        skillSlug: "ethical-judgment",
        name: "Ethical Judgment",
        description: "Strict adherence to white-hat ethics, responsible disclosure, and privacy compliance.",
        skillType: "soft",
        importance: "critical",
        targetLevel: 5,
      },
      {
        skillSlug: "attention-to-detail",
        name: "Attention to Detail",
        description: "Catching subtle misconfigurations, permission leaks, and anomalous server logs.",
        skillType: "soft",
        importance: "high",
        targetLevel: 5,
      },
    ],
  },

  "data-scientist-analytics-engineer": {
    slug: "data-scientist-analytics-engineer",
    title: "Data Scientist & Analytics Engineer",
    category: "Data Science & AI",
    description: "Extract actionable insights, design predictive machine learning models, write complex analytical SQL, and build compelling data visualizations.",
    skills: [
      {
        skillSlug: "python",
        name: "Python Programming",
        description: "Pandas dataframes, NumPy vectorization, data wrangling, and clean script design.",
        skillType: "hard",
        importance: "critical",
        targetLevel: 5,
        scenarioQuestion: {
          id: "sq-py-pandas",
          prompt: "For a Python data pipeline that needs to process a 500MB CSV file and filter rows, which approach is most idiomatic?",
          options: [
            { id: "A", label: "Load into a pandas or polars DataFrame and use vectorized boolean indexing." },
            { id: "B", label: "Rename the CSV file to .py and run it with Python." },
            { id: "C", label: "Convert the CSV manually into string comments in code." },
            { id: "D", label: "Iterate line by line with 5 nested for-loops." },
          ],
          correctOptionId: "A",
        },
      },
      {
        skillSlug: "sql",
        name: "SQL & Relational Analytics",
        description: "Window functions, aggregate groupings, CTEs (WITH queries), and cohort retention calculations.",
        skillType: "hard",
        importance: "critical",
        targetLevel: 5,
        scenarioQuestion: {
          id: "sq-sql-window",
          prompt: "What is the primary benefit of a SQL window function like `ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC)`?",
          options: [
            { id: "A", label: "It computes rank across partitions without collapsing individual rows like GROUP BY." },
            { id: "B", label: "It deletes duplicate rows directly from disk." },
            { id: "C", label: "It turns SQL queries into HTML web pages automatically." },
            { id: "D", label: "It speeds up database CPU clock speeds." },
          ],
          correctOptionId: "A",
        },
      },
      {
        skillSlug: "data-analysis",
        name: "Exploratory Data Analysis (EDA)",
        description: "Distribution inspection, missing data imputation, outlier detection, and correlation analysis.",
        skillType: "hard",
        importance: "critical",
        targetLevel: 5,
      },
      {
        skillSlug: "data-visualization",
        name: "Data Visualization",
        description: "Communicating findings with Matplotlib, Seaborn, interactive web charts, and narrative dashboards.",
        skillType: "hard",
        importance: "high",
        targetLevel: 4,
      },
      {
        skillSlug: "machine-learning",
        name: "Machine Learning Fundamentals",
        description: "Supervised classification/regression, train-test splitting, cross-validation, and metrics (AUC/F1).",
        skillType: "hard",
        importance: "critical",
        targetLevel: 4,
      },
      {
        skillSlug: "data-structures-algorithms",
        name: "Algorithms & Matrix Math",
        description: "Matrix multiplication, algorithmic complexity, Big-O analysis, and tree algorithms.",
        skillType: "hard",
        importance: "high",
        targetLevel: 4,
      },
      {
        skillSlug: "excel",
        name: "Excel & Tabular Modeling",
        description: "Pivot tables, XLOOKUP, data sanitization, and quick stakeholder financial models.",
        skillType: "hard",
        importance: "medium",
        targetLevel: 4,
      },
      {
        skillSlug: "git-github",
        name: "Git & Version Control",
        description: "Version controlling Jupyter notebooks, scripts, and collaborative data science repositories.",
        skillType: "hard",
        importance: "high",
        targetLevel: 4,
      },
      {
        skillSlug: "research-methods",
        name: "Research Methods & Hypothesis Testing",
        description: "A/B testing, statistical significance (p-values, t-tests), and structured experimentation.",
        skillType: "hard",
        importance: "high",
        targetLevel: 4,
      },
      {
        skillSlug: "written-communication",
        name: "Written Communication",
        description: "Translating statistical model findings into executive summaries and stakeholder memos.",
        skillType: "soft",
        importance: "high",
        targetLevel: 4,
      },
    ],
  },

  "technical-product-manager": {
    slug: "technical-product-manager",
    title: "Technical Product Manager",
    category: "Product & Leadership",
    description: "Align engineering, design, and business strategy to define product roadmaps, conduct user discovery, and drive agile sprint execution.",
    skills: [
      {
        skillSlug: "project-management-tools",
        name: "Project Management Tools",
        description: "Agile sprint planning, backlog grooming, Jira/Linear boards, and milestone roadmapping.",
        skillType: "hard",
        importance: "critical",
        targetLevel: 5,
      },
      {
        skillSlug: "customer-empathy",
        name: "Customer Empathy & Discovery",
        description: "Conducting user interviews, synthesizing pain points, and validating feature hypotheses.",
        skillType: "soft",
        importance: "critical",
        targetLevel: 5,
        scenarioQuestion: {
          id: "sq-pm-discovery",
          prompt: "When users report that 'the search bar is broken', what should a Technical PM do first?",
          options: [
            { id: "A", label: "Observe user workflow to discover root friction and review backend query latency." },
            { id: "B", label: "Immediately delete the search feature from the website." },
            { id: "C", label: "Tell the user they are using the computer incorrectly." },
            { id: "D", label: "Rewrite the entire database from scratch without investigation." },
          ],
          correctOptionId: "A",
        },
      },
      {
        skillSlug: "ui-ux-design",
        name: "UI/UX Design Heuristics",
        description: "Wireframing user journeys, usability heuristics, typography, and UX flow specifications.",
        skillType: "hard",
        importance: "high",
        targetLevel: 4,
      },
      {
        skillSlug: "data-analysis",
        name: "Product Analytics & Funnels",
        description: "Tracking conversion funnels, churn, retention, North Star metrics, and A/B test results.",
        skillType: "hard",
        importance: "high",
        targetLevel: 4,
      },
      {
        skillSlug: "decision-making",
        name: "Decision-Making & Trade-offs",
        description: "Balancing engineering technical debt, speed to market, and customer feature requests.",
        skillType: "soft",
        importance: "critical",
        targetLevel: 5,
      },
      {
        skillSlug: "leadership",
        name: "Leadership & Influence",
        description: "Inspiring cross-functional engineering and design squads without direct organizational authority.",
        skillType: "soft",
        importance: "critical",
        targetLevel: 5,
      },
      {
        skillSlug: "public-speaking",
        name: "Public Speaking & Pitching",
        description: "Presenting product visions, sprint demo days, executive pitches, and roadmaps with clarity.",
        skillType: "hard",
        importance: "high",
        targetLevel: 4,
      },
      {
        skillSlug: "written-communication",
        name: "Technical Specs & PRDs",
        description: "Writing concise Product Requirement Documents (PRDs) and user story acceptance criteria.",
        skillType: "soft",
        importance: "high",
        targetLevel: 5,
      },
      {
        skillSlug: "rest-apis",
        name: "System Architecture Awareness",
        description: "High-level understanding of APIs, frontend-backend latency, databases, and third-party integrations.",
        skillType: "hard",
        importance: "medium",
        targetLevel: 3,
      },
    ],
  },
};

/**
 * Maps onboarding mission (with interest fallback) to a primary goal definition
 */
export function getGoalForMission(
  mission: Mission | null,
  interests: Interest[] = [],
  customGoal?: string
): GoalDefinition {
  if (mission === "cybersecurity_internship") {
    return GOAL_CATALOGUE["cybersecurity-systems-specialist"];
  }

  if (mission === "data_science_internship") {
    return GOAL_CATALOGUE["data-scientist-analytics-engineer"];
  }

  if (mission === "software_development" || mission === "competition_ready") {
    return GOAL_CATALOGUE["full-stack-web-cloud-engineer"];
  }

  if (mission === "public_speaking") {
    return GOAL_CATALOGUE["technical-product-manager"];
  }

  // Custom mission or fallback: infer from interests
  if (interests.includes("cybersecurity")) {
    return GOAL_CATALOGUE["cybersecurity-systems-specialist"];
  }
  if (interests.includes("data_science")) {
    return GOAL_CATALOGUE["data-scientist-analytics-engineer"];
  }
  if (interests.includes("product") || interests.includes("leadership") || interests.includes("business")) {
    return GOAL_CATALOGUE["technical-product-manager"];
  }

  // Default fallback
  return GOAL_CATALOGUE["full-stack-web-cloud-engineer"];
}
