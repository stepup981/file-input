<script setup lang="ts">
defineProps<{
  choose?: boolean;
  disabled?: boolean;
}>();
</script>

<template>
  <button class="btn" :disabled="disabled" :class="{ choose: choose }">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.btn {
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-family: Inter;
  box-sizing: border-box;
  border: 1px solid rgb(229, 231, 235);
  border-radius: 12px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.02),
    0px 3px 7px -3px rgba(0, 0, 0, 0.08);
  background-color: rgb(255, 255, 255);
  padding: 0px 12px;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background-color: rgb(243, 244, 246);
  }

  &:active {
    background-color: rgb(229, 231, 235);
  }

  &:disabled {
    cursor: not-allowed;
    color: rgb(156, 163, 176);
  }
}

.choose {
  box-shadow: 0px 0px 0px 2px rgba(128, 108, 107, 0.1);
}
</style>
