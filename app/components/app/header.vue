<template>
  <header id="app-header" class="navbar h-10 bg-primary">
    <div class="navbar-start flex gap-2">
      <NuxtLink to="/">
        <img
          src="/favicon.ico"
          alt="favicon"
          class="w-10"
        >
      </NuxtLink>
      <span>Losovoj</span>
    </div>
    <div class="navbar-end flex justify-end">
      <AppThemeToggle />
    </div>
  </header>
</template>
