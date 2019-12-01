<script>
export default {
  name: 'BouldererCard',
  props: ['boulderer']
}
</script>

<template lang="pug">
article.card
    img(:src="`https://picsum.photos/300/200?random=${boulderer._id}`", alt="random picture")
    h2.card-title {{ boulderer.name }} 
    p {{boulderer.level}}
    p {{boulderer.age}}
</template>

<style scoped>
.card {
  overflow-x: auto;
  display: inline-block;
  text-align: left;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 3px;
  margin: 20px;
  min-width: 200px;
  min-height: 340px;
}
.card-title{

}
</style>