<template>
  <div class="main-component-news">
    <v-form
      ref="form"
      v-show="this.article.articleid && !isNew"
      v-model="valid"
      lazy-validation
    >
      <v-row>
        <v-col cols="12" sm="12" md="8" xs="12">
          <v-text-field
            v-model="article.articletitleShort"
            label="Короткий заголовок для картинки"
            placeholder="Введите кароткий заголовок"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="article.articletitle"
            label="Заголовок"
            placeholder="Введите заголовок"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="article.position"
            label="Позиция"
            placeholder="Позиция"
            type="number"
            :rules="rules"
          ></v-text-field>
          <v-textarea
            label="Содержимое"
            placeholder="Введите текст"
            v-model="article.articlecontent"
            :rules="rules"
          ></v-textarea>
          <v-row class="align-center">
            <v-col v-if="article.articleid" cols="2" sm="5">
              <viewer
                class="main-component-news__viewer"
                :images="[serverUrl + this.article.previewCoverUrl]"
              >
                <img :src="serverUrl + this.article.previewCoverUrl" alt="" />
              </viewer>
            </v-col>
            <v-col>
              <v-file-input
                v-model="article.previewCoverFile"
                label="Обложка для карточки"
                filled
                prepend-icon="mdi-camera"
                show-size
                accept=".png, .jpg, .jpeg, .gif"
              ></v-file-input>
            </v-col>
          </v-row>
          <v-divider color="#333"></v-divider>
          <v-radio-group v-model="article.articlecoverType" :rules="rules">
            <v-row class="align-center">
              <v-col cols="2" sm="1">
                <v-radio :value="'image'"></v-radio>
              </v-col>
              <v-col v-if="article.articleid" cols="2" sm="5">
                <viewer
                  class="main-component-news__viewer"
                  :images="[serverUrl + this.article.coverUrl]"
                >
                  <img :src="serverUrl + this.article.coverUrl" alt="" />
                </viewer>
              </v-col>
              <v-col>
                <v-file-input
                  v-model="article.coverFile"
                  label="Обложка для экрана просмотра"
                  filled
                  prepend-icon="mdi-camera"
                  show-size
                  hide-details
                  accept=".png, .jpg, .jpeg, .gif"
                ></v-file-input>
              </v-col>
            </v-row>
            <v-row class="align-center">
              <v-col cols="2" sm="1">
                <v-radio :value="'video'"></v-radio>
              </v-col>
              <v-col
                v-if="
                  article.articleid &&
                    article.cover &&
                    article.articlecoverType === 'video'
                "
                cols="2"
                sm="5"
              >
                <iframe
                  width="250"
                  :src="article.cover"
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="article.videoLink"
                  label="Адрес видео-обложки"
                  placeholder="Введите ссылку"
                  hide-details
                  :rules="urlRules"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-radio-group>
          <v-divider color="#333"></v-divider>
          <v-radio-group v-model="article.articleType" row :rules="rules">
            <v-radio :value="1" label="Новость"></v-radio>
            <v-radio :value="2" label="Статья"></v-radio>
          </v-radio-group>
          <v-divider color="#333"></v-divider>
          <!--<v-checkbox-->
          <!--v-model="article.createNotification"-->
          <!--class="mx-2"-->
          <!--label="Мобильное уведомление"-->
          <!--&gt;</v-checkbox>-->
          <v-divider color="#333"></v-divider>
          <v-checkbox
            v-model="article.articleStatus"
            class="mx-2"
            label="Публикация"
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
          <v-text-field
            v-model="articleNew.articletitleShort"
            label="Короткий заголовок для картинки"
            placeholder="Введите кароткий заголовок"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="articleNew.articletitle"
            label="Заголовок"
            placeholder="Введите заголовок"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="articleNew.position"
            label="Позиция"
            placeholder="Позиция"
            type="number"
            :rules="rules"
          ></v-text-field>
          <v-textarea
            label="Содержимое"
            placeholder="Введите текст"
            v-model="articleNew.articlecontent"
            :rules="rules"
          ></v-textarea>
          <v-row class="align-center">
            <v-col>
              <v-file-input
                v-model="articleNew.previewCoverFile"
                label="Обложка для карточки"
                filled
                prepend-icon="mdi-camera"
                show-size
                accept=".png, .jpg, .jpeg, .gif"
              ></v-file-input>
            </v-col>
          </v-row>
          <v-divider color="#333"></v-divider>
          <v-radio-group v-model="articleNew.articlecoverType" :rules="rules">
            <v-row class="align-center">
              <v-col cols="2">
                <v-radio :value="'image'"></v-radio>
              </v-col>
              <v-col>
                <v-file-input
                  v-model="articleNew.coverFile"
                  label="Обложка для экрана просмотра"
                  filled
                  prepend-icon="mdi-camera"
                  show-size
                  hide-details
                  accept=".png, .jpg, .jpeg, .gif"
                ></v-file-input>
              </v-col>
            </v-row>
            <v-row class="align-center">
              <v-col cols="2">
                <v-radio :value="'video'"></v-radio>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="articleNew.videoLink"
                  label="Адрес видео-обложки"
                  :rules="urlRules"
                  placeholder="Введите ссылку"
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
          </v-radio-group>
          <v-divider color="#333"></v-divider>
          <v-radio-group
            class="mt-6"
            v-model="articleNew.articleType"
            row
            :rules="rules"
          >
            <v-radio :value="1" label="Новость"></v-radio>
            <v-radio :value="2" label="Статья"></v-radio>
          </v-radio-group>
          <v-divider color="#333"></v-divider>
          <v-checkbox
            v-model="articleNew.createNotification"
            class="mx-2"
            label="Мобильное уведомление"
          ></v-checkbox>
          <v-divider color="#333"></v-divider>
          <v-checkbox
            v-model="articleNew.articleStatus"
            class="mx-2"
            label="Публикация"
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
          >Удалить статью {{ article.articletitleShort }}?</v-card-title
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
import "../assets/css/MainComponentNews.css";
export default {
  name: "MainComponentNews",
  data() {
    return {
      valid: true,
      rules: [v => !!v || "Обязательно для заполнения"],
      urlRules: [
        str => {
          let pattern = new RegExp(
            "^(https?:\\/\\/)?" + // protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
            "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
              "(\\#[-a-z\\d_]*)?$",
            "i"
          ); // fragment locator
          if (str) {
            return !!pattern.test(str) || "URL не валидный";
          } else {
            return true;
          }
        }
      ],
      loading: false,
      serverUrl: serverUrl,
      isNew: false,
      articleNew: {},
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
        articleObj = !this.isNew ? this.article : this.articleNew;
      if (!articleObj.hasOwnProperty("articleStatus")) {
        articleObj["articleStatus"] = false;
      }
      if (!articleObj.hasOwnProperty("createNotification")) {
        articleObj["createNotification"] = false;
      }
      for (let key in articleObj) {
        if (articleObj.hasOwnProperty(key)) {
          if (
            [
              "publishedDt",
              "previewCoverUrl",
              "coverUrl",
              "createdDt",
              "updatedDt",
              "articleid",
              "cover",
              "previewCover"
            ].indexOf(key) < 0
          ) {
            if (key === "articleStatus") {
              if (articleObj[key]) {
                formData.append(`article[${key}]`, "1");
              } else {
                formData.append(`article[${key}]`, "0");
              }
            } else if (key === "createNotification") {
              if (articleObj[key]) {
                formData.append(`article[${key}]`, "1");
              } else {
                formData.append(`article[${key}]`, "0");
              }
            } else {
              formData.append(`article[${key}]`, articleObj[key]);
            }
          }
        }
      }
      if (articleObj.articleid !== undefined) {
        this.$store
          .dispatch("news/updateNews", {
            data: formData,
            article: articleObj
          })
          .then(() => {
            this.snackBar.value = true;
            this.snackBar.text = "Новость обновлена";
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
          .dispatch("news/createNews", formData)
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
        .dispatch("news/deleteNews", this.article)
        .then(() => {
          this.deleteDialog = false;
          this.snackBar.value = true;
          this.snackBar.text = "Новость удалена";
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
      news: state => state.news.news,
      article: state => state.news.oneNews,
      snackBar: state => state.snackBar
    })
  },
  mounted() {
    this.$store.dispatch("news/getAllNews").then(response => {
      if (response.data.result && !response.data.result.length) {
        this.create();
      }
    });
  },
  watch: {
    article() {
      this.isNew = false;
      this.articleNew = {};
    }
  }
};
</script>
