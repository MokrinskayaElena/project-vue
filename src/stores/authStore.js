import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', { //Объявление хранилища
    state: () => ({ //состояние хранилища
        user: null,        // Данные пользователя
        token: localStorage.getItem('token') || null,  // Токен из localStorage
        isAuthenticated: false,  // Статус аутентификации
        errorMessage: "", //Текст ошибки для отображения в форме входа
    }),
    actions: {
        async login(credentials) {
            this.errorMessage = ""; //Обнуляет прошлую ошибку.
            try {
                const response  = await axios.post('http://127.0.0.1:8000/api/login', credentials); //Отправляет POST-запрос на /api/login с логином и паролем (credentials = {email, password}).
                this.token = response.data.token;
                this.user = response.data.user;
                this.isAuthenticated = true;
                localStorage.setItem('token', response.data.token); //Токен дублируется в localStorage 
            } catch (error) {
                if (error.response) {        //сервер ответил ошибкой         
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                } else if (error.request) {//запрос ушёл, но ответа нет (сервер выключен)

                    this.errorMessage = error.message;
                    console.log(error);
                } else {
                    console.log(error);
                }
            }
        },
        async getUser()   {//получение данных пользователя по токену
            this.errorMessage = "";
            try {
                const response = await axios.get(backendUrl + '/user', //Делает GET-запрос на /user, передавая токен в заголовке Authorization: Bearer <token>
                    { headers: {
                        Authorization: 'Bearer ' + this.token
                    }});
                this.user = response.data;
            } catch (error) {
                if (error.response) {
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                } else if (error.request) {

                    this.errorMessage = error.message;
                    console.log(error);
                } else {
                    console.log(error);
                }
            }
        },
        async logout()  {
            try {
                const response = await axios.get(backendUrl + '/logout',
                    { headers: {
                        Authorization: 'Bearer ' + this.token
                    }});//Очищает всё состояние: token, user, isAuthenticated.
                this.errorCode = response.data.code;
                this.errorMessage = response.data.message;
                this.token = null;
                this.user = null;
                this.isAuthenticated = false;
                // Удаляем токен из localStorage
                localStorage.removeItem('token');
            } catch (error) {
                if (error.response) {
                    this.errorCode = 1;
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                } else if (error.request) {
                    this.errorCode = 2;
                    this.errorMessage = error.message;
                    console.log(error);
                } else {
                    this.errorCode = 3;
                    console.log(error);
                }
            }
        },
    },
});