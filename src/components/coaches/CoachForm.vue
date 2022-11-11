<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstNameValid }">
      <label for="firstname">Firstname</label>
      <input v-model.trim="firstname" type="text" id="firstname" />
      <p v-if="!firstNameValid">Firstname must not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastNameValid }">
      <label for="lastname">Lastname</label>
      <input v-model.trim="lastname" type="text" id="lastname" />
      <p v-if="!lastNameValid">Lastname must not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !descriptionValid }">
      <label for="description">Description</label>
      <textarea v-model.trim="description" id="description" rows="5"></textarea>
      <p v-if="!descriptionValid">Description must not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !rateValid }">
      <label for="rate">Hourly Rate</label>
      <input v-model.number="rate" type="number" id="rate" />
      <p v-if="!rateValid">Rate must be greater than 0</p>
    </div>
    <div class="form-control" :class="{ invalid: !areasValid }">
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
      <p v-if="!areasValid">At least one expertise must be selected</p>
    </div>
    <p v-if="!formIsValid">Please fix above errors</p>
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
      firstNameValid: true,
      lastNameValid: true,
      descriptionValid: true,
      areasValid: true,
      rateValid: true,
      formIsValid: true,
    };
  },
  emits: ['save-data'],
  methods: {
    validateForm() {
      this.formIsValid = true;
      this.lastNameValid = true;
      this.firstNameValid = true;
      this.descriptionValid = true;
      this.rateValid = true;
      this.areasValid = true;
      if (!this.firstname) {
        this.firstNameValid = false;
        this.formIsValid = false;
      }
      if (!this.lastname) {
        this.lastNameValid = false;
        this.formIsValid = false;
      }
      if (!this.description) {
        this.descriptionValid = false;
        this.formIsValid = false;
      }
      if (!this.rate || this.rate < 0) {
        this.rateValid = false;
        this.formIsValid = false;
      }
      if (!this.areas.length) {
        this.areasValid = false;
        this.formIsValid = false;
      }
      return this.formIsValid;
    },
    submitForm() {
      const isFormValid = this.validateForm();
      if (!isFormValid) return;

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
