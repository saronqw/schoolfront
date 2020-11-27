<template>
  <div class="mb-4">
    <h2 class="mb-4">{{ title }}</h2>
    <p v-text="text" />
    <v-img eager :src="photo" contain></v-img>
    <v-btn class="mt-4" text to="/" color="primary" style="padding: 2px;"
      ><v-icon>mdi-arrow-left</v-icon
      ><span style="margin-left: 5px;">Главная страница</span></v-btn
    >
  </div>
</template>

<script>
export default {
  name: "NewsItem",
  data: function() {
    return {
      id: Math.ceil(Math.random(20)),
      title: "",
      text: "",
      photo: ""
    };
  },
  mounted() {
    this.axios
      .get("/news/" + this.$route.params.id + "?format=json")
      .then(
        response => (
          (this.title = response.data.title),
          (this.text = response.data.text),
          (this.photo = response.data.images[0].photo)
        )
      )
      .catch(error => console.log(error));
  }
};
</script>
