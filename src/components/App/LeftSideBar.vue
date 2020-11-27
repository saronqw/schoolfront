<template>
  <v-list>
    <v-list-item link to="/">
      <v-list-item-action>
        <v-icon>mdi-home</v-icon>
      </v-list-item-action>

      <v-list-item-content>
        <v-list-item-title>Главная</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header hide-actions
          ><div>
            <v-icon>mdi-school</v-icon>
            <span class="left-span">{{ bar_items.information.name }}</span>
          </div></v-expansion-panel-header
        >
        <v-expansion-panel-content>
          <v-list>
            <v-list-item
              v-for="item in bar_items.information.points"
              :key="item.title"
              :to="item.title"
            >
              <v-list-item-title style="font-size: 15px">
                {{ item.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header hide-actions
          ><div>
            <v-icon>mdi-panda</v-icon>
            <span class="left-span">{{ bar_items.details.name }}</span>
          </div></v-expansion-panel-header
        >
        <v-expansion-panel-content>
          <v-list>
            <v-list-item
              v-for="item in bar_items.details.points"
              :key="item.title"
              :to="item.title"
            >
              <v-list-item-title style="font-size: 15px">
                {{ item.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-list-item link to="/timetable">
      <v-list-item-action>
        <v-icon>mdi-calendar</v-icon>
      </v-list-item-action>

      <v-list-item-content>
        <v-list-item-title>Расписание</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  props: {
    bar_items: Object
  }
};
</script>

<style lang="scss" scoped>
.v-expansion-panel::before {
  box-shadow: none !important;
}
</style>
