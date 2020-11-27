<template>
  <v-container fluid class="footer-container">
    <v-row align-content="center" justify="center">
      <v-col cols="12" md="6" lg="6">
        <p>
          <v-icon size="19.2" style="position: relative; top: -1px;"
            >mdi-phone</v-icon
          >
          <a class="phone" href="tel:+73842746560"> +7 (3842) 74-65-60</a>
          - приёмная
        </p>
        <p>
          <v-icon size="19.2" style="position: relative; top: -1px;"
            >mdi-phone</v-icon
          >
          <a class="phone" href="tel:+73842746559"> +7 (3842) 74-65-59</a> -
          заместитель директора
        </p>
        <p>
          <v-icon size="19.2" style="position: relative; top: -1px;"
            >mdi-email</v-icon
          >
          <a href="mailto:school93@mail.ru"> school93@mail.ru</a> - почта
        </p>
        <p>
          <v-icon size="19.2" style="position: relative; top: -1px;"
            >mdi-instagram</v-icon
          >
          <a
            target="_blank"
            href="https://www.instagram.com/school93_kem/?hl=ru"
          >
            school93_kem</a
          >
          - Instagram
        </p>
      </v-col>
      <v-col>
        <p>
          <v-icon size="19.2" style="position: relative; top: -1px;"
            >mdi-map-marker</v-icon
          >
          <a
            href="https://2gis.ru/kemerovo/geo/704323096938575?queryState=center%2F86.187472%2C55.340554%2Fzoom%2F17"
          >
            г. Кемерово, пр. Ленинградский, 34Б (индекс 650003)</a
          >
        </p>
        <p>
          <v-icon size="19.2" style="position: relative; top: -1px;"
            >mdi-link-variant</v-icon
          ><a href="#"> Электронный журнал</a>
        </p>
        <p>
          <v-icon size="19.2" style="position: relative; top: -1px;"
            >mdi-link-variant</v-icon
          ><a href="#"> Карта сайта</a>
        </p>
        <p>
          <v-icon size="19.2" style="position: relative; top: -1px;"
            >mdi-link-variant</v-icon
          ><a href="#"> Авторы</a>
        </p>
      </v-col>
    </v-row>
    <v-row
      align-content="center"
      justify="center"
      class="footer-bottom text-center"
    >
      <v-col cols="12">
        <span> © {{ new Date().getFullYear() }} МАОУ СОШ №93 г.Кемерово </span>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.footer-container {
  padding-bottom: 0 !important;
}

.footer-bottom {
  background-color: #1e282e !important;
}
</style>
