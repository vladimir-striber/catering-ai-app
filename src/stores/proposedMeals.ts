import {ref, computed, toRaw} from 'vue'
import { defineStore } from 'pinia';
import axios from "axios";

export const useProposedMealsStore = defineStore('proposedMeals', () => {

    const proposedMeals = ref([]);
    async function getProposedMeals(payload: unknown) {
        const response = await axios.post('https://phplaravel-383247-3838729.cloudwaysapps.com/api/proposal', payload)
            .then(response => {
                proposedMeals.value = response.data;
            });

        return proposedMeals.value;
    }

    return { proposedMeals, getProposedMeals };
})
