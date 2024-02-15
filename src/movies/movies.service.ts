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
                throw new HttpException(`Request to external API failed with status code: ${error.response.status}`, HttpStatus.BAD_GATEWAY);
            } else {
                throw error;
            }
        }
    }

    async getMovies(): Promise<Movie[]> {
        //console.log('Getting movies...');
        try {
            const movies = await this.movieModel.find().exec();
            //console.log('Got movies:', movies);
            return movies;
        } catch (error) {
            //console.log('Error getting movies:', error);
            throw new HttpException('Failed to retrieve movies', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }    
      async getMovieById(id: string): Promise<Movie> {
        try {
          const movie = await this.movieModel.findById(id).exec();
          if (!movie) {
            throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
          }
          return movie;
        } catch (error) {
          throw new HttpException('Failed to retrieve the movie', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
    
      async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
        try {
          return await this.movieModel.create(createMovieDto);
        } catch (error) {
          console.error('Failed to create the movie', error);
          throw new HttpException('Failed to create the movie', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
    
      async updateMovie(id: string, createMovieDto: CreateMovieDto): Promise<Movie> {
        try {
          const updatedMovie = await this.movieModel.findByIdAndUpdate(id, createMovieDto, { new: true }).exec();
          if (!updatedMovie) {
            throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
          }
          return updatedMovie;
        } catch (error) {
          throw new HttpException('Failed to update the movie', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
    
      async deleteMovie(id: string): Promise<Movie> {
        try {
          const deletedMovie = await this.movieModel.findByIdAndDelete(id).exec();
          if (!deletedMovie) {
            throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
          }
          return deletedMovie;
        } catch (error) {
            console.error(error);
          throw new HttpException('Failed to delete the movie', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
    }
