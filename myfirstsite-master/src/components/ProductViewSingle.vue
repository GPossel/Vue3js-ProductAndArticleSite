<template>
    <div class="container-fluid">
      <div class="row flex-nowrap">
        <SideMenuBar></SideMenuBar>
        <div class="col py-3 bg-white p-5">
          <section id="page-content" class="p-1 m-2">
            <h1>Product:</h1>
            <div class="container" style="max-width: 100%;">
                <div class="row row-cols-1 row-cols-lg-1">
                    <div class="align-middle">
                        <div class="col col-md-auto">
                            <div class="p-3 m-1 border border-primary">

                                <!--- VIEW MODE -->
                                <div v-if='this.updateMode == true' class="productForm">
                                    <div class="card">
                                        <img v-bind:src="data.image" class="card-img-top maxSize" v-bind:alt="data.description">
                                        <div class="card-body">
                                            <h2 class="card-title text-black">{{ this.data.name }}</h2>
                                            <p class="card-text text-black">{{ this.data.description }}</p>
                                            <div class="d-grid gap-2 d-md-block fs-3">€{{ this.data.price }}</div>
                                        </div>
                                    </div>
                                    <div class="form-inline p-2 m-2 justify-content-center">
                                    <button class="btn type-primary btn-warning" type="submit" @click="changeUpdateMode()">Update</button>
                                </div>
                                </div>

                                <!--- UPDATE MODE -->
                                <form v-if='this.updateMode == false' class="productForm">
                                        <div class="form-inline p-5 m-5 justify-content-center">
                                            <div class="block">
                                            <img v-bind:src="data.image" class="p-1 m-1 maxSize" v-bind:alt="data.description">
                                            </div>
                                            <div class="block p-1 m-1 maxSize">
                                                    <!-- success upload -->
                                                    <div class="text-success text-center" v-if='this.data.uploadedMessage != ""'>{{ this.data.uploadedMessage }}</div>
                                                    <!-- end succes message -->
                                                <!--- IMAGE container -->
                                                <PictureInput 
                                                ref="pictureInput"
                                                width="440"
                                                height="440"
                                                margin="16"
                                                accept="image/jpeg,image/png"
                                                size="10"
                                                button-class="btn"
                                                :custom-strings="{
                                                    upload: '<h1>Bummer!</h1>',
                                                    drag: 'Drag a 🖼, GIF or GTFO'
                                                }"
                                                @change="onChanged">
                                                </PictureInput>
                                                <div class="d-grid justify-content-center pb-5 mb-5">
                                                    <button class="btn btn-warning uploading-image overrideWidth" @click="attemptUpload">Upload</button>
                                                </div>
                                                <!--- END IMAGE container -->
                                            </div>
                                        </div>
                                        <div class="d-grid customWidthTo80">
                                            <input class="d-grid gap-2 d-md-block fs-3 text-black mt-5" v-bind:placeholder="this.data.name" v-model="name" type="text">
                                            <textarea class="textarea d-grid gap-2 d-md-block fs-3text-black textAreaStretch" v-bind:placeholder="this.data.description" v-model="description" type="text"></textarea>
                                            <input class="d-grid gap-2 d-md-block fs-3" v-bind:placeholder=" + this.data.price" v-model="price" type="text">
                                        </div>
                                    <div class="form-inline p-2 m-2 justify-content-center">
                                        <button class="btn type-primary btn-success btn-block p-1 m-1" type="submit" @click="updateProduct()">Save</button>
                                        <button class="btn type-primary btn-danger btn-block p-1 m-1" type="submit" @click="deleteProduct()">Delete</button>
                                    </div>
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
import { URL } from '../const-url.js'
import axios from 'axios'
import SideMenuBar from './SideBarMenu.vue'
import PictureInput from './PictureInput.vue'
  
  export default {
    name: 'ProductViewSingle',
    components: {
        SideMenuBar,
      PictureInput
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
            categories: [
                    { id: 1, name: "food" }
            ],
            categorySelected: { id: null, name: "Category" },
            updateMode: false,
            errormessage: "error",
            uploadedMessage: ""
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
        changeUpdateMode() {
            if(this.updateMode == true) { 
                this.updateMode = false}
            else {
              this.updateMode = true;
            }
        },
        attemptUpload() {
            if (this.data.image) {
                const token = localStorage.getItem('JWT');
                const formData = new FormData();
                formData.append("upload-picture", this.data.image);
                axios.post(URL + 'products/picture', formData, 
                {
                    headers:
                    {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': token
                    }
                })
                .then((response) => {
                if(response.status == 200) {
                    console.log("Image uploaded successfully ✨");
                    this.data.image = response.data;
                    this.data.uploadedMessage = "Image uploaded successfully";
                }
                })
                .catch((err) => {
                    console.error(err);
                });
            }
            },
            onChanged() {
            console.log("New picture loaded");
            if (this.$refs.pictureInput.file) {
               this.data.image = this.$refs.pictureInput.file;
            } else {
               console.log("Old browser. No support for Filereader API");
            }
        },
        onRemoved() {
            this.data.image = '';
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

  .maxSize {
    width: 400px;
    height: 400px;
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
    margin-top: 15px;
    width: 40%;    
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
  }

  .productForm button.overrideWidth {
    width: 100%;
  }

  .textAreaStretch {
    position: auto;
    width: 100%;
    height: 200px;
  }

  .overlayButton {
    position: absolute;
    z-index: 1;
    top: 100px;
  }

  .customWidthTo80 {
    width: 70%;
    margin: auto;
  }
  </style>