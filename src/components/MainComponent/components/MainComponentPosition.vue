<template>
  <div class="main-component-position">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      v-show="this.specPrice.specPriceid && !isNew"
    >
      <v-row>
        <v-col cols="12" sm="12" md="8">
          <v-row>
            <v-col>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="specPrice.startDt"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="date_from"
                    label="Начало"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date_from"
                  :max="date_to"
                  no-title
                  scrollable
                  locale="ru"
                  first-day-of-week="1"
                  @input="menu = false"
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false"
                    >Отмена</v-btn
                  >
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(date_from)"
                    >ОК</v-btn
                  >
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col>
              <v-menu
                ref="menu2"
                v-model="menu2"
                :close-on-content-click="false"
                :return-value.sync="specPrice.endDt"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="date_to"
                    label="Окончание"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date_to"
                  :min="date_from"
                  no-title
                  scrollable
                  locale="ru"
                  first-day-of-week="1"
                  @input="menu2 = false"
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu2 = false"
                    >Отмена</v-btn
                  >
                  <v-btn text color="primary" @click="$refs.menu2.save(date_to)"
                    >ОК</v-btn
                  >
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-text-field
            v-model="specPrice.discountPercent"
            label="% cкидки"
            placeholder="% cкидки"
            type="number"
            :rules="rules"
          ></v-text-field>
          <v-row>
            <v-col>
              <v-text-field
                v-model="specPrice.price1"
                label="Цена 1"
                placeholder="Цена 1"
                type="number"
                :rules="rules"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="specPrice.price2"
                label="Цена 2"
                placeholder="Цена 2"
                type="number"
                :rules="rules"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-text-field
            v-model="specPrice.description"
            label="Описание"
            placeholder="Описание"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="specPrice.limitation"
            label="Ограничения"
            placeholder="Ограничения"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="specPrice.position"
            label="Позиция"
            placeholder="Позиция"
            type="number"
            :rules="rules"
          ></v-text-field>
          <v-row class="align-center">
            <v-col cols="12" class="font-weight-bold"
              >Обложка для карточки</v-col
            >
            <v-col
              v-if="specPrice.specPriceid && this.specPrice.cover"
              cols="5"
            >
              <viewer
                class="main-component-news__viewer"
                :images="[serverUrl + this.specPrice.coverUrl]"
              >
                <img :src="serverUrl + this.specPrice.coverUrl" alt="" />
              </viewer>
            </v-col>
            <v-col>
              <v-file-input
                v-model="specPrice.coverFile"
                label="Обложка для карточки"
                filled
                prepend-icon="mdi-camera"
                show-size
                accept=".png, .jpg, .jpeg, .gif"
              ></v-file-input>
            </v-col>
          </v-row>
          <v-divider color="#333"></v-divider>
          <v-checkbox
            v-model="specPrice.isActive"
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
            @click="deleteDialog = true"
            :loading="loading"
            color="error"
            class="mb-4"
            >Удалить</v-btn
          >
        </v-col>
      </v-row>
    </v-form>

    <v-form ref="form2" v-if="isNew" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12" sm="12" md="8">
          <v-row>
            <v-col>
              <v-menu
                ref="menu3"
                v-model="menu3"
                :close-on-content-click="false"
                :return-value.sync="specPriceNew.startDt"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="date_from"
                    label="Начало"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date_from"
                  :max="date_to"
                  locale="ru"
                  no-title
                  scrollable
                  first-day-of-week="1"
                  @input="menu3 = false"
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu3 = false"
                    >Отмена</v-btn
                  >
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu3.save(date_from)"
                    >ОК</v-btn
                  >
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col>
              <v-menu
                ref="menu4"
                v-model="menu4"
                :close-on-content-click="false"
                :return-value.sync="specPriceNew.endDt"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="date_to"
                    label="Окончание"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date_to"
                  :min="date_from"
                  locale="ru"
                  no-title
                  scrollable
                  first-day-of-week="1"
                  @input="menu4 = false"
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu4 = false"
                    >Отмена</v-btn
                  >
                  <v-btn text color="primary" @click="$refs.menu4.save(date_to)"
                    >ОК</v-btn
                  >
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-text-field
            v-model="specPriceNew.discountPercent"
            label="% cкидки"
            placeholder="% cкидки"
            type="number"
            :rules="rules"
          ></v-text-field>
          <v-row>
            <v-col>
              <v-text-field
                v-model="specPriceNew.price1"
                label="Цена 1"
                placeholder="Цена 1"
                type="number"
                :rules="rules"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="specPriceNew.price2"
                label="Цена 2"
                placeholder="Цена 2"
                type="number"
                :rules="rules"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-text-field
            v-model="specPriceNew.description"
            label="Описание"
            placeholder="Описание"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="specPriceNew.limitation"
            label="Ограничения"
            placeholder="Ограничения"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="specPriceNew.position"
            label="Позиция"
            placeholder="Позиция"
            type="number"
            :rules="rules"
          ></v-text-field>
          <v-row class="align-center">
            <v-col cols="12" class="font-weight-bold"
              >Обложка для карточки</v-col
            >
            <v-col>
              <v-file-input
                v-model="specPriceNew.coverFile"
                label="Обложка для карточки"
                filled
                prepend-icon="mdi-camera"
                show-size
                accept=".png, .jpg, .jpeg, .gif"
              ></v-file-input>
            </v-col>
          </v-row>
          <v-divider color="#333"></v-divider>
          <v-checkbox
            v-model="specPriceNew.createNotification"
            class="mx-2"
            label="Мобильное уведомление"
          ></v-checkbox>
          <v-divider color="#333"></v-divider>
          <v-checkbox
            v-model="specPriceNew.isActive"
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
            :disabled="!valid || loading"
            :loading="loading"
          >
            Добавить
          </v-btn>
        </v-col>
      </v-row>
    </v-form>

    <v-btn
      v-if="rubric && rubric.rubricid"
      color="pink"
      dark
      fixed
      bottom
      right
      fab
      @click="create"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <!--modals-->
    <v-dialog v-model="deleteDialog" max-width="290">
      <v-card>
        <v-card-title class="headline"
          >Удалить позицию <br />
          {{ specPrice.description | truncate }}?</v-card-title
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
  name: "MainComponentPosition",
  data() {
    return {
      date_from: new Date().toISOString().substr(0, 10),
      date_to: new Date().toISOString().substr(0, 10),
      valid: true,
      rules: [v => !!v || "Обязательно для заполнения"],
      loading: false,
      menu: false,
      menu2: false,
      menu3: false,
      menu4: false,
      isNew: false,
      specPriceNew: {},
      serverUrl: serverUrl,
      deleteDialog: false
    };
  },
  filters: {
    truncate: function(value) {
      if (!value) return "";
      value = value.substring(0, 30) + "...";
      return value;
    }
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
        articleObj = !this.isNew ? this.specPrice : this.specPriceNew;
      if (!articleObj.hasOwnProperty("isActive")) {
        articleObj["isActive"] = false;
      }
      articleObj["rubricid"] = this.rubric.rubricid;
      articleObj["startDt"] = this.date_from + "T00:00:00";
      articleObj["endDt"] = this.date_to + "T00:00:00";
      for (let key in articleObj) {
        if (articleObj.hasOwnProperty(key)) {
          if (
            [
              "publishedDt",
              "previewCoverUrl",
              "coverUrl",
              "createdDt",
              "updatedDt",
              "cover",
              "previewCover",
              "specPriceid"
            ].indexOf(key) < 0
          ) {
            if (key === "isActive") {
              if (articleObj[key]) {
                formData.append(`spec_price[${key}]`, "1");
              } else {
                formData.append(`spec_price[${key}]`, "0");
              }
            } else {
              formData.append(`spec_price[${key}]`, articleObj[key]);
            }
          }
        }
      }
      if (articleObj.specPriceid !== undefined) {
        this.$store
          .dispatch("heading/updatePrice", {
            data: formData,
            price: articleObj
          })
          .then(() => {
            this.snackBar.value = true;
            this.snackBar.text = "Спец цена обновлена";
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
          .dispatch("heading/createPrice", formData)
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
        .dispatch("heading/deletePrice", this.specPrice)
        .then(() => {
          this.deleteDialog = false;
          this.snackBar.value = true;
          this.snackBar.text = "Спец цена удалена";
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
      this.specPriceNew = {};
      if (this.$refs.form) {
        this.$refs.form.resetValidation();
      }
      if (this.$refs.form2) {
        this.$refs.form2.resetValidation();
      }
      this.$store.commit("heading/setPrice");
    }
  },
  computed: {
    ...mapState({
      specPrice: state => state.heading.oneSpecPrice,
      rubric: state => state.heading.oneRubric,
      snackBar: state => state.snackBar
    })
  },
  mounted() {
    this.$store.dispatch("heading/getAllRubrics").then(response => {
      if (response.data.result && !response.data.result.length) {
        this.create();
      }
    });
  },
  watch: {
    specPrice(value) {
      if (value.specPriceid) {
        this.isNew = false;
        this.specPriceNew = {};
        if (value && value.startDt) {
          this.date_from = new Date(value.startDt.split(" ")[0]).toISOString().substr(0, 10);
        }
        if (value && value.endDt) {
          this.date_to = new Date(value.endDt.split(" ")[0]).toISOString().substr(0, 10);
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.main-component-position {
  width: 100%;
}
</style>
