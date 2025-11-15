# Movie Streaming Dashboard

A modern, Netflix-style movie streaming dashboard built with Next.js 14, TypeScript, and TailwindCSS. This application fetches movie data from The Movie Database (TMDB) API and displays it in a beautiful, responsive interface.

## Features

- 🎬 **Movie Browsing**: Browse popular, top-rated, and upcoming movies
- 🎯 **Hero Banner**: Large hero banner featuring featured movies
- 🔍 **Movie Details**: Detailed view for each movie with ratings, genres, and more
- 📱 **Responsive Design**: Fully responsive layout for mobile, tablet, and desktop
- ⚡ **Server-Side Rendering**: Fast page loads with Next.js 14 App Router
- 🖼️ **Image Optimization**: Optimized images using Next.js Image component
- 🎨 **Dark Theme**: Beautiful dark UI inspired by Netflix

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **TMDB API**

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- TMDB API key ([Get one here](https://www.themoviedb.org/settings/api))

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd movie-streaming-dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env.local` file in the root directory:
```env
TMDB_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
movie-streaming-dashboard/
├── app/
│   ├── components/        # React components
│   │   ├── Header.tsx
│   │   ├── HeroBanner.tsx
│   │   ├── MovieCard.tsx
│   │   └── MovieRow.tsx
│   ├── lib/              # Utility functions
│   │   └── tmdb.ts       # TMDB API helpers
│   ├── movie/
│   │   └── [id]/         # Dynamic movie detail pages
│   │       └── page.tsx
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── types/
│   └── movie.ts          # TypeScript interfaces
├── public/               # Static assets
└── ...config files
```

## API Configuration

This project uses The Movie Database (TMDB) API. To get an API key:

1. Sign up at [themoviedb.org](https://www.themoviedb.org/)
2. Go to Account Settings → API
3. Request an API key
4. Add it to your `.env.local` file

## Deployment

### Deploy to Vercel

The easiest way to deploy this Next.js app is to use [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Add your `TMDB_API_KEY` environment variable
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<your-repo-url>)

### Environment Variables

Make sure to set the following environment variable in your deployment platform:

- `TMDB_API_KEY`: Your TMDB API key (server-side only, never exposed to client)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

MIT

## Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie data API
- Netflix for design inspiration

