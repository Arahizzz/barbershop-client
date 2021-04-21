<template>
  <booking-layout :step="step">
    <template v-slot:body>
      <el-row type="flex" justify="center">
        <el-col :span="22">
          <template v-if="account !== undefined">
            <el-card v-if="account === null">
              <template v-slot:header class="clearfix">
                <h1>You are not logged in</h1>
              </template>
              <p>You must login into your account in order to go to the next step.</p>
              <el-divider />
              <el-row>
                <el-col>
                  <el-button type="primary" @click="onLogin">Login</el-button>
                  <el-button type="info" @click="onRegister">Register</el-button>
                </el-col>
              </el-row>
            </el-card>
            <el-card v-else>
              <template v-slot:header class="clearfix">
                <h1>Your contact info:</h1>
              </template>
              <div>
                <i class="el-icon-user"></i>{{account.firstName}} {{account.secondName}} {{account.lastName}}
              </div>
              <div>
                <i class="el-icon-message"></i>{{account.email}}
              </div>
              <div>
                <i class="el-icon-phone"></i>{{account.phoneNumber}}
              </div>
              <el-divider/>
              <el-row>
                <el-col>
                  <el-button type="primary" @click="onNext">Next</el-button>
                  <el-button type="info" @click="onLogin">Login</el-button>
                  <el-button type="info" @click="onRegister">Register</el-button>
                </el-col>
              </el-row>
            </el-card>
          </template>
        </el-col>
      </el-row>
    </template>
  </booking-layout>
</template>

<script lang="ts">
import { AccountInfo } from '../../models/Account';
import { defineComponent, Ref, ref } from 'vue'
import { getAccount } from '../../services/account-service'
import { BookingMutations } from '../../store/mutations';
import { BookingStep } from '../../models/BookingStep';
import BookingLayout from './BookingLayout.vue';

export default defineComponent({
  name: 'AccountStep',
  components: {BookingLayout},
  setup () {
    const account: Ref<AccountInfo | null | undefined> = ref(undefined);
    const step = BookingStep.AccountConfirm;
    const loadInfo = async () => {
      account.value = await getAccount();
    };
    return { account, loadInfo, step };
  },
  methods: {
    onLogin(){
      this.$router.push({name: 'login', params: {returnPage: 'accountConfirm'}});
    },
    onRegister(){
      this.$router.push({name: 'register', params: {returnPage: 'accountConfirm'}});
    },
    onNext(){
      this.$store.commit(BookingMutations.CONFIRM_CUSTOMER, (this.account as AccountInfo).accountId);
      this.$router.push({name: 'summary'});
    }
  },
  mounted(){
    this.loadInfo();
  }
})
</script>
