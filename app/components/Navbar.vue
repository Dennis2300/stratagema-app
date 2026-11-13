<template>
  <header class="fixed inset-x-0 top-4 z-50 px-4 font-genshin">
    <nav
      class="navbar mx-auto max-w-5xl bg-base-300/80 rounded-full border border-white/25 px-4 shadow-lg backdrop-blur"
      aria-label="Main"
    >
      <!-- Left: logo -->
      <div class="navbar-start">
        <NuxtLink to="/" class="flex items-center gap-2 pl-2 text-lg font-bold">
          <img class="w-10" src="/favicon.webp" alt="" />
          <p>Stratagema</p>
        </NuxtLink>
      </div>

      <!-- Middle: navigation (desktop only) -->
      <div class="navbar-center hidden md:flex">
        <ul class="flex items-center gap-1">
          <li v-for="route in routes" :key="route.path">
            <NuxtLink
              :to="route.path"
              class="relative block px-4 py-2 after:absolute after:inset-x-4 after:bottom-1 after:h-0.5 after:origin-right after:scale-x-0 after:rounded-full after:bg-current after:transition-transform after:duration-300 after:content-[''] hover:after:origin-left hover:after:scale-x-100 focus-visible:after:origin-left focus-visible:after:scale-x-100"
              :active-class="
                route.path === '/' ? '' : 'after:origin-left after:scale-x-100'
              "
              exact-active-class="after:origin-left after:scale-x-100"
            >
              {{ route.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- Right -->
      <div class="navbar-end">
        <!-- Desktop: About -->
        <ul class="menu menu-horizontal hidden gap-1 p-0 md:flex">
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

        <!-- Mobile: hamburger dropdown -->
        <div class="dropdown dropdown-end md:hidden">
          <button
            tabindex="0"
            class="btn btn-ghost btn-circle"
            aria-label="Open menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <!-- onclick blurs the dropdown so it closes after picking a link -->
          <ul
            tabindex="0"
            class="menu dropdown-content z-10 mt-4 w-56 gap-1 rounded-3xl border border-base-300 bg-base-100 p-3 shadow-lg"
            onclick="document.activeElement?.blur()"
          >
            <li v-for="route in routes" :key="route.path">
              <NuxtLink
                :to="route.path"
                class="rounded-full"
                :active-class="
                  route.path === '/' ? '' : 'bg-base-200 font-medium'
                "
                exact-active-class="bg-base-200 font-medium"
              >
                {{ route.name }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/about"
                class="rounded-full"
                active-class="bg-base-200 font-medium"
              >
                About
              </NuxtLink>
            </li>
          </ul>
        </div>
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
