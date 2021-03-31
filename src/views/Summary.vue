<template>
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
            <time :datetime="booking.dateTime">{{ getBookingDateTime }}</time>
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
        <el-button type="Primary">Book</el-button>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Master } from '../models/Master';
import { Procedure } from '../models/Procedure';
import { getMaster } from '../services/master-service';
import { getProcedure } from '../services/procedure-service';
import { computed, defineComponent, PropType, ref } from 'vue'
import { DateTime } from '../models/BookingInfo'
import { formatTime } from '../services/format-service';

export default defineComponent({
  name: 'Summary',
  props: {
    booking: {
      type: Object as PropType<DateTime>,
      required: true
    }
  },
  setup (props) {
    const procedure = ref<Procedure | null>(null);
    const master = ref<Master | null>(null);
    const loadSummary = async () => {
      const booking = props.booking;
      const [procedureInfo, masterInfo] = await Promise.all([getProcedure(booking.masterId), getMaster(booking.masterId)]);
      master.value = masterInfo;
      procedure.value = procedureInfo;
    };
    const getBookingDateTime = computed(() => props.booking.dateTime.toDateString() + " " + formatTime(props.booking.dateTime))
    return { procedure, master, loadSummary, getBookingDateTime }
  },
  mounted () {
    this.loadSummary();
  }
})
</script>
