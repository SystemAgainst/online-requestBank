<template>
  <app-loader v-if="loading" />
  <app-page back title="Заявка" v-else-if="req">
    <p><strong>Имя владельца</strong>: {{req.fio}}</p>
    <p><strong>Телефон</strong>: {{req.phone}}</p>
    <p><strong>Сумма</strong>: {{ currency((req.amount)) }}</p>
    <p><strong>Статус</strong>: <app-status :type="req.status" /></p>

    <div class="form-control">
      <label for="status">Статус</label>
      <select id="status" v-model="status">
        <option value="done">Завершен</option>
        <option value="cancelled">Отменен</option>
        <option value="active">Активен</option>
        <option value="pending">Выполняется</option>
      </select>
    </div>

    <button class="btn danger" @click="remove">Удалить</button>
    <button class="btn" v-if="hasChanges" @click="update">Обновить</button>
  </app-page>
  <h3 class="text-center text-white" v-else>
    Заявки с ID {{ id }} нет.
  </h3>
</template>

<script>
import AppPage from "@/components/ui/AppPage.vue";
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import AppLoader from "@/components/ui/AppLoader.vue";
import { currency } from "@/utils/currency.js";
import AppStatus from "@/components/ui/AppStatus.vue";

export default {
  name: "Request",
  components: { AppStatus, AppLoader, AppPage },
  setup() {
    const route = useRoute();
    const router = useRouter()
    const store = useStore();
    const loading = ref(true);
    const status = ref();
    const req = ref({});

    onMounted(async () => {
      loading.value = true;
      req.value = await store.dispatch('request/loadDataById', route.params.id);
      status.value = req.value?.status
      loading.value = false
    });

    const hasChanges = computed(() => req.value.status !== status.value);

    const remove = async () => {
      await store.dispatch('request/removeById', route.params.id)
      router.push('/')
    };

    const update = async () => {
      const data = {...req.value, status: status.value, id: route.params.id}
      await store.dispatch('request/updateById', data)
      req.value.status = status.value
    };

    return {
      req,
      loading,
      id: route.params.id,
      currency,
      status,
      hasChanges,
      remove,
      update,
    };
  },
};
</script>
