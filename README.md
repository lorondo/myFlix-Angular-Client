# myFlix Angular Client

The MyFlix Angular Client is a web application built with Angular and Material Design, serving as a front-end for the MyFlix movie database. Users can browse movies, view details, create an account, and manage their favorite films. This app utilizes server-side rendering (SSR) via Express for improved performance and SEO.

## Features
- User authentication (registration & login)
- Browse a collection of movies
- View details on a movie’s genre, director, and summary
- Add/remove movies from favorites
- Responsive design with Angular Material
- Modal-based user authentication (login & registration)
- User profile management

## Installation

Ensure you have **Node.js (>=18.0.0)** and **Angular CLI (>=19.2.1)** installed.

1. Clone the repository:
   ```sh
   git clone https://github.com/lorondo/myFlix-Angular-Client.git
   cd myFlix-Angular-Client
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Ensure Angular Material is properly installed:
   ```sh
   ng add @angular/material
   ```

## Running the Application

Start the development server:
```sh
ng serve --open
```
This will launch the app in your default web browser at `http://localhost:4200/`.

## Usage
- Click **Sign Up** to create a new account.
- Log in with your credentials.
- Browse movies, view details, and add favorites.
- Edit your profile as needed.

## Technologies Used
- **Angular** (v19.2.1)
- **Angular Material** (v19.2.2)
- **RxJS** (v7.8.2)
- **TypeScript** (v5.7.2)
- **Node.js** (v18.20.7)
- **Express** (v4.18.2) for API communication

## Project Structure
```
myFlix-Angular-Client/
│-- src/
│   ├── app/
│   │   ├── components/
│   │   ├── services/
│   │   ├── app.module.ts
│   │   ├── app.component.ts
│   │   ├── app-routing.module.ts
│   ├── assets/
│   ├── styles.scss
│-- angular.json
│-- package.json
│-- README.md
```
