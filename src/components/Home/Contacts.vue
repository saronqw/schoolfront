<template>
  <div class="mb-10">
    <h2>Контакты и адрес</h2>
    <hr class="mb-4" />
    <v-row>
      <v-col cols="lg-3" v-show="!without_image">
        <v-img eager src="@/assets/email.png" max-height="225" contain></v-img>
      </v-col>
      <v-col>
        <h3>Связаться с нами</h3>
        <p>
          Адрес школы:
          <a
            href="https://2gis.ru/kemerovo/geo/704323096938575?queryState=center%2F86.187472%2C55.340554%2Fzoom%2F17"
            >г. Кемерово, пр. Ленинградский, 34Б (индекс 650003)</a
          >
        </p>
        <p>
          <a class="phone" href="tel:+73842746560">+7 (3842) 74-65-60</a> -
          приёмная
        </p>
        <p>
          <a class="phone" href="tel:+73842746559">+7 (3842) 74-65-59</a> -
          заместитель директора
        </p>
        <p><a href="mailto:school93@mail.ru">school93@mail.ru</a> - почта</p>
        <p>
          <a
            target="_blank"
            href="https://www.instagram.com/school93_kem/?hl=ru"
            >school93_kem</a
          >
          - Instagram
        </p></v-col
      >
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    without_image: Boolean
  },
  data: function() {
    return {
      // "without-image": true
    };
  }
};
</script>
