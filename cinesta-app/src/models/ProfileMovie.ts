import Movie from '@/models/Movie'

export default interface ProfileMovie {
  id: string,
  userProfileId: string,
  movieDetails: Movie
}
