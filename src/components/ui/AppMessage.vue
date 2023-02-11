<template>
  <div v-if="message" :class="['alert', message.type]">
    <p class="alert-title" v-if="title">{{ title }}</p>
    <p>{{ message.value }}</p>
    <span class="alert-close" @click="close">&times;</span>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  name: "AppMessage",
  setup() {
    const store = useStore();
    const TITLE_MAP = {
      primary: 'Успешно!',
      danger: 'Ошибка!',
      warning: 'Внимаение!',
    };

    const message = computed(() => store.getters.getMessage);
    const title = computed(() => message.value ? TITLE_MAP[message.value.type] : null);

    return {
      message,
      title,
      close: () => store.commit('CLEAR_MESSAGE'),
    };
  },
};
</script>
