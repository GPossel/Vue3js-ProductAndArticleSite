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
                  <router-link to="/info" class="text-white ms-1 d-none d-sm-inline"> Info </router-link>
              </li>
              <li>
                  <i class="fs-4"></i>
                  <!-- <router-link to="/Profile" class="text-white ms-1 d-none d-sm-inline"> Profile </router-link> -->
              </li>
            </ul>
            <hr>
            <div class="dropdown pb-4">
              <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" class="rounded-circle">
                <span class="d-none d-sm-inline mx-1">loser</span>
              </a>
              <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
                <li>
                  <a class="dropdown-item" href="#">New project...</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">Settings</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">Profile</a>
                </li>
                <li>
                  <hr class="dropdown-divider">
                </li>
                <li>
                  <a class="dropdown-item" href="#">Sign out</a>
                </li>
              </ul>
            </div>
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