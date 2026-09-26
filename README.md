# FitLog

FitLog is a dark, focused workout library for discovering exercises, reviewing detailed instructions, and building a small plan for today.

## Technologies

- Next.js App Router and React
- TypeScript
- Tailwind CSS
- lucide-react icons
- react-hot-toast notifications
- FitLog workout API

## Features

- Responsive navbar with active navigation and live Plan/Saved counters
- Hero banner with an anchor CTA to the workout library
- API-powered workout library with loading skeletons, search, and sorting
- Responsive workout detail pages with specs, instructions, and actions
- Today's Plan and Saved tabs with live metrics and horizontal workout cards
- Add, save, remove, complete, toast notifications, and localStorage persistence
- Custom 404 page and responsive layouts for mobile, tablet, and desktop

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Production Check

```bash
npm run build
npm run start
```

## Routes

- `/` - Hero and workout library
- `/workout/[id]` - Workout details
- `/my-plan` - Today's Plan and Saved workouts
