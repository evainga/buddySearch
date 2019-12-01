<script>
// @ is an alias to /src
import BouldererCard from '@/components/boulderer-card.vue'
import { mapState, mapActions} from 'vuex'

export default {
  name: 'boulderers',
  components: {
    BouldererCard
  },
  computed: {
    ...mapState(['boulderers'])
  },
  methods: {
    ...mapActions(['fetchBoulderers'])
  }, 
  created(){
    this.fetchBoulderers()
  }
}
</script>

<template lang="pug">
  div  
    h1 Boulderers looking for buddys
    section
      boulderer-card(v-for="boulderer in boulderers", :boulderer="boulderer",  v-bind:key="boulderer.id")
    
</template>


<style scoped>
.section{
    padding: 40px 0px;
}

</style>

