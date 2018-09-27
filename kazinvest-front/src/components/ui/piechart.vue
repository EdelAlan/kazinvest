<script>

  import colors from '../../assets/libs/colors';

	export default {

    props: ['size', 'pieces', 'hole'],

    data() {
      return {
        tooltip_style: {},
        hovered_key: '',
        key: '',
        val: '',
        colors,
      };
    },

    computed: {
      is_hole() {
        return this.hole;
      },
      total() {
        return this.pieces.reduce((acc, it) => acc + it.val, 0);
      },
      processed_pieces() {
        const result = [];
        const l = 100 / 2;
        let rotation = 0;
        this.pieces.forEach(({ val, key }, idx) => {
          const angle = 360 * val / this.total;
          const aCalc = (angle > 180) ? 360 - angle : angle;
          const angleRad = aCalc * Math.PI / 180;
          const sizeZ = Math.sqrt(2 * l * l - (2 * l * l * Math.cos(angleRad)));
          let sideX;
          if (aCalc <= 90) {
            sideX = l * Math.sin(angleRad);
          } else {
            sideX = l * Math.sin((180 - aCalc) * Math.PI / 180);
          }
          const y = Math.sqrt(sizeZ * sizeZ - sideX * sideX);
          let x;
          let arcSweep;
          if (angle <= 180) {
            x = l + sideX;
            arcSweep = 0;
          } else {
            x = l - sideX;
            arcSweep = 1;
          }
          result.push({
            val,
            key,
            percentage: val / this.total,
            color: this.colors[idx],
            d: `M${l},${l} L${l},0 A${l},${l} 0 ${arcSweep},1 ${x}, ${y} z`,
            transform: `translate(${100 * 0.05}, ${100 * 0.05}) rotate(${rotation}, ${l}, ${l})`,
          });
          rotation += angle;
        });
        return result;
      },
    },


	}
</script>

<template>
	<div class="piechart">
    <svg class="piechart-svg" :width="size * 1.1" :height="size * 1.1">
      <defs>
        <mask id="circleClip" >
          <rect fill="white" width="100%" height="100%" />
          <circle fill="black" :cx="size * 0.55" :cy="size * 0.55" :r="size * 0.4" />
        </mask>
      </defs>
      <g mask="url(#circleClip)">
        <g class="piechart-piece"
          v-for="s in processed_pieces"
          v-on:mouseover="key = s.key, val = s.val"
          :class="{ 'piechart-piece--hovered': hovered_key == s.key }">
          <path :fill="s.color" :d="s.d" :transform="s.transform" />
        </g>
      </g>
      <circle class="piechart-circle" fill="none" :cx="size * 0.55" :cy="size * 0.55" :r="size * 0.2" />
    </svg>
    <div class="piechart-legend" :style="{ 'left': size * 1.15 }">
      <div
        class="piechart-legend_item"
        v-for="({ val, key }, idx) in pieces"
        v-on:mouseover="hovered_key = key"
        v-on:mouseleave="hovered_key = ''"
      >
        <div
          class="piechart-legend_item_color"
          :style="{ 'border': '3px solid ' + colors[idx] }"></div>
        <div class="piechart-legend_item_key" v-text="key"></div>
        <div class="piechart-legend_item_val">
          <span v-text="val"></span>
        </div>
      </div>
    </div>
	</div>
</template>

<style>

  .piechart {
    position: relative;
    overflow: hidden;
  }

  .piechart-legend {
    bottom: 1em;
    overflow-y: auto;
  }

  .piechart-legend_item {
    padding: 5px 0;
    font-size: 12px;
    align-items: stretch;
  }

  .piechart-legend_item_key {
    margin-left: 1em;
  }

  .piechart-legend_item_val {
    margin-right: 1em;
    margin-left: 1em;
    width: 6em;
    color: #666;
  }

  .piechart-legend_item_color {
    border-radius: 50%;
    margin-right: 5px;
    width: 14px;
    height: 14px;
    float: left;  
    margin-bottom: 10px;
  }

  .piechart-svg {
    margin-left: .1em;
  }

  .piechart-piece {
    transition: all 200ms;
    transform-origin: 50% 50%;
  }

  .piechart-circle {
    pointer-events: all;
  }

  .piechart-tooltip {
    position: absolute;
    color: #fff;
    background: #334;
    padding: .2em .4em;
    font-size: 80%;
    z-index: 10;
    display: none;
    border-radius: .1em;
  }

  .piechart-piece--hovered {
    transform: scale(1.05);
  }

</style>
