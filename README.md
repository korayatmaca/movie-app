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
- Containerization: Docker
- Testing: Jest

## Installation
1. Clone the repository: `git clone https://github.com/korayatmaca/movie-app`
2. Navigate to the project directory: `cd movie-app`
3. Install dependencies: `npm install`
4. Build the Docker image with `docker build -t your-image-name .`
5. Run the Docker container with `docker run -p 3000:3000 your-image-name`

## Configuration
1. Create a `.env` file in the root directory
2. Add the following environment variables:
   - `PORT=[your PORT number]`: Port number that project running on
   - `API_KEY=[your API key]`: API key for accessing TMDB
   - `MOVIE_DISCOVER_API_URL= https://api.themoviedb.org/3/discover/movie`: API for discover movies
   - `DB_CONNECTION=mongodb://localhost:27017/movies`: Connection string for MongoDB
   - `MONGO_URI=mongodb://mongo:27017/movies` : Connection string for Docker MongoDB

## Running the tests
This project uses Jest for unit testing. Here's how you can run them.

1. Run `npm test` to execute all unit tests.
2. To run specific test files, use `npm test -- movies.controller.spec.ts` or `npm test -- movies.service.spec.ts`

## Usage
1. Start the development server: `npm start`
2. Open your web browser and navigate to `http://localhost:${PORT}`
3. To use Swagger UI for API documentation, navigate to `http://localhost:${PORT}/api`

## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License
This project is licensed under the [MIT License](LICENSE).

## Contact
For any inquiries or questions, please contact katmaca97@gmail.com 