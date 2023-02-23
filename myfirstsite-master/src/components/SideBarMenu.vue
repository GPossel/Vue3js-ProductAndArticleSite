<template>
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark"> 
          <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
              <li class="nav-item">
                  <i class="fs-4"></i>
                  <router-link to="/" class="text-white ms-1 d-none d-sm-inline"> Home </router-link>
              </li>
              <li>
                  <i class="fs-4"></i>
                  <router-link to="/articles" class="text-white ms-1 d-none d-sm-inline"> Articles </router-link>
              </li>
              <li>
                  <i class="fs-4"></i>
                  <router-link to="/create/article" class="text-white ms-1 d-none d-sm-inline"> Create a article </router-link>
              </li>
              <li>
                  <i class="fs-4"></i>
                  <router-link to="/products" class="text-white ms-1 d-none d-sm-inline"> Products </router-link>
              </li>
              <li>
                  <i class="fs-4"></i>
                  <router-link to="/products/create" class="text-white ms-1 d-none d-sm-inline"> Create a product </router-link>
              </li>
              <li>
                  <i class="fs-4"></i>
                  <router-link to="/info" class="text-white ms-1 d-none d-sm-inline"> Info </router-link>
              </li>
              <li>
                  <i class="fs-4"></i>
                  <!-- <router-link to="/Profile" class="text-white ms-1 d-none d-sm-inline"> Profile </router-link> -->
              </li>
            </ul>
            <hr>
          </div>
        </div>
</template>

<script>
export default {
  name: 'SideBarMenu',
  data ()
  {
    return {}

  },
  mounted()
  {
    
  },
  methods:
  {

  }
}
</script>

<style>
</style>