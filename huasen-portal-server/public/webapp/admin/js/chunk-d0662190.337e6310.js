(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d0662190"],{"6f7c":function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"FlowAnalysisChart"},[e("div",{staticClass:"chart-container relative left-px-10",attrs:{id:t.chartId}}),e("h3",{staticClass:"chart-title absolute left-px-10 top-px-10"},[t._v(t._s(t.chartName))])])},s=[],r={name:"FlowAnalysisChart",data:function(){return{chart:null,chartId:this.TOOL.getUid(8,8)}},props:{chartData:{type:Object,default:function(){}},chartName:{type:String,default:function(){return""}}},watch:{chartData:{handler:function(t,a){var e=this;t!==a&&this.$nextTick((function(){e.initChart()}))},deep:!0,immediate:!0}},methods:{initChart:function(){var t={tooltip:{trigger:"axis",axisPointer:{type:"cross",crossStyle:{color:"#999"}}},color:["#2db4f6","#7c59c2","#fac858","#ee6666"],xAxis:[{type:"value",axisLabel:{formatter:"{value} 人次"}}],yAxis:[{type:"category",data:this.chartData.times,axisPointer:{type:"shadow"}}],series:[{name:"陌生人",type:"bar",data:this.chartData.adminCounts},{name:"注册用户",type:"bar",data:this.chartData.userCounts},{name:"其他",type:"bar",data:this.chartData.otherCounts},{name:"总和",type:"line",data:this.chartData.totalCounts}]};this.chart||(this.chart=this.$echarts.init(document.getElementById(this.chartId))),this.chart.setOption(t)}}},n=r,c=(e("b0e1"),e("2877")),h=Object(c["a"])(n,i,s,!1,null,"2f391e28",null);a["default"]=h.exports},8519:function(t,a,e){},b0e1:function(t,a,e){"use strict";e("8519")}}]);