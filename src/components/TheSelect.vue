<template>
  <select>
<!--    <option disabled selected>Выберите статус</option>-->
    <option :value="kevValue">{{ text }}</option>
  </select>
</template>

<script>
import { ref, watch } from "vue";

export default {
  name: "TheSelect",
  props: {
    type: {
      type: String,
      required: true,
      validator(value) {
        return ['active', 'cancelled', 'done', 'pending'].includes(value)
      },
    },

  },
  setup(props) {
    const valueMap = {
      active: 'active',
      cancelled: 'cancelled',
      done: 'done',
      pending: 'pending',
    };

    const textMap = {
      active: 'Активен',
      cancelled: 'Отменен',
      done: 'Завершен',
      pending: 'Выполняется',
    };

    const text = ref(textMap[props.type]);
    const kevValue = ref(valueMap[props.type]);
    // const customValue = ref(selectArray[valueMap[props.type]]);

    watch(props, val => {
      // customValue.value = selectArray[valueMap[val.type]];
      kevValue.value = valueMap[val.type];
      text.value = textMap[val.type];
    });

    return {
      text,
      kevValue,
    };
  },
};
</script>

<style scoped>

</style>
