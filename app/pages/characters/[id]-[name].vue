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
        class="w-full object-cover opacity-50"
        :src="character.splash_art_url"
        :alt="character.name"
      />
    </figure>
    <div class="absolute w-full z-10 space-y-6">
      <section
        class="w-full flex flex-col gap-8 bg-base-300/66 py-6 md:p-6 border border-base-content/50 rounded-xl backdrop-blur-xs md:flex-row md:gap-0"
      >
        <figure class="flex flex-2 flex-col items-center gap-6 md:flex-row">
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

          <figcaption class="text-white text-center md:text-left">
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
              class="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium uppercase tracking-[0.2em] text-white/50 md:justify-start"
            >
              <span
                :class="visionColors[character.vision.name] ?? 'text-white'"
              >
                {{ character.vision.name }}
              </span>
              <span class="h-1 w-1 rounded-full bg-white/30"></span>
              <span>{{ character.weapon_type.name }}</span>
              <span class="h-1 w-1 rounded-full bg-white/30"></span>
              <span>{{ character.role }}</span>
              <span class="h-1 w-1 rounded-full bg-white/30"></span>
              <span>{{ character.main_stat }}</span>
            </div>
          </figcaption>
        </figure>

        <div class="flex flex-1 flex-col items-center md:items-end">
          <div class="flex items-center gap-3">
            <div class="h-9 w-1 rounded-xl bg-white"></div>
            <h2>Voice Actors</h2>
          </div>

          <div class="flex flex-col justify-around text-sm">
            <p>VOICE ACTOR PLACEHOLDER</p>
            <p>VOICE ACTOR PLACEHOLDER</p>
            <p>VOICE ACTOR PLACEHOLDER</p>
            <p>VOICE ACTOR PLACEHOLDER</p>
          </div>
        </div>
      </section>

      <section
        class="w-full bg-base-300/66 p-6 border border-base-content/50 rounded-xl backdrop-blur-xs"
      >
        <span
          class="block text-sm font-medium uppercase tracking-wide text-white/40 pl-4"
        >
          Character Profile</span
        >
        <div class="flex items-center gap-3 mb-4">
          <div class="w-1 h-9 bg-white rounded-xl"></div>
          <h2>Dossier</h2>
        </div>

        <div
          class="grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-base-content/10"
        >
          <div class="bg-base-300/80 p-5">
            <span class="label">Rarity</span>
            <div class="text-lg text-yellow-400">
              <span v-for="star in character.rarity" :key="star">★</span>
            </div>
          </div>

          <div class="bg-base-300/80 p-5">
            <span class="label">Signature Dish</span>
            <p class="text-lg font-semibold">Signature Dish</p>
          </div>

          <div class="bg-base-300/80 p-5">
            <span class="label">Constellation</span>
            <p class="text-lg font-semibold">{{ character.constellation }}</p>
          </div>

          <div class="bg-base-300/80 p-5">
            <span class="label">Birthday</span>
            <p class="text-lg font-semibold">{{ character.birthday }}</p>
          </div>

          <div class="bg-base-300/80 p-5">
            <span class="label">Combat Role</span>
            <p class="text-lg font-semibold uppercase">{{ character.role }}</p>
          </div>

          <div class="bg-base-300/80 p-5">
            <span class="label">Release Date</span>
            <p class="text-lg font-semibold">{{ character.release_date }}</p>
          </div>
        </div>
      </section>

      <section
        class="w-full bg-base-300/66 p-6 border border-base-content/50 rounded-xl backdrop-blur-xs"
      >
        <span
          class="block text-sm font-medium uppercase tracking-wide text-white/40 pl-4"
        >
          All materials needed to reach Level 90 and max out Talents.
        </span>
        <div class="flex items-center gap-3 mb-4">
          <div class="w-1 h-9 bg-white rounded-xl"></div>
          <h2>Materials</h2>
        </div>
      </section>

      <section
        class="w-full bg-base-300/66 p-6 border border-base-content/50 rounded-xl backdrop-blur-xs"
      >
        <span
          class="block text-sm font-medium uppercase tracking-wide text-white/40 pl-4"
        >
          Recommended Weapons for {{ character.name }}
        </span>
        <div class="flex items-center gap-3 mb-4">
          <div class="w-1 h-9 bg-white rounded-xl"></div>
          <h2>Weapons</h2>
        </div>
      </section>

      <section
        class="w-full bg-base-300/66 p-6 border border-base-content/50 rounded-xl backdrop-blur-xs"
      >
        <span
          class="block text-sm font-medium uppercase tracking-wide text-white/40 pl-4"
        >
          Recommended Build(s) for {{ character.name }}
        </span>
        <div class="flex items-center gap-3 mb-4">
          <div class="w-1 h-9 bg-white rounded-xl"></div>
          <h2>Build(s)</h2>
        </div>
      </section>

      <section
        class="w-full bg-base-300/66 p-6 border border-base-content/50 rounded-xl backdrop-blur-xs"
      >
        <span
          class="block text-sm font-medium uppercase tracking-wide text-white/40 pl-4"
        >
          Possible Teams for {{ character.name }}
        </span>
        <div class="flex items-center gap-3 mb-4">
          <div class="w-1 h-9 bg-white rounded-xl"></div>
          <h2>Teams</h2>
        </div>
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
