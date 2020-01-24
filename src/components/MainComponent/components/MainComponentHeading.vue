<template>
  <div class="main-component-heading">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12" sm="6" md="5">
          <v-text-field
            v-model="heading.name"
            label="Название рубрики"
            placeholder="Введите название рубрики"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="heading.position"
            label="Позиция"
            placeholder="Позиция"
            type="number"
            :rules="rules"
          ></v-text-field>
          <v-file-input
            v-model="heading.default_file"
            label="Дефолтная обложка"
            filled
            prepend-icon="mdi-camera"
            show-size
          ></v-file-input>
          <v-file-input
            v-model="heading.tematic_file"
            label="Тематическая обложка"
            filled
            prepend-icon="mdi-camera"
            show-size
          ></v-file-input>

          <v-divider color="#333"></v-divider>
          <v-checkbox
            v-model="heading.mobile_notify"
            class="mx-2"
            label="Мобильное уведомление"
          ></v-checkbox>
          <v-divider color="#333"></v-divider>
          <v-checkbox
            v-model="heading.publish"
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
  name: "MainComponentHeading",
  data() {
    return {
      heading: {},
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
.main-component-heading {
  width: 100%;
}
</style>
