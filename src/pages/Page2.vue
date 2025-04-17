<template>
    <div class="monsters-container">
      <h1>Monsters</h1>
      
      <!-- Add search bar -->
      <div class="search-container">
        <h3>Search</h3>
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Example: Broodmother of Leng"
          @input="filterMonsters"
        />
      </div>

      <div class="pagination-controls">
        <button @click="goToFirstPage" :disabled="currentPage === 1 || loading">First</button>
        <button @click="goToPreviousPage" :disabled="currentPage === 1 || loading">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="goToNextPage" :disabled="!nextPage || loading">Next</button>
        <button @click="goToLastPage" :disabled="currentPage === totalPages || loading">Last</button>
      </div>
  
      <div v-if="loading" class="loading">
        <h4>This page has 3,207 records and will take some time to load.</h4>
        <h3>Loading page {{ pagesLoaded }} of {{ totalPages }}</h3>
        <div class="loading-timer">
          <p>Estimated time remaining: {{ formatTime(remainingTime) }}</p>
        </div>
        <div class="gif-wrapper">
          <img src="/src/assets/images/Loading.gif" alt="Loading...">
        </div>
      </div>
      
      <div v-else>
        <div class="monsters-grid">
          <div 
            v-for="monster in paginatedMonsters" 
            :key="monster.slug" 
            class="monster-card"
            :style="getCardStyles()"
          >
            <h2>{{ monster.name }}</h2>
            <p><strong>Type:</strong> {{ monster.type }}</p>
            <p><strong>Size:</strong> {{ monster.size }}</p>
            <p><strong>Challenge Rating:</strong> {{ monster.challenge_rating }}</p>
            <button @click="openMonsterDetails(monster)">View Details</button>
          </div>
        </div>
  
        <div v-if="filteredMonsters.length === 0" class="no-results">
          No monsters found matching your search.
        </div>
  
        <div class="pagination-controls">
          <button @click="goToFirstPage" :disabled="currentPage === 1 || loading">First</button>
          <button @click="goToPreviousPage" :disabled="currentPage === 1 || loading">Previous</button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="goToNextPage" :disabled="!nextPage || loading">Next</button>
          <button @click="goToLastPage" :disabled="currentPage === totalPages || loading">Last</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { fetchFromAPI } from '../utils/fetchAPI';
  
  export default {
    data() {
      return {
        monsters: [],
        filteredMonsters: [],
        searchQuery: '',
        loading: true,
        currentPage: 1,
        totalPages: 65,
        pageSize: 50,
        allMonstersLoaded: false,
        startTime: null,
        elapsedTime: 0,
        remainingTime: 0,
        timerInterval: null,
        pagesLoaded: 0
      };
    },
    computed: {
      paginatedMonsters() {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        return this.filteredMonsters.slice(start, end);
      },
      nextPage() {
        return this.currentPage < this.totalPages;
      }
    },
    async created() {
      await this.fetchAllMonsters();
    },
    methods: {
      async fetchAllMonsters() {
        this.loading = true;
        this.startTimer(); // Start the timer
        try {
          let allMonsters = [];
          let currentPage = 1;
          
          while (currentPage <= this.totalPages) {
            const data = await fetchFromAPI(`v1/monsters/?format=json&page=${currentPage}`);
            allMonsters = allMonsters.concat(data.results);
            currentPage++;
            this.pagesLoaded = currentPage - 1; // Update pages loaded
          }
          
          this.monsters = allMonsters;
          this.filteredMonsters = allMonsters;
          this.allMonstersLoaded = true;
        } catch (error) {
          console.error('Error fetching monsters:', error);
        } finally {
          this.loading = false;
          clearInterval(this.timerInterval); // Stop the timer
        }
      },
      updateCurrentPage(url) {
        const urlObj = new URL('https://api.open5e.com' + url);
        const pageParam = urlObj.searchParams.get('page');
        this.currentPage = pageParam ? parseInt(pageParam) : 1;
      },
      async loadNextPage() {
        if (this.nextPage) {
          await this.fetchMonsters(this.nextPage);
        }
      },
      async goToFirstPage() {
        this.currentPage = 1;
      },
      async goToPreviousPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
      async goToNextPage() {
        if (this.nextPage) {
          this.currentPage++;
        }
      },
      async goToLastPage() {
        this.currentPage = this.totalPages;
      },
      openMonsterDetails(monster) {
        const detailsWindow = window.open('', '_blank');
        detailsWindow.document.write(`
          <html>
            <head>
              <title>${monster.name} Details</title>
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
                .monster-details {
                  max-width: 800px;
                  margin: 0 auto;
                }
                .close-button {
                  position: fixed;
                  top: 20px;
                  right: 20px;
                  padding: 10px 20px;
                  background-color: #3ec995;
                  border: none;
                  color: white;
                  cursor: pointer;
                  border-radius: 4px;
                }
                .close-button:hover {
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
                  background-color: rgba(30, 37, 48, 0.9);
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
                  padding: 10px;
                  background-color: #3ec995;
                  border: none;
                  color: white;
                  cursor: pointer;
                  border-radius: 4px;
                  display: none;
                  flex-direction: column;
                  align-items: center;
                  gap: 2px;
                  font-size: 12px;
                }
                .back-to-top.visible {
                  display: flex;
                }
                .toggle-all-button {
                  position: fixed;
                  top: 60px;
                  right: 20px;
                  padding: 10px 20px;
                  background-color: #3ec995;
                  border: none;
                  color: white;
                  cursor: pointer;
                  border-radius: 4px;
                }
                .toggle-all-button:hover {
                  background-color: #41a0ae;
                }
              </style>
              <script>
                let allExpanded = false;

                function toggleAccordion(button) {
                  const content = button.nextElementSibling;
                  const arrow = button.querySelector('.arrow');
                  content.classList.toggle('open');
                  arrow.textContent = content.classList.contains('open') ? '▼' : '▶';
                }

                function toggleAllAccordions() {
                  const accordions = document.querySelectorAll('.accordion-content');
                  const toggleButton = document.querySelector('.toggle-all-button');
                  allExpanded = !allExpanded;
                  
                  accordions.forEach(content => {
                    content.classList.toggle('open', allExpanded);
                    const arrow = content.previousElementSibling.querySelector('.arrow');
                    arrow.textContent = allExpanded ? '▼' : '▶';
                  });
                  
                  toggleButton.textContent = allExpanded ? 'Collapse All' : 'Expand All';
                }

                function handleScroll() {
                  const backToTop = document.querySelector('.back-to-top');
                  if (window.scrollY > 200) {
                    backToTop.classList.add('visible');
                  } else {
                    backToTop.classList.remove('visible');
                  }
                }

                function scrollToTop() {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }

                document.addEventListener('DOMContentLoaded', function() {
                  const accordionHeaders = document.querySelectorAll('.accordion-header');
                  accordionHeaders.forEach(header => {
                    header.addEventListener('click', () => toggleAccordion(header));
                  });

                  window.addEventListener('scroll', handleScroll);
                });
              <\/script>
            </head>
            <body>
              <button class="close-button" onclick="window.close()">Close</button>
              <button class="toggle-all-button" onclick="toggleAllAccordions()">Expand All</button>
              <button class="back-to-top" onclick="scrollToTop()">
                <div>▲</div>
                <div>TOP</div>
              </button>
              <div class="monster-details">
                <h1>${monster.name}</h1>
                ${this.getMonsterDetailsHTML(monster)}
              </div>
            </body>
          </html>
        `);
        detailsWindow.document.close();
      },
      getMonsterDetailsHTML(monster) {
        return `
          <div class="basic-info">
            ${monster.desc ? `<p><strong>Description:</strong> ${monster.desc}</p>` : ''}
            ${!monster.desc ? `
              <ul>
                ${monster.legendary_desc ? `<li><strong>Legendary Description:</strong> ${monster.legendary_desc}</li>` : ''}
                ${monster.special_abilities && monster.special_abilities.length ? `
                  <li><strong>Special Abilities:</strong>
                    <ul>
                      ${monster.special_abilities.map(ability => `
                        <li><strong>${ability.name}:</strong> ${ability.desc}</li>
                      `).join('')}
                    </ul>
                  </li>
                ` : ''}
              </ul>
            ` : ''}
            <p><strong>Size:</strong> ${monster.size}</p>
            <p><strong>Type:</strong> ${monster.type}</p>
            <p><strong>Alignment:</strong> ${monster.alignment}</p>
            <p><strong>Armor Class:</strong> ${monster.armor_class}</p>
            <p><strong>Hit Points:</strong> ${monster.hit_points}</p>
            <p><strong>Speed:</strong>
              ${Object.entries(monster.speed).map(([key, value]) => `
                ${key}: ${value}ft
              `).join(' ')}
            </p>
          </div>
  
          ${monster.actions && monster.actions.length ? `
            <div class="accordion">
              <button class="accordion-header">
                Actions
                <span class="arrow">▼</span>
              </button>
              <div class="accordion-content">
                <ul>
                  ${monster.actions.map(action => `
                    <li>
                      <strong>${action.name}:</strong> ${action.desc}
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>
          ` : ''}
  
          ${monster.legendary_actions && monster.legendary_actions.length ? `
            <div class="accordion">
              <button class="accordion-header">
                Legendary Actions
                <span class="arrow">▼</span>
              </button>
              <div class="accordion-content">
                <ul>
                  ${monster.legendary_actions.map(action => `
                    <li>
                      <strong>${action.name}:</strong> ${action.desc}
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>
          ` : ''}
  
          ${monster.reactions && monster.reactions.length ? `
            <div class="accordion">
              <button class="accordion-header">
                Reactions
                <span class="arrow">▼</span>
              </button>
              <div class="accordion-content">
                <ul>
                  ${monster.reactions.map(reaction => `
                    <li>
                      <strong>${reaction.name}:</strong> ${reaction.desc}
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>
          ` : ''}
        `;
      },
      getRandomRotation() {
        return Math.floor(Math.random() * 360);
      },
      getRandomColorVariation() {
        const variations = [
          { start: '#3ec995', mid: '#41a0ae', end: '#36669c' },
          { start: '#41a0ae', mid: '#36669c', end: '#3ec995' },
          { start: '#36669c', mid: '#3ec995', end: '#41a0ae' },
          { start: '#3ec995', mid: '#36669c', end: '#41a0ae' }
        ];
        return variations[Math.floor(Math.random() * variations.length)];
      },
      getCardStyles() {
        const colors = this.getRandomColorVariation();
        return {
          '--glow-start': colors.start,
          '--glow-mid': colors.mid,
          '--glow-end': colors.end,
          '--rotate': `${this.getRandomRotation()}deg`
        };
      },
      filterMonsters() {
        if (this.searchQuery) {
          const query = this.searchQuery.toLowerCase();
          this.filteredMonsters = this.monsters.filter(monster => 
            monster.name.toLowerCase().includes(query)
          );
          this.currentPage = 1;
          this.totalPages = Math.ceil(this.filteredMonsters.length / this.pageSize);
        } else {
          this.filteredMonsters = this.monsters;
          this.totalPages = 65;
        }
      },
      startTimer() {
        this.startTime = Date.now();
        this.timerInterval = setInterval(() => {
          this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
          if (this.pagesLoaded > 0) {
            const timePerPage = this.elapsedTime / this.pagesLoaded;
            this.remainingTime = Math.floor(timePerPage * (this.totalPages - this.pagesLoaded));
          }
        }, 1000);
      },
      formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
      }
    }
  };
  </script>
  
  <style scoped>
  @property --rotate {
    syntax: "<angle>";
    initial-value: 132deg;
    inherits: false;
  }

  .monsters-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    position: relative;
    z-index: 2;
    pointer-events: none;
  }
  
  .monsters-container * {
    pointer-events: auto;
  }
  
  .monsters-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }
  
  .monster-card {
    --card-height: 300px;
    background: #191c29;
    padding: 1.5rem;
    border-radius: 8px;
    color: white;
    position: relative;
    transition: transform 0.3s ease, color 1s;
    min-height: var(--card-height);
  }
  
  .monster-card:hover {
    transform: translateY(-5px);
    color: rgb(88 199 250 / 100%);
    text-shadow: 
      0 0 3px #1e2530,
      0 0 3px #1e2530,
      0 0 3px #1e2530,
      0 0 3px #1e2530;
    -webkit-text-stroke: 0;
  }
  
  .monster-card:hover button {
    text-shadow: 
      0 0 2px #1e2530,
      0 0 2px #1e2530,
      0 0 2px #1e2530,
      0 0 2px #1e2530;
    box-shadow: 
      0 0 0 2px #1e2530,
      0 0 0 3px rgba(62, 201, 149, 0.5);
  }
  
  .monster-card::before {
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
  
  .monster-card::after {
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
  
  @keyframes spin {
    0% {
      --rotate: 0deg;
    }
    100% {
      --rotate: 360deg;
    }
  }
  
  .monster-card h2 {
    color: #3ec995;
    margin-bottom: 1rem;
  }
  
  .monster-card p {
    margin: 0.5rem 0;
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
  
  button:disabled {
    background-color: #2d333b;
    cursor: not-allowed;
  }
  
  .pagination-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin: 2rem 0;
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
  
  .loading-gif {
    position: absolute;
    z-index: 3;
    pointer-events: none;
  }
  
  .page2-container {
    position: relative;
    z-index: 2;
    pointer-events: none;
  }
  
  .page2-container * {
    pointer-events: auto;
  }

  .search-container {
    margin: 1rem 0;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }

  .search-container input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #3ec995;
    border-radius: 4px;
    background-color: #1e2530;
    color: white;
  }

  .search-container input::placeholder {
    color: #666;
  }

  .no-results {
    text-align: center;
    color: #ff6b6b;
    margin: 2rem 0;
  }

  .loading-timer {
    margin: 1rem 0;
    font-size: 1.2rem;
    color: #3ec995;
  }
  </style>