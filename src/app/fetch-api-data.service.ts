import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

// API URL
const apiUrl = 'YOUR_HOSTED_API_URL_HERE/';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
    });
  }

  private extractResponseData(res: any) {
    return res || {};
  }

  private handleError(error: HttpErrorResponse): any {
    console.error(
      `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
    );
    return throwError('Something bad happened; please try again later.');
  }

  // User Registration
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(`${apiUrl}users`, userDetails).pipe(catchError(this.handleError));
  }

  // User Login
  userLogin(loginDetails: any): Observable<any> {
    return this.http.post(`${apiUrl}login`, loginDetails).pipe(catchError(this.handleError));
  }

  // Get All Movies
  getAllMovies(): Observable<any> {
    return this.http.get(`${apiUrl}movies`, { headers: this.getAuthHeaders() }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get One Movie
  getOneMovie(title: string): Observable<any> {
    return this.http.get(`${apiUrl}movies/${title}`, { headers: this.getAuthHeaders() }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get Movies by Genre
  getMoviesByGenre(genre: string): Observable<any> {
    return this.http.get(`${apiUrl}movies/genre/${genre}`, { headers: this.getAuthHeaders() }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get Movies by Director
  getMoviesByDirector(director: string): Observable<any> {
    return this.http.get(`${apiUrl}movies/director/${director}`, { headers: this.getAuthHeaders() }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get User Info
  getUserInfo(username: string): Observable<any> {
    return this.http.get(`${apiUrl}users/${username}`, { headers: this.getAuthHeaders() }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Update User Info
  updateUser(username: string, updatedDetails: any): Observable<any> {
    return this.http.put(`${apiUrl}users/${username}`, updatedDetails, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Delete User
  deleteUser(username: string): Observable<any> {
    return this.http.delete(`${apiUrl}users/${username}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Get Favorite Movies
  getFavoriteMovies(username: string): Observable<any> {
    return this.http.get(`${apiUrl}users/${username}/movies`, { headers: this.getAuthHeaders() }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Add Movie to Favorites
  addMovieToFavorites(username: string, movieId: string): Observable<any> {
    return this.http.post(`${apiUrl}users/${username}/movies/${movieId}`, {}, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Remove Movie from Favorites
  removeFromFavorites(username: string, movieId: string): Observable<any> {
    return this.http.delete(`${apiUrl}users/${username}/movies/${movieId}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }
}
