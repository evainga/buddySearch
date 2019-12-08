<script>
// @ is an alias to /src
import BuddySearchCard from '@/components/buddy-search-card.vue'
import { mapState, mapActions} from 'vuex'

export default {
  name: 'buddySearches',
  components: {
    BuddySearchCard
  },
  computed: {
    ...mapState(['buddySearches'])
  },
  methods: {
    ...mapActions(['fetchBuddySearches'])
  }, 
  created(){
    this.fetchBuddySearches()
  }
}
</script>

<template lang="pug">
  div  
    h1 BuddySearches
    section
      buddy-search-card(v-for="buddySearch in buddySearches", :buddySearch="buddySearch",  v-bind:key="buddySearch.id")
</template>


<style scoped>
.section{
    padding: 40px 0px;
}

</style>

