<template>
  <el-container>
    <el-header>
      <booking-step :current="step" />
    </el-header>
    <el-container>
      <el-aside v-if="hasLeftPanel" width="300px">
        <slot name="leftPanel"></slot>
      </el-aside>
      <el-main>
        <transition name="slide-fade" mode="out-in">
          <slot name="body"></slot>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { BookingStep } from '../../models/BookingStep'
import { defineComponent, PropType } from 'vue'


export default defineComponent({
  name: 'BookingLayout',
  props: {
    step: {
      type: Number as PropType<BookingStep>,
      required: true
    }
  },
  setup () {
  },
  computed: {
    hasLeftPanel (): boolean {
      return !!this.$slots.leftPanel;
    }
  }
})
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 1s ease;
}
.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(30px);
  opacity: 0;
}
</style>