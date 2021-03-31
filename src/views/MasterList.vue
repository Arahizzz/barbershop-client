<template>
  <el-row type="flex" justify="center" :gutter="10">
    <master-card
      v-for="master in masters"
      :key="master.accountId"
      :master="master"
      @selected="onSelect"
    />
  </el-row>
</template>

<script lang="ts">
import { getMasters } from '../services/master-service'
import { defineComponent, PropType, ref } from 'vue'
import { Master } from '../models/Master';
import MasterCard from '../components/MasterCard.vue';
import { ProcedureBooking } from '../models/BookingInfo';
import { BookingStep } from '../models/BookingStep';

export default defineComponent({
  name: 'Masters',
  components: { MasterCard },
  props: {
    booking: {
      type: Object as PropType<ProcedureBooking>,
      required: true
    }
  },
  setup (props) {
    const procedure = props.booking.procedureId;
    const masters = ref([] as Master[]);
    const loadMasters = async () => {
      masters.value = await getMasters(procedure);
      console.log(masters.value)
    };
    return { masters, loadMasters, procedure };
  },
  mounted () {
    this.loadMasters();
  },
  methods: {
    onSelect (masterId: number) {
      this.booking.masterId = masterId;
      this.$emit('update:step', BookingStep.Masters);
    }
  }
})
</script>

<style scoped>
.procedures {
  align-items: stretch;
}
</style>