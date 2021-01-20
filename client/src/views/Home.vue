<template>
  <div class="home row">
    <div v-for="demo in demos" :key="demo._id" class="col-md-4 playlist">
        <img :src="demo.image" class="img-thumbnail">
        <h4>{{demo.name}}</h4>
        <span class="text-muted">{{demo.price}}$</span>
    </div>
      </div>
</template>

<script>
const API_URL = 'http://localhost:5000/api/v1/demos';
export default {
  data: () => ({
    demos: [],
  }),
  mounted() {
    fetch(API_URL, {
      method: 'GET',
      headers: {
      },
    }).then((res) => {
      res.json().then((result) => {
        res.json(result);
        this.demos = result;
        console.log(result);
      });
    });
  },
};
</script>
