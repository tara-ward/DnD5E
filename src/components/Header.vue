<template>
  <div class="header">
    <img src="/src/assets/images/DNDLogo.png" alt="D&D Logo" class="logo">
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.logo {
  max-width: 600px;
  height: auto;
}
</style>