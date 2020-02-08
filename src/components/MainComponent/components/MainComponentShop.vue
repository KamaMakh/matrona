<template>
  <div class="main-component-shop">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12" sm="6" md="5">
          <v-text-field
            v-model="shop.storeName"
            label="Название торогового объекта"
            placeholder="Введите название торогового объекта"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="shop.storeCity"
            label="Город"
            placeholder="Введите горд"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="shop.storeAddress"
            label="Адрес магазина"
            placeholder="Введите адрес магазина"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="shop.storePhone"
            label="Телефон магазина"
            placeholder="Введите телефон магазина"
            :rules="rules"
            v-mask="mask"
          ></v-text-field>
          <v-text-field
            v-model="shop.position"
            label="Позиция"
            placeholder="Позиция"
            type="number"
            :rules="rules"
          ></v-text-field>

          <v-divider color="#333"></v-divider>
          <v-checkbox
            v-model="shop.mobile_notify"
            class="mx-2"
            label="Мобильное уведомление"
          ></v-checkbox>
          <v-divider color="#333"></v-divider>
          <v-checkbox
            v-model="shop.publish"
            class="mx-2"
            label="Опубликовать"
          ></v-checkbox>
        </v-col>
      </v-row>

      <GmapMap
        :center="{ lat: 10, lng: 10 }"
        :zoom="7"
        map-type-id="terrain"
        style="width: 500px; height: 300px"
      >
      </GmapMap>

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
import { mask } from "vue-the-mask";
export default {
  name: "MainComponentShop",
  directives: {
    mask
  },
  data() {
    return {
      mask: "+7-###-###-##-##",
      shop: {},
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
      this.shop = {};
    }
  }
};
</script>

<style scoped lang="scss">
.main-component-shop {
  width: 100%;
}
</style>
