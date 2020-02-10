<template>
  <div class="main-component-share-mechs">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      v-show="this.schema.stockSchemaid && !isNew"
    >
      <v-row>
        <v-col cols="12" sm="6" md="5">
          <v-text-field
            v-model="schema.title"
            label="Название механики акции"
            placeholder="Введите название механики акции"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="schema.position"
            label="Позиция"
            placeholder="Позиция"
            :rules="rules"
          ></v-text-field>
          <v-row>
            <v-col
              v-if="schema.stockSchemaid && this.schema.coverDefaultUrl"
              cols="2"
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
                filled
                prepend-icon="mdi-camera"
                show-size
              ></v-file-input>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              v-if="schema.stockSchemaid && this.schema.coverTematicUrl"
              cols="2"
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
                filled
                prepend-icon="mdi-camera"
                show-size
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
            small
            color="primary"
            class="mr-md-4 mr-lg-4 mr-sm-0 mb-4"
            @click="save"
            :disabled="!valid"
            :loading="loading"
            >Сохранить</v-btn
          >
          <v-btn
            small
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
        <v-col cols="12" sm="6" md="5">
          <v-text-field
            v-model="schemaNew.title"
            label="Название механики акции"
            placeholder="Введите название механики акции"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="schemaNew.position"
            label="Позиция"
            placeholder="Позиция"
            :rules="rules"
          ></v-text-field>
          <v-file-input
            v-model="schemaNew.coverDefaultFile"
            label="Дефолтная обложка"
            filled
            prepend-icon="mdi-camera"
            show-size
          ></v-file-input>
          <v-file-input
            v-model="schemaNew.coverTematicFile"
            label="Тематическая обложка"
            filled
            prepend-icon="mdi-camera"
            show-size
          ></v-file-input>
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
            small
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
          >Удалить рубрику {{ schema.title }}?</v-card-title
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
  data() {
    return {
      valid: true,
      rules: [v => !!v || "Required"],
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
      if (this.$refs.form) {
        this.$refs.form.resetValidation();
      }
    }
  },
  computed: {
    ...mapState({
      schema: state => state.mechanics.oneSchema,
      snackBar: state => state.snackBar
    })
  },
  mounted() {
    this.$store.dispatch("mechanics/getAllSchemas");
  },
  watch: {
    schema() {
      this.isNew = false;
      this.schemaNew = {};
    }
  }
};
</script>

<style scoped lang="scss">
.main-component-share-mechs {
  width: 100%;
}
</style>
