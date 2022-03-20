<template>
  <div id='contactsTable'>
  <table border='1' width='100%' style='border-collapse: collapse;'>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Country</th>
                    <th>City</th>
                    <th>Job</th>
                </tr>

                <tr v-for='contact in contacts' v-bind:key="contact.name">
                    <td>{{ contact.name }}</td>
                    <td>{{ contact.email }}</td>
                    <td>{{ contact.country }}</td>
                    <td>{{ contact.city }}</td>
                    <td>{{ contact.job }}</td>
                </tr>
                </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ContactList',
  data() { return this.getContacts() },
  methods:
  {
      getContacts: function() {
    //    axios.get('http://localhost:8081/src/repository/contacts.php')
        axios.get('/repository/contacts.php')
        .then(function (response) {
            this.contacts = response.data;
            console.log(response.data);
        })
        .catch(function (error) { console.log(error); });
    }
  }

}
</script>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>