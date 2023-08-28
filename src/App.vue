<template>
  <v-app>
    <v-container>
      <v-row class="text-center">
        <v-col cols="auto">
          <RouterLink to="/">
            <v-btn color="black">
              Home
            </v-btn>
          </RouterLink>
        </v-col>

        <v-col cols="auto">
          <RouterLink to="/about">
            <v-btn
                color="black"
            >
              Checkout
            </v-btn>
          </RouterLink>
        </v-col>

      </v-row>
    </v-container>

    <RouterView />

  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',

  data () {
    return {
      //
    }
  },
})
</script>
