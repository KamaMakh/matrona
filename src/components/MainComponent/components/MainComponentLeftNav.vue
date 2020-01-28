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
    <v-list dense>
      <v-list-item link class="elevation-3">
        <v-list-item-content>
          <v-list-item-title>
            Статья 1
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "MainComponentLeftNav",
  data() {
    return {
      items: ["item 1", "item 2"]
    };
  }
};
</script>

<style scoped lang="scss">
.main-component-left-nav {
  .params {
    padding: 10px;
  }
}
</style>
