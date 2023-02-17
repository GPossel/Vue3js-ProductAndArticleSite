<template>
  <main class="bg-primary pt-0 main">
    <div>
      <!-- Nav tabs -->
      <ul class="nav flex-column nav-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
              <a class="navbar-brand" href="#" id="header-logo">
                    <img src="https://raw.githubusercontent.com/orbitthemes/Orbit-Themes/master/assets/logo.png"
                    class="img-fluid" width="200"
                    alt="Orbit Themes">
              </a>
          </li>      
          <li class="nav-item" role="presentation">
          <button class="nav-link active m-2 p-1" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">
              <router-link to="/" class="text-white"> Home </router-link>
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link m-2 p-1" id="articles-tab" data-bs-toggle="tab" data-bs-target="#articles" type="button" role="tab" aria-controls="articles" aria-selected="false">
              <router-link to="/Articles" class="text-white"> Articles </router-link>
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link m-2 p-1" id="products-tab" data-bs-toggle="tab" data-bs-target="#products" type="button" role="tab" aria-controls="products" aria-selected="false">
              <router-link to="/Products" class="text-white"> Products </router-link>
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link m-2 p-1" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">
              <router-link to="/Profile" class="text-white"> Profile </router-link>
          </button>
        </li>
      </ul>

      <!-- Tab panes -->
      <div class="tab-content m-2 p-1 text-center">
        <div class="tab-pane text-white active" id="home" role="tabpanel" aria-labelledby="home-tab"> HOME </div>
        <div class="tab-pane text-white" id="articles" role="tabpanel" aria-labelledby="articles-tab"> ARTICLES </div>
        <div class="tab-pane text-white" id="products" role="tabpanel" aria-labelledby="products-tab"> PRODUCTS </div>
        <div class="tab-pane text-white" id="profile" role="tabpanel" aria-labelledby="profile-tab"> PROFILE </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {

}
</script>

<style>

</style>