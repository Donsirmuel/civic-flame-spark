
-- Roles enum + user_roles table
CREATE TYPE public.app_role AS ENUM ('citizen', 'official', 'admin');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

-- Profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  title TEXT,
  region TEXT,
  verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.profiles TO anon, authenticated;
GRANT INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- Auto-create profile + citizen role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, region)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'region'
  );
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'citizen');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Posts (public feed, seeded)
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name TEXT NOT NULL,
  author_initials TEXT NOT NULL,
  region TEXT NOT NULL,
  scope TEXT NOT NULL DEFAULT 'LGA',
  body TEXT NOT NULL,
  upvote_count INTEGER NOT NULL DEFAULT 0,
  official_reply TEXT,
  official_reply_by TEXT,
  official_reply_title TEXT,
  status TEXT NOT NULL DEFAULT 'open',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.posts TO anon, authenticated;
GRANT ALL ON public.posts TO service_role;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Posts are viewable by everyone" ON public.posts FOR SELECT USING (true);

-- Seed data
INSERT INTO public.posts (author_name, author_initials, region, scope, body, upvote_count, official_reply, official_reply_by, official_reply_title, status, created_at) VALUES
('Chidi O.', 'CO', 'Umudim, Nnewi North', 'LGA', 'The community borehole in Umudim has been dry for 3 weeks. Families are trekking 2km for water. Please look into this urgently.', 412, 'Repair team dispatched today. Photo update by Friday.', 'Hon. A. Okeke', 'LGA Chairman', 'escalated', now() - interval '2 hours'),
('Aisha B.', 'AB', 'Market Road, Onitsha', 'LGA', 'Streetlights on Market Road have been off for over a month. Robberies are increasing after sunset.', 287, NULL, NULL, NULL, 'open', now() - interval '5 hours'),
('Emeka N.', 'EN', 'Anambra State', 'State', 'The state hospital in Awka has no functional ambulance. Referrals are being done in private taxis.', 934, 'Two ambulances arriving next week from federal allocation. Full statement Monday.', 'Dr. K. Nwafor', 'State Commissioner for Health', 'in_progress', now() - interval '1 day'),
('Fatima Y.', 'FY', 'Kaduna Central', 'Federal', 'Why is the federal road linking Kaduna to Zaria still uncompleted 4 years after contract award? Where is the budget?', 1523, NULL, NULL, NULL, 'open', now() - interval '2 days'),
('Tunde A.', 'TA', 'Ikorodu, Lagos', 'LGA', 'Refuse hasn''t been collected on our street for 18 days. The whole neighborhood smells.', 156, 'LAWMA truck rerouted. Collection resumes tomorrow morning.', 'Mrs. B. Adeyemi', 'LAWMA Zonal Officer', 'resolved', now() - interval '3 days'),
('Grace M.', 'GM', 'Nsukka, Enugu', 'LGA', 'The primary school in our ward has no roof after the last storm. Children are learning under trees.', 678, NULL, NULL, NULL, 'open', now() - interval '4 days');
