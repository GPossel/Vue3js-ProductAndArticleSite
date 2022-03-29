<template>
  <section id="page-content"> 
  <div class="container-fluid">
        <div id='ArtikelList' class="ArtikelList">
        <h1>Write an article</h1>
        <p class="error" v-if='this.errormessage != null'>{{ this.errormessage }} </p>
        <form class="articleForm">
           <input placeholder="Title" v-model="title" type="text">
           <input placeholder="Writer" v-model="writer" type="text">
           <input placeholder="Small text" v-model="innerText" type="text">
           <textarea placeholder="Write your article here..." v-model="fullText" type="text"> </textarea>
           <button class="btn type-primary" type="submit" @click="addArticle()">Add Article</button>
        </form>
          
        <h1>Articles </h1>
        <div class="row">
        <!-- placeholder card start -->
        <div class="col-md-6 col-xxl-4">
            <div v-for='article in this.data.articles' v-bind:key="article.id">
                  <div class="card">
                      <div class="card-body">
                          <div class="titleBox">{{ article.title }}</div>
                          <div class="writerBox"> {{ article.writer }} <br> {{ article.date }} </div> <br><br>
                          <div class="innerTextBox"> {{ article.innerText }} </div>
                          {{ article.fullText }}
                          <button class="btn type-primary" @click="goToAdjust(article.id)">Adjust</button>
                      </div>
                  </div>
            </div>
          </div>
          </div>
        </div>
  </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
    name: 'ArtikelList',
    data()
        {
            return {
                data : {
                    articles: [
                     { id: 1, title: "", date: "", writer: "", innerText: "", fullText: "" },
                    ],       
                },
                title: "", 
                date: "", 
                writer: "", 
                innerText: "", 
                fullText: "",
                errormessage: "",
        }
   },
   mounted()
   {
       this.getAtricles();
   },
   methods: {
      getAtricles(){
          axios.get('http://localhost:8081/src/repository/articles.php')
          .then((response) => {
            console.log(response);
            this.data = response.data;
          })
          .catch((error) => {
            console.log(error);
          })
    },
     addArticle()
    {
        console.log("Create article!")

          let formData = new FormData();
          console.log("title:", this.title)
          formData.append('title', this.title)
          formData.append('writer', this.writer)
          formData.append('innerText', this.innerText)
          formData.append('fullText', this.fullText)

          var article = {};
          formData.forEach(function(value, key){
              article[key] = value;
          });

          const token = localStorage.getItem('myJWT');
          axios.post('http://localhost:8081/src/repository/articles.php', formData, { headers: { 'Authorization' : token } })
          .then((repsonse) => {
            console.log(repsonse);
            this.getAtricles();
            this.resetForm();
          })
          .catch((error) => {
            if(error.response.status == 401)
            {
            this.errormessage = "Only authorized people can post articles. Please login.";
            }
            console.log(error);
          })
       },

       goToAdjust(id)
       {
          alert("/ArtikelPage/" + id);
          this.$router.push("/ArtikelPage/" + id);
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

.articleForm {
    height: 500px;
    width: 50%;
    padding: 5px 5px 5px 5px;
    margin: 5px 5px 5px 5px;
    background: rgb(235, 238, 241);
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
  padding: auto;
  margin-left: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 15px;
  border: none;
}

.articleForm textarea 
{
   padding: auto;
   margin-left: 20px;
   margin-bottom: 10px;
   display: block;
   width: 95%;
   height: 70%;
   resize: none;
   border: none;
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