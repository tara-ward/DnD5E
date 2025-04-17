<template>
    <div class="races-container">
      <h1>Races</h1>
      
      <div v-if="loading" class="loading">
        <div class="gif-wrapper">
          <img src="/src/assets/images/Loading.gif" alt="Loading...">
        </div>
      </div>
      
      <div v-else>
        <div class="races-grid">
          <div v-for="race in races" :key="race.slug" class="race-card" 
               :style="{
                 '--glow-start': getRandomColorVariation().start,
                 '--glow-mid': getRandomColorVariation().mid,
                 '--glow-end': getRandomColorVariation().end,
                 '--rotate': `${getRandomRotation()}deg`
               }">
            <h2>{{ race.name }}</h2>
            <button @click="openRaceDetails(race)">View Details</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { fetchFromAPI } from '../utils/fetchAPI';
  
  export default {
    data() {
      return {
        races: [],
        loading: true
      };
    },
    async created() {
      await this.fetchRaces();
    },
    methods: {
      async fetchRaces() {
        this.loading = true;
        try {
          const data = await fetchFromAPI('v1/races/?format=json');
          this.races = data.results;
        } catch (error) {
          console.error('Error fetching races:', error);
        } finally {
          this.loading = false;
        }
      },
      openRaceDetails(race) {
        const detailsWindow = window.open('', '_blank');
        detailsWindow.document.write(`
          <html>
            <head>
              <title>${race.name} Details</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  padding: 20px;
                  background-color: #1e2530;
                  color: white;
                }
                h1 {
                  color: #3ec995;
                }
                .race-details {
                  max-width: 800px;
                  margin: 0 auto;
                }
                .close-button, .expand-all {
                  position: fixed;
                  right: 20px;
                  padding: 10px 20px;
                  background-color: #3ec995;
                  border: none;
                  color: white;
                  cursor: pointer;
                  border-radius: 4px;
                  transition: background-color 0.3s ease;
                }
                .close-button {
                  top: 20px;
                }
                .expand-all {
                  top: 60px;
                }
                .close-button:hover, .expand-all:hover {
                  background-color: #41a0ae;
                }
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
                  display: none;
                }
                .accordion-content.open {
                  display: block;
                }
                .arrow {
                  font-size: 0.8rem;
                  color: #3ec995;
                }
                .back-to-top {
                  position: fixed;
                  bottom: 20px;
                  right: 20px;
                  padding: 10px 20px;
                  background-color: #3ec995;
                  border: none;
                  color: white;
                  cursor: pointer;
                  border-radius: 4px;
                  display: none;
                  transition: background-color 0.3s ease;
                }
                .back-to-top.visible {
                  display: block;
                }
                .back-to-top:hover {
                  background-color: #41a0ae;
                }
              </style>
              <script>
                function toggleAccordion(button) {
                  const content = button.nextElementSibling;
                  const arrow = button.querySelector('.arrow');
                  content.classList.toggle('open');
                  arrow.textContent = content.classList.contains('open') ? '▼' : '▶';
                }

                function toggleAllAccordions(expand) {
                  const accordions = document.querySelectorAll('.accordion-header');
                  accordions.forEach(header => {
                    const content = header.nextElementSibling;
                    const arrow = header.querySelector('.arrow');
                    if (expand) {
                      content.classList.add('open');
                      arrow.textContent = '▼';
                    } else {
                      content.classList.remove('open');
                      arrow.textContent = '▶';
                    }
                  });
                }

                function handleBackToTop() {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }

                document.addEventListener('DOMContentLoaded', function() {
                  // Accordion functionality
                  const accordionHeaders = document.querySelectorAll('.accordion-header');
                  accordionHeaders.forEach(header => {
                    header.addEventListener('click', () => toggleAccordion(header));
                  });

                  // Expand/Collapse All button
                  const expandAllButton = document.querySelector('.expand-all');
                  expandAllButton.addEventListener('click', function() {
                    const isExpanded = this.textContent === 'Expand All';
                    toggleAllAccordions(isExpanded);
                    this.textContent = isExpanded ? 'Collapse All' : 'Expand All';
                  });

                  // Back to Top button
                  const backToTop = document.querySelector('.back-to-top');
                  window.addEventListener('scroll', () => {
                    backToTop.classList.toggle('visible', window.scrollY > 200);
                  });
                  backToTop.addEventListener('click', handleBackToTop);
                });
              <\/script>
            </head>
            <body>
              <button class="close-button" onclick="window.close()">Close</button>
              <button class="expand-all">Expand All</button>
              <button class="back-to-top">▲<br>TOP</button>
              <div class="race-details">
                <h1>${race.name}</h1>
                ${this.getRaceDetailsHTML(race)}
              </div>
            </body>
          </html>
        `);
        detailsWindow.document.close();
      },
      getRaceDetailsHTML(race) {
        return `
          <div class="basic-info">
            ${race.desc ? `<div class="accordion">
              <button class="accordion-header">
                Description
                <span class="arrow">▶</span>
              </button>
              <div class="accordion-content">
                ${this.convertMarkdownToHTML(race.desc)}
              </div>
            </div>` : ''}
            
            ${race.asi_desc ? `<div class="accordion">
              <button class="accordion-header">
                Ability Score Increase
                <span class="arrow">▶</span>
              </button>
              <div class="accordion-content">
                ${this.convertMarkdownToHTML(race.asi_desc)}
              </div>
            </div>` : ''}
            
            ${race.age ? `<div class="accordion">
              <button class="accordion-header">
                Age
                <span class="arrow">▶</span>
              </button>
              <div class="accordion-content">
                ${this.convertMarkdownToHTML(race.age)}
              </div>
            </div>` : ''}
            
            ${race.alignment ? `<div class="accordion">
              <button class="accordion-header">
                Alignment
                <span class="arrow">▶</span>
              </button>
              <div class="accordion-content">
                ${this.convertMarkdownToHTML(race.alignment)}
              </div>
            </div>` : ''}
            
            ${race.size ? `<div class="accordion">
              <button class="accordion-header">
                Size
                <span class="arrow">▶</span>
              </button>
              <div class="accordion-content">
                ${this.convertMarkdownToHTML(race.size)}
              </div>
            </div>` : ''}
            
            ${race.speed_desc ? `<div class="accordion">
              <button class="accordion-header">
                Speed
                <span class="arrow">▶</span>
              </button>
              <div class="accordion-content">
                ${this.convertMarkdownToHTML(race.speed_desc)}
              </div>
            </div>` : ''}
            
            ${race.languages ? `<div class="accordion">
              <button class="accordion-header">
                Languages
                <span class="arrow">▶</span>
              </button>
              <div class="accordion-content">
                ${this.convertMarkdownToHTML(race.languages)}
              </div>
            </div>` : ''}
            
            ${race.vision ? `<div class="accordion">
              <button class="accordion-header">
                Vision
                <span class="arrow">▶</span>
              </button>
              <div class="accordion-content">
                ${this.convertMarkdownToHTML(race.vision)}
              </div>
            </div>` : ''}
            
            ${race.traits ? `<div class="accordion">
              <button class="accordion-header">
                Traits
                <span class="arrow">▶</span>
              </button>
              <div class="accordion-content">
                ${this.convertMarkdownToHTML(race.traits)}
              </div>
            </div>` : ''}
            
            ${race.subraces && race.subraces.length ? `<div class="accordion">
              <button class="accordion-header">
                Subraces
                <span class="arrow">▶</span>
              </button>
              <div class="accordion-content">
                <ul>
                  ${race.subraces.map(subrace => `
                    <li>
                      <strong>${subrace.name}:</strong> ${this.convertMarkdownToHTML(subrace.desc)}
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>` : ''}
          </div>
        `;
      },
      convertMarkdownToHTML(markdown) {
        if (!markdown) return '';
        
        // Convert headers
        markdown = markdown.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        markdown = markdown.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        markdown = markdown.replace(/^# (.*$)/gim, '<h1>$1</h1>');
        
        // Convert bold
        markdown = markdown.replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>');
        
        // Convert italics
        markdown = markdown.replace(/\*(.*)\*/g, '<em>$1</em>');
        
        // Convert line breaks
        markdown = markdown.replace(/\n/g, '<br>');
        
        // Convert paragraphs
        markdown = markdown.replace(/(<br>){2,}/g, '</p><p>');
        markdown = '<p>' + markdown + '</p>';
        
        return markdown;
      },
      getRandomColorVariation() {
        const colors = [
          { start: '#5ddcff', mid: '#3c67e3', end: '#4e00c2' },
          { start: '#ff7e5f', mid: '#feb47b', end: '#ff6a00' },
          { start: '#f5d020', mid: '#f53803', end: '#f5a623' },
          { start: '#00b09b', mid: '#96c93d', end: '#00b09b' },
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      },
      getRandomRotation() {
        return Math.floor(Math.random() * 360);
      },
    }
  };
  </script>
  
  <style scoped>
  .races-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .races-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .race-card {
    --card-height: 200px;
    background: #191c29;
    padding: 1.5rem;
    border-radius: 8px;
    color: white;
    position: relative;
    transition: transform 0.3s ease, color 1s;
    min-height: var(--card-height);
  }

  .race-card::before {
    content: "";
    width: 104%;
    height: 102%;
    border-radius: 8px;
    background-image: linear-gradient(
      var(--rotate),
      var(--glow-start),
      var(--glow-mid) 43%,
      var(--glow-end));
    position: absolute;
    z-index: -1;
    top: -1%;
    left: -2%;
    animation: spin 2.5s linear infinite;
  }

  .race-card::after {
    position: absolute;
    content: "";
    top: calc(var(--card-height) / 6);
    left: 0;
    right: 0;
    z-index: -1;
    height: 100%;
    width: 100%;
    margin: 0 auto;
    transform: scale(0.8);
    filter: blur(calc(var(--card-height) / 6));
    background-image: linear-gradient(
      var(--rotate),
      var(--glow-start),
      var(--glow-mid) 43%,
      var(--glow-end));
    opacity: 1;
    transition: opacity .5s;
    animation: spin 2.5s linear infinite;
  }

  .race-card:hover {
    transform: translateY(-5px);
    color: rgb(88 199 250 / 100%);
    text-shadow: 
      0 0 3px #1e2530,
      0 0 3px #1e2530,
      0 0 3px #1e2530,
      0 0 3px #1e2530;
    -webkit-text-stroke: 0;
  }

  .race-card:hover button {
    text-shadow: 
      0 0 2px #1e2530,
      0 0 2px #1e2530,
      0 0 2px #1e2530,
      0 0 2px #1e2530;
    box-shadow: 
      0 0 0 2px #1e2530,
      0 0 0 3px rgba(62, 201, 149, 0.5);
  }

  @keyframes spin {
    0% {
      --rotate: 0deg;
    }
    100% {
      --rotate: 360deg;
    }
  }

  .race-card h2 {
    color: #3ec995;
    margin-bottom: 1rem;
  }

  button {
    background-color: #3ec995;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 1rem;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #41a0ae;
  }

  .loading {
    text-align: center;
    margin-top: 6rem;
    padding: 2rem 0;
  }

  .gif-wrapper {
    width: 300px;
    height: 300px;
    overflow: hidden;
    display: inline-block;
  }

  .gif-wrapper img {
    width: 120%;
    height: 120%;
    object-fit: cover;
    transform: translate(-8%, -8%);
  }
  </style>
  