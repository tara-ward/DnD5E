<template>
  <main class="site-wrapper">
    <Background />
    <div class="pt-table desktop-768">
      <div class="pt-tablecell page-home relative">
        <div class="overlay"></div>
        <div class="container">
          <div class="row justify-center text-center">
            <div class="col-xs-12 col-md-offset-1 col-md-10 col-lg-offset-2 col-lg-8">
              <Header />
              <div class="hexagon-menu clear" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 20px;">
                <Navbar icon="fa-home" title="Home" to="/" />
                <Navbar icon="fa-book" title="Classes" to="/page1" />
                <Navbar icon="fa-dragon" title="Monsters" to="/page2" />
                <Navbar icon="fa-scroll" title="Races" to="/page3" />
                <Navbar icon="fa-info-circle" title="Docs" to="/info" />
              </div>
              <div class="router-view-container">
                <router-view></router-view>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <BackToTop />
  <Footer v-if="$route.path === '/'" />
</template>

<script>
import Navbar from './components/Navbar.vue';
import Header from './components/Header.vue';
import Background from './components/Background.vue';
import Footer from './components/Footer.vue';
import BackToTop from './components/BackToTop.vue';

export default {
  components: {
    Navbar,
    Header,
    Footer,
    BackToTop,
    Background
  },
  data() {
    return {
      isModalOpen: false
    };
  },
  methods: {
    handleModalStateChange(isOpen) {
      this.isModalOpen = isOpen;
    }
  }
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
@import url('/src/assets/css/NavStyles.css');

.site-wrapper {
  position: relative;
  z-index: 2;
}

.header {
  position: relative;
  z-index: 3;
}

.hexagon-menu {
  pointer-events: auto;
}

.router-view-container {
  margin-top: 0.5rem;
  padding: 0.5rem;
  position: relative;
  z-index: 2;
  pointer-events: none;
}

.router-view-container * {
  pointer-events: auto;
}

.documentation-container, .monsters-container {
  pointer-events: auto;
}
</style>
