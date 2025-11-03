<template>
  <div class="guess-container">
    <div class="card flex justify-content-center align-items-center">
      <div class="game-content">
        <h1 class="title">Guess the Programming Language</h1>

        <div class="code-snippet" v-if="currentSnippet">
          <pre><code>{{ currentSnippet.code }}</code></pre>
        </div>

        <div class="options-container" v-if="!showResult">
          <button v-for="option in options" :key="option" @click="checkAnswer(option)" class="option-button"
            :class="{ 'selected': selectedOption === option }">
            {{ option }}
          </button>
        </div>

        <div class="result-message" v-if="showResult">
          <p :class="resultClass">{{ resultMessage }}</p>
          <button @click="nextSnippet" class="next-button">Next Snippet</button>
        </div>

        <div class="score-container">
          <p class="score">Score: {{ score }} / {{ totalGuessed }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GuessProgrammingLanguage",
  data() {
    return {
      codeSnippets: [
        {
          language: "JavaScript",
          code: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`
        },
        {
          language: "Python",
          code: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(10))`
        },
        {
          language: "Java",
          code: `public class Fibonacci {
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    public static void main(String[] args) {
        System.out.println(fibonacci(10));
    }
}`
        },
        {
          language: "C++",
          code: `#include <iostream>
using namespace std;

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    cout << fibonacci(10) << endl;
    return 0;
}`
        },
        {
          language: "C#",
          code: `using System;

class Program {
    static int Fibonacci(int n) {
        if (n <= 1) return n;
        return Fibonacci(n - 1) + Fibonacci(n - 2);
    }
    
    static void Main() {
        Console.WriteLine(Fibonacci(10));
    }
}`
        },
        {
          language: "Ruby",
          code: `def fibonacci(n)
  return n if n <= 1
  fibonacci(n - 1) + fibonacci(n - 2)
end

puts fibonacci(10)`
        },
        {
          language: "Go",
          code: `package main

import "fmt"

func fibonacci(n int) int {
    if n <= 1 {
        return n
    }
    return fibonacci(n-1) + fibonacci(n-2)
}

func main() {
    fmt.Println(fibonacci(10))
}`
        },
        {
          language: "Rust",
          code: `fn fibonacci(n: u32) -> u32 {
    if n <= 1 {
        return n;
    }
    fibonacci(n - 1) + fibonacci(n - 2)
}

fn main() {
    println!("{}", fibonacci(10));
}`
        },
        {
          language: "PHP",
          code: `<?php
function fibonacci($n) {
    if ($n <= 1) return $n;
    return fibonacci($n - 1) + fibonacci($n - 2);
}

echo fibonacci(10);
?>`
        },
        {
          language: "Swift",
          code: `func fibonacci(_ n: Int) -> Int {
    if n <= 1 { return n }
    return fibonacci(n - 1) + fibonacci(n - 2)
}

print(fibonacci(10))`
        },
        {
          language: "TypeScript",
          code: `function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`
        },
        {
          language: "Kotlin",
          code: `fun fibonacci(n: Int): Int {
    return if (n <= 1) n
    else fibonacci(n - 1) + fibonacci(n - 2)
}

fun main() {
    println(fibonacci(10))
}`
        }
      ],
      currentSnippet: null,
      options: [],
      selectedOption: null,
      showResult: false,
      resultMessage: "",
      resultClass: "",
      score: 0,
      totalGuessed: 0
    };
  },
  mounted() {
    this.nextSnippet();
  },
  methods: {
    nextSnippet() {
      // Select a random snippet
      const randomIndex = Math.floor(Math.random() * this.codeSnippets.length);
      this.currentSnippet = this.codeSnippets[randomIndex];

      // Generate 4 random options including the correct one
      const allLanguages = this.codeSnippets.map(s => s.language);
      const wrongOptions = allLanguages
        .filter(lang => lang !== this.currentSnippet.language)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      this.options = [...wrongOptions, this.currentSnippet.language]
        .sort(() => Math.random() - 0.5);

      this.selectedOption = null;
      this.showResult = false;
      this.resultMessage = "";
    },
    checkAnswer(selectedLanguage) {
      this.selectedOption = selectedLanguage;
      this.totalGuessed++;

      if (selectedLanguage === this.currentSnippet.language) {
        this.score++;
        this.resultMessage = `Correct! It's ${this.currentSnippet.language}!`;
        this.resultClass = "correct";
      } else {
        this.resultMessage = `Wrong! The correct answer is ${this.currentSnippet.language}.`;
        this.resultClass = "incorrect";
      }

      this.showResult = true;
    }
  }
}
</script>

<style scoped>
.guess-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2rem;
  max-width: 900px;
  width: 100%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.game-content {
  width: 100%;
}

.title {
  font-family: "Cinzel", serif;
  font-size: 2.5em;
  text-align: center;
  margin-bottom: 2rem;
  color: var(--text-color);
}

.code-snippet {
  background: var(--blue-500);
  border: 2px solid var(--blue-400);
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem 0;
  overflow-x: auto;
}

.code-snippet pre {
  margin: 0;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
  line-height: 1.6;
  color: var(--blue-300);
}

.code-snippet code {
  color: var(--blue-300);
}

.options-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.option-button {
  padding: 1rem 1.5rem;
  background: var(--blue-400);
  color: var(--text-color);
  border: 2px solid var(--blue-400);
  border-radius: 8px;
  font-size: 1.1em;
  font-family: "Roboto", sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
}

.option-button:hover {
  background: var(--blue-100);
  border-color: var(--blue-300);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(144, 224, 239, 0.3);
}

.option-button.selected {
  background: var(--blue-100);
  border-color: var(--blue-300);
}

.result-message {
  text-align: center;
  margin: 2rem 0;
}

.result-message p {
  font-size: 1.5em;
  font-family: "Roboto", sans-serif;
  margin-bottom: 1.5rem;
}

.result-message .correct {
  color: #4ade80;
  font-weight: bold;
}

.result-message .incorrect {
  color: #f87171;
  font-weight: bold;
}

.next-button {
  padding: 0.75rem 2rem;
  background: var(--blue-400);
  color: var(--text-color);
  border: 2px solid var(--blue-400);
  border-radius: 8px;
  font-size: 1.1em;
  font-family: "Roboto", sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
}

.next-button:hover {
  background: var(--blue-100);
  border-color: var(--blue-300);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(144, 224, 239, 0.3);
}

.score-container {
  text-align: center;
  margin-top: 2rem;
}

.score {
  font-family: "Roboto", sans-serif;
  font-size: 1.2em;
  color: var(--text-color);
}

@media only screen and (max-width: 768px) {
  .title {
    font-size: 2em;
  }

  .options-container {
    grid-template-columns: 1fr;
  }

  .code-snippet {
    padding: 1rem;
  }

  .code-snippet pre {
    font-size: 0.85em;
  }

  .card {
    padding: 1.5rem;
  }
}
</style>
