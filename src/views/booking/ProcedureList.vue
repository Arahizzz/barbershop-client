<template>
  <booking-layout :step="step">
    <template v-slot:body>
      <el-row type="flex" justify="center" :gutter="10">
        <procedure-card
          v-for="procedure in procedures"
          :key="procedure.procedureId"
          :procedure="procedure"
          @selected="onSelect"
        />
      </el-row>
    </template>
    <template v-slot:leftPanel>
      <el-space direction="vertical">
        <label
          >Price:
          <el-row>
            <el-col :span="10">
              <el-input v-model.number="filter.priceFrom" placeholder="From" />
            </el-col>
            <el-col :span="2"> </el-col>
            <el-col :span="10">
              <el-input v-model.number="filter.priceTo" placeholder="To" />
            </el-col>
          </el-row>
        </label>
        <label>
          Sort:
          <el-row>
            <el-select v-model="filter.sort">
              <el-option label="None" value="" />
              <el-option label="Price (ascending)" value="price asc" />
              <el-option label="Price (descending)" value="price desc" />
              <el-option label="Duration (ascending)" value="duration asc" />
              <el-option label="Duration (descending)" value="duration desc" />
            </el-select>
          </el-row>
        </label>
        <el-row>
          <el-col :span="12">
            <el-button @click="resetFilter">Reset</el-button>
          </el-col>
          <el-col :span="12">
            <el-button @click="onRefresh">Apply</el-button>
          </el-col>
        </el-row>
      </el-space>
    </template>
  </booking-layout>
</template>

<script lang="ts">
import { Procedure, ProcedureFilter } from '../../models/Procedure';
import { defineComponent, ref, Ref, PropType } from 'vue'
import { getProcedures } from '../../services/procedure-service'
import ProcedureCard from '../../components/ProcedureCard.vue'
import { BookingStep } from '../../models/BookingStep';
import { BookingInfo } from '../../models/BookingInfo';
import { BookingMutations } from '../../store/mutations';
import BookingLayout from './BookingLayout.vue';

export default defineComponent({
  name: 'Procedures',
  components: {
    ProcedureCard,
    BookingLayout
  },
  setup (params) {
    const step = BookingStep.Procedures;
    const procedures = ref([] as Procedure[]);
    const filter: Ref<ProcedureFilter> = ref({});
    const loadProcedures = async () => {
      procedures.value = await getProcedures(filter.value);
    };
    return { step, procedures, loadProcedures, filter };
  },
  methods: {
    onSelect (procedureId: number) {
      this.$store.commit(BookingMutations.SELECT_PROCEDURE, procedureId);
      this.$router.push({ name: 'master' });
    },
    onRefresh () {
      if (this.filter.sort === '')
        this.filter.sort = undefined;
      this.loadProcedures();
    },
    resetFilter(){
      this.filter.priceFrom = this.filter.priceTo = this.filter.sort = undefined;
    }
  },
  mounted () {
    this.loadProcedures();
  }
})
</script>
