<template>
  <div>
    <h1>Личный кабинет: {{ user.last_name }} {{ user.first_name }}</h1>
    <br />
    <v-tabs v-model="tab" background-color="white" color="blue darken-3">
      <v-tabs-slider></v-tabs-slider>

      <v-tab key="profile" :href="'#tab-profile'">
        <v-icon left>mdi-account</v-icon>
        <span>Профиль</span>
      </v-tab>

      <v-tab
        key="journal"
        :href="'#tab-journal'"
        v-if="user.group === 'teacher'"
      >
        <v-icon left>mdi-book</v-icon>
        <span>Журнал</span>
      </v-tab>

      <v-tab
        key="dnevnik"
        :href="'#tab-dnevnik'"
        v-if="user.group === 'student'"
      >
        <v-icon left>mdi-book</v-icon>
        <span>Дневник</span>
      </v-tab>

      <v-tab
        key="children"
        :href="'#tab-children'"
        v-if="user.group === 'parent'"
      >
        <v-icon left>mdi-human-male-child</v-icon>
        <span>Дети</span>
      </v-tab>

      <v-tab-item key="profile" :value="'tab-' + 'profile'">
        <v-card flat tile>
          <v-col cols="12" sm="4">
            <br />
            <h2>Основная информация</h2>
            <br />
            <p>Фамилия: {{ user.last_name }}</p>
            <p>Имя: {{ user.first_name }}</p>
            <p v-if="user.group === 'student'">Класс: {{ user.course }}</p>
            <p v-if="user.group === 'student'">
              Год выпуска: {{ user.admission_year }}
            </p>
          </v-col>
        </v-card>
      </v-tab-item>

      <v-tab-item
        key="journal"
        :value="'tab-' + 'journal'"
        v-if="user.group === 'teacher'"
      >
        <v-card flat tile>
          <br />
          <Journal />
        </v-card>
      </v-tab-item>

      <v-tab-item
        key="dnevnik"
        :value="'tab-' + 'dnevnik'"
        v-if="user.group === 'student'"
      >
        <v-card flat tile>
          <v-col cols="12">
            <Diary />
          </v-col>
        </v-card>
      </v-tab-item>

      <v-tab-item
        key="children"
        :value="'tab-' + 'children'"
        v-if="user.group === 'parent'"
      >
        <v-card flat tile>
          <v-col cols="12">
            <Children />
          </v-col>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import Children from "@/components/Profile/Children.vue";
import Journal from "@/components/Profile/Journal.vue";
import Diary from "@/components/Profile/Diary.vue";

export default {
  components: {
    Journal,
    Diary,
    Children
  },
  data() {
    return {
      tab: null,
      user: {
        last_name: null,
        first_name: null
      }
    };
  },
  methods: {
    profile(username) {
      this.axios
        .get("/profile/" + username + "/")
        .then(response => (this.user = response.data));
    },
    username() {
      return localStorage.getItem("username");
    }
  },
  beforeMount() {
    const username = this.username();
    this.profile(username);
  }
  // beforeRouteEnter(to, from, next) {
  //   // this.user = this.profile(to.params.username);
  //   this.user = to.profile(to.params.username);
  //   next();
  // }
};
</script>
