<template>
    <div class="container-fluid">
      <div class="row flex-nowrap">
        <SideMenuBar></SideMenuBar>
        <div class="col py-1 bg-white p-2">
          <section id="page-content" class="p-1 m-2">
            <h1>Product:</h1>
            <div class="container" style="max-width: 100%;">
                <div class="row row-cols-1 row-cols-lg-1">
                    <div class="align-middle">
                        <div class="col col-md-auto">
                            <div class="p-3 m-1 border border-primary">

                                <!--- VIEW MODE -->
                                <div v-if='this.updateMode == false' class="productForm">
                                    <div class="card">
                                        <img v-bind:src="this.data.imageBlob" class="maxSize" v-bind:alt="this.data.description">
                                        <div class="card-body">
                                            <h2 class="card-title text-black">{{ this.data.name }}</h2>
                                            <p class="card-text text-black">{{ this.data.description }}</p>
                                            <div class="d-grid gap-2 d-md-block fs-3">€{{ this.data.price }}</div>
                                        </div>
                                    </div>

                                    <div v-if='this.$store.getters.isAuthenticated'>
                                        <div class="form-inline p-2 m-2 justify-content-center">
                                          <button class="btn type-primary btn-warning" type="submit" @click="changeUpdateMode()">
                                            Update
                                          </button>
                                        </div>
                                    </div>
                                </div>

                                <!--- UPDATE MODE -->
                                <div v-if='this.updateMode == true' class="productForm">
                                        <div class="form-inline p-2 m-2 justify-content-center">
                                            <div class="block">
                                            <img v-bind:src="this.data.imageBlob" class="maxSize" v-bind:alt="this.data.description">
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
                                                  <button class="btn btn-warning uploading-image overrideWidth" @click="attemptUpload">
                                                      Upload
                                                    </button>
                                                </div>
                                                <!--- END IMAGE container -->
                                            </div>
                                        </div>
                                        <div class="d-grid customWidthTo80">
                                            <input class="card d-grid gap-2 d-md-block fs-3 text-black p-1 mt-5" v-bind:placeholder="this.data.name" v-model="name" type="text">
                                            <textarea class="card textarea d-grid gap-2 d-md-block fs-3text-black p-1 m-1 textAreaStretch" v-bind:placeholder="this.data.description" v-model="description" type="text"></textarea>
                                            <input class="card d-grid gap-2 d-md-block p-1 m-1 fs-3" v-bind:placeholder=" + this.data.price" v-model="price" type="text">
                                        </div>

                                        <!--- CATEGORIE -->
                                        <div class="form-inline pb-5 m-1 dropdown justify-content-center">
                                        <button class="btn btn-secondary btn-lg dropdown-toggle btn-lg fs-4" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                          {{ this.categorySelected.name }}
                                        </button>
                                        <ul class="dropdown-menu justify-content-center" style="width: 50%">
                                            <div v-for='category in this.data?.categories' v-bind:key="category?.id">
                                                <li class="dropdown-item btn btn-lg fs-4" type="submit" @click="setCategory(category.id)">{{ category.name }}</li>
                                            </div>
                                        </ul>
                                        </div>
                                        <!--- END CATEGORIE -->
                                          <div class="form-inline justify-content-center p-1 m-1">
                                                <button class="btn type-primary btn-success btn-block p-1 m-1" type="submit" @click="updateProduct()">Save</button>
                                                <button class="btn type-primary btn-danger btn-block p-1 m-1" type="submit" @click="deleteProduct()">Delete</button>
                                          </div>
                                  <p class="error form-inline justify-content-center p-1 m-1 fs-4" v-if='this.errormessage != null'>{{ this.errormessage }} </p>
                                </div>
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
            image: "http" ,                       
            name: "title",
            price: "2.50"
            },
            categories: [
                    { id: 1, name: "food" }
            ],
            categorySelected: { id: null, name: "Category" },
            updateMode: false,
            errormessage: "",
            uploadedMessage: "",
            srcImgData: "",
            imageBlob: ""
        }
      },
      mounted() 
      {
        this.loadCategories();
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
              this.loadPicture();
            })
            .catch((error) => {
              console.log(error);
            })
        },
        loadCategories() {
          console.log("Loading categories from db...");
          axios.get(URL + 'category/all')
          .then((response) => {
            console.log("Categories collected!");
            console.log(response.data);
            this.data.categories = response.data;
          }).catch(err => {
            console.error(err);
            console.log("Loading category failed!");
          })
        },
        updateProduct()
        {
          if(this.updateMode == true)
          {
              const paramsId = this.$route.params.id;
              var json = JSON.stringify({
                'category_id': this.data.category_id,
                'description': this.data.description,
                'image': this.data.image,
                'name': this.data.name,
                'price': this.data.price
              });
              
              const token = localStorage.getItem('JWT');
              axios.put(URL + 'products/update/' +  paramsId, json, { 
                headers: { 
                    'Authorization' : token
                } 
              })
              .then((response) => {
                  console.log(response);
                  this.errormessage = "Updated!";
                  this.changeUpdateMode();
              })
              .catch((error) => {
                  this.errormessage = error.response.data;
              })
            }
            else
            {
              this.changeUpdateMode();
            }
        },
        deleteProduct()
        {
            const token = localStorage.getItem('JWT');
            const paramsId = this.$route.params.id;
            axios.delete(URL + 'products/delete/' + paramsId, { 
                headers: { 
                  'Authorization' : token
                }             
            })
            .then((response) => {
                console.log(response);
                this.$router.push("/products");
            })
            .catch((error) => {
                console.log(error);
                this.errormessage = error.response.data;
            })
        },
        changeUpdateMode() {
              this.setCategory(this.data.category_id);
              // this happens on the first call,
            if(this.data.imageBlob === "") {
              this.data.imageBlob = this.data.image;
            }
            if(this.updateMode == true) { 
              this.updateMode = false;
            }
            else {
              this.updateMode = true;
            }
        },
        attemptUpload() {
            if (this.data.srcImgData){
                const token = localStorage.getItem('JWT');
                const formData = new FormData();
                formData.append("upload-picture", this.data.srcImgData);
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
                    // this.data.image = response.data;
                    // this.data.imageBlob = response.data;
                    this.data.uploadedMessage = "Image uploaded successfully";
                }
                })
                .catch((err) => {
                    console.error(err);
                })
            }
        },
        onChanged() {
            console.log("New picture loaded");
            if (this.$refs.pictureInput.file) {
              this.data.srcImgData = this.$refs.pictureInput.file; // send file

              this.data.image = this.$refs.pictureInput.file.name; // store the name
              // create url -> ties the blob into a download link
              var preview = global.URL.createObjectURL(this.$refs.pictureInput.file);
              console.log(preview);

              // set new img:src
              this.data.imageBlob = preview;
            } else {
              console.log("Old browser. No support for Filereader API");
            }
        },
        onRemoved() {
            this.data.imageBlob = '';
            this.data.srcImgData = '';
        },
        setCategory(catId)
        {
            var selected = this.data.categories.find(function(element)
            { 
              return element.id == catId; 
            })
            this.categorySelected.name = selected.name;
            this.categorySelected.id = selected.id;
            console.log("Changed category into:" . catId);
        },
        loadPicture()
        {
          const string = '^http';
          const regexp = new RegExp(string);

          if(regexp.test(this.data.image))
          {
            console.log("Loaded img from https source succes!");
            this.data.srcImgData = this.data.image;
            // we only do this on the load of the page, the blob is supposed to be able to change its conteent
            if(this.imageBlob === "")
            {
              this.data.imageBlob = this.data.srcImgData;
            }
          } 
          else 
          {
            var imageName = this.data.image.split('.', 1); // split out the imageName for routing of PHP
            console.log(imageName);
            var fileExt = this.data.image.split('.').pop(); // returns the extention like 'jpg'
            console.log(fileExt);
            var json = JSON.stringify({
              'pictureName': this.data.image
            });
            console.log(json);
            axios.post(URL + '/products/picture/get', json,
            {
              headers: {
                'Content-Type': 'application/json',
              }
            })
            .then((response) => 
             {
              console.log(response.data);
              this.data.imageBlob = response.data;
            })
            .catch((error) => {
              console.log(error.response.data);
            })
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