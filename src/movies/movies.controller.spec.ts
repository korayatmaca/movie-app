import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

  // Updated mockMovie to reflect the new structure.
  const mockMovie: CreateMovieDto = {
    id: 1,
    title: "Test Movie",
    overview: "This is a test movie used for unit testing.",
    popularity: 8.5,
    vote_average: 4.7,
    vote_count: 100,
    release_date: "2021-01-01",
    genre_ids: ["12", "14"]
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        {
          provide: MoviesService,
          useValue: {
            getMovies: jest.fn().mockResolvedValue([mockMovie]),
            getMovieById: jest.fn().mockResolvedValue(mockMovie),
            createMovie: jest.fn().mockResolvedValue(mockMovie),
            updateMovie: jest.fn().mockResolvedValue(mockMovie),
            deleteMovie: jest.fn().mockResolvedValue(null),
            getDiscoverMovies: jest.fn().mockResolvedValue([mockMovie]),
          },
        },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getMovies', () => {
    it('should return an array of movies', async () => {
      expect(await controller.getMovies()).toEqual([mockMovie]);
    });
  });

  describe('getMovie', () => {
    it('should return a single movie', async () => {
      const movieId = '1';
      expect(await controller.getMovie(movieId)).toEqual(mockMovie);
      expect(service.getMovieById).toHaveBeenCalledWith(movieId);
    });
  });

  describe('createMovie', () => {
    it('should create a movie', async () => {
      expect(await controller.createMovie(mockMovie)).toEqual(mockMovie);
      expect(service.createMovie).toHaveBeenCalledWith(mockMovie);
    });
  });

  describe('updateMovie', () => {
    it('should update a movie', async () => {
      const movieId = mockMovie.id.toString();
      expect(await controller.updateMovie(movieId, mockMovie)).toEqual(mockMovie);
      expect(service.updateMovie).toHaveBeenCalledWith(movieId, mockMovie);
    });
  });

  describe('deleteMovie', () => {
    it('should delete a movie', async () => {
      const movieId = mockMovie.id.toString();
      await controller.deleteMovie(movieId);
      expect(service.deleteMovie).toHaveBeenCalledWith(movieId);
    });
  });

  describe('getDiscoverMovies', () => {
    it('should return an array of movies', async () => {
      const discoverMoviesDto = {
        sort_by: 'primary_release_date.asc',
        vote_count: 1500,
        vote_average: 8.4,
        with_watch_providers: '8',
        watch_region: 'TR',
        page: 1,
      };
      expect(await controller.getDiscoverMovies(discoverMoviesDto)).toEqual([mockMovie]);
      expect(service.getDiscoverMovies).toHaveBeenCalledWith(discoverMoviesDto);
    });
  });

});
