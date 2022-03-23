<template>
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
</template>

<script>
import axios from 'axios';

export default {
  name: 'ContactList',
  data() { return { data: { contacts: [ { id: 1, name: "Gentle"} ],  } } },
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
  },
}
</script>