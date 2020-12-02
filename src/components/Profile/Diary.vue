<template>
  <div>
    <div class="leaflet">
      <v-icon large left @click="previousWeek">mdi-arrow-left</v-icon>
      {{ from }} <v-icon large>mdi-hand-peace</v-icon> {{ to() }}
      <v-icon large right @click="nextWeek">mdi-arrow-right</v-icon>
    </div>
    <div class="diary" v-if="showDiary">
      <div v-for="item in diary" :key="item.weekday" class="child">
        <h2 style="text-align: center;">
          {{ item.weekday }}, {{ moment(item.date).format("D") }}
        </h2>
        <table>
          <thead>
            <tr>
              <th>Дисциплина</th>
              <th>Оценка</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="grade in item.grades" :key="grade.discipline">
              <th>{{ grade.discipline }}</th>
              <th>{{ grade.grade }}</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      offset: 0,
      showDiary: false,
      diary: [
        {
          weekday: null,
          date: null,
          grades: [{ discipline: null, grade: null }]
        }
      ],
      from: this.moment()
        .startOf("week")
        .format("D MMMM"),
      calcFrom: this.moment().startOf("week")
    };
  },
  methods: {
    previousWeek() {
      this.offset -= 7;
      this.calcFrom.subtract(1, "week");
      let tempFrom = this.calcFrom;
      this.from = tempFrom.format("D MMMM");
      this.diaryGrades();
    },
    nextWeek() {
      this.offset += 7;
      this.calcFrom.add(1, "week");
      let tempFrom = this.calcFrom;
      this.from = tempFrom.format("D MMMM");
      this.diaryGrades();
    },
    diaryGrades() {
      this.axios({
        method: "get",
        url: "/diary_grades/",
        params: {
          offset: this.offset
        }
      })
        .then(response => {
          this.diary = response.data.diary;
          this.showDiary = true;
        })
        .catch(error => console.log(error));
    },
    to() {
      let to = this.moment(this.calcFrom);
      to = to.endOf("week").format("D MMMM");
      return to;
    }
  },
  beforeMount() {
    this.diaryGrades();
  }
};
</script>

<style scoped>
div.diary {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

table {
  /*width: 200px;*/
  width: 26%;
  min-width: 250px;
  border-collapse: collapse;
  border-spacing: 0;
  border: 2px solid white;
}

table th {
  border: #1e282e solid 1px;
}

div .child {
  padding: 20px;
}

.leaflet {
  text-align: center;
}
</style>
