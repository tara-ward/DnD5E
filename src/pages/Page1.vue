<template>
    <div class="classes-container">
      <h1>Classes</h1>
      
      <div v-if="loading" class="loading">
        <div class="gif-wrapper">
          <img src="/src/assets/images/Loading.gif" alt="Loading...">
        </div>
      </div>
      
      <div v-else>
        <div class="classes-grid">
          <div v-for="cls in classes" :key="cls.slug" class="class-card" 
               :style="{
                 '--glow-start': getRandomColorVariation().start,
                 '--glow-mid': getRandomColorVariation().mid,
                 '--glow-end': getRandomColorVariation().end,
                 '--rotate': `${getRandomRotation()}deg`
               }">
            <h2>{{ cls.name }}</h2>
            <button @click="openClassDetails(cls)">View Details</button>
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
        classes: [],
        loading: true
      };
    },
    async created() {
      await this.fetchClasses();
    },
    methods: {
      async fetchClasses() {
        this.loading = true;
        try {
          const data = await fetchFromAPI('v1/classes/?format=json');
          this.classes = data.results;
        } catch (error) {
          console.error('Error fetching classes:', error);
        } finally {
          this.loading = false;
        }
      },
      openClassDetails(cls) {
        const detailsWindow = window.open('', '_blank');
        detailsWindow.document.write(`
          <html>
            <head>
              <title>${cls.name} Details</title>
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
                .class-details {
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
                table {
                  width: 100%;
                  border-collapse: collapse;
                  margin: 1rem 0;
                }
                th, td {
                  padding: 0.5rem;
                  border: 1px solid #3ec995;
                  text-align: left;
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
                .expand-all {
                  position: fixed;
                  top: 60px;
                  right: 20px;
                  padding: 10px 20px;
                  background-color: #3ec995;
                  border: none;
                  color: white;
                  cursor: pointer;
                  border-radius: 4px;
                  z-index: 1000;
                }

                .expand-all:hover {
                  background-color: #41a0ae;
                }

                .back-to-top {
                  position: fixed;
                  bottom: 20px;
                  right: 20px;
                  width: 50px;
                  height: 50px;
                  border-radius: 50%;
                  background-color: #3ec995;
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
                  const backToTop = document.createElement('button');
                  backToTop.className = 'back-to-top';
                  backToTop.innerHTML = '▲<div>TOP</div>';
                  backToTop.style.display = 'none';
                  backToTop.onclick = handleBackToTop;
                  document.body.appendChild(backToTop);

                  window.addEventListener('scroll', () => {
                    backToTop.style.display = window.scrollY > 200 ? 'flex' : 'none';
                  });
                });
              <\/script>
            </head>
            <body>
              <button class="close-button" onclick="window.close()">Close</button>
              <button class="expand-all">Expand All</button>
              <div class="class-details">
                <h1>${cls.name}</h1>
                ${this.getClassDetailsHTML(cls)}
              </div>
            </body>
          </html>
        `);
        detailsWindow.document.close();
      },
      getClassDetailsHTML(cls) {
        const tableHTML = cls.table ? `
          <div class="accordion">
            <button class="accordion-header">
              Class Table
              <span class="arrow">▶</span>
            </button>
            <div class="accordion-content">
              ${this.convertMarkdownTableToHTML(cls.table)}
            </div>
          </div>
        ` : '';
  
        return `
          <div class="basic-info">
            <div class="accordion">
              <button class="accordion-header">
                Description
                <span class="arrow">▶</span>
              </button>
              <div class="accordion-content">
                ${this.convertMarkdownToHTML(cls.desc)}
              </div>
            </div>
  
            <div class="accordion">
              <button class="accordion-header">
                Basic Information
                <span class="arrow">▶</span>
              </button>
              <div class="accordion-content">
                <p><strong>Hit Dice:</strong> ${cls.hit_dice}</p>
                <p><strong>HP at 1st Level:</strong> ${cls.hp_at_1st_level}</p>
                <p><strong>HP at Higher Levels:</strong> ${cls.hp_at_higher_levels}</p>
                <p><strong>Proficiencies:</strong></p>
                <ul>
                  <li><strong>Armor:</strong> ${cls.prof_armor}</li>
                  <li><strong>Weapons:</strong> ${cls.prof_weapons}</li>
                  <li><strong>Saving Throws:</strong> ${cls.prof_saving_throws}</li>
                </ul>
              </div>
            </div>
  
            ${tableHTML}
  
            ${cls.archetypes && cls.archetypes.length ? `
              <div class="accordion">
                <button class="accordion-header">
                  Archetypes
                  <span class="arrow">▶</span>
                </button>
                <div class="accordion-content">
                  ${cls.archetypes.map(archetype => `
                    <div class="accordion">
                      <button class="accordion-header">
                        ${archetype.name}
                        <span class="arrow">▶</span>
                      </button>
                      <div class="accordion-content">
                        ${this.convertMarkdownToHTML(archetype.desc)}
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </div>
        `;
      },
      convertMarkdownToHTML(markdown) {
        // Split the markdown by headers
        const sections = markdown.split(/(#{1,5} .+)/g);
        let html = '';
        
        for (let i = 0; i < sections.length; i++) {
          const section = sections[i].trim();
          if (section.startsWith('##### ')) {
            // h5 - create accordion
            const title = section.replace('##### ', '').trim();
            const content = sections[++i].trim();
            html += this.createAccordion(title, content);
          } else if (section.startsWith('#### ')) {
            // h4
            const title = section.replace('#### ', '').trim();
            html += `<h4>${title}</h4>`;
          } else if (section.startsWith('### ')) {
            // h3
            const title = section.replace('### ', '').trim();
            html += `<h3>${title}</h3>`;
          } else if (section.startsWith('## ')) {
            // h2
            const title = section.replace('## ', '').trim();
            html += `<h2>${title}</h2>`;
          } else if (section.startsWith('# ')) {
            // h1
            const title = section.replace('# ', '').trim();
            html += `<h1>${title}</h1>`;
          } else if (section) {
            // Regular content
            html += this.processMarkdownContent(section);
          }
        }
        
        return html;
      },
      createAccordion(title, content) {
        return `
          <div class="accordion">
            <button class="accordion-header">
              ${title}
              <span class="arrow">▶</span>
            </button>
            <div class="accordion-content">
              ${this.processMarkdownContent(content)}
            </div>
          </div>
        `;
      },
      processMarkdownContent(content) {
        // First check for tables
        const tableRegex = /(\|.+\|[\r\n|\n])((?:\|[-:]+\|[\r\n|\n])+)((?:\|.+\|[\r\n|\n])+)/g;
        const tableMatches = [...content.matchAll(tableRegex)];
        
        if (tableMatches.length > 0) {
          for (const match of tableMatches) {
            const tableHTML = this.convertMarkdownTableToHTML(match[0]);
            content = content.replace(match[0], tableHTML);
          }
        }

        // Convert bold text
        content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Convert italic text
        content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        // Convert unordered lists
        content = content.replace(/\n\* (.*)/g, '\n<li>$1</li>');
        content = content.replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');
        
        // Convert line breaks
        content = content.replace(/\n/g, '<br>');
        
        // Convert paragraphs
        content = content.replace(/(<br>){2,}/g, '</p><p>');
        content = '<p>' + content + '</p>';
        
        // Recursively process any nested accordions
        const accordionRegex = /<div class="accordion">([\s\S]*?)<\/div>/g;
        const accordionMatches = [...content.matchAll(accordionRegex)];
        
        if (accordionMatches.length > 0) {
          for (const match of accordionMatches) {
            const accordionHTML = match[0];
            content = content.replace(accordionHTML, accordionHTML);
          }
        }
        
        return content;
      },
      convertMarkdownTableToHTML(markdownTable) {
        const rows = markdownTable.trim().split('\n');
        const headers = rows[0].split('|').filter(cell => cell.trim() !== '');
        const tableRows = rows.slice(2).map(row => {
          return row.split('|').filter(cell => cell.trim() !== '');
        });
  
        return `
          <table>
            <thead>
              <tr>
                ${headers.map(header => `<th>${header.trim()}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${tableRows.map(row => `
                <tr>
                  ${row.map(cell => `<td>${cell.trim()}</td>`).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;
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
  }
  </script>
  
  <style scoped>
  .classes-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .classes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }
  
  .class-card {
    --card-height: 200px;
    background: #191c29;
    padding: 1.5rem;
    border-radius: 8px;
    color: white;
    position: relative;
    transition: transform 0.3s ease, color 1s;
    min-height: var(--card-height);
  }
  
  .class-card::before {
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
  
  .class-card::after {
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
  
  .class-card:hover {
    transform: translateY(-5px);
    color: rgb(88 199 250 / 100%);
    text-shadow: 
      0 0 3px #1e2530,
      0 0 3px #1e2530,
      0 0 3px #1e2530,
      0 0 3px #1e2530;
    -webkit-text-stroke: 0;
  }
  
  .class-card:hover button {
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
  
  .class-card h2 {
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