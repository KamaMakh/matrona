<template>
  <div class="main-component">
    <v-navigation-drawer v-model="drawer" app>
      <MainComponentLeftNav />
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark max-width="100%">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <!--<v-toolbar-title>Матрона</v-toolbar-title>-->
      <v-slide-group>
        <v-divider vertical></v-divider>
        <v-btn text :to="{ name: 'MainComponentNews' }">
          Новости и статьи
        </v-btn>

        <v-divider vertical></v-divider>

        <v-btn text :to="{ name: 'MainComponentShop' }">
          Магазины
        </v-btn>

        <v-divider vertical></v-divider>

        <v-btn text :to="{ name: 'MainComponentFaq' }">
          Вопросы и ответы
        </v-btn>

        <v-divider vertical></v-divider>

        <v-btn text :to="{ name: 'MainComponentHeading' }">
          Рубрики каталога
        </v-btn>

        <v-divider vertical></v-divider>

        <v-btn text :to="{ name: 'MainComponentPosition' }">
          Позиции каталога
        </v-btn>

        <v-divider vertical></v-divider>

        <v-btn text :to="{ name: 'MainComponentShareMechs' }">
          Механики акций
        </v-btn>

        <v-divider vertical></v-divider>

        <v-btn text :to="{ name: 'MainComponentPromo' }">
          Акции
        </v-btn>

        <v-divider vertical></v-divider>

        <v-btn text :to="{ name: 'MainComponentSettings' }">
          Настройки
        </v-btn>
        <v-divider vertical></v-divider>

        <v-btn text :to="{ name: 'MainComponentUserSettings' }">
          Профиль пользователя
        </v-btn>
      </v-slide-group>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2020</span>
    </v-footer>
  </div>
</template>

<script>
import MainComponentLeftNav from "./components/MainComponentLeftNav";
export default {
  name: "MainComponent",
  components: {
    MainComponentLeftNav
  },
  data() {
    return {
      drawer: null
    };
  }
};
</script>

<style scoped lang="scss">
.main-component {
  .v-sheet {
    .v-toolbar__content {
      a {
        text-transform: none;
        font-size: 13px;
        padding: 0 10px;
      }
    }
  }
}
</style>
