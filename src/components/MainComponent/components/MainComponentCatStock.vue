<template>
  <div class="main-component-heading">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      v-show="this.categoryStock.id && !isNew"
    >
      <v-row>
        <v-col cols="12" sm="12" md="8">
          <v-textarea
            rows="1"
            auto-grow
            v-model="categoryStock.name"
            label="Наименование"
            placeholder="Введите наименование"
            :rules="rules"
          ></v-textarea>
          <v-textarea
            rows="1"
            auto-grow
            v-model="categoryStock.nameForClient"
            label="Наименование для пользователей"
            placeholder="Введите наименование для пользователей"
            :rules="rules"
          ></v-textarea>
          <v-text-field
              v-model="categoryStock.positionVertical"
              label="Порядок по вертикали"
              placeholder="0.0"
              type="number"
              step="0.1"
              :rules="rules"
          ></v-text-field>
          <v-text-field
              v-model="categoryStock.positionHorizontal"
              label="Порядок по горизонтали"
              placeholder="0.0"
              type="number"
              step="0.1"
              :rules="rules"
          ></v-text-field>
          <v-row class="align-center">
            <v-col cols="12" class="font-weight-bold">Изображение</v-col>
            <v-col
                v-if="categoryStock.id && categoryStock.coverUrl"
                cols="2"
                sm="5"
            >
              <viewer
                  class="main-component-news__viewer"
                  :images="[serverUrl + this.categoryStock.coverUrl]"
              >
                <img :src="serverUrl + this.categoryStock.coverUrl" alt="" />
              </viewer>
            </v-col>
            <v-col>
              <v-file-input
                  v-model="categoryStock.coverFile"
                  label="Изображение"
                  filled
                  prepend-icon="mdi-camera"
                  show-size
                  accept=".png, .jpg, .jpeg, .gif"
              ></v-file-input>
            </v-col>
          </v-row>
          <v-text-field
            v-model="categoryStock.minDiscount"
            label="Минимальная скидка"
            placeholder="0.0"
            type="number"
            step="0.1"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="categoryStock.maxDiscount"
            label="Максимальная скидка"
            placeholder="0.0"
            type="number"
            step="0.1"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="categoryStock.manualDiscount"
            label="Ручная скидка"
            placeholder="0.0"
            type="number"
            step="0.1"
            :rules="rules"
          ></v-text-field>

          <v-divider color="#333"></v-divider>
          <v-checkbox
            v-model="categoryStock.isActive"
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
    <v-form v-if="isNew" ref="form2" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12" sm="12" md="8">
          <v-textarea
              rows="1"
              auto-grow
              v-model="categoryStockNew.name"
              label="Наименование"
              placeholder="Введите наименование"
              :rules="rules"
          ></v-textarea>
          <v-textarea
              rows="1"
              auto-grow
              v-model="categoryStockNew.nameForClient"
              label="Наименование для пользователей"
              placeholder="Введите наименование для пользователей"
              :rules="rules"
          ></v-textarea>

          <v-text-field
              v-model="categoryStockNew.positionVertical"
              label="Порядок по вертикали"
              placeholder="0.0"
              type="number"
              step="0.1"
              :rules="rules"
          ></v-text-field>
          <v-text-field
              v-model="categoryStockNew.positionHorizontal"
              label="Порядок по горизонтали"
              placeholder="0.0"
              type="number"
              step="0.1"
              :rules="rules"
          ></v-text-field>
          <v-row class="align-center">
            <v-col cols="12" class="font-weight-bold">Изображение</v-col>
            <v-col
                v-if="categoryStockNew.id && categoryStockNew.coverUrl"
                cols="2"
                sm="5"
            >
              <viewer
                  class="main-component-news__viewer"
                  :images="[serverUrl + this.categoryStockNew.coverUrl]"
              >
                <img :src="serverUrl + this.categoryStockNew.coverUrl" alt="" />
              </viewer>
            </v-col>
            <v-col>
              <v-file-input
                  v-model="categoryStockNew.coverFile"
                  label="Изображение"
                  filled
                  prepend-icon="mdi-camera"
                  show-size
                  accept=".png, .jpg, .jpeg, .gif"
              ></v-file-input>
            </v-col>
          </v-row>
          <v-text-field
              v-model="categoryStockNew.minDiscount"
              label="Минимальная скидка"
              placeholder="0.0"
              type="number"
              step="0.1"
              :rules="rules"
          ></v-text-field>
          <v-text-field
              v-model="categoryStockNew.maxDiscount"
              label="Максимальная скидка"
              placeholder="0.0"
              type="number"
              step="0.1"
              :rules="rules"
          ></v-text-field>
          <v-text-field
              v-model="categoryStockNew.manualDiscount"
              label="Ручная скидка"
              placeholder="0.0"
              type="number"
              step="0.1"
              :rules="rules"
          ></v-text-field>

          <v-divider color="#333"></v-divider>
          <v-checkbox
              v-model="categoryStockNew.isActive"
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
          >Удалить категорию <br />
          <small>{{ this.categoryStock.name }}</small>?</v-card-title
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
  name: "MainComponentCatStock",
  beforeRouteLeave(to, from, next) {
    if (
      (this.isNew && Object.keys(this.categoryStockNew).length) ||
      JSON.stringify(this.categoryStock) !=
        JSON.stringify(this.$store.state.catStock.oneCategoryStock)
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
      // categoryStock: {},
      valid: true,
      rules: [v => !!v || "Обязательно для заполнения"],
      loading: false,
      isNew: false,
      categoryStockNew: {},
      deleteDialog: false,
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
        articleObj = !this.isNew ? this.categoryStock : this.categoryStockNew;
      if (!articleObj.hasOwnProperty("isActive")) {
        articleObj["isActive"] = false;
      }
      for (let key in articleObj) {
        if (articleObj.hasOwnProperty(key)) {
          if (
            [
              "name",
              "nameForClient",
              "positionVertical",
              "positionHorizontal",
              "minDiscount",
              "maxDiscount",
              "manualDiscount",
              "coverFile"
            ].indexOf(key) < 0
          ) {
            if (key === "isActive") {
              if (articleObj[key]) {
                formData.append(`category_stock[${key}]`, "1");
              } else {
                formData.append(`category_stock[${key}]`, "0");
              }
            }
          } else {
              formData.append(`category_stock[${key}]`, articleObj[key]);
          }
        }
      }
      if (articleObj.id !== undefined) {
        this.$store
          .dispatch("catStock/editCategoryStock", {
            data: formData,
            categoryStock: articleObj
          })
          .then(() => {
            this.snackBar.value = true;
            this.snackBar.text = "Каталог обновлён";
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
          .dispatch("catStock/createCategoryStock", formData)
          .then(() => {
            this.snackBar.value = true;
            this.snackBar.text = "Вы создали каталог";
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
        .dispatch("catStock/deleteCategoryStock", this.categoryStock)
        .then(() => {
          this.deleteDialog = false;
          this.snackBar.value = true;
          this.snackBar.text = "Вы удалили каталог";
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
      this.categoryStockNew = {};
      if (this.$refs.form) {
        this.$refs.form.resetValidation();
      }
      if (this.$refs.form2) {
        this.$refs.form2.resetValidation();
      }
      this.$store.commit("catStock/setCategoryStock");
    },
    getData() {
      this.$store.dispatch("catStock/getAllCategoryStock").then(response => {
        if (response.data.result && !response.data.result.length) {
          this.create();
        }
      });
    }
  },
  computed: {
    ...mapState({
      categoryStocks: state => state.catStock.categoryStocks,
      categoryStock: state => JSON.parse(JSON.stringify(state.catStock.oneCategoryStock)),
      snackBar: state => state.snackBar,
      filter: state => state.filter
    })
  },
  mounted() {
    this.getData();
  },
  watch: {
      categoryStock(value) {
      if (value.id) {
        this.isNew = false;
        this.categoryStockNew = {};
      }
    },
    filter() {
      if (this.categoryStock && this.categoryStock.id) {
        this.$store.commit("catStock/setCategoryStock");
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
