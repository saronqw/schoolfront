<template>
  <div>
    <h2 id="#news-link">Новости</h2>
    <hr class="mb-4" />
    <div class="mb-6">
      <div v-for="item in news" :key="item.id">
        <NewsItem
          :id="item.id"
          :title="item.title"
          :text="item.text"
          :url="item.thumbnail"
          :photo="item.images[0]"
        />
      </div>
      <v-pagination
        v-model="page"
        :length="pages"
        :total-visible="totalVisible"
        @input="next"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import NewsItem from "@/components/Home/NewsItem.vue";
export default {
  name: "ListNewsItem",
  components: {
    NewsItem
  },
  data: function() {
    return {
      nextIcons: ["mdi-chevron-right", "mdi-arrow-right", "mdi-menu-right"],
      prevIcons: ["mdi-chevron-left", "mdi-arrow-left", "mdi-menu-left"],
      page: 1,
      totalVisible: 7,
      news: null,
      pages: null
    };
  },
  computed: {
    length: function() {
      return this.pages;
    }
  },
  methods: {
    get_news() {
      const count = 5;

      this.axios
        .get(
          "/news/?format=json&limit=" +
            count +
            "&offset=" +
            count * (this.page - 1)
        )
        .then(
          response => (
            (this.news = response.data.results),
            (this.pages = Math.ceil(response.data.count / 5))
          )
        )
        .catch(error => console.log(error));
    },
    next() {
      this.get_news();

      let element = document.getElementById("#news-link");
      let bodyRect = document.body.getBoundingClientRect(),
        elemRect = element.getBoundingClientRect(),
        offset = elemRect.top - bodyRect.top;
      console.log(offset);

      setTimeout(() => {
        window.scrollTo({
          top: offset - 85,
          left: 0,
          behavior: "smooth"
        });
      }, 250);
    }
  },
  mounted() {
    this.get_news();
  }
};
</script>
