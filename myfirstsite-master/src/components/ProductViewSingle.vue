<template>
    <div class="container-fluid">
      <div class="row flex-nowrap">
        <SideBarMenu></SideBarMenu>
        <div class="col py-3 bg-white p-5">
          <section id="page-content" class="p-1 m-2">
            <h1>Product:</h1>
            <div class="container" style="max-width: 100%;">
                <div class="row row-cols-1 row-cols-lg-2 g-1 g-lg-1">
                    <div class="align-middle">
                        <div class="col col-md-auto">
                            <div class="p-3 m-1 border border-primary">

                                <div v-if='this.updateMode == false' class="productForm">
                                    <div class="card">
                                        <img v-bind:src="data.image" class="card-img-top" v-bind:alt="data.description">
                                        <div class="card-body">
                                            <h2 class="card-title text-black">{{ this.data.name }}</h2>
                                            <p class="card-text text-black">{{ this.data.description }}</p>
                                            <div class="d-grid gap-2 d-md-block fs-3">€{{ this.data.price }}</div>
                                        </div>
                                    </div>
                                    <button class="btn type-primary btn-warning" type="submit" @click="changeUpdateMode()">Update</button>
                                </div>

                                <form v-if='this.updateMode == true' class="productForm">
                                    <div class="card">
                                        <img v-bind:src="data.image" class="card-img-top" v-bind:alt="data.description">
                                        <div class="card-body">
                                            <input class="card-title text-black" v-bind:placeholder="this.data.name" v-model="title" type="text">
                                            <textarea class="card-text text-black textAreaStretch" v-bind:placeholder="this.data.description" v-model="description" type="text"></textarea>
                                            <input class="d-grid gap-2 d-md-block fs-3" v-bind:placeholder=" + this.data.price" v-model="price" type="text">
                                        </div>
                                    </div>
                                    <button class="btn type-primary" type="submit" @click="updateArticle()">Save</button>
                                    <button class="btn type-primary btn-danger" type="submit" @click="deleteArticle()">Delete</button>
                                </form>

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
  import SideBarMenu from './SideBarMenu.vue';
  import {URL} from '../const-url.js'
  import axios from 'axios'
  
  export default {
    name: 'ProductViewSingle',
    components: {
      SideBarMenu
    },
    data()
    {
      return {
        data: {
            category_id: 1,
            description: "description",
            id: 1,
            image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/957759184-1529703875.jpg?crop=1.00xw:0.645xh;0,0.104xh&resize=980:*" ,                       
            name: "title",
            price: "2.50"
            },
            updateMode: false 
        }
      },
      mounted() {
           this.getProduct();
      },
      methods: {
        getProduct() {
          const paramsId = this.$route.params.id;
          axios.get(URL + 'products/get/' + paramsId)
            .then((response) => {
              console.log(response);
              this.data.category_id = response.data.category_id;     
              this.data.id = response.data.id;
              this.data.description = response.data.description;
              this.data.image = response.data.image;
              this.data.name = response.data.name;
              this.data.price = response.data.price;
            })
            .catch((error) => {
              console.log(error);
            })
          },
          updateProduct()
          {
            if(this.updateMode == true)
            {
              const paramsId = this.$route.params.id;
              var json = JSON.stringify({
                'category_id': this.category_id,
                'description': this.description,
                'image': this.image,
                'name': this.name,
                'price': this.price
              });
  
              const token = localStorage.getItem('JWT');
              axios.put(URL + 'products/update/' +  paramsId, json, { 
                headers: { 
                    'Authorization' : token
                } 
              })
              .then((repsonse) => {
                  console.log(repsonse);
                  this.errormessage = "Updated!";
                  this.changeUpdateMode();
              })
              .catch((error) => {
                  this.errormessage = error.response.data;
              })
            } else
            {
              this.changeUpdateMode();
            }
          },
          deleteProduct()
          {
            const token = localStorage.getItem('JWT');
            const paramsId = this.$route.params.id;
            axios.delete(URL + 'product/delete/' + paramsId, { 
                headers: { 
                    'Authorization' : token
                }             
            })
            .then((response) => {
              console.log(response);
              this.$router.push("/ProductList");
            })
            .catch((error) => {
              console.log(error);
              this.errormessage = error.response.data;
            })
          },
          changeUpdateMode(){
            if(this.updateMode == true) { 
              this.updateMode = false}
            else {
              this.updateMode = true;
            }
          }
    }
  }
</script>
  
  <style>
  .card2 {
      padding: 50px 5% 50px 5%;
      margin-left: 5%;
      margin-right: 5%;
      margin: 15px 15px 15px 15px;
      background: rgb(255, 255, 255);
  }
  
  .card-body2 {
    background: rgb(239, 249, 255);
  }
  
  .innerTextBox2 {
      text-align: left;
      padding: 5px 5px 1px 25px;
      margin: 10px 2px 10px 2px;
      font-style: italic;
      font-size: 37px;
      font-weight: bold;
  }
  
  .writerBox2 {
      font-size: 25px;
      display: inline-block;
      padding: 10px;
      margin:10px;
      display: block;
      text-align: right;
  }
  
  .titleBox2 {
      padding: 5px 5px 1px 25px;
      margin: 10px 2px 10px 2px;
      float: left;
      font-size: 60px;
      width: auto;
  }
  
  .fullText2 {
      display: inline-block;
      padding: 5px 5px 15px 25px;
      margin: 30px 2px 30px 2px;
      display: block;
      text-align: left;
      font-size: 28px;
  }
  
  .card2 button
  {
    display: block;
    height: 50px;
    width: 120px;
    padding: -50px 5px 20px 5px;
    margin: -50px 10px 10px 10px;
    float: right;
  }
  
  .delete-button {
    padding: 5px 5px 20px 5px;
    margin-bottom: 15px;
    margin-top: 15px;
  }
  
  .errorProductPage {
    font-size: 25px;
    float: right;
    margin-top: -40px;
    padding-right: 10px;
    display: inline;
  }
  
  .productForm button {
    padding: auto;
    margin-right: 20px;
    margin-top: 15px;
    width: 50%;    
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
  }

  .textAreaStretch {
    position: auto;
    width: 100%;
    height: 200px;
  }
  </style>