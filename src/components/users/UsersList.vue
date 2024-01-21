<template>
  <button @click="Confirmed">Confirm button</button>
  <button @click="SaveChanges">SaveChanges</button>
  <ul>
    <user-item v-for="user in users" :key="user.id" :name="user.fullName" :role="user.role"></user-item>
  </ul>
</template>

<script>
import UserItem from './UserItem.vue';

export default {
  components: {
    UserItem,
  },
  data() {
    return { isChanged: false }
  },
  inject: ['users'],
  methods: {
    Confirmed() {
      this.$router.push('/team-list');
    },
    SaveChanges() {
      this.isChanged = true;
    }
  },

  beforeRouteLeave(to,from,next) {
    console.log(to,from,'before route leave');
    if (this.isChanged) {
      next();
    } else {
      const userVal = confirm('Are you sure want to exist this page?');
      console.log(userVal,'val');
      next(userVal);
    }
  },

  beforeRouteEnter(to, from, next) {
    console.log(to, from, 'before route enter');
    next();
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>