<template>
  <el-row type="flex" justify="center">
    <el-col :span="12">
      <h1>Registration</h1>
      <el-form ref="register" :model="form" :rules="rules">
        <el-form-item label="Email" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input type="password" v-model="form.password" />
        </el-form-item>
        <el-form-item label="Confirm password" prop="confirmPassword">
          <el-input type="password" v-model="form.confirmPassword" />
        </el-form-item>
        <el-form-item label="First Name" prop="firstName">
          <el-input v-model="form.firstName" />
        </el-form-item>
        <el-form-item label="Last Name" prop="lastName">
          <el-input v-model="form.lastName" />
        </el-form-item>
        <el-form-item label="Second Name" prop="secondName">
          <el-input v-model="form.secondName" />
        </el-form-item>
        <el-form-item label="Phone number" prop="phoneNumber">
          <el-input v-model="form.phoneNumber" />
        </el-form-item>
        <el-form-item label="Age" prop="age">
          <el-input type="number" v-model.number="form.age" />
        </el-form-item>
        <el-form-item label="Gender" prop="gender">
          <el-radio-group v-model="form.gender">
            <el-radio label="m">Male</el-radio>
            <el-radio label="f">Female</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-button type="primary" @click="onRegister()">Register</el-button>
      </el-form>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { RegisterForm } from '../models/Account'
import { defineComponent, Ref, ref } from 'vue'
import { register } from '../services/account-service';

export default defineComponent({
  name: 'registration',
  props: {
    returnPage: {
      type: String
    }
  },
  setup () {
    const form: Ref<Partial<RegisterForm>> = ref({});
    const samePass = (_rule: any, value: string, callback: (err?: Error) => void) => {
      if (value === '') {
        callback(new Error('Please input the password again'));
      } else if (value !== form.value.password) {
        callback(new Error('Passwords don\'t match!'));
      } else {
        callback();
      }
    };
    const validPhone = (_rule: any, value: string, callback: (err?: Error) => void) => {
      if (/^[\+]?[0-9]{1,2}[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2,4}[-\s\.]?[0-9]{0,2}$/.exec(value))
        return callback();
      callback(new Error('Invalid phone format'));
    };
    const rules: Record<keyof RegisterForm, Array<any>> = {
      email: [
        { type: "email", required: true, message: 'Please enter email', trigger: 'blur' },
      ],
      password: [
        { required: true, message: 'Please enter password', trigger: 'blur' }
      ],
      confirmPassword: [
        { required: true, validator: samePass, trigger: 'blur' }
      ],
      firstName: [
        { required: true, message: 'Please enter first name', trigger: 'blur' }
      ],
      secondName: [
        { required: true, message: 'Please enter second name', trigger: 'blur' }
      ],
      lastName: [
        { required: true, message: 'Please enter last name', trigger: 'blur' }
      ],
      phoneNumber: [
        {required: true, validator: validPhone, message: 'Please enter phone number', trigger: 'blur'}
      ],
      age: [
        { type: "number", required: true, message: 'Please enter age', trigger: 'blur' }
      ],
      gender: [
        { required: true, message: 'Please select gender', trigger: 'change' }
      ]
    };
    return { form, rules };
  },
  methods: {
    onRegister (): boolean {
      (this.$refs['register'] as HTMLFormElement).validate(async (valid: boolean) => {
        if (valid) {
          console.log('valid');
          await register(this.form as RegisterForm);
          const params = this.returnPage ? {returnPage: this.returnPage} : undefined;
          this.$router.replace({name: 'login', params})
        }
      });
      return false;
    }
  }
})
</script>
