<template>
  <section id="page-content"> 
  <div class="container-fluid">
  <form>
    <h3>Add a contact</h3>
    <input placeholder="Name" v-model="name" type="text">
    <input placeholder="Email" v-model="email" type="text">
    <input placeholder="Country" v-model="country" type="text">
    <input placeholder="City" v-model="city" type="text">
    <input placeholder="Job" v-model="job" type="text">
    <button type="submit" @click="addContact()">Add Contact</button>
  </form>

  <br>
  <h3>All contacts</h3>
  <table id='contactsTable' border='1' width='100%' style='border-collapse: collapse;'>
       <tr>
           <th>Id</th>
           <th>Name</th>
           <th>Email</th>
           <th>Country</th>
           <th>City</th>
           <th>Job</th>
       </tr>

       <tr v-for='contact in this.data.contacts' v-bind:key="contact.id">
           <td>{{ contact.id }}</td>
           <td>{{ contact.name }}</td>
           <td>{{ contact.email }}</td>
           <td>{{ contact.country }}</td>
           <td>{{ contact.city }}</td>
           <td>{{ contact.job }}</td>
       </tr>
    </table>
    </div>
    </section>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ContactList',
  data() { 
    return { 
              data: { contacts: [ { id: 1, name: "Gentle"} ],  },
              name: "",
              email: "",
              country: "",
              job: "",
              city: "",
            } 
  },
  mounted() {
    return this.getContacts();
  },
  methods: {
        getContacts() {
          axios.get('http://localhost:8081/src/repository/contacts.php')
          .then((response) => {
            console.log(response);
            this.data = response.data;
          })
          .catch(error => {
            console.log(error);
          })
        },

        addContact() {
          console.log("Create contact!")

          let formData = new FormData();
          console.log("name:", this.name)
          formData.append('name', this.name)
          formData.append('email', this.email)
          formData.append('city', this.city)
          formData.append('country', this.country)
          formData.append('job', this.job)

          var contact = {};
          formData.forEach(function(value, key){
              contact[key] = value;
          });

          axios.post('http://localhost:8081/src/repository/contacts.php', formData)
          .then((repsonse) => {
            console.log(repsonse);
            this.contacts.push(contact);
            this.resetForm();
          })
          .catch(error => {
            console.log(error);
          })
       },

        resetForm: function() {
            this.name = '';
            this.email = '';
            this.country = '';
            this.city = '';
            this.job = '';
        },
  },
}
</script>