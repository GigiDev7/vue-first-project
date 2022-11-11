<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ coach.hourlyRate }}/hour</h4>
    <div>
      <base-badge
        v-for="area in coach.areas"
        :key="area"
        :title="area"
        :type="area"
      ></base-badge>
    </div>
    <div class="actions">
      <base-button mode="outline" link :to="contactLink">Contact</base-button>
      <base-button link :to="detailLink">View Details</base-button>
    </div>
  </li>
</template>

<script>
export default {
  props: ['coach'],
  computed: {
    fullName() {
      return this.coach.firstName + ' ' + this.coach.lastName;
    },
    contactLink() {
      return `${this.$route.path}/${this.coach.id}/contact`;
    },
    detailLink() {
      return `${this.$route.path}/${this.coach.id}`;
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
