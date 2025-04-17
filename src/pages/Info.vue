<template>
  <div class="documentation-wrapper">
    <div class="documentation-heading">
      <h1>Program Documentation</h1>
    </div>
    <div class="documentation-container">
      <h2>Overview</h2>
      <p>This is a Vue 3 application that serves as a Dungeons & Dragons 5th Edition (D&D 5e) API explorer. It allows users to browse and view detailed information about various D&D 5e elements including classes, monsters, and races. The application fetches data from the Open5e API and presents it in an interactive and visually appealing way.</p>

      <Accordion title="COMP 74, Final Project">
        <h2>Project Requirements: Vue + Vite Client for a Web API</h2>
        
        <h2>Requirements</h2>
        <p>Develop a client application that allows users to query the web API that you selected in Lab 9.</p>
        
        <ol>
          <li><strong>Framework & Setup</strong>
            <ul>
              <li>Build the client using Vue + Vite.</li>
            </ul>
          </li>
          <li><strong>API Integration</strong>
            <ul>
              <li>Allow users to query 2-3 types of data.</li>
              <li>Use RESTful API endpoints where data types are specified as path components (not query parameters).</li>
            </ul>
          </li>
          <li><strong>Views & Components</strong>
            <ul>
              <li>Design an appropriate set of Views and Components for displaying and interacting with the data.</li>
            </ul>
          </li>
          <li><strong>Reactive Data & State Management</strong>
            <ul>
              <li>Use Vue's reactive data to manage API responses and user input dynamically.</li>
              <li>Ensure changes to data trigger automatic UI updates without requiring manual DOM manipulation.</li>
            </ul>
          </li>
          <li><strong>User Input & Filtering</strong>
            <ul>
              <li>Enable users to set request parameters (if supported by the API) to filter results.</li>
              <li>Use appropriate input types (e.g., dropdowns, radio buttons) to improve usability when selecting predefined options.</li>
              <li>Provide default values for inputs to facilitate testing.</li>
            </ul>
          </li>
          <li><strong>Data Fetching & Updates</strong>
            <ul>
              <li>Use the Fetch API to send asynchronous requests and dynamically update the page with response data.</li>
            </ul>
          </li>
          <li><strong>Styling & UI</strong>
            <ul>
              <li>While this is not a web design course, apply CSS to ensure a clean and user-friendly layout.</li>
            </ul>
          </li>
          <li><strong>Code Quality</strong>
            <ul>
              <li>Format HTML and JavaScript for readability.</li>
              <li>Comment JavaScript code for clarity.</li>
              <li>Remove any unused code before submission.</li>
            </ul>
          </li>
        </ol>
      </Accordion>

      <h2>Features</h2>
      <ul>
        <li>Navigation: Hexagonal menu for navigating between different sections (Home, Classes, Monsters, Races, Docs).</li>
        <li>Class Explorer: Browse and view details of D&D 5e classes.</li>
        <li>Monster Explorer: Browse and view details of D&D 5e monsters with pagination.</li>
        <li>Monster Search: Asearch functionality that filters monsters by name in real-time.</li>
        <li>Race Explorer: Browse and view details of D&D 5e races.</li>
        <li>API Documentation: View API documentation and sample requests.</li>
        <li>Visual Effects: Animated background with particles and hexagons.</li>
        <li>Responsive Design: Works on various screen sizes.</li>
      </ul>

      <h3>Monster Search Implementation</h3>
      <p>The search functionality is implemented with the following key components:</p>

      <p><strong>Monster Search Features:</strong></p>
      <ul>
        <li>Added a search functionality that filters monsters by name in real-time</li>
        <li>Since the API has 3,207 monster records spread across 65 pages, the application pre-loads all data on initial load</li>
        <li>This ensures instant search results after the initial load, but requires a few minutes to fetch all data</li>
        <li>Loading indicator with estimated time is shown during initial data fetch</li>
        <li>Pagination is automatically adjusted based on search results</li>
        <li>Monster cards feature dynamic gradient animations and hover effects</li>
      </ul>

      <h4>Loading Timer</h4>
      <p>The monster page includes a dynamic loading timer that provides users with an estimated time remaining for the initial data load. This feature was implemented to improve user experience during the potentially lengthy loading process of 3,207 monster records.</p>
      
      <p><strong>Key features of the loading timer:</strong></p>
      <ul>
        <li>Calculates estimated time remaining based on actual loading speed</li>
        <li>Updates in real-time as more pages are loaded</li>
        <li>Displays time in a user-friendly MM:SS format</li>
        <li>Automatically stops when loading is complete</li>
      </ul>

      <h5>Implementation Details</h5>
      <pre><code>startTimer() {
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
}</code></pre>

      <h4>Search Bar Component</h4>
      <pre><code>&lt;div class="search-container"&gt;
  &lt;h3&gt;Search&lt;/h3&gt;
  &lt;input 
    type="text" 
    v-model="searchQuery" 
    placeholder="Example: Broodmother of Leng"
    @input="filterMonsters"
  /&gt;
&lt;/div&gt;</code></pre>

      <h4>Data Fetching</h4>
      <pre><code>async fetchAllMonsters() {
  this.loading = true;
  try {
    let allMonsters = [];
    let currentPage = 1;
    
    while (currentPage &lt;= this.totalPages) {
      const data = await fetchFromAPI(`v1/monsters/?format=json&amp;page=${currentPage}`);
      allMonsters = allMonsters.concat(data.results);
      currentPage++;
    }
    
    this.monsters = allMonsters;
    this.filteredMonsters = allMonsters;
    this.allMonstersLoaded = true;
  } catch (error) {
    console.error('Error fetching monsters:', error);
  } finally {
    this.loading = false;
  }
}</code></pre>

      <h4>Filtering Logic</h4>
      <pre><code>filterMonsters() {
  if (this.searchQuery) {
    const query = this.searchQuery.toLowerCase();
    this.filteredMonsters = this.monsters.filter(monster =&gt; 
      monster.name.toLowerCase().includes(query)
    );
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredMonsters.length / this.pageSize);
  } else {
    this.filteredMonsters = this.monsters;
    this.totalPages = 65;
  }
}</code></pre>

      <h2>Components</h2>
      <h3>1. App.vue</h3>
      <p>- Main application container<br>- Includes navigation, header, and router view<br>- Manages background and footer visibility</p>

      <h3>2. Navbar.vue</h3>
      <p>- Hexagonal navigation items<br>- Uses Font Awesome icons<br>- Hover effects with gradient glow</p>
      <pre><code>&lt;template&gt;
  &lt;router-link class="hexagon-item" :to="to"&gt;
    &lt;div class="hex-item"&gt;
      &lt;div&gt;&lt;/div&gt;
      &lt;div&gt;&lt;/div&gt;
      &lt;div&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="hex-item"&gt;
      &lt;div&gt;&lt;/div&gt;
      &lt;div&gt;&lt;/div&gt;
      &lt;div&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="hex-content"&gt;
      &lt;span class="hex-content-inner"&gt;
        &lt;span class="icon"&gt;
          &lt;i :class="`fa ${icon}`"&gt;&lt;/i&gt;
        &lt;/span&gt;
        &lt;span class="title"&gt;{{ title }}&lt;/span&gt;
      &lt;/span&gt;
      &lt;svg viewBox="0 0 86 100" height="100" width="87" xmlns="http://www.w3.org/2000/svg"&gt;
        &lt;defs&gt;
          &lt;linearGradient id="hex-glow-gradient" x1="0%" y1="0%" x2="100%" y2="100%"&gt;
            &lt;stop offset="0%" stop-color="#3a2f6b" /&gt;
            &lt;stop offset="25%" stop-color="#36669c" /&gt;
            &lt;stop offset="50%" stop-color="#41a0ae" /&gt;
            &lt;stop offset="75%" stop-color="#3ec995" /&gt;
            &lt;stop offset="100%" stop-color="#77f07f" /&gt;
          &lt;/linearGradient&gt;
        &lt;/defs&gt;
        &lt;path d="M43.3 0L86.6 50v50l-43.3 50L0 100V50z" fill="url(#hex-glow-gradient)" transform="scale(0.5) translate(43, 50)" /&gt;
      &lt;/svg&gt;
    &lt;/div&gt;
  &lt;/router-link&gt;
&lt;/template&gt;</code></pre>

      <h2>Utilities</h2>
      <h3>fetchAPI.js</h3>
      <p>- Handles API requests to Open5e API<br>- Base URL: <code>https://api.open5e.com/</code><br>- Returns JSON data</p>
      <pre><code>const BASE_URL = 'https://api.open5e.com/';

export async function fetchFromAPI(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}</code></pre>

      <h2>Styling</h2>
      <pre><code>:root {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}</code></pre>

      <h2>Dependencies</h2>
      <ul>
        <li>Vue 3</li>
        <li>Vue Router</li>
        <li>PortalVue</li>
        <li>Font Awesome</li>
        <li>Vite (build tool)</li>
      </ul>

      <h2>Attribution</h2>
      <p>While all code has been significantly modified and adapted for this project, I'd like to acknowledge the following sources that inspired certain visual elements:</p>
      <ul>
        <li><strong>Card Effect</strong>: Adapted from <a href="https://codepen.io/gayane-gasparyan/pen/jOmaBQK" target="_blank">Gayane Gasparyan's CodePen</a> - Modified for Vue 3 integration and custom styling</li>
        <li><strong>Hexagon Background</strong>: Inspired by <a href="https://codepen.io/d3nis031/pen/QWyeNYx" target="_blank">Denis's CodePen</a> - Rebuilt with custom animations and color schemes</li>
        <li><strong>Responsive Honeycomb Layout</strong>: Based on <a href="https://codepen.io/gzuzkstro/pen/ebdxZQ" target="_blank">Gustavo's CodePen</a> - Transformed into interactive navigation buttons with Vue Router integration</li>
      </ul>
      <p>All code has been extensively modified to fit the project's needs and integrated with Vue 3's reactive system.</p>

      <h2>Configuration</h2>
      <pre><code>import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
})</code></pre>

      <h2>Code Structure</h2>
      <pre><code>src/
├── assets/
│   ├── css/
│   │   └── NavStyles.css
│   └── images/
├── components/
│   ├── Accordion.vue
│   ├── BackToTop.vue
│   ├── Background.vue
│   ├── Footer.vue
│   ├── Header.vue
│   ├── Navbar.vue
├── pages/
│   ├── Home.vue
│   ├── Info.vue
│   ├── Page1.vue
│   ├── Page2.vue
│   ├── Page3.vue
├── utils/
│   └── fetchAPI.js
├── App.vue
├── main.js
├── router.js
├── style.css</code></pre>

      <h2>API Usage</h2>
      <ul>
        <li>Classes: <code>https://api.open5e.com/v1/classes/</code></li>
        <li>Monsters: <code>https://api.open5e.com/v1/monsters/</code></li>
        <li>Races: <code>https://api.open5e.com/v1/races/</code></li>
      </ul>

    </div>
  </div>
</template>

<script>
import Accordion from '../components/Accordion.vue';

export default {
  components: {
    Accordion
  }
}
</script>

<style scoped>
.documentation-wrapper {
  background-color: rgba(30, 37, 48, 0.85);
  border-radius: 1rem;
  padding: 2rem;
  margin: 2rem auto;
  max-width: 900px;
  box-shadow: 0 0 10px #3ec99588;
}

.documentation-heading {
  background-color: rgba(62, 201, 149, 0.15);
  padding: 1rem;
  border-radius: 1rem 1rem 0 0;
  text-align: center;
}

.documentation-container {
  padding: 1rem 2rem;
  color: white;
  text-align: left;
}

h1 {
  color: #3ec995;
  margin: 0;
}

h2 {
  color: #41a0ae;
  text-align: left;
}

h3 {
  color: #36669c;
  text-align: left;
}

hr {
  border: 1px solid #3ec995;
  margin: 1rem 0;
}

p {
  line-height: 1.6;
}

a {
  color: #3ec995;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

code {
  background-color: #1e2530;
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  display: inline-block;
  margin: 0.4rem 0;
  white-space: pre-wrap;
  font-family: monospace;
  width: 100%;
}

pre {
  background-color: #1e2530;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1rem 0;
}

ul {
  list-style-type: disc;
  padding-left: 1.5rem;
}

li {
  margin: 0.5rem 0;
}
</style>
