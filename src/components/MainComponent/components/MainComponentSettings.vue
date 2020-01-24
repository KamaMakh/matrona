<template>
  <div class="main-component-settings">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12" sm="6" md="5">
          <v-text-field
            v-model="settings.default_stock"
            label="Скидка по умолчанию"
            placeholder="Скидка по умолчанию"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="settings.phone1"
            label="Телефон 1"
            placeholder="Телефон 1"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="settings.phone2"
            label="Телефон 2"
            placeholder="Телефон 2"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="settings.phone_viber"
            label="Номер Viber"
            placeholder="Номер Viber"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="settings.phone_whatsapp"
            label="Номер Whatsapp"
            placeholder="Номер Whatsapp"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="settings.email_support"
            label="Email поддержки"
            placeholder="Email поддержки"
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
  name: "MainComponentSettings",
  data() {
    return {
      settings: {},
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
      this.settings = {};
    }
  }
};
</script>

<style scoped lang="scss">
.main-component-settings {
  width: 100%;
}
</style>
