import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { MoviesService } from './movies.service';
import { getModelToken } from '@nestjs/mongoose';
import { Movie } from './schemas/movie.schema';
//import { of } from 'rxjs';

const mockMovie = {
  id: 1,
  title: 'Test Movie',
  overview: 'This is a test movie used for unit testing.',
  popularity: 8.5,
  vote_average: 4.7,
  vote_count: 100,
  release_date: '2021-01-01',
  genre_ids: ['12', '14'],
};
const createdMovie = {
  ...mockMovie,
  _id: "65cdbf6b262be0d04e47b4e1",
  __v: 0
};
const updatedMovie = {
  ...createdMovie,
  title: 'Updated Test Movie',
};

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getModelToken(Movie.name),
          useValue: {
            find: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue([mockMovie]),
            }),
            findById: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue(mockMovie),
            }),
            create: jest.fn().mockResolvedValue(createdMovie),
            findByIdAndDelete: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue(createdMovie),
            }),
            findByIdAndUpdate: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue(updatedMovie),
            }),
          },
        },
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  // service should be defined
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // get movies test
  it('should return all movies', async () => {
    const movies = await service.getMovies();
    expect(movies).toEqual([mockMovie]);
  });

  // get movie by id test
  it('should return a movie by id', async () => {
    const movie = await service.getMovieById('1');
    expect(movie).toEqual(mockMovie);
  });

  // create movie test

  describe('createMovie', () => {
    it('should create and return a movie', async () => {
      const createdMovie = await service.createMovie(mockMovie);
      expect(createdMovie).toEqual(createdMovie);
      expect(service['movieModel'].create).toHaveBeenCalledWith(mockMovie);
    });
  });

  // delete movie test

  describe('deleteMovie', () => {
    it('should delete a movie and return the deleted movie', async () => {
      const result = await service.deleteMovie(createdMovie._id);
      expect(result).toEqual(createdMovie);
      expect(service['movieModel'].findByIdAndDelete).toHaveBeenCalledWith(createdMovie._id);
    });
  });

  // update movie test
  describe('updateMovie', () => {
    it('should update a movie and return the updated movie', async () => {
      const result = await service.updateMovie(createdMovie._id, mockMovie);
      expect(result).toEqual(updatedMovie);
      expect(service['movieModel'].findByIdAndUpdate).toHaveBeenCalledWith(createdMovie._id, mockMovie, { new: true });
    });
  });

});