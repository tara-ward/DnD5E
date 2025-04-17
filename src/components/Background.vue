<template>
  <div id="background-container">
    <canvas id="particles" ref="particles"></canvas>
    <div id="hexagonGrid">
      <div class="row" v-for="rowIndex in 16" :key="rowIndex">
        <div class="hexagon" v-for="hexIndex in 16" :key="hexIndex"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const particles = ref(null)

onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://cdpn.io/cpe/boomboom/pen.js?key=pen.js-f3b81840-602c-f727-b5a7-c29ed352e1a3'
  script.crossOrigin = ''
  document.body.appendChild(script)
})
</script>

<style scoped>
#background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

#particles {
  background: #000000;
  width: 100%;
  height: 100%;
  display: block;
}

#hexagonGrid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: auto;
  z-index: 1;
}

#hexagonGrid .row {
  display: inline-flex;
  margin-top: -32px;
  margin-left: -50px;
}

#hexagonGrid .row:nth-child(even) {
  margin-left: 2px;
}

#hexagonGrid .row .hexagon {
  position: relative;
  width: 100px;
  height: 110px;
  margin: 4px 2px;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}

#hexagonGrid .row .hexagon::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000000;
  opacity: 0.95;
  transition: 1s;
}

#hexagonGrid .row .hexagon::after {
  content: "";
  position: absolute;
  top: 4px;
  right: 4px;
  bottom: 4px;
  left: 4px;
  background: #141414;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}

#hexagonGrid .row .hexagon:hover::before {
  background: #3ec995;
  opacity: 1;
  transition: 0s;
}

#hexagonGrid .row .hexagon:hover::after {
  background: #000000;
}
</style>
  