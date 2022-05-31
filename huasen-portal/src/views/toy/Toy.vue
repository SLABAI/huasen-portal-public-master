<template>
  <div class="Toy">
    <card>
      <template v-slot:banner> </template>
      <template v-slot:main> Toy</template>
    </card>
  </div>
</template>

<script>
import Card from "@/components/content/card/Card.vue";
export default {
  name: "Toy",
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
.Toy {
}
</style>
