<template>
  <article>
    <div v-if="pending">
      <p>Loading</p>
    </div>

    <div v-else-if="error">
      <p>{{ error.message }}</p>
    </div>

    <div v-else-if="currentVersion" class="min-h-170">
      <figure class="relative w-full h-170 aura">
        <img
          class="w-full h-full object-cover rounded-2xl"
          :src="currentVersion.img_url"
          alt=""
        />
        <div
          class="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent rounded-2xl"
        ></div>
        <figcaption class="absolute bottom-5 left-5">
          <span>Genshin Impact | 原神</span>
          <h1>{{ currentVersion.name }}</h1>
          <p class="text-lg mt-2">
            Version {{ currentVersion.version_number }} is available now! |
            Check out the current banner
            <NuxtLink
              class="underline hover:text-white/50 hover:cursor-pointer transition-all"
              >here!</NuxtLink
            >
          </p>
        </figcaption>
      </figure>
    </div>

    <div v-else>
      <HomepageGameMaintenance />
    </div>
  </article>
</template>

<script setup>
const supabase = useSupabaseClient();

const {
  data: currentVersion,
  pending,
  error,
} = await useAsyncData("game_version", async () => {
  const now = new Date().toISOString();
  // For Testing:
  //const now = new Date("2026-08-15T00:00:00Z").toISOString();

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
