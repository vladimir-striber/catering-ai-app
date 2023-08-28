<template>
  <v-container>
    <h1>This is a Home page</h1>
    <v-select
      v-model="value"
      :items="items"
      chips
      label="Chips"
      multiple
      @update:modelValue="updateItems"
    ></v-select>
  </v-container>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, ref, Ref, toRaw} from 'vue';
// import { RouterLink, RouterView } from 'vue-router'

// Components

export default defineComponent({
  name: 'HomeView',
  props: {},
  components: {},

  setup() {
    const testComputed = computed((): string => {
      return 'Button text';
    })

    const items: Ref<String[]> = ref(['foo', 'bar', 'fizz', 'buzz']);
    const value: Ref<String[]> = ref(['foo', 'bar', 'fizz', 'buzz']);

    const updateItems = () => {
      console.log(toRaw(value.value), 'value');
    }

    onMounted(() => {
      console.log('onMounted test');
      console.log(toRaw(value.value), 'value on mounted');
    })

    return {
      testComputed,
      items,
      value,
      updateItems,
    }
  }
});
</script>

<style scoped>


</style>
