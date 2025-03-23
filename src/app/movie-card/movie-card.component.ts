import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MovieCardDataComponent } from '../movie-card-data/movie-card-data.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  standalone: false
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: string[] = [];
  user: any = {};

  constructor(private fetchApiData: UserRegistrationService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getMovies();
    this.getUserFavorites(); // Fetch favorites when the component loads
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe(
      (resp: any) => {
        this.movies = resp;
        console.log('Movies fetched:', this.movies);
      },
      (error) => {
        console.error('Error fetching movies:', error);
      }
    );
  }

  /**
   * Fetch the user's favorite movies from the API.
   */
  getUserFavorites(): void {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      console.error('No user data found in localStorage.');
      return;
    }

    const username = JSON.parse(storedUser).Username;

    this.fetchApiData.getUserInfo(username).subscribe(
      (response) => {
        this.user = response;
        this.favoriteMovies = response.FavoriteMovies || [];
        console.log('User favorites loaded:', this.favoriteMovies);
      },
      (error) => {
        console.error('Error fetching user favorites:', error);
      }
    );
  }

  /**
   * Toggle favorite status: 
   * If movie is already favorited, remove it, else add it.
   */
  toggleFavorite(movie: any): void {
    const movieId = movie._id;

    if (this.isFavorite(movie)) {
      this.removeFavorite(movieId);
    } else {
      this.addFavorite(movieId);
    }
  }

  /**
   * Calls the backend API to add the movie to the user's favorites.
   * Updates localStorage and UI state.
   */
  addFavorite(movieId: string): void {
    const username = this.user.Username;

    this.fetchApiData.addMovieToFavorites(username, movieId).subscribe(
      () => {
        this.favoriteMovies.push(movieId);
        this.updateLocalStorage();
        console.log('Movie added to favorites.');
      },
      (error) => {
        console.error('Error adding movie to favorites:', error);
      }
    );
  }

  /**
   * Calls the backend API to remove the movie from the user's favorites.
   * Updates localStorage and UI state.
   */
  removeFavorite(movieId: string): void {
    const username = this.user.Username;

    this.fetchApiData.removeMovieFromFavorites(username, movieId).subscribe(
      () => {
        this.favoriteMovies = this.favoriteMovies.filter(id => id !== movieId);
        this.updateLocalStorage();
        console.log('Movie removed from favorites.');
      },
      (error) => {
        console.error('Error removing movie from favorites:', error);
      }
    );
  }

  /**
   * Check if the movie is favorited based on the latest stored favorites list.
   */
  isFavorite(movie: any): boolean {
    return this.favoriteMovies.includes(movie._id);
  }

  /**
   * Updates localStorage with the latest favorite movies list.
   */
  private updateLocalStorage(): void {
    const updatedUser = { ...this.user, FavoriteMovies: this.favoriteMovies };
    localStorage.setItem('user', JSON.stringify(updatedUser));
  }

  openDialog(type: string, movie: any): void {
    this.dialog.open(MovieCardDataComponent, {
      width: '400px',
      data: {
        type: type,
        title: movie.Title,
        movie: movie,
      },
    });
  }
}
