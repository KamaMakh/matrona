<template>
  <div class="main-component-user-settings">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12" sm="6" md="5">
          <v-text-field
            v-model="user_settings.user_name"
            label="Имя пользователя"
            placeholder="Имя пользователя"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="user_settings.login"
            label="Логин"
            placeholder="Логин"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="user_settings.password"
            label="Текущий пароль"
            placeholder="Текущий пароль"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="user_settings.password_new"
            label="Новый пароль"
            placeholder="Новый пароль"
            :rules="rules"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" sm="12">
          <v-btn
            small
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
export default {
  name: "MainComponentUserSettings",
  data() {
    return {
      user_settings: {},
      valid: true,
      rules: [v => !!v || "Required"],
      loading: false
    };
  },
  methods: {
    save() {
      if (!this.$refs.form.validate()) {
        this.loading = false;
        return;
      }
    },
    create() {
      this.$refs.form.resetValidation();
      this.$refs.form.reset();
      this.user_settings = {};
    }
  }
};
</script>

<style scoped lang="scss">
.main-component-user-settings {
  width: 100%;
}
</style>
