<template>
  <article class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    <NuxtLink
      v-for="link in links"
      :key="link.name"
      :to="link.path"
      class="group rounded-2xl border border-white/25 bg-base-200 p-6 transition-all duration-200 hover:border-primary hover:bg-base-100 hover:shadow-lg"
    >
      <div class="flex h-full items-center justify-between">
        <div>
          <h2
            class="text-lg font-semibold transition-colors group-hover:text-primary"
          >
            {{ link.name }}
          </h2>

          <p class="mt-2 text-sm text-base-content/70">
            {{ link.desc }}
          </p>
        </div>

        <span
          class="text-2xl text-base-content/40 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary"
        >
          →
        </span>
      </div>
    </NuxtLink>
  </article>
</template>

<script setup>
const links = ref([
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
