<template>
    <div class="page-container">
        <div class="header-container">
            <h1>WELCOME TO SETUP SCREEN</h1>
        </div>
        <br>
        <h1>Steps to setup Database</h1>
        <br>
        <ul>
            <li>Install all required node packages</li>
            <li>Ensure that your postgresql server is on</li>
            <li>Change the .env file as stipulated in the readme file</li>
            <li>Press the SETUP button below and wait for confirmation</li>
        </ul>
        <div class="text-center">
            <button id="setupBtn" type="button" class="btn btn-secondary" @click="setupDb()">SETUP</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
            data:null
        }
    },
    methods: {
     async setupDb() {
            await axios
            .get("http://localhost:3000/api/setup")
            .then((res) => {
                alert("Setup is complete")
            })
            .catch((err) => {
                console.log(err)
                alert("An unexpected error has occured. See the console log for more information.")
            })
        }
    }
}
</script>


<style>


</style>