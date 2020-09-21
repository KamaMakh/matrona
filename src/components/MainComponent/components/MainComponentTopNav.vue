<template>
  <div class="main-component-top-nav">
    <v-slide-group
      v-if="windowWidth > 960"
      class="main-component-top-nav__v-slide-group"
      show-arrows
    >
      <v-btn
        v-for="(item, key) in list"
        :key="key"
        text
        @click="myScroll"
        :to="{ name: item.routeName }"
      >
        {{ item.title }}
      </v-btn>
      <v-btn class="exit" text @click="exit">
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-slide-group>
    <v-list v-else dense>
      <v-list-item
        v-for="(item, key) in list"
        :key="key"
        link
        class="elevation-3"
        :to="{ name: item.routeName }"
      >
        <v-list-item-content>
          <v-list-item-title>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-btn class="exit v-list-item" text @click="exit">
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-list>
  </div>
</template>

<script>
import Vue from "vue";
import VueCookies from "vue-cookies";
Vue.use(VueCookies);
import "../assets/css/MainComponentTopnav.css";
export default {
  name: "MainComponentTopNav",
  data() {
    return {
      list: [
        {
          title: "Новости и статьи",
          routeName: "MainComponentNews"
        },
        {
          title: "Магазины",
          routeName: "MainComponentShop"
        },
        {
          title: "Вопросы и ответы",
          routeName: "MainComponentFaq"
        },
        {
          title: "Рубрики каталога",
          routeName: "MainComponentHeading"
        },
        {
          title: "Позиции каталога",
          routeName: "MainComponentPosition"
        },
        {
          title: "Механики акций",
          routeName: "MainComponentShareMechs"
        },
        {
          title: "Акции",
          routeName: "MainComponentPromo"
        },
        {
          title: "Категории скидок",
          routeName: "MainComponentCatStock"
        },
        {
          title: "Настройки",
          routeName: "MainComponentSettings"
        },
        {
          title: "Профиль пользователя",
          routeName: "MainComponentUserSettings"
        },
        {
          title: "Рассылка",
          routeName: "MainComponentSMS"
        }
      ]
    };
  },
  methods: {
    exit() {
      VueCookies.remove("token");
      this.$router.push("/crm/auth");
    },
    myScroll() {
      setTimeout(() => {
        document.getElementById("scrollelement").scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
      }, 500);
    }
  }
};
</script>
