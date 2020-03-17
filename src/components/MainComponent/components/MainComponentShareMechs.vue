<template>
  <div class="main-component-share-mechs">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      v-show="this.schema.stockSchemaid && !isNew"
    >
      <v-row>
        <v-col cols="12" sm="12" md="8">
          <v-textarea
            rows="1"
            auto-grow
            v-model="schema.title"
            label="Название механики акции"
            placeholder="Введите название механики акции"
            :rules="rules"
          ></v-textarea>
          <v-text-field
            v-model="schema.position"
            label="Позиция"
            placeholder="Позиция"
            step="0.1"
            :rules="rules"
            type="number"
          ></v-text-field>
          <v-row>
            <v-col cols="12" class="font-weight-bold">
              Дефолтная обложка
            </v-col>
            <v-col
              v-if="schema.stockSchemaid && this.schema.coverDefaultUrl"
              cols="5"
              class="d-flex align-center"
            >
              <viewer
                class="main-component-news__viewer"
                :images="[serverUrl + this.schema.coverDefaultUrl]"
              >
                <img :src="serverUrl + this.schema.coverDefaultUrl" alt="" />
              </viewer>
            </v-col>
            <v-col>
              <v-file-input
                v-model="schema.coverDefaultFile"
                label="Дефолтная обложка"
                prepend-icon="mdi-camera"
                show-size
                accept=".png, .jpg, .jpeg, .gif"
              ></v-file-input>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="font-weight-bold">
              Тематическая обложка
            </v-col>
            <v-col
              v-if="schema.stockSchemaid && this.schema.coverTematicUrl"
              cols="5"
              class="d-flex align-center"
            >
              <viewer
                class="main-component-news__viewer"
                :images="[serverUrl + this.schema.coverTematicUrl]"
              >
                <img :src="serverUrl + this.schema.coverTematicUrl" alt="" />
              </viewer>
            </v-col>
            <v-col>
              <v-file-input
                v-model="schema.coverTematicFile"
                label="Тематическая обложка"
                prepend-icon="mdi-camera"
                show-size
                accept=".png, .jpg, .jpeg, .gif"
              ></v-file-input>
            </v-col>
          </v-row>
          <v-divider color="#333"></v-divider>
          <v-checkbox
            v-model="schema.isActive"
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

    <v-form ref="form2" v-model="valid" lazy-validation v-if="isNew">
      <v-row>
        <v-col cols="12" sm="12" md="8">
          <v-textarea
            rows="1"
            auto-grow
            v-model="schemaNew.title"
            label="Название механики акции"
            placeholder="Введите название механики акции"
            :rules="rules"
          ></v-textarea>
          <v-text-field
            rows="1"
            auto-grow
            v-model="schemaNew.position"
            label="Позиция"
            placeholder="Позиция"
            step="0.1"
            :rules="rules"
            type="number"
          ></v-text-field>
          <v-col cols="12" class="font-weight-bold">
            Дефолтная обложка
          </v-col>
          <v-file-input
            v-model="schemaNew.coverDefaultFile"
            label="Дефолтная обложка"
            prepend-icon="mdi-camera"
            show-size
            accept=".png, .jpg, .jpeg, .gif"
          ></v-file-input>
          <v-col cols="12" class="font-weight-bold">
            Тематическая обложка
          </v-col>
          <v-file-input
            v-model="schemaNew.coverTematicFile"
            label="Тематическая обложка"
            prepend-icon="mdi-camera"
            show-size
            accept=".png, .jpg, .jpeg, .gif"
          ></v-file-input>
          <v-divider color="#333"></v-divider>
          <v-checkbox
            v-model="schemaNew.createNotification"
            class="mx-2"
            label="Мобильное уведомление"
          ></v-checkbox>
          <v-divider color="#333"></v-divider>
          <v-checkbox
            v-model="schemaNew.isActive"
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
          >Удалить <br />
          рубрику {{ schema.title }}?</v-card-title
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
  name: "MainComponentShareMechs",
  beforeRouteLeave(to, from, next) {
    if (
      this.isNew ||
      JSON.stringify(this.schema) !=
        JSON.stringify(this.$store.state.mechanics.oneSchema)
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
      valid: true,
      rules: [v => !!v || "Обязательно для заполнения"],
      loading: false,
      schemaNew: {},
      deleteDialog: false,
      isNew: false,
      serverUrl: serverUrl
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
        articleObj = !this.isNew ? this.schema : this.schemaNew;
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
              "stockSchemaid",
              "coverDefaultUrl",
              "coverTematicUrl",
              "coverDefault",
              "coverTematic"
            ].indexOf(key) < 0
          ) {
            if (key === "isActive") {
              if (articleObj[key]) {
                formData.append(`stock_schema[${key}]`, "1");
              } else {
                formData.append(`stock_schema[${key}]`, "0");
              }
            } else {
              formData.append(`stock_schema[${key}]`, articleObj[key]);
            }
          }
        }
      }
      if (articleObj.stockSchemaid !== undefined) {
        this.$store
          .dispatch("mechanics/updateSchema", {
            data: formData,
            schema: articleObj
          })
          .then(() => {
            this.snackBar.value = true;
            this.snackBar.text = "Схема обновлена";
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
          .dispatch("mechanics/createSchema", formData)
          .then(() => {
            this.snackBar.value = true;
            this.snackBar.text = "Создано успешно";
            this.snackBar.color = "success";
            this.create();
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
        .dispatch("mechanics/deleteSchema", this.schema)
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
      this.schemaNew = {};
      if (this.$refs.form) {
        this.$refs.form.resetValidation();
      }
      if (this.$refs.form2) {
        this.$refs.form2.resetValidation();
      }
      this.$store.commit("mechanics/setSchema");
    }
  },
  computed: {
    ...mapState({
      schema: state => JSON.parse(JSON.stringify(state.mechanics.oneSchema)),
      snackBar: state => state.snackBar,
      filter: state => state.filter
    })
  },
  mounted() {
    this.$store
      .dispatch("mechanics/getAllSchemas", this.filter)
      .then(response => {
        if (response.data.result && !response.data.result.length) {
          this.create();
        }
      });
  },
  watch: {
    schema(value) {
      if (value.stockSchemaid) {
        this.isNew = false;
        this.schemaNew = {};
      }
    },
    filter() {
      this.$store.commit("mechanics/setSchema");
    }
  }
};
</script>

<style scoped lang="scss">
.main-component-share-mechs {
  width: 100%;
}
</style>
