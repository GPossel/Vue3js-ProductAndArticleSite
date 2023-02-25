<template>
    <div class="container-fluid">
      <div class="row flex-nowrap">
        <SideBarMenu></SideBarMenu>
        <div class="col py-3 bg-white p-5">
          <section id="page-content">
            <div class="container-fluid">
                <h1>Artikel Website</h1>
                <p class="fs-3 p-2 m-2">
                This website is only for educational purposes. <br>
                Inholland Web Development 2 - 2022 <br>
                639567 Gentle Possel <br>
                Make sure to keep all page content within the
                    <code>#page-content</code>.</p>
                <a href="#toggle-menu" class="btn btn-primary" id="toggle-menu">Toggle Menu</a>
            </div>
        </section>
        </div>
        </div>
    </div>
</template>

<script>
import SideBarMenu from './SideBarMenu.vue';

export default {
    name: 'InfoComponent',
    components: {
        SideBarMenu
    },
    data(){
        return{
        }
    },
    mounted(){
    }
}
</script>

<style>

</style>