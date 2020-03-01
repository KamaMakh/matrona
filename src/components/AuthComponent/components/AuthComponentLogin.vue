<template>
  <div class="auth-component-login">
    <v-card :elevation="6" class="mx-auto" max-width="500" outlined>
      <v-card-text>
        <v-form
          @submit.prevent="login"
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            v-model="form.login"
            :rules="rules"
            label="Логин"
            required
            @keyup.enter="login"
          ></v-text-field>

          <v-text-field
            v-model="form.password"
            :rules="rules"
            :type="'password'"
            label="Пароль"
            class="password"
            required
            @keyup.enter="login"
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
import { mapState } from "vuex";
export default {
  name: "AuthComponentLogin",
  data() {
    return {
      valid: true,
      form: {},
      rules: [v => !!v || "Обязательно для заполнения"],
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
      let formData = new FormData();
      formData.append("email", this.form.login);
      formData.append("password", this.form.password);
      this.$store
        .dispatch("user/login", formData)
        .then(() => {
          this.$router.push({ name: "MainComponentNews" });
        })
        /* eslint-disable */
        .catch(error => {
          if (
            error.data &&
            error.data.error &&
            error.data.error.message
          ) {
            this.snackBar.value = true;
            this.snackBar.text = error.data.error.message;
            this.snackBar.color = "error";
          } else {
            this.snackBar.value = true;
            this.snackBar.text = "Ошибка!";
            this.snackBar.color = "error";
          }
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  computed: {
    ...mapState({
      snackBar: state => state.snackBar
    })
  }
};
</script>

<style scoped lang="scss"></style>
