<template>
  <div>
    <p>NO VIDEO SERVICE BUY A SERVER!</p>
    <iframe src="https://onedrive.live.com/embed?cid=4EDF9BA27FE109FD&resid=4EDF9BA27FE109FD%21797590&authkey=AGLqGl54uqj2AW0" width="320" height="136" frameborder="0" scrolling="no" allowfullscreen></iframe>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useI18n } from 'vue-i18n'
import MovieServices from '@/services/MovieServices'
import VideoServices from '@/services/VideoServices'

export default defineComponent({
  name: 'TheatreView',
  data() {
    const { t } = useI18n()
    return {
      t,
      video: '' as string,
      movieId: '' as string,
    }
  },
  methods: {
    getMovieData() {
      const movieLocal = MovieServices.GetMovie()
      this.movieId = movieLocal.id
    },
    async getVideo () {
      const videos = await VideoServices.GetVideos()
      for (let i = 0; i < videos.length; i++) {
        if (videos[i].movieDetails.id === this.movieId) {
          this.video = videos[i].fileUri
        }
      }
      console.log(this.video)
    }
  },
  async beforeMount () {
    this.getMovieData()
    await this.getVideo()
  }
})
</script>

<style scoped>

</style>
