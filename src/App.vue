<template>
  <div class="app-wrapper">
    <header class="app-header">
      <div class="header-inner">
        <Menubar :model="items">
          <!-- Слот #item — пункты меню с иконками -->
          <template #item="{ item }">
            <router-link v-if="item.route" :to="item.route" class="menu-item">
              <span :class="item.icon" />
              <span class="menu-label">{{ item.label }}</span>
            </router-link>
          </template>

          <!-- Слот #end — кнопка «Добавить», поиск и иконка входа/выхода -->
          <template #end>
          <div class="toolbar-right">
            <!-- Кнопка «Добавить» — всегда -->
            <Button
              label="Добавить новый рецепт"
              icon="pi pi-plus"
              class="add-btn"
            />

            <!-- Поиск + лупа -->
            <div class="search-group">
              <span class="p-input-icon-left search-box">
                <InputText
                  v-model="search"
                  placeholder="Поиск по рецептам и материалам"
                />
              </span>
              <Button icon="pi pi-search" class="search-btn" />
            </div>

            <!-- Авторизован: только иконка профиля, ведёт на /profile -->
            <router-link v-if="isAuthenticated && user" to="/profile">
              <Button
                icon="pi pi-user"
                class="profile-icon-btn"
                v-tooltip.bottom="user.name"
              />
            </router-link>

            <!-- Не авторизован: иконка входа, ведёт на /login -->
            <router-link v-else to="/login">
              <Button icon="pi pi-sign-in" class="login-icon-btn" />
            </router-link>
          </div>
        </template>
        </Menubar>
      </div>
    </header>

    <main class="app-content">
      <router-view />
    </main>

    <footer class="app-footer">
      © 2026 Кулинарный справочник
    </footer>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore';
import Button from 'primevue/button';
import Menubar from 'primevue/menubar';
import InputText from 'primevue/inputtext';

export default {
  components: { Button, Menubar, InputText },

  data() {
    return {
      search: '',
      authStore: useAuthStore(),

      items: [
        { label: 'Главная',   icon: 'pi pi-fw pi-home',   route: '/' },
        { label: 'Рецепты',   icon: 'pi pi-fw pi-book',   route: '/recipes' },
        { label: 'Категории', icon: 'pi pi-fw pi-list', route: '/categories' },
      ],
    };
  },

  computed: {
    isAuthenticated() {
      return this.authStore.isAuthenticated;
    },
    user() {
      return this.authStore.user;
    },
  },

  methods: {
    logout() {
      this.authStore.logout();
      this.$router.push('/login');
    },
  },

  mounted() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authStore.isAuthenticated = true;
      this.authStore.getUser();
    }
  },
};
</script>

<style scoped>
/* ───── Шапка ───── */
.app-header {
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
}

.header-inner {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

:deep(.p-menubar) {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  border: none;
  background: transparent;
  padding: 0.25rem 0;
}

:deep(.p-menubar-root-list) {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 0.25rem;
}

:deep(.p-menubar-end) {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  margin-left: auto;
}

/* ───── Пункты меню ───── */
.menu-item {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  gap: 0.4rem;
}

.menu-item:hover {
  color: #2563eb;
  background: #f3f4f6;
}

.menu-label {
  margin-left: 0.25rem;
}

/* ───── Правая часть шапки ───── */
.toolbar-right {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  gap: 0.75rem;
  flex: 1 1 auto;       /* ← растягиваем весь правый блок */
  justify-content: flex-end;
}

/* Группа «поиск + лупа» — без зазора между элементами */
.search-group {
  display: flex;
  align-items: center;
  gap: 0;
  flex: 1 1 auto;       /* ← тянется вместе с toolbar-right */
  min-width: 500px;
  
}
/* Поле поиска — растягивается и получает закругление слева */
.search-box {
  flex: 1 1 auto;
}

.search-box :deep(.p-inputtext) {
  width: 100%;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

/* Кнопка лупы — вплотную, скругление справа */
.search-btn {
  background: #2563eb;
  border-color: #2563eb;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  flex: 0 0 auto;
}

/* Строка с пользователем */
.login-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
}

.user-name {
  white-space: nowrap;
}

/* ───── Кнопки ───── */
.add-btn {
  background: #2563eb;
  border-color: #2563eb;
}

.login-icon-btn {
  background: #fff;
  border: 1px solid #d1d5db;
  color: #333;
}

.login-icon-btn:hover {
  background: #f3f4f6;
}

/* ───── Контент и подвал ───── */
.app-content {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  box-sizing: border-box;
}

.app-footer {
  text-align: center;
  color: #6b7280;
  padding: 1.5rem;
  font-size: 0.875rem;
}
.profile-icon-btn {
  background: #fff;
  border: 1px solid #d1d5db;
  color: #333;
}

.profile-icon-btn:hover {
  background: #f3f4f6;
  color: #2563eb;
}
</style>