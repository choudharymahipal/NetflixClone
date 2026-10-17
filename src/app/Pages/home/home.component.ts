import { Component, OnInit, signal } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { environment } from '../../../environments/environment';

interface Movie {
  id: number;
  title: string;
  name?: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date?: string;
  media_type?: string;
}

const FEATURED_TITLES: Movie[] = [
  {
    id: 66732,
    title: 'Stranger Things',
    name: 'Stranger Things',
    overview: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.',
    poster_path: '/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg',
    backdrop_path: '/56v2KjBlU4XaOv9rVYEQypROD7P.jpg',
    vote_average: 8.6,
    media_type: 'tv',
  },
  {
    id: 93405,
    title: 'Squid Game',
    name: 'Squid Game',
    overview: 'Hundreds of cash-strapped players accept a strange invitation to compete in children’s games. A tempting prize awaits, with deadly high stakes.',
    poster_path: '/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg',
    backdrop_path: '/qw3J9cNeLioOLoR68WX7z79aCdK.jpg',
    vote_average: 8.0,
    media_type: 'tv',
  },
  {
    id: 119051,
    title: 'Wednesday',
    name: 'Wednesday',
    overview: 'Smart, sarcastic and a little dead inside, Wednesday Addams investigates a murder spree while making new friends and foes at Nevermore Academy.',
    poster_path: '/9PFonBhy4cQy7Jz20NpMygczOkv.jpg',
    backdrop_path: '/iHSwvRVsRyxpX7FE7GbviaDvgGZ.jpg',
    vote_average: 8.5,
    media_type: 'tv',
  },
  {
    id: 138501,
    title: 'The Witcher',
    name: 'The Witcher',
    overview: 'Geralt of Rivia, a mutated monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.',
    poster_path: '/7vjaCdMw15FEbXyLQTVa04URsPm.jpg',
    backdrop_path: '/jBJWaqoSCiARWtfV0GlqHrcdidd.jpg',
    vote_average: 8.0,
    media_type: 'tv',
  },
  {
    id: 94997,
    title: 'House of the Dragon',
    name: 'House of the Dragon',
    overview: 'Set two hundred years before the events of Game of Thrones, this is the story of House Targaryen.',
    poster_path: '/z2yahl2uefxDCl0nogcRBstwruJ.jpg',
    backdrop_path: '/etj8E2o0bud0HkONVQPjyCkIvpv.jpg',
    vote_average: 8.4,
    media_type: 'tv',
  },
  {
    id: 76600,
    title: 'The Adam Project',
    overview: 'After accidentally crash-landing in 2022, time-traveling fighter pilot Adam Reed teams up with his 12-year-old self for a mission to save the future.',
    poster_path: '/wFjboE0aFZNb_ERwfsbjGX2lc6.jpg',
    backdrop_path: '/ewUqXnwiRLhgmGhuksOdLgh49Ch.jpg',
    vote_average: 7.0,
    media_type: 'movie',
  },
  {
    id: 872585,
    title: 'Oppenheimer',
    overview: 'The story of J. Robert Oppenheimer and his role in the development of the atomic bomb.',
    poster_path: '/ptpr0kGAckfQkJeJIt8st5dglvd.jpg',
    backdrop_path: '/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg',
    vote_average: 8.1,
    media_type: 'movie',
  },
  {
    id: 766507,
    title: 'Prey',
    overview: 'A skilled Comanche warrior protects her tribe from a highly evolved alien predator that hunts humans for sport.',
    poster_path: '/ujr5pztc1oitbe7ViMUOilFaJ7s.jpg',
    backdrop_path: '/7ZO9yoEU2fAHKhmJWfAc2QIPWJg.jpg',
    vote_average: 7.7,
    media_type: 'movie',
  },
];

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  trending = signal<Movie[]>(FEATURED_TITLES.slice(0, 5));
  popular = signal<Movie[]>(FEATURED_TITLES.slice(3));
  savedMovies = signal<Movie[]>(this.readSavedMovies());
  activeSection = signal('Home');
  searchQuery = signal('');
  selectedMovie = signal<Movie | null>(null);

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    if (!environment.apiKey || environment.apiKey === 'YOUR_API_KEY_HERE') return;

    this.movieService.getTrendingMovies().subscribe({
      next: (response: any) => {
        if (response.results?.length) this.trending.set(response.results);
      },
      error: () => undefined,
    });
    this.movieService.getPopularMovies().subscribe({
      next: (response: any) => {
        if (response.results?.length) this.popular.set(response.results);
      },
      error: () => undefined,
    });
  }

  get searchResults(): Movie[] {
    const query = this.searchQuery().trim().toLowerCase();
    if (!query) return [];
    return this.allMovies.filter((movie) =>
      (movie.title || movie.name || '').toLowerCase().includes(query)
    );
  }

  get allMovies(): Movie[] {
    return [...new Map([...this.trending(), ...this.popular()].map((movie) => [movie.id, movie])).values()];
  }

  get savedMovieIds(): number[] {
    return this.savedMovies().map((movie) => movie.id);
  }

  get sectionMovies(): Movie[] {
    switch (this.activeSection()) {
      case 'Series':
        return this.allMovies.filter((movie) => movie.media_type === 'tv');
      case 'Films':
        return this.allMovies.filter((movie) => movie.media_type === 'movie' || !movie.media_type);
      case 'My List':
        return this.savedMovies();
      default:
        return this.trending();
    }
  }

  selectSection(section: string): void {
    this.activeSection.set(section);
    this.searchQuery.set('');
  }

  setSearchQuery(query: string): void {
    this.searchQuery.set(query);
    this.activeSection.set('Home');
  }

  toggleSaved(movie: Movie): void {
    const isSaved = this.savedMovies().some((saved) => saved.id === movie.id);
    const updated = isSaved
      ? this.savedMovies().filter((saved) => saved.id !== movie.id)
      : [...this.savedMovies(), movie];
    this.savedMovies.set(updated);
    localStorage.setItem('netflix-clone-my-list', JSON.stringify(updated));
  }

  isSaved(movie: Movie): boolean {
    return this.savedMovies().some((saved) => saved.id === movie.id);
  }

  private readSavedMovies(): Movie[] {
    try {
      return JSON.parse(localStorage.getItem('netflix-clone-my-list') || '[]');
    } catch {
      return [];
    }
  }
}
