-- ==============================================================================
-- WHERE DO I BEGIN? - Initial Database Schema Migration
-- Database: PostgreSQL / Supabase
-- Module: Data Architecture & Knowledge Base (Skills, Goals, Prerequisites, Resources, Study Groups)
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 1. PROFILES TABLE (Student Information)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    college TEXT NOT NULL DEFAULT 'Thapar Institute of Engineering and Technology',
    degree TEXT NOT NULL,
    year TEXT NOT NULL, -- e.g. '1st Year', '2nd Year', '3rd Year', '4th Year'
    available_hours_per_week INTEGER DEFAULT 10 CHECK (available_hours_per_week >= 0 AND available_hours_per_week <= 100),
    learning_preferences JSONB DEFAULT '{"formats": ["interactive", "video"], "pace": "self-paced"}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 2. SKILLS TABLE (Soft and Hard Skills Knowledge Base)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    skill_type TEXT NOT NULL CHECK (skill_type IN ('soft', 'hard')),
    max_level INTEGER NOT NULL DEFAULT 6 CHECK (max_level = 6),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Index for fast lookup by slug, category, and skill_type
CREATE INDEX IF NOT EXISTS idx_skills_slug ON public.skills(slug);
CREATE INDEX IF NOT EXISTS idx_skills_category ON public.skills(category);
CREATE INDEX IF NOT EXISTS idx_skills_type ON public.skills(skill_type);

-- ==============================================================================
-- 3. USER_SKILLS TABLE (Student Assessed Skill Baseline)
-- 1–6 proficiency scale:
-- 1: Awareness, 2: Basic, 3: Guided, 4: Independent, 5: Advanced, 6: Expert
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.user_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
    current_level INTEGER NOT NULL DEFAULT 1 CHECK (current_level >= 1 AND current_level <= 6),
    confidence INTEGER DEFAULT 3 CHECK (confidence >= 1 AND confidence <= 5),
    evidence TEXT, -- Links to github, projects, or self-assessment notes
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_user_skill UNIQUE (user_id, skill_id)
);

CREATE INDEX IF NOT EXISTS idx_user_skills_user ON public.user_skills(user_id);
CREATE INDEX IF NOT EXISTS idx_user_skills_skill ON public.user_skills(skill_id);

-- ==============================================================================
-- 4. GOALS TABLE (Target Career Paths & Aspirations)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    target_role TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_goals_slug ON public.goals(slug);
CREATE INDEX IF NOT EXISTS idx_goals_category ON public.goals(category);

-- ==============================================================================
-- 5. GOAL_SKILLS TABLE (Skills Required for Each Career Goal)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.goal_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    goal_id UUID NOT NULL REFERENCES public.goals(id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
    target_level INTEGER NOT NULL DEFAULT 4 CHECK (target_level >= 1 AND target_level <= 6),
    importance TEXT NOT NULL CHECK (importance IN ('critical', 'high', 'medium', 'low')),
    rationale TEXT,
    CONSTRAINT uq_goal_skill UNIQUE (goal_id, skill_id)
);

CREATE INDEX IF NOT EXISTS idx_goal_skills_goal ON public.goal_skills(goal_id);
CREATE INDEX IF NOT EXISTS idx_goal_skills_skill ON public.goal_skills(skill_id);
CREATE INDEX IF NOT EXISTS idx_goal_skills_importance ON public.goal_skills(importance);

-- ==============================================================================
-- 6. SKILL_PREREQUISITES TABLE (Skill Dependency Graph)
-- Relationship Strength (1-5):
-- 5: Essential prerequisite; normally learn first
-- 4: Strong prerequisite; highly recommended
-- 3: Helpful foundation; can be learned in parallel
-- 2: Light supporting relationship
-- 1: Optional or contextual relationship
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.skill_prerequisites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
    prerequisite_skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
    relationship_strength INTEGER NOT NULL CHECK (relationship_strength >= 1 AND relationship_strength <= 5),
    CONSTRAINT uq_skill_prerequisite UNIQUE (skill_id, prerequisite_skill_id),
    CONSTRAINT chk_no_self_prerequisite CHECK (skill_id != prerequisite_skill_id)
);

CREATE INDEX IF NOT EXISTS idx_prereq_skill ON public.skill_prerequisites(skill_id);
CREATE INDEX IF NOT EXISTS idx_prereq_parent ON public.skill_prerequisites(prerequisite_skill_id);

-- ==============================================================================
-- 7. RESOURCES TABLE (Vetted Learning Materials & Sandboxes)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN (
        'course', 'video', 'documentation', 'book', 'project', 
        'competition', 'workshop', 'club', 'lab', 'certification', 
        'practice', 'community'
    )),
    provider TEXT NOT NULL,
    url TEXT NOT NULL,
    difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    estimated_hours INTEGER DEFAULT 5 CHECK (estimated_hours >= 0),
    format TEXT NOT NULL CHECK (format IN ('video', 'text', 'interactive', 'in-person', 'mixed')),
    source TEXT NOT NULL DEFAULT 'curated',
    is_college_resource BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_resources_type ON public.resources(type);
CREATE INDEX IF NOT EXISTS idx_resources_difficulty ON public.resources(difficulty);

-- ==============================================================================
-- 8. RESOURCE_SKILLS TABLE (Skill Connections for Resources)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.resource_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resource_id UUID NOT NULL REFERENCES public.resources(id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
    relevance_score INTEGER NOT NULL DEFAULT 4 CHECK (relevance_score >= 1 AND relevance_score <= 5),
    CONSTRAINT uq_resource_skill UNIQUE (resource_id, skill_id)
);

CREATE INDEX IF NOT EXISTS idx_resource_skills_resource ON public.resource_skills(resource_id);
CREATE INDEX IF NOT EXISTS idx_resource_skills_skill ON public.resource_skills(skill_id);

-- ==============================================================================
-- 9. COLLEGE_RESOURCES TABLE (TIET Campus Entities, Societies, Labs, Workshops)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.college_resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    college TEXT NOT NULL DEFAULT 'Thapar Institute of Engineering and Technology',
    title TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN (
        'club', 'professor', 'course', 'lab', 'workshop', 
        'competition', 'research_opportunity', 'campus_community'
    )),
    description TEXT NOT NULL,
    skills TEXT[] DEFAULT '{}',
    availability TEXT NOT NULL, -- e.g. 'Semester-long', 'Year-round', 'Annual Induction'
    eligibility TEXT NOT NULL,  -- e.g. 'Open to all TIET students', '2nd Year & Above'
    estimated_time_commitment TEXT NOT NULL, -- e.g. '4-6 hours/week'
    url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_college_resources_college ON public.college_resources(college);
CREATE INDEX IF NOT EXISTS idx_college_resources_type ON public.college_resources(type);

-- ==============================================================================
-- 10. STUDY_GROUPS TABLE (Peer Learning & Hackathon Squads)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.study_groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    goal_id UUID REFERENCES public.goals(id) ON DELETE SET NULL,
    description TEXT NOT NULL,
    meeting_schedule TEXT NOT NULL, -- e.g. 'Tuesdays & Thursdays 7:00 PM IST'
    skill_focus TEXT[] DEFAULT '{}',
    max_members INTEGER NOT NULL DEFAULT 8 CHECK (max_members >= 2 AND max_members <= 50),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_study_groups_goal ON public.study_groups(goal_id);

-- ==============================================================================
-- 11. GROUP_MEMBERS TABLE (Study Group Membership Junction)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.group_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id UUID NOT NULL REFERENCES public.study_groups(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    joined_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_group_member UNIQUE (group_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_group_members_group ON public.group_members(group_id);
CREATE INDEX IF NOT EXISTS idx_group_members_user ON public.group_members(user_id);

-- ==============================================================================
-- TRIGGERS: Automated Updated At
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE OR REPLACE TRIGGER trg_user_skills_updated_at
    BEFORE UPDATE ON public.user_skills
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goal_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_prerequisites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resource_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.college_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_members ENABLE ROW LEVEL SECURITY;

-- Read policies for public knowledge base tables
CREATE POLICY "Allow public read access on skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Allow public read access on goals" ON public.goals FOR SELECT USING (true);
CREATE POLICY "Allow public read access on goal_skills" ON public.goal_skills FOR SELECT USING (true);
CREATE POLICY "Allow public read access on skill_prerequisites" ON public.skill_prerequisites FOR SELECT USING (true);
CREATE POLICY "Allow public read access on resources" ON public.resources FOR SELECT USING (true);
CREATE POLICY "Allow public read access on resource_skills" ON public.resource_skills FOR SELECT USING (true);
CREATE POLICY "Allow public read access on college_resources" ON public.college_resources FOR SELECT USING (true);
CREATE POLICY "Allow public read access on study_groups" ON public.study_groups FOR SELECT USING (true);
CREATE POLICY "Allow public read access on group_members" ON public.group_members FOR SELECT USING (true);

-- User-scoped policies for profile & user skills (allows full read/write for own records or public anon in dev)
CREATE POLICY "Allow read profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Allow insert profiles" ON public.profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update own profile" ON public.profiles FOR UPDATE USING (true);

CREATE POLICY "Allow read user_skills" ON public.user_skills FOR SELECT USING (true);
CREATE POLICY "Allow insert user_skills" ON public.user_skills FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update user_skills" ON public.user_skills FOR UPDATE USING (true);
CREATE POLICY "Allow delete user_skills" ON public.user_skills FOR DELETE USING (true);
