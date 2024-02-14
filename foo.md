# MoviesService Documentation

## Overview

`MoviesService` is a service in our NestJS application that handles operations related to movies in our movie database. The operations include creating a movie, getting movies, getting a movie by ID, deleting a movie, and updating a movie.

## Methods

### createMovie(createMovieDto: CreateMovieDto): Promise<Movie>

This method creates a new movie in the database. It takes a `CreateMovieDto` object as a parameter, which should contain the details of the movie to be created.

### getMovies(): Promise<Movie[]>

This method retrieves all movies from the database. It does not take any parameters and returns a promise that resolves with an array of `Movie` objects.

### getMovieById(id: string): Promise<Movie>

This method retrieves a movie by its ID. It takes a string `id` as a parameter and returns a promise that resolves with the `Movie` object if found, or throws an `NotFoundException` if no movie is found with the given ID.

### deleteMovie(id: string): Promise<Movie>

This method deletes a movie by its ID. It takes a string `id` as a parameter and returns a promise that resolves with the deleted `Movie` object if found, or throws an `NotFoundException` if no movie is found with the given ID.

### updateMovie(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie>

This method updates a movie by its ID. It takes a string `id` and an `UpdateMovieDto` object as parameters. The `UpdateMovieDto` should contain the updated details of the movie. The method returns a promise that resolves with the updated `Movie` object if found, or throws an `NotFoundException` if no movie is found with the given ID.

## Testing

Unit tests for `MoviesService` are located in the `movies.service.spec.ts` file. They test all the methods of the service and use Jest's mocking functions to mock the `Movie` model. Run the tests with the `npm test` command.

# CreateMovieDto Documentation

## Overview

`CreateMovieDto` is a Data Transfer Object (DTO) used in our NestJS application. It's specifically used for creating a new movie in our movie database via the `MoviesService`.

## Structure

The `CreateMovieDto` is an object that should have the following properties:

- `id`: A unique identifier for the movie. This should be a number.
- `title`: The title of the movie. This should be a string.
- `overview`: A brief summary of the movie. This should be a string.
- `popularity`: The popularity score of the movie. This should be a number.
- `vote_average`: The average vote or rating of the movie. This should be a number.
- `vote_count`: The count of votes or ratings the movie has received. This should be a number.
- `release_date`: The release date of the movie. This should be a string in the format 'YYYY-MM-DD'.
- `genre_ids`: An array of genre identifiers associated with the movie. This should be an array of strings.

## Example

Here's an example of a `CreateMovieDto`:

```json
{
  "id": 1,
  "title": "Test Movie",
  "overview": "This is a test movie used for unit testing.",
  "popularity": 8.5,
  "vote_average": 4.7,
  "vote_count": 100,
  "release_date": "2021-01-01",
  "genre_ids": ["12", "14"]
}