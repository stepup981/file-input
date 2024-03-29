<script lang="ts">
import { defineComponent } from "vue";

import FormUpload from "@/components/FormUpload.vue";

export default defineComponent({
  name: "App",
  components: {
    FormUpload,
  },
});
</script>

<template>
  <FormUpload />
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap");

#app {
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  line-height: 16px;
  letter-spacing: -0.6%;
  color: #384252;
}
</style>
