<template>
  <div>
    <el-row type="flex" justify="center">
      <el-date-picker
        v-model="date"
        type="date"
        placeholder="Pick a day"
        :disabled-date="disabledDate"
      >
      </el-date-picker>
    </el-row>
    <el-row type="flex" justify="center" v-if="timeSlots">
      <filtered-time-select
        v-model="booking.dateTime"
        :slots="timeSlots"
        placeholder="Select Time"
        >
      </filtered-time-select>
    </el-row>
    <el-row v-if="booking.dateTime" type="flex" justify="center">
      <el-button type="primary" @click="onNext">Next</el-button>
    </el-row>
  </div>
</template>

<script lang="ts">
import { BookingStep } from '../models/BookingStep'
import { defineComponent, PropType, ref, watch, watchEffect } from 'vue'
import { MasterBooking } from '../models/BookingInfo';
import { TimeSlot } from '../models/TimeSlot';
import { getTimeSlots } from '../services/record-service';
import FilteredTimeSelect from '../components/FilteredTimeSelect.vue';

export default defineComponent({
  components: { FilteredTimeSelect },
  emits: ['update:step'],
  name: 'DateAndTime',
  props: {
    booking: {
      type: Object as PropType<MasterBooking>,
      required: true
    }
  },
  setup (props) {
    const date = ref<Date | null>(null);
    const timeSlots = ref<TimeSlot[] | null>(null);
    watchEffect(async () => {
      props.booking.dateTime = undefined;
      timeSlots.value = null;
      const day = date.value;
      if (day) {
        const start = new Date(day);
        const end = new Date(day);
        start.setHours(10);
        end.setHours(18);
        timeSlots.value = await getTimeSlots(props.booking.masterId, props.booking.procedureId, start, end);
      }
    })
    return { date, timeSlots }
  },
  data () {
    return {
      disabledDate (time: Date) {
        return time.getTime() < new Date(Date.now()).setHours(0, 0, 0, 0);
      }
    }
  },
  methods: {
    onNext () {
      this.$emit('update:step', BookingStep.DateAndTime);
    }
  }
})
</script>

<style scoped>
.el-row {
  margin-bottom: 15px;
}
</style>