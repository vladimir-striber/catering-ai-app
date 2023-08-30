<template>
  <v-container style="width: 800px;">
    <h1 class="mt-16 mb-16">Create a catering proposal</h1>

    <v-select
        v-model="categoriesValue"
        :items="categories"
        :chips="true"
        label="Categories"
        :multiple="true"
    ></v-select>

    <v-select
      v-model="ingredientsValue"
      :items="ingredients"
      :chips="true"
      label="Ingredients"
      :multiple="true"
      :return-object="true"
      item-title="name"
      item-value="id"
      @update:modelValue="updateIngredients"
    ></v-select>

    <v-select
        v-model="allergensValue"
        :items="allergens"
        :chips="true"
        label="Allergens"
        :multiple="true"
        :return-object="true"
        item-title="name"
        item-value="id"
        @update:modelValue="updateAllergens"
    >
    </v-select>

    <v-row>
      <v-col>
        <v-text-field
            v-model="numberOfPeople"
            label="Number of people"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
            v-model="budget"
            label="Budget"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row v-if="!formValid">
      <v-col>
        <span style="color: red;">The form is not valid</span>
      </v-col>
    </v-row>

    <v-row no-gutters class="text-center mt-10 mb-16" >
      <v-col>
        <v-btn
            width="200"
            color="black"
            :loading="btnLoading"
            :text="'Create a proposal'"
            @click="onCreateProposal"
        ></v-btn>
      </v-col>
    </v-row>

  </v-container>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref, toRaw} from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'
import { useProposedMealsStore } from "@/stores/proposedMeals";

export default defineComponent({
  name: 'HomeView',
  props: {},
  components: {},

  setup() {

    const proposedMeals = useProposedMealsStore();

    const router = useRouter()

    const categories: Ref<string[]> = ref(['starter', 'main', 'dessert']);
    const categoriesValue: Ref<string[]> = ref([]);
    const ingredients: Ref<unknown[]> = ref([]);
    const ingredientsValue: Ref<unknown[]> = ref([]);
    const ingredientNames: Ref<unknown[]> = ref([]);
    const allergens: Ref<unknown[]> = ref([]);
    const allergensValue: Ref<unknown[]> = ref([]);
    const allergenNames: Ref<unknown[]> = ref([]);
    const numberOfPeople: Ref<number | null> = ref(null);
    const budget: Ref<number | null> = ref(null);
    const btnLoading: Ref<boolean> = ref(false);
    const formValid: Ref<boolean> = ref(true);

    const updateIngredients = (ingredientsArray) => {
      ingredientNames.value = ingredientsArray.map(ingredient => ingredient.name);
    }

    const updateAllergens = (allergensArray) => {
      allergenNames.value = allergensArray.map(allergen => allergen.name);
    }

    const onCreateProposal = async () => {
      btnLoading.value = true;

      if (!numberOfPeople.value || !budget.value || !ingredientNames.value || !allergenNames.value) {
        formValid.value = false;
        btnLoading.value = false;
        return
      } else {
        formValid.value = true;
      }

      const payload = {
        categories: categoriesValue.value,
        ingredients: ingredientNames.value,
        allergens: allergenNames.value,
        number_of_people: Number(numberOfPeople.value),
        budget: Number(budget.value)
      }

      try {
        await proposedMeals.getProposedMeals(payload);
      } catch(err) {
        console.error(err);
      }

      setTimeout(() => {
        btnLoading.value = false;
      }, 5000);

      await router.push('/proposal');
    }

    onMounted(async () => {
      axios.get('https://phplaravel-383247-3838729.cloudwaysapps.com/api/allergens')
            .then(response => {
              allergens.value = response.data;
            });

      axios.get('https://phplaravel-383247-3838729.cloudwaysapps.com/api/ingredients')
          .then(response => {
            ingredients.value = response.data;
          });
    })

    return {
      categories,
      categoriesValue,
      ingredients,
      ingredientsValue,
      ingredientNames,
      allergens,
      allergensValue,
      allergenNames,
      numberOfPeople,
      budget,
      btnLoading,
      formValid,
      updateIngredients,
      updateAllergens,
      onCreateProposal,
    }
  }
});
</script>

<style scoped>

</style>
