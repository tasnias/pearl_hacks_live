<template>
  <div>
    <h2 class="heading py-3 pb-2 text-center">
      Attendee Directory
    </h2>
    <main class="pb-5 pt-5">
      <v-data-table
        :headers="headers"
        :items="users"
        :search="search"
        item-key="name"
        hide-default-footer
        class="elevated rounded-xl"
      >
        <template v-slot:top>
          <v-text-field
            v-model="search"
            label="Search"
            class="mx-4 pt-5"
            filled
            rounded
          ></v-text-field>
        </template>
      </v-data-table>
    </main>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Workshops",
  created() {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then(querySnapshot => {
        let allUsers = [];
        querySnapshot.forEach(doc => {
          allUsers.push({ ...doc.data() });
        });

        this.users = allUsers;
      });
  },
  data() {
    return {
      expanded: [],
      headers: [
        {
          text: "First Name",
          value: "firstname"
        },
        {
          text: "Last Name",
          value: "lastname"
        },
        { text: "Email", value: "email" },
        { text: "Role", value: "role" },
        { text: "School/Company", value: "organization" }
      ],
      search: "",
      users: []
    };
  }
};
</script>
<style lang="scss" scope></style>
