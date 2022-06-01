import Movie from '@/models/Movie'

export default interface Video {
  id: string,
  season: number,
  title: string,
  fileUri: string,
  duration: string,
  description: string,
  movieDetails: Movie
}
