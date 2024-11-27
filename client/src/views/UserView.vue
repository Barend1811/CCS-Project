<script>
import axios from 'axios';


export default {
    
  data() {
    return {
      accountDetails: {}
    };
  },
  methods: {
    async userData() {
      const config = {  
          withCredentials: true,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        }
        await axios
            .get("http://localhost:3000/api/user", config)
            .then(res => {
              this.accountDetails = res.data;
            })
            .catch(error => {
              console.error(error);
            });
    },
    edit(){
      this.$router.push("/User/Edit");
    }
  },
  created() {
    this.userData();
  },
};
</script>

<template>
    <div class="page-container">
        <div class="header-container">
            <h1>WELCOME TO USER SCREEN</h1>
            <br></br>
            <br></br>
            <h4>Name: {{accountDetails.name}}</h4>
            <h4>Email: {{accountDetails.email}}</h4>
            <h4>Account Number: {{accountDetails.accountNumber}}</h4>
            <h4>Sort Code: {{accountDetails.sortcode}}</h4>
            <br></br>
            <div class="text-center">
              <button id="editbtn" type="button" class="btn btn-secondary" @click=edit()>EDIT</button>
            </div>
        </div>
    </div>

</template>

<style>


</style>