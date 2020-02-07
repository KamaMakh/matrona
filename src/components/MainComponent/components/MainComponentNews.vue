<template>
  <div class="main-component-news">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12" sm="8" md="5">
          <v-text-field
            v-model="article.articletitleShort"
            label="Кароткий заголовок для картинки"
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
          <v-row class="align-center mb-5">
            <v-col v-if="article.articleid && this.article.cover" cols="2">
              <viewer
                class="viewer"
                :images="[serverUrl + this.article.coverUrl]"
              >
                <img :src="serverUrl + this.article.coverUrl" alt="" />
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
          <v-radio-group
            class="mt-10 mb-8"
            v-model="article.articlecoverType"
            :rules="rules"
          >
            <v-row class="align-center mb-12">
              <v-col cols="2">
                <v-radio :value="'image'"></v-radio>
              </v-col>
              <v-col v-if="article.articleid && this.article.cover" cols="2">
                <viewer
                  class="viewer"
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
              <v-col cols="2">
                <v-radio :value="'video'"></v-radio>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="article.video_link"
                  label="Адрес видео-обложки"
                  placeholder="Введите ссылку"
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
          </v-radio-group>
          <v-divider color="#333"></v-divider>
          <v-radio-group
            class="mt-6"
            v-model="article.articleType"
            row
            :rules="rules"
          >
            <v-radio :value="1" label="Новость"></v-radio>
            <v-radio :value="2" label="Статья"></v-radio>
          </v-radio-group>
          <v-divider color="#333"></v-divider>
          <v-checkbox
            v-model="article.createNotification"
            class="mx-2"
            label="Мобильное уведомление"
          ></v-checkbox>
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
            small
            color="primary"
            class="mr-md-4 mr-lg-4 mr-sm-0 mb-4"
            @click="save"
            :disabled="!valid"
            :loading="loading"
            >Сохранить</v-btn
          >
          <v-btn small color="error" class="mb-4" @click="remove"
            >Удалить</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
    <v-btn color="pink" dark fixed bottom right fab @click="create">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
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
      rules: [v => !!v || "Required"],
      loading: false,
      serverUrl: serverUrl
    };
  },
  methods: {
    save() {
      if (!this.$refs.form.validate()) {
        this.loading = false;
        return;
      }
      let formData = new FormData();
      if (!this.article.hasOwnProperty("articleStatus")) {
        this.article["articleStatus"] = false;
      }
      if (!this.article.hasOwnProperty("createNotification")) {
        this.article["createNotification"] = false;
      }
      for (let key in this.article) {
        if (this.article.hasOwnProperty(key)) {
          if (key === "articleStatus") {
            if (this.article[key]) {
              formData.append(`article[${key}]`, "1");
            } else {
              formData.append(`article[${key}]`, "0");
            }
          } else if (key === "createNotification") {
            if (this.article[key]) {
              formData.append(`article[${key}]`, "1");
            } else {
              formData.append(`article[${key}]`, "0");
            }
          } else {
            formData.append(`article[${key}]`, this.article[key]);
          }
        }
      }

      /* eslint-disable */
      if (this.article.id) {
        //ignore
      } else {
        this.$store
          .dispatch("news/createNews", formData)
          .then(response => {
            console.log(response);
          })
          .catch(e => {
            console.error(e);
          });
      }
    },
    remove() {
      alert("Тут будет удаление");
    },
    create() {
      this.$refs.form.resetValidation();
      this.$refs.form.reset();
      this.$store.commit("news/clearArticle");
    }
  },
  computed: {
    ...mapState({
      news: state => state.news.news,
      article: state => state.news.oneNews
    })
  },
  mounted() {
    this.$store.dispatch("news/getAllNews");
  }
};
</script>

<style scoped>
.viewer img {
  max-width: 100%;
  width: 100%;
  height: 100%;
}
</style>
