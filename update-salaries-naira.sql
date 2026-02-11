-- Update Careers with Realistic Nigerian Salaries
-- Run this in Supabase SQL Editor to update all career salaries to Nigerian amounts

-- Update salaries to realistic Nigerian ranges (in Naira per year)
UPDATE public.careers SET salary_range = '{"min": 3600000, "max": 12000000}'::jsonb WHERE id = 'career_1'; -- Software Developer: ₦3.6M - ₦12M
UPDATE public.careers SET salary_range = '{"min": 3000000, "max": 8400000}'::jsonb WHERE id = 'career_2'; -- Mechanical Engineer: ₦3M - ₦8.4M
UPDATE public.careers SET salary_range = '{"min": 4800000, "max": 15000000}'::jsonb WHERE id = 'career_3'; -- Data Scientist: ₦4.8M - ₦15M
UPDATE public.careers SET salary_range = '{"min": 2400000, "max": 6000000}'::jsonb WHERE id = 'career_4'; -- Graphic Designer: ₦2.4M - ₦6M
UPDATE public.careers SET salary_range = '{"min": 3000000, "max": 7200000}'::jsonb WHERE id = 'career_5'; -- Registered Nurse: ₦3M - ₦7.2M
UPDATE public.careers SET salary_range = '{"min": 2400000, "max": 5400000}'::jsonb WHERE id = 'career_6'; -- Teacher: ₦2.4M - ₦5.4M
UPDATE public.careers SET salary_range = '{"min": 4200000, "max": 12000000}'::jsonb WHERE id = 'career_7'; -- Marketing Manager: ₦4.2M - ₦12M
UPDATE public.careers SET salary_range = '{"min": 3600000, "max": 7800000}'::jsonb WHERE id = 'career_8'; -- Financial Analyst: ₦3.6M - ₦7.8M
UPDATE public.careers SET salary_range = '{"min": 4200000, "max": 10800000}'::jsonb WHERE id = 'career_9'; -- Architect: ₦4.2M - ₦10.8M
UPDATE public.careers SET salary_range = '{"min": 3600000, "max": 7200000}'::jsonb WHERE id = 'career_10'; -- Physical Therapist: ₦3.6M - ₦7.2M
UPDATE public.careers SET salary_range = '{"min": 2400000, "max": 6000000}'::jsonb WHERE id = 'career_11'; -- Electrician: ₦2.4M - ₦6M
UPDATE public.careers SET salary_range = '{"min": 3600000, "max": 9600000}'::jsonb WHERE id = 'career_12'; -- UX/UI Designer: ₦3.6M - ₦9.6M
UPDATE public.careers SET salary_range = '{"min": 3600000, "max": 10800000}'::jsonb WHERE id = 'career_13'; -- Sales Manager: ₦3.6M - ₦10.8M
UPDATE public.careers SET salary_range = '{"min": 3000000, "max": 7200000}'::jsonb WHERE id = 'career_14'; -- Accountant: ₦3M - ₦7.2M
UPDATE public.careers SET salary_range = '{"min": 2400000, "max": 5400000}'::jsonb WHERE id = 'career_15'; -- Social Worker: ₦2.4M - ₦5.4M

-- Verify the update
SELECT id, title, salary_range FROM public.careers ORDER BY id;