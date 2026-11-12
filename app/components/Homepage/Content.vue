<template>
  <article class="animated-bg border-t border-white/50">
    <div class="shooting-stars" aria-hidden="true">
      <div class="stars-left">
        <div v-for="i in 10" :key="'left-' + i" class="shooting-star"></div>
      </div>

      <div class="stars-right">
        <div v-for="i in 10" :key="'right-' + i" class="shooting-star"></div>
      </div>
    </div>

    <section
      id="new_characters"
      class="relative z-10 max-w-7xl mx-auto space-y-8 py-24"
    >
      <h1 class="text-center">Say hello to...</h1>
      <div class="flex flex-wrap justify-center items-center gap-8">
        <NuxtLink
          v-for="character in characters"
          :key="character.id"
          :to="`/characters/${character.id}-${slugify(character.name)}`"
          class="relative bg-base-300 rounded-lg border border-white/25 hover:border-white/50 hover:cursor-pointer transition duration-300 group"
        >
          <figure>
            <img
              class="w-82 h-auto opacity-50 object-cover object-center group-hover:opacity-90 transition duration-300"
              :src="character.splash_art_url"
              :alt="character.name"
            />
            <figcaption class="absolute bottom-4 left-4">
              <h2>{{ character.name }}</h2>
              <div class="flex items-center gap-2">
                <span class="badge badge-sm badge-primary">{{
                  character.vision.name
                }}</span>
                <span class="badge badge-sm badge-primary"
                  >{{ character.weapon_type.name }}
                </span>
                <span class="badge badge-sm badge-primary">{{
                  character.role
                }}</span>
              </div>
            </figcaption>
          </figure>

          <span class="absolute top-3 left-3 text-yellow-500">
            {{ "★".repeat(character.rarity) }}
          </span>
        </NuxtLink>
      </div>

      <h2 class="divider">There's more to see...</h2>
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
    </section>
  </article>
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
