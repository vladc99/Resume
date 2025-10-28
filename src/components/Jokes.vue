<template>
    <div>
        <Button class="joke-btn" @click="showJoke" label="Get me a programming joke"></Button>
        <Dialog v-model:visible="dialogVisible" modal header="Programming Joke" class="joke-dialog">
            <div v-if="joke" class="joke-content">
                <p class="joke-setup">{{ joke.setup }}</p>
                <p class="joke-punchline">{{ joke.punchline }}</p>
            </div>
            <div v-else class="joke-content">
                <p class="joke-setup">Loading...</p>
            </div>
        </Dialog>
    </div>
</template>

<script>
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

export default {
    name: 'Jokes-Page',
    components: {
        Dialog,
        Button
    },
    data() {
        return {
            dialogVisible: false,
            joke: null
        };
    },
    mounted() {
        window.addEventListener('mousemove', this.handleMouseMove);
    },
    beforeUnmount() {
        window.removeEventListener('mousemove', this.handleMouseMove);
    },
    methods: {
        async showJoke() {
            this.dialogVisible = true;
            this.joke = null;
            try {
                const response = await fetch('https://official-joke-api.appspot.com/jokes/programming/random');
                const data = await response.json();
                this.joke = data[0];
            } catch (error) {
                console.error('Error fetching joke:', error);
                this.joke = { setup: 'Error', punchline: 'Failed to fetch a joke. Please try again later.' };
            }
        },
        handleMouseMove(e) {
            if (this.dialogVisible) return;
            const btn = this.$el.querySelector('.joke-btn');
            if (!btn) return;
            const btnRect = btn.getBoundingClientRect();
            const cursorX = e.clientX;
            const cursorY = e.clientY;
            const btnCenterX = btnRect.left + btnRect.width / 2;
            const btnCenterY = btnRect.top + btnRect.height / 2;
            const dist = Math.sqrt(
                Math.pow(cursorX - btnCenterX, 2) + Math.pow(cursorY - btnCenterY, 2)
            );
            if (dist < 120) { // threshold in px
                // Calculate safe boundaries
                const minLeft = 0;
                const maxLeft = window.innerWidth - btnRect.width;
                const minTop = 0;
                const maxTop = window.innerHeight - btnRect.height;
                // Generate new position within boundaries
                let newLeft = Math.floor(Math.random() * (maxLeft - minLeft) + minLeft);
                let newTop = Math.floor(Math.random() * (maxTop - minTop) + minTop);
                // Clamp values to ensure button stays in view
                newLeft = Math.max(minLeft, Math.min(newLeft, maxLeft));
                newTop = Math.max(minTop, Math.min(newTop, maxTop));
                btn.style.left = `${newLeft}px`;
                btn.style.top = `${newTop}px`;
            }
        }
    }
}
</script>

<style scoped>
/* Stick joke button to bottom above header dock */
.joke-btn {
    position: fixed;
    left: 50vw;
    top: 80vh;
    z-index: 1001;
    transition: left 0.7s cubic-bezier(0.23, 1, 0.32, 1), top 0.7s cubic-bezier(0.23, 1, 0.32, 1),
        background 0.3s, color 0.3s, border-color 0.3s, box-shadow 0.3s;
    padding: 1em 2em;
    border-radius: 999px;
    background: linear-gradient(135deg, #232946 0%, #1a1a2e 100%);
    color: #b8cfff;
    font-size: 1.2em;
    font-weight: bold;
    box-shadow: 0 4px 16px rgba(184, 207, 255, 0.12);
    border: 2px solid #b8cfff;
    cursor: pointer;
    outline: none;
    letter-spacing: 0.05em;
    user-select: none;
}
.joke-btn:hover {
    background: linear-gradient(135deg, #1a1a2e 0%, #232946 100%);
    box-shadow: 0 8px 24px rgba(184, 207, 255, 0.18);
    color: #a7c7e7;
    border-color: #a7c7e7;
    transform: scale(1.08);
}

h2 {
    color: #42b983;
}

</style>
