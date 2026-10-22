<template>
  <div>
    <h2 style="color: #000000;" >Список категорий:</h2>
    <DataTable
      :value="categories"
      :lazy="true"
      :loading="dataStore.loading"
      :paginator="true"
      :rows="perpage"
      :rowsPerPageOptions="[2, 5, 10]"
      :totalRecords="categories_total"
      @page="onPageChange"
      responsive-layout="scroll"
      :first="offset"
    >
      <Column field="id" header="ID" />
      <Column field="name" header="Наименование категории" />
    </DataTable>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useDataStore } from '@/stores/dataStore';

export default {
  name: "Categories",
  components: { DataTable, Column },
  
  data() {
    return {
      dataStore: useDataStore(),
      perpage: 5,
      offset: 0,
    };
  },
  
  computed: {
    categories() {
      return this.dataStore.categories;
    },
    categories_total() {
      return this.dataStore.categories_total;
    },
  },
  
  mounted() {
    // При загрузке страницы запрашиваем первую страницу данных и их общее количество
    this.dataStore.get_categories(0, this.perpage);
    this.dataStore.get_categories_total();
  },
  
  methods: {
    onPageChange(event) {
      // event.first — индекс первого элемента на странице
      // event.rows — сколько элементов показывать (perpage)
      this.offset = event.first;
      this.perpage = event.rows;
      
      // Вычисляем номер страницы для передачи на бэкенд
      const page = this.offset / this.perpage;
      
      // Запрашиваем новые данные с бэкенда
      this.dataStore.get_categories(page, this.perpage);
    },
  },
};
</script>