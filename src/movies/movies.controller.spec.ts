/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from '../movies/dto/create-movie.dto';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

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
            getMovies: jest.fn().mockResolvedValue([]),
            getMovieById: jest.fn().mockResolvedValue({}),
            createMovie: jest.fn().mockImplementation((dto: CreateMovieDto) => Promise.resolve(dto === mockMovie ? mockMovie : null)),
            updateMovie: jest.fn().mockResolvedValue({}),
            deleteMovie: jest.fn().mockResolvedValue({}),
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

  describe('createMovie', () => {
    it('should create a movie', async () => {
      expect(await controller.createMovie(mockMovie)).toBe(mockMovie);
    });
  });

  // Add more tests here
});