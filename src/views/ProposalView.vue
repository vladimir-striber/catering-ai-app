<template>
  <v-container>

    <v-breadcrumbs :items="breadcrumbItems" class="pl-0">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>

    <h1 class="mt-3 mb-16">Catering proposal</h1>

    <v-row>
      <v-col align="center">
        <div id="loader" v-if="proposalPageLoading"></div>
        <v-card
            v-else
            v-for="(meal, index) in meals"
            class="mb-1"
            height="100"
        >
          {{ transformMealName(meal) }}
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="3" offset="9" class="d-flex justify-end">
        <span v-if="!proposalPageLoading">Subtotal: <b class="ml-3">{{ totalPrice }}$</b></span>
      </v-col>
    </v-row>

    <v-row no-gutters class="text-center mt-10 mb-16" >
      <v-col align-self="end">
        <v-btn
            class="text-none text-subtitle-1"
            color="black"
            width="200"
            @click=""
            :text="'Order'"
        ></v-btn>
      </v-col>
    </v-row>

  </v-container>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref, toRaw} from 'vue';
import { useProposedMealsStore } from "@/stores/proposedMeals";

export default defineComponent({
  name: 'HomeView',
  props: {},
  components: {},

  setup() {

    const proposedMeals = useProposedMealsStore();

    const meals: Ref<unknown[]> = ref([]);
    const totalPrice: Ref<number> = ref(null);
    const proposalPageLoading: Ref<boolean> = ref(true);

    const breadcrumbItems: Ref<unknown[]> = ref(
        [
          {
            title: 'Go back',
            disabled: false,
            href: '/',
          },
          {
            title: 'Proposal',
            disabled: true,
            href: '/proposal',
          },
        ]
    );

    const transformMealName = (meal) => {
      return meal?.meal?.charAt(0)?.toUpperCase() + meal?.meal?.substring(1);
    }

    onMounted( async () => {

      console.log(JSON.parse(JSON.stringify(proposedMeals.proposedMeals)), 'proposedMeals store call');

      const response = await JSON.parse(JSON.stringify(proposedMeals.proposedMeals))

      meals.value = response;
      totalPrice.value = response.total_price;

      console.log(toRaw(meals.value), 'meals.value');

      setTimeout(() => {
        proposalPageLoading.value = false;
      }, 5000);
    })

    return {
      proposedMeals,
      meals,
      totalPrice,
      proposalPageLoading,
      breadcrumbItems,
      transformMealName,
    }
  }
});
</script>

<style scoped>

#loader{
  height: 48px;
  width: 48px;
  border-radius: 50%;
  border: 5px solid #ddd;
  border-top-color: #333;
  animation: rotate 1s infinite;
}
@keyframes rotate {
  100% {
    rotate: 360deg;
  }
}

</style>
