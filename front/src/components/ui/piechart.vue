<script>

  import { mapGetters, mapActions } from 'vuex';
  import colors from '../../assets/libs/colors';

	export default {

    props: ['sectors'],

    data() {
      return {
        colors,
        size: 165,
      };
    },

    computed: {
      ...mapGetters([
        'lang',
      ]),

      total () {
        return this.sectors.reduce((acc, it) => acc + it.val, 0);
      },

      processed_sectors () {
        const result = [];
        const l = this.size / 2;
        let rotation = 0;
        this.sectors.forEach(({ val, key }, idx) => {
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
            transform: `translate(${this.size * 0.05}, ${this.size * 0.05}) rotate(${rotation}, ${l}, ${l})`,
          });
          rotation += angle;
        });
        return result;
      },
    },

    methods: {
      separated_num (num) {
        let newnum = '';
        let space_count = 0;
        for (let i = String(num).length-1; i >= 0; i--) {
          newnum += String(num)[i];
          if ((newnum.length - space_count) % 3 == 0) {
            newnum += ' ';
            space_count += 1;
          }
        }
        if (newnum[0] == ' ') {
          newnum = newnum.slice(1);
        }
        return newnum.split('').reverse().join('');
      },

      b_formatter(num) {
        return num > 999999 ? (num/1000000000).toFixed(2) + (this.lang == 'en' ? ' B.tg.' : ' млрд.тг') : num;
      },
    },

	}
</script>

<template>
	<div class="piechart">
    <span class="piechart-total" v-text="sectors[0].val == sectors[1].val/100*0.1 ? b_formatter(parseInt(sectors[1].val,10)) : sectors[1].val == sectors[0].val/100*0.1 ? b_formatter(parseInt(sectors[0].val,10)) : b_formatter(parseInt(total,10))"></span>
    <svg class="piechart-svg" :width="size * 1.1" :height="size * 1.1">
      <defs>
        <mask id="circleClip" >
          <rect fill="white" width="100%" height="100%" />
          <circle fill="black" :cx="size * 0.55" :cy="size * 0.55" :r="size * 0.39" />
        </mask>
      </defs>
      <g mask="url(#circleClip)">
        <g class="piechart-piece"
          v-for="s in processed_sectors">
          <path :fill="s.color" :d="s.d" :transform="s.transform" />
        </g>
      </g>
      <circle class="piechart-circle" fill="none" :cx="size * 0.55" :cy="size * 0.55" :r="size * 0.2" />
    </svg>
    <div class="piechart-legend" :style="{ 'left': size * 1.15 }">
      <div
        class="piechart-legend_item"
        v-for="({ val, key }, idx) in sectors"
      >
        <div
          class="piechart-legend_item_color"
          :style="{ 'border': '3px solid ' + colors[idx] }"></div>
        <div class="piechart-legend_item_key" v-text="key['title_'+lang]"></div>
        <div class="piechart-legend_item_val">
          <span v-text="val == sectors[1].val/100*0.1 && val < sectors[1].val ? 0 + ' (0 %)' : 
                        val == sectors[0].val/100*0.1 && val < sectors[0].val ? 0 + ' (0 %)' : 
                        b_formatter(val) + ' (' + (val * 100 / total).toFixed(0) + ' %)'"></span>
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
    padding: 0 10px;
  }

  .piechart-total {
    position: absolute;
    left: 50%;
    font-size: 18px;
    top: 94px;
    color: #949494;
    transform: translateX(-50%);
  }

  .piechart-legend_item {
    padding: 5px 0;
    font-size: 16px;
    align-items: stretch;
  }

  .piechart-legend_item_key {
    margin-left: 1em;
  }

  .piechart-legend_item_val {
    color: #999;
  }

  .piechart-legend_item_color {
    border-radius: 50%;
    margin-right: 5px;
    width: 14px;
    margin-top: 3px;
    height: 14px;
    float: left;  
    margin-bottom: 10px;
  }

  .piechart-svg {
    margin: 15px auto;
    display: block;
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
