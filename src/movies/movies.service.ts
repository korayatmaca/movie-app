import { Injectable, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Movie, MovieDocument } from './schemas/movie.schema';
import axios from 'axios';
import { CreateMovieDto } from './dto/create-movie.dto';
import { DiscoverMoviesDto } from './dto/discover_movie.dto';
@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
    private httpService: HttpService,
  ) {}

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

        const response =  await axios.request(options);
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
    return this.movieModel.find().exec();
  }

  async getMovieById(id: string) {
    if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid ID');
    }
  
      return this.movieModel.findById(id).exec();
    }

  async createMovie(createMovieDto: CreateMovieDto) {
    const movie = new this.movieModel(createMovieDto);
    return movie.save();
  }
    
  async updateMovie(id: string, movieData: any) {
    return this.movieModel.findByIdAndUpdate(id, movieData, { new: true }).exec();
  }

    async deleteMovie(id: string) {
        return this.movieModel.findByIdAndDelete(id).exec();
    }
}
