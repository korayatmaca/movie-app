import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { DiscoverMoviesDto } from './dto/discover_movie.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) { }

  /*@Get('fetchNowPlayingMovies')
  getMoviesFromTMDB() {
    return this.moviesService.fetchNowPlayingMovies();
  }*/

  @Get('discoverMovies')
  @ApiQuery({ name: 'sort_by', required: false, type: String, description: 'default:primary_release_date.asc ' })
  @ApiQuery({ name: 'vote_count.gte', required: false, type: Number, description: 'default:1500' })
  @ApiQuery({ name: 'vote_average.gte', required: false, type: String, description: 'default:8.4' })
  @ApiQuery({ name: 'with_watch_providers', required: false, type: String, description: 'default:8' })
  @ApiQuery({ name: 'watch_region', required: false, type: String, description: 'default:TR' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'default:1' })
  getDiscoverMovies(@Query() params: DiscoverMoviesDto) {
    return this.moviesService.getDiscoverMovies(params);
  }

  @Get()
  getMovies() {
    return this.moviesService.getMovies();
  }

  @Get(':id')
  getMovie(@Param('id') id: string) {
    return this.moviesService.getMovieById(id);
  }

  @Post()
  createMovie(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.createMovie(createMovieDto);
  }

  @Put(':id')
  updateMovie(@Param('id') id: string, @Body() updateMovieDto: CreateMovieDto) {
    return this.moviesService.updateMovie(id, updateMovieDto);
  }

  @Delete(':id')
  deleteMovie(@Param('id') id: string) {
    return this.moviesService.deleteMovie(id);
  }
}