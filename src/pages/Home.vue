<template>
  <div class="documentation-wrapper">
    <div class="documentation-heading">
      <h1>Assignment 3 - D&D API</h1>
    </div>
    <div class="documentation-container">
      <p>
        Originally, I wanted to create my own custom API and build a visual novel game, but that turned out to be way more work than I expected! 
        To make sure I could meet all the assignment requirements and still create something cool, I decided to use the D&D API instead.
      </p>
      <p>
        The D&D API is packed with content - there's enough here to make 20+ different pages exploring all sorts of game elements. 
        I've focused on three main areas to keep things manageable while still showing what the API can do.
      </p>
      <p>
        I've also used components and features that I've learned in my placement at the Department of National Defence, such as accordions, to create a more interactive and organized user experience.
      </p>
      
      <Accordion title="About This Project">
        <h2>Why This API?</h2>
        <p>
          I've been into Dungeons & Dragons for years, so when I saw this API, I knew it would be perfect. 
          This REST API has everything - classes, monsters, races - all the stuff that makes D&D so much fun to play.
          It also perfectly meets the project requirements because:
        </p>
        <ul>
          <li>It provides multiple data types (classes, monsters, races) that can be queried through RESTful endpoints</li>
          <li>The API structure allows for easy integration with Vue's reactive data system</li>
          <li>It supports filtering and pagination, enabling user input and data manipulation</li>
          <li>The rich dataset allows for creating interactive components and views</li>
          <li>It provides well-structured JSON responses that are easy to work with</li>
        </ul>
        
        <h2>Project Scope</h2>
        <p>
          While the API contains much more data than what's shown here, I've focused on three main areas:
        </p>
        <ul>
          <li>Classes - Explore the different character classes available in D&D 5e</li>
          <li>Monsters - Browse through the vast bestiary of creatures</li>
          <li>Races - Discover the various playable races</li>
        </ul>
      </Accordion>

      <Accordion title="Project Requirements Checklist">
        <h2>COMP 74 Final Project Requirements Checklist</h2>
        <ol>
          <li><strong>Framework & Setup</strong> ✅
            <ul>
              <li>Build the client using Vue + Vite</li>
            </ul>
          </li>
          <li><strong>API Integration</strong> ✅
            <ul>
              <li>Allow users to query 2-3 types of data</li>
              <li>Use RESTful API endpoints where data types are specified as path components (not query parameters)</li>
            </ul>
          </li>
          <li><strong>Views & Components</strong> ✅
            <ul>
              <li>Design an appropriate set of Views and Components for displaying and interacting with the data</li>
            </ul>
          </li>
          <li><strong>Reactive Data & State Management</strong> ✅
            <ul>
              <li>Use Vue's reactive data to manage API responses and user input dynamically</li>
              <li>Ensure changes to data trigger automatic UI updates without requiring manual DOM manipulation</li>
            </ul>
          </li>
          <li><strong>User Input & Filtering</strong> ✅
            <ul>
              <li>Enable users to set request parameters (if supported by the API) to filter results</li>
              <li>Use appropriate input types (e.g., dropdowns, radio buttons) to improve usability when selecting predefined options</li>
              <li>Provide default values for inputs to facilitate testing</li>
            </ul>
          </li>
          <li><strong>Data Fetching & Updates</strong> ✅
            <ul>
              <li>Use the Fetch API to send asynchronous requests and dynamically update the page with response data</li>
            </ul>
          </li>
          <li><strong>Styling & UI</strong> ✅
            <ul>
              <li>While this is not a web design course, apply CSS to ensure a clean and user-friendly layout</li>
            </ul>
          </li>
          <li><strong>Code Quality</strong> ✅
            <ul>
              <li>Format HTML and JavaScript for readability</li>
              <li>Comment JavaScript code for clarity</li>
              <li>Remove any unused code before submission</li>
            </ul>
          </li>
        </ol>
      </Accordion>
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

p {
  line-height: 1.6;
  margin-bottom: 1rem;
}

ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

li {
  margin: 0.5rem 0;
}
</style>