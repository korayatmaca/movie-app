import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { Movie, MovieSchema } from './schemas/movie.schema';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
    HttpModule, // Add this line
    // other imports...
  ],
  providers: [MoviesService],
  controllers: [MoviesController],
})
export class MoviesModule {}