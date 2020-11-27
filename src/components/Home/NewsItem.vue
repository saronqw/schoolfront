<template>
  <div class="mb-4">
    <v-row no-gutters class=" mb-6">
      <v-col xs="12" md="3" class="mr-4 pt-1">
        <v-img eager :src="url" max-height="225" contain></v-img>
      </v-col>
      <v-col>
        <h4 class="mt-4 mt-sm-0">
          <router-link :to="'news/' + id">{{ title }}</router-link>
        </h4>
        <p>{{ text }}</p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "NewsItem",
  props: {
    id: Number,
    title: String,
    text: String,
    url: String
  }
};
</script>
