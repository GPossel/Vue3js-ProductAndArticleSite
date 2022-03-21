<template>
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
                    <a href="#">
                        <i class="fa fa-categorieën"></i> Categorieën</a>
                </li>
                <li>
                    <a href="#">
                        <i class="fa fa-universal-gezondheid"></i> Gezondheid</a>
                </li>
                <li>
                    <a href="#">
                        <i class="fa fa-object-group"></i> Financieel
                        <span class="badge badge-dark">New</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i class="fa fa-electronica"></i> Electronica</a>
                </li>
                <li>
                    <a href="#">
                        <i class="fa fa-support"></i> About</a>
                </li>
                <li>
                    <a href="#">
                        <i class="fa fa-address-card"></i> Contact</a>
                </li>
                <li>
                    <a href="#">
                        <i class="fa fa-sign-out"></i> Sign Out</a>
                </li>
            </ul>
        </section>
        <section id="page-content">
            <div class="container-fluid">
                <h1>Simple Website</h1>
                <ul>
                    <li>Responsive Toggling System.</li>
                    <li>Menu will appear collapsed in small screens.</li>
                    <li>For large devices, there is button to toggele menu.</li>
                    <li>Animated Sidebar Menu using bootstrap 4 core components.</li>
                </ul>     
                <p>
                This website is only for educational purposes. <br>
                Inholland Web Development 2 - 2022 <br>
                639567 Gentle Possel <br>
                Make sure to keep all page content within the
                    <code>#page-content</code>.</p>
                <a href="#toggle-menu" class="btn btn-primary" id="toggle-menu">Toggle Menu</a>
            </div>
            <div class="container-fluid">
                <StockList/>
            </div>
            <div class="container-fluid">
            <ContactList/>
            </div>
        </section>
    </main>
</template>

<script>
import StockList from './components/StockList.vue'
import ContactList from './components/ContactList.vue'

export default {
  name: 'App',
  components: {
    StockList,
    ContactList
    },
    data: () => ({
        //
    }),
    methods:
    {
        Logout()
        {
        localStorage.clear();
        window.location.reload();
        alert("Hello");
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
  color: #2c3e50;
  margin-top: 60px;
}
</style>
