-- ==============================================================================
-- WHERE DO I BEGIN? - Seed Data Script
-- Database: PostgreSQL / Supabase
-- Knowledge Base: Soft Skills, Hard Skills, Skill Prerequisites, Career Goals,
--                 Goal-Skills, Learning Resources, Resource-Skills, TIET College Resources, Study Groups
-- ==============================================================================

-- Clear existing data if necessary (order matters due to foreign keys)
TRUNCATE TABLE public.group_members CASCADE;
TRUNCATE TABLE public.study_groups CASCADE;
TRUNCATE TABLE public.college_resources CASCADE;
TRUNCATE TABLE public.resource_skills CASCADE;
TRUNCATE TABLE public.resources CASCADE;
TRUNCATE TABLE public.skill_prerequisites CASCADE;
TRUNCATE TABLE public.goal_skills CASCADE;
TRUNCATE TABLE public.goals CASCADE;
TRUNCATE TABLE public.user_skills CASCADE;
TRUNCATE TABLE public.skills CASCADE;

-- ==============================================================================
-- 1. SEED SOFT SKILLS (30 items)
-- ==============================================================================
INSERT INTO public.skills (slug, name, description, category, skill_type, max_level) VALUES
('written-communication', 'Written communication', 'Ability to convey complex technical concepts, reports, and messages clearly in writing', 'Communication', 'soft', 6),
('verbal-communication', 'Verbal communication', 'Articulate verbal expression, technical discussions, and presentations', 'Communication', 'soft', 6),
('active-listening', 'Active listening', 'Fully absorbing, understanding, and thoughtfully responding to team members and stakeholders', 'Communication', 'soft', 6),
('teamwork', 'Teamwork', 'Cooperating effectively within multidisciplinary engineering and product teams', 'Collaboration', 'soft', 6),
('collaboration', 'Collaboration', 'Cross-functional alignment, peer code reviews, and shared ownership of deliverables', 'Collaboration', 'soft', 6),
('leadership', 'Leadership', 'Guiding, inspiring, and coordinating technical teams towards shared milestones', 'Leadership', 'soft', 6),
('critical-thinking', 'Critical thinking', 'Objective analysis, trade-off evaluation, and logical hypothesis testing', 'Cognitive', 'soft', 6),
('problem-solving', 'Problem-solving', 'Deconstructing complex engineering bottlenecks into actionable, scalable solutions', 'Cognitive', 'soft', 6),
('creativity', 'Creativity', 'Original design thinking, innovative feature concepts, and lateral problem approaches', 'Cognitive', 'soft', 6),
('adaptability', 'Adaptability', 'Pivoting quickly in response to evolving tech stacks, requirements, and constraints', 'Work Ethic', 'soft', 6),
('time-management', 'Time management', 'Prioritizing sprint tickets, managing deep work, and delivering on schedule', 'Productivity', 'soft', 6),
('organization', 'Organization', 'Structuring workflows, documentation, tasks, and project assets systematically', 'Productivity', 'soft', 6),
('self-discipline', 'Self-discipline', 'Maintaining focused consistency in self-learning, coding habits, and task completion', 'Personal Growth', 'soft', 6),
('initiative', 'Initiative', 'Proactively discovering opportunities, proposing architectural improvements, and building side projects', 'Personal Growth', 'soft', 6),
('accountability', 'Accountability', 'Taking full ownership of code quality, outcomes, mistakes, and team commitments', 'Professionalism', 'soft', 6),
('resilience', 'Resilience', 'Overcoming debugging dead-ends, rejection, and production challenges constructively', 'Personal Growth', 'soft', 6),
('emotional-intelligence', 'Emotional intelligence', 'Perceiving, understanding, and managing interpersonal dynamics and stress', 'Interpersonal', 'soft', 6),
('empathy', 'Empathy', 'Understanding user pain points, team member perspectives, and accessibility needs', 'Interpersonal', 'soft', 6),
('conflict-resolution', 'Conflict resolution', 'De-escalating technical disagreements and finding productive consensus in engineering debates', 'Interpersonal', 'soft', 6),
('negotiation', 'Negotiation', 'Aligning on timelines, sprint scopes, feature trade-offs, and resource allocation', 'Communication', 'soft', 6),
('decision-making', 'Decision-making', 'Choosing pragmatic architectural solutions under conditions of uncertainty', 'Cognitive', 'soft', 6),
('attention-to-detail', 'Attention to detail', 'Catching edge cases, race conditions, styling inconsistencies, and regression bugs', 'Productivity', 'soft', 6),
('professionalism', 'Professionalism', 'Upholding high standards of work ethic, stakeholder communication, and reliability', 'Professionalism', 'soft', 6),
('ethical-judgment', 'Ethical judgment', 'Navigating data privacy, AI ethics, intellectual property, and secure coding practices', 'Professionalism', 'soft', 6),
('networking', 'Networking', 'Building meaningful professional relationships with peers, alumni, and industry mentors', 'Career', 'soft', 6),
('receiving-feedback', 'Receiving feedback', 'Absorbing code review feedback and constructive criticism with an open, growth mindset', 'Personal Growth', 'soft', 6),
('giving-feedback', 'Giving constructive feedback', 'Providing actionable, empathetic, and specific peer code reviews and architectural advice', 'Communication', 'soft', 6),
('cultural-awareness', 'Cultural awareness', 'Working harmoniously across diverse, globally distributed engineering teams', 'Interpersonal', 'soft', 6),
('customer-empathy', 'Customer empathy', 'Viewing software through the lens of real user experience, accessibility, and customer value', 'Interpersonal', 'soft', 6),
('career-self-development', 'Career self-development', 'Continuous self-directed upskilling, career roadmapping, and milestone reflection', 'Career', 'soft', 6);

-- ==============================================================================
-- 2. SEED HARD SKILLS (30 items)
-- ==============================================================================
INSERT INTO public.skills (slug, name, description, category, skill_type, max_level) VALUES
('python', 'Python programming', 'Core Python, object-oriented design, scripting, data handling, and backend APIs', 'Programming', 'hard', 6),
('java', 'Java programming', 'Object-oriented programming, JVM internals, multithreading, and Spring frameworks', 'Programming', 'hard', 6),
('javascript', 'JavaScript', 'Modern ECMAScript (ES6+), async/await, closures, event loop, and DOM manipulation', 'Programming', 'hard', 6),
('typescript', 'TypeScript', 'Static typing, generics, interfaces, type narrowing, and scalable application design', 'Programming', 'hard', 6),
('html-css', 'HTML and CSS', 'Semantic HTML5, CSS Grid, Flexbox, responsive design, and CSS variables', 'Frontend', 'hard', 6),
('react', 'React', 'Component architecture, hooks, state management, Server Components, and client rendering', 'Frontend', 'hard', 6),
('nodejs', 'Node.js', 'Event-driven asynchronous I/O, Express/Fastify backends, npm ecosystem, and middleware', 'Backend', 'hard', 6),
('sql', 'SQL and relational databases', 'Schema design, complex joins, indexing, query optimization, and transactions in PostgreSQL', 'Database', 'hard', 6),
('git-github', 'Git and GitHub', 'Version control, branching strategies, rebasing, pull request workflows, and CI integration', 'DevOps & Tools', 'hard', 6),
('data-structures-algorithms', 'Data structures and algorithms', 'Arrays, trees, graphs, dynamic programming, complexity analysis (Big-O), and coding interview prep', 'Computer Science Core', 'hard', 6),
('rest-apis', 'REST API development', 'RESTful architecture, status codes, payload design, authentication, and OpenAPI documentation', 'Backend', 'hard', 6),
('cloud-fundamentals', 'Cloud fundamentals', 'Compute, storage, IAM, serverless, VPCs, and deployment on AWS/GCP/Azure', 'Cloud', 'hard', 6),
('docker', 'Docker and containers', 'Containerization, Dockerfile optimization, multi-stage builds, and Docker Compose orchestration', 'DevOps & Tools', 'hard', 6),
('cybersecurity', 'Cybersecurity fundamentals', 'OWASP Top 10, encryption, JWT/OAuth auth flows, network defense, and vulnerability scanning', 'Security', 'hard', 6),
('linux-cli', 'Linux and command line', 'Bash scripting, file permissions, process management, SSH, and Linux server administration', 'Systems', 'hard', 6),
('excel', 'Excel', 'Data cleaning, pivot tables, VLOOKUP/XLOOKUP, formulas, and tabular modeling', 'Data Analysis', 'hard', 6),
('data-analysis', 'Data analysis', 'Exploratory data analysis (EDA), Pandas/NumPy, statistical inference, and insight extraction', 'Data Analysis', 'hard', 6),
('data-visualization', 'Data visualization', 'Communicating data narratives with Matplotlib, Seaborn, Tableau, and interactive web charts', 'Data Analysis', 'hard', 6),
('machine-learning', 'Machine learning fundamentals', 'Supervised/unsupervised algorithms, Scikit-Learn, loss functions, and neural network basics', 'AI & Machine Learning', 'hard', 6),
('ui-ux-design', 'UI/UX design', 'User research, wireframing, usability heuristics, typography, color theory, and interaction design', 'Design', 'hard', 6),
('figma', 'Figma', 'Vector design, auto-layout, design systems, interactive prototyping, and developer handoff', 'Design', 'hard', 6),
('graphic-design', 'Graphic design', 'Visual hierarchy, composition, brand identity, typography, and asset creation', 'Design', 'hard', 6),
('video-editing', 'Video editing', 'Timeline pacing, audio syncing, color grading, and video storytelling', 'Media', 'hard', 6),
('digital-marketing', 'Digital marketing', 'Inbound marketing, conversion funnels, analytics tracking, and growth marketing', 'Marketing', 'hard', 6),
('seo', 'Search engine optimization', 'On-page SEO, technical crawling, semantic keywords, page speed, and schema markup', 'Marketing', 'hard', 6),
('content-writing', 'Content writing', 'Technical copywriting, developer documentation, tutorials, and storytelling', 'Content', 'hard', 6),
('public-speaking', 'Public speaking', 'Slide deck presentation, conference speaking, pitch delivery, and hackathon demos', 'Communication', 'hard', 6),
('financial-modeling', 'Financial modeling', 'Cash flow analysis, unit economics, valuation models, and spreadsheet projections', 'Finance', 'hard', 6),
('project-management-tools', 'Project management tools', 'Agile sprints, Kanban boards, Jira, Linear, Notion, and milestone tracking', 'Productivity', 'hard', 6),
('research-methods', 'Research methods', 'Literature review, empirical data collection, benchmarking, and structured scientific inquiry', 'Research', 'hard', 6);

-- ==============================================================================
-- 3. SEED SKILL PREREQUISITES (Relationship Strength 1-5)
-- 5: Essential, 4: Strong, 3: Helpful foundation, 2: Light supporting, 1: Optional
-- ==============================================================================

-- Helper CTE function to insert prerequisite relationships by slug
WITH prereq_data (skill_slug, prereq_slug, strength) AS (
    VALUES
    -- Hard Skill Prerequisites
    ('python', 'data-structures-algorithms', 3),
    ('java', 'data-structures-algorithms', 3),
    ('javascript', 'html-css', 4),
    ('typescript', 'javascript', 5),
    ('react', 'javascript', 5),
    ('react', 'html-css', 4),
    ('nodejs', 'javascript', 5),
    ('sql', 'data-analysis', 2),
    ('git-github', 'linux-cli', 2),
    ('rest-apis', 'nodejs', 4),
    ('rest-apis', 'javascript', 3),
    ('cloud-fundamentals', 'linux-cli', 3),
    ('docker', 'linux-cli', 4),
    ('docker', 'cloud-fundamentals', 3),
    ('cybersecurity', 'linux-cli', 4),
    ('cybersecurity', 'cloud-fundamentals', 3),
    ('data-analysis', 'excel', 4),
    ('data-analysis', 'sql', 3),
    ('data-visualization', 'data-analysis', 5),
    ('machine-learning', 'data-analysis', 5),
    ('machine-learning', 'python', 4),
    ('figma', 'ui-ux-design', 4),
    ('digital-marketing', 'content-writing', 3),
    ('digital-marketing', 'data-analysis', 2),
    ('seo', 'content-writing', 4),
    ('seo', 'digital-marketing', 3),
    ('content-writing', 'written-communication', 4),
    ('public-speaking', 'verbal-communication', 4),
    ('financial-modeling', 'excel', 5),
    ('financial-modeling', 'data-analysis', 3),
    ('project-management-tools', 'organization', 3),
    ('project-management-tools', 'time-management', 3),
    ('research-methods', 'critical-thinking', 4),
    ('research-methods', 'written-communication', 3),

    -- Soft Skill Prerequisites
    ('active-listening', 'empathy', 3),
    ('teamwork', 'verbal-communication', 3),
    ('teamwork', 'active-listening', 4),
    ('collaboration', 'teamwork', 4),
    ('collaboration', 'active-listening', 3),
    ('leadership', 'teamwork', 4),
    ('leadership', 'accountability', 4),
    ('problem-solving', 'critical-thinking', 5),
    ('adaptability', 'resilience', 3),
    ('time-management', 'organization', 4),
    ('self-discipline', 'time-management', 3),
    ('initiative', 'self-discipline', 3),
    ('accountability', 'self-discipline', 4),
    ('resilience', 'adaptability', 3),
    ('emotional-intelligence', 'empathy', 4),
    ('empathy', 'active-listening', 3),
    ('conflict-resolution', 'active-listening', 4),
    ('conflict-resolution', 'emotional-intelligence', 4),
    ('negotiation', 'verbal-communication', 4),
    ('negotiation', 'active-listening', 4),
    ('decision-making', 'critical-thinking', 5),
    ('attention-to-detail', 'organization', 3),
    ('professionalism', 'accountability', 4),
    ('professionalism', 'time-management', 3),
    ('ethical-judgment', 'critical-thinking', 4),
    ('networking', 'verbal-communication', 4),
    ('networking', 'professionalism', 3),
    ('receiving-feedback', 'active-listening', 4),
    ('receiving-feedback', 'resilience', 3),
    ('giving-feedback', 'empathy', 4),
    ('giving-feedback', 'verbal-communication', 4),
    ('cultural-awareness', 'empathy', 4),
    ('customer-empathy', 'empathy', 5),
    ('customer-empathy', 'active-listening', 4),
    ('career-self-development', 'initiative', 4),
    ('career-self-development', 'self-discipline', 3)
)
INSERT INTO public.skill_prerequisites (skill_id, prerequisite_skill_id, relationship_strength)
SELECT 
    s.id AS skill_id,
    p.id AS prerequisite_skill_id,
    pd.strength AS relationship_strength
FROM prereq_data pd
JOIN public.skills s ON s.slug = pd.skill_slug
JOIN public.skills p ON p.slug = pd.prereq_slug
ON CONFLICT (skill_id, prerequisite_skill_id) DO NOTHING;

-- ==============================================================================
-- 4. SEED CAREER GOALS (6 High-Demand Tech Roles)
-- ==============================================================================
INSERT INTO public.goals (slug, name, description, category, target_role) VALUES
('fullstack-engineer', 'Full-Stack Web & Cloud Engineer', 'Build production-grade web applications with modern frontend architectures, REST/GraphQL APIs, relational databases, and containerized cloud deployments.', 'Software Engineering', 'Junior to Mid-Level Full-Stack Developer'),
('ai-ml-engineer', 'AI & Machine Learning Engineer', 'Develop and deploy intelligent machine learning pipelines, deep learning models, embeddings, and generative AI features into production software.', 'Artificial Intelligence', 'Junior AI/ML Engineer'),
('cybersecurity-analyst', 'Cybersecurity & Systems Specialist', 'Protect systems, conduct vulnerability diagnostics, configure secure authentication, and implement defensive security protocols across cloud and network infrastructure.', 'Security & Systems', 'Associate Security Analyst / DevSecOps Engineer'),
('data-scientist', 'Data Scientist & Analytics Engineer', 'Extract actionable business insights, design statistical models, build data pipelines, and present executive data visualizations from massive datasets.', 'Data Science', 'Junior Data Scientist / BI Analyst'),
('product-manager', 'Technical Product Manager', 'Bridge engineering, user experience, and business strategy to define product roadmaps, prioritize feature backlogs, and lead sprint execution.', 'Product & Management', 'Associate Product Manager (APM)'),
('backend-distributed-engineer', 'Backend & Distributed Systems Engineer', 'Design high-throughput APIs, event-driven message queues, microservices, and database transaction engines capable of massive scale.', 'Software Engineering', 'Junior Backend Engineer');

-- ==============================================================================
-- 5. SEED GOAL_SKILLS (Required Skills per Career Goal)
-- ==============================================================================
WITH goal_skill_mappings (goal_slug, skill_slug, target_lvl, imp, rat) AS (
    VALUES
    -- Full-Stack Engineer
    ('fullstack-engineer', 'javascript', 5, 'critical', 'Foundational language for full-stack web and node execution.'),
    ('fullstack-engineer', 'typescript', 5, 'critical', 'Industry standard for type safety and maintainable production codebases.'),
    ('fullstack-engineer', 'react', 5, 'critical', 'Primary frontend UI framework for modern interactive applications.'),
    ('fullstack-engineer', 'nodejs', 4, 'critical', 'Runtime for server-side APIs and background logic.'),
    ('fullstack-engineer', 'sql', 4, 'critical', 'Essential for relational data modeling and querying in PostgreSQL.'),
    ('fullstack-engineer', 'html-css', 4, 'high', 'Semantic markup and responsive styling fundamentals.'),
    ('fullstack-engineer', 'rest-apis', 5, 'high', 'Designing predictable, secure API endpoints.'),
    ('fullstack-engineer', 'git-github', 4, 'high', 'Collaborative version control and pull request workflows.'),
    ('fullstack-engineer', 'docker', 3, 'medium', 'Containerization for consistent local and cloud deployment.'),
    ('fullstack-engineer', 'cloud-fundamentals', 3, 'medium', 'Hosting, CDN, and environment variables on cloud platforms.'),
    ('fullstack-engineer', 'problem-solving', 4, 'high', 'Debugging intricate full-stack architectural issues.'),
    ('fullstack-engineer', 'teamwork', 4, 'high', 'Working smoothly within agile sprint teams.'),

    -- AI & ML Engineer
    ('ai-ml-engineer', 'python', 5, 'critical', 'Primary programming language for all AI, PyTorch, and data science workflows.'),
    ('ai-ml-engineer', 'machine-learning', 5, 'critical', 'Core algorithms, loss functions, training loops, and validation methods.'),
    ('ai-ml-engineer', 'data-analysis', 4, 'critical', 'Feature engineering and dataset preprocessing.'),
    ('ai-ml-engineer', 'data-structures-algorithms', 4, 'high', 'Efficient matrix operations and algorithmic complexity.'),
    ('ai-ml-engineer', 'sql', 4, 'high', 'Querying training data from analytical warehouses.'),
    ('ai-ml-engineer', 'docker', 3, 'medium', 'Deploying model inference services inside containers.'),
    ('ai-ml-engineer', 'critical-thinking', 5, 'high', 'Evaluating model hallucinations, bias, and performance metrics.'),

    -- Cybersecurity Specialist
    ('cybersecurity-analyst', 'cybersecurity', 5, 'critical', 'OWASP standards, threat modeling, and defensive security posture.'),
    ('cybersecurity-analyst', 'linux-cli', 5, 'critical', 'Command-line system auditing, permissions, and log analysis.'),
    ('cybersecurity-analyst', 'cloud-fundamentals', 4, 'high', 'IAM policies, VPC network isolation, and cloud audit logs.'),
    ('cybersecurity-analyst', 'python', 3, 'medium', 'Security automation scripting and exploit analysis.'),
    ('cybersecurity-analyst', 'sql', 3, 'high', 'Detecting and preventing SQL injection vulnerabilities.'),
    ('cybersecurity-analyst', 'ethical-judgment', 5, 'critical', 'Strict adherence to legal and white-hat security standards.'),
    ('cybersecurity-analyst', 'attention-to-detail', 5, 'high', 'Pinpointing subtle configuration leaks and anomalies.'),

    -- Data Scientist
    ('data-scientist', 'python', 5, 'critical', 'Data manipulation with Pandas, NumPy, and statistical packages.'),
    ('data-scientist', 'sql', 5, 'critical', 'Window functions, CTEs, and large-scale data extraction.'),
    ('data-scientist', 'data-analysis', 5, 'critical', 'Statistical modeling, hypothesis testing, and EDA.'),
    ('data-visualization', 'data-visualization', 4, 'high', 'Building executive dashboards and compelling charts.'),
    ('data-scientist', 'machine-learning', 4, 'high', 'Predictive modeling and classification pipelines.'),
    ('data-scientist', 'written-communication', 4, 'high', 'Translating technical findings into clear stakeholder reports.'),

    -- Technical Product Manager
    ('product-manager', 'project-management-tools', 5, 'critical', 'Sprint planning, Jira/Notion roadmaps, and backlog grooming.'),
    ('product-manager', 'customer-empathy', 5, 'critical', 'Conducting user interviews and understanding pain points.'),
    ('product-manager', 'ui-ux-design', 4, 'high', 'Wireframing user journeys and collaborating with product designers.'),
    ('product-manager', 'data-analysis', 4, 'high', 'Measuring product metrics, retention, and conversion funnels.'),
    ('product-manager', 'leadership', 5, 'critical', 'Inspiring cross-functional teams without direct authority.'),
    ('product-manager', 'decision-making', 5, 'critical', 'Making tough feature prioritization trade-offs under constraints.'),

    -- Backend & Distributed Systems
    ('backend-distributed-engineer', 'nodejs', 5, 'critical', 'Scalable asynchronous event-driven server design.'),
    ('backend-distributed-engineer', 'typescript', 5, 'critical', 'Type-safe contracts across complex backend domains.'),
    ('backend-distributed-engineer', 'sql', 5, 'critical', 'PostgreSQL database tuning, transactions, and indexing.'),
    ('backend-distributed-engineer', 'rest-apis', 5, 'critical', 'High-throughput microservices and API gateways.'),
    ('backend-distributed-engineer', 'docker', 4, 'high', 'Containerized orchestration and local microservice dev environments.'),
    ('backend-distributed-engineer', 'linux-cli', 4, 'high', 'Server troubleshooting, shell scripts, and remote operations.'),
    ('backend-distributed-engineer', 'data-structures-algorithms', 5, 'high', 'Cache invalidation, concurrency locks, and algorithmic throughput.')
)
INSERT INTO public.goal_skills (goal_id, skill_id, target_level, importance, rationale)
SELECT 
    g.id AS goal_id,
    s.id AS skill_id,
    gsm.target_lvl AS target_level,
    gsm.imp AS importance,
    gsm.rat AS rationale
FROM goal_skill_mappings gsm
JOIN public.goals g ON g.slug = gsm.goal_slug
JOIN public.skills s ON s.slug = gsm.skill_slug
ON CONFLICT (goal_id, skill_id) DO NOTHING;

-- ==============================================================================
-- 6. SEED LEARNING RESOURCES (18 High-Yield Vetted Items)
-- ==============================================================================
INSERT INTO public.resources (title, description, type, provider, url, difficulty, estimated_hours, format, source, is_college_resource) VALUES
('Total TypeScript Core Essentials', 'Comprehensive deep dive into TypeScript generics, unions, narrowing, and type gymnastics by Matt Pocock.', 'course', 'Total TypeScript', 'https://www.totaltypescript.com/tutorials', 'intermediate', 12, 'interactive', 'curated', false),
('Next.js 15 App Router Architecture Guide', 'Official deep dive into React Server Components, Server Actions, route handlers, and streaming suspense.', 'documentation', 'Vercel / Next.js', 'https://nextjs.org/docs', 'intermediate', 15, 'text', 'curated', false),
('Designing Data-Intensive Applications', 'The definitive engineering manual on storage engines, distributed transactions, consensus, and replication.', 'book', 'O Reilly / Martin Kleppmann', 'https://dataintensive.net/', 'advanced', 40, 'text', 'curated', false),
('Docker for Developers: From Scratch to Production', 'Hands-on containerization tutorial focusing on multi-stage builds, caching, and Docker Compose development.', 'workshop', 'Docker Docs', 'https://docs.docker.com/get-started/', 'beginner', 8, 'interactive', 'curated', false),
('PostgreSQL Tutorial & Query Tuning Sandbox', 'Master indexes, explain analyze, foreign keys, and PostgreSQL performance optimization techniques.', 'practice', 'PostgreSQL Tutorial', 'https://www.postgresqltutorial.com/', 'intermediate', 16, 'interactive', 'curated', false),
('Full Stack Open: Deep Dive into Modern Web Development', 'World-class University of Helsinki curriculum covering React, Node.js, REST APIs, TypeScript, and CI/CD.', 'course', 'University of Helsinki', 'https://fullstackopen.com/en/', 'intermediate', 60, 'mixed', 'curated', false),
('CS50x: Introduction to Computer Science', 'Harvard University foundation in algorithms, memory management, C, Python, and computational problem-solving.', 'course', 'Harvard University / edX', 'https://cs50.harvard.edu/x/', 'beginner', 80, 'video', 'curated', false),
('NeetCode 150: Essential Algorithms & Data Structures', 'Curated pattern-based guide to cracking coding interviews covering trees, dynamic programming, and graphs.', 'practice', 'NeetCode', 'https://neetcode.io/practice', 'intermediate', 50, 'interactive', 'curated', false),
('Fast.ai: Practical Deep Learning for Coders', 'Top-down machine learning and deep learning course teaching neural networks with PyTorch and computer vision.', 'course', 'Fast.ai', 'https://course.fast.ai/', 'intermediate', 45, 'video', 'curated', false),
('Kaggle Learn: Python & Data Analysis Micro-Courses', 'Hands-on Jupyter notebook interactive exercises for pandas, data cleaning, and machine learning models.', 'practice', 'Kaggle', 'https://www.kaggle.com/learn', 'beginner', 10, 'interactive', 'curated', false),
('OWASP Top 10 Web Security Vulnerabilities', 'Hands-on standard awareness document and interactive labs covering injection, broken auth, and security misconfigs.', 'documentation', 'OWASP Foundation', 'https://owasp.org/www-project-top-ten/', 'intermediate', 14, 'mixed', 'curated', false),
('Linux Journey: Command Line Mastery', 'Self-guided interactive path through command line syntax, permissions, processes, and Linux system admin.', 'practice', 'Linux Journey', 'https://linuxjourney.com/', 'beginner', 10, 'interactive', 'curated', false),
('Refactoring UI: Practical Design for Developers', 'Tactical UI/UX design heuristics, layout balance, typography, and color palettes for software engineers.', 'book', 'Adam Wathan & Steve Schoger', 'https://www.refactoringui.com/', 'beginner', 6, 'text', 'curated', false),
('Figma for UI Designers: Comprehensive Crash Course', 'Learn auto-layout, component variants, design tokens, and interactive prototype handoff.', 'video', 'Figma Official', 'https://www.youtube.com/@Figma', 'beginner', 8, 'video', 'curated', false),
('The Lean Product Playbook', 'How to innovate with minimum viable products, user empathy, customer discovery interviews, and rapid iteration.', 'book', 'Dan Olsen / Wiley', 'https://leanproductplaybook.com/', 'intermediate', 18, 'text', 'curated', false),
('GitHub Skills: Automated Workflows with GitHub Actions', 'Interactive repository labs teaching CI/CD pipelines, automated testing, and release tagging.', 'project', 'GitHub Skills', 'https://skills.github.com/', 'beginner', 6, 'interactive', 'curated', false),
('System Design Primer: Scalable Distributed Systems', 'An organized collection of distributed system patterns, CDN caching, load balancers, and asynchronous queues.', 'documentation', 'Donne Martin / GitHub', 'https://github.com/donnemartin/system-design-primer', 'advanced', 35, 'text', 'curated', false),
('Effective Communication for Software Engineers', 'Guide on writing clear technical design docs (RFCs), giving empathetic code reviews, and cross-team alignment.', 'documentation', 'LeadDev', 'https://leaddev.com/', 'beginner', 5, 'text', 'curated', false);

-- ==============================================================================
-- 7. SEED RESOURCE_SKILLS (Linking Learning Materials to Skills)
-- ==============================================================================
WITH resource_skill_mappings (resource_title, skill_slug, relevance) AS (
    VALUES
    ('Total TypeScript Core Essentials', 'typescript', 5),
    ('Total TypeScript Core Essentials', 'javascript', 4),
    ('Next.js 15 App Router Architecture Guide', 'react', 5),
    ('Next.js 15 App Router Architecture Guide', 'typescript', 4),
    ('Next.js 15 App Router Architecture Guide', 'rest-apis', 4),
    ('Designing Data-Intensive Applications', 'sql', 5),
    ('Designing Data-Intensive Applications', 'data-structures-algorithms', 4),
    ('Designing Data-Intensive Applications', 'problem-solving', 5),
    ('Docker for Developers: From Scratch to Production', 'docker', 5),
    ('Docker for Developers: From Scratch to Production', 'linux-cli', 4),
    ('Docker for Developers: From Scratch to Production', 'cloud-fundamentals', 3),
    ('PostgreSQL Tutorial & Query Tuning Sandbox', 'sql', 5),
    ('PostgreSQL Tutorial & Query Tuning Sandbox', 'data-analysis', 3),
    ('Full Stack Open: Deep Dive into Modern Web Development', 'react', 5),
    ('Full Stack Open: Deep Dive into Modern Web Development', 'nodejs', 5),
    ('Full Stack Open: Deep Dive into Modern Web Development', 'typescript', 4),
    ('CS50x: Introduction to Computer Science', 'data-structures-algorithms', 5),
    ('CS50x: Introduction to Computer Science', 'python', 4),
    ('CS50x: Introduction to Computer Science', 'problem-solving', 5),
    ('NeetCode 150: Essential Algorithms & Data Structures', 'data-structures-algorithms', 5),
    ('NeetCode 150: Essential Algorithms & Data Structures', 'problem-solving', 5),
    ('Fast.ai: Practical Deep Learning for Coders', 'machine-learning', 5),
    ('Fast.ai: Practical Deep Learning for Coders', 'python', 4),
    ('Kaggle Learn: Python & Data Analysis Micro-Courses', 'data-analysis', 5),
    ('Kaggle Learn: Python & Data Analysis Micro-Courses', 'python', 4),
    ('OWASP Top 10 Web Security Vulnerabilities', 'cybersecurity', 5),
    ('OWASP Top 10 Web Security Vulnerabilities', 'ethical-judgment', 4),
    ('Linux Journey: Command Line Mastery', 'linux-cli', 5),
    ('Refactoring UI: Practical Design for Developers', 'ui-ux-design', 5),
    ('Refactoring UI: Practical Design for Developers', 'html-css', 4),
    ('Figma for UI Designers: Comprehensive Crash Course', 'figma', 5),
    ('Figma for UI Designers: Comprehensive Crash Course', 'ui-ux-design', 4),
    ('The Lean Product Playbook', 'project-management-tools', 5),
    ('The Lean Product Playbook', 'customer-empathy', 5),
    ('The Lean Product Playbook', 'decision-making', 4),
    ('GitHub Skills: Automated Workflows with GitHub Actions', 'git-github', 5),
    ('GitHub Skills: Automated Workflows with GitHub Actions', 'cloud-fundamentals', 3),
    ('System Design Primer: Scalable Distributed Systems', 'rest-apis', 5),
    ('System Design Primer: Scalable Distributed Systems', 'sql', 4),
    ('System Design Primer: Scalable Distributed Systems', 'problem-solving', 5),
    ('Effective Communication for Software Engineers', 'written-communication', 5),
    ('Effective Communication for Software Engineers', 'giving-feedback', 5),
    ('Effective Communication for Software Engineers', 'collaboration', 4)
)
INSERT INTO public.resource_skills (resource_id, skill_id, relevance_score)
SELECT 
    r.id AS resource_id,
    s.id AS skill_id,
    rsm.relevance AS relevance_score
FROM resource_skill_mappings rsm
JOIN public.resources r ON r.title = rsm.resource_title
JOIN public.skills s ON s.slug = rsm.skill_slug
ON CONFLICT (resource_id, skill_id) DO NOTHING;

-- ==============================================================================
-- 8. SEED COLLEGE RESOURCES (Thapar Institute of Engineering & Technology)
-- ==============================================================================
INSERT INTO public.college_resources (college, title, type, description, skills, availability, eligibility, estimated_time_commitment, url) VALUES
('Thapar Institute of Engineering and Technology', 'Creative Computing Society (CCS TIET)', 'club', 'Premier technical society at TIET focusing on web development, mobile apps, open-source projects, and UI/UX design workshops.', ARRAY['JavaScript', 'TypeScript', 'React', 'Node.js', 'UI/UX Design', 'Teamwork'], 'Year-round / Annual Induction in August', 'Open to all TIET undergraduate and graduate students', '4-6 hours/week', 'https://ccs-tiet.github.io/'),
('Thapar Institute of Engineering and Technology', 'OWASP TIET Student Chapter', 'club', 'Active cybersecurity student chapter organizing CTF competitions, security audits, penetration testing workshops, and defense hackathons.', ARRAY['Cybersecurity', 'Linux', 'Python', 'Ethical Judgment', 'Problem-solving'], 'Year-round / Open workshops each semester', 'Open to all TIET students interested in information security', '3-5 hours/week', 'https://owasptiet.com/'),
('Thapar Institute of Engineering and Technology', 'ACM TIET Student Chapter', 'club', 'Competitive programming hub and computer science society hosting algorithm sprints, ICPC coaching, and hackathons.', ARRAY['Data structures and algorithms', 'Python', 'Java', 'Problem-solving', 'Critical thinking'], 'Year-round with weekly practice sessions', 'Open to all TIET students across engineering disciplines', '4-8 hours/week', 'https://acm.thapar.edu/'),
('Thapar Institute of Engineering and Technology', 'MLSC TIET (Microsoft Learn Student Chapter)', 'club', 'Student community dedicated to machine learning, cloud architectures on Azure, generative AI, and collaborative software projects.', ARRAY['Machine learning', 'Python', 'Cloud fundamentals', 'Collaboration'], 'Year-round', 'Open to all TIET students', '3-5 hours/week', 'https://mlsctiet.com/'),
('Thapar Institute of Engineering and Technology', 'TIET Venture Lab & STEP (Science & Technology Entrepreneurs Park)', 'workshop', 'Campus startup incubator providing pre-seed mentorship, patent filing support, prototyping grants, and investor demo days.', ARRAY['Project management tools', 'Financial modeling', 'Initiative', 'Leadership', 'Decision-making'], 'Continuous cohort intakes every semester', 'TIET student founders and early-stage project teams', '6-10 hours/week', 'https://venturelab.thapar.edu/'),
('Thapar Institute of Engineering and Technology', 'Experiential Learning Centre (ELC) Advanced Prototyping Labs', 'lab', 'State-of-the-art multidisciplinary maker space featuring high-performance computing clusters, IoT prototyping stations, and 3D printing suites.', ARRAY['Linux', 'Docker', 'Problem-solving', 'Attention to detail'], 'Monday to Saturday, 9:00 AM - 9:00 PM IST', 'TIET students working on verified capstones, research, or competitions', 'Self-scheduled project hours', 'https://elc.thapar.edu/');

-- ==============================================================================
-- 9. SEED STUDY GROUPS (Campus Peer Learning Squads)
-- ==============================================================================
INSERT INTO public.study_groups (name, goal_id, description, meeting_schedule, skill_focus, max_members)
SELECT
    'TIET Full-Stack Hackathon Squad #1' AS name,
    g.id AS goal_id,
    'Weekly collaborative sprint building production Next.js, TypeScript, and Supabase projects for upcoming national hackathons.' AS description,
    'Tuesdays & Thursdays 7:00 PM - 9:00 PM IST' AS meeting_schedule,
    ARRAY['Next.js', 'TypeScript', 'PostgreSQL', 'Docker', 'Teamwork'] AS skill_focus,
    8 AS max_members
FROM public.goals g WHERE g.slug = 'fullstack-engineer';

INSERT INTO public.study_groups (name, goal_id, description, meeting_schedule, skill_focus, max_members)
SELECT
    'NeetCode 150 & DSA Interview Sprint' AS name,
    g.id AS goal_id,
    'Daily mock technical interviews and algorithmic problem solving in Python and C++ to prepare for campus placement season.' AS description,
    'Daily 9:00 PM - 10:00 PM IST' AS meeting_schedule,
    ARRAY['Data structures and algorithms', 'Problem-solving', 'Critical thinking'] AS skill_focus,
    10 AS max_members
FROM public.goals g WHERE g.slug = 'backend-distributed-engineer';

INSERT INTO public.study_groups (name, goal_id, description, meeting_schedule, skill_focus, max_members)
SELECT
    'Applied AI & LLM Engineering Circle' AS name,
    g.id AS goal_id,
    'Hands-on reading group and project lab building RAG pipelines, fine-tuning open-source models, and vector database search.' AS description,
    'Saturdays 3:00 PM - 5:30 PM IST' AS meeting_schedule,
    ARRAY['Python', 'Machine learning', 'Cloud fundamentals', 'Research methods'] AS skill_focus,
    6 AS max_members
FROM public.goals g WHERE g.slug = 'ai-ml-engineer';

INSERT INTO public.study_groups (name, goal_id, description, meeting_schedule, skill_focus, max_members)
SELECT
    'OWASP CTF & Defensive Security Team' AS name,
    g.id AS goal_id,
    'Weekly vulnerability dissection and hands-on capture-the-flag practice preparing for collegiate cybersecurity tournaments.' AS description,
    'Wednesdays 6:30 PM - 8:30 PM IST' AS meeting_schedule,
    ARRAY['Cybersecurity', 'Linux', 'Ethical judgment', 'Attention to detail'] AS skill_focus,
    8 AS max_members
FROM public.goals g WHERE g.slug = 'cybersecurity-analyst';
