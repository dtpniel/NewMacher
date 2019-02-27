<template>
  <div v-if="items.length">
    <span class="keyword keywordreset" V-if="items.length">
      <span @click="reset()" class="keyword-remove"></span>
      <span class="keyword-text">RESET</span>
    </span>
    
    <span class="keyword" v-for="item in items" :key="item.id">
      <span @click="removeFilterItem($event,item)" class="keyword-remove"></span>
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
  },
  methods: {
    removeFilterItem: function($event, item) {
      $event.target.parentElement.classList.toggle("keyword-removed");
      setTimeout(() => {
        this.$emit("removeFilterItem", item);
      }, 200);
    },
    reset: function() {
      this.$emit("reset");
    }
  },
  mounted() {
    // console.log(this.items);
  }
};
</script>
