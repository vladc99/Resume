<template>
  <div class="projects-page">
    <div class="projects-wrapper">
      <h2 class="subheader">My products</h2>
      <div class="products-grid">
        <button
          v-for="product in products"
          :key="product.id"
          class="project-card product-card"
          @click="redirectTo(product.url)"
          :data-product-id="product.id"
        >
          <div class="card-content">
            <h2 class="project-title">{{ product.name }}</h2>
            <p class="project-description">{{ product.description }}</p>
            <p v-if="product.description2" class="project-description-2">{{ product.description2 }}</p>
            <p v-if="product.description3" class="project-description-2">{{ product.description3 }}</p>
            <div class="project-link">
              <span>View Product</span>
              <i class="pi pi-arrow-right"></i>
            </div>
          </div>
        </button>
      </div>

      <h1 class="page-title">My Projects</h1>
      <div class="projects-grid">
        <button v-for="project in projects" :key="project.id" class="project-card" @click="redirectTo(project.url)"
          :data-project-id="project.id">
          <div class="card-content">
            <h2 class="project-title">{{ project.name }}</h2>
            <p class="project-description">{{ project.description }}</p>
            <p v-if="project.description2" class="project-description-2">{{ project.description2 }}</p>
            <p v-if="project.description3" class="project-description-2">{{ project.description3 }}</p>
            <div class="project-link">
              <span>View Project</span>
              <i class="pi pi-arrow-right"></i>
            </div>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectsPage',
  data() {
    return {
      products: [
        {
          id: 1,
          name: 'Riftlink.gg',
          description: 'League of Legends Custom Profile maker',
          description2: 'Need an account? use testing@testing.com and password 123456789',
          url: 'https://riftlink.gg'
        },
        {
          id: 2,
          name: 'SoundboardGuys.com',
          description: 'SoundboardGuys.com is a website that allows you to create and share soundboards.',
          description2: 'Over thousands of users monthly.',
          url: 'https://soundboardguys.com'
        }
      ],
      projects: [
        {
          id: 1,
          name: 'Chase the joke?',
          description: 'This mini project makes it so you need to chase the button to get the joke.',
          description2: '(Only works on desktop)',
          url: '/test'
        },
        {
          id: 2,
          name: 'Guess the programming language',
          description: "You'll be shown a snippet and your job is to guess the programming language",
          url: '/guess'
        },
        {
          id: 3,
          name: 'Working calculator',
          description: "In case your calculator doesn't work",
          url: '/calculator'
        },
        {
          id: 4,
          name: 'Wordle',
          description: "Wordle but with programming words",
          url: '/wordle'
        },
        {
          id: 5,
          name: 'Minesweeper',
          description: "Classic Minesweeper game with multiple difficulty levels",
          url: '/minesweeper'
        },
      ]
    };
  },
  methods: {
    redirectTo(url) {
      if (/^https?:\/\//i.test(url)) {
        window.open(url, '_blank');
        return;
      }
      this.$router.push(url);
    }
  }
};
</script>

<style scoped>
.projects-page {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding-top: 5vh;
  padding-bottom: 20px;
  overflow-x: hidden;
  overflow-y: auto;
}

.projects-wrapper {
  width: 100%;
  max-width: 1200px;
  padding: 0 2rem;
  margin: 0 auto;
}

.page-title {
  font-family: "Cinzel", serif;
  font-size: 2.5em;
  text-align: center;
  margin-bottom: 2rem;
  color: var(--text-color);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.subheader {
  font-family: "Cinzel", serif;
  font-size: 1.75em;
  text-align: center;
  margin-bottom: 1.5rem;
  color: var(--text-color);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.product-box {
  background: rgba(255, 255, 255, 0.06);
  border: 2px solid var(--blue-400);
  border-radius: 16px;
  min-height: 200px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.project-card {
  background: rgba(255, 255, 255, 0.06);
  border: 2px solid var(--blue-400);
  border-radius: 16px;
  padding: 1.5rem 1.25rem;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  text-align: left;
  font-family: inherit;
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 48px rgba(144, 224, 239, 0.2);
  border-color: var(--blue-300);
  background: rgba(255, 255, 255, 0.08);
}

.project-card:focus {
  outline: 2px solid var(--blue-300);
  outline-offset: 2px;
}

.card-content {
  text-align: center;
  width: 100%;
}

.project-title {
  font-family: "Cinzel", serif;
  font-size: 1.5em;
  margin-bottom: 0.75rem;
  color: var(--text-color);
}

.project-description {
  font-family: "Roboto", sans-serif;
  font-size: 1em;
  line-height: 1.5;
  color: var(--blue-200);
  margin-bottom: 0.25rem;
}

.project-description-2 {
  font-family: "Roboto", sans-serif;
  font-size: 0.9em;
  font-style: italic;
  color: var(--blue-200);
  opacity: 0.8;
  margin-bottom: 1rem;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: var(--blue-400);
  border: 2px solid var(--blue-400);
  border-radius: 8px;
  color: var(--text-color);
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  font-size: 0.9em;
  transition: all 0.3s ease;
  pointer-events: none;
}

.project-card:hover .project-link {
  background: var(--blue-100);
  border-color: var(--blue-300);
  transform: translateX(4px);
}

.project-link i {
  transition: transform 0.3s ease;
}

.project-card:hover .project-link i {
  transform: translateX(4px);
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .projects-page {
    padding-top: 8vh;
  }

  .projects-wrapper {
    padding: 0 1rem;
  }

  .page-title {
    font-size: 2em;
    margin-bottom: 2rem;
  }

  .projects-grid,
  .products-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .subheader {
    font-size: 1.5em;
    margin-bottom: 1rem;
  }

  .project-card {
    padding: 1.25rem 1rem;
    min-height: 180px;
  }

  .project-title {
    font-size: 1.3em;
    margin-bottom: 0.5rem;
  }

  .project-description {
    font-size: 0.95em;
  }

  .project-link {
    padding: 0.5rem 0.9rem;
    font-size: 0.85em;
    margin-top: 0.75rem;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.5em;
  }

  .project-card {
    padding: 1rem 0.75rem;
    min-height: 160px;
  }

  .project-title {
    font-size: 1.2em;
  }

  .project-description {
    font-size: 0.9em;
  }
}
</style>
