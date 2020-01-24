<template>
  <div class="main-component-faq">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12" sm="6" md="5">
          <v-textarea
            label="Вопрос"
            placeholder="Текст вопроса"
            :rules="rules"
          ></v-textarea>
          <v-textarea
            label="Ответ"
            placeholder="Текст ответа"
            :rules="rules"
          ></v-textarea>
          <v-text-field
            v-model="faq.name"
            label="Позиция"
            placeholder="Позиция"
            :rules="rules"
          ></v-text-field>
          <v-checkbox
            v-model="faq.publish"
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
  name: "MainComponentFaq",
  data() {
    return {
      faq: {},
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
      this.faq = {};
    }
  }
};
</script>

<style scoped lang="scss">
.main-component-faq {
  width: 100%;
}
</style>
