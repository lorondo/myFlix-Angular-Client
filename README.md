# myFlix Angular Client

myFlix Angular Client is a web application built using Angular and Angular Material, allowing users to browse movies, register, and manage their profiles.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)

## Features
- User Registration and Authentication
- Browse Movies and View Details
- Filter Movies by Genre and Director
- Manage User Profiles
- Save Favorite Movies
- Responsive UI with Angular Material

## Installation

Ensure you have **Node.js (>=18.0.0)** and **Angular CLI (>=19.2.1)** installed.

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/myFlix-Angular-Client.git
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
