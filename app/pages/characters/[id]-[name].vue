<template>
  <div
    v-if="characterLoading"
    class="flex justify-center items-center h-[75vh]"
  >
    <span class="loading loading-spinner loading-xl"></span>
  </div>

  <div v-else-if="characterError">
    <ErrorMessage :error="characterError" />
  </div>

  <article v-else-if="character" class="relative min-h-[125vh]">
    <figure class="absolute">
      <img
        class="w-full object-cover opacity-25"
        :src="character.splash_art_url"
        :alt="character.name"
      />
    </figure>
    <div class="absolute w-full z-10">
      <section
        class="w-full flex bg-base-300/66 p-6 border border-base-content/50 rounded-xl"
      >
        <figure class="flex flex-1 items-center gap-6">
          <div class="relative shrink-0 rounded-full overflow-hidden">
            <img
              class="h-32 w-32 object-cover md:h-40 md:w-40"
              :class="{
                'rarity-5': character.rarity === 5,
                'rarity-4': character.rarity === 4,
              }"
              :src="character.img_url"
              :alt="character.name"
            />
          </div>
          <figcaption class="text-white">
            <span
              v-if="character.title"
              class="mb-2 block text-sm font-medium uppercase tracking-[0.3em] text-white/50"
            >
              {{ character.title }}
            </span>
            <h1
              class="text-6xl font-bold uppercase leading-none tracking-tight md:text-8xl"
            >
              {{ character.name }}
            </h1>
            <div
              class="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium uppercase tracking-[0.2em] text-white/50"
            >
              <span
                :class="visionColors[character.vision.name] ?? 'text-white'"
              >
                {{ character.vision.name }}
              </span>
              <span class="h-1 w-1 rounded-full bg-white/30"></span>
              <span>
                {{ character.weapon_type.name }}
              </span>
              <span class="h-1 w-1 rounded-full bg-white/30"></span>
              <span>
                {{ character.main_stat }}
              </span>
              <span class="h-1 w-1 rounded-full bg-white/30"></span>
              <span>
                {{ character.role }}
              </span>
            </div>
          </figcaption>
        </figure>
        <div class="flex-1 flex flex-col items-end">
          <div class="flex items-center gap-3">
            <div class="w-1 h-9 bg-white rounded-xl"></div>
            <h2>Voice Actors</h2>
          </div>
          <div class="flex flex-col justify-around h-full">
            <p>VOICE ACTOR PLACEHOLDER</p>
            <p>VOICE ACTOR PLACEHOLDER</p>
            <p>VOICE ACTOR PLACEHOLDER</p>
            <p>VOICE ACTOR PLACEHOLDER</p>
          </div>
        </div>
      </section>
      <section>
        <h2>Dossier</h2>
      </section>
      <section>
        <h2>Weapons</h2>
      </section>
      <section>
        <h2>Builds</h2>
      </section>
    </div>
  </article>

  <div v-else>Empty Fallback</div>
</template>

<script setup>
const supabase = useSupabaseClient();
const route = useRoute();

const param_id = route.params.id;

const visionColors = {
  Pyro: "text-red-400",
  Hydro: "text-blue-400",
  Anemo: "text-teal-300",
  Electro: "text-purple-400",
  Dendro: "text-green-400",
  Cryo: "text-cyan-300",
  Geo: "text-yellow-400",
};

const {
  data: character,
  pending: characterLoading,
  error: characterError,
} = useAsyncData(`character-${param_id}`, async () => {
  const { data, error } = await supabase
    .schema("genshin_impact")
    .from("characters")
    .select("*, vision:vision_id(*), weapon_type:weapon_type_id(*)")
    .eq("id", param_id)
    .single();
  if (error) throw error;
  return data;
});
</script>
