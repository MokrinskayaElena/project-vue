import { defineStore } from 'pinia';
import axios from 'axios';

// Добавляем переменную окружения из .env
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null,
        isAuthenticated: false,
        errorMessage: "",
    }),
    
    actions: {
        async login(credentials) {
            this.errorMessage = ""; 
            try {

                const response = await axios.post(backendUrl + '/login', credentials);
                this.token = response.data.token;
                this.user = response.data.user;
                this.isAuthenticated = true;
                localStorage.setItem('token', response.data.token); 
            } catch (error) {
                this.isAuthenticated = false;
                this.token = null;
                this.user = null;
                localStorage.removeItem('token');

                if (error.response) {         
                    this.errorMessage = error.response.data.message || 'Неверный логин или пароль';
                } else if (error.request) {  
                    this.errorMessage = 'Сервер не отвечает. Проверьте соединение.';
                }
                
                throw error; 
            }
        },
        
        async getUser() {
            this.errorMessage = "";
            try {
                const response = await axios.get(backendUrl + '/user', {
                    headers: {
                        Authorization: 'Bearer ' + this.token
                    }
                });
                this.user = response.data;
            } catch (error) {
                if (error.response) {
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                } else if (error.request) {
                    this.errorMessage = error.message;
                    console.log(error);
                }
            }
        },
        
        async logout() {
            try {

                await axios.post(backendUrl + '/logout', {}, {
                    headers: {
                        Authorization: 'Bearer ' + this.token
                    }
                });
            } catch (error) {
                if (error.response) {
                    console.log(error.response.data.message);
                } else {
                    console.log(error);
                }
            } finally {
                this.token = null;
                this.user = null;
                this.isAuthenticated = false;
                localStorage.removeItem('token');
            }
        },
    },
});