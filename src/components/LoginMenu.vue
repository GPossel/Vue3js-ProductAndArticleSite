<template>
    <div class="topnav">
		<div class="login-container">
			<ul class="nav navbar">
                <p class="error" v-if='this.errormessage != null'>{{ this.errormessage }} </p>
				<form>
					<input placeholder="Username" v-model="username" type="text">
					<input placeholder="Password" v-model="password"  type="password">
					<button class="btn type-primary" type="submit" @click="login()">Login</button>
				</form>
                <ul>
                    <li><a href="">Forgot Password?</a> </li>
                    <li><a href="">Not yet an account?</a> </li>
                </ul>
            </ul>
        </div>
	</div>
</template>
<script>
import axios from 'axios';

export default {
    data(){
        return {
                username: '',
                password: '',
                errormessage: '',
        }
    },
    methods: {
        login() {
            const formData = new FormData();
            formData.append('username', this.username);
            formData.append('pass', this.password);        

            axios.post('http://localhost:8081/src/repository/login.php', formData)
            .then(response => {
                if(response.status >= 200 && response.status <= 299)
                {
                    const jwt = response.data;
                    this.JWT = jwt;
                    var myToken = JSON.stringify('Bearer ' + response.data);
                    localStorage.setItem('myJWT', myToken);
                }
                else {
                    this.error = response.data;
                    console.log(this.error);
                }
            })
            .catch(error => {
                this.errormessage = "Wrong credentials.";
                console.log(error);
            })
        }
    }
}
</script>

<style>

</style>