<!-- ProjectCards.vue -->
<template>
  <div class="project-cards-container">
    <div 
      class="card" 
      v-for="(project, index) in projects" 
      :key="index"
      :class="['card-' + (index + 1), {'expanded': expandedCard === index}]"
      @click="toggleExpand(index)"
    >
      <div class="card-content">
        <div class="card-accent" :class="'accent-' + (index + 1)"></div>
        <h3>{{ project.title }}</h3>
        <p :class="{'show-all': expandedCard === index}">{{ project.description }}</p>
        <a :href="project.githubLink" target="_blank" class="github-link" @click.stop>
          <span class="github-square"></span>
          <span>WEBSITE</span>
        </a>
        <div class="expand-indicator" v-if="project.description.length > 100">
          <span v-if="expandedCard !== index">+ More</span>
          <span v-else>- Less</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectCards",
  data() {
    return {
      expandedCard: null,
      projects: [
        {
          title: "LLM STEERING FOR EDUCATIONAL FEEDBACK",
          description: "Used activation steering technique to drive LLMs to provide encouraging feedback on student essays.",
          githubLink: "https://bit.ly/ed-tech-paper"
        },
        {
          title: "2x2 MATRIX GAME ENVIRONMENT FOR LLMS",
          description: "Environment which allows for LLM agents to play 2x2 matrix games and for their activations to be collected for classification.",
          githubLink: "https://github.com/nordbyerik/gaims"
        },
        {
          title: "MODEL SCOPING (Work In Progress)",
          description: "Developed and evaluated methods for scoping language models to specific tasks. This looks to approach safety from a Zero Trust posture to significantly enhance security while largely preserving model functionality. Initially developed as apart of a Hackathon with Apart Research, we are now expanding the concept with their research studio.",
          githubLink: "https://www.lesswrong.com/posts/wvEJ5mRbBEDxuiHrL/scoping-llms"
        },
        {
          title: "MULTI-AGENT LLM RISKS",
          description: "Working on a systematic literature review evaluating empirical evidence of risks in multi-agent LLM systems.",
          githubLink: "https://safe-mustang-98d.notion.site/Multi-Agent-Risks-1d068745bc888085b062fadcb50a1412"
        },
        {
          title: "SOCIAL MEDIA TOXICITY",
          description: "Engineered simulations to quantify moderation impact on social media toxicity levels. Extended the CMU CASOS laboratory's simulation framework with new interaction patterns, generating insights for platform governance. Research accepted for poster presentation.",
          githubLink: "https://toxicity-analysis.vercel.app/"
        },
        
      ]
    };
  },
  methods: {
    toggleExpand(index) {
      if (this.expandedCard === index) {
        this.expandedCard = null;
      } else {
        this.expandedCard = index;
      }
    }
  }
};
</script>
<style scoped>

/* --- START: UPDATED CONTAINER STYLES --- */
.project-cards-container {
  display: flex; /* CHANGED from 'grid' */
  flex-wrap: wrap; /* ADDED */
  justify-content: center; /* ADDED to center the cards */
  gap: 20px;
  width: 100%;
  max-width: 900px; /* Reduced from 1200px for more compact layout */
  padding: 0 40px;
  margin: 60px auto 30px; /* Reduced top margin from 80px */
  /* REMOVED 'grid-template-columns' and 'justify-content: start' */
}
/* --- END: UPDATED CONTAINER STYLES --- */

.card {
  /* --- ADDED: CARD WIDTH --- */
  /* We now define the width here instead of in the grid container */
  /* Calculation for 2 columns with tighter layout */
  width: calc((100% - 20px) / 2);
  /* --- END: ADDED --- */
  
  background: rgba(255, 255, 255, 0.85); /* More transparent to blend with background */
  height: 200px; /* Reduced from 230px */
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08); /* Subtle shadow for depth */
}

.card-content {
  position: relative;
  padding: 16px 18px; /* Reduced padding for more compact design */
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1.5px solid black; /* Slightly thinner border for elegance */
  box-sizing: border-box;
}

.card-accent {
  position: absolute;
  top: 0;
  left: 0;
  height: 4px; /* Reduced from 8px for subtlety */
  width: 40%;
}

/* Accent Colors - Bauhaus Primary Colors Only */
.accent-1 { background-color: #DE0000; } /* Bauhaus Red */
.accent-2 { background-color: #004D9D; } /* Bauhaus Blue */
.accent-3 { background-color: #FFCC00; } /* Bauhaus Yellow */
.accent-4 { background-color: #DE0000; } /* Bauhaus Red */
.accent-5 { background-color: #004D9D; } /* Bauhaus Blue */

/* Card Border Styles (Grouped for repeating pattern) */
.card-1 .card-content,
.card-4 .card-content {
  border-left-width: 3px; /* Reduced from 5px */
  padding-left: 20px; /* Reduced from 25px */
}

.card-2 .card-content,
.card-5 .card-content {
  border-top-width: 3px; /* Reduced from 5px */
  padding-top: 20px; /* Reduced from 25px */
}

.card-3 .card-content {
  border-right-width: 3px; /* Reduced from 5px */
  padding-right: 20px; /* Reduced from 25px */
}

/* Card Accent Widths (Grouped for repeating pattern) */
.card-1 .card-accent,
.card-4 .card-accent {
  width: 35%; /* Reduced from 50% for subtlety */
}

.card-2 .card-accent,
.card-5 .card-accent {
  width: 30%; /* Reduced from 40% */
}

.card-3 .card-accent {
  width: 40%; /* Reduced from 60% */
}

/* Subtle hover effect for interactivity */
.card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  background: rgba(255, 255, 255, 0.90);
}

.card.expanded {
  height: auto;
  min-height: 220px; /* Reduced from 250px */
  z-index: 10;
}

h3 {
  margin-top: 10px; /* Reduced from 15px */
  color: #000;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 14px; /* Reduced from 16px for more compact look */
  letter-spacing: 0.8px; /* Slightly tighter */
  text-transform: uppercase;
  cursor: pointer;
  margin-bottom: 6px;
  line-height: 1.3;
}

p {
  flex-grow: 1;
  margin: 8px 0 10px 0; /* Reduced margins */
  color: #333;
  font-family: 'Montserrat', sans-serif;
  font-size: 12px; /* Reduced from 13px */
  line-height: 1.5; /* Slightly increased for readability */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Reduced from 4 for more compact cards */
  -webkit-box-orient: vertical;
  cursor: pointer;
  text-align: left;
}

p.show-all {
  -webkit-line-clamp: unset;
  display: block;
}

.github-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
  font-size: 11px; /* Reduced from 12px */
  font-weight: 700;
  color: #000;
  text-transform: uppercase;
  letter-spacing: 0.8px; /* Slightly tighter */
  align-self: flex-start;
  margin-top: auto;
}

.github-square {
  display: inline-block;
  width: 12px; /* Reduced from 16px */
  height: 12px; /* Reduced from 16px */
  background-color: #000;
  margin-right: 6px; /* Reduced from 8px */
}

.expand-indicator {
  font-size: 12px;
  color: #666;
  text-align: center;
  margin-top: 10px;
  font-family: 'Montserrat', sans-serif;
  cursor: pointer;
  font-weight: 700;
}

@media (max-width: 1024px) {
  .card {
    width: calc((100% - 20px) / 2); /* Maintain 2-column layout */
  }
}

@media (max-width: 768px) {
  .card {
    width: 100%;
  }
  
  .card {
    height: 190px; /* Reduced from 220px */
  }
  
  .card.expanded {
    min-height: 200px; /* Reduced from 220px */
  }
}

</style>