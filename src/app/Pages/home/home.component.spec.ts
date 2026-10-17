import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HeaderComponent } from '../../Components/header/header.component';
import { MovieListComponent } from '../../Components/movie-list/movie-list.component';
import { MovieService } from '../../services/movie.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    localStorage.removeItem('netflix-clone-my-list');
    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule],
      declarations: [HomeComponent, HeaderComponent, MovieListComponent],
      providers: [{
        provide: MovieService,
        useValue: {
          getTrendingMovies: () => of({ results: [] }),
          getPopularMovies: () => of({ results: [] }),
        },
      }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('filters titles by the search query', () => {
    component.setSearchQuery('stranger');
    expect(component.searchResults[0].title).toBe('Stranger Things');
  });

  it('persists titles added to My List', () => {
    const movie = component.trending()[0];
    component.toggleSaved(movie);
    expect(component.isSaved(movie)).toBeTrue();
    expect(JSON.parse(localStorage.getItem('netflix-clone-my-list') || '[]')).toContain(jasmine.objectContaining({ id: movie.id }));
  });
});
