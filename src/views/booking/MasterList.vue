<template>
  <booking-layout :step="step">
    <template v-slot:body>
      <el-row type="flex" justify="center" :gutter="10">
        <master-card
          v-for="master in masters"
          :key="master.accountId"
          :master="master"
          @selected="onSelect"
        />
      </el-row>
    </template>
    <template v-slot:leftPanel>
      <el-space direction="vertical">
        <label
          >Level:
          <el-row>
            <el-select v-model="filter.levelId">
              <el-option label="None" value="" />
              <el-option label="Trainee" :value="1" />
              <el-option label="Master" :value="2" />
            </el-select>
          </el-row>
        </label>
        <label>
          Sort:
          <el-row>
            <el-select v-model="filter.sort">
              <el-option label="None" value="" />
              <el-option label="Rating (ascending)" value="rating asc" />
              <el-option label="Rating (descending)" value="rating desc" />
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
import { getMasters } from '../../services/master-service'
import { defineComponent, Ref, ref } from 'vue'
import { Master, MasterFilter } from '../../models/Master';
import MasterCard from '../../components/MasterCard.vue';
import { ProcedureBooking } from '../../models/BookingInfo';
import { BookingStep } from '../../models/BookingStep';
import { BookingMutations } from '../../store/mutations';
import BookingLayout from './BookingLayout.vue';

export default defineComponent({
  name: 'Masters',
  components: { MasterCard, BookingLayout },
  setup (props) {
    const step = BookingStep.Masters;
    const masters = ref([] as Master[]);
    const filter: Ref<MasterFilter> = ref({});
    console.log(step);
    return { step, masters, filter };
  },

  mounted () {
    this.loadMasters();
  },
  methods: {
    onSelect (masterId: number) {
      this.$store.commit(BookingMutations.SELECT_MASTER, masterId);
      this.$router.push({ name: 'dateTime' });
    },
    async loadMasters () {
      const procedure = (this.$store.state as ProcedureBooking).procedureId;
      this.masters = await getMasters(procedure, this.filter);
    },
    onRefresh () {
      if (this.filter.levelId === '')
        this.filter.levelId = undefined;
      if (this.filter.sort === '')
        this.filter.sort = undefined;
      this.loadMasters();
    },
    resetFilter () {
      this.filter.levelId = this.filter.sort = undefined;
    }
  }
})
</script>

<style scoped>
.procedures {
  align-items: stretch;
}
</style>