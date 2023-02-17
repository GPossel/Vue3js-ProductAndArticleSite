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
    <div class="container-fluid container-custom-resize">
      <div class="row">
          <div class="col-sm-auto">
              <SidebarMenu></SidebarMenu>
          </div>
          <div class="col m-2 p-1">
              <InfoComponent></InfoComponent>
          </div>
      </div>
    </div>
</template>

<script>
import MyLoginBar from './components/LoginMenu.vue'
import MySearchBar from './components/SearchBar.vue'
import SidebarMenu from './components/SideBarMenu.vue'
import InfoComponent from './components/InfoComponent.vue'

export default {
  name: 'App',
  components: {
    MyLoginBar,
    MySearchBar,
    SidebarMenu,
    InfoComponent
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

/* Made a custom inheritance instance ! :D 
(This is used on top of the bootstrap prop 'contianer-fluid'
-> only updating the width to a custom property) */
.container-fluid.container-custom-resize { 
  width: 1600px;
}

.container-fluid p {
    padding-left: 15px;
}

.doneerButton {
    margin: 0px 70px 0px 70px
}
</style>