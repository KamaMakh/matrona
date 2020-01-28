<template>
  <div class="main-component-news">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12" sm="8" md="5">
          <v-text-field
            v-model="article.short_name"
            label="Кароткия заголовок для картинки"
            placeholder="Введите кароткий заголовок"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="article.name"
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
          <v-file-input
            v-model="article.card_file"
            label="Обложка для карточки"
            filled
            prepend-icon="mdi-camera"
            show-size
          ></v-file-input>
          <v-divider color="#333"></v-divider>
          <v-radio-group
            class="mt-10 mb-8"
            v-model="article.back_file"
            :rules="rules"
          >
            <v-row class="align-center mb-12">
              <v-col cols="2">
                <v-radio :value="1"></v-radio>
              </v-col>
              <v-col>
                <v-file-input
                  v-model="article.show_file"
                  label="Обложка для экрана просмотра"
                  filled
                  prepend-icon="mdi-camera"
                  show-size
                  hide-details
                ></v-file-input>
              </v-col>
            </v-row>
            <v-row class="align-center">
              <v-col cols="2">
                <v-radio :value="2"></v-radio>
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
          <v-radio-group class="mt-6" v-model="article.type" row :rules="rules">
            <v-radio :value="1" label="Новость"></v-radio>
            <v-radio :value="2" label="Статья"></v-radio>
          </v-radio-group>
          <v-divider color="#333"></v-divider>
          <v-checkbox
            v-model="article.mobile_notify"
            class="mx-2"
            label="Мобильное уведомление"
          ></v-checkbox>
          <v-divider color="#333"></v-divider>
          <v-checkbox
            v-model="article.publish"
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
export default {
  name: "MainComponentNews",
  data() {
    return {
      article: {},
      valid: true,
      rules: [v => !!v || "Required"],
      loading: false
    };
  },
  methods: {
    save() {
      if (!this.$refs.form.validate()) {
        this.loading = false;
        return;
      }
    },
    remove() {
      alert("Тут будет удаление");
    },
    create() {
      this.$refs.form.resetValidation();
      this.$refs.form.reset();
      this.article = {};
    }
  }
};
</script>

<style scoped lang="scss">
.main-component-news {
  width: 100%;
}
</style>
