import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-list',
  standalone: false,
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent {
  @Input() title:string = '';
  @Input() movies:any[] = [];
  hoverMovie: any = null;

  setHover(movie: any) {
  this.hoverMovie = movie;
}

clearHover() {
  this.hoverMovie = null;
}

}
