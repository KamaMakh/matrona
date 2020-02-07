<template>
  <v-app id="app">
    <router-view></router-view>
    <v-snackbar v-model="snackBar.value" :color="snackBar.color" top right>
      {{ snackBar.text }}
      <v-btn color="#fff" text @click="snackBar.value = false">
        {{ snackBar.button_text }}
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "App",
  data: () => ({
    //
  }),
  computed: {
    ...mapState({
      snackBar: state => state.snackBar
    })
  }
};
</script>
