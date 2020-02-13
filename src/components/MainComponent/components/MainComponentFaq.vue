<template>
  <div class="main-component-faq">
    <v-form
      ref="form"
      v-show="this.faq.faqid && !isNew"
      v-model="valid"
      lazy-validation
    >
      <v-row>
        <v-col cols="12" sm="12" md="8">
          <v-textarea
            v-model="faq.question"
            label="Вопрос"
            placeholder="Текст вопроса"
            :rules="rules"
          ></v-textarea>
          <v-textarea
            v-model="faq.answer"
            label="Ответ"
            placeholder="Текст ответа"
            :rules="rules"
          ></v-textarea>
          <v-text-field
            v-model="faq.position"
            type="number"
            label="Позиция"
            placeholder="Позиция"
            :rules="rules"
          ></v-text-field>
          <v-checkbox
            v-model="faq.isActive"
            class="mx-2"
            label="Опубликовать"
          ></v-checkbox>
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
          <v-btn
            color="error"
            class="mb-4"
            @click="deleteDialog = true"
            :loading="loading"
            >Удалить</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
    <v-form ref="form2" v-if="isNew" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12" sm="12" md="8">
          <v-textarea
            v-model="faqNew.question"
            label="Вопрос"
            placeholder="Текст вопроса"
            :rules="rules"
          ></v-textarea>
          <v-textarea
            v-model="faqNew.answer"
            label="Ответ"
            placeholder="Текст ответа"
            :rules="rules"
          ></v-textarea>
          <v-text-field
            v-model="faqNew.position"
            type="number"
            label="Позиция"
            placeholder="Позиция"
            :rules="rules"
          ></v-text-field>
          <v-checkbox
            v-model="faqNew.isActive"
            class="mx-2"
            label="Опубликовать"
          ></v-checkbox>
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
            >Добавить</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
    <v-btn color="pink" dark fixed bottom right fab @click="create">
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <!--modals-->
    <v-dialog v-model="deleteDialog" max-width="290">
      <v-card>
        <v-card-title class="headline"
          >Удалить вопрос {{ faq.question }}?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="deleteDialog = false">
            Отмена
          </v-btn>

          <v-btn color="green darken-1" text @click="remove()">
            Да
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { serverUrl } from "@/store/urls";
import "../assets/css/MainComponentFaq.css";
export default {
  name: "MainComponentFaq",
  data() {
    return {
      valid: true,
      rules: [v => !!v || "Оябязательно для заполнения"],
      loading: false,
      serverUrl: serverUrl,
      isNew: false,
      faqNew: {},
      deleteDialog: false
    };
  },
  methods: {
    save() {
      if (
        (!this.isNew && !this.$refs.form.validate()) ||
        (this.isNew && !this.$refs.form2.validate())
      ) {
        this.loading = false;
        return;
      }
      this.loading = true;
      let formData = new FormData(),
        faqObj = !this.isNew ? this.faq : this.faqNew;
      if (!faqObj.hasOwnProperty("isActive")) {
        faqObj["isActive"] = false;
      }
      for (let key in faqObj) {
        if (faqObj.hasOwnProperty(key)) {
          if (
            ["publishedDt", "createdDt", "updatedDt", "faqid"].indexOf(key) < 0
          ) {
            if (key === "isActive") {
              if (faqObj[key]) {
                formData.append(`faq[${key}]`, "1");
              } else {
                formData.append(`faq[${key}]`, "0");
              }
            } else {
              formData.append(`faq[${key}]`, faqObj[key]);
            }
          }
        }
      }
      if (faqObj.faqid !== undefined) {
        this.$store
          .dispatch("faqs/updateFaqs", {
            data: formData,
            faq: faqObj
          })
          .then(() => {
            this.snackBar.value = true;
            this.snackBar.text = "Вопрос и ответ обновлены";
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
      } else {
        this.$store
          .dispatch("faqs/createFaqs", formData)
          .then(() => {
            this.snackBar.value = true;
            this.snackBar.text = "Создано успешно";
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
    remove() {
      this.loading = true;
      this.$store
        .dispatch("faqs/deleteFaqs", this.faq)
        .then(() => {
          this.deleteDialog = false;
          this.snackBar.value = true;
          this.snackBar.text = "Вопрос и ответ удалены";
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
    },
    create() {
      this.isNew = true;
      if (this.$refs.form) {
        this.$refs.form.resetValidation();
      }
    }
  },
  computed: {
    ...mapState({
      faqs: state => state.faqs.faqs,
      faq: state => state.faqs.oneFaqs,
      snackBar: state => state.snackBar
    })
  },
  mounted() {
    this.$store.dispatch("faqs/getAllFaqs");
  },
  watch: {
    faq() {
      this.isNew = false;
      this.faqNew = {};
    }
  }
};
</script>
