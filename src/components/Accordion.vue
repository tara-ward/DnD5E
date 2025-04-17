<template>
    <div class="accordion">
      <button class="accordion-header" @click="isOpen = !isOpen">
        {{ title }}
        <span class="arrow">{{ isOpen ? '▼' : '▶' }}</span>
      </button>
      <div v-if="isOpen" class="accordion-content">
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    // Component props
    props: {
      title: {
        type: String,
        required: true
      }
    },
    
    // Component state
    data() {
      return {
        isOpen: false // Tracks whether accordion is open or closed
      };
    }
  };
  </script>
  
  <style scoped>
  .accordion {
    margin: 1rem 0;
    border: 1px solid #3ec995;
    border-radius: 4px;
  }
  
  .accordion-header {
    width: 100%;
    padding: 1rem;
    background-color: rgba(62, 201, 149, 0.1);
    border: none;
    color: white;
    text-align: left;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .accordion-header:hover {
    background-color: rgba(62, 201, 149, 0.2);
  }
  
  .accordion-content {
    padding: 1rem;
    background-color: rgba(30, 37, 48, 0.9);
  }
  
  .arrow {
    font-size: 0.8rem;
    color: #3ec995;
  }
  </style>