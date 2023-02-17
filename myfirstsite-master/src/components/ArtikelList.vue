<template>
<div class="container-fluid">
      <div class="row flex-nowrap">
        <SideBarMenu></SideBarMenu>
        <div class="col py-3 p-5 bg-secondary">
          <section class="p-1 m-2 bg-secondary bg-gradient">
                <h1>Articles</h1>
                <div class="row">
                <!-- placeholder card start -->
                  <div class="col-md-10 col-xxl-4">
                    <div class="align-middel" v-for='article in this.data.articles' v-bind:key="article.id">
                          <div class="card bg-white form-control p-2 m-2">
                              <div class="card-body">
                                  <div class="titleBox">{{ article.title }}</div>
                                  <div class="writerBox"> {{ article.writer }} <br> {{ article.date }} </div> <br><br>
                                  <div class="innerTextBox"> {{ article.innerText }} </div>
                                  <div v-html="article.fullText" style="white-space: pre-wrap;"></div>
                                  <button class="btn btn-primary" @click="goToAdjust(article.id)">Adjust</button>
                              </div>
                          </div>
                    </div>
                  </div>
                </div>
          </section>
    </div>
  </div>
</div>
</template>

<script>
import { URL } from '../const-url.js'
import axios from 'axios'
import SideBarMenu from './SideBarMenu.vue'

export default {
    name: 'ArtikelList',
    components: {
        SideBarMenu
    },
    data()
      {
            return {
                data: {
                    articles: [
                     { id: 1, title: "title", date: "2023-09-09 19:00", writer: "writer", innerText: "FakeData", fullText: "FakeDataFull" },
                    ]
                }
      }
   },
   mounted()
   {
       this.getAtricles();
   },
   methods: {
      getAtricles(){
          axios.get(URL + 'articles/all')
          .then((response) => {
            console.log(response);
            console.log(response.data);
            this.data.articles = response.data;
          })
          .catch((error) => {
            console.log(error);
          })
      },
      goToAdjust(id)
      {
          this.$router.push("/articles/" + id);
      },
      resetForm: function() {
            this.title = '';
            this.date = '';
            this.writer = '';
            this.innerText = '';
            this.fullText = '';
      },
   }
}
</script>

<style>
h1 {
  padding-left: 25px;
  padding-top: 15px;
}

.innerTextBox {
    text-align: left;
    font-size: 16px;
    font-weight: bold;
}

.titleBox {
    padding: 5px 5px 1px 5px;
    margin: 1px 2px 0px 2px;
    float: left;
    font-size: 28px;
}

.writerBox {
    display: inline-block;
    padding: 5px 5px 1px 5px;
    margin: 1px 2px 0px 2px;
    display: block;
    text-align: right;
}

.card button
{
  width: 10%;
  height: 10%;
  padding: 5px 5px 1px 5px;
  margin: 1px 2px 0px 2px;
  float: right;
}
</style>