# AI Weekend Itinerary Planner

A responsive single-page app for sketching a Saturday & Sunday trip. Pick a destination city and travel vibe, then work through a two-column timeline with morning, afternoon, and evening activity cards you can check off as you complete them.

## Stack

- HTML5
- [Vite](https://vite.dev/) dev server
- [Tailwind CSS](https://tailwindcss.com/) v4

## Run locally

```bash
npm install
cp .env.example .env
# Add your Google Gemini API key to .env as VITE_GEMINI_API_KEY
npm run dev
```

Open [http://127.0.0.1:43129](http://127.0.0.1:43129).

Click **Generate itinerary** to call the Gemini API (`generativelanguage.googleapis.com`) and render Saturday/Sunday timeline cards from the JSON response.

```bash
npm run build
npm run preview
```

## Features

- Hero search for destination city
- Vibe/style selector: Foodie, Budget, Adventure, Relaxing, Family-Friendly
- Trip duration fixed to Saturday & Sunday
- Side-by-side day columns with interactive, checkable activity cards
- Warm slate and indigo minimalist theme

## Publish to GitHub (`weekend_planner`)

This environment does not have GitHub CLI credentials, so create the repository from your account (commits on this branch are already authored as **Rakesh Mukkapati** so they will not appear as Cursor on your contribution graph):

```bash
gh repo create weekend_planner --public --description "AI Weekend Itinerary Planner"
git remote add github git@github.com:RakeshMukkapati/weekend_planner.git
git push -u github cursor/weekend-planner-5ba7:main
```

Or use the **Create repo** pill in Cursor to link this project, then push branch `cursor/weekend-planner-5ba7`.
