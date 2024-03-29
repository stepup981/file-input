<script lang="ts">
import { defineComponent, toRefs, onMounted } from "vue";

import FileUpload from "@/components/FileUpload.vue";

export default defineComponent({
  name: "FormUpload",
  components: {
    FileUpload,
  },

  setup() {
    const data = {
      fileUploadLabel: "Label",
      fileUploadHintText: "Hint text",
    };

    const fileLoaded = (file: File) => {
      console.log(file);
    };

    return {
      ...toRefs(data),
      fileLoaded,
    };
  },
});
</script>

<template>
  <FileUpload
    @fileLoaded="fileLoaded"
    :label="fileUploadLabel"
    :hint="fileUploadHintText"
  />
</template>

<style lang="scss" scoped></style>
