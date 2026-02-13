# Be My Valentine ❤️

A romantic, interactive Valentine's Day web application with authentication protection. Built with love using React, TanStack Router, Convex, and Better-Auth.

## Features

- 🔐 **Authentication Protected** - All content is gated behind secure login
- 💝 **Interactive Experience** - Multiple phases: Login, Flashlight, Slideshow, Memory Game, and Final Message
- 🎮 **Memory Matching Game** - Flip hearts to find matching pairs (with a special surprise card!)
- 📸 **Private Photo Gallery** - Photos revealed with flashlight effect
- 💌 **Personalized Messages** - Heartfelt slideshow messages
- 🎨 **Beautiful UI** - Romantic red theme with animations and glow effects

## Tech Stack

- **Frontend**: React + TanStack Router + TailwindCSS + shadcn/ui
- **Backend**: Convex (serverless backend)
- **Authentication**: Better-Auth
- **Build Tool**: Vite
- **Package Manager**: pnpm
- **Monorepo**: Turborepo

## 🚀 Quick Deploy

**Want to deploy right now?** Just follow these steps:

1. **Push to GitHub** (if not already done):
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/be-my-valentine.git
   git push -u origin master
   ```

2. **See [DEPLOY.md](./DEPLOY.md)** for complete deployment instructions

That's it! Just click buttons on Vercel and Convex dashboards.

## Prerequisites

- Node.js 18+ 
- pnpm installed globally: `npm install -g pnpm`
- A Convex account (free tier available)

## Development Setup

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd be-my-valentines
pnpm install
```

### 2. Set up Convex

```bash
pnpm run dev:setup
```

Follow the prompts to:
1. Create a new Convex project (or use existing)
2. Deploy Convex functions
3. Copy environment variables

### 3. Configure Environment Variables

Copy the environment variables from `packages/backend/.env.local` to `apps/web/.env`:

```bash
# In packages/backend/.env.local, you'll find:
# CONVEX_DEPLOYMENT=your-deployment-url
# CONVEX_URL=your-convex-url

# Copy these to apps/web/.env as:
VITE_CONVEX_URL=your-convex-url
VITE_CONVEX_SITE_URL=your-convex-site-url
```

### 4. Add Your Photos

Place your photos in the `ourpics/` directory at the project root. Update the `FLASHLIGHT_PHOTOS` array in `apps/web/src/routes/index.tsx` with your photo paths:

```typescript
const FLASHLIGHT_PHOTOS = [
  { id: 1, src: "/ourpics/your-photo-1.jpg", alt: "Photo 1" },
  // ... add more photos
];
```

### 5. Run Development Server

```bash
pnpm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

## Deployment

### Deploy Convex Backend

```bash
cd packages/backend
npx convex deploy
```

### Build for Production

```bash
pnpm run build
```

### Deploy Frontend

The frontend can be deployed to any static hosting service:

#### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd apps/web
vercel --prod
```

#### Option 2: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
cd apps/web/dist
netlify deploy --prod --dir=.
```

#### Option 3: GitHub Pages

1. Update `apps/web/vite.config.ts` to add `base: '/your-repo-name/'`
2. Build: `pnpm run build`
3. Deploy `apps/web/dist` folder to GitHub Pages

### Environment Variables for Production

Make sure to set these environment variables in your hosting platform:

```
VITE_CONVEX_URL=your-production-convex-url
VITE_CONVEX_SITE_URL=your-production-convex-site-url
```

## Project Structure

```
be-my-valentines/
├── apps/
│   └── web/              # Frontend React application
│       ├── src/
│       │   ├── routes/   # Page components
│       │   ├── components/
│       │   └── lib/
│       └── .env          # Environment variables
├── packages/
│   └── backend/          # Convex backend
│       └── convex/
│           ├── auth.ts   # Authentication setup
│           └── schema.ts # Database schema
├── ourpics/              # Your private photos
└── README.md
```

## Customization

### Heart Messages
Edit `PAIR_SAYINGS` in `apps/web/src/routes/index.tsx` to customize the memory game card text.

### Slideshow Messages
Edit the `SLIDES` array in `apps/web/src/routes/index.tsx` to customize the romantic messages.

### Final Message
Edit the ending section in the `renderPhase` function to customize the final Valentine proposal.

## Security Notes

- All photos and content are protected by authentication
- Users must sign up/in to access any content
- Session is stored securely with httpOnly cookies
- The "Candace" card is a fun easter egg that stays revealed when clicked

## License

This is a personal project. Feel free to use as inspiration for your own Valentine's surprise! ❤️

## Troubleshooting

### Convex connection issues
- Make sure `VITE_CONVEX_URL` is set correctly in `apps/web/.env`
- Run `npx convex dev` in the backend package to start local Convex dev server

### Photos not loading
- Ensure photos are in the `ourpics/` directory
- Update the paths in `FLASHLIGHT_PHOTOS` array
- For production, photos need to be in the `public/ourpics/` folder or hosted externally

### Authentication not working
- Check that Convex is properly deployed: `npx convex deploy`
- Verify environment variables are correct
- Clear browser localStorage and cookies if testing locally
