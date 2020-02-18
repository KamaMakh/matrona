<template>
  <div class="main-component-shop">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      v-show="this.shop.storeid && !isNew"
    >
      <v-row>
        <v-col cols="12" sm="12" md="8">
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
            v-model="shop.storeLng"
            label="Долгота"
            placeholder="Введите координаты"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="shop.storeLat"
            label="Широта"
            placeholder="Введите координаты"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="shop.position"
            label="Позиция"
            placeholder="Позиция"
            type="number"
            :rules="rules"
          ></v-text-field>

          <v-divider color="#333"></v-divider>
          <!--<v-checkbox-->
          <!--v-model="shop.createNotification"-->
          <!--class="mx-2"-->
          <!--label="Мобильное уведомление"-->
          <!--&gt;</v-checkbox>-->
          <v-divider color="#333"></v-divider>
          <v-checkbox
            v-model="shop.isActive"
            class="mx-2"
            label="Опубликовать"
          ></v-checkbox>
        </v-col>
      </v-row>

      <!--<GmapMap-->
      <!--:center="{ lat: 10, lng: 10 }"-->
      <!--:zoom="7"-->
      <!--map-type-id="terrain"-->
      <!--style="width: 500px; height: 300px"-->
      <!--&gt;-->
      <!--</GmapMap>-->

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

    <v-form v-if="isNew" ref="form2" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12" sm="12" md="8">
          <v-text-field
            v-model="storeNew.storeName"
            label="Название торогового объекта"
            placeholder="Введите название торогового объекта"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="storeNew.storeCity"
            label="Город"
            placeholder="Введите горд"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="storeNew.storeAddress"
            label="Адрес магазина"
            placeholder="Введите адрес магазина"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="storeNew.storePhone"
            label="Телефон магазина"
            placeholder="Введите телефон магазина"
            :rules="rules"
            v-mask="mask"
          ></v-text-field>
          <v-text-field
            v-model="storeNew.storeLng"
            label="Долгота"
            placeholder="Введите координаты"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="storeNew.storeLat"
            label="Широта"
            placeholder="Введите координаты"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            v-model="storeNew.position"
            label="Позиция"
            placeholder="Позиция"
            type="number"
            :rules="rules"
          ></v-text-field>

          <v-divider color="#333"></v-divider>
          <v-checkbox
            v-model="storeNew.createNotification"
            class="mx-2"
            label="Мобильное уведомление"
          ></v-checkbox>
          <v-divider color="#333"></v-divider>
          <v-checkbox
            v-model="storeNew.isActive"
            class="mx-2"
            label="Опубликовать"
          ></v-checkbox>
        </v-col>
      </v-row>

      <!--<GmapMap-->
      <!--:center="{ lat: 10, lng: 10 }"-->
      <!--:zoom="7"-->
      <!--map-type-id="terrain"-->
      <!--style="width: 500px; height: 300px"-->
      <!--&gt;-->
      <!--</GmapMap>-->

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
          >Удалить магазин {{ shop.storeName }}?</v-card-title
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
import { mask } from "vue-the-mask";
import { mapState } from "vuex";
export default {
  name: "MainComponentShop",
  directives: {
    mask
  },
  data() {
    return {
      mask: "+7-###-###-##-##",
      valid: true,
      rules: [v => !!v || "Обязательно для заполнения"],
      loading: false,
      isNew: false,
      storeNew: {},
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
        shopObj = !this.isNew ? this.shop : this.storeNew;
      if (!shopObj.hasOwnProperty("isActive")) {
        shopObj["isActive"] = false;
      }
      if (!shopObj.hasOwnProperty("createNotification")) {
        shopObj["createNotification"] = false;
      }

      for (let key in shopObj) {
        if (shopObj.hasOwnProperty(key)) {
          if (
            ["storeid", "publishedDt", "createdDt", "updatedDt"].indexOf(key) <
            0
          ) {
            if (key === "isActive") {
              if (shopObj[key]) {
                formData.append(`store[${key}]`, "1");
              } else {
                formData.append(`store[${key}]`, "0");
              }
            } else if (key === "createNotification") {
              if (shopObj[key]) {
                formData.append(`store[${key}]`, "1");
              } else {
                formData.append(`store[${key}]`, "0");
              }
            } else {
              formData.append(`store[${key}]`, shopObj[key]);
            }
          }
        }
      }

      if (shopObj.storeid !== undefined) {
        this.$store
          .dispatch("shop/updateStore", {
            data: formData,
            store: shopObj
          })
          .then(() => {
            this.snackBar.value = true;
            this.snackBar.text = "Магазин обновлен";
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
          .dispatch("shop/createStore", formData)
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
        .dispatch("shop/deleteStore", this.shop)
        .then(() => {
          this.deleteDialog = false;
          this.snackBar.value = true;
          this.snackBar.text = "Магазин удален";
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
      stores: state => state.shop.stores,
      shop: state => state.shop.oneStore,
      snackBar: state => state.snackBar
    })
  },
  mounted() {
    this.$store.dispatch("shop/getAllStores").then(response => {
      if (response.data.result && !response.data.result.length) {
        this.create();
      }
    });
  },
  watch: {
    shop() {
      this.isNew = false;
      this.storeNew = {};
    }
  }
};
</script>

<style scoped lang="scss">
.main-component-shop {
  width: 100%;
}
</style>
