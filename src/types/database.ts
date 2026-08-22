// ==============================================================================
// WHERE DO I BEGIN? - TypeScript Database Interfaces & Schema Definitions
// Strongly typed models for Supabase / PostgreSQL tables
// ==============================================================================

export type SkillType = "soft" | "hard";
export type SkillProficiencyLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type PrerequisiteStrength = 1 | 2 | 3 | 4 | 5;
export type GoalImportance = "critical" | "high" | "medium" | "low";
export type ResourceDifficulty = "beginner" | "intermediate" | "advanced";
export type ResourceFormat = "video" | "text" | "interactive" | "in-person" | "mixed";
export type ResourceType =
  | "course"
  | "video"
  | "documentation"
  | "book"
  | "project"
  | "competition"
  | "workshop"
  | "club"
  | "lab"
  | "certification"
  | "practice"
  | "community";

export type CollegeResourceType =
  | "club"
  | "professor"
  | "course"
  | "lab"
  | "workshop"
  | "competition"
  | "research_opportunity"
  | "campus_community";

// 1. Profile (Student Information)
export interface Profile {
  id: string;
  name: string;
  college: string;
  degree: string;
  year: string;
  available_hours_per_week: number;
  learning_preferences: {
    formats?: string[];
    pace?: string;
    focus_areas?: string[];
  };
  created_at: string;
  updated_at: string;
}

// 2. Skill (Knowledge Base)
export interface Skill {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  category: string;
  skill_type: SkillType;
  max_level: number; // Always 6
  created_at: string;
}

// 3. UserSkill (Student Skill Assessment Baseline)
export interface UserSkill {
  id: string;
  user_id: string;
  skill_id: string;
  current_level: SkillProficiencyLevel;
  confidence: number; // 1 - 5
  evidence: string | null;
  updated_at: string;
  // Optional join relationships
  skill?: Skill;
}

// 4. Goal (Target Career Destinations)
export interface Goal {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  target_role: string;
  created_at: string;
}

// 5. GoalSkill (Required Skills for Goals)
export interface GoalSkill {
  id: string;
  goal_id: string;
  skill_id: string;
  target_level: SkillProficiencyLevel;
  importance: GoalImportance;
  rationale: string | null;
  // Optional join relationships
  goal?: Goal;
  skill?: Skill;
}

// 6. SkillPrerequisite (Dependency Graph)
export interface SkillPrerequisite {
  id: string;
  skill_id: string;
  prerequisite_skill_id: string;
  relationship_strength: PrerequisiteStrength;
  // Optional join relationships
  skill?: Skill;
  prerequisite_skill?: Skill;
}

// 7. Resource (Learning Materials & Labs)
export interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  provider: string;
  url: string;
  difficulty: ResourceDifficulty;
  estimated_hours: number;
  format: ResourceFormat;
  source: string;
  is_college_resource: boolean;
  created_at: string;
}

// 8. ResourceSkill (Skill Connections for Resources)
export interface ResourceSkill {
  id: string;
  resource_id: string;
  skill_id: string;
  relevance_score: number; // 1 - 5
  // Optional join relationships
  resource?: Resource;
  skill?: Skill;
}

// 9. CollegeResource (TIET Campus Entities)
export interface CollegeResource {
  id: string;
  college: string;
  title: string;
  type: CollegeResourceType;
  description: string;
  skills: string[];
  availability: string;
  eligibility: string;
  estimated_time_commitment: string;
  url: string | null;
  created_at: string;
}

// 10. StudyGroup (Peer Learning Squads)
export interface StudyGroup {
  id: string;
  name: string;
  goal_id: string | null;
  description: string;
  meeting_schedule: string;
  skill_focus: string[];
  max_members: number;
  created_at: string;
  // Optional join relationships
  goal?: Goal;
  members?: GroupMember[];
}

// 11. GroupMember (Study Group Membership)
export interface GroupMember {
  id: string;
  group_id: string;
  user_id: string;
  joined_at: string;
  // Optional join relationships
  profile?: Profile;
  group?: StudyGroup;
}

// ==============================================================================
// SUPABASE CLIENT DATABASE GENERIC TYPE MAP
// ==============================================================================
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<Profile, "id" | "created_at">>;
      };
      skills: {
        Row: Skill;
        Insert: Omit<Skill, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Omit<Skill, "id" | "created_at">>;
      };
      user_skills: {
        Row: UserSkill;
        Insert: Omit<UserSkill, "id" | "updated_at"> & {
          id?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<UserSkill, "id">>;
      };
      goals: {
        Row: Goal;
        Insert: Omit<Goal, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Omit<Goal, "id" | "created_at">>;
      };
      goal_skills: {
        Row: GoalSkill;
        Insert: Omit<GoalSkill, "id"> & {
          id?: string;
        };
        Update: Partial<Omit<GoalSkill, "id">>;
      };
      skill_prerequisites: {
        Row: SkillPrerequisite;
        Insert: Omit<SkillPrerequisite, "id"> & {
          id?: string;
        };
        Update: Partial<Omit<SkillPrerequisite, "id">>;
      };
      resources: {
        Row: Resource;
        Insert: Omit<Resource, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Omit<Resource, "id" | "created_at">>;
      };
      resource_skills: {
        Row: ResourceSkill;
        Insert: Omit<ResourceSkill, "id"> & {
          id?: string;
        };
        Update: Partial<Omit<ResourceSkill, "id">>;
      };
      college_resources: {
        Row: CollegeResource;
        Insert: Omit<CollegeResource, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Omit<CollegeResource, "id" | "created_at">>;
      };
      study_groups: {
        Row: StudyGroup;
        Insert: Omit<StudyGroup, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Omit<StudyGroup, "id" | "created_at">>;
      };
      group_members: {
        Row: GroupMember;
        Insert: Omit<GroupMember, "id" | "joined_at"> & {
          id?: string;
          joined_at?: string;
        };
        Update: Partial<Omit<GroupMember, "id">>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
