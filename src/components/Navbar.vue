<template>
  <router-link class="hexagon-item" :to="to">
    <div class="hex-item">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="hex-item">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="hex-content">
      <span class="hex-content-inner">
        <span class="icon">
          <i :class="`fa ${icon}`"></i>
        </span>
        <span class="title">{{ title }}</span>
      </span>
      <svg viewBox="0 0 86 100" height="100" width="87" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="hex-glow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#3a2f6b" />
            <stop offset="25%" stop-color="#36669c" />
            <stop offset="50%" stop-color="#41a0ae" />
            <stop offset="75%" stop-color="#3ec995" />
            <stop offset="100%" stop-color="#77f07f" />
          </linearGradient>
        </defs>
        <path d="M43.3 0L86.6 50v50l-43.3 50L0 100V50z" fill="url(#hex-glow-gradient)" transform="scale(0.5) translate(43, 50)" />
      </svg>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    icon: String,
    title: String,
    to: String
  }
}
</script>

<style scoped>
.hexagon-item {
  width: 100px;
  height: 86px;
  margin-left: -14.5px;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease-in-out, filter 0.3s ease-in-out;
  filter: drop-shadow(0 0 6px rgba(62, 201, 149, 0.4));
  z-index: 2;
}
.hexagon-item:hover {
  transform: scale(1.07);
  filter: drop-shadow(0 0 12px #3ec995)
          drop-shadow(0 0 18px #41a0ae)
          drop-shadow(0 0 22px #36669c);
}
.hex-item {
  position: absolute;
  top: 0;
  left: 25px;
  width: 50px;
  height: 86px;
}
.hex-item div {
  position: absolute;
  top: 0;
  width: 50px;
  height: 86px;
  background-color: #1e2530;
}
.hex-item div:nth-child(1) { transform: rotate(0deg); }
.hex-item div:nth-child(2) { transform: rotate(60deg); }
.hex-item div:nth-child(3) { transform: rotate(120deg); }

.hex-content {
  display: block;
  height: 90px;
  width: 78px;
  margin: 0 auto;
  position: relative;
  text-align: center;
  color: white;
  transition: filter 0.4s ease-in-out;
}
.hex-content-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
}
.hex-content .icon {
  font-size: 18px;
  margin-bottom: 5px;
}
.hex-content .title {
  font-size: 7px;
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: all 0.4s ease-in-out;
  opacity: 0.9;
  margin-top: 3px;
}
.hexagon-item:hover .title {
  opacity: 1;
  text-shadow: 0 0 6px #77f07f;
}
.hex-content svg {
  position: absolute;
  top: -13px;
  left: -7px;
  transform: scale(0.87);
  z-index: -1;
  transition: transform 0.3s ease;
}
.hexagon-item:hover .hex-content svg {
  transform: scale(0.95);
}
</style>
