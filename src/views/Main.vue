<template>
<el-container>
  <el-header>
    <el-row type="flex" justify="end">
      <router-link :to="{name: 'procedure'}"><el-button>Create Booking</el-button></router-link>
      <router-link :to="{name: 'clientBookings'}"><el-button>View bookings</el-button></router-link>
    </el-row>
  </el-header>
  <el-main>
    <h1>Barber Shop</h1>
    <p>We are the best barbershop in Kyiv!</p>
  </el-main>
</el-container>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
export default defineComponent({
  name: 'MainPage',
  setup: () => {

  }
})
</script>

