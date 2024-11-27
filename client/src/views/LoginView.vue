<template>
    <div class="page-container">
        <div class="header-container">
            <h1>WELCOME TO LOGIN SCREEN</h1>
        </div>
        <form id="loginForm" @submit.prevent="login()">
            <div class="input-container">
                <div class="mb-3">
                    <label for="emailInput" class="form-label">Email address</label>
                    <input type="email"  v-model="email" class="form-control" id="emailInput" required>
                </div>
                <div class="mb-3">
                    <label for="passwordInput" class="form-label">Password</label>
                    <input type="password"  v-model="password" class="form-control" id="passwordInput" required>
                </div>
                <button id="loginBtn" type="submit" class="btn btn-secondary">Submit</button>
            </div>
        </form>
    </div>

</template>


<script>
import { mapMutations } from "vuex";
import store from "@/store";


export default {
    
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    ...mapMutations(["setEmail", "setToken"]),
    async login() {
        try{
            const response = await fetch("http://localhost:3000/api/login", { 
                method: "POST",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.email,
                    password: this.password
                })
            }
            )
            const userData = await response.json();
            store.commit('setEmail',userData.email);
            store.commit('setToken',userData.token);
            const status = store.getters.isLoggedIn
            if(status){
            this.$router.push("/User");
            }
            else{
                alert("The login details entered where incorrect.")
            }
        }
         catch(err){
            console.log(err)
        } 
    }
    }
  };
</script>

<style>

.input-container{
    max-width: 50%;
    margin: auto;
}


</style>