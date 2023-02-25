<template>
    <div class="container-fluid">
        <div class="row flex-nowrap">
            <SideBarMenu></SideBarMenu>
            <div class="col py-3 bg-white p-5">
                <section id="page-content">
                <h1>Homepage</h1>
                <p class="fs-3 p-2 m-2">
                    This website offers you the possiblitie to browse between informative articles and products.
                    <br>
                    Managing content is possible if logged in.
                </p>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import SideBarMenu from './SideBarMenu.vue'


export default {
    name: 'HomePage',
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