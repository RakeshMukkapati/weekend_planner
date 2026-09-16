export type Movie = {
  id: string;
  title: string;
  genre: string;
  runtime: string;
  rating: string;
  score: number;
  poster: string;
  status: "Now showing" | "Preview";
};

export type Showtime = {
  id: string;
  movie: string;
  screen: string;
  time: string;
  occupancy: number;
  seatsLeft: number;
};

export const movies: Movie[] = [
  {
    id: "1",
    title: "Neon Harbor",
    genre: "Thriller",
    runtime: "2h 11m",
    rating: "PG-13",
    score: 8.4,
    poster: "from-fuchsia-700 via-indigo-800 to-slate-950",
    status: "Now showing",
  },
  {
    id: "2",
    title: "Last Light Express",
    genre: "Drama",
    runtime: "1h 58m",
    rating: "R",
    score: 8.1,
    poster: "from-amber-600 via-rose-800 to-zinc-950",
    status: "Now showing",
  },
  {
    id: "3",
    title: "Orbit City",
    genre: "Sci-Fi",
    runtime: "2h 24m",
    rating: "PG-13",
    score: 7.9,
    poster: "from-cyan-600 via-blue-800 to-slate-950",
    status: "Now showing",
  },
  {
    id: "4",
    title: "Velvet Curtain",
    genre: "Romance",
    runtime: "1h 46m",
    rating: "PG",
    score: 7.6,
    poster: "from-rose-500 via-purple-800 to-zinc-950",
    status: "Preview",
  },
];

export const showtimes: Showtime[] = [
  {
    id: "s1",
    movie: "Neon Harbor",
    screen: "IMAX 1",
    time: "6:15 PM",
    occupancy: 86,
    seatsLeft: 28,
  },
  {
    id: "s2",
    movie: "Orbit City",
    screen: "Screen 4",
    time: "6:40 PM",
    occupancy: 62,
    seatsLeft: 54,
  },
  {
    id: "s3",
    movie: "Last Light Express",
    screen: "Dolby 2",
    time: "7:05 PM",
    occupancy: 91,
    seatsLeft: 12,
  },
  {
    id: "s4",
    movie: "Velvet Curtain",
    screen: "Screen 7",
    time: "7:30 PM",
    occupancy: 34,
    seatsLeft: 98,
  },
  {
    id: "s5",
    movie: "Neon Harbor",
    screen: "Screen 3",
    time: "8:50 PM",
    occupancy: 48,
    seatsLeft: 71,
  },
];

export const stats = [
  { label: "Tickets sold today", value: "1,284", hint: "+12% vs yesterday" },
  { label: "House occupancy", value: "73%", hint: "Peak at 8:00 PM" },
  { label: "Box office", value: "$18,420", hint: "Across 9 screens" },
  { label: "Open bookings", value: "46", hint: "Awaiting payment" },
];
