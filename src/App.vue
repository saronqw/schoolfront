<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      :disable-resize-watcher="true"
      :disable-route-watcher="true"
    >
      <LeftSideBar :bar_items="bar_items" />
    </v-navigation-drawer>

    <v-app-bar app color="blue darken-3" dark>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="d-flex d-md-none"
      ></v-app-bar-nav-icon>

      <v-toolbar-title style="position: relative; top: 3px;"
        ><router-link to="/" style="text-decoration: none; color: #fff;"
          ><v-icon style="top: -2px;" large>mdi-school-outline</v-icon
          ><span style="margin-left: 10px;">Школа №93</span></router-link
        ></v-toolbar-title
      >
      <div class="d-none d-md-flex">
        <v-btn text class="ms-md-4" to="/" active-class="no-active">
          {{ bar_items.main.name }}
        </v-btn>
        <DropdownButton :items="bar_items.information" />
        <DropdownButton :items="bar_items.details" />
        <v-btn text active-class="no-active" to="/timetable">
          {{ bar_items.timetable.name }}
        </v-btn>
      </div>
      <v-spacer></v-spacer>
      <v-btn
        text
        :to="isLoggedIn ? '/profile' : '/login'"
        active-class="no-active"
      >
        <!--        :to="isLoggedIn ? '/profile/' + username() : '/login'"-->
        <span v-if="isLoggedIn" class="d-none d-md-flex">{{ username() }}</span>
        <span v-else class="d-none d-md-flex">Личный кабинет</span>
        <v-avatar>
          <v-icon large>mdi-briefcase-account-outline</v-icon>
        </v-avatar>
      </v-btn>
      <v-btn
        @click.prevent="logout"
        text
        to="/logout"
        active-class="no-active"
        v-if="isLoggedIn"
      >
        <span class="d-none d-md-flex">Выйти</span>
        <v-icon style="margin-left: 3px; font-size: 30px;">mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <div>
        <div v-if="this.$route.path === '/'">
          <v-carousel hide-delimiter-background height="450" cycle>
            <v-carousel-item
              v-for="(image, i) in images"
              :key="i"
              :src="image.src"
              reverse-transition="fade-transition"
            ></v-carousel-item>
          </v-carousel>
        </div>

        <!-- <v-container class="mt-5" v-if="this.$route.path == '/'"> -->
        <v-container
          class="mt-5"
          v-if="
            /\/profile/.exec(this.$route.path) ||
              /\/timetable/.exec(this.$route.path)
          "
        >
          <!--          v-if="/\/profile\/\w+/.exec(this.$route.path)"-->
          <v-row no-gutters>
            <v-col cols="12">
              <transition name="fade" mode="out-in"
                ><router-view></router-view
              ></transition>
            </v-col>
          </v-row>
        </v-container>

        <v-container class="mt-5" v-else>
          <v-row no-gutters>
            <v-col xs="12" md="8">
              <transition name="fade" mode="out-in"
                ><router-view></router-view
              ></transition>
            </v-col>
            <v-col class="ml-md-4" cols="12" md>
              <UsefulInfo />
            </v-col>
          </v-row>
        </v-container>

        <v-fab-transition>
          <v-btn
            :elevation="12"
            v-scroll="onScroll"
            v-show="scroll_btn.fab_on"
            fab
            dark
            fixed
            bottom
            right
            :color="scroll_btn.color"
            @click="scrollTop"
            ><v-icon large>{{ scroll_btn.icon }}</v-icon>
          </v-btn>
        </v-fab-transition>
      </div>
    </v-main>

    <v-footer color="blue-grey darken-4" dark padless>
      <Footer />
    </v-footer>
  </v-app>
</template>

<script>
import UsefulInfo from "@/components/App/UsefulInfo.vue";
import Footer from "@/components/App/Footer.vue";
import DropdownButton from "@/components/App/DropdownButton.vue";
import LeftSideBar from "@/components/App/LeftSideBar.vue";

export default {
  name: "App",
  components: {
    UsefulInfo,
    Footer,
    LeftSideBar,
    DropdownButton
  },
  props: {
    source: String
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  },
  // watch: {
  //   input: function() {
  //     if (
  //       isLocalStorage() /* function to detect if localstorage is supported*/
  //     ) {
  //       localStorage.setItem("storedData", this.input);
  //     }
  //   }
  // },
  data: () => ({
    scroll_btn: {
      fab_on: false,
      color: "blue accent-3",
      icon: "mdi-arrow-up"
    },
    drawer: false,
    bar_items: {
      main: {
        name: "Главная"
      },
      information: {
        name: "Сведения о СОШ",
        points: [
          {
            title: "Вакантные места",
            url: "url"
          },
          {
            title: "Документы",
            url: "url"
          },
          {
            title:
              "Материально-техническое обеспечение. Электронные образовательные ресурсы",
            url: "url"
          },
          {
            title: "Основные сведения",
            url: "url"
          },
          {
            title: "Образование",
            url: "url"
          },
          {
            title: "Образовательные стандарты",
            url: "url"
          },
          {
            title: "Педагоги",
            url: "url"
          },
          {
            title: "Платные образовательные услуги",
            url: "url"
          },
          {
            title: "Руководство",
            url: "url"
          },
          {
            title: "Структура и органы управления",
            url: "url"
          },
          {
            title: "Стипендия и другие виды материальной поддержки",
            url: "url"
          },
          {
            title: "Финансово-хозяйственная деятельность",
            url: "url"
          }
        ]
      },
      details: {
        name: "Школа в деталях",
        points: [
          {
            title: "Наши призёры",
            url: "url"
          },
          {
            title: "Научные общества",
            url: "url"
          },
          {
            title: "Новости",
            url: "url"
          },
          {
            title: "Сотрудничество с вузами",
            url: "url"
          },
          {
            title: "Воспитательное пространство",
            url: "url"
          },
          {
            title: 'Музей "Сибирское наследие"',
            url: "url"
          },
          {
            title: "Страница психолога",
            url: "url"
          },
          {
            title: "ГТО",
            url: "url"
          },
          {
            title: "Библиотека",
            url: "url"
          },
          {
            title: "Питание",
            url: "url"
          }
        ]
      },
      timetable: {
        name: "Расписание"
      }
    },
    images: [
      {
        src: "https://picsum.photos/1920/500.jpg?random=1"
      },
      {
        src: "https://picsum.photos/1920/500.jpg?random=2"
      },
      {
        src: "https://picsum.photos/1920/500.jpg?random=3"
      },
      {
        src: "https://picsum.photos/1920/500.jpg?random=4"
      }
    ]
  }),
  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.scroll_btn.fab_on = top > 300;
    },
    scrollTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    },
    username() {
      return localStorage.getItem("username");
    },
    logout: function() {
      this.$store.dispatch("logout").catch(err => console.log(err));
    }
  }
};
</script>

<style lang="scss">
// html {
//   scroll-behavior: smooth;
// }

h1,
h2,
h3,
h4,
h5,
h6 {
  color: #2d62b7;
}

a {
  text-decoration: none;
  color: #2d62b7;
}

hr {
  display: block;
  position: relative;
  padding: 0;
  margin: 8px auto;
  height: 0;
  width: 100%;
  max-height: 0;
  font-size: 1px;
  line-height: 0;
  clear: both;
  border: none;
  border-top: 2px solid #2d62b7;
}

.v-btn--active.no-active::before {
  opacity: 0 !important;
}

.left-span {
  margin-left: 30px;
}

.scrollBtn {
  bottom: 0;
  position: absolute;
  margin: 0 0 16px 16px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
@import "scss/variables.scss";
</style>
