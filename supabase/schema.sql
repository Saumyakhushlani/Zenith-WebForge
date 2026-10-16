-- ==============================================================================
-- WEB FORGE // ZENITH CODING SOCIETY - MANIT BHOPAL
-- DATABASE SCHEMA FOR SUPABASE
-- ==============================================================================
-- Run this script in the Supabase SQL Editor:
-- Dashboard -> SQL Editor -> New Query -> Paste & Run

-- 1. Create Teams Table
CREATE TABLE IF NOT EXISTS public.teams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_code VARCHAR(16) UNIQUE NOT NULL,
    team_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Team Members Table
CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
    role VARCHAR(20) DEFAULT 'member' CHECK (role IN ('leader', 'member')),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    scholar_number VARCHAR(30) NOT NULL UNIQUE,
    gender VARCHAR(20) NOT NULL CHECK (gender IN ('Female', 'Male', 'Other')),
    year VARCHAR(20) NOT NULL CHECK (year IN ('1st Year', '2nd Year', '3rd Year', '4th Year')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Indexes for fast query lookups
CREATE INDEX IF NOT EXISTS idx_teams_code ON public.teams(team_code);
CREATE INDEX IF NOT EXISTS idx_team_members_team_id ON public.team_members(team_id);
CREATE INDEX IF NOT EXISTS idx_team_members_email ON public.team_members(email);
CREATE INDEX IF NOT EXISTS idx_team_members_scholar ON public.team_members(scholar_number);

-- 4. Convenient View to fetch team with aggregated members and diversity status
CREATE OR REPLACE VIEW public.teams_summary_view AS
SELECT 
    t.id AS team_id,
    t.team_code,
    t.team_name,
    t.created_at,
    COUNT(m.id) AS total_members,
    COUNT(CASE WHEN m.gender = 'Female' THEN 1 END) AS female_members_count,
    CASE 
        WHEN COUNT(CASE WHEN m.gender = 'Female' THEN 1 END) >= 1 THEN true 
        ELSE false 
    END AS has_female_member,
    COALESCE(
        json_agg(
            json_build_object(
                'id', m.id,
                'name', m.name,
                'email', m.email,
                'phone', m.phone,
                'scholar_number', m.scholar_number,
                'gender', m.gender,
                'year', m.year,
                'role', m.role,
                'created_at', m.created_at
            ) ORDER BY (m.role = 'leader') DESC, m.created_at ASC
        ) FILTER (WHERE m.id IS NOT NULL), 
        '[]'::json
    ) AS members
FROM public.teams t
LEFT JOIN public.team_members m ON t.id = m.team_id
GROUP BY t.id, t.team_code, t.team_name, t.created_at;

-- 5. Row Level Security (RLS) Configuration
-- To allow public registration without auth:
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Allow public read and insert operations
DROP POLICY IF EXISTS "Public can view teams" ON public.teams;
CREATE POLICY "Public can view teams" ON public.teams 
    FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public can insert teams" ON public.teams;
CREATE POLICY "Public can insert teams" ON public.teams 
    FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Public can view team members" ON public.team_members;
CREATE POLICY "Public can view team members" ON public.team_members 
    FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public can insert team members" ON public.team_members;
CREATE POLICY "Public can insert team members" ON public.team_members 
    FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Grant permissions to anon and authenticated roles
GRANT ALL ON TABLE public.teams TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.team_members TO anon, authenticated, service_role;
GRANT SELECT ON public.teams_summary_view TO anon, authenticated, service_role;

-- Optional verification query:
-- SELECT * FROM public.teams_summary_view;
