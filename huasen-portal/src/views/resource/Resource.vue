<template>
  <div class="Resource">
    <card>
      <template v-slot:banner> </template>
      <template v-slot:main> Resource</template>
    </card>
  </div>
</template>

<script>
import Card from "@/components/content/card/Card.vue";
export default {
  name: "Resource",
  data() {
    return {};
  },
  created() {},
  mounted() {},
  props: {},
  components: { Card },
  methods: {},
};
</script>

<style scoped>
.Resource {
}
</style>
