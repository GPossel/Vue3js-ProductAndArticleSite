<template>
    <MyLoginBar/>
    <main id="main" role="main">
        <section id="sidebar">
            <ul class="sidebar-nav">
                <li class="sidebar-brand text-center">
                    <a class="navbar-brand" href="#" id="header-logo">
                        <img src="https://raw.githubusercontent.com/orbitthemes/Orbit-Themes/master/assets/logo.png" class="img-fluid" width="200"
                            alt="Orbit Themes">
                    </a>
                </li>
                <hr>
                <li>
                    <router-link to="/"> Home </router-link>
                </li>
                <li>
                    <router-link to="/ArtikelList"> Articles <span class="badge badge-dark">New</span> </router-link>
                </li>
            </ul>
        </section>
        <section id="page-content">
            <div class="container-fluid">
                <h1>Artikel Website</h1>
                <p>
                This website is only for educational purposes. <br>
                Inholland Web Development 2 - 2022 <br>
                639567 Gentle Possel <br>
                Make sure to keep all page content within the
                    <code>#page-content</code>.</p>
                <a href="#toggle-menu" class="btn btn-primary" id="toggle-menu">Toggle Menu</a>
                <button class="btn btn-success doneerButton" @click="redirectTikkie()">Donatie voor de arme student</button>
            </div>
        </section>
      <router-view></router-view>
    </main>
</template>

<script>
import MyLoginBar from './components/LoginMenu.vue'

export default {
  name: 'App',
  components: {
    MyLoginBar
    },
    data: () => ({
        //
    }),
    mounted(){
        return this.created();
    },
    methods:
    {
        created() {
            this.$store.dispatch('authLogin');
        },
        logout()
        {
        localStorage.clear();
        window.location.reload();
        alert("Goodbye!");
        },

        redirectTikkie()
        {
            alert("Wow! Alvast mega bedankt!");
            window.open("https://tikkie.me/pay/sgu0v23p2aep48ucd2l9", '_blank');
        }
    }

}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #48515a;
  margin-top: 60px;
}

.container-fluid p {
    padding-left: 15px;
}

.doneerButton {
    margin: 0px 70px 0px 70px
}

</style>
