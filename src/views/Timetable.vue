<template>
  <div>
    <h1>Расписание</h1>
    <v-row
      ><v-col cols="4">
        <h3>Класс</h3>
        <v-select
          label="Выберите класс"
          v-model="selectedCourse"
          :items="courses"
          @change="getTimetable"
        ></v-select>
      </v-col>

      <v-col cols="4">
        <h3>Литера</h3>
        <v-select
          label="Выберите литеру"
          v-model="selectedLetter"
          :items="letters"
          @change="getTimetable"
        ></v-select> </v-col
    ></v-row>
    <div class="diary">
      <div v-for="item in timetable" :key="item" class="child">
        <div style="width: auto">
          <h2 style="margin-bottom: 20px;">{{ item.weekday }}</h2>
          <p
            style="line-height: 1em"
            v-for="discipline in item.disciplines"
            :key="discipline"
          >
            {{ discipline.time }} {{ discipline.discipline }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Timetable",
  data: function() {
    return {
      courses: [],
      selectedCourse: null,
      letters: [],
      selectedLetter: null,
      timetable: []
    };
  },
  methods: {
    startPage(axios) {
      return axios
        .get("/get_courses/")
        .then(response => {
          console.log(response);
          let temp_courses_level = [];
          let temp_courses_letter = [];
          for (const discipline of response.data) {
            temp_courses_level.push(discipline["level"]);
            temp_courses_letter.push(discipline["level_letter"]);
          }
          this.courses = temp_courses_level;
          this.letters = temp_courses_letter;
          this.selectedCourse = temp_courses_level[0];
          this.selectedLetter = temp_courses_letter[0];
          this.getTimetable();
        })
        .catch(error => console.log(error));
    },
    getTimetable() {
      this.axios({
        method: "get",
        url: "/get_timetable/",
        params: {
          course_level: this.selectedCourse,
          course_level_letter: this.selectedLetter
        }
      })
        .then(response => {
          this.timetable = response.data;
        })
        .catch(error => console.log(error));
    }
  },
  beforeMount() {
    this.startPage(this.axios);
  }
};
</script>

<style scoped>
div.diary {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

div .child {
  /*margin-bottom: 30px;*/
  width: 26%;
  min-width: 200px;
  padding: 20px;
}
</style>
