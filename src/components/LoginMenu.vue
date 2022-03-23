<template>
    <div class="topnav">
		<div class="login-container">
			<ul class="nav navbar">
				<form>
					<input placeholder="Username" v-model="username" type="text">
					<input placeholder="Password" v-model="password"  type="password">
					<button type="submit" @click="login()">Login</button>
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
        return{
                username: '',
                password: ''
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

                }
                    console.log(response);
                    var myToken = JSON.stringify('Bearer ' + response.data);
                    localStorage.setItem('myJWT', myToken);
                    alert(this.username + " " + this.password)
            })
            .catch(error => {
                console.log(error);
            })
        }
    }
}
</script>

<style>

</style>