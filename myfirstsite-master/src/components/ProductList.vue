<template>
    <div class="container-fluid">
      <div class="row flex-nowrap">
        <SideBarMenu></SideBarMenu>
        <div class="col py-3 bg-white p-5">
          <section id="page-content" class="p-1 m-2">
            <h1>Products</h1>
            <div class="container" style="max-width: 100%;">
                <div class="row row-cols-1 row-cols-lg-4 g-2 g-lg-1">
                    <div class="align-middle" v-for='product in this.data.products' v-bind:key="product.id">
                        <div class="col col-md-auto">
                            <div class="p-3 m-1 border border-primary">
                                <div class="card"> 
                                <img v-bind:src="matchIndex(product.id)" class="card-img-top" v-bind:alt="product.description">
                                    <div class="card-body">
                                        <h2 class="card-title text-black">{{ product.name }}</h2>
                                        <p class="card-text text-black">{{ product.description }}</p>
                                        <div class="d-grid gap-2 d-md-block fs-3">
                                            €{{ product.price }}
                                            <button class="btn btn-primary" @click="goToAdjust(product.id)">See</button>
                                        </div>
                                    </div>
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
import SideBarMenu from './SideBarMenu.vue'

export default {
    name: 'ProductList',
    components: 
    {
        SideBarMenu
    },
    data() {
        return { 
            data: {
                products: [
                    { 
                        category_id: 1,
                        description: "description",
                        id: -1,
                        image: "https://www.bing.com/images/search?view=detailv2&form=SBIHVR&lightschemeovr=1&iss=sbi&q=imgurl:https%3A%2F%2Fhips.hearstapps.com%2Fhmg-prod.s3.amazonaws.com%2Fimages%2F957759184-1529703875.jpg%3Fcrop%3D1.00xw%3A0.645xh%3B0%2C0.104xh%26resize%3D980%3A*&pageurl=http%3A%2F%2Flocalhost%3A8081%2F%23%2Fproducts%2F9&pagetl=Gentle+(63956)+WebDev+2&imgalt=a-Ciabatta+(which+translates+to+slipper!)+is+an+Italian+bread+made+with+wheat+flour%2C+salt%2C+yeast%2C+and+water.+Though+it%27s+texture+and+crust+vary+slightly+throughout+Italy%2C+the+essential+ingredients+remain+the+same.+Ciabatta+is+best+for+sandwiches+and+paninis%2C+naturally.&imgsz=301x301&selectedindex=0&id=https%3A%2F%2Fhips.hearstapps.com%2Fhmg-prod.s3.amazonaws.com%2Fimages%2F957759184-1529703875.jpg%3Fcrop%3D1.00xw%3A0.645xh%3B0%2C0.104xh%26resize%3D768%3A*&ccid=HJhemLxu&mediaurl=https%3A%2F%2Fhips.hearstapps.com%2Fhmg-prod.s3.amazonaws.com%2Fimages%2F957759184-1529703875.jpg%3Fcrop%3D1.00xw%3A0.645xh%3B0%2C0.104xh%26resize%3D768%3A*&exph=383&expw=395&vt=2&simid=607989991871097315&ck=D93A243AFF6ACD8E3FE6C901190D93E4&thid=OIP.HJhemLxu8pu035_spGI8QAAAAA&cdnurl=https%3A%2F%2Fth.bing.com%2Fth%2Fid%2FR.1c985e98bc6ef29bb4df9feca4623c40%3Frik%3DzCEm58XupF5%252bqg%26pid%3DImgRaw%26r%3D0&sim=11" ,                       
                        name: "title",
                        price: "2.50"
                        // later to be added: User
                        // writer: "writer",
                        // description: "Ciabatta (which translates to slipper!) is an Italian bread made with wheat flour, salt, yeast, and water. Though it's texture and crust vary slightly throughout Italy, the essential ingredients remain the same. Ciabatta is best for sandwiches and paninis, naturally."
                        // date: "2023-09-09 19:00",
                        // altTags: "alt"
                    }
                ],
                productSrcImgDump: [ 
                    { product_id: -1, srcImgData: "https://www.bing.com/images/search?view=detailv2&form=SBIHVR&lightschemeovr=1&iss=sbi&q=imgurl:https%3A%2F%2Fhips.hearstapps.com%2Fhmg-prod.s3.amazonaws.com%2Fimages%2F957759184-1529703875.jpg%3Fcrop%3D1.00xw%3A0.645xh%3B0%2C0.104xh%26resize%3D980%3A*&pageurl=http%3A%2F%2Flocalhost%3A8081%2F%23%2Fproducts%2F9&pagetl=Gentle+(63956)+WebDev+2&imgalt=a-Ciabatta+(which+translates+to+slipper!)+is+an+Italian+bread+made+with+wheat+flour%2C+salt%2C+yeast%2C+and+water.+Though+it%27s+texture+and+crust+vary+slightly+throughout+Italy%2C+the+essential+ingredients+remain+the+same.+Ciabatta+is+best+for+sandwiches+and+paninis%2C+naturally.&imgsz=301x301&selectedindex=0&id=https%3A%2F%2Fhips.hearstapps.com%2Fhmg-prod.s3.amazonaws.com%2Fimages%2F957759184-1529703875.jpg%3Fcrop%3D1.00xw%3A0.645xh%3B0%2C0.104xh%26resize%3D768%3A*&ccid=HJhemLxu&mediaurl=https%3A%2F%2Fhips.hearstapps.com%2Fhmg-prod.s3.amazonaws.com%2Fimages%2F957759184-1529703875.jpg%3Fcrop%3D1.00xw%3A0.645xh%3B0%2C0.104xh%26resize%3D768%3A*&exph=383&expw=395&vt=2&simid=607989991871097315&ck=D93A243AFF6ACD8E3FE6C901190D93E4&thid=OIP.HJhemLxu8pu035_spGI8QAAAAA&cdnurl=https%3A%2F%2Fth.bing.com%2Fth%2Fid%2FR.1c985e98bc6ef29bb4df9feca4623c40%3Frik%3DzCEm58XupF5%252bqg%26pid%3DImgRaw%26r%3D0&sim=11" }
                ]
            }
        }
    },
    mounted()
    {
        this.getProducts();
    },
    methods: {
        getProducts() {
            axios.get(URL + 'products')
            .then((response) => {
                console.log(response.data);
                this.data.products = response.data;
                this.data.products.forEach(element => {
                    this.loadPicture(element);
                });
            })
            .catch((error) => {
                console.log(error);
            })
        },
        goToAdjust(id)
        {
            this.$router.push("/products/" + id);
        },
        loadPicture(product)
        {
          // create new variable to store this image src data (dump)
          let imgSRC = {
            product_id: -1,
            srcImgData: ""
          };

          imgSRC.product_id = product.id;

          const string = '^http';
          const regexp = new RegExp(string);

          if(regexp.test(product.image))
          {
                imgSRC.srcImgData = product.image;
                console.log("Loaded srcImgData from https source succes!");
                            // add to list
                this.data.productSrcImgDump.push(imgSRC);
                return;
          } 
          else 
          {
              var imageName = product.image.split('.', 1); // split out the imageName for routing of PHP
              console.log(imageName);
              var fileExt = product.image.split('.').pop(); // returns the extention like 'jpg'
              console.log(fileExt);  
              var json = JSON.stringify({
                'pictureName': product.image
              });
              console.log(json);  
              axios.post(URL + '/products/picture/get', json,
              {
                headers: {
                    'Content-Type': 'application/json',
                }
              }).then((response) => 
              {
                imgSRC.srcImgData = response.data;
                // add to list
                this.data.productSrcImgDump.push(imgSRC);
                return;
                }).catch((error) => {
                  console.log(error);
                })
            }
        },
        matchIndex(expectedValue)
        {
            let foundSRC;
            const valuePresent = this.data.productSrcImgDump.find((data) => {
                foundSRC = data.srcImgData;
                return data.product_id === expectedValue;
            });

            if(valuePresent !== null)
            {
                return foundSRC;
            }
        }
    }
}
</script>

<style>

.card button
{
  width: 22%;
  height: 10%;
  padding: 5px 5px 1px 5px;
  margin: 1px 2px 0px 2px;
  float: right;
}
</style>