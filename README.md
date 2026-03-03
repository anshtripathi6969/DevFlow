# 🚀 DevFlow | Internship & Job Tracker

**DevFlow** is the premier internship and job application tracker designed for modern developers. Streamline your career pipeline with adaptive Kanban boards, animated interview scheduling, and deep performance insights. Ditch messy spreadsheets for a centralized hub that organizes notes, contacts, and applications, empowering you to land your dream offer much faster.

![DevFlow Banner](https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop)

## ✨ Features

- **📊 Visual Kanban Pipeline**: Drag and drop applications through custom stages from "Applied" to "Offer".
- **🗓️ Interview Management**: A dedicated global dashboard to schedule, track, and manage all your upcoming rounds.
- **📱 Contacts & Networking**: Store recruiter LinkedIn profiles and engineer emails directly within each application.
- **🎨 Antigravity Aesthetics**: A premium, mouse-reactive aterrizaje (landing) page inspired by high-end developer tools.
- **🔐 Secure Authentication**: Multi-tenant isolation using **Clerk** for industrial-grade security.
- **⚡ Real-time Sync**: Instant database updates and state synchronization powered by **Convex**.
- **🌙 Theme Support**: Seamless light and dark mode transitions.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Database/Backend**: [Convex](https://www.convex.dev/) (Real-time DB & Cloud Functions)
- **Authentication**: [Clerk](https://clerk.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn/UI](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A Convex account
- A Clerk account

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/anshtripathi6969/DevFlow.git
   cd DevFlow
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file with your Clerk and Convex secrets:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
   CLERK_SECRET_KEY=...
   NEXT_PUBLIC_CONVEX_URL=...
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Start the Convex backend:**
   ```bash
   npx convex dev
   ```

## 📂 Project Structure

```text
├── convex/             # Backend schema and functions
├── src/
│   ├── app/            # Next.js App Router (Pages & Layouts)
│   ├── components/     # Reusable UI components
│   ├── lib/            # Utilities and configurations
│   └── hooks/          # Custom React hooks
├── public/             # Static assets (Favicons, images)
└── tailwind.config.ts  # Design system configuration
```

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to help make DevFlow better for the developer community.

---

Built with ❤️ for the next generation of engineers by **[Ansh Tripathi](https://www.linkedin.com/in/anshtripathi20/)**.
