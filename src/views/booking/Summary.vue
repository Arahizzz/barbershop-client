<template>
  <booking-layout :step="step">
    <template v-slot:body>
      <el-row type="flex" justify="center">
        <el-col :span="22">
          <el-card>
            <template v-slot:header class="clearfix">
              <h1>Booking Summary</h1>
            </template>
            <div v-if="procedure && master">
              <div>
                <i class="el-icon-scissors"></i>Procedure: {{ procedure.name }}
              </div>
              <div>
                <i class="el-icon-user"></i>Master: {{ master.firstName }}
                {{ master.secondName }} {{ master.lastName }}
              </div>
              <div>
                <i class="el-icon-date"></i>Date:
                <time :datetime="booking.dateTime.toISOString()">{{
                  getBookingDateTime
                }}</time>
              </div>
              <div>
                <i class="el-icon-time"></i>Duration:
                {{ procedure.duration }} minutes
              </div>
              <div>
                <i class="el-icon-money"></i>Price: {{ procedure.price }} UAH
              </div>
            </div>
            <el-divider />
            <el-button type="Primary" @click="onSubmit">Book</el-button>
          </el-card>
        </el-col>
      </el-row>
    </template>
  </booking-layout>
</template>

<script lang="ts">
import { Master } from '../../models/Master';
import { Procedure } from '../../models/Procedure';
import { getMaster } from '../../services/master-service';
import { getProcedure } from '../../services/procedure-service';
import {addBooking} from '../../services/record-service';
import { defineComponent, ref } from 'vue'
import { CustomerBooking } from '../../models/BookingInfo'
import { formatTime } from '../../services/format-service';
import { BookingStep } from '../../models/BookingStep';
import BookingLayout from '../booking/BookingLayout.vue';

export default defineComponent({
  name: 'Summary',
  components: {BookingLayout},
  setup (props) {
    const step = BookingStep.Summary;
    const procedure = ref<Procedure | null>(null);
    const master = ref<Master | null>(null);
    return { step, procedure, master }
  },
  mounted () {
    this.loadSummary();
  },
  computed: {
    booking (): CustomerBooking {
      return this.$store.state as CustomerBooking;
    },
    getBookingDateTime (): string {
      return this.booking.dateTime.toDateString() + " " + formatTime(this.booking.dateTime);
    },
  },
  methods: {
    async loadSummary () {
      const booking = this.booking;
      const [procedureInfo, masterInfo] = await Promise.all([getProcedure(booking.masterId), getMaster(booking.masterId)]);
      this.master = masterInfo;
      this.procedure = procedureInfo;
    },
    async onSubmit(){
      await addBooking(this.booking);
      this.$router.push({name: 'bookingSuccess'});
    }
  },
  beforeRouteEnter(to, from, next){
    next(vm => {
      const state = vm.$store.state;
      if (state.procedureId && state.masterId && state.dateTime && state.customerId)
        vm.$route = from;
    });
  }
})
</script>
