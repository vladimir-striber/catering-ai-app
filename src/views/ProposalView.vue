<template>
  <v-container>

    <v-breadcrumbs :items="breadcrumbItems" class="pl-0">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>

    <h1 class="mt-3 mb-16">Catering proposal</h1>

    <v-row v-if="proposalPageLoading">
      <v-col align="center">
        <div id="loader"></div>
      </v-col>
    </v-row>

    <div v-else>
      <div v-if="showPageContent">
        <v-row>
          <v-col align="center">
            <v-card
                v-for="(meal, index) in meals"
                :key="index"
                class="mb-4 d-flex pa-2"
                height="100"
            >
              <div style="width: 80px; height: 80px;">
                <v-img
                    :width="80"
                    :height="80"
                    :src="meal.image"
                    style="border: solid 1px #eee"
                ></v-img>
              </div>

              <div class="d-flex justify-space-between" style="width: 100%;">
                <div class="d-flex flex-column ml-4" style="font-size: 0;">
                  <p class="font-weight-medium mb-1 d-flex justify-start" style="font-size: 18px;">
                    <span>{{ transformMealName(meal) }}</span>
                  </p>
                  <div class="d-flex">
                    <p
                        v-for="(ingredient, index) in meal.ingredients"
                        :key="index"
                        class="mr-2"
                        style="font-size: 14px;"
                    >
                      {{ ingredient }}<span v-if="index < meal.ingredients.length - 1">,</span>
                    </p>
                  </div>
                </div>
                <div>
                  <p class="mr-1 mt-1" style="font-size: 15px;">
                    <span>{{ meal.quantity }}</span>&nbsp;
                    <span>x</span>&nbsp;
                    <span>{{ meal.price }}$</span>
                  </p>
                </div>
              </div>


            </v-card>
          </v-col>
        </v-row>

        <v-row class="mt-1">
          <v-col cols="3" offset="9" class="d-flex justify-end">
            <span class="mr-2" style="font-size: 18px;">Total: <b class="ml-3">{{ totalPrice }}$</b></span>
          </v-col>
        </v-row>

        <v-row no-gutters class="text-center mt-10 mb-16" >
          <v-col align-self="end">
            <v-btn
                color="black"
                width="200"
                @click=""
                :text="'Order'"
            ></v-btn>
          </v-col>
        </v-row>
      </div>
      <v-row v-else>
        <v-col align="center">
          <p>Something went wrong</p>
        </v-col>
      </v-row>
    </div>

  </v-container>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, ref, Ref, toRaw} from 'vue';
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

    const showPageContent = computed(() => {
      return Array.isArray(meals.value) && meals.value?.length > 0;
    })

    const transformMealName = (meal) => {
      return meal?.meal?.charAt(0)?.toUpperCase() + meal?.meal?.substring(1);
    }

    onMounted( async () => {

      console.log(JSON.parse(JSON.stringify(proposedMeals.proposedMeals)), 'proposedMeals store call');

      const response = await JSON.parse(JSON.stringify(proposedMeals.proposedMeals))

      meals.value = response[0];
      totalPrice.value = response[1];

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
      showPageContent,
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
