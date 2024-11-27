

<template>
      <nav class="navbar navbar-static-top navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid justify-content-center" >
            <ul class="navbar-nav mb-2 mb-lg-0">
                <li class="nav-item">
                    <RouterLink class="nav-link"  to="/Setup">Setup</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink class="nav-link"  to="/">Home</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink class="nav-link"  to="/User">User</RouterLink>
                </li>
            </ul>
            <div class="btnDiv">
              <button type="button" class="btn btn-secondary" @click=logout()>Logout</button>
            </div>
        </div>
      </nav>
  <RouterView />

</template>

<script >
import {  mapMutations } from "vuex";
import store from '@/store';


export default {
    data() {
    return {
      data: null
    };
  },
  methods: {
    ...mapMutations(["setEmail", "setToken"]),    
    logout() {
            store.commit('setEmail',null);
            store.commit('setToken',null);
            document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            if(!this.isLoggedIn){
            this.$router.push("/");
    }
    }
  }

}


</script>
<style>
.nav-item{
    padding: 0.5em 2em 0.5em 2em;

}

.nav-link{
    font-size: 2em;
}
ul{
  margin-left: 17.5%;
}
.btnDiv{
    margin-left: 10%;
}
</style>