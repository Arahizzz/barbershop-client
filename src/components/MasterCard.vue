<template>
  <el-col :span="20" :sm="12" :md="6" :lg="5" :xl="4">
    <el-card shadow="hover">
      <el-image
        class="master-photo"
        :src="master.photo"
        fit="cover"
        lazy
      />
      <div style="padding: 14px">
        <router-link :to="{name: 'masterPage', params: {id: master.accountId}}"><h3>
          {{ master.firstName }} {{ master.secondName }}
          {{ master.lastName }}
        </h3></router-link>
        <div class="bottom">
          <el-rate
            v-model="master.rating"
            disabled
            text-color="#ff9900"
            show-score
            score-template="{value}"
          >
          </el-rate>
          <el-rate
            v-model="master.levelId"
            :max="2"
            disabled
            :colors="['#008000']"
            :texts="['Trainee', 'Master', 'Pro']"
            show-text
          >
          </el-rate>
          <el-button type="primary" class="button" @click="handleSelect">Select</el-button>
        </div>
      </div>
    </el-card>
  </el-col>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Master } from '../models/Master'

export default defineComponent({
  emits: ['selected'],
  name: 'ProcedureCard',
  props: {
    master: {
      type: Object as PropType<Master>,
      required: true
    }
  },
  setup () {
  },
  methods: {
    handleSelect () {
      this.$emit('selected', this.master.accountId)
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
  max-width: 480px;
  margin-bottom: 20px;
}

.master {
  padding: 0px;
  height: 250px;
}

.master-photo {
  height: 200px;
  width: 200px;
}
</style>