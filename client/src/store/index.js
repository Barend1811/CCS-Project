
import { createStore } from 'vuex'

const store = createStore({
    state: {
        email: null,
        token: null,
    },
    mutations: {
        setEmail(state, email) {
            state.email = email;
        },
        setToken(state, token) {
            state.token = token;
        },
    },
    actions: {},
    getters: {
        isLoggedIn(state) {
            return !!state.token;
        },
    },
});

export default store 