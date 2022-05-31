<!--
 * @Autor: huasenjio
 * @Date: 2021-10-31 10:52:35
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-05-25 00:34:38
 * @Description: 
-->
<template>
  <div class="hs-weather">
    <div id="he-plugin-simple" ref="hWeather"></div>
  </div>
</template>
<script>
export default {
  name: 'Weather',
  mounted() {
    window.WIDGET = {
      CONFIG: {
        modules: '12034',
        background: 5,
        tmpColor: 'E4C600',
        tmpSize: 14,
        cityColor: 'E4C600',
        citySize: 14,
        aqiColor: '#E4C600',
        aqiSize: 14,
        weatherIconSize: 24,
        alertIconSize: 18,
        padding: '0px 0px 0px 0px',
        shadow: '1',
        language: 'auto',
        borderRadius: 5,
        fixed: 'false',
        vertical: 'middle',
        horizontal: 'left',
        key: 'e05c4ce44b7e43c6a9303e68cc42a48c',
      },
    };
    this.TOOL.getCDN(
      'https://widget.qweather.net/simple/static/js/he-simple-common.js?v=2.0',
      'text/javascript',
    );
  },
};
</script>

<style lang="scss" scoped>
.hs-weather {
  max-width: 200px;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  pointer-events: none;
}
</style>
