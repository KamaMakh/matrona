<template>
  <div>
    <v-card max-width="640">
      <v-form
        ref="smsForm"
        lazy-validation
        v-model="valid"
        @submit.prevent="send"
      >
        <v-card-text>
          <v-row>
            <v-col>
              <v-radio-group v-model="sms.who" :rules="rules">
                <v-row class="align-center">
                  <v-col cols="2" sm="1">
                    <v-radio :value="'all'"></v-radio>
                  </v-col>
                  <v-col>
                    Всем
                  </v-col>
                </v-row>
                <v-row class="align-center">
                  <v-col cols="2" sm="1">
                    <v-radio :value="'phones'"></v-radio>
                  </v-col>
                  <v-col>
                    <v-textarea
                      rows="1"
                      auto-grow
                      :disabled="sms.who !== 'phones'"
                      v-model="sms.phones"
                      label="Адрес видео-обложки"
                      placeholder="Введите ссылку"
                      :rules="sms.who === 'phones' ? rules : [true]"
                      hide-details
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="sms.title"
                      label="Заголовок"
                      :rules="rules"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-textarea
                      rows="4"
                      auto-grow
                      v-model="sms.text"
                      label="Текст уведомления"
                      :rules="rules"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            class="mr-md-4 mr-lg-4 mr-sm-0 mb-4"
            @click="send"
            :loading="loading"
          >
            Отправить
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "MainComponentSMS",
  data() {
    return {
      sms: {
        who: "all"
      },
      valid: true,
      loading: false,
      rules: [v => !!v || "Обязательно для заполнения"]
    };
  },
  computed: {
    ...mapState({
      snackBar: state => state.snackBar
    })
  },
  methods: {
    send() {
      this.loading = true;
      if (!this.$refs.smsForm.validate()) {
        this.loading = false;
        return;
      }
      this.$store
        .dispatch("user/sendSMS", {
          type: this.sms.who,
          title: this.sms.title,
          text: this.sms.text,
          phones: this.sms.phones
        })
        .then(() => {
          this.snackBar.value = true;
          this.snackBar.text = "Рассылка отправлена";
          this.snackBar.color = "success";
          this.sms = {
            who: "all"
          };
          this.valid = true;
          this.$refs.smsForm.resetValidation();
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
  }
};
</script>

<style scoped lang="scss">
@import "../assets/css/mailing.css";
</style>
