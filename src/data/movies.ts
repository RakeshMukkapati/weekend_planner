export type Movie = {
  id: string;
  title: string;
  genre: string;
  duration: string;
  rating: string;
  image: string;
  showtimes: string[];
};

export const movies: Movie[] = [
  {
    id: "neon-harbor",
    title: "Neon Harbor",
    genre: "Thriller",
    duration: "2h 11m",
    rating: "PG-13",
    image: "https://placehold.co/400x600/1e1b4b/a78bfa/png?text=Neon+Harbor",
    showtimes: ["1:00 PM", "4:30 PM", "7:45 PM", "10:15 PM"],
  },
  {
    id: "last-light-express",
    title: "Last Light Express",
    genre: "Drama",
    duration: "1h 58m",
    rating: "R",
    image: "https://placehold.co/400x600/431407/fbbf24/png?text=Last+Light",
    showtimes: ["12:30 PM", "3:15 PM", "6:00 PM", "9:20 PM"],
  },
  {
    id: "orbit-city",
    title: "Orbit City",
    genre: "Sci-Fi",
    duration: "2h 24m",
    rating: "PG-13",
    image: "https://placehold.co/400x600/0c4a6e/38bdf8/png?text=Orbit+City",
    showtimes: ["11:45 AM", "2:30 PM", "5:45 PM", "8:30 PM"],
  },
  {
    id: "velvet-curtain",
    title: "Velvet Curtain",
    genre: "Romance",
    duration: "1h 46m",
    rating: "PG",
    image: "https://placehold.co/400x600/831843/f9a8d4/png?text=Velvet+Curtain",
    showtimes: ["1:15 PM", "4:00 PM", "6:45 PM", "9:00 PM"],
  },
  {
    id: "midnight-relay",
    title: "Midnight Relay",
    genre: "Action",
    duration: "2h 05m",
    rating: "PG-13",
    image: "https://placehold.co/400x600/14532d/4ade80/png?text=Midnight+Relay",
    showtimes: ["12:00 PM", "3:30 PM", "7:00 PM", "10:30 PM"],
  },
  {
    id: "glass-horizon",
    title: "Glass Horizon",
    genre: "Mystery",
    duration: "2h 18m",
    rating: "R",
    image: "https://placehold.co/400x600/1f2937/e5e7eb/png?text=Glass+Horizon",
    showtimes: ["2:00 PM", "5:15 PM", "8:00 PM", "10:45 PM"],
  },
];

export function getMovieById(id: string): Movie | undefined {
  return movies.find((movie) => movie.id === id);
}
