<template>
  <nav class="navbar bg-[#090a0f]/95 border-y border-white/15 shadow-2xl">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
          <svg
            aria-label="Menu"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </div>
        <ul
          tabindex="-1"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          <li v-for="route in routes">
            <NuxtLink :to="route.path">
              {{ route.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>
      <NuxtLink to="/" class="btn btn-ghost text-xl uppercase">
        Stratagema
      </NuxtLink>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li v-for="route in routes">
          <NuxtLink :to="route.path">{{ route.name }}</NuxtLink>
        </li>
      </ul>
    </div>
    <div class="navbar-end"></div>
  </nav>
</template>

<script setup>
const routes = ref([
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
    name: "Team Comps",
    path: "/team-comps",
    desc: "Discover the strongest team compositions",
  },
  {
    name: "Redeem Codes",
    path: "/redeem-codes",
    desc: "Get the latest active redeem codes and rewards",
  },
  {
    name: "About",
    path: "/about",
    desc: "Read about the website, features, and future plans",
  },
]);
</script>
