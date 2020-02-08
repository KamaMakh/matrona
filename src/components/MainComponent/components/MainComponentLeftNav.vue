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
        :items="items"
        label="Механика"
        outlined
      ></v-select>

      <v-select
        v-else-if="$route.name === 'MainComponentPosition'"
        :items="items"
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
  </div>
</template>

<script>
import { mapState } from "vuex";
import "../assets/css/MainComponentLeftnav.css";
export default {
  name: "MainComponentLeftNav",
  data() {
    return {
      items: ["item 1", "item 2"]
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
    }
  },
  computed: {
    ...mapState({
      articles: state => state.news.news,
      faqs: state => state.faqs.faqs,
      stores: state => state.shop.stores
    })
  }
};
</script>
