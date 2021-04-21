<template>
  <booking-layout :step="step">
    <template v-slot:body>
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
            v-model="dateTime"
            :slots="timeSlots"
            placeholder="Select Time"
          >
          </filtered-time-select>
        </el-row>
        <el-row v-if="dateTime" type="flex" justify="center">
          <el-button type="primary" @click="onNext">Next</el-button>
        </el-row>
      </div>
    </template>
  </booking-layout>
</template>

<script lang="ts">
import { BookingStep } from '../../models/BookingStep'
import { defineComponent, PropType, ref, watch, watchEffect } from 'vue'
import { MasterBooking } from '../../models/BookingInfo';
import { TimeSlot } from '../../models/TimeSlot';
import { getTimeSlots } from '../../services/record-service';
import FilteredTimeSelect from '../../components/FilteredTimeSelect.vue';
import { BookingMutations } from '../../store/mutations';
import BookingLayout from './BookingLayout.vue';

export default defineComponent({
  components: { FilteredTimeSelect, BookingLayout },
  name: 'DateAndTime',
  setup (props) {
    const step = BookingStep.DateAndTime;
    const date = ref<Date | null>(null);
    const timeSlots = ref<TimeSlot[] | null>(null);
    return { step, date, timeSlots }
  },
  computed: {
    dateTime: {
      get (): Date | undefined {
        return this.$store.state.dateTime
      },
      set (value: Date) {
        this.$store.commit(BookingMutations.SELECT_DATETIME, value)
      }
    }
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
      this.$store.commit(BookingMutations.SELECT_DATETIME, this.dateTime ?? new Date());
      this.$router.push({ name: 'accountConfirm' });
    }
  },
  watch: {
    async date (date: Date) {
      this.dateTime = undefined;
      this.timeSlots = null;
      const start = new Date(date);
      const end = new Date(date);
      start.setHours(10);
      end.setHours(18);
      const state = this.$store.state as MasterBooking;
      this.timeSlots = await getTimeSlots(state.masterId, state.procedureId, start, end);
    }
  }
})
</script>

<style scoped>
.el-row {
  margin-bottom: 15px;
}
</style>