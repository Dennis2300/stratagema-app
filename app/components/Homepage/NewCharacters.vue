<template>
  <article id="new_characters" class="min-h-[70vh] flex flex-col justify-center items-center mt-12 md:mt-0">
    <h2 class="mb-4 italic">Say hello to...</h2>
    <div class="flex flex-col md:flex-row justify-around items-center gap-8">
      <div
        v-for="character in characters"
        :key="character.id"
        class="card bg-base-300 w-96 shadow-sm border border-white/25"
      >
        <figure class="px-10 pt-10">
          <img
            :src="character.splash_art_url"
            :alt="character.name"
            class="rounded-xl"
          />
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title">{{ character.name }}</h2>
          <div class="space-x-2">
            <span class="badge badge-accent">{{ character.vision.name }}</span>
            <span class="badge badge-accent">{{ character.role }}</span>
          </div>
          <div class="card-actions">
            <NuxtLink
              :to="`/characters/${character.id}-${slugify(character.name)}`"
              class="btn btn-primary"
              >See details</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
const supabase = useSupabaseClient();

const {
  data: characters,
  pending,
  error,
} = useAsyncData("new_characters", async () => {
  const { data, error } = await supabase
    .schema("genshin_impact")
    .from("characters")
    .select("*, vision:vision_id(name)")
    .eq("is_new", true);
  if (error) throw error;
  return data;
});
</script>
