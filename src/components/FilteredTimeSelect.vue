<template>
  <el-select
    v-model="value"
    :disabled="false"
    :clearable="true"
    :clear-icon="clearIcon"
    :size="size"
    :placeholder="placeholder"
    @change="onChange"
    @blur="onBlur"
    @focus="onFocus"
  >
    <el-option
      v-for="item in items"
      :key="item.value"
      :label="item.text"
      :value="item.value"
      :disabled="item.disabled"
    />
    <template #prefix>
      <i :class="`el-input__icon ${prefixIcon}`"></i>
    </template>
  </el-select>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from 'vue'
import { TimeSlot } from '../models/TimeSlot'
import {formatTime} from '../services/format-service'

export default defineComponent({
  name: 'FilteredTimeSelector',
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    modelValue: {
      type: Object as PropType<Date>
    },
    size: {
      type: String,
      default: '',
      validator: (value: string) => !value || ['medium', 'small', 'mini'].indexOf(value) !== -1,
    },
    placeholder: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    prefixIcon: {
      type: String,
      default: 'el-icon-time',
    },
    clearIcon: {
      type: String,
      default: 'el-icon-circle-close',
    },
    slots: {
      type: Object as PropType<TimeSlot[]>,
      required: true
    }
  },
  emits: ['change', 'blur', 'focus', 'update:modelValue'],
  setup (props) {
    // data
    const value = ref(props.modelValue)
    // computed


    const items = computed(() => {
      return props.slots.map(s => {
        return {
          disabled: !s.free,
          text: formatTime(s.time),
          value: s.time
        }
      })
    })
    return {
      value,
      items
    }
  },
  methods: {
    onChange (value: Date) {
      this.$emit('change', value);
      this.$emit('update:modelValue', value);
    },
    onBlur(event: any){
      this.$emit('blur', event)
    },
    onFocus(event: any){
      this.$emit('focus', event)
    }
  }
})
</script>