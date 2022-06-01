import Movie from '@/models/Movie'
import CastRole from '@/models/CastRole'
import Person from '@/models/Person'

export default interface CastInMovie {
  id: string,
  castRole: CastRole,
  person: Person,
  movieDetails: Movie
}
