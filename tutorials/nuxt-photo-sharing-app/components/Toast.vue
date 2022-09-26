<!-- ./components/Toast.vue -->

<script setup>
/**
 * init component state
 */
const state = useToastState();
const setState = useSetToastState;

/**
 * variable to store SetTimeout ID
 */
let timeout;

/**
 * computed property to dynamically assign the `code` and `active` state to component class
 */
const computedClass = computed(() => {
  let code = state.value.code;
  let active = state.value.active;

  return {
    success: code == "success",
    error: code == "error",
    loading: code == "loading",
    active,
  };
});

/**
 * Watch for change in state
 *
 * set up timeout functionality to automatically reset and hide component
 */
watch(state.value, (value) => {
  console.log({
    message: value.message,
    code: value.code,
    active: value.active,
  });

  if (state.value.active) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setState({ active: false });
      console.log({ state: state.value });
    }, state.value.time);
  }
});
</script>
<template>
  <div class="toast" :class="computedClass">
    <div class="wrapper">
      <slot> {{ state.message }}</slot>
    </div>
  </div>
</template>
