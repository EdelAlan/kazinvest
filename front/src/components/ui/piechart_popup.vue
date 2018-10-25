<script>

  import colors from '../../assets/libs/colors';

	export default {

    props: ['sectors'],

    data() {
      return {
        colors,
        size: 50,
      };
    },

    computed: {
      total () {
        return this.sectors.reduce((acc, it) => acc + it.val, 0);
      },

      processed_sectors () {
        const result = [];
        const l = this.size / 2;
        let rotation = 0;
        this.sectors.forEach(({ val }, idx) => {
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
            color: idx == 0 ? '#7ED767' : '#03A0E3',
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
    },

	}
</script>

<template>
	<div class="piechart_popup">
    <span class="piechart_popup-total" v-text="this.sectors[0].val == 0.1 ? 0 + '%' : this.sectors[0].val + '%'"></span>
    <svg class="piechart_popup-svg" :width="size * 1.1" :height="size * 1.1">
      <defs>
        <mask id="circle_clip" >
          <rect fill="white" width="100%" height="100%" />
          <circle fill="black" :cx="size * 0.55" :cy="size * 0.55" :r="size * 0.39" />
        </mask>
      </defs>
      <g mask="url(#circle_clip)">
        <g class="piechart_popup-piece"
          v-for="s in processed_sectors">
          <path :fill="s.color" :d="s.d" :transform="s.transform" />
        </g>
      </g>
      <circle class="piechart_popup-circle" fill="none" :cx="size * 0.55" :cy="size * 0.55" :r="size * 0.2" />
    </svg>
	</div>
</template>

<style>

  .piechart_popup {
    position: absolute;
    right: 5px;
    overflow: hidden;
    top: 0;
  }

  .piechart_popup-total {
    position: absolute;
    left: 50%;
    font-size: 18px;
    top: 30%;
    color: #878DA1;
    transform: translateX(-50%);
  }

  .piechart_popup-svg {
    margin: 6px auto;
    display: block;
  }

  .piechart_popup-piece {
    transition: all 200ms;
    transform-origin: 50% 50%;
  }

  .piechart_popup-circle {
    pointer-events: all;
  }

  .piechart_popup-tooltip {
    position: absolute;
    color: #fff;
    background: #334;
    padding: .2em .4em;
    font-size: 80%;
    z-index: 10;
    display: none;
    border-radius: .1em;
  }

  .piechart_popup-piece--hovered {
    transform: scale(1.05);
  }

</style>
