-- Insert 15 Diverse Careers into Supabase
-- Copy and paste this entire SQL into Supabase SQL Editor

INSERT INTO public.careers (id, title, description, primary_riasec, secondary_riasec, required_skills, education_level, salary_range, growth_outlook, work_environment, typical_tasks, created_at, updated_at) VALUES

('career_1', 'Software Developer', 'Design, develop, and maintain software applications and systems', 'I', 'R', 
 ARRAY['Programming', 'Problem Solving', 'Debugging', 'Algorithms', 'Software Testing'],
 'Bachelor''s Degree', '{"min": 70000, "max": 130000}'::jsonb, 'Excellent',
 'Office or Remote', ARRAY['Write clean code', 'Debug software', 'Collaborate with team', 'Review code', 'Deploy applications'],
 NOW(), NOW()),

('career_2', 'Mechanical Engineer', 'Design and build mechanical systems, machines, and tools', 'R', 'I',
 ARRAY['CAD Software', 'Physics', 'Problem Solving', 'Project Management', 'Technical Drawing'],
 'Bachelor''s Degree', '{"min": 65000, "max": 110000}'::jsonb, 'Good',
 'Office and Factory', ARRAY['Design mechanical systems', 'Create prototypes', 'Test equipment', 'Analyze data', 'Improve designs'],
 NOW(), NOW()),

('career_3', 'Data Scientist', 'Analyze complex data to help companies make better decisions', 'I', 'C',
 ARRAY['Python', 'Statistics', 'Machine Learning', 'Data Visualization', 'SQL'],
 'Master''s Degree', '{"min": 85000, "max": 150000}'::jsonb, 'Excellent',
 'Office or Remote', ARRAY['Clean data', 'Build models', 'Create visualizations', 'Present findings', 'Develop algorithms'],
 NOW(), NOW()),

('career_4', 'Graphic Designer', 'Create visual concepts to communicate ideas that inspire and inform', 'A', 'E',
 ARRAY['Adobe Creative Suite', 'Typography', 'Color Theory', 'Illustration', 'Branding'],
 'Bachelor''s Degree', '{"min": 45000, "max": 75000}'::jsonb, 'Good', 'Office or Studio', ARRAY['Design logos', 'Create layouts', 'Edit images', 'Meet clients', 'Develop branding'],
 NOW(), NOW()),

('career_5', 'Registered Nurse', 'Provide and coordinate patient care and educate about health conditions', 'S', 'C',
 ARRAY['Patient Care', 'Medical Knowledge', 'Communication', 'Critical Thinking', 'Empathy'],
 'Bachelor''s Degree', '{"min": 60000, "max": 95000}'::jsonb, 'Excellent',
 'Hospital or Clinic', ARRAY['Assess patients', 'Administer medications', 'Monitor vital signs', 'Document care', 'Educate patients'],
 NOW(), NOW()),

('career_6', 'Teacher (High School)', 'Educate students in specific subjects and help them develop skills', 'S', 'A',
 ARRAY['Teaching', 'Communication', 'Patience', 'Subject Expertise', 'Classroom Management'],
 'Bachelor''s Degree', '{"min": 45000, "max": 70000}'::jsonb, 'Good',
 'School', ARRAY['Plan lessons', 'Teach classes', 'Grade assignments', 'Meet parents', 'Mentor students'],
 NOW(), NOW()),

('career_7', 'Marketing Manager', 'Develop strategies to promote products and services', 'E', 'A',
 ARRAY['Marketing Strategy', 'Analytics', 'Leadership', 'Communication', 'Budget Management'],
 'Bachelor''s Degree', '{"min": 70000, "max": 130000}'::jsonb, 'Excellent',
 'Office', ARRAY['Develop campaigns', 'Manage budgets', 'Lead team', 'Analyze metrics', 'Present to executives'],
 NOW(), NOW()),

('career_8', 'Financial Analyst', 'Analyze financial data to help businesses make investment decisions', 'C', 'I',
 ARRAY['Excel', 'Financial Modeling', 'Data Analysis', 'Accounting', 'Forecasting'],
 'Bachelor''s Degree', '{"min": 60000, "max": 95000}'::jsonb, 'Good',
 'Office', ARRAY['Analyze financial data', 'Create reports', 'Build models', 'Present findings', 'Track budgets'],
 NOW(), NOW()),

('career_9', 'Architect', 'Design buildings and structures that are functional, safe, and aesthetically pleasing', 'A', 'R',
 ARRAY['AutoCAD', 'Design', 'Building Codes', 'Project Management', '3D Modeling'],
 'Master''s Degree', '{"min": 70000, "max": 120000}'::jsonb, 'Good', 'Office and Site', ARRAY['Design buildings', 'Create blueprints', 'Meet clients', 'Oversee construction', 'Review codes'],
 NOW(), NOW()),

('career_10', 'Physical Therapist', 'Help patients recover from injuries and improve movement', 'S', 'R',
 ARRAY['Anatomy', 'Exercise Science', 'Patient Care', 'Manual Therapy', 'Communication'],
 'Doctoral Degree', '{"min": 70000, "max": 100000}'::jsonb, 'Excellent',
 'Clinic or Hospital', ARRAY['Assess patients', 'Create treatment plans', 'Guide exercises', 'Track progress', 'Educate patients'],
 NOW(), NOW()),

('career_11', 'Electrician', 'Install, maintain, and repair electrical systems in buildings', 'R', 'C',
 ARRAY['Electrical Systems', 'Problem Solving', 'Safety Standards', 'Blueprint Reading', 'Hand Tools'],
 'Trade Certification', '{"min": 50000, "max": 85000}'::jsonb, 'Good',
 'Construction Sites', ARRAY['Install wiring', 'Troubleshoot issues', 'Read blueprints', 'Follow codes', 'Test systems'],
 NOW(), NOW()),

('career_12', 'UX/UI Designer', 'Design user interfaces and experiences for digital products', 'A', 'I',
 ARRAY['Figma', 'User Research', 'Wireframing', 'Prototyping', 'Design Thinking'],
 'Bachelor''s Degree', '{"min": 65000, "max": 110000}'::jsonb, 'Excellent',
 'Office or Remote', ARRAY['Research users', 'Create wireframes', 'Design interfaces', 'Test prototypes', 'Collaborate with developers'],
 NOW(), NOW()),

('career_13', 'Sales Manager', 'Lead sales teams and develop strategies to increase revenue', 'E', 'S',
 ARRAY['Leadership', 'Negotiation', 'CRM Software', 'Communication', 'Strategy'],
 'Bachelor''s Degree', '{"min": 65000, "max": 120000}'::jsonb, 'Good',
 'Office or Field', ARRAY['Lead sales team', 'Set targets', 'Train staff', 'Analyze metrics', 'Meet clients'],
 NOW(), NOW()),

('career_14', 'Accountant', 'Prepare and examine financial records for accuracy and compliance', 'C', 'I',
 ARRAY['Accounting Software', 'Tax Law', 'Attention to Detail', 'Excel', 'Financial Reporting'],
 'Bachelor''s Degree', '{"min": 55000, "max": 85000}'::jsonb, 'Good', 'Office', ARRAY['Prepare tax returns', 'Audit records', 'Create reports', 'Ensure compliance', 'Advise clients'],
 NOW(), NOW()),

('career_15', 'Social Worker', 'Help people cope with challenges in their lives and connect them with resources', 'S', 'E',
 ARRAY['Counseling', 'Case Management', 'Communication', 'Empathy', 'Crisis Intervention'],
 'Master''s Degree', '{"min": 45000, "max": 70000}'::jsonb, 'Excellent',
 'Office or Community', ARRAY['Assess clients', 'Develop care plans', 'Connect resources', 'Advocate for clients', 'Maintain records'],
 NOW(), NOW());

-- Verify insert
SELECT COUNT(*) as total_careers FROM public.careers;