<template>
  <div class="main-component-shop">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      v-show="this.shop.storeid && !isNew"
      @submit.prevent="save"
    >
      <v-row>
        <v-col cols="12" sm="12" md="8">
          <v-textarea
            rows="1"
            auto-grow
            v-model="shop.storeName"
            label="Название торогового объекта"
            placeholder="Введите название торогового объекта"
            :rules="rules"
          ></v-textarea>
          <v-textarea
            rows="1"
            auto-grow
            v-model="shop.storeCity"
            label="Город"
            placeholder="Введите горд"
            :rules="rules"
          ></v-textarea>
          <v-textarea
            rows="1"
            auto-grow
            v-model="shop.storeAddress"
            label="Адрес магазина"
            placeholder="Введите адрес магазина"
            :rules="rules"
          ></v-textarea>
          <v-text-field
            rows="1"
            auto-grow
            v-model="shop.storePhone"
            label="Телефон магазина"
            placeholder="Введите телефон магазина"
            :rules="rules"
            v-mask="mask"
          ></v-text-field>

          <h2 class="map-title">Поиск адреса</h2>
          <vue-google-autocomplete
            id="map"
            classname="form-control"
            placeholder="Начните писать..."
            v-on:placechanged="getAddressData"
          >
          </vue-google-autocomplete>
          <div id="googleMap" style="width:100%;height:350px;"></div>

          <v-row>
            <v-col>
              <v-text-field
                v-model="shop.storeLng"
                label="Долгота"
                placeholder="Введите координаты"
                :rules="rules"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="shop.storeLat"
                label="Широта"
                placeholder="Введите координаты"
                :rules="rules"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-text-field
            v-model="shop.position"
            label="Позиция"
            placeholder="Позиция"
            type="number"
            step="0.1"
            :rules="rules"
          ></v-text-field>
          <v-divider color="#333"></v-divider>
          <v-checkbox
            v-model="shop.isActive"
            class="mx-2"
            label="Опубликовать"
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

    <v-form v-if="isNew" ref="form2" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12" sm="12" md="8">
          <v-textarea
            rows="1"
            auto-grow
            v-model="storeNew.storeName"
            label="Название торогового объекта"
            placeholder="Введите название торогового объекта"
            :rules="rules"
          ></v-textarea>
          <v-textarea
            rows="1"
            auto-grow
            v-model="storeNew.storeCity"
            label="Город"
            placeholder="Введите горд"
            :rules="rules"
          ></v-textarea>
          <v-textarea
            rows="1"
            auto-grow
            v-model="storeNew.storeAddress"
            label="Адрес магазина"
            placeholder="Введите адрес магазина"
            :rules="rules"
          ></v-textarea>
          <v-text-field
            v-model="storeNew.storePhone"
            label="Телефон магазина"
            placeholder="Введите телефон магазина"
            :rules="rules"
            v-mask="mask"
          ></v-text-field>
          <h2 class="map-title">Поиск адреса</h2>
          <vue-google-autocomplete
            id="map2"
            classname="form-control"
            placeholder="Начните писать..."
            v-on:placechanged="getAddressData"
          >
          </vue-google-autocomplete>
          <div id="googleMap2" style="width:100%;height:350px;"></div>
          <v-row>
            <v-col>
              <v-text-field
                v-model="storeNew.storeLng"
                label="Долгота"
                placeholder="Введите координаты"
                :rules="rules"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="storeNew.storeLat"
                label="Широта"
                placeholder="Введите координаты"
                :rules="rules"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-text-field
            v-model="storeNew.position"
            label="Позиция"
            placeholder="Позиция"
            type="number"
            step="0.1"
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
          >Удалить магазин <br />
          {{ shop.storeName }}?</v-card-title
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
import VueGoogleAutocomplete from "vue-google-autocomplete";
export default {
  name: "MainComponentShop",
  beforeRouteLeave(to, from, next) {
    /* eslint-disable */
    let edited = false;
    if (Object.keys(this.shop).length && !this.isNew) {
      this.shop["storePhone"] = this.formattedPhone(this.shop["storePhone"]);
      this.shop["storeLat"] = this.shop["storeLat"] + "";
      this.shop["storeLng"] = this.shop["storeLng"] + "";
      if (
        JSON.stringify(this.shop) !=
        JSON.stringify(this.$store.state.shop.oneStore)
      ) {
        edited = true;
      }
    }
    if (this.isNew && Object.keys(this.storeNew).length) {
      for(let i in this.storeNew) {
        if(this.storeNew.hasOwnProperty(i) && this.storeNew[i] !== undefined && this.storeNew[i] !== null) {
          edited = true;
        }
      }
    }
    if (edited) {
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
  directives: {
    mask
  },
  components: {
    VueGoogleAutocomplete
  },
  data() {
    return {
      mask: "+7-###-###-##-##",
      valid: true,
      rules: [v => !!v || "Обязательно для заполнения"],
      loading: false,
      isNew: false,
      storeNew: {
        storeCity: null,
        storeAddress: null,
        storeLng: null,
        storeLat: null
      },
      deleteDialog: false,
      markers: [],
      center: {
        lat: 51.508742,
        lng: -0.12085
      },
      places: [],
      currentPlace: null,
      map: null,
      mapNew: null
    };
  },
  methods: {
    /* eslint-disable */
    formattedPhone(value) {
      return value.replace("+","").replace(/-/g,"");
    },
    getAddressData(place) {
      if (this.isNew) {
        if (place) {
          this.storeNew.storeCity = place.locality;
          this.storeNew.storeAddress = place.route;
          this.center.lat = place.latitude;
          this.center.lng = place.longitude;
          this.map.setCenter({ lat: place.latitude, lng: place.longitude });
        }
      } else {
        if (place) {
          this.shop.storeCity = place.locality;
          this.shop.storeAddress = place.route;

          this.center.lat = place.latitude;
          this.center.lng = place.longitude;
          this.map.setCenter({ lat: place.latitude, lng: place.longitude });
        }
      }
    },
    myMap() {
      let mapProp = {
        center: new google.maps.LatLng(this.center.lat, this.center.lng),
        zoom: 15
      };
      this.map = new google.maps.Map(
        document.getElementById("googleMap"),
        mapProp
      );
      this.map.addListener("click", event => {
        this.addMarker(event.latLng);
      });
    },
    addMarker(location) {
      let marker = new google.maps.Marker({
        position: location,
        map: this.map,
        animation: google.maps.Animation.BOUNCE //DROP
      });
      this.setShopCoords(location);
      google.maps.event.addListener(marker, "click", event => {
        this.setShopCoords(event.latLng);
      });

      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
      this.markers.push(marker);
    },
    setShopCoords(location) {
      if (this.isNew) {
        this.storeNew.storeLng = location.lng();
        this.storeNew.storeLat = location.lat();
      } else {
        this.shop.storeLng = location.lng();
        this.shop.storeLat = location.lat();
      }
    },
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
            this.getData();
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
            this.getData();
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
      this.storeNew = {
        storeCity: null,
        storeAddress: null,
        storeLng: null,
        storeLat: null
      };
      if (this.$refs.form) {
        this.$refs.form.resetValidation();
      }
      if (this.$refs.form2) {
        this.$refs.form2.resetValidation();
      }
      setTimeout(() => {
        let mapProp = {
          center: new google.maps.LatLng(this.center.lat, this.center.lng),
          zoom: 15
        };
        this.map = new google.maps.Map(
          document.getElementById("googleMap2"),
          mapProp
        );
        this.map.addListener("click", event => {
          this.addMarker(event.latLng);
        });
        this.$store.commit("shop/setStore");
      }, 500);
      this.$store.commit("shop/setStore");
    },
    getData() {
      this.$store.dispatch("shop/getAllStores").then(response => {
        if (response.data.result && !response.data.result.length) {
          this.create();
        }
      });
      this.myMap();
    }
  },
  computed: {
    ...mapState({
      stores: state => state.shop.stores,
      shop: state => JSON.parse(JSON.stringify(state.shop.oneStore)),
      shopMap: state => state.shop.map,
      snackBar: state => state.snackBar
    })
  },
  mounted() {
    this.getData();
  },
  watch: {
    shop(value) {
      if (value.storeid) {
        this.isNew = false;
        this.storeNew = {};
      }
    },
    shopMap() {
      this.map.setCenter({
        lat: parseFloat(parseFloat(this.shop.storeLat)),
        lng: parseFloat(parseFloat(this.shop.storeLng))
      });
      let latLng = new google.maps.LatLng(this.shop.storeLat, this.shop.storeLng);
      this.addMarker(latLng);
    }
  }
};
</script>

<style scoped lang="scss">
.main-component-shop {
  width: 100%;
}
</style>
