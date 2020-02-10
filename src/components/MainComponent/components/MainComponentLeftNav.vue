<template>
  <div class="main-component-left-nav">
    <!--MainComponentPromo-->
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
        v-for="(article, key) in this.articles"
        :key="key"
        link
        class="elevation-3 mb-1"
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
        v-for="(faq, key) in this.faqs"
        :key="key"
        link
        class="elevation-3 mb-1"
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
        v-for="(store, key) in this.stores"
        :key="key"
        link
        class="elevation-3 mb-1"
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
        v-for="(rubric, key) in this.rubrics"
        :key="key"
        link
        class="elevation-3 mb-1"
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
        v-for="(price, key) in this.prices"
        :key="key"
        link
        class="elevation-3 mb-1"
        @click="setPrice(price)"
      >
        <v-list-item-content>
          <v-list-item-title>
            {{ price.description | truncate }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-list v-else-if="$route.name === 'MainComponentPromo'" dense>
      <v-list-item
        v-for="(promo, key) in this.promos"
        :key="key"
        link
        class="elevation-3 mb-1"
        @click="setPromo(promo)"
      >
        <v-list-item-content>
          <v-list-item-title>
            {{ promo.description | truncate }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-list v-else-if="$route.name === 'MainComponentShareMechs'" dense>
      <v-list-item
        v-for="(schema, key) in this.schemas"
        :key="key"
        link
        class="elevation-3 mb-1"
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
    setArticle(article) {
      this.$store.commit("news/setArticle", article);
    },
    setFaq(faq) {
      this.$store.commit("faqs/setFaq", faq);
    },
    setStore(store) {
      this.$store.commit("shop/setStore", store);
    },
    setRubric(rubric) {
      this.$store.commit("heading/setRubric", rubric);
    },
    setPrice(price) {
      this.$store.commit("heading/setPrice", price);
    },
    setPromo(promo) {
      this.$store.commit("mechanics/setPromo", promo);
    },
    setSchema(schema) {
      this.$store.commit("mechanics/setSchema", schema);
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
      snackBar: state => state.snackBar
    })
  },
  watch: {
    localRubric(value) {
      this.selectLoading = true;
      this.$store
        .dispatch("heading/getAllPrices", { id: value })
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
        .dispatch("mechanics/getAllPromos", { id: value })
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
