import { Url } from '../models/Url';
import { BaseRepository } from './BaseRepository';

export interface UrlRepository extends BaseRepository<Url> {
  getByShortenedUrl(shortenedUrl: string): Promise<Url | null>;
}
