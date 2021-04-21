<template>
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <img
          alt="Vue logo"
          class="element-plus-logo"
          src="../assets/logo.png"
        />
        <h1>Login</h1>
        <el-form ref="login" :model="credentials" :rules="rules">
          <el-form-item label="Email" prop="email">
            <el-input v-model="credentials.email" />
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input type="password" v-model="credentials.password" />
          </el-form-item>
          <el-button type="primary" @click="onLogin()">Login</el-button>
        </el-form>
      </el-col>
    </el-row>
</template>

<script lang="ts">
import { log } from 'node:console';
import { ref, defineComponent, Ref } from 'vue';
import { Credentials } from '../models/Credentials'
import { login } from '../services/account-service'

export default defineComponent({
  name: 'Login',
  props: {
    returnPage: {
      type: String
    }
  },
  setup: () => {
    const credentials: Ref<Partial<Credentials>> = ref({});
    const rules = {
      email: [
        { type: "email", required: true, message: 'Please enter email', trigger: 'blur' },
      ],
      password: [
        { required: true, message: 'Please enter password', trigger: 'blur' }
      ]
    };
    return { credentials, rules };
  },
  methods: {
    onLogin (): boolean {
      (this.$refs['login'] as HTMLFormElement).validate(async (valid: boolean) => {
        if (valid) {
          console.log('valid');
          await login(this.credentials as Credentials);
          const returnPage = this.returnPage;
          this.$router.replace(returnPage ? { name: returnPage } : { path: '/' })
        }
      });
      return false;
    }
  }
});
</script>