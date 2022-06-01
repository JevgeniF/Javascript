<template>
  <v-row class="text-center" v-if="movies.length === 1">
    <v-col cols="12">
    </v-col>
    <v-col class="mb-4">
      <h2 class="display-2 font-weight-bold mb-3">
        {{t ('Sorry, we don\'t have movies for your age.') }}
      </h2>
      <p>{{ t('Please check later.')}}</p>
    </v-col>
  </v-row>
  <div v-else>
    <v-row class="text-center">
      <v-col cols="12">
      </v-col>
      <v-col class="mb-4">
        <h2 class="display-2 font-weight-bold mb-3">
          {{t ('What we gonna watch today?') }}
        </h2>
      </v-col>
    </v-row>
    <div v-for="(genre) in this.genres" :key="genre.id" v-bind:value="genre.id">
      <div>
    <v-row class="text-center">
      <v-col cols="12">
      </v-col>
      <v-col class="mb-4">
        <h2 class="display-2 font-weight-bold mb-3">{{genre.naming.toUpperCase()}}
        </h2>
      </v-col>
    </v-row>
      </div>
      <div v-for="(movie) in this.movies" :key="movie.id" v-bind:value="movie.id">
        <div v-if="movie.genre === genre">
          <v-row>
            <v-card @click="goToMovieDetails(movie)"
              class="mx-auto"
              min-width="300"
            >
              <v-img
                     :src="movie.posterUri"
                     height="200px"
              ></v-img>

              <v-card-title>
                {{movie.title}}
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useI18n } from 'vue-i18n'
import MovieServices from "@/services/MovieServices"
import ProfileServices from "@/services/ProfileServices"
import Movie from "@/models/Movie"
import Genre from '@/models/Genre'
import router from '@/router'

export default defineComponent({
  name: 'ProfileMoviesView',
  data() {
    const { t } = useI18n()
    return {
      t,
      movies: [] as Movie[],
      genres: [] as Genre[]
    }
  },
  methods: {
    goToMovieDetails(movie: Movie) {
      MovieServices.SaveMovie(movie)
      router.push('/movie-details')
    },
    async getMovies() {
      const profile = ProfileServices.GetProfile()
      const profileMovies = await MovieServices.GetMoviesForProfile(profile.id)
      for (let i = 0; i < profileMovies.length; i++) {
        this.movies.push(profileMovies[i].movieDetails)
        this.genres.push(profileMovies[i].movieDetails.genre)
      }
    },
    getGenres() {
      for (let i = 0; i < this.movies.length; i++) {
        if (!this.genres.includes(this.movies[i].genre)) {
          this.genres.push(this.movies[i].genre)
        }
      }
    }
  },
  async beforeMount () {
    await this.getMovies()
    await this.getGenres()
  }
})
</script>

<style scoped>

</style>
