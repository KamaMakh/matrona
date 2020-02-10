<template>
  <div class="main-component-settings pl-10">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12" sm="6" md="5">
          <v-text-field
            v-model="settings.settingsDiscountDefault"
            label="Скидка по умолчанию"
            placeholder="Скидка по умолчанию"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="settings.settingsPhone1"
            label="Телефон 1"
            placeholder="Телефон 1"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="settings.settingsPhone2"
            label="Телефон 2"
            placeholder="Телефон 2"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="settings.settingsAccountViber"
            label="Номер Viber"
            placeholder="Номер Viber"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="settings.settingsAccountWhatsapp"
            label="Номер Whatsapp"
            placeholder="Номер Whatsapp"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="settings.settingsEmail"
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
import { mapState } from "vuex";
export default {
  name: "MainComponentSettings",
  data() {
    return {
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
      this.loading = true;
      let formData = new FormData();

      for (let key in this.settings) {
        if (this.settings.hasOwnProperty(key)) {
          if (
            ["publishedDt", "createdDt", "updatedDt", "settingsid"].indexOf(
              key
            ) < 0
          ) {
            formData.append(`settings[${key}]`, this.settings[key]);
          }
        }
      }

      this.$store
        .dispatch("user/updateSettings", {
          data: formData
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
      settings: state => state.user.settings,
      snackBar: state => state.snackBar
    })
  },
  mounted() {
    this.$store.dispatch("user/getSettings");
  }
};
</script>

<style scoped lang="scss">
.main-component-settings {
  width: 100%;
}
</style>
