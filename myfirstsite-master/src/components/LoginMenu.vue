<template>
    <div class="topnav">
		<div class="login-container">
			<ul v-if="!this.$store.getters.isAuthenticated" class="nav navbar">
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
			<ul v-if="this.$store.getters.isAuthenticated" class="nav navbar">
                <button class="btn type-primary" type="submit"  @click="logout()">Log out</button>
            </ul>
        </div>
	</div>
</template>
<script>
export default {
    data() {
        return {
                username: '',
                password: '',
                errormessage: '',
        }
    },
    methods: {
        login() {
            this.$store.dispatch("login", {
                username: this.username,
                pass: this.password
            })
            .then(
                    (result) => { 
                        this.$router.go("/ArtikelList");
                        console.log(result);
                    },
                    (error) => { 
                        this.errormessage = error;
                        console.log(error);
                    }
                
            )
            .catch((error) => {
                this.errormessage = "Wrong credentials";
                console.log(error);
            })
        },

        logout()
        {
            this.$store.dispatch("logout")
            .then(() => 
            {
                console.log("Loggin out...");
            })
            .catch((error) => {
                this.errormessage = "Oops logout went wrong..";
                console.log(error);
            })        
        }
    }
}
</script>

<style>
</style>