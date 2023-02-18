<template>
    <div class="container-fluid">
      <div class="row flex-nowrap">
        <SideBarMenu></SideBarMenu>
        <div class="col py-3 p-5 bg-white">
        <section id="page-content" class="p-1 m-2">
        <h1>Write an article</h1>
        <div class="border border-primary">
        <p class="error text-danger" v-if='this.errormessage != null'>{{ this.errormessage }}</p>
          <form class="articleForm">
            <input class="border border-secondary form-control me-sm-2" placeholder="Title" v-model="title" type="text">
            <input class="border border-secondary form-control me-sm-2" placeholder="Writer" v-model="writer" type="text">
            <input class="border border-secondary form-control me-sm-2" placeholder="Small text" v-model="innerText" type="text">
            <textarea class="border border-secondary form-control me-sm-2" placeholder="Write your article here..." v-model="fullText" type="text">
            </textarea>
            <button class="btn type-primary delete-button" type="submit" @click="addArticle()">
              Add Article
            </button>
          </form>
        </div>
          </section>
        </div>
        </div>
    </div>
</template>

<script>
import SideBarMenu from './SideBarMenu.vue';
import axios from 'axios'
import {URL} from '../const-url.js'

export default {
name: 'ArtikelCreatePage',
components: {
    SideBarMenu
},
data() {
    return {
        title: "",
        date: "",
        writer: "",
        innerText: "",
        fullText: "",
        errormessage: ""
    }
},
mounted() {

},
methods:
{
    addArticle() {
        console.log("Create article!")
        const token = localStorage.getItem('JWT');

        var json = JSON.stringify({
          'title': this.title,
          'writer': this.writer,
          'innerText': this.innerText,
          'fullText': this.fullText
        });

        axios.post(URL + 'articles/create', json,
        {
          headers: { 
            'Content-Type' : "application/json",
            'Authorization' : token
        }
        })
        .then((repsonse) => {
          console.log(repsonse);
        })
        .catch((error) => {
          console.log(error);
          this.errormessage = error.response.data;
        })
      }
}
}
</script>

<style>
.articleForm {
    height: 600px;
    width: 50%;
    padding: 5px 5px 5px 15px;
    margin: 5px 5px 5% 5px;
}

.articleForm button {
  padding: auto;
  margin-left: 20px;
  margin-bottom: 10px;
  width: 50%;    
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}

.articleForm input {
  margin-left: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 15px;
  border: none;
}

.articleForm textarea 
{
   margin-left: 20px;
   margin-top: 20px;
   margin-bottom: 10px;
   display: block;
   width: 100%;
   height: 70%;
   resize: none;
   border: none;
}

.error {
  margin-left: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>