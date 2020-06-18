<template>
  <div class="main-component-promo">
    <v-form
      ref="form"
      v-show="this.promo.stockid && !isNew"
      v-model="valid"
      lazy-validation
    >
      <v-row>
        <v-col cols="12" sm="12" md="8">
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
                    ref="dateFrom"
                    v-model="date_from"
                    label="Начало"
                    :rules="dateFromRule"
                    prepend-icon="event"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date_from"
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
          <!--<v-textarea-->
          <!--rows="1"-->
          <!--auto-grow-->
          <!--v-model="promo.description"-->
          <!--label="Описание"-->
          <!--placeholder="Описание"-->
          <!--:rules="rules"-->
          <!--&gt;</v-textarea>-->
          <v-row>
            <v-col cols="12" sm="6">
              <v-textarea
                rows="1"
                auto-grow
                v-model="promo.description"
                label="Описание"
                placeholder="Описание"
                :rules="rules"
                @input="markdownRender(promo.description)"
              ></v-textarea>
            </v-col>
            <v-col cols="12" sm="6">
              <markdown-it-vue
                v-if="promo.description"
                class="md-body"
                style="border-bottom: 1px solid;"
                :content="content"
                :options="options"
              />
              <vue-markdown style="display: none;">
                {{ promo.description }}
              </vue-markdown>
            </v-col>
          </v-row>
          <v-textarea
            rows="1"
            auto-grow
            v-model="promo.limitation"
            label="Ограничения"
            placeholder="Ограничения"
            :rules="rules"
          ></v-textarea>
          <v-text-field
            v-model="promo.position"
            label="Позиция"
            placeholder="Позиция"
            type="number"
            step="0.1"
            :rules="rules"
          ></v-text-field>
          <v-row class="align-center">
            <v-col cols="12" class="font-weight-bold">
              Обложка для карточки
            </v-col>
            <v-col v-if="promo.stockSchemaid && this.promo.cover" cols="5">
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
          <v-divider color="#333"></v-divider>
          <v-checkbox
            v-model="promo.isActive"
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
                :return-value.sync="promoNew.startDt"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="date_from"
                    label="Начало"
                    ref="dateFrom"
                    :rules="dateFromRule"
                    prepend-icon="event"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date_from"
                  no-title
                  scrollable
                  locale="ru"
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
                :return-value.sync="promoNew.endDt"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="date_to"
                    label="Окончание"
                    prepend-icon="event"
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
                  @input="
                    menu4 = false;
                    $refs.dateFrom.validate();
                  "
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
          <!--<v-textarea-->
          <!--rows="1"-->
          <!--auto-grow-->
          <!--v-model="promoNew.description"-->
          <!--label="Описание"-->
          <!--placeholder="Описание"-->
          <!--:rules="rules"-->
          <!--&gt;</v-textarea>-->
          <v-row>
            <v-col cols="12" sm="6">
              <v-textarea
                rows="1"
                auto-grow
                v-model="promoNew.description"
                label="Описание"
                placeholder="Описание"
                :rules="rules"
                @input="markdownRender(promoNew.description)"
              ></v-textarea>
            </v-col>
            <v-col cols="12" sm="6">
              <markdown-it-vue
                v-if="promoNew.description"
                class="md-body"
                style="border-bottom: 1px solid;"
                :content="content"
                :options="options"
              />
              <vue-markdown style="display: none;">
                {{ promoNew.description }}
              </vue-markdown>
            </v-col>
          </v-row>
          <v-textarea
            rows="1"
            auto-grow
            v-model="promoNew.limitation"
            label="Ограничения"
            placeholder="Ограничения"
            :rules="rules"
          ></v-textarea>
          <v-text-field
            v-model="promoNew.position"
            label="Позиция"
            placeholder="Позиция"
            type="number"
            step="0.1"
            :rules="rules"
          ></v-text-field>
          <v-col cols="12" class="font-weight-bold">
            Обложка для карточки
          </v-col>
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
            v-model="promoNew.createNotification"
            class="mx-2"
            label="Мобильное уведомление"
          ></v-checkbox>
          <v-divider color="#333"></v-divider>
          <v-checkbox
            v-model="promoNew.isActive"
            class="mx-2"
            label="Опубликовать"
          ></v-checkbox>
        </v-col>
      </v-row>

      <v-card v-if="promoNew.createNotification" max-width="640">
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
          >Удалить вопрос <br />
          {{ promo.description | truncate }}?</v-card-title
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
import MarkdownItVue from "markdown-it-vue";
import "markdown-it-vue/dist/markdown-it-vue.css";
import VueMarkdown from "vue-markdown";
export default {
  name: "MainComponentPromo",
  components: {
    MarkdownItVue,
    VueMarkdown
  },
  beforeRouteLeave(to, from, next) {
    if (
      (this.isNew && Object.keys(this.promoNew).length) ||
      JSON.stringify(this.promo) !=
        JSON.stringify(this.$store.state.mechanics.oneStock)
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
      date_from: new Date().toISOString().substr(0, 10),
      date_to: new Date().toISOString().substr(0, 10),
      valid: true,
      rules: [v => !!v || "Обязательно для заполнения"],
      dateFromRule: [
        v => {
          return (
            new Date(v) <= new Date(this.date_to) ||
            "Дата начала не может быть позже даты конца периода"
          );
        }
      ],
      loading: false,
      menu: false,
      menu2: false,
      menu3: false,
      menu4: false,
      serverUrl: serverUrl,
      options: {
        markdownIt: {
          linkify: true
        },
        linkAttributes: {
          attrs: {
            target: "_blank",
            rel: "noopener"
          }
        }
      },
      content: "",
      isNew: false,
      promoNew: {},
      deleteDialog: false,
      sms: {
        who: "all",
        title: "",
        body: "",
        phones: ""
      }
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
      promoObj["startDt"] = this.date_from + "T00:00:00";
      promoObj["endDt"] = this.date_to + "T00:00:00";
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
              "previewCover",
              "tempTime",
              "sendNotification"
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

            if (key === "createNotification" || !this.isNew) {
              if (promoObj[key]) {
                formData.append(
                  `stock[sendNotification][type]`,
                  this.sms.who === "all" ? 1 : 2
                );
                formData.append(
                  `stock[sendNotification][title]`,
                  this.sms.title ? this.sms.title : null
                );
                formData.append(
                  `stock[sendNotification][body]`,
                  this.sms.body ? this.sms.body : null
                );
                formData.append(
                  `stock[sendNotification][phones]`,
                  this.sms.phones ? this.sms.phones : null
                );
              }
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
      this.promoNew = {};
      if (this.$refs.form) {
        // this.$refs.form.resetValidation();
      }
      if (this.$refs.form2) {
        this.$refs.form2.resetValidation();
      }
      this.$store.commit("mechanics/setPromo");
    },
    markdownRender(value) {
      this.content = "";
      this.content = value;
    }
  },
  computed: {
    ...mapState({
      promo: state => JSON.parse(JSON.stringify(state.mechanics.oneStock)),
      schema: state => state.mechanics.oneSchema,
      snackBar: state => state.snackBar,
      filter: state => state.filter
    })
  },
  mounted() {
    this.$store.dispatch("mechanics/getAllSchemas").then(response => {
      if (response.data.result && !response.data.result.length) {
        this.create();
      }
    });
  },
  watch: {
    promo(value) {
      if (value.stockid) {
        this.isNew = false;
        this.promoNew = {};
        if (value && value.startDt) {
          this.date_from = new Date(value.startDt.split(" ")[0])
            .toISOString()
            .substr(0, 10);
        }
        if (value && value.endDt) {
          this.date_to = new Date(value.endDt.split(" ")[0])
            .toISOString()
            .substr(0, 10);
        }
        this.content = value.description;
      }
    },
    filter() {
      this.$store.commit("mechanics/setPromo");
    },
    date_to() {
      this.$refs.dateFrom.validate();
    }
  }
};
</script>
