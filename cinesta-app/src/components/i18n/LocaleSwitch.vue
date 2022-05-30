<template>
  <select class="select" v-model="language" v-on:change="handleChange()">
    <option value="en-GB">English</option>
    <option value="et-EE">Eesti</option>
    <option value="ru-RU">Русский</option>
  </select>
</template>

<script lang="ts">import { defineComponent } from "vue";

export default defineComponent({
    name: "LocaleSwitch",
    data() {
        const language = localStorage.getItem("lang") || "en-GB";
        return {
            language: language
        }
    },
    methods: {
        handleChange() {
            localStorage.setItem("lang", this.language)
            this.$i18n.locale = localStorage.getItem("lang") || "en-GB";

            if (this.$route.name === "") {
                this.$router.go(0)
            }
        }
    }
})
</script>
