<script>

  import colors from '../../assets/libs/colors';

	export default {

    props: ['bars'],

    data() {
      return {
        colors,
      };
    },

	}
</script>

<template>
	<div class="piechart">
    <figure>
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="chart" width="100%" height="155" aria-labelledby="title" role="img">
        <g class="bar">
          <text y="9.5" dy=".35em" v-text="2015"></text>
          <rect x="50" :width="bars[0].percent_val + `%`" height="8" y="5" rx="5" ry="5"></rect>
          <text :x="15 + bars[0].percent_val + `%`" y="9.5" dy=".35em" v-text="bars[0].val"></text>
        </g>
        <g class="bar">
          <text y="54.5" dy=".35em" v-text="2016"></text>
          <rect x="50" :width="bars[1].percent_val + `%`" height="8" y="50" rx="5" ry="5"></rect>
          <text :x="15 + bars[1].percent_val + `%`" y="54.5" dy=".35em" v-text="bars[1].val"></text>
        </g>
        <g class="bar">
          <text y="99.5" dy=".35em" v-text="2017"></text>
          <rect x="50" :width="bars[2].percent_val + `%`" height="8" y="95" rx="5" ry="5"></rect>
          <text :x="15 + bars[2].percent_val + `%`" y="99.5" dy=".35em" v-text="bars[2].val"></text>
        </g>
        <g class="bar">
          <text y="144.5" dy=".35em" v-text="2018"></text>
          <rect x="50" :width="bars[3].percent_val + `%`" height="8" y="140" rx="5" ry="5"></rect>
          <text :x="15 + bars[3].percent_val + `%`" y="144.5" dy=".35em" v-text="bars[3].val"></text>
        </g>
      </svg>
    </figure>
	</div>
</template>

<style>

  .piechart {
    position: relative;
    overflow: hidden;
  }

  .bar {
    fill: #03A0E3;
    height: 21px;
    transition: fill .3s ease;
    cursor: pointer;
    font-family: Helvetica, sans-serif;
    border-radius: 2px;
  }
  .bar text {
    fill: #949494;
  }

  .chart:hover .bar,
  .chart:focus .bar {
    fill: #03A0E3;
  }

  .bar:hover,
  .bar:focus {
    fill: red !important;
  }
  .bar:hover text,
  .bar:focus text {
    fill: red;
  }

</style>
