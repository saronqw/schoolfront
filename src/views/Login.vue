<template>
  <div>
    <h1>Авторизация</h1>
    <br />
    <v-row>
      <v-col cols="12" sm="6">
        <v-form ref="form" lazy-validation v-model="valid">
          <v-text-field
            v-model="username"
            label="Логин"
            type="text"
            @keyup.enter="login"
            :rules="loginRules"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Пароль"
            type="password"
            required
            @keyup.enter="login"
            :rules="passwordRules"
          ></v-text-field>
          <v-alert type="error" v-if="error" dense outlined>
            Неверный логин или пароль
          </v-alert>
          <v-row>
            <v-spacer></v-spacer>
            <v-btn class="mr-4" @click="validate" color="primary">
              Войти
            </v-btn>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: false,
      username: null,
      password: null,
      valid: false,
      loginRules: [v => !!v || "Обязательное поле"],
      passwordRules: [v => !!v || "Обязательное поле"]
    };
  },
  methods: {
    login: function() {
      let username = this.username;
      let password = this.password;
      this.$store
        .dispatch("login", { username, password })
        .then(() => this.$router.push("/"))
        .catch(err => {
          console.log(err);
          this.error = true;
        });
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.login();
      }
    }
  }
};
</script>
