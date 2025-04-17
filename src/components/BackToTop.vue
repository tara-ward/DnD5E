<template>
  <transition name="fade">
    <button 
      v-if="showButton"
      class="back-to-top"
      @click="scrollToTop"
    >
      <div class="button-content">
        <div>▲</div>
        <div>TOP</div>
      </div>
    </button>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      showButton: false
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show button when scrolled past 50% of the page
      this.showButton = scrollPosition > (documentHeight - windowHeight) / 2;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
};
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px; /* Increased height for better spacing */
  border-radius: 50%;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1.2;
}

.button-content div:first-child {
  font-size: 16px; /* Slightly larger arrow */
  margin-bottom: 2px;
}

.back-to-top:hover {
  background-color: #3aa876;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>