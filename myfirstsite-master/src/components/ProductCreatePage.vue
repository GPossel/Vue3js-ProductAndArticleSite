<template>
    <div class="container-fluid">
      <div class="row flex-nowrap">
        <SideMenuBar></SideMenuBar>
            <div class="col py-3 p-5 bg-white">
                <section id="page-content" class="p-1 m-2">
                    <h1>Create a Product</h1> <p class="error text-danger" v-if='this.errormessage != null'>{{ this.errormessage }}</p>
                    <div class="border border-primary">
                    <p class="error text-danger" v-if='this.errormessage != null'>{{ this.errormessage }}</p>
                    <div class="row row-cols-2 row-cols-lg-2">
                        <form class="form articleForm col col-md-auto" method="post" enctype="multipart/form-data">
                            <input class="border border-secondary form-control me-sm-2" placeholder="Name" v-model="name" type="text">
                            <input class="border border-secondary form-control me-sm-2" placeholder="Price" v-model="price" type="text">
                            <input class="border border-secondary form-control me-sm-2" placeholder="Description" v-model="description" type="text">
                            <textarea class="border border-secondary form-control me-sm-2" placeholder="Category_id" v-model="category_id" type="text">
                            </textarea>
                            <button class="btn type-primary delete-button" type="submit" @click="addProduct()">
                            Add Article
                            </button>
                        </form>
                    <div>
                        <div class="col col-md-auto"> 
                            <div v-if="!image">
                            <input class="file-upload-input" @change="onFileChange" type="file" ref="file">
                            </div>
                            <div v-else>
                                <img :src="image">
                                <button @click="removeImage()">Remove Image</button>
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

export default {
    name: 'ProductCreatePage',
    components: 
    {
        SideMenuBar
    },
    date() {
        return {
            name: "",
            price: "",
            description: "",
            image: null,
            errormessage: ""
        }
    },
    mounten() {

    },
    methods: {
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if(!files.length)
            {
                console.log("none image found..");
                return;
            } else {
            console.log("Found image: name= " + this.$refs.file.files[0].name);
            this.getBase64(files[0]);
            }
        },
        getBase64(file) {
            var reader  = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                console.log(reader.result);
                this.image = reader.result;
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            }
        },
        removeImage()
        {
            this.image = '';
        },
        addProduct()
        {
            const token = localStorage.getItem('JWT');

            var json = JSON.stringify({
                'name': this.name,
                'price' : this.price,
                'description': this.description,
                'image': this.getBase64(this.image)
            });

            axios.post(URL + 'products/create', json, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : token
                }
            })
            .then((response) => {
                console.log(response);
                if(response.status == 200)
                {
                    console.log("Succesfully added product!");
                }
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }
}
</script>

<style>

img {
  width: 30%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
  float: right;
  background-color: aquamarine;
}
</style>