<template>
  <div class="main-component-left-nav pr-1 pl-2">
    <div
      v-if="
        [
          'MainComponentFaq',
          'MainComponentShop',
          'MainComponentHeading',
          'MainComponentPosition'
        ].indexOf($route.name) < 0
      "
      class="filter-wrap"
    >
      <v-row class="ml-0 mr-0">
        <v-col class="d-flex" cols="6">
          <v-select
            v-model="filter.year"
            dark
            @input="filterList"
            :items="[
              2010,
              2011,
              2012,
              2013,
              2014,
              2015,
              2016,
              2017,
              2018,
              2019,
              2020,
              2021,
              2022,
              2023
            ]"
            label="Год"
          ></v-select>
        </v-col>
        <v-col class="d-flex" cols="6">
          <v-select
            v-model="filter.month"
            dark
            item-text="title"
            item-value="value"
            @input="filterList"
            :items="[
              { title: 'Январь', value: 1 },
              { title: 'Февраль', value: 2 },
              { title: 'Март', value: 3 },
              { title: 'Апрель', value: 4 },
              { title: 'Май', value: 5 },
              { title: 'Июнь', value: 6 },
              { title: 'Июль', value: 7 },
              { title: 'Август', value: 8 },
              { title: 'Сентябрь', value: 9 },
              { title: 'Октябрь', value: 10 },
              { title: 'Ноябрь', value: 11 },
              { title: 'Декабрь', value: 12 }
            ]"
            label="Месяц"
          ></v-select>
        </v-col>
      </v-row>
      <v-row class="ml-0 mr-0 mb-4">
        <v-col
          v-if="$route.name === 'MainComponentNews'"
          class="d-flex"
          cols="6"
        >
          <v-select
            v-model="filter.type"
            dark
            hide-details
            item-text="title"
            @input="filterList"
            item-value="value"
            :items="[
              { title: 'Новость', value: 1 },
              { title: 'Статья', value: 2 }
            ]"
            label="Тип"
          ></v-select>
        </v-col>
      </v-row>
    </div>
    <div
      v-if="
        ['MainComponentPromo', 'MainComponentPosition'].indexOf($route.name) >
          -1
      "
      class="params"
    >
      <v-select
        v-if="$route.name === 'MainComponentPromo'"
        :items="schemas"
        item-text="title"
        item-value="stockSchemaid"
        v-model="localPromo"
        :loading="selectLoading"
        :disabled="selectLoading"
        label="Механика"
        outlined
      ></v-select>

      <v-select
        v-else-if="$route.name === 'MainComponentPosition'"
        :items="rubrics"
        item-text="title"
        item-value="rubricid"
        v-model="localRubric"
        :loading="selectLoading"
        :disabled="selectLoading"
        label="Рубрика"
        outlined
      ></v-select>
    </div>
    <v-list v-if="$route.name === 'MainComponentNews'" dense>
      <v-list-item
        v-for="(article, key) in articles"
        :key="key"
        link
        class="elevation-3 mb-1"
        :class="{
          active: $store.state.news.oneNews.articleid === article.articleid
        }"
        @click="setArticle(article)"
      >
        <v-list-item-content>
          <v-list-item-title>
            {{ article.articletitleShort }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-list v-else-if="$route.name === 'MainComponentFaq'" dense>
      <v-list-item
        v-for="(faq, key) in faqs"
        :key="key"
        link
        class="elevation-3 mb-1"
        :class="{ active: $store.state.faqs.oneFaqs.faqid === faq.faqid }"
        @click="setFaq(faq)"
      >
        <v-list-item-content>
          <v-list-item-title>
            {{ faq.question }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-list v-else-if="$route.name === 'MainComponentShop'" dense>
      <v-list-item
        v-for="(store, key) in stores"
        :key="key"
        link
        class="elevation-3 mb-1"
        :class="{
          active: $store.state.shop.oneStore.storeid === store.storeid
        }"
        @click="setStore(store)"
      >
        <v-list-item-content>
          <v-list-item-title>
            {{ store.storeName }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-list v-else-if="$route.name === 'MainComponentHeading'" dense>
      <v-list-item
        v-for="(rubric, key) in rubrics"
        :key="key"
        link
        class="elevation-3 mb-1"
        :class="{
          active: $store.state.heading.oneRubric.rubricid === rubric.rubricid
        }"
        @click="setRubric(rubric)"
      >
        <v-list-item-content>
          <v-list-item-title>
            {{ rubric.title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-list v-else-if="$route.name === 'MainComponentPosition'" dense>
      <v-list-item
        v-for="(price, key) in prices"
        :key="key"
        link
        class="elevation-3 mb-1"
        :class="{
          active:
            $store.state.heading.oneSpecPrice.specPriceid === price.specPriceid
        }"
        @click="setPrice(price)"
      >
        <v-list-item-content>
          <v-list-item-title>
            {{ price.description | truncate }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <div
        v-if="prices && !prices.length"
        class="empty-text text-center align-center"
      >
        В этой рубрике еще нет ни одной спец цены
      </div>
    </v-list>

    <v-list v-else-if="$route.name === 'MainComponentPromo'" dense>
      <v-list-item
        v-for="(promo, key) in promos"
        :key="key"
        link
        class="elevation-3 mb-1"
        :class="{
          active: $store.state.mechanics.oneStock.stockid === promo.stockid
        }"
        @click="setPromo(promo)"
      >
        <v-list-item-content>
          <v-list-item-title>
            {{ promo.description | truncate }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <div
        v-if="promos && !promos.length"
        class="empty-text text-center align-center"
      >
        В этой механике еще нет ни одной акции
      </div>
    </v-list>

    <v-list v-else-if="$route.name === 'MainComponentShareMechs'" dense>
      <v-list-item
        v-for="(schema, key) in schemas"
        :key="key"
        link
        class="elevation-3 mb-1"
        :class="{
          active:
            $store.state.mechanics.oneSchema.stockSchemaid ===
            schema.stockSchemaid
        }"
        @click="setSchema(schema)"
      >
        <v-list-item-content>
          <v-list-item-title>
            {{ schema.title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapState } from "vuex";
import "../assets/css/MainComponentLeftnav.css";
export default {
  name: "MainComponentLeftNav",
  data() {
    return {
      items: ["item 1", "item 2"],
      localRubric: null,
      localPromo: null,
      selectLoading: false
    };
  },
  methods: {
    filterList() {
      if (this.$route.name === "MainComponentNews") {
        this.$store.dispatch("news/getAllNews", {
          year: this.filter.year || "",
          month: this.filter.month || "",
          type: this.filter.type || ""
        });
      }
      if (this.$route.name === "MainComponentShop") {
        this.$store.dispatch("shop/getAllStores", {
          year: this.filter.year || "",
          month: this.filter.month || ""
        });
      }
      if (this.$route.name === "MainComponentHeading") {
        this.$store.dispatch("heading/getAllRubrics", {
          year: this.filter.year || "",
          month: this.filter.month || ""
        });
      }
      if (this.$route.name === "MainComponentFaq") {
        this.$store.dispatch("faqs/getAllFaqs", {
          year: this.filter.year || "",
          month: this.filter.month || ""
        });
      }
      if (this.$route.name === "MainComponentShareMechs") {
        this.$store.dispatch("mechanics/getAllSchemas", {
          year: this.filter.year || "",
          month: this.filter.month || ""
        });
      }
      if (this.$route.name === "MainComponentPromo") {
        this.$store.dispatch("mechanics/getAllSchemas", {
          year: this.filter.year || "",
          month: this.filter.month || ""
        });
      }
      if (this.$route.name === "MainComponentPosition") {
        this.$store.dispatch("heading/getAllRubrics", {
          year: this.filter.year || "",
          month: this.filter.month || ""
        });
      }
    },
    myScroll() {
      document.getElementById("scrollelement").scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
      // window.scrollTo({
      //   top: 0,
      //   left: 0,
      //   behavior: "smooth"
      // });
    },
    setArticle(article) {
      this.$store.commit("news/setArticle", article);
      setTimeout(() => {
        this.myScroll();
      }, 500);
    },
    setFaq(faq) {
      this.$store.commit("faqs/setFaq", faq);
      setTimeout(() => {
        this.myScroll();
      }, 500);
    },
    setStore(store) {
      this.$store.commit("shop/setStore", store);
      setTimeout(() => {
        this.myScroll();
      }, 500);
    },
    setRubric(rubric) {
      this.$store.commit("heading/setRubric", rubric);
      setTimeout(() => {
        this.myScroll();
      }, 500);
    },
    setPrice(price) {
      this.$store.commit("heading/setPrice", price);
      setTimeout(() => {
        this.myScroll();
      }, 500);
    },
    setPromo(promo) {
      this.$store.commit("mechanics/setPromo", promo);
      setTimeout(() => {
        this.myScroll();
      }, 500);
    },
    setSchema(schema) {
      this.$store.commit("mechanics/setSchema", schema);
      setTimeout(() => {
        this.myScroll();
      }, 500);
    }
  },
  filters: {
    truncate: function(value) {
      if (!value) return "";
      if (value.length > 30) {
        value = value.substring(0, 30) + "...";
      }
      return value;
    }
  },
  computed: {
    ...mapState({
      articles: state => state.news.news,
      schemas: state => state.mechanics.schemas,
      faqs: state => state.faqs.faqs,
      stores: state => state.shop.stores,
      rubrics: state => state.heading.rubrics,
      prices: state => state.heading.specPrices,
      promos: state => state.mechanics.stocks,
      snackBar: state => state.snackBar,
      filter: state => state.filter
    })
  },
  watch: {
    $route() {
      this.$store.state.filter = {};
    },
    localRubric(value) {
      this.selectLoading = true;
      this.$store
        .dispatch("heading/getAllPrices", {
          id: value,
          year: this.filter.year || "",
          month: this.filter.month || ""
        })
        .then(() => {
          this.setPrice();
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
          this.selectLoading = false;
        });
    },
    localPromo(value) {
      this.selectLoading = true;
      this.$store
        .dispatch("mechanics/getAllPromos", {
          id: value,
          year: this.filter.year || "",
          month: this.filter.month || ""
        })
        .then(() => {
          this.setPromo();
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
          this.selectLoading = false;
        });
    }
  }
};
</script>
