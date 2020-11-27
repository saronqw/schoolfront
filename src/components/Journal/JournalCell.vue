<template>
  <div>
    <label>
      <input type="text" @focusout="orr" v-model="grade" />
    </label>
  </div>
</template>

<script>
export default {
  name: "JournalCell",
  props: {
    course: String,
    discipline: String,
    date: String,
    grade: Number,
    username: String
  },
  methods: {
    orr() {
      // if
      this.axios({
        method: "put",
        url: "/update_grade/",
        params: {
          grade: this.grade,
          date_grading: this.date,
          discipline: this.discipline,
          username: this.username,
          course_level: this.course.match(/\d+/)[0],
          course_level_letter: this.course.match(/\W/)[0]
        }
      }).catch(error => console.log(error));
    }
  }
};
</script>

<style scoped>
input {
  width: 100%;
  text-align: center;
  border: none;
  outline: none;
}
</style>
