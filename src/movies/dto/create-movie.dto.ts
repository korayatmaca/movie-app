import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({ description: 'The unique identifier of the movie.' })
  readonly id: string;

  @ApiProperty({ description: 'The title of the movie.' })
  readonly title: string;

  @ApiProperty({ description: 'The overview of the movie.' })
  readonly overview: string;

  @ApiProperty({ description: 'The popularity score of the movie.' })
  readonly popularity: number;

  @ApiProperty({ description: 'The average vote of the movie.' })
  readonly vote_average: number;

  @ApiProperty({ description: 'The vote count of the movie.' })
  readonly vote_count: number;

  @ApiProperty({ description: 'The release date of the movie.' })
  readonly release_date: string;

  @ApiProperty({ description: 'The genre IDs of the movie.' })
  readonly genre_ids: string[];
}