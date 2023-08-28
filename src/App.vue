<template>
  <v-app>
    <v-container>
      <v-row class="text-center">
        <header>
          <div class="wrapper">
            <nav>
              <v-col cols="auto">
                <RouterLink to="/">
                  <v-btn color="black">
                    Home
                  </v-btn>
                </RouterLink>
              </v-col>

              <RouterLink to="/about">
                <v-btn
                    color="black"
                >
                  About
                </v-btn>
              </RouterLink>
            </nav>
          </div>
        </header>


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
