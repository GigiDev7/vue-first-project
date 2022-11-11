<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="firstname">Firstname</label>
      <input v-model.trim="firstname" type="text" id="firstname" />
    </div>
    <div class="form-control">
      <label for="lastname">Lastname</label>
      <input v-model.trim="lastname" type="text" id="lastname" />
    </div>
    <div class="form-control">
      <label for="description">Description</label>
      <textarea v-model.trim="description" id="description" rows="5"></textarea>
    </div>
    <div class="form-control">
      <label for="rate">Hourly Rate</label>
      <input v-model.number="rate" type="number" id="rate" />
    </div>
    <div class="form-control">
      <h3>Areas of Expertise</h3>
      <div>
        <input v-model="areas" type="checkbox" id="frontend" value="frontend" />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input v-model="areas" type="checkbox" id="backend" value="backend" />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input v-model="areas" type="checkbox" id="career" value="career" />
        <label for="career">Career Development</label>
      </div>
    </div>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      firstname: '',
      lastname: '',
      description: '',
      areas: [],
      rate: null,
    };
  },
  emits: ['save-data'],
  methods: {
    submitForm() {
      const formData = {
        first: this.firstname,
        last: this.lastname,
        desc: this.description,
        rate: this.rate,
        areas: this.areas,
      };
      this.$emit('save-data', formData);
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
