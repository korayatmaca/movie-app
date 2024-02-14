import { IsNumber, IsString, IsOptional } from 'class-validator';

export class DiscoverMoviesDto {
    @IsString()
    @IsOptional()
    sort_by?: string;

    @IsNumber()
    @IsOptional()
    vote_count_gte?: number;

    @IsNumber()
    @IsOptional()
    vote_average_gte?: number;

    @IsString()
    @IsOptional()
    with_watch_providers?: string;

    @IsString()
    @IsOptional()
    watch_region?: string;

    @IsNumber()
    @IsOptional()
    page?: number;

    // If needed, add more query parameters here
}