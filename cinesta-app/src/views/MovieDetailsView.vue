<template>
<div>
  <v-row>
    <v-col cols="12" md="6">
      <v-card
              class="mx-auto"
              min-width="300"
      ><v-img
        :src="posterUri"
        height="500px"
      ></v-img>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card
        class="mx-auto"
        min-width="300"
      >
        <v-card-title>{{title}}</v-card-title>
        <v-card-title>{{t('IMDB rating: ')}}{{score}}</v-card-title>
        <v-card-subtitle>{{description}}</v-card-subtitle>
        <v-card-text>{{t('Genre: ' )}}{{genre}}</v-card-text>
        <v-card-text>{{t('Released: ' )}}{{released}}</v-card-text>
        <div v-for="(role) in this.roles" :key="role.id" v-bind:value="role.id">
          <v-card-text>{{role}}: </v-card-text>
          <div v-for="(c) in this.cast" :key="c.id" v-bind:value="c.id">
          <v-card-subtitle v-if="c.castRole.naming === role">{{c.person.name}} {{c.person.surname}} </v-card-subtitle>
          </div>
          <v-spacer style="height: 10px"></v-spacer>
        </div>
        <v-card-text>{{t('Age rating: ' )}}{{ageRating}}</v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-btn @click="watch()">Watch</v-btn>
</div>
</template>

<script lang="ts">
import Movie from '@/models/Movie'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import MovieServices from '@/services/MovieServices'
import moment from 'moment'
import CastInMovie from '@/models/CastInMovie'
import router from '@/router'

export default defineComponent({
  name: 'MovieDetailsView',
  data() {
    const { t } = useI18n()
    return {
      t,
      movieId: '' as string,
      movies: [] as Movie[],
      posterUri: '' as string,
      title: '' as string,
      score: 0 as number,
      description: '' as string,
      released: '' as string,
      cast: [] as CastInMovie[],
      roles: [] as string[],
      genre: '' as string,
      ageRating: '' as string
    }
  },
  methods: {
    watch() {
      router.push('/theatre')
    },
    getMovieData() {
      const movieLocal = MovieServices.GetMovie()
      this.movieId = movieLocal.id
      this.posterUri = movieLocal.posterUri
      this.title = movieLocal.title
    },
    async getMovie() {
        const movie = await MovieServices.GetMovieById(this.movieId)
        this.description = movie.description
        const date = moment.utc(movie.released).local()
        this.released = moment(date).format('YYYY')
        this.genre = movie.genre.naming
      this.ageRating = movie.ageRating.naming
    },
    async getScore() {
      const movieScore = await MovieServices.GetMovieScore(this.movieId)
      this.score = movieScore.score
    },
    async getMovieCast() {
      this.cast = await MovieServices.GetMovieCast(this.movieId)
      console.log(this.cast)
    },
    getRoles() {
      for (let i = 0; i < this.cast.length; i++) {
        if (!this.roles.includes(this.cast[i].castRole.naming)) {
          this.roles.push(this.cast[i].castRole.naming)
        }
      }
    }
  },
  async beforeMount () {
    this.getMovieData()
    await this.getMovie()
    await this.getScore()
    await this.getMovieCast()
    this.getRoles()
  }
})
</script>

<style scoped>

</style>
