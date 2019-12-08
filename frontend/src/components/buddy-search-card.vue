<script>
export default {
  name: 'BuddySearchCard',
  props: ['buddySearch']
}
</script>

<template lang="pug">
article.card
    h2.card-title {{ buddySearch.location.name }}, {{buddySearch.date}} 
    p {{buddySearch.boulderer.name}}
    p {{buddySearch.boulderer.level}}
</template>

<style scoped>
.card {
  overflow-x: auto;
  display: inline-block;
  text-align: left;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 3px;
  margin: 10px;
  min-width: 400px;
}
</style>