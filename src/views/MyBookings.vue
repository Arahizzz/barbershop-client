<template>
  <el-container>
    <el-header>
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <h1>My bookings</h1>
        </el-col>
      </el-row>
    </el-header>
    <el-main
      ><el-row type="flex" justify="center">
        <el-col :span="12">
          <el-card v-for="booking in bookings" :key="booking.id" style="margin-bottom: 15px;">
            <div>
              <h3>{{ booking.procedure.name }}</h3>
            </div>
            <div>{{ bookingTime(booking.start) }}</div>
            <el-divider/>
            <router-link :to="{name: 'bookingView', params: {id: booking.id}}"><el-button>View</el-button></router-link>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Booking } from '../models/Booking';
import { formatDateTime } from '../services/format-service'
import {getCustomerBookings} from '../services/record-service'

export default defineComponent({
  setup () {
    const bookings = ref<Booking[]>([]);
    const loadBookings = async () => {
        bookings.value = await getCustomerBookings();
        console.log(bookings.value)
    }
    return { bookings, loadBookings };
  },
  methods: {
    bookingTime (time: Date): string {
      return formatDateTime(time);
    }
  },
  mounted(){
      this.loadBookings();
  }
})
</script>
