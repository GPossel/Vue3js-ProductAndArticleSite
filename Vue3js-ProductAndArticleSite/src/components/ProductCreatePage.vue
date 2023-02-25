<template>
    <div class="container-fluid">
      <div class="row flex-nowrap">
        <SideMenuBar></SideMenuBar>
            <div class="col py-3 p-5 bg-white">
                <section id="page-content" class="p-1 m-2">
                    <h1>Create a Product</h1> <p class="error text-danger" v-if='this.data.errormessage == ""'>{{ this.data.errormessage }}</p>
                    <div class="border border-primary">
                        <div class="row row-cols-2 row-cols-lg-2">
                        <form class="form articleForm productCreatingForm col col-md-auto">
                            <input class="border border-secondary form-control me-sm-2 fs-5 text-secondary" placeholder="Name" v-model="name" type="text">
                            <input class="border border-secondary form-control me-sm-2 fs-5 text-secondary" placeholder="Price" v-model="price" type="text">
                            <input class="border border-secondary form-control me-sm-2 fs-5 text-secondary" placeholder="Description" v-model="description" type="text">
                            <div class="dropdown">
                            <button class="btn btn-secondary btn-lg dropdown-toggle btn-lg fs-4" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {{ this.data.categorySelected.name }}
                            </button>
                            <ul class="dropdown-menu" style="width: 90%">
                                <div v-for='category in this.data?.categories' v-bind:key="category?.id">
                                    <li class="dropdown-item btn btn-lg fs-4" @click="setCategory(category.id)">{{ category.name }}</li>
                                </div>
                            </ul>
                            </div>
                            <div class="position-relative">
                                <button class="btn type-primary delete-button fs-4" type="submit" @click="addProduct()">
                                Add Product
                                </button>
                            </div>
                        </form>

                    <div class="col col-md-auto">
                        <div class="d-grid py-3 p-5 justify-content-center">
                            <PictureInput 
                            ref="pictureInput"
                            width="450"
                            height="500"
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
                            <div class="d-grid p-2 m-2 justify-content-center">
                               <button class="btn btn-warning uploading-image" @click="attemptUpload">
                                   Upload
                               </button>
                            </div>
                        </div>
                        <div class="d-grid p-2 m-2 justify-content-center">
                            <p class="text-success" v-if='this.data.uploadedMessage != ""'>{{ this.data.uploadedMessage }}</p>
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
import SideMenuBar from './SideBarMenu.vue'
import PictureInput from './PictureInput.vue'
import axios from 'axios'
import { URL } from '../const-url.js'

export default {
    name: 'ProductCreatePage',
    components: 
    {
        SideMenuBar,
        PictureInput
    },
    data() {
        return {
            data: {
                name: "name",
                price: "1euro",
                image: "img",
                categories: [
                    { id: 1, name: "food" }
                ],
                errormessage: "error",
                uploadedMessage: "",
                categorySelected: { id: null, name: "Category" }
            }
        }
    },
    mounted() {
        this.loadCategories();
    },
    methods: {
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
            });
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
        },
        setCategory(catId)
        {
            var selected = this.data.categories.find(function(element)
            { 
                return element.id == catId; 
            })
            this.data.categorySelected.name = selected.name;
            this.data.categorySelected.id = selected.id;
            console.log("Changed category into:" + catId);
            return;
        },
        attemptUpload() {
            if (this.data.image){
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
                })
            }
        },
        removeImage()
        {
            this.data.image = '';
            console.log('Image removed!');
        },
        addProduct()
        {
            const token = localStorage.getItem('JWT');

            var json = JSON.stringify({
                'name': this.name,
                'price' : this.price,
                'description': this.description,
                'image': this.data.image,
                'category_id': this.data.categorySelected.id
            });

            axios.post(URL + 'products/create', json,
            {
            headers: { 
                'Content-Type' : "application/json",
                'Authorization' : token
            }
            })
            .then((response) => {
                if(response.status == 200) {
                console.log(response.status);
                this.$router.push("/products"); // hisory stack go 1 back,
                }
            })
            .catch((error) => {
                console.log(error);
                this.data.errormessage = error.response.data;
            })
        }
    }
}
</script>

<style>
.articleForm.productCreatingForm {
    height: 600px;
    width: 60%;
    padding: 5px 5px 5px 15px;
    margin: 5px 5px 5% 5px;
}

.articleForm input[type=checkbox] {
    margin-left: 20px;
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 15px;
}

img {
  width: 30%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
  float: right;
  background-color: aquamarine;
}

.uploading-image{
     display:flex;
     width: 200px;
}
</style>