import { Injectable, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Movie, MovieDocument } from './schemas/movie.schema';
import axios from 'axios';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
    private httpService: HttpService,
  ) {}

  async fetchMovies() {
    try {
        const url = process.env.MOVIES_API_URL;
        const options = {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.MOVIES_API_TOKEN}`
          }
        };
      
      const response = await axios.get(url, options);
      const movies = response.data.results;
        console.log(movies);
      for (const movie of movies) {
        const existingMovie = await this.movieModel.findOne({ id: movie.id });

        if (!existingMovie) {
          const createdMovie = new this.movieModel(movie);
          await createdMovie.save();
        }
        
      }
    } catch (error) {
      console.error(error);
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
        const movie = new this.movieModel({
          id: new Types.ObjectId(),
          ...createMovieDto
        });
        return movie.save();
      }
    
async updateMovie(id: string, movieData: any) {
    return this.movieModel.findByIdAndUpdate(id, movieData, { new: true }).exec();
}

async deleteMovie(id: string) {
    return this.movieModel.findByIdAndDelete(id).exec();
}
}
