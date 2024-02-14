# Movie App

## Description
This is a movie app that allows users to browse and search for movies, view movie details, and save their favorite movies to personal db.

## Features
- Filter movies by different categories (e.g., rate-count, avarage rate, publication date)
- View movie details including synopsis, and ratings
- Save favorite movies to your personal db
- Integration with external movie database API (TMDb)

## Technologies Used
- Back-end: Node.js, Express, NestJS
- Database: MongoDB

## Installation
1. Clone the repository: `git clone https://github.com/korayatmaca/movie-app`
2. Navigate to the project directory: `cd movie-app`
3. Install dependencies: `npm install`

## Configuration
1. Create a `.env` file in the root directory
2. Add the following environment variables:
   - `PORT=[your PORT number]`: Port number that project running on
   - `API_KEY=[your API key]`: API key for accessing TMDB
   - `MOVIE_DISCOVER_API_URL= https://api.themoviedb.org/3/discover/movie`: API for discover movies
   - `DB_CONNECTION=[your MongoDB connection string]`: Connection string for MongoDB

## Usage
1. Start the development server: `npm start`
2. Open your web browser and navigate to `http://localhost:${PORT}`

## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License
This project is licensed under the [MIT License](LICENSE).

## Contact
For any inquiries or questions, please contact katmaca97@gmail.com 