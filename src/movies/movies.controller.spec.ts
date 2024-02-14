import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
//import { CreateMovieDto } from './dto/create-movie.dto';
//import { DiscoverMoviesDto } from './dto/discover_movie.dto';
describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        {
          provide: MoviesService,
          useValue: {
            fetchNowPlayingMovies: jest.fn(),
            getMovies: jest.fn(),
            getMovieById: jest.fn(),
            createMovie: jest.fn(),
            updateMovie: jest.fn(),
            deleteMovie: jest.fn(),
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
    it('should get all movies', () => {
      const result = [];
      jest.spyOn(service, 'getMovies').mockResolvedValue(result);

      expect(controller.getMovies()).toBe(result);
    });
  });

  /*describe('getMovie', () => {
    it('should get a movie by ID', () => {
      const id = '1';
      const result = { id: '1', title: 'Test Movie' };
      jest.spyOn(service, 'getMovieById').mockResolvedValue(result);

      expect(controller.getMovie(id)).toBe(result);
    });
  });

  describe('createMovie', () => {
    it('should create a movie', () => {
      const createMovieDto: CreateMovieDto = {
        title: 'Test Movie',
        // Add other properties as needed
      };
      const result = { id: '1', title: 'Test Movie' };
      jest.spyOn(service, 'createMovie').mockResolvedValue(result);

      expect(controller.createMovie(createMovieDto)).toBe(result);
    });
  });

  describe('updateMovie', () => {
    it('should update a movie', () => {
      const id = '1';
      const updateMovieDto: CreateMovieDto = {
        title: 'Updated Test Movie',
        // Add other properties as needed
      };
      const result = { id: '1', title: 'Updated Test Movie' };
      jest.spyOn(service, 'updateMovie').mockResolvedValue(result);

      expect(controller.updateMovie(id, updateMovieDto)).toBe(result);
    });
  });

  describe('deleteMovie', () => {
    it('should delete a movie', () => {
      const id = '1';
      const result = { id: '1', title: 'Test Movie' };
      jest.spyOn(service, 'deleteMovie').mockResolvedValue(result);

      expect(controller.deleteMovie(id)).toBe(result);
    });
  });*/
});