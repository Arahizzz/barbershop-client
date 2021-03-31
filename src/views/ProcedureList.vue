<template>
  <el-row type="flex" justify="center" :gutter="10">
    <procedure-card
      v-for="procedure in procedures"
      :key="procedure.procedureId"
      :procedure="procedure"
      @selected="onSelect"
    />
  </el-row>
</template>

<script lang="ts">
import { Procedure } from '../models/Procedure';
import { defineComponent, ref, Ref, PropType } from 'vue'
import { getProcedures } from '../services/procedure-service'
import ProcedureCard from '../components/ProcedureCard.vue'
import { BookingStep } from '../models/BookingStep';
import { BookingInfo } from '../models/BookingInfo';

export default defineComponent({
  name: 'Procedures',
  components: {
    ProcedureCard
  },
  props: {
    booking: {
      type: Object as PropType<BookingInfo>,
      required: true
    }
  },
  setup (params) {
    const procedures = ref([] as Procedure[]);
    const loadProcedures = async () => {
      procedures.value = await getProcedures();
    };
    return { procedures, loadProcedures };
  },
  methods: {
    onSelect (procedureId: number) {
      console.log(procedureId);
      this.booking.procedureId = procedureId;
      this.$emit('update:step', BookingStep.Procedures);
    }
  },
  mounted () {
    this.loadProcedures();
  }
})
</script>
