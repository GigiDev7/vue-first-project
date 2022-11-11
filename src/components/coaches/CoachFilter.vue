<template>
  <base-card>
    <h2>Find Your Coach</h2>
    <span class="filter-option">
      <input
        type="checkbox"
        id="frontend"
        name="frontend"
        checked
        @change="setFilter"
      />
      <lable for="frontend">Frontend</lable>
    </span>
    <span class="filter-option">
      <input
        type="checkbox"
        id="backend"
        name="backend"
        checked
        @change="setFilter"
      />
      <lable for="backend">Backend</lable>
    </span>
    <span class="filter-option">
      <input
        type="checkbox"
        id="career"
        name="career"
        checked
        @change="setFilter"
      />
      <lable for="career">Career</lable>
    </span>
  </base-card>
</template>

<script>
export default {
  emits: ['change-filter'],
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  methods: {
    setFilter(e) {
      const inputName = e.target.name;
      const isChecked = e.target.checked;

      const updatedFilters = { ...this.filters, [inputName]: isChecked };
      this.filters = updatedFilters;
      this.$emit('change-filter', updatedFilters);
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
