<template>
  <div class="main-component-position">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12" sm="6" md="5">
          <v-row>
            <v-col>
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
                    v-model="position.date_from"
                    label="Начало"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="position.date_from"
                  :max="position.date_to"
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
                    @click="$refs.menu.save(position.date_from)"
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
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="position.date_to"
                    label="Окончание"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="position.date_to"
                  :min="position.date_from"
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu2 = false"
                    >Cancel</v-btn
                  >
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu2.save(position.date_to)"
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-text-field
            v-model="position.sale"
            label="Скидка"
            placeholder="Скидка"
            type="number"
            :rules="rules"
          ></v-text-field>
          <v-row>
            <v-col>
              <v-text-field
                v-model="position.price1"
                label="Цена 1"
                placeholder="Цена 1"
                type="number"
                :rules="rules"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="position.price2"
                label="Цена 2"
                placeholder="Цена 2"
                type="number"
                :rules="rules"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-text-field
            v-model="position.desc"
            label="Описание"
            placeholder="Описание"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="position.limits"
            label="Ограничения"
            placeholder="Ограничения"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="position.position"
            label="Позиция"
            placeholder="Позиция"
            type="number"
            :rules="rules"
          ></v-text-field>
          <v-divider color="#333"></v-divider>
          <v-checkbox
            v-model="position.mobile_notify"
            class="mx-2"
            label="Мобильное уведомление"
          ></v-checkbox>
          <v-divider color="#333"></v-divider>
          <v-checkbox
            v-model="position.publish"
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
  name: "MainComponentPosition",
  data() {
    return {
      position: {
        date_from: new Date().toISOString().substr(0, 10),
        date_to: new Date().toISOString().substr(0, 10)
      },
      valid: true,
      rules: [v => !!v || "Required"],
      loading: false,
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
.main-component-position {
  width: 100%;
}
</style>
