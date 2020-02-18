<template>
  <div class="main-component-user-settings pl-10">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12" sm="12" md="8">
          <v-text-field
            v-model="user.fullName"
            label="Имя пользователя"
            placeholder="Имя пользователя"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="user.email"
            label="Логин"
            placeholder="Логин"
            :rules="emailRules"
          ></v-text-field>
          <v-text-field
            v-model="user.password"
            :rules="rules"
            type="password"
            label="Новый пароль"
            placeholder="Новый пароль"
          ></v-text-field>
          <v-text-field
            v-model="user.c_password"
            :rules="c_passwordRules"
            type="password"
            label="Подтвердите пароль"
            placeholder="Подтвердите пароль"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" sm="12">
          <v-btn
            color="primary"
            class="mr-md-4 mr-lg-4 mr-sm-0 mb-4"
            @click="save"
            :disabled="!valid"
            :loading="loading"
            >Сохранить</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MainComponentUserSettings",
  data() {
    return {
      valid: true,
      rules: [v => !!v || "Обязательно для заполнения"],
      c_passwordRules: [
        v => !!v || "Поле обязательное",
        v => (v && v === this.user.password) || "Пароли не совпадают"
      ],
      emailRules: [
        v => !!v || "Обязательно для заполнения",
        v => /.+@.+\..+/.test(v) || "E-mail не валидный"
      ],
      loading: false
    };
  },
  methods: {
    save() {
      if (!this.$refs.form.validate()) {
        this.loading = false;
        return;
      }
      if (!this.$refs.form.validate()) {
        this.loading = false;
        return;
      }
      this.loading = true;
      let formData = new FormData();

      for (let key in this.user) {
        if (this.user.hasOwnProperty(key)) {
          if (
            [
              "publishedDt",
              "createdDt",
              "updatedDt",
              "userid",
              "c_password"
            ].indexOf(key) < 0
          ) {
            formData.append(`user[${key}]`, this.user[key]);
          }
        }
      }

      this.$store
        .dispatch("user/updateUser", {
          data: formData,
          user: this.user
        })
        .then(() => {
          this.snackBar.value = true;
          this.snackBar.text = "Настройки сохранены";
          this.snackBar.color = "success";
        })
        .catch(error => {
          if (
            error.response &&
            error.response.error &&
            error.response.error.message
          ) {
            this.snackBar.value = true;
            this.snackBar.text = error.response.error.message;
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
      user: state => state.user.user,
      snackBar: state => state.snackBar
    })
  },
  mounted() {
    this.$store.dispatch("user/getUser");
  }
};
</script>

<style scoped lang="scss">
.main-component-user-settings {
  width: 100%;
}
</style>
