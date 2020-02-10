<template>
  <div class="main-component-heading">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      v-show="this.rubric.rubricid && !isNew"
    >
      <v-row>
        <v-col cols="12" sm="6" md="5">
          <v-text-field
            v-model="rubric.title"
            label="Название рубрики"
            placeholder="Введите название рубрики"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="rubric.position"
            label="Позиция"
            placeholder="Позиция"
            type="number"
            :rules="rules"
          ></v-text-field>
          <v-file-input
            v-model="rubric.coverDefaultFile"
            label="Дефолтная обложка"
            filled
            prepend-icon="mdi-camera"
            show-size
          ></v-file-input>
          <v-file-input
            v-model="rubric.coverTematicFile"
            label="Тематическая обложка"
            filled
            prepend-icon="mdi-camera"
            show-size
          ></v-file-input>
          <v-divider color="#333"></v-divider>
          <v-checkbox
            v-model="rubric.isActive"
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
    <v-form v-if="isNew" ref="form2" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12" sm="6" md="5">
          <v-text-field
            v-model="rubricNew.title"
            label="Название рубрики"
            placeholder="Введите название рубрики"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="rubricNew.position"
            label="Позиция"
            placeholder="Позиция"
            type="number"
            :rules="rules"
          ></v-text-field>
          <v-file-input
            v-model="rubricNew.coverDefaultFile"
            label="Дефолтная обложка"
            filled
            prepend-icon="mdi-camera"
            show-size
          ></v-file-input>
          <v-file-input
            v-model="rubricNew.coverTematicFile"
            label="Тематическая обложка"
            filled
            prepend-icon="mdi-camera"
            show-size
          ></v-file-input>
          <v-divider color="#333"></v-divider>
          <v-checkbox
            v-model="rubricNew.isActive"
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
          >Удалить рубрику {{ rubric.title }}?</v-card-title
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
export default {
  name: "MainComponentHeading",
  data() {
    return {
      heading: {},
      valid: true,
      rules: [v => !!v || "Required"],
      loading: false,
      isNew: false,
      rubricNew: {},
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
              "coverTematic"
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
      if (this.$refs.form) {
        this.$refs.form.resetValidation();
      }
    }
  },
  computed: {
    ...mapState({
      rubrics: state => state.heading.rubrics,
      rubric: state => state.heading.oneRubric,
      snackBar: state => state.snackBar
    })
  },
  mounted() {
    this.$store.dispatch("heading/getAllRubrics");
  },
  watch: {
    rubric() {
      this.isNew = false;
      this.rubricNew = {};
    }
  }
};
</script>

<style scoped lang="scss">
.main-component-heading {
  width: 100%;
}
</style>
