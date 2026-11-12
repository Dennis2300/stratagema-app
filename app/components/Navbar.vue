<template>
  <header class="fixed inset-x-0 top-4 z-50 px-4 font-genshin">
    <nav
      class="navbar mx-auto max-w-5xl rounded-full border border-base-300 bg-base-100/80 px-4 shadow-lg backdrop-blur"
      aria-label="Main"
    >
      <!-- Left: logo -->
      <div class="navbar-start">
        <NuxtLink to="/" class="flex items-center gap-2 pl-2 text-lg font-bold">
          <img class="w-10" src="/favicon.webp" alt="" />
          <p>Stratagema</p>
        </NuxtLink>
      </div>

      <!-- Middle: navigation -->
      <div class="navbar-center">
        <ul class="menu menu-horizontal gap-1 p-0">
          <li v-for="route in routes" :key="route.path">
            <NuxtLink
              :to="route.path"
              class="relative hover:bg-transparent focus:bg-transparent focus-visible:bg-transparent active:bg-transparent aria-[current=page]:bg-transparent hover:shadow-none focus:shadow-none focus-visible:shadow-none active:shadow-none aria-[current=page]:shadow-none after:absolute after:inset-x-4 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-current after:transition-transform after:duration-300 after:content-[''] hover:after:scale-x-100 focus-visible:after:scale-x-100"
              :active-class="route.path === '/' ? '' : 'after:scale-x-100'"
              exact-active-class="after:scale-x-100"
            >
              {{ route.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- Right: empty for future use -->
      <div class="navbar-end">
        <ul class="menu menu-horizontal gap-1 p-0">
          <li>
            <NuxtLink
              to="/about"
              class="relative hover:bg-transparent focus:bg-transparent focus-visible:bg-transparent active:bg-transparent aria-[current=page]:bg-transparent hover:shadow-none focus:shadow-none focus-visible:shadow-none active:shadow-none aria-[current=page]:shadow-none after:absolute after:inset-x-4 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-current after:transition-transform after:duration-300 after:content-[''] hover:after:scale-x-100 focus-visible:after:scale-x-100"
              active-class="after:scale-x-100"
            >
              About
            </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
const routes = ref([
  {
    name: "Home",
    path: "/",
    desc: "Homepage",
  },
  {
    name: "Characters",
    path: "/characters",
    desc: "Browse all playable characters",
  },
  {
    name: "Weapons",
    path: "/weapons",
    desc: "Explore all weapons and their stats",
  },
  {
    name: "Artifacts",
    path: "/artifacts",
    desc: "Find the best artifact sets and bonuses",
  },
  {
    name: "Redeem Codes",
    path: "/redeem-codes",
    desc: "Get the latest active redeem codes and rewards",
  },
]);
</script>
