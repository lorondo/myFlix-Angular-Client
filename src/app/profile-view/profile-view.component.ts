import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MovieCardDataComponent } from '../movie-card-data/movie-card-data.component';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
  standalone: false,
})
export class ProfileViewComponent implements OnInit {
  user: any = {};
  favoriteMovies: any[] = [];
  movies: any[] = [];

  constructor(private fetchApiData: UserRegistrationService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      console.error('No user data found in localStorage.');
      return;
    }

    const username = JSON.parse(storedUser).Username;

    this.fetchApiData.getUserInfo(username).subscribe(
      (response) => {
        this.user = response;

        this.fetchApiData.getAllMovies().subscribe(
          (movies) => {
            this.movies = movies;

            this.favoriteMovies = this.movies.filter((movie) =>
              this.user.FavoriteMovies.includes(movie._id)
            );
          },
          (error) => console.error('Error fetching movies:', error)
        );
      },
      (error) => console.error('Error fetching user profile:', error)
    );
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

  toggleFavorite(movie: any): void {
    const movieId = movie._id;

    if (this.isFavorite(movie)) {
      this.removeFavorite(movieId);
    } else {
      this.addFavorite(movieId);
    }
  }

  isFavorite(movie: any): boolean {
    return this.favoriteMovies.some((favMovie) => favMovie._id === movie._id);
  }

  addFavorite(movieId: string): void {
    const username = this.user.Username;

    this.fetchApiData.addMovieToFavorites(username, movieId).subscribe(
      () => {
        this.favoriteMovies.push(this.movies.find((movie) => movie._id === movieId));
        console.log('Movie added to favorites.');
      },
      (error) => console.error('Error adding movie to favorites:', error)
    );
  }

  removeFavorite(movieId: string): void {
    const username = this.user.Username;

    this.fetchApiData.removeMovieFromFavorites(username, movieId).subscribe(
      () => {
        this.favoriteMovies = this.favoriteMovies.filter((movie) => movie._id !== movieId);
        console.log('Movie removed from favorites.');
      },
      (error) => console.error('Error removing movie from favorites:', error)
    );
  }
}
