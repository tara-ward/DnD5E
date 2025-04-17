<template>
  <footer class="site-footer">
    <div class="footer-content">
      <p>COMP74 - Assignment 3</p>
      <p>Created by Tara Ward</p>
      <p>
        API Documentation: 
        <a href="https://5e-bits.github.io/docs/" target="_blank" rel="noopener noreferrer">
          https://5e-bits.github.io/docs/
        </a>
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.site-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0.5rem;
  background-color: rgba(30, 37, 48, 0.9);
  color: white;
  text-align: center;
  z-index: 3;
  pointer-events: none;
  height: 60px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  pointer-events: auto;
  position: relative;
  z-index: 4;
  padding: 0.25rem;
}

.footer-content p {
  margin: 0.1rem 0;
  font-size: 0.8rem;
}

.footer-content a {
  color: #3ec995;
  text-decoration: none;
}

.footer-content a:hover {
  text-decoration: underline;
}
</style>