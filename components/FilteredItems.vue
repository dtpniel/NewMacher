<template>
  <div>
    <span class="keyword" v-for="item in items" :key="item.id">
      <span @click="removeFilterItem" class="keyword-remove"></span>
      <span class="keyword-text">{{item.text}}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: "FilteredItems",
  props: {
    items: {
      type: Array,
      required: true
    }
  }
};
</script>
