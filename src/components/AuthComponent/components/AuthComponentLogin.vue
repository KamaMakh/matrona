<template>
  <div class="auth-component-login">
    <v-card :elevation="6" class="mx-auto" max-width="344" outlined>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="form.login"
            :rules="rules"
            label="Логин"
            required
          ></v-text-field>

          <v-text-field
            v-model="form.password"
            :rules="rules"
            :type="'password'"
            label="Пароль"
            class="password"
            required
          ></v-text-field>

          <div class="text-center">
            <v-btn
              @click="login"
              :disabled="!valid"
              rounded
              class="form-btn"
              color="primary"
              :loading="loading"
            >
              ВХОД
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "AuthComponentLogin",
  data() {
    return {
      valid: true,
      form: {},
      rules: [v => !!v || "Required"],
      loading: false
    };
  },
  methods: {
    login() {
      if (!this.$refs.form.validate()) {
        this.loading = false;
        return;
      }
      //пока бэк не готов
      // this.$store
      //   .dispatch("user/login", {
      //     login: this.form.login,
      //     password: this.form.password,
      //   })
      //   .then(() => {
      //     this.$router.push({ name: "MainComponent" });
      //   })
      //   .catch(() => {
      //     // console.log(error);
      //   })
      //   .finally(() => {
      //     this.loading = false;
      //   });
    }
  }
};
</script>

<style scoped lang="scss"></style>
