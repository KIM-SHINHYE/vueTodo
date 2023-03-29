<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="Vue Practice" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/todo/register">todo-register</RouterLink>
        <RouterLink to="/todo/list">todo-list</RouterLink>
        <RouterLink to="/user/register">user-register</RouterLink>
        <RouterLink to="/user/list">user-list</RouterLink>
        <RouterLink to="/directive">directive</RouterLink>
        <RouterLink to="/lifecycle">lifecycle</RouterLink>
        <RouterLink to="/exchange">currency-exchange</RouterLink>
        <!-- 1.무엇인지, 2.어떻게 언제 사용하는지, 3.비스트에서는 어떻게 사용하는지 -->
        <RouterLink to="/computed">computed</RouterLink>
        <RouterLink to="/watch">watch</RouterLink>
        <RouterLink to="/faq">FAQ</RouterLink>
        <!-- url은 전부 소문자로 써주기(to) -->
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
