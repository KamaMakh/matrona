<template>
  <div class="main-component-promo">
    <v-form
      ref="form"
      v-show="this.promo.stockid && !isNew"
      v-model="valid"
      lazy-validation
    >
      <v-row>
        <v-col cols="12" sm="6" md="5">
          <v-row>
            <v-col>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="promo.startDt"
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
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false"
                    >Cancel</v-btn
                  >
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(date_from)"
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col>
              <v-menu
                ref="menu2"
                v-model="menu2"
                :close-on-content-click="false"
                :return-value.sync="promo.endDt"
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
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu2 = false"
                    >Cancel</v-btn
                  >
                  <v-btn text color="primary" @click="$refs.menu2.save(date_to)"
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-text-field
            v-model="promo.description"
            label="Описание"
            placeholder="Описание"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="promo.limitation"
            label="Ограничения"
            placeholder="Ограничения"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="promo.position"
            label="Позиция"
            placeholder="Позиция"
            type="number"
            :rules="rules"
          ></v-text-field>
          <v-row class="align-center mb-5">
            <v-col v-if="promo.stockSchemaid && this.promo.cover" cols="2">
              <viewer
                class="main-component-promo__viewer"
                :images="[serverUrl + this.promo.coverUrl]"
              >
                <img :src="serverUrl + this.promo.coverUrl" alt="" />
              </viewer>
            </v-col>
            <v-col>
              <v-file-input
                v-model="promo.coverFile"
                label="Обложка для карточки"
                filled
                prepend-icon="mdi-camera"
                show-size
                accept=".png, .jpg, .jpeg, .gif"
              ></v-file-input>
            </v-col>
          </v-row>
          <!-- <v-file-input
            v-model="promo.coverFile"
            label="Обложка"
            filled
            prepend-icon="mdi-camera"
            show-size
          ></v-file-input> -->
          <v-divider color="#333"></v-divider>
          <v-checkbox
            v-model="promo.isActive"
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
            @click="deleteDialog = true"
            :loading="loading"
            small
            color="error"
            class="mb-4"
            >Удалить</v-btn
          >
        </v-col>
      </v-row>
    </v-form>

    <v-form ref="form2" v-if="isNew" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12" sm="6" md="5">
          <v-row>
            <v-col>
              <v-menu
                ref="menu3"
                v-model="menu3"
                :close-on-content-click="false"
                :return-value.sync="promoNew.startDt"
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
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu3 = false"
                    >Cancel</v-btn
                  >
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu3.save(date_from)"
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col>
              <v-menu
                ref="menu4"
                v-model="menu4"
                :close-on-content-click="false"
                :return-value.sync="promo.endDt"
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
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu4 = false"
                    >Cancel</v-btn
                  >
                  <v-btn text color="primary" @click="$refs.menu4.save(date_to)"
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-text-field
            v-model="promoNew.description"
            label="Описание"
            placeholder="Описание"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="promoNew.limitation"
            label="Ограничения"
            placeholder="Ограничения"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="promoNew.position"
            label="Позиция"
            placeholder="Позиция"
            type="number"
            :rules="rules"
          ></v-text-field>
          <v-file-input
            v-model="promoNew.coverFile"
            label="Обложка для карточки"
            filled
            prepend-icon="mdi-camera"
            show-size
            accept=".png, .jpg, .jpeg, .gif"
          ></v-file-input>
          <v-divider color="#333"></v-divider>
          <v-checkbox
            v-model="promoNew.isActive"
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

    <v-btn
      v-if="schema && schema.stockSchemaid"
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
          >Удалить вопрос {{ promo.description | truncate }}?</v-card-title
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
import "../assets/css/MainComponentPromo.css";
export default {
  name: "MainComponentPromo",
  data() {
    return {
      date_from: new Date().toISOString().substr(0, 10),
      date_to: new Date().toISOString().substr(0, 10),
      valid: true,
      rules: [v => !!v || "Required"],
      loading: false,
      menu: false,
      menu2: false,
      menu3: false,
      menu4: false,
      serverUrl: serverUrl,
      isNew: false,
      promoNew: {},
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
        promoObj = !this.isNew ? this.promo : this.promoNew;
      if (!promoObj.hasOwnProperty("isActive")) {
        promoObj["isActive"] = false;
      }
      promoObj["stockSchemaid"] = this.schema.stockSchemaid;
      promoObj["startDt"] = this.date_from + "T00:00:00+03:00";
      promoObj["endDt"] = this.date_to + "T00:00:00+03:00";
      for (let key in promoObj) {
        if (promoObj.hasOwnProperty(key)) {
          if (
            [
              "stockid",
              "publishedDt",
              "previewCoverUrl",
              "coverUrl",
              "createdDt",
              "updatedDt",
              "cover",
              "previewCover"
            ].indexOf(key) < 0
          ) {
            if (key === "isActive") {
              if (promoObj[key]) {
                formData.append(`stock[${key}]`, "1");
              } else {
                formData.append(`stock[${key}]`, "0");
              }
            } else {
              formData.append(`stock[${key}]`, promoObj[key]);
            }
          }
        }
      }
      if (promoObj.stockid !== undefined) {
        this.$store
          .dispatch("mechanics/updatePromo", {
            data: formData,
            promo: promoObj
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
          .dispatch("mechanics/createPromo", formData)
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
        .dispatch("mechanics/deletePromo", this.promo)
        .then(() => {
          this.deleteDialog = false;
          this.snackBar.value = true;
          this.snackBar.text = "Акция удалена";
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
        // this.$refs.form.resetValidation();
      }
    }
  },
  computed: {
    ...mapState({
      promo: state => state.mechanics.oneStock,
      schema: state => state.mechanics.oneSchema,
      snackBar: state => state.snackBar
    })
  },
  mounted() {
    this.$store.dispatch("mechanics/getAllSchemas");
  },
  watch: {
    promo(value) {
      this.isNew = false;
      this.promoNew = {};
      if (value && value.startDt) {
        this.date_from = new Date(value.startDt).toISOString().substr(0, 10);
      }
      if (value && value.endDt) {
        this.date_to = new Date(value.endDt).toISOString().substr(0, 10);
      }
    }
  }
};
</script>
