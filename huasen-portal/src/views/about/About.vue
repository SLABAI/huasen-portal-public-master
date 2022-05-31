<template>
  <div class="About">
    <card>
      <template v-slot:banner> </template>
      <template v-slot:main>About</template>
    </card>
  </div>
</template>

<script>
import Card from "@/components/content/card/Card.vue";
export default {
  name: "About",
  data() {
    return {};
  },
  components: { Card },
  created() {},
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.About {
  width: 100%;
  height: 100%;
}
</style>
