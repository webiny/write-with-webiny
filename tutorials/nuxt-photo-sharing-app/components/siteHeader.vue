<!-- ./components/siteHeader.vue -->

<template>
  <header class="site-header">
    <div class="wrapper">
      <NuxtLink to="/">
        <figure class="site-logo">
          <h3>Photo Gallery</h3>
        </figure>
      </NuxtLink>
      <nav class="site-nav">
        <ul class="links">
          <li class="link">
            <NuxtLink to="/">All photos</NuxtLink>
          </li>
          <li class="link">
            <NuxtLink to="/new">New</NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
