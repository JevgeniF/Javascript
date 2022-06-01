import Movie from '@/models/Movie'
import Genre from '@/models/Genre'

export default interface MovieGenre {
  id: string,
  movieDetails: Movie,
  genre: Genre
}
