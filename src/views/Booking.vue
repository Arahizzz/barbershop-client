<template>
  <el-container>
    <el-header>
      <booking-step :current="step" />
    </el-header>
    <el-main>
      <transition name="slide-fade" mode="out-in">
        <component
          :is="currentComponent"
          :booking="booking"
          @update:step="nextStep"
        />
      </transition>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { BookingStep } from '../models/BookingStep'
import { computed, defineComponent, ref } from 'vue'
import { BookingInfo } from '../models/BookingInfo'
import Procedures from '../views/ProcedureList.vue';
import Masters from '../views/MasterList.vue';
import DateAndTime from '../views/DateAndTime.vue';
import Summary from '../views/Summary.vue';

export default defineComponent({
  components: {
    Procedures, Masters, DateAndTime, Summary
  },
  setup () {
    const step = ref(BookingStep.Procedures);
    const currentComponent = computed(() => BookingStep[step.value])
    return { booking: ref<BookingInfo>({}), step, currentComponent }
  },
  methods: {
    nextStep (step: BookingStep) {
      console.log(step)
      switch (step) {
        case BookingStep.Procedures:
          this.step = BookingStep.Masters;
          break;
        case BookingStep.Masters:
          this.step = BookingStep.DateAndTime;
          break;
        case BookingStep.DateAndTime:
          this.step = BookingStep.Summary;
          break;
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    switch (this.step) {
      case BookingStep.Procedures:
        next();
        return;
      case BookingStep.Masters:
        this.step = BookingStep.Procedures;
        break;
      case BookingStep.DateAndTime:
        this.step = BookingStep.Masters;
        break;
      case BookingStep.Summary:
        this.step = BookingStep.DateAndTime;
        break;
    }
    next(false);
  }
})
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 1s ease;
}
.slide-fade-leave-active {
  transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(30px);
  opacity: 0;
}
</style>