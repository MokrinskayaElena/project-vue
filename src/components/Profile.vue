<template>
  <div class="profile-page">
    <div class="profile-card">
      <div class="avatar">
        <span class="pi pi-user" />
      </div>

      <h2 class="profile-name">{{ user?.name || 'Пользователь' }}</h2>
      <p class="profile-email">{{ user?.email }}</p>

      <Button
        label="Выйти из профиля"
        icon="pi pi-sign-out"
        severity="danger"
        class="logout-btn"
        @click="handleLogout"
      />
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore';
import Button from 'primevue/button';

export default {
  components: { Button },

  data() {
    return {
      authStore: useAuthStore(),
    };
  },

  computed: {
    user() {
      return this.authStore.user;
    },
  },

  methods: {
    async handleLogout() {
      await this.authStore.logout();
      this.$router.push('/login');
    },
  },

  mounted() {
    // если пользователь ещё не загружен — подгружаем
    if (this.authStore.isAuthenticated && !this.authStore.user) {
      this.authStore.getUser();
    }
  },
};
</script>

<style scoped>
.profile-page {
  display: flex;
  justify-content: center;
  padding-top: 3rem;
}

.profile-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 2.5rem 3rem;
  width: 100%;
  max-width: 420px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #eff6ff;
  color: #2563eb;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.avatar .pi {
  font-size: 1.75rem;
}

.profile-name {
  margin: 0 0 0.25rem;
  font-size: 1.4rem;
  color: #111827;
}

.profile-email {
  margin: 0 0 2rem;
  color: #6b7280;
  font-size: 0.95rem;
}

.logout-btn {
  width: 100%;
}
</style>