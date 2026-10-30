# Cupidity Center — Case No. 001

A responsive interactive storytelling website built with Next.js, React, TypeScript, Tailwind CSS v4 and Motion for React (Framer Motion package).

## Requirements
- Node.js 20.9 or later
- npm

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## Build check
```bash
npm run build
```

## Deploy to Vercel
1. Create a GitHub repository and push this project.
2. Sign in to Vercel and choose **Add New → Project**.
3. Import the repository.
4. Vercel should detect Next.js automatically. Keep the default build command (`npm run build`).
5. Select **Deploy**.
6. Once deployed, test the full experience on both desktop and mobile.

You can also deploy using the Vercel CLI:
```bash
npm i -g vercel
vercel
```

## Optional music
The Sound button currently explains that no soundtrack has been configured; it does not pretend to play audio. To add music later, use a properly licensed audio file in `public/audio/` and implement an explicit play/pause control with an HTML `Audio` element. Browser autoplay restrictions mean playback should begin only after the visitor chooses to play it.

## Personalise before sharing
Review the letter in `app/page.tsx`, especially `letterParagraphs` and the paragraphs rendered in `LetterReveal` (currently within the page component). Keep the wording true to your own voice. The website intentionally uses only the label **Senior**.
