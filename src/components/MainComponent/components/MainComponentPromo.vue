<template>
  <div class="main-component-promo">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12" sm="6" md="5">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="promo.date_from"
                label="Начало"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="promo.date_from" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(promo.date_from)"
                >OK</v-btn
              >
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="6" md="5">
          <v-menu
            ref="menu2"
            v-model="menu2"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="promo.date_to"
                label="Окончание"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="promo.date_to"
              :min="date"
              no-title
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu2.save(promo.date_to)"
                >OK</v-btn
              >
            </v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="5">
          <v-text-field
            v-model="promo.desc"
            label="Описание"
            placeholder="Описание"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="promo.limits"
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
          <v-file-input
            v-model="promo.cover"
            label="Обложка"
            filled
            prepend-icon="mdi-camera"
            show-size
          ></v-file-input>
          <v-divider color="#333"></v-divider>
          <v-checkbox
            v-model="promo.mobile_notify"
            class="mx-2"
            label="Мобильное уведомление"
          ></v-checkbox>
          <v-divider color="#333"></v-divider>
          <v-checkbox
            v-model="promo.publish"
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
  </div>
</template>

<script>
export default {
  name: "MainComponentPromo",
  data() {
    return {
      promo: {
        date_from: new Date().toISOString().substr(0, 10),
        date_to: new Date().toISOString().substr(0, 10)
      },
      valid: true,
      rules: [v => !!v || "Required"],
      loading: false,
      date: new Date().toISOString().substr(0, 10),
      date2: new Date().toISOString().substr(0, 10),
      menu: false,
      menu2: false
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
.main-component-promo {
  width: 100%;
}
</style>
