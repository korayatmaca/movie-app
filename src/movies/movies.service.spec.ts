/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { getModelToken } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { CreateMovieDto } from '../movies/dto/create-movie.dto';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpService: HttpService;

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

  const mockSave = jest.fn();
  const mockMovieModel = function() {
    this.save = mockSave;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getModelToken('Movie'),
          useValue: mockMovieModel,
        },
        {
          provide: HttpService,
          useValue: {
            get: jest.fn().mockImplementation(() => of({ data: {} })),
          },
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createMovie', () => {
    it('should create a movie', async () => {
      mockSave.mockResolvedValue(mockMovie);

      expect(await service.createMovie(mockMovie)).toBe(mockMovie);
      expect(mockSave).toHaveBeenCalled();
    });

    it('should throw an error if something goes wrong', async () => {
      mockSave.mockRejectedValue(new Error());

      await expect(service.createMovie(mockMovie)).rejects.toThrow();
      expect(mockSave).toHaveBeenCalled();
    });
  });

  // Add more tests here
});