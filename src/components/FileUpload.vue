<script lang="ts">
import { defineComponent, ref, Ref, reactive, toRefs, computed } from "vue";

import { FileUploadState, FileInputRef } from "@/types/index";

import Button from "@/components/UI/Button.vue";

const MAX_WEIGHT_FILE = 200000;

export default defineComponent({
  name: "FileUpload",
  components: {
    Button,
  },

  props: {
    label: String,
    hint: String,
  },

  emits: ['fileLoaded'],

  setup(props, {emit}) {
    const fileInput: Ref<FileInputRef["value"]> = ref(null);
    let labelText = ref(props.label);
    let hintText = ref(props.hint);


    const state = reactive<FileUploadState>({
      isFileLoaded: false,
      fileOpen: false,
      fileDisable: false,
      // для fileDisable нужно какое-то условие. К примеру, человек не заполнил поле данных паспорта, поэтому не даёт загрузить фото. Автоматически пропсом включится disable, если условие не выполняется
      statusFile: "Файл не выбран",
      statusButton: computed(() => {
        const { isFileLoaded, intervalId } = state;
        if (isFileLoaded) return "Отменить";
        if (!isFileLoaded && intervalId) return "Удалить";
        return "Выберите файл";
      }),
      errorFileUpload: false,
      intervalId: 0,
      weightFile: MAX_WEIGHT_FILE,
    });

    const choseFile = () => {
      if (
        state.statusButton === "Отменить" ||
        state.statusButton === "Удалить"
      ) {
        clearInputValue();
      } else {
        if (!fileInput.value) return;

        fileInput.value.value = "";
        fileInput.value?.click();
        state.fileOpen = true;
        state.errorFileUpload = false;
        hintText.value = props.hint;
      }
    };

    const handleFileChange = (e: Event) => {
      const { files } = e.target as HTMLInputElement;
      if (files?.length) {
        const fileUpload = files[0];

        if (fileUpload.size > state.weightFile) {
          state.errorFileUpload = true;
          hintText.value = "Файл не должен превышать 20кб";
          return;
        }

        if (!fileUpload) return;
        uploadFile(fileUpload);
        
      }
    };

    const uploadFile = (file: File) => {
      state.intervalId = setTimeout(() => {
        state.isFileLoaded = false;
      }, 2000);
      state.statusFile = file.name;
      state.isFileLoaded = true;
      emit('fileLoaded', file)
      // например, в родительском компоненте мне понадобится информация о файле, который я загружаю
    };

    const clearInputValue = () => {
      if (!fileInput.value) return;

      state.statusFile = "Файл не выбран";
      state.isFileLoaded = false;
      clearInterval(state.intervalId);
      state.intervalId = 0;
    };

    const removeChange = () => {
      state.fileOpen = false;
    };

    return {
      fileInput,
      ...toRefs(state),
      handleFileChange,
      choseFile,
      removeChange,
      labelText,
      hintText,
    };
  },
});
</script>

<template>
  <div class="file-upload">
    <div class="file-upload__title">{{ labelText }}</div>

    <div class="file-upload__file-block">
      <label for="fileUpload" class="file-upload__choose">
        <input
          id="fileUpload"
          type="file"
          ref="fileInput"
          @change="handleFileChange"
        />
        <Button
          :choose="fileOpen"
          :disabled="fileDisable"
          @click="choseFile"
          @mouseout="removeChange"
          >{{ statusButton }}</Button
        >
      </label>
      <span class="file-upload__file-name" :class="{ loading: isFileLoaded }">
        {{ statusFile }}</span
      >
    </div>

    <div class="file-upload__description" :class="{ error: errorFileUpload }">
      {{ hintText }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.file-upload {
  &__title,
  &__description {
    line-height: 120%;
    letter-spacing: 0%;
  }
  &__title {
    color: #111827;
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 8px;
  }

  &__description {
    color: #6b7280;
    font-size: 13px;
    font-weight: 400;
  }

  &__description.error {
    color: #ef4343;
  }

  &__file-block {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 8px;
  }

  &__choose {
    display: block;
    input {
      display: none;
    }
  }

  &__file-name {
    color: #9ca3b0;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__file-name.loading {
    color: #6b7280;
    &::before {
      content: "";
      display: block;
      border: 2px solid #f3f3f3;
      border-top: 2px solid #00a8a5;
      border-right: 2px solid #00a8a5;
      border-bottom: 2px solid #00a8a5;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      animation: spin 1s linear infinite;
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
