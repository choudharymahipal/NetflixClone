import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-movie-list',
  standalone: false,
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent {
  @Input() title:string = '';
  @Input() movies:any[] = [];
  @Input() savedIds: number[] = [];
  @Output() movieSelected = new EventEmitter<any>();
  @Output() saveMovie = new EventEmitter<any>();
  unavailablePosters = new Set<number>();

  markPosterUnavailable(movie: any): void {
    this.unavailablePosters.add(movie.id);
  }

}
