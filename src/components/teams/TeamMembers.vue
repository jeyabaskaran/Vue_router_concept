<template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item v-for="member in members" :key="member.id" :name="member.fullName" :role="member.role"></user-item>
    </ul>
    <router-link to="/team-list/t2">Team2</router-link>
  </section>
</template>

<script>
import UserItem from '../users/UserItem.vue';

export default {
  components: {
    UserItem
  },
  inject: ['users', 'teams'],
  props: ['teamId'],
  data() {
    return {
      teamName: "",
      members: []
    };
  },
  methods: {
    reloadedDate(pathId) {
      console.log(this.$route.params.teamId, 'pathId', this.teamId);
      const selectedTeam = this.teams.find(temp => temp.id === pathId);
      const members = selectedTeam.members;
      const selectedMembers = [];
      for (const member of members) {
        const user = this.users.find((a) => a.id == member);
        selectedMembers.push(user);
      }
      this.teamName = selectedTeam.name;
      this.members = selectedMembers;
    }
  },
  created() {
    this.reloadedDate(this.teamId);
  },
  beforeRouteUpdate(to, from, next) {
    this.reloadedDate(this.teamId);
    console.log(to, from, 'before route udpate');
    next();
  },
  watch: {
    teamId(newId) {
      console.log(this.$route.query);
      this.reloadedDate(newId);
    }
  }
};
</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

h2 {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>