<template>
  <div class="animated-bg px-4">
    <div class="shooting-stars" aria-hidden="true">
      <div class="stars-left">
        <div v-for="i in 10" :key="'left-' + i" class="shooting-star"></div>
      </div>

      <div class="stars-right">
        <div v-for="i in 10" :key="'right-' + i" class="shooting-star"></div>
      </div>
    </div>

    <!-- content -->
    <div class="relative z-10 py-8 space-y-8 md:space-y-0">
      <!-- Character showcase -->
      <article
        id="new_characters"
        class="min-h-[65vh] flex flex-col items-center"
      >
        <h1 class="italic">Say Hello to...</h1>

        <div
          class="flex flex-col md:flex-row justify-center items-center gap-8 mt-4"
        >
          <NuxtLink
            :to="`/characters/${character.id}-${slugify(character.name)}`"
            class="relative w-xs h-xs bg-base-200/90 rounded-lg border border-white/25 hover:cursor-pointer hover:border hover:border-white/75 transition duration-300"
            v-for="character in characters"
            :key="character.id"
          >
            <img
              class="w-full h-full"
              :src="character.splash_art_url"
              :alt="character.name"
            />

            <h2 class="text-center">{{ character.name }}</h2>

            <span class="absolute top-3 left-3 text-yellow-500">
              {{ "★".repeat(character.rarity) }}
            </span>

            <div
              class="bg-base-300 grid grid-cols-2 py-4 text-center rounded-b-lg mt-2"
            >
              <div class="border-r border-white/25">
                <p class="text-xs italic uppercase text-white/50">weapon</p>
                <p class="text-sm">{{ character.weapon_type.name }}</p>
              </div>

              <div class="border-l border-white/25">
                <p class="text-xs italic uppercase text-white/50">Role</p>
                <p class="text-sm">
                  {{ character.vision.name }} {{ character.role }}
                </p>
              </div>
            </div>
          </NuxtLink>
        </div>
      </article>

      <!-- Navigation Shortcuts -->
      <article class="min-h-[35vh]">
        <h3 class="divider md:px-50">There's more to see...</h3>
        <div
          class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto mt-6"
        >
          <NuxtLink
            v-for="link in links"
            :key="link.name"
            :to="link.path"
            class="group bg-base-200 p-4 border border-white/25 rounded-lg hover:border-white/50 transition duration-300"
          >
            <div class="">
              <div class="flex justify-between items-center">
                <h2>
                  {{ link.name }}
                </h2>
                <span class="group-hover:translate-x-1 transition duration-300">
                  →
                </span>
              </div>
              <div class="divider mt-0 mb-1"></div>
              <p class="text-xs text-base-content/90">
                {{ link.desc }}
              </p>
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
