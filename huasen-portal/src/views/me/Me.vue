<template>
  <div class="Me">
    <card>
      <template v-slot:banner> </template>
      <template v-slot:main> Me</template>
    </card>
  </div>
</template>

<script>
import Card from "@/components/content/card/Card.vue";
export default {
  name: "Me",
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
.Me {
}
</style>
