.<template>
    <div class="card2">
        <div class="card-body2">
            <h1 class="titleBox2">{{ title }}</h1>
            <div class="writerBox2"> {{ writer }} <br> {{ date }} </div> <br><br>
            <div class="innerTextBox2"> {{ innerText }} </div>
            <div class="fullText2"> {{ fullText }} </div>
        </div>
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
        }
    },
    mounted(){
         this.getArticle();
    },
    methods: {
        getArticle() {
        const paramsId = this.$route.params.id;
        axios.get('http://localhost:8081/src/repository/articles.php', { id: paramsId })
          .then((response) => {
            console.log(response);
            this.data = response.data;
          })
          .catch((error) => {
            console.log(error);
          })
        }

    }

}
</script>

<style>

.card2 {
    padding: 15px 5% 15px 5%;
    margin-left: 5%;
    margin-right: 5%;
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
}


.card2 button
{
  width: 10%;
  height: 10%;
    padding: 5px 5px 1px 5px;
    margin: 1px 2px 0px 2px;
  float: right;
}
</style>