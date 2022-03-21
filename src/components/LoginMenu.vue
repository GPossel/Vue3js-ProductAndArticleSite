<template>
    <div class="topnav">
		<div class="login-container">
			<ul class="nav navbar">
				<form action="/Login.php">
					<input placeholder="Username" name="username" type="text">
					<input placeholder="Password" name="psw"  type="text">
					<button type="submit" @click="Logout()">Login</button>
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
export default {
    data(){
        return{
            authData:{
                UserEmail: "",
                Password: ""
            }
        }
    },
    methods: {
        login() {
            // axios.post('../api/Login', { UserEmail: this.authData.UserEmail, Password: this.authData.Password })
            // .then(response => {
            //     if (response.data.accessToken && response.data.userType === 'Admin') {
            //         localStorage.setItem('token', response.data.accessToken)
            //         this.$store.state.token = true
            //     }
            // })

            localStorage.setItem('token', 'MyFakeToken')
            alert(this.authData.username + " " + this.authData.password)
        }
    }
}
</script>

<style>

</style>