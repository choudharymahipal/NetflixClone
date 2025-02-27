import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movieId: string | null = null;
  movieDetails: any; // Replace 'any' with a specific type if available

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('id');
    this.fetchMovieDetails();
  }

  fetchMovieDetails(): void {
    // Logic to fetch movie details using the movieId
    // This could be an API call to a movie database
  }
}