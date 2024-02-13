import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  title: string;

  @Prop()
  overview: string;

  @Prop()
  popularity: number;

  @Prop()
  vote_average: number;

  @Prop()
  vote_count: number;

  @Prop()
  release_date: string;

  @Prop([String])
  genre_ids: string[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
