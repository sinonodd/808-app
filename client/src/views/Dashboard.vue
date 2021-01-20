<template>
<section>
  <div>
    <h1 v-if="!user">One moment please...</h1>
    <h1 v-if="user">Welcome to your Dashboard {{user.username}}!</h1>
    <button @click="logout()" class="mt-5 btn btn-lg btn-outline-danger">
      Logout
    </button>
  </div>
  <div class="row">
    <div class="col-md-4 p-4">
      <h1 class="mb-5">My songs</h1>
      <form @submit.prevent="createNote()">
        <div class="form-group text-left">
          <input
            v-model="demo.title"
            type="title"
            class="form-control"
            id="demo-title"
            placeholder="demo title" required>
        </div>
        <div class="form-group text-left">
          <textarea
            v-model="demo.discreption"
            class="form-control"
            id="exampleTextarea"
            rows="3">
          </textarea>
        </div>
        <button
          type="submit"
          class="btn btn-block btn-lg btn-outline-success">
          Create
        </button>
      </form>
    </div>
    <div v-for="demo in demos"
        class="col-md-4 p-4 my-4 card"
        :key="demo._id">
      <div class="card-body">
        <h4 class="card-title">{{demo.title}}</h4>
        <p class="card-text" v-html="renderMarkDown(demo.discreption)"></p>
      </div>
    </div>
  </div>
</section>
</template>
<script>
import MarkdownIt from 'markdown-it';
import MDemoji from 'markdown-it-emoji';

const md = new MarkdownIt();
md.use(MDemoji);
const API_URL = 'http://localhost:5000/';

export default {
  data: () => ({
    user: null,
    demos: [],
    demo: {
      title: '',
      discreption: '',
      image: '',
      price: '',
    },
  }),
  mounted() {
    fetch(API_URL, {
      headers: {
        authorization: `Bearer ${localStorage.token}`,
      },
    }).then((res) => {
      res.json().then((result) => {
        if (result.user) {
          this.user = result.user;
          this.getNotes();
        } else {
          this.logout();
        }
      });
    });
  },
  methods: {
    renderMarkDown(demo) {
      return md.render(demo);
    },
    getNotes() {
      fetch(`${API_URL}api/v1/demos`, {
        headers: {
          authorization: `Bearer ${localStorage.token}`,
        },
      }).then((res) => {
        res.json().then((demos) => {
          this.demos = demos;
          console.log(this.demos);
        });
      });
    },
    createNote() {
      if (this.demo) {
        fetch(`${API_URL}api/v1/demos`, {
          method: 'POST',
          body: JSON.stringify(this.demo),
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.token}`,
          },
        }).then((res) => {
          res.json().then((demo) => {
            console.log(demo);
            this.songs.push(demo);
          });
        });
      }
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
  },
};
</script>
<style>
  .card { height: 100%; }
</style>
