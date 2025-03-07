import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'YOUR_HOSTED_API_URL_HERE/';
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
 
  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  // Making the api call for the user login endpoint
  userLogin(loginDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', loginDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for the all movies endpoint
  getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + 'movies', { headers: this.getAuthHeaders() }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for the one movie endpoint
  getOneMovie(): Observable<any> {
    return this.http.get(apiUrl + 'movies/${title}', { headers: this.getAuthHeaders() }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for the movies by genre endpoint
  getMoviesByGenre(genre: string): Observable<any> {
    return this.http.get(apiUrl + 'movies/genre/${genre}', { headers: this.getAuthHeaders() }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for the movies by director endpoint
  getMoviesByDirector(director: string): Observable<any> {
    return this.http.get(apiUrl + 'movies/director/${director}', { headers: this.getAuthHeaders() }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  
  // Making the api call for the user info endpoint
  getUserInfo(username: string): Observable<any> {
    return this.http.get(apiUrl + 'users/${username}', { headers: this.getAuthHeaders() }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for editing the user info endpoint
  updateUser(username: string, updatedDetails: any): Observable<any> {
    return this.http.put(apiUrl + 'users/${username}', { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for deleting the user endpoint
  deleteUser(username: string): Observable<any> {
    return this.http.delete(apiUrl + 'users/${username}', { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for get favorite movies endpoint
  getFavoriteMovies(username: string): Observable<any> {
    return this.http.get(apiUrl + 'users/${username}/movies', { headers: this.getAuthHeaders() }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for adding movie to favorites endpoint
  addMovieToFavorites(username: string, movieId: string): Observable<any> {
    return this.http.post(apiUrl + 'users/${username}/movies/${movieId}', { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for removing movie from favorites endpoint
  removeFromFavorites(username: string, movieId: string): Observable<any> {
    return this.http.delete(apiUrl + 'users/${username}/movies/${movieId}', { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}