<template>
  <el-steps :active="current" finish-status="success" align-center>
    <el-step title="Procedure"></el-step>
    <el-step title="Master"></el-step>
    <el-step title="Date and Time"></el-step>
    <el-step title="Account"></el-step>
    <el-step title="Summary"></el-step>
  </el-steps>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { BookingStep } from '../models/BookingStep'

export default defineComponent({
  props: {
    current: {
      type: Number as PropType<BookingStep>,
      required: true
    }
  },
  setup () {
  }
})
</script>
