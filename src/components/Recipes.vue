<template>
  <div>
    <h2 style="color: #000000;">Список всех рецептов</h2>
    <DataTable
      :value="dishes"
      :lazy="true"
      :loading="dataStore.loading"
      :paginator="true"
      :rows="perpage"
      :rowsPerPageOptions="[2, 5, 10]"
      :totalRecords="dishes_total"
      @page="onPageChange"
      responsive-layout="scroll"
      :first="offset"
    >
      <Column field="id" header="ID" />
      <Column field="name" header="Наименование" />
      <Column field="preparation_time" header="Время (мин)" />
      <Column field="category.name" header="Категория" />
    </DataTable>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useDataStore } from '@/stores/dataStore';

export default {
  name: "Recipes",
  components: { DataTable, Column },
  
  data() {
    return {
      dataStore: useDataStore(),
      perpage: 5,
      offset: 0,
    };
  },
  
  computed: {
    dishes() {
      return this.dataStore.dishes;
    },
    dishes_total() {
      return this.dataStore.dishes_total;
    },
  },
  
  mounted() {
    this.dataStore.get_dishes(0, this.perpage);
    this.dataStore.get_dishes_total();
  },
  
  methods: {
    onPageChange(event) {
      this.offset = event.first;
      this.perpage = event.rows;
      
      const page = this.offset / this.perpage;
      this.dataStore.get_dishes(page, this.perpage);
    },
  },
};
</script>