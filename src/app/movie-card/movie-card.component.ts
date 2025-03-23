// src/app/movie-card/movie-card.component.ts
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
export class MovieCardComponent implements OnInit {  // ✅ Implements OnInit properly
  movies: any[] = [];
  favoriteMovies: string[] = [];
  user: any = {};

  constructor(private fetchApiData: UserRegistrationService, private dialog: MatDialog) {}  // ✅ Marked as private (best practice)

  ngOnInit(): void {
    this.getMovies();
    let userString: any = localStorage.getItem("user") ? localStorage.getItem("user") : "";
    this.user = JSON.parse(userString);
    this.favoriteMovies = this.user.FavoriteMovies;
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
   * Toggle favorite status: 
   * If movie is already favorited, remove it, else add it.
   * Calls the backend API to update the user's FavoriteMovies list.
   */
  toggleFavorite(movie: any): void {
    const movieId = movie._id;

    // If the movie is already a favorite, remove it
    if (this.favoriteMovies[movieId]) {
      this.removeFavorite(movieId);
    } else {
      // If it's not a favorite, add it
      this.addFavorite(movieId);
    }
  }

  /**
   * Calls the backend API to add the movie to the user's favorites.
   * Updates the local state for favorite movies.
   */
  addFavorite(movieId: string): void {
    const username = this.user.Username;  // Replace with the actual logged-in user's ID

    this.fetchApiData.addMovieToFavorites(username, movieId).subscribe(
      (response: any) => {
        this.favoriteMovies.push(movieId);  // Mark the movie as a favorite
        console.log('Movie added to favorites:', response);
      },
      (error) => {
        console.error('Error adding movie to favorites:', error);
      }
    );
  }

  /**
   * Calls the backend API to remove the movie from the user's favorites.
   * Updates the local state for favorite movies.
   */
  removeFavorite(movieId: string): void {
    const username = this.user.Username;  // Replace with the actual logged-in user's ID

    this.fetchApiData.removeMovieFromFavorites(username, movieId).subscribe(
      (response: any) => {
        let index = this.favoriteMovies.indexOf(movieId);  // Remove the movie from favorites
        this.favoriteMovies.splice(index, 1);
        console.log('Movie removed from favorites:', response);
      },
      (error) => {
        console.error('Error removing movie from favorites:', error);
      }
    );
  }

  /**
   * Check if the movie is favorited based on the movie ID.
   * Returns true or false based on the local state.
   */
  isFavorite(movie: any): boolean {
    return !!this.favoriteMovies[movie._id];  // Returns true if the movie is in the favorite state
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
