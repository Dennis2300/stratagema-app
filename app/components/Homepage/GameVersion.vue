<template>
  <div v-if="pending" class="h-screen flex justify-center items-center">
    <span class="loader"></span>
  </div>

  <div v-else-if="error" class="h-screen flex justify-center items-center">
    <ErrorMessage :error="error" />
  </div>

  <article v-else-if="currentVersion" class="h-screen">
    <div
      class="hero min-h-screen"
      :style="`background-image: url(${currentVersion.img_url})`"
    >
      <div class="hero-overlay bg-black/66"></div>
      <div class="hero-content text-center">
        <div class="max-w-7xl">
          <figure class="flex justify-center items-center">
            <img class="w-64 h-64" src="/favicon.webp" alt="" />
          </figure>
          <h1 class="font-bold uppercase">stratagema</h1>
          <div class="divider divider-accent my-2"></div>
          <span>Genshin Impact | 原神</span>
          <h2 class="italic">"{{ currentVersion.name }}"</h2>
          <p>Version {{ currentVersion.version_number }} is available now!</p>
          <div class="h-33 flex flex-col justify-center items-center gap-4">
            <span>Check out the new characters!</span>
            <NuxtLink
              to="#new_characters"
              class="arrow-down"
              aria-label="Scroll to next section"
            />
          </div>
        </div>
      </div>
    </div>
  </article>

  <div v-else>
    <HomepageGameMaintenance />
  </div>
</template>

<script setup>
import "@/assets/loader.css";
import "@/assets/arrow-down.css";
const supabase = useSupabaseClient();

const {
  data: currentVersion,
  pending,
  error,
} = await useAsyncData("game_version", async () => {
  const now = new Date().toISOString();
  // For Testing:
  // const now = new Date("2026-10-31T00:00:00Z").toISOString();

  const { data, error } = await supabase
    .schema("genshin_impact")
    .from("game_versions")
    .select("*")
    .lte("start_date", now)
    .gte("end_date", now)
    .maybeSingle();

  if (error) throw error;
  return data;
});
</script>
