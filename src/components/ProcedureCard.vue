<template>
  <el-col :span="20" :sm="12" :md="8" :lg="6">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <h3>{{ procedure.name }}</h3>
          <el-button class="primary" type="text" @click="handleSelect">
            Select
          </el-button>
        </div>
      </template>
      <p>Duration: {{ procedure.duration }}</p>
      <p>Price: {{ procedure.price }}</p>
    </el-card>
  </el-col>
</template>

<script lang="ts">
import { Procedure } from '../models/Procedure'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  emits: ['selected'],
  name: 'ProcedureCard',
  props: {
    procedure: {
      type: Object as PropType<Procedure>,
      required: true
    }
  },
  setup () {

  },
  methods: {
    handleSelect () {
      this.$emit('selected', this.procedure.procedureId)
    }
  }
})
</script>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  /* max-width: 480px; */
  margin-bottom: 20px;
}
</style>