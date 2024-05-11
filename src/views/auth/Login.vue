<script>
import useLogin from "@/composables/useLogin";
import {ref} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  setup () {
  const {error, login, isPenging } = useLogin();
  const router = useRouter();
  const store = useStore();

  const email = ref("");
  const password = ref("");
  const handleSubmit = async () => {
    const res = await login(email.value, password.value);
    if (!error.value) {
      router.push({name: 'home'});
      store.dispatch("setUser", res.user);
      console.log(store.getters.getUser);
    }
  };
    return { email, password, handleSubmit, error, isPenging };
  },

};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div v-if="error" class="error"> {{ error }} </div>
    <button v-if="!isPenging">Login</button>
    <button v-if="isPenging">Loading</button>
  </form>
</template>


<style></style>