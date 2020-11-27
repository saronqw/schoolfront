<template>
  <div>
    <v-row>
      <v-col cols="4">
        <h3>Дисциплина</h3>
        <v-select
          :items="disciplines"
          label="Выберите дисциплину"
          v-model="selectedDiscipline"
          @change="changeDiscipline"
        ></v-select>
      </v-col>

      <v-col cols="4">
        <h3>Класс</h3>
        <v-select
          :items="courses"
          label="Выберите класс"
          v-model="selectedCourse"
          @change="changeCourse"
        ></v-select>
      </v-col>

      <v-col cols="4">
        <h3>Месяц</h3>
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="true"
          :return-value.sync="currentDate"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="currentDate"
              label="Выберите месяц"
              v-bind="attrs"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="currentDate"
            type="month"
            no-title
            scrollable
            @change="showGrades"
            @input="$refs.menu.save(currentDate)"
            locale="ru-ru"
          >
          </v-date-picker>
        </v-menu>
      </v-col>
    </v-row>

    <v-row>
      <table class="table_style" v-if="showTable">
        <thead>
          <tr>
            <th>ФИО ученика</th>
            <th v-for="date in journal.dates" :key="date">
              {{ createDate(date) }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in journal.students" :key="student.username">
            <th>{{ student.name }}</th>
            <th v-for="date in journal.dates" :key="date">
              <JournalCell
                :course="selectedCourse"
                :discipline="selectedDiscipline"
                :date="date"
                :username="student.username"
                :grade="getGrade(student, date)"
              />
              <!--              v-if="checkDate(student, date)"-->
            </th>
            <!--            <th v-for="grade in student.grades" :key="grade.grade">-->
            <!--              <JournalCell :grade="grade.grade" />-->
            <!--            </th>-->
          </tr>

          <!--          <th>-->
          <!--            {{ journal.students[0].grades[0].grade }}-->
          <!--          </th>-->
        </tbody>
      </table>
    </v-row>
  </div>
</template>

<script>
import JournalCell from "../Journal/JournalCell.vue";
export default {
  components: { JournalCell },
  data: () => ({
    showTable: false,
    disciplines: [],
    selectedDiscipline: null,
    selectedCourse: null,
    courses: [],
    currentDate: new Date().toISOString().substr(0, 7),
    menu: false,
    modal: false,
    journal: {
      dates: [],
      students: []
    }
  }),
  methods: {
    createDate: date => {
      const createdDate = new Date(date);
      return createdDate.getDate() + "." + (createdDate.getMonth() + 1);
    },
    getGrade: (student, date) => {
      for (const grade of student.grades) {
        if (grade["date"] === date) {
          return grade["grade"];
        }
      }
      return "";
    },
    disc(axios) {
      return axios
        .get("/disciplines_by_teacher/")
        .then(response => {
          let temp_disciplines = [];
          for (const discipline of response.data) {
            temp_disciplines.push(discipline["name"]);
          }
          this.disciplines = temp_disciplines;
          this.selectedDiscipline = temp_disciplines[0];
          this.getCoursesByDiscipline();
        })
        .catch(error => console.log(error));
    },
    getCoursesByDiscipline() {
      this.axios
        .get("/courses_by_discipline/?discipline=" + this.selectedDiscipline)
        .then(response => {
          let temp_courses = [];
          for (const course of response.data.courses) {
            temp_courses.push(course["level"] + course["level_letter"]);
          }
          this.courses = temp_courses;
          this.selectedCourse = temp_courses[0];
          this.showGrades();
        })
        .catch(error => console.log(error));
    },
    showGrades() {
      this.axios({
        method: "get",
        url: "/show_grades/",
        params: {
          course_level: this.selectedCourse.match(/\d+/)[0],
          course_level_letter: this.selectedCourse.match(/\W/)[0],
          discipline: this.selectedDiscipline,
          date: this.currentDate
        }
      })
        .then(response => {
          this.journal.dates = response.data.dates;
          this.journal.students = response.data.students;
          this.showTable = this.journal.students.length;
        })
        .catch(error => console.log(error));
    },
    changeDiscipline() {
      this.getCoursesByDiscipline();
      this.showGrades();
    },
    changeCourse() {
      this.getDisciplinesByCourse();
      this.showGrades();
    },
    getDisciplinesByCourse() {
      this.axios({
        method: "get",
        url: "/disciplines_by_course/",
        params: {
          course_level: this.selectedCourse.match(/\d+/)[0],
          course_level_letter: this.selectedCourse.match(/\W/)[0]
        }
      })
        .then(response => {
          let temp_disciplines = [];
          for (const discipline of response.data) {
            temp_disciplines.push(discipline["name"]);
          }
          this.disciplines = temp_disciplines;
          this.selectedDiscipline = temp_disciplines[0];
        })
        .catch(error => console.log(error));
    }
  },
  beforeMount() {
    this.disc(this.axios);
  }
};
</script>

<style scoped>
table.table_style {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  height: auto;
  margin-bottom: 50px;
  border: 2px solid white;
}

table.table_style th {
  border: 1px solid #707070;
  padding: 3px;
  height: 20px;
  text-align: center;
}

table.table_style th {
  line-height: 1;
  font-weight: normal;
}

table.table_style tbody tr th:first-child {
  /*text-align: left;*/
  width: auto;
}
</style>
