import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie, MovieDocument } from './schemas/movie.schema';
import axios from 'axios';
import { CreateMovieDto } from './dto/create-movie.dto';
import { DiscoverMoviesDto } from './dto/discover_movie.dto';
@Injectable()
export class MoviesService {
    constructor(
        @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
        private httpService: HttpService,
    ) { }

    async fetchNowPlayingMovies() {
        try {
            const url = process.env.NOW_PLAYING_MOVIES_API_URL;
            const options = {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${process.env.MOVIES_API_TOKEN}`
                }
            };

            const response = await axios.get(url, options);
            const movies = response.data.results;
            for (const movie of movies) {
                const existingMovie = await this.movieModel.findOne({ id: movie.id });

                if (!existingMovie) {
                    const createdMovie = new this.movieModel(movie);
                    await createdMovie.save();
                }

            }
        } catch (error) {
            if (error.response) {
                // If the error is an Axios error, you can access more information with error.response
                throw new HttpException(`Request to external API failed with status code: ${error.response.status}`, HttpStatus.BAD_GATEWAY);
            } else {
                // If the error is not an Axios error, just rethrow it
                throw error;
            }
        }
    }

    async getDiscoverMovies(params: DiscoverMoviesDto) {
        try {
            const options = {
                method: 'GET',
                url: `${process.env.MOVIE_DISCOVER_API_URL}`,
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${process.env.MOVIES_API_TOKEN}`,
                },
                params: { ...params }
            };

            const response = await axios.request(options);
            const movies = response.data.results;

            for (const movie of movies) {
                const existingMovie = await this.movieModel.findOne({ id: movie.id });

                if (!existingMovie) {
                    const createdMovie = new this.movieModel(movie);
                    await createdMovie.save();
                }
            }

        } catch (error) {
            if (error.response) {
                // If the error is an Axios error, you can access more information with error.response
                throw new HttpException(`Request to external API failed with status code: ${error.response.status}`, HttpStatus.BAD_GATEWAY);
            } else {
                // If the error is not an Axios error, just rethrow it
                throw error;
            }
        }
    }

    async getMovies() {
        try {
            return await this.movieModel.find().exec();
        } catch (error) {
            throw new HttpException('Error occurred while retrieving movies', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getMovieById(id: string) {
        try {
            const movie = await this.movieModel.findById(id).exec();
            if (!movie) {
                throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
            }
            return movie;
        } catch (error) {
            throw new HttpException('Error occurred while retrieving the movie', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createMovie(createMovieDto: CreateMovieDto) {
        try {
            const newMovie = new this.movieModel(createMovieDto);
            return await newMovie.save();
        } catch (error) {
            throw new HttpException('Error occurred while creating the movie', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateMovie(id: string, createMovieDto: CreateMovieDto) {
        try {
            const updatedMovie = await this.movieModel.findByIdAndUpdate(id, createMovieDto, { new: true }).exec();
            if (!updatedMovie) {
                throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
            }
            return updatedMovie;
        } catch (error) {
            throw new HttpException('Error occurred while updating the movie', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteMovie(id: string) {
        try {
            const deletedMovie = await this.movieModel.findByIdAndDelete(id).exec();
            if (!deletedMovie) {
                throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
            }
            return deletedMovie;
        } catch (error) {
            throw new HttpException('Error occurred while deleting the movie', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
