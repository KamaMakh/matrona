<template>
  <div class="auth">
    <AuthComponent />
  </div>
</template>

<script>
import AuthComponent from "@/components/AuthComponent/AuthComponent";
export default {
  name: "Auth",
  components: {
    AuthComponent
  }
};
</script>

<style scoped lang="scss">
.auth {
  width: 100%;
  max-width: 1170px;
  margin: 0 auto;
  height: 100%;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
