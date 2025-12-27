import { Component, signal } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  trending = signal<any[]>([]);
  popular = signal<any[]>([]);

  constructor(private movieService:MovieService, private router: Router) {
    
  }

  ngOnInit(): void {

    this.movieService.getTrendingMovies().subscribe((res:any)=>{
      this.trending.set(res.results);
    });

    this.movieService.getPopularMovies().subscribe((res:any)=>{
      this.popular.set(res.results);
    });
  }
}
