<script>

export default {

    data() {
        return {
        sortCode: '',
        accountNumber: ''
        };
    },
    methods:{
        async edit(){
            await fetch("http://localhost:3000/api/user/edit", { 
                method: "POST",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sortCode: this.sortCode,
                    accountNumber: this.accountNumber
                })
            })
            .then(alert("Account information changed succesfully"))
            .then(this.$router.push("/User"))
            .catch(error => {
              console.error(error);
            });
        }
        }

    }
</script>

<template>
    <h1>Edit bank information:</h1>
        <form id="editForm" @submit.prevent="edit()">
            <div class="input-container">
                <div class="mb-3">
                    <label for="codeInput" class="form-label">Sort Code</label>
                    <input type="text" pattern="^[0-9]{6}$" v-model="sortCode" class="form-control" id="codeInput" required>
                </div>
                <div class="mb-3">
                    <label for="numberInput" class="form-label">Account Number</label>
                    <input type="text" pattern="^[0-9]{8}$" v-model="accountNumber" class="form-control" id="numberInput" required>
                </div>
                <button type="submit" class="btn btn-secondary">Submit</button>
            </div>
        </form>
</template>

<style>


</style>