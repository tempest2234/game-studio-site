// Next.js + Tailwind starter for "Your Game Studio"
// File: README.md

# Your Game Studio — Next.js + Tailwind Starter

This project is a ready-to-deploy Next.js site using Tailwind CSS. It includes a simple game gallery, header, hero, and an admin-like content file you can edit to add games.

---

## What is included

- `package.json` — dependencies and scripts
- `next.config.js` — Next.js config
- `postcss.config.js` & `tailwind.config.js` — Tailwind setup
- `pages/_app.js` — global app wrapper
- `pages/index.js` — home page
- `pages/games/[slug].js` — dynamic game pages
- `components/Header.jsx` — header/navigation
- `components/GameCard.jsx` — card component
- `data/games.js` — where to add your game metadata (images, descriptions, links)
- `styles/globals.css` — Tailwind base utilities + custom styles
- `public/` — placeholder images

---

## Quick setup (locally)

1. Install dependencies:

```bash
npm install
```

2. Run dev server:

```bash
npm run dev
```

3. Open http://localhost:3000

---

## Deploy to Vercel (recommended)

1. Push this repo to GitHub.
2. Create an account at https://vercel.com and connect your GitHub repo.
3. Click Deploy — Vercel auto-detects Next.js.
4. Optionally set custom domain in Vercel dashboard.

---

## How to add games

Edit `data/games.js`. Each game object looks like:

```js
{
  slug: 'furious-favor',
  title: 'Furious Favor',
  short: '2D mobile multiplayer brawler',
  description: 'Fast-paced 2D brawler... ',
  tags: ['multiplayer','mobile','action'],
  cover: '/images/furious-favor.jpg',
  download: 'https://itch.io/your-game',
  trailer: 'https://www.youtube.com/watch?v=xxxx'
}
```

---

// -------------------------
// package.json
// -------------------------

{
  "name": "your-game-studio",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "13.5.6",
    "react": "18.2.0",
    "react-dom": "18.2.0"
  },
  "devDependencies": {
    "autoprefixer": "10.4.14",
    "postcss": "8.4.26",
    "tailwindcss": "3.4.7"
  }
}


// -------------------------
// next.config.js
// -------------------------

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos', 'i.ytimg.com']
  }
}

module.exports = nextConfig


// -------------------------
// postcss.config.js
// -------------------------

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}


// -------------------------
// tailwind.config.js
// -------------------------

module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


// -------------------------
// styles/globals.css
// -------------------------

@tailwind base;
@tailwind components;
@tailwind utilities;

html, body, #__next {
  height: 100%;
}

body {
  @apply bg-gray-900 text-gray-100;
}


// -------------------------
// data/games.js
// -------------------------

const games = [
  {
    slug: 'furious-favor',
    title: 'Furious Favor',
    short: '2D mobile online multiplayer brawler',
    description: 'Fast-paced online brawler with sleek pixel art. Built in Unity and optimized for mobile.',
    tags: ['multiplayer', 'mobile', 'action'],
    cover: '/images/furious-favor.jpg',
    download: '',
    trailer: ''
  },
  {
    slug: 'lions-sin',
    title: 'Lions_sin',
    short: '2D RPG adventure',
    description: 'A story-driven 2D RPG made in Unity.',
    tags: ['rpg', 'singleplayer'],
    cover: '/images/lions-sin.jpg',
    download: '',
    trailer: ''
  }
]

export default games


// -------------------------
// components/Header.jsx
// -------------------------

import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-gray-800/60 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <a className="text-2xl font-extrabold">Your Game Studio</a>
        </Link>
        <nav className="space-x-4">
          <Link href="#games"><a className="hover:underline">Games</a></Link>
          <Link href="#about"><a className="hover:underline">About</a></Link>
          <Link href="#contact"><a className="hover:underline">Contact</a></Link>
        </nav>
      </div>
    </header>
  )
}


// -------------------------
// components/GameCard.jsx
// -------------------------

import Link from 'next/link'
import Image from 'next/image'

export default function GameCard({game}){
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-md">
      <div className="relative h-48">
        <Image src={game.cover || '/images/placeholder.png'} alt={game.title} layout="fill" objectFit="cover" />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold">{game.title}</h3>
        <p className="text-sm text-gray-300">{game.short}</p>
        <div className="mt-3 flex items-center justify-between">
          <Link href={`/games/${game.slug}`}><a className="text-sm underline">View</a></Link>
          {game.download ? <a href={game.download} className="text-sm">Download</a> : null}
        </div>
      </div>
    </div>
  )
}


// -------------------------
// pages/_app.js
// -------------------------

import '../styles/globals.css'
import Header from '../components/Header'

export default function MyApp({ Component, pageProps }){
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-8">
        <Component {...pageProps} />
      </main>
    </>
  )
}


// -------------------------
// pages/index.js
// -------------------------

import games from '../data/games'
import GameCard from '../components/GameCard'
import Image from 'next/image'

export default function Home(){
  return (
    <>
      <section className="relative rounded-lg overflow-hidden mb-10">
        <div className="relative h-72">
          <Image src="/images/hero.jpg" alt="hero" layout="fill" objectFit="cover" />
          <div className="absolute inset-0 bg-black/40 flex items-center">
            <div className="max-w-4xl mx-auto px-6">
              <h1 className="text-4xl md:text-6xl font-extrabold">Your Game Studio</h1>
              <p className="mt-3 text-gray-200">We build bold, fast, and fun indie games.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="games" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Games</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map(g => (
            <GameCard key={g.slug} game={g} />
          ))}
        </div>
      </section>

      <section id="about" className="mb-12">
        <h2 className="text-2xl font-bold mb-3">About</h2>
        <p className="text-gray-300">We make games because we love making games. Add more about your studio here.</p>
      </section>

      <section id="contact">
        <h2 className="text-2xl font-bold mb-3">Contact</h2>
        <p className="text-gray-300">Email: example@gmail.com</p>
      </section>
    </>
  )
}


// -------------------------
// pages/games/[slug].js
// -------------------------

import games from '../../data/games'
import Image from 'next/image'

export async function getStaticPaths(){
  const paths = games.map(g => ({ params: { slug: g.slug }}))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }){
  const game = games.find(g => g.slug === params.slug)
  return { props: { game }}
}

export default function GamePage({ game }){
  return (
    <div className="space-y-6">
      <div className="relative h-64 rounded overflow-hidden">
        <Image src={game.cover || '/images/placeholder.png'} layout="fill" objectFit="cover" alt={game.title} />
      </div>
      <div>
        <h1 className="text-3xl font-bold">{game.title}</h1>
        <p className="text-gray-300 mt-2">{game.description}</p>
        <div className="mt-4 space-x-3">
          {game.trailer ? <a href={game.trailer} className="underline">Trailer</a> : null}
          {game.download ? <a href={game.download} className="underline">Download</a> : null}
        </div>
      </div>
    </div>
  )
}


// -------------------------
// public/images/placeholder.png
// -------------------------

// (Add your images to public/images/ — placeholder.jpg, hero.jpg, furious-favor.jpg, etc.)


// -------------------------
// Notes
// -------------------------

// - This is a scaffold. Replace content in data/games.js with your real game data.
// - If you want an admin area to add games via a web UI, we can integrate Firebase or Supabase next.
// - To deploy, push to GitHub and connect to Vercel. Set environment variables if you add server-side APIs.


// -------------------------
// End of scaffold
// -------------------------
