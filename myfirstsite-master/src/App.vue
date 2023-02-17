<template>
  <header>
    <nav class="navbar navbar-light bg-primary">
          <div class="container-fluid container-custom-resize">
            <a class="navbar-brand text-white a-inline-flex" href="#">ArtikelWeb</a>
            <MySearchBar></MySearchBar>
            <MyLoginBar></MyLoginBar>
      </div>
    </nav>
  </header>
  <main class="bg-primary flex pt-0 main">
    <router-view></router-view>
    <ArtikelList></ArtikelList>
  </main>
</template>

<script>
import ArtikelList from './components/ArtikelList.vue'
import MyLoginBar from './components/LoginMenu.vue'
import MySearchBar from './components/SearchBar.vue'

export default {
  name: 'App',
  components: {
    MyLoginBar,
    MySearchBar,
    ArtikelList
},
    data() {
      return {

      }
    },
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
  height: 100%;
}

.grid-container {
  display: grid;
  grid-template-areas: none;
  gap:10px;
  padding:10px;
}

/* Made a custom inheritance instance ! :D 
(This is used on top of the bootstrap prop 'contianer-fluid'
-> only updating the width to a custom property) */
.container-fluid.container-custom-resize { 
  width: 1920px;
}

.container-fluid p {
  padding-left: 15px;
}

.doneerButton {
  margin: 0px 70px 0px 70px;
}

.leftMenu {
    display: block;
    text-align: center;
    position: auto;
    left: 0;
    top: 0;
    height: 100%;
    border: 1px solid #778390;
    width: 22%;
    background-color: #778390;
    color: white;
}
</style>