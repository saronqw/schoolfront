<template>
  <div>
    <Contacts />
    <ListNewsItem />
  </div>
</template>

<script>
import ListNewsItem from "@/components/Home/ListNewsItem.vue";
import Contacts from "@/components/Home/Contacts.vue";

export default {
  name: "Home",
  components: {
    ListNewsItem,
    Contacts
  }
};
</script>
