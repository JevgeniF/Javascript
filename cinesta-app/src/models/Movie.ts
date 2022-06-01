import AgeRating from '@/models/AgeRating'
import MovieType from '@/models/MovieType'
import Genre from '@/models/Genre'
import CastInMovie from '@/models/CastInMovie'
import MovieDbScore from '@/models/movieDbScore'

export default interface Movie {
  id: string,
  posterUri: string,
  title: string,
  released: string,
  description: string,
  cast: CastInMovie[]
  ageRating: AgeRating,
  movieType: MovieType
  genre: Genre
  score: MovieDbScore
}
