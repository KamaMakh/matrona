<template>
  <div class="main-component-heading">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      v-show="this.rubric.rubricid && !isNew"
    >
      <v-row>
        <v-col cols="12" sm="12" md="8">
          <v-textarea
            rows="1"
            auto-grow
            v-model="rubric.title"
            label="Название рубрики"
            placeholder="Введите название рубрики"
            :rules="rules"
          ></v-textarea>
          <v-text-field
            v-model="rubric.position"
            label="Позиция"
            placeholder="Позиция"
            type="number"
            step="0.1"
            :rules="rules"
          ></v-text-field>
          <v-row class="align-center">
            <v-col cols="12" class="font-weight-bold">Дефолтная обложка</v-col>
            <v-col
              v-if="rubric.rubricid && rubric.coverDefaultUrl"
              cols="2"
              sm="5"
            >
              <viewer
                class="main-component-news__viewer"
                :images="[serverUrl + this.rubric.coverDefaultUrl]"
              >
                <img :src="serverUrl + this.rubric.coverDefaultUrl" alt="" />
              </viewer>
            </v-col>
            <v-col>
              <v-file-input
                v-model="rubric.coverDefaultFile"
                label="Дефолтная обложка"
                filled
                prepend-icon="mdi-camera"
                show-size
                accept=".png, .jpg, .jpeg, .gif"
              ></v-file-input>
            </v-col>
          </v-row>
          <v-row class="align-center">
            <v-col cols="12" class="font-weight-bold"
              >Тематическая обложка</v-col
            >
            <v-col
              v-if="rubric.rubricid && rubric.coverTematicUrl"
              cols="2"
              sm="5"
            >
              <viewer
                class="main-component-news__viewer"
                :images="[serverUrl + this.rubric.coverTematicUrl]"
              >
                <img :src="serverUrl + this.rubric.coverTematicUrl" alt="" />
              </viewer>
            </v-col>
            <v-col>
              <v-file-input
                v-model="rubric.coverTematicFile"
                label="Тематическая обложка"
                filled
                prepend-icon="mdi-camera"
                show-size
                accept=".png, .jpg, .jpeg, .gif"
              ></v-file-input>
            </v-col>
          </v-row>
          <v-divider color="#333"></v-divider>
          <v-checkbox
            v-model="rubric.isActive"
            class="mx-2"
            label="Опубликовать"
          ></v-checkbox>
        </v-col>
      </v-row>

      <v-card v-if="!isNew" max-width="640">
        <v-card-text>
          <v-row>
            <v-col>
              <v-radio-group v-model="sms.who">
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
                      label="Введите номера через запятую"
                      hide-details
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="sms.title"
                      label="Заголовок"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-textarea
                      rows="4"
                      auto-grow
                      v-model="sms.body"
                      label="Текст уведомления"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

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
    <v-form v-if="isNew" ref="form2" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12" sm="12" md="8">
          <v-textarea
            rows="1"
            auto-grow
            v-model="rubricNew.title"
            label="Название рубрики"
            placeholder="Введите название рубрики"
            :rules="rules"
          ></v-textarea>
          <v-text-field
            v-model="rubricNew.position"
            label="Позиция"
            placeholder="Позиция"
            step="0.1"
            type="number"
            :rules="rules"
          ></v-text-field>
          <v-col cols="12" class="font-weight-bold">Дефолтная обложка</v-col>
          <v-file-input
            v-model="rubricNew.coverDefaultFile"
            label="Дефолтная обложка"
            filled
            prepend-icon="mdi-camera"
            show-size
            accept=".png, .jpg, .jpeg, .gif"
          ></v-file-input>
          <v-col cols="12" class="font-weight-bold">Тематическая обложка</v-col>
          <v-file-input
            v-model="rubricNew.coverTematicFile"
            label="Тематическая обложка"
            filled
            prepend-icon="mdi-camera"
            show-size
            accept=".png, .jpg, .jpeg, .gif"
          ></v-file-input>
          <v-divider color="#333"></v-divider>
          <v-checkbox
            v-model="rubricNew.createNotification"
            class="mx-2"
            label="Мобильное уведомление"
          ></v-checkbox>
          <v-divider color="#333"></v-divider>
          <v-checkbox
            v-model="rubricNew.isActive"
            class="mx-2"
            label="Опубликовать"
          ></v-checkbox>
        </v-col>
      </v-row>

      <v-card v-if="rubricNew.createNotification" max-width="640">
        <v-card-text>
          <v-row>
            <v-col>
              <v-radio-group v-model="sms.who">
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
                      label="Введите номера через запятую"
                      hide-details
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="sms.title"
                      label="Заголовок"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-textarea
                      rows="4"
                      auto-grow
                      v-model="sms.body"
                      label="Текст уведомления"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

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
          >Удалить рубрику <br />
          {{ rubric.title }}?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            :loading="loading"
            color="green darken-1"
            text
            @click="deleteDialog = false"
          >
            Отмена
          </v-btn>

          <v-btn
            :loading="loading"
            color="green darken-1"
            text
            @click="remove()"
          >
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
export default {
  name: "MainComponentHeading",
  beforeRouteLeave(to, from, next) {
    if (
      (this.isNew && Object.keys(this.rubricNew).length) ||
      JSON.stringify(this.rubric) !=
        JSON.stringify(this.$store.state.heading.oneRubric)
    ) {
      const answer = window.confirm(
        "Вы хотите уйти? У вас есть несохранённые изменения!"
      );
      if (answer) {
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  },
  data() {
    return {
      heading: {},
      valid: true,
      rules: [v => !!v || "Обязательно для заполнения"],
      loading: false,
      isNew: false,
      rubricNew: {},
      deleteDialog: false,
      serverUrl: serverUrl,
      sms: {
        who: "all",
        title: "",
        body: "",
        phones: ""
      }
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
        articleObj = !this.isNew ? this.rubric : this.rubricNew;
      if (!articleObj.hasOwnProperty("isActive")) {
        articleObj["isActive"] = false;
      }
      for (let key in articleObj) {
        if (articleObj.hasOwnProperty(key)) {
          if (
            [
              "publishedDt",
              "createdDt",
              "updatedDt",
              "rubricid",
              "coverDefaultUrl",
              "coverTematicUrl",
              "coverDefault",
              "coverTematic",
              "sendNotification"
            ].indexOf(key) < 0
          ) {
            if (key === "isActive") {
              if (articleObj[key]) {
                formData.append(`rubric[${key}]`, "1");
              } else {
                formData.append(`rubric[${key}]`, "0");
              }
            } else {
              formData.append(`rubric[${key}]`, articleObj[key]);
            }

            if (key === "createNotification" || !this.isNew) {
              if (articleObj[key]) {
                formData.append(
                  `rubric[sendNotification][type]`,
                  this.sms.who === "all" ? 1 : 2
                );
                formData.append(
                  `rubric[sendNotification][title]`,
                  this.sms.title ? this.sms.title : null
                );
                formData.append(
                  `rubric[sendNotification][body]`,
                  this.sms.body ? this.sms.body : null
                );
                formData.append(
                  `rubric[sendNotification][phones]`,
                  this.sms.phones ? this.sms.phones : null
                );
              }
            }
          }
        }
      }
      if (articleObj.rubricid !== undefined) {
        this.$store
          .dispatch("heading/updateRubric", {
            data: formData,
            rubric: articleObj
          })
          .then(() => {
            this.snackBar.value = true;
            this.snackBar.text = "Рубрика обновлена";
            this.snackBar.color = "success";
            this.getData();
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
          .dispatch("heading/createRubric", formData)
          .then(() => {
            this.snackBar.value = true;
            this.snackBar.text = "Создано успешно";
            this.snackBar.color = "success";
            this.create();
            this.getData();
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
        .dispatch("heading/deleteRubric", this.rubric)
        .then(() => {
          this.deleteDialog = false;
          this.snackBar.value = true;
          this.snackBar.text = "Рубрика удалена";
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
      this.rubricNew = {};
      if (this.$refs.form) {
        this.$refs.form.resetValidation();
      }
      if (this.$refs.form2) {
        this.$refs.form2.resetValidation();
      }
      this.$store.commit("heading/setRubric");
    },
    getData() {
      this.$store.dispatch("heading/getAllRubrics").then(response => {
        if (response.data.result && !response.data.result.length) {
          this.create();
        }
      });
    }
  },
  computed: {
    ...mapState({
      rubrics: state => state.heading.rubrics,
      rubric: state => JSON.parse(JSON.stringify(state.heading.oneRubric)),
      snackBar: state => state.snackBar,
      filter: state => state.filter
    })
  },
  mounted() {
    this.getData();
  },
  watch: {
    rubric(value) {
      if (value.rubricid) {
        this.isNew = false;
        this.rubricNew = {};
      }
    },
    filter() {
      if (this.rubric && this.rubric.rubricid) {
        this.$store.commit("heading/setRubric");
      }
    }
  }
};
</script>

<style scoped lang="scss">
.main-component-heading {
  width: 100%;
}
</style>
