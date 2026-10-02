<template>
  <div class="login-page">
    <div class="login-card">
      <h2>Вход в систему</h2>

      <form @submit.prevent="login">
        <div class="field">
          <label for="email">E-mail</label>
          <InputText
            id="email"
            v-model="email"
            type="email"
            placeholder="Введите email"
            required
            :class="{ 'p-invalid': authError }"
            class="w-full"
          />
        </div>

        <div class="field">
          <label for="password">Пароль</label>
          <InputText
            id="password"
            v-model="password"
            type="password"
            placeholder="Введите пароль"
            required
            :class="{ 'p-invalid': authError }"
            class="w-full"
          />
        </div>

        <Button
          type="submit"
          label="Войти"
          class="w-full login-btn"
        />

        <p v-if="authError" class="error">{{ authError }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

export default {
  components: { InputText, Button },

  data() {
    return {
      email: '',
      password: '',
      authStore: useAuthStore(),
    };
  },

  computed: {
    authError() {
      return this.authStore.errorMessage;
    },
  },

  methods: {
    async login() {
      await this.authStore.login({ email: this.email, password: this.password });
      if (this.authStore.isAuthenticated) {
        this.$router.push('/profile');
      }
    },
  },
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 3rem;
}

.login-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 2rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.login-card h2 {
  margin: 0 0 1.5rem 0;
  font-size: 1.5rem;
  color: #111827;
}

.field {
  margin-bottom: 1rem;
}

.field label {
  display: block;
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
  color: #333;
}

.w-full {
  width: 100%;
}

.login-btn {
  margin-top: 0.5rem;
  background: #2563eb;
  border-color: #2563eb;
}

.error {
  color: red;
  margin-top: 0.75rem;
}
</style>