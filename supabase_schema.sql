-- ==============================================================================
-- Al-Awael Plumbing (شركة الأوائل - البشمهندس وائل) - Supabase Database Schema
-- Run this script once in Supabase SQL Editor (Takes less than 10 seconds)
-- ==============================================================================

-- 1. Site Announcement / Top Advertising Bar Table
CREATE TABLE IF NOT EXISTS site_announcements (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  badge_text TEXT NOT NULL DEFAULT 'عرض خاص 🔥',
  message_text TEXT NOT NULL DEFAULT 'خصم 15% على تأسيس شبكات السباكة وفحص تسريب المياه مجاناً بمناسبة التوسعات الجديدة!',
  cta_text TEXT NOT NULL DEFAULT 'احجز العرض الآن على واتساب',
  cta_link TEXT NOT NULL DEFAULT 'https://wa.me/201144867114?text=عايز%20استفيد%20من%20العرض%20المعلن%20في%20الموقع',
  bg_color TEXT DEFAULT 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 45%, #b91c1c 100%)',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE site_announcements ADD COLUMN IF NOT EXISTS bg_color TEXT DEFAULT 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 45%, #b91c1c 100%)';

-- Insert default announcement
INSERT INTO site_announcements (is_active, badge_text, message_text, cta_text, cta_link, bg_color)
SELECT TRUE, 'عرض خاص 🔥', 'خصم 15% على تأسيس شبكات السباكة وفحص تسريب المياه مجاناً بمناسبة التوسعات الجديدة!', 'احجز العرض على واتساب', 'https://wa.me/201144867114?text=عايز%20استفيد%20من%20العرض%20المعلن%20في%20الموقع', 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 45%, #b91c1c 100%)'
WHERE NOT EXISTS (SELECT 1 FROM site_announcements LIMIT 1);

-- 2. Videos Showcase Table (Before/After & Field Work - Supports all mobile formats: MP4, MOV, 3GP, MKV, WebM)
CREATE TABLE IF NOT EXISTS site_videos (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  location TEXT DEFAULT 'القاهرة والجيزة',
  tag TEXT DEFAULT 'قبل وبعد',
  video_type TEXT NOT NULL DEFAULT 'mp4', -- 'mp4', 'youtube', 'tiktok', 'social'
  video_url TEXT NOT NULL,
  video_url_before TEXT DEFAULT '',
  video_url_after TEXT DEFAULT '',
  has_dual_videos BOOLEAN DEFAULT FALSE,
  poster_url TEXT DEFAULT '',
  description TEXT DEFAULT '',
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure columns exist if table was already created
ALTER TABLE site_videos ADD COLUMN IF NOT EXISTS video_url_before TEXT DEFAULT '';
ALTER TABLE site_videos ADD COLUMN IF NOT EXISTS video_url_after TEXT DEFAULT '';
ALTER TABLE site_videos ADD COLUMN IF NOT EXISTS has_dual_videos BOOLEAN DEFAULT FALSE;

-- 3. Dynamic Photos Table (Gallery additions)
CREATE TABLE IF NOT EXISTS site_photos (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  location TEXT DEFAULT 'القاهرة والجيزة',
  category TEXT DEFAULT 'luxury', -- 'luxury', 'concealed', 'tubs', 'kitchen-heaters'
  image_url TEXT NOT NULL,
  tag TEXT DEFAULT 'إشراف البشمهندس وائل',
  description TEXT DEFAULT '',
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Site Settings (Theme, Font Scale, Appearance) Table
CREATE TABLE IF NOT EXISTS site_settings (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  settings JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE site_announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Allow Public Read Access (Everyone visiting website can view)
CREATE POLICY "Allow public read access on announcements" ON site_announcements FOR SELECT USING (true);
CREATE POLICY "Allow public read access on videos" ON site_videos FOR SELECT USING (true);
CREATE POLICY "Allow public read access on photos" ON site_photos FOR SELECT USING (true);
CREATE POLICY "Allow public read access on settings" ON site_settings FOR SELECT USING (true);

-- Allow Public / Anon Insert, Update, Delete for Admin Panel (Simple & Frictionless)
CREATE POLICY "Allow anon insert on announcements" ON site_announcements FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon update on announcements" ON site_announcements FOR UPDATE USING (true);

CREATE POLICY "Allow anon insert on videos" ON site_videos FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon update on videos" ON site_videos FOR UPDATE USING (true);
CREATE POLICY "Allow anon delete on videos" ON site_videos FOR DELETE USING (true);

CREATE POLICY "Allow anon insert on photos" ON site_photos FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon update on photos" ON site_photos FOR UPDATE USING (true);
CREATE POLICY "Allow anon delete on photos" ON site_photos FOR DELETE USING (true);

CREATE POLICY "Allow anon insert on settings" ON site_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon update on settings" ON site_settings FOR UPDATE USING (true);
