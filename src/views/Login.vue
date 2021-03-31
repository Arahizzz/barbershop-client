<template>
  <img alt="Vue logo" class="element-plus-logo" src="../assets/logo.png" />
  <h1>Login</h1>
  <el-input v-model="email" />
  <el-input type="password" v-model="password" />
  <button>Login</button>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { Credentials } from '../models/Credentials'

export default defineComponent({
  name: 'Login',
  setup: () => {
    const credentials = new Credentials();
    return { email: ref(credentials.email), password: ref(credentials.password) };
  }
});
</script>