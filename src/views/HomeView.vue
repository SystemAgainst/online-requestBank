<template>
  <app-loader v-if="loading" />
  <app-page v-else title="Список заявок">
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>

    <request-filter v-model="filterData" />

    <request-table :requests="requests"/>

    <teleport to="body">
      <app-modal
        v-if="modal"
        title="Создать заявку"
        @close="modal = false"
      >
        <request-modal @created="modal = false" />
      </app-modal>
    </teleport>
  </app-page>
</template>

<script>
import AppPage from "@/components/ui/AppPage.vue";
import RequestTable from "@/components/request/RequestTable.vue";
import { computed, onMounted, ref } from "vue";
import AppModal from "@/components/ui/AppModal.vue";
import RequestModal from "@/components/request/RequestModal.vue";
import { store } from "@/store";
import { useStore } from "vuex";
import AppLoader from "@/components/ui/AppLoader.vue";
import RequestFilter from "@/components/request/RequestFilter.vue";

export default {
  name: 'Home',
  components: { RequestFilter, AppLoader, RequestModal, AppModal, RequestTable, AppPage },
  setup() {
    const store = useStore();

    const modal = ref(false);
    const loading = ref(false);
    const filterData = ref({});

    onMounted(async () => {
      loading.value = true;
      await store.dispatch('request/loadData');
      loading.value = false;
    });

    const requests = computed(() => store.getters['request/getRequests']
      .filter(req => {
        if (filterData.value.name) {
          return req.fio.includes(filterData.value.name);
        }
        return req;
      })
      .filter(req => {
        if (filterData.value.status) {
          return filterData.value.status === req.status;
        }
        return req;
      })
    );

    return {
      modal,
      requests,
      loading,
      filterData,
    };
  },
}
</script>
