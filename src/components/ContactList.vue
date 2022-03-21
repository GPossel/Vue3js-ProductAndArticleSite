<template>
  <v-container>
    <h1>Contacts</h1>
    <v-data-table
      :headers="headers"
      :items="contacts"
      :items-per-page="10"
      class="elevation-1"
      >
    </v-data-table>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() { return { contacts: [], contact: {} } },
  computed: {
    headers() {
      return [
          { text: "Id", value: "id"},
          { text: "Name", value: "name"},
          { text: "Email", value: "email"},
          { text: "City", value: "city"},
          { text: "Country", value: "country"},
          { text: "Job", value: "job"},
      ];
    }
  },
  mounted() {
    this.getContacts();
  },
  methods: {
        getContacts() {
          axios.get('http://localhost:8081/src/repository/contacts.php')
          .then((response) => {
            console.log(response);
            this.contacts = response.data;
          })
          .catch(error => {
            console.log(error);
          })

        },
  },
}
</script>