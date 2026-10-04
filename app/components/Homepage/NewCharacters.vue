<template>
  <article class="min-h-[70vh] flex flex-col justify-around items-center mt-4">
    <h1 class="italic">Say hello to...</h1>
    <div class="max-w-7xl flex flex-col md:flex-row gap-16">
      <div
        v-for="character in characters"
        class="card bg-base-100 w-96 shadow-sm"
      >
        <figure>
          <img :src="character.splash_art_url" :alt="character.name" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{{ character.name }}</h2>
          <div class="flex items-center gap-2">
            <span class="badge badge-warning badge-soft">{{
              character.vision.name
            }}</span>
            <span class="badge badge-warning badge-soft">{{
              character.role
            }}</span>
          </div>
          <div class="card-actions justify-end">
            <NuxtLink
              :to="`/characters/${character.id}-${slugify(character.name)}`"
              class="btn btn-primary group"
            >
              <span
                class="transition-transform duration-200 group-hover:translate-x-1"
              >
                Details
              </span>
              <svg
                class="h-5 w-5 transition-transform duration-200 group-hover:translate-x-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 12h14m-6-6l6 6-6 6"
                />
              </svg>
            </NuxtLink>
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
