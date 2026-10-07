<template>
  <div class="animated-bg">
    <div class="shooting-stars" aria-hidden="true">
      <div class="stars-left">
        <div v-for="i in 10" :key="'left-' + i" class="shooting-star"></div>
      </div>

      <div class="stars-right">
        <div v-for="i in 10" :key="'right-' + i" class="shooting-star"></div>
      </div>
    </div>

    <!-- content -->
    <div class="relative z-10 py-8">
      <!-- Character showcase -->
      <article id="new_characters" class="min-h-[65vh] flex flex-col items-center">
        <h1 class="italic">Say Hello to...</h1>

        <div
          class="flex flex-col md:flex-row justify-center items-center gap-8 mt-4"
        >
          <NuxtLink
            :to="`/characters/${character.id}-${slugify(character.name)}`"
            class="relative w-xs h-xs bg-zinc-800/75 rounded-2xl border border-white/25 hover:cursor-pointer hover:border hover:border-white/75 transition duration-300"
            v-for="character in characters"
            :key="character.id"
          >
            <img class="w-full h-full" :src="character.splash_art_url" alt="" />

            <span
              class="absolute top-3 left-3 badge badge-neutral text-yellow-400 border border-white/25"
            >
              {{ "★".repeat(character.rarity) }}
            </span>

            <div class="text-center my-4">
              <span class="text-info/90 italic text-sm">
                {{ character.vision.name }} {{ character.role }}
              </span>
              <h2>{{ character.name }}</h2>
            </div>

            <div
              class="bg-base-200 grid grid-cols-2 py-4 text-center rounded-b-2xl"
            >
              <div class="border-r border-white/25">
                <p class="text-xs italic uppercase text-white/50">weapon</p>
                <p class="text-sm">{{ character.weapon_type.name }}</p>
              </div>

              <div class="border-l border-white/25">
                <p class="text-xs italic uppercase text-white/50">Main Stat</p>
                <p class="text-sm">{{ character.main_stat }}</p>
              </div>
            </div>
          </NuxtLink>
        </div>
      </article>

      <!-- Navigation Shortcuts -->
      <article class="min-h-[35vh]">
        <h3 class="text-center">There's more to see...</h3>
        <div
          class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto mt-4"
        >
          <NuxtLink
            v-for="link in links"
            :key="link.name"
            :to="link.path"
            class="group rounded-2xl border border-white/25 bg-base-200/90 p-6 transition-all duration-200 hover:border-info hover:bg-base-100 hover:shadow-lg"
          >
            <div class="flex h-full items-center justify-between">
              <div>
                <h2
                  class="text-lg font-semibold transition-colors group-hover:text-info"
                >
                  {{ link.name }}
                </h2>

                <p class="mt-2 text-sm text-base-content/70">
                  {{ link.desc }}
                </p>
              </div>

              <span
                class="text-2xl text-base-content/40 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-info"
              >
                →
              </span>
            </div>
          </NuxtLink>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import "@/assets/shooting-star.css";
const supabase = useSupabaseClient();

const {
  data: characters,
  pending,
  error,
} = useAsyncData("new_characters", async () => {
  const { data, error } = await supabase
    .schema("genshin_impact")
    .from("characters")
    .select(
      "*, vision:vision_id(name), weapon_type:weapon_type_id(name), main_stat, rarity",
    )
    .eq("is_new", true);
  if (error) throw error;
  return data;
});

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
