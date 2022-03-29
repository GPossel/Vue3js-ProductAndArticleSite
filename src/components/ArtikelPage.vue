.<template>
<h1></h1>
    <div class="card2">
        <button class="btn type-primary btn-warning" type="submit" @click="updateArticle()">Update</button>
        <button class="btn type-primary btn-danger" type="submit" @click="deleteArticle()">Delete</button>
        <p class="errorArtikelPage" v-if='this.errormessage != null'>{{ this.errormessage }} </p>
        <div class="card-body2">
            <h1 class="titleBox2">{{ title }}</h1>
            <div class="writerBox2"> {{ writer }} <br> {{ date }} </div> <br><br>
            <div class="innerTextBox2"> {{ innerText }} </div>
            <div class="fullText2"> {{ fullText }} </div>
        </div>
        <form v-if='this.updateMode == true' class="articleForm">
           <input placeholder="Title" v-model="title" type="text">
           <input placeholder="Writer" v-model="writer" type="text">
           <input placeholder="Small text" v-model="innerText" type="text">
           <textarea placeholder="Write your article here..." v-model="fullText" type="text"> </textarea>
           <button class="btn type-primary" type="submit" @click="updateArticle()">Save</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'ArtikelPage',
    data()
    {
        return {
            id: 1,
            title: "Citroenwater, een wondermiddel?", 
            date: "01-01-2022", 
            writer: "G. Possel", 
            innerText: "Citroenwater heeft vele gezondheidsvoordelen.", 
            fullText: "Water met citroen kan helpen bij maagzuur, maagkrampen, buikpijn en een verminderde weerstand.",
            errormessage: "",
            updateMode: false 
        }
    },
    mounted() {
         this.getArticle();
    },
    methods: {
        getArticle() {
        const paramsId = this.$route.params.id;
        axios.get('http://localhost:8081/src/repository/articles.php?id=' + paramsId )
          .then((response) => {
            console.log(response);            
            this.id = response.data.id;
            this.title = response.data.title;
            this.date = response.data.date;
            this.writer = response.data.writer;
            this.innerText = response.data.innerText;
            this.fullText = response.data.fullText;
          })
          .catch((error) => {
            console.log(error);
          })
        },
        updateArticle()
        {
          if(this.updateMode == true)
          {
            const paramsId = this.$route.params.id;
            let formData = new FormData();
            formData.append('action', 'insert')
            formData.append('title', this.title)
            formData.append('writer', this.writer)
            formData.append('innerText', this.innerText)
            formData.append('fullText', this.fullText)

            const token = localStorage.getItem('myJWT');
            axios.post('http://localhost:8081/src/repository/articles.php?id=' + paramsId, formData, { headers: { 'Authorization' : token } })
            .then((repsonse) => {
                console.log(repsonse);
            })
            .catch((error) => {
                this.errormessage = error.response.data;
            })
          } else
          {
            this.changeUpdateMode();
          }
        },
        deleteArticle()
        {
          const token = localStorage.getItem('myJWT');
          const paramsId = this.$route.params.id;
          axios.delete('http://localhost:8081/src/repository/articles.php?id=' + paramsId, { headers: { 'Authorization' : token } })
          .then((response) => {
            console.log(response);
            this.$router.push("/ArtikelList");
          })
          .catch((error) => {
            console.log(error);
            this.errormessage = error.response.data;
          })
        },
        changeUpdateMode(){
          if(this.updateMode == true) { this.updateMode = false}
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
    padding: 5px 5px 1px 5px;
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
    padding: 5px 5px 1px 5px;
    margin: 10px 2px 10px 2px;
    float: left;
    font-size: 60px;
    width: auto;
}

.fullText2 {
    display: inline-block;
    padding: 5px 5px 15px 5px;
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

.errorArtikelPage {
  font-size: 25px;
  float: right;
  margin-top: -40px;
  padding-right: 10px;
  display: inline;
}

.articleForm button {
  padding: auto;
  margin-right: 20px;
  margin-top: 15px;
  width: 50%;    
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}

</style>