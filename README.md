# Career Compass 🧭

A modern web-based career guidance platform for university students using the Holland Code (RIASEC) aptitude testing model.

![Career Compass Banner](https://via.placeholder.com/1200x300/2563EB/ffffff?text=Career+Compass)

## 🎯 Overview

Career Compass helps students discover their ideal career paths through:
- **Validated aptitude testing** using the Holland Code (RIASEC) model
- **Personalized recommendations** based on personality profiles
- **Comprehensive career database** with search and filtering
- **Modern, responsive design** optimized for all devices

## ✨ Features

- 🎓 **Holland Code Test**: 18-question validated assessment
- 📊 **RIASEC Scoring**: Percentage-based personality profiling
- 💼 **Career Matching**: AI-powered personalized recommendations
- 🔍 **Career Explorer**: Search and filter 12-15 careers
- 🔐 **User Authentication**: Secure signup and login
- 💾 **Data Persistence**: Save test results and history
- 📱 **Responsive Design**: Mobile-first, works everywhere

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Supabase account (free tier works)
- Google Gemini API key (optional, for career generation)

### Installation

1. **Install dependencies:**
```bash
cd career-compass
npm install
```

2. **Set up environment variables:**

Edit `.env.local` with your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
GEMINI_API_KEY=your_gemini_key
```
3. **Set up Supabase database:**

- Create a new Supabase project at https://supabase.com
- Go to SQL Editor
- Run the entire `supabase-schema.sql` file
- Verify tables were created in Table Editor

4. **Generate career data (optional):**
```bash
npm run dev
# Visit: http://localhost:3000/api/generate-careers
# Copy the JSON response and insert into Supabase careers table
```

5. **Run the development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
career-compass/
├── app/
│   ├── api/              # Backend API routes
│   │   ├── careers/      # Career CRUD operations
│   │   ├── generate-careers/  # AI career generation
│   │   └── test/         # Test submission/retrieval
│   ├── auth/             # Authentication pages
│   ├── dashboard/        # User dashboard
│   ├── explore/          # Career explorer
│   ├── results/          # Test results display
│   ├── test/             # Aptitude test interface
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/
│   └── ui/               # Reusable UI components
├── lib/
│   ├── supabase/         # Database client utilities
│   └── utils/            # Helper functions
├── types/│   └── index.ts          # TypeScript type definitions
└── Configuration files

## 🛠️ Technology Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | React 18, Next.js 15 (App Router) |
| **Styling** | Tailwind CSS, ShadCN UI |
| **Backend** | Next.js API Routes (Serverless) |
| **Database** | Supabase (PostgreSQL) |
| **Authentication** | Supabase Auth |
| **AI** | Google Gemini API |
| **Language** | TypeScript |
| **Deployment** | Vercel (ready) |

## 🎨 Design System

### Colors
- **Primary Blue**: `#2563EB` - Trust, professionalism
- **Accent Green**: `#10B981` - Success, growth
- **RIASEC Colors**: Unique color for each personality type

### RIASEC Type Colors
- **R** (Realistic): Blue `#3B82F6`
- **I** (Investigative): Indigo `#6366F1`
- **A** (Artistic): Violet `#A855F7`
- **S** (Social): Teal `#2DD4BF`
- **E** (Enterprising): Orange `#F97316`
- **C** (Conventional): Green `#22C55E`

## 📖 How It Works

1. **Sign Up**: Users create an account with email verification
2. **Take Test**: Complete 18-question Holland Code assessment
3. **Get Scores**: Receive RIASEC personality profile (0-100% per type)
4. **View Recommendations**: See 3-5 matching careers
5. **Explore**: Browse full career database with filters

## 🧪 Holland Code (RIASEC) Model

The assessment categorizes personalities into 6 types:
- **R** (Realistic): Hands-on, practical work
- **I** (Investigative): Research, analysis, problem-solving
- **A** (Artistic): Creative, expressive work
- **S** (Social): Helping, teaching people
- **E** (Enterprising): Leading, business ventures
- **C** (Conventional): Organized, structured work

Each user receives scores for all 6 types, with top 3 becoming their dominant profile.

## 📊 Database Schema

### Tables
- **profiles**: User information and metadata
- **test_results**: RIASEC scores and history
- **careers**: Career database with RIASEC classifications

See `supabase-schema.sql` for complete schema with RLS policies.

## 🔒 Security

- Row Level Security (RLS) enabled on all tables
- Authentication via Supabase Auth (JWT tokens)
- Protected routes with Next.js middleware
- Environment variables for sensitive data

## 🚢 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

```bash
# Or use Vercel CLI
vercel
```

## 📝 API Documentation

### Endpoints

**POST /api/test**
- Submit test results
- Requires authentication
- Returns: Test result with RIASEC scores

**GET /api/test**
- Get latest test result
- Requires authentication
- Returns: User's most recent test

**GET /api/careers**
- Get all careers
- Query params: `riasec`, `education`, `search`
- Public endpoint

**GET /api/generate-careers**
- Generate careers with AI
- Admin/development use
- Returns: 15 generated careers

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 🐛 Troubleshooting

### Installation Issues
```bash
# If npm install fails, try:
npm install --legacy-peer-deps

# Or clear cache:
npm cache clean --force
npm install
```

### Supabase Connection
- Verify `.env.local` has correct credentials
- Check Supabase project is active
- Ensure SQL schema was run successfully

### Build Errors
- Delete `.next` folder and rebuild
- Check all dependencies are installed
- Verify TypeScript has no errors

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [ShadCN UI](https://ui.shadcn.com)
- [Holland Code Reference](https://en.wikipedia.org/wiki/Holland_Codes)

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Holland Code (RIASEC) model by John L. Holland
- ShadCN UI for beautiful components
- Supabase for backend infrastructure
- Google Gemini for AI capabilities

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Check existing documentation
- Review Supabase/Next.js docs

---

**Built with ❤️ to help students find their ideal career path**

🎓 Perfect for university career services, guidance counselors, and students worldwide!