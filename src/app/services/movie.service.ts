import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private baseUrl = environment.baseUrl;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  // Fetch trending movies
  getTrendingMovies() {
    return this.http.get(
      `${this.baseUrl}/trending/all/week?api_key=${this.apiKey}`
    );
  }

  // Fetch popular movies
  getPopularMovies() {
    return this.http.get(
      `${this.baseUrl}/movie/popular?api_key=${this.apiKey}`
    );
  }

  // Search for movies
  searchMovie(query: string) {
    return this.http.get(
      `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${query}`
    );
  }
}
