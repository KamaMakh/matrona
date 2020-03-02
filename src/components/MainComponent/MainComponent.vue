<template>
  <div class="main-component" :class="{ opacity: opacity }">
    <v-navigation-drawer v-if="windowWidth < 961" v-model="drawer" app>
      <MainComponentTopNav />
    </v-navigation-drawer>

    <v-app-bar app color="#0277BD" dark max-width="100%">
      <v-app-bar-nav-icon
        v-if="windowWidth < 961"
        @click.stop="drawer = !drawer"
      />
      <MainComponentTopNav v-if="windowWidth > 960" />
    </v-app-bar>

    <v-content id="content">
      <v-container class="fill-height" fluid>
        <v-row>
          <v-col
            v-if="
              windowWidth > 960 &&
                ['MainComponentSettings', 'MainComponentUserSettings'].indexOf(
                  $route.name
                ) === -1
            "
            class="scroll-element"
          >
            <MainComponentLeftNav />
          </v-col>
          <v-col
            xl="9"
            md="9"
            sm="12"
            xs="12"
            class="scroll-element"
            :class="{
              maxWidthElement: $route.matched.some(
                ({ name }) =>
                  name === 'MainComponentSettings' ||
                  name === 'MainComponentUserSettings'
              )
            }"
          >
            <router-view></router-view>
            <MainComponentLeftNav v-if="windowWidth < 961" />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-footer color="#0277BD" app>
      <span class="white--text">&copy; 2020</span>
    </v-footer>
  </div>
</template>

<script>
import MainComponentLeftNav from "./components/MainComponentLeftNav";
import MainComponentTopNav from "./components/MainComponentTopNav";
export default {
  name: "MainComponent",
  components: {
    MainComponentLeftNav,
    MainComponentTopNav
  },
  data() {
    return {
      drawer: null,
      opacity: true
    };
  },
  mounted() {
    this.$store.dispatch("news/getAllNews").then(() => {
      this.opacity = false;
    });
  }
};
</script>
<style lang="scss">
@import "./assets/css/MainComponent";
.opacity {
  opacity: 0 !important;
}
</style>
