import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

// API URL
const apiUrl = 'YOUR_HOSTED_API_URL_HERE/';

@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
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
    console.error(`Error Status: ${error.status}, Error body: ${error.error}`);
    return throwError('Something bad happened; please try again later.');
  }

  private get(endpoint: string): Observable<any> {
    return this.http.get(`${apiUrl}${endpoint}`, { headers: this.getAuthHeaders() }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private post(endpoint: string, body: any = {}): Observable<any> {
    return this.http.post(`${apiUrl}${endpoint}`, body, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  private put(endpoint: string, body: any): Observable<any> {
    return this.http.put(`${apiUrl}${endpoint}`, body, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  private delete(endpoint: string): Observable<any> {
    return this.http.delete(`${apiUrl}${endpoint}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // User Registration
  userRegistration(userDetails: any): Observable<any> {
    return this.post('users', userDetails);
  }

  // Get all movies
  getAllMovies(): Observable<any> {
    return this.get('movies');
  }

  // Get one movie
  getOneMovie(title: string): Observable<any> {
    return this.get(`movies/${title}`);
  }

  // Get movies by genre
  getMoviesByGenre(genre: string): Observable<any> {
    return this.get(`movies/genre/${genre}`);
  }

  // Get movies by director
  getMoviesByDirector(director: string): Observable<any> {
    return this.get(`movies/director/${director}`);
  }

  // Get user info
  getUserInfo(username: string): Observable<any> {
    return this.get(`users/${username}`);
  }

  // Update user info
  updateUser(username: string, updatedDetails: any): Observable<any> {
    return this.put(`users/${username}`, updatedDetails);
  }

  // Delete user
  deleteUser(username: string): Observable<any> {
    return this.delete(`users/${username}`);
  }
}
