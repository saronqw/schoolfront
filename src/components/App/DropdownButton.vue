<template>
  <v-menu offset-y class="text-wrap">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text v-bind="attrs" v-on="on">{{ items.name }}</v-btn>
    </template>
    <v-list max-width="300px">
      <v-list-item
        v-for="(item, index) in items.points"
        :key="index"
        :to="'/' + item.title"
        active-class="menu-active"
      >
        <v-list-item-title>{{ item.title }} </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  props: {
    items: Object
  }
};
</script>

<style lang="scss" scoped>
.v-list-item__title {
  white-space: normal;
  padding: 0 0;
}

.v-list-item--link {
  min-height: 0;
  padding: 10px 16px;
}

.theme--dark.v-btn:focus::before {
  opacity: 0;
}

// .theme--dark.v-btn:hover::before {
//   opacity: 0.08;
// }
</style>
