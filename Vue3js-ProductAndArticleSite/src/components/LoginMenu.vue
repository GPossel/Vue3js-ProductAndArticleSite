<template>
    <div class="topnav bg-transparent">
		<div>
			<ul v-if="!this.$store.getters.isAuthenticated" class="nav navbar">
                <p class="error" v-if='this.errormessage != null'>{{ this.errormessage }} </p>
				<form class="d-inline-flex m-2 my-lg-0">
					<input class="form-control me-sm-2" placeholder="Username" v-model="username" type="text">
					<input class="form-control me-sm-2" placeholder="Password" v-model="password" type="password">
					<button class="btn type-primary" type="submit" @click="login()">Login</button>
				</form>
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
                        this.$router.go("/articles");
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
@media (min-width: 768px) {
    .topnav input[type=password] {
        padding: 6px 5px 5px 5px;
        margin-top: 8px;
        margin-right: 8px;
        font-size: 17px;
        border: none;
        width: 233px;
    }
}
</style>