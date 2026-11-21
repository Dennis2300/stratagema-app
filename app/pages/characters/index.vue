<template>
  <section class="max-w-7xl mx-auto pt-24 px-4 md:px-0">
    <figure
      class="relative h-48 w-full overflow-hidden border border-white/25 rounded-lg"
    >
      <img
        class="w-full h-full object-center object-cover"
        src="https://act-upload.hoyoverse.com/event-ugc-hoyowiki/2024/10/23/237301566/bf8ee46d2caba6d5928fbe7b125d37c4_8565732607361309926.png?x-oss-process=image%2Fformat%2Cwebp"
        alt="Stratagema"
      />
      <div class="absolute top-0 left-0 w-full h-full bg-black/66"></div>
      <figcaption
        class="absolute top-0 left-0 h-full w-full flex flex-col justify-center items-center text-center"
      >
        <h1>Characters Archive</h1>
        <p class="text-sm my-2">
          Here you can find all playable and upcoming playable characters
        </p>
      </figcaption>
    </figure>
  </section>

  <div v-if="pending" class="h-100 flex justify-center items-center">
    <div class="loader"></div>
  </div>

  <div v-else-if="error" class="h-100 flex justify-center items-center">
    <ErrorMessage :error="error" />
  </div>

  <article v-else-if="characters" class="max-w-7xl mx-auto px-4 md:px-0 mb-16">
    <header
      v-if="upcomingCharacters.length"
      class="flex items-center gap-3 my-6 border-b border-white/25"
    >
      <div class="w-1 rounded-full h-9 bg-primary"></div>
      <h2 class="">Upcoming</h2>
    </header>
    <section
      v-if="upcomingCharacters.length"
      class="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      <NuxtLink
        v-for="character in upcomingCharacters"
        :key="character.id"
        :to="`/characters/${character.id}-${slugify(character.name)}`"
        class="bg-base-200 p-4 rounded-lg group border border-white/25 hover:border-white/50 hover:bg-base-200 transition duration-300"
      >
        <figure class="flex items-center gap-4">
          <img
            class="w-24 h-24 mask mask-squircle"
            :class="`rarity-${character.rarity}`"
            :src="character.img_url"
            :alt="character.name"
          />
          <figcaption>
            <h3 class="leading-none">{{ character.name }}</h3>
            <span
              class="text-yellow-500 leading-none"
              v-for="n in character.rarity"
              :key="n"
              >★</span
            >
          </figcaption>
        </figure>
      </NuxtLink>
    </section>

    <header
      class="flex flex-col md:flex-row justify-between items-center my-6 border-b border-white/25"
    >
      <div class="flex items-center gap-3">
        <div class="w-1 rounded-full h-9 bg-primary"></div>
        <h2>Playable Characters</h2>
      </div>
      <div
        class="flex flex-col md:flex-row my-4 md:my-0 items-center gap-4 w-2xl"
      >
        <select class="select" v-model="filters.rarity">
          <option value="" selected>Rarity</option>
          <option value="5">5 Star</option>
          <option value="4">4 Star</option>
        </select>
        <select class="select" v-model="filters.vision">
          <option value="" selected>Vision</option>
          <option v-for="vision in visions" :value="vision.id">
            {{ vision.name }}
          </option>
        </select>
        <select class="select" v-model="filters.weapon_type">
          <option value="" selected>Weapon Type</option>
          <option v-for="weapon_type in weapon_types" :value="weapon_type.id">
            {{ weapon_type.name }}
          </option>
        </select>
        <button
          @click="resetFilters"
          class="btn bg-[#FEE502] text-[#181600] border-[#f1d800]"
        >
          Reset
        </button>
      </div>
    </header>
    <section class="min-h-screen grid grid-cols-1 md:grid-cols-4 gap-4">
      <template v-if="playableCharacters.length">
        <NuxtLink
          v-for="character in playableCharacters"
          :key="character.id"
          :to="`/characters/${character.id}-${slugify(character.name)}`"
          class="relative overflow-hidden rounded-lg h-100 bg-base-200 group hover:cursor-pointer"
        >
          <!-- Background image -->
          <div
            class="absolute inset-0 z-0 transition duration-200 opacity-25 group-hover:opacity-95"
            :style="{
              background: `url(${character.splash_art_url}) center / cover no-repeat`,
            }"
          />

          <!-- Is New -->
          <div v-if="character.is_new" class="absolute top-3 right-3">
            <span class="badge badge-sm badge-info">NEW</span>
          </div>

          <!-- Card content -->
          <div class="relative z-10 flex flex-col justify-between h-full p-5">
            <!-- Portrait -->
            <div class="relative w-fit drop-shadow-[0_0_5px_white]">
              <!-- Border layer -->
              <div
                class="mask mask-diamond w-25 h-25 bg-black grid place-items-center"
              >
                <!-- Image layer, slightly smaller -->
                <img
                  class="mask mask-diamond w-24 h-24"
                  :class="`rarity-${character.rarity}`"
                  :src="character.img_url"
                  alt=""
                />
              </div>

              <!-- Vision icon -->
              <img
                class="absolute p-1 -translate-x-1/2 rounded-full -bottom-4 left-1/2 h-9 w-9 bg-neutral"
                :src="character.vision_id.img_url"
                alt=""
              />
            </div>

            <!-- Character information -->
            <div class="flex flex-col gap-2">
              <!-- Name and rarity -->
              <div>
                <span
                  class="mb-1 leading-none tracking-wider text-yellow-500"
                  v-for="n in character.rarity"
                  :key="n"
                  >★</span
                >
                <h4 class="group-hover:underline">
                  {{ character.name }}
                </h4>
              </div>

              <!-- Character attributes -->
              <div class="flex flex-wrap items-center gap-2">
                <span class="badge badge-sm badge-primary">
                  {{ character?.weapon_type_id?.name }}
                </span>

                <span class="badge badge-sm badge-primary">
                  {{ character?.role }}
                </span>

                <span class="badge badge-sm badge-primary">
                  {{ character?.main_stat }}
                </span>
              </div>
            </div>
          </div>
        </NuxtLink>
      </template>

      <div
        v-else
        class="md:col-span-4 flex flex-col items-center justify-center text-center gap-3 py-24 border border-dashed border-white/25 rounded-lg"
      >
        <svg
          class="h-10 w-10 opacity-40"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <h3 class="text-lg font-semibold">No characters found</h3>
        <p class="text-sm opacity-70">
          {{
            hasActiveFilters
              ? "No characters match your current search or filters."
              : "There are no playable characters yet."
          }}
        </p>
        <button class="btn btn-primary btn-sm" @click="resetFilters">
          Clear filters
        </button>
      </div>
    </section>
  </article>
</template>

<script setup>
const supabase = useSupabaseClient();

const visions = ref([
  { id: 1, name: "Pyro" },
  { id: 2, name: "Hydro" },
  { id: 3, name: "Dendro" },
  { id: 4, name: "Electro" },
  { id: 5, name: "Anemo" },
  { id: 6, name: "Cryo" },
  { id: 7, name: "Geo" },
]);

const weapon_types = ref([
  { id: 1, name: "Sword" },
  { id: 2, name: "Claymore" },
  { id: 3, name: "Bow" },
  { id: 4, name: "Catalyst" },
  { id: 5, name: "Polearm" },
]);

const filters = reactive({
  rarity: "",
  vision: "",
  weapon_type: "",
});

const {
  data: characters,
  pending,
  error,
} = useAsyncData("characters", async () => {
  const { data, error } = await supabase
    .schema("genshin_impact")
    .from("characters")
    .select("*, vision_id(*), weapon_type_id(*)")
    .order("release_date", { ascending: false });

  if (error) throw error;
  return data;
});

const filteredCharacters = computed(() => {
  return (characters.value ?? []).filter((character) => {
    if (filters.rarity && String(character.rarity) !== filters.rarity)
      return false;
    if (filters.vision && character.vision_id?.id !== Number(filters.vision))
      return false;
    if (
      filters.weapon_type &&
      character.weapon_type_id?.id !== Number(filters.weapon_type)
    )
      return false;
    return true;
  });
});

const upcomingCharacters = computed(() =>
  characters.value.filter((character) => character.is_upcoming),
);

const playableCharacters = computed(() =>
  filteredCharacters.value.filter((character) => !character.is_upcoming),
);

function resetFilters() {
  filters.rarity = "";
  filters.vision = "";
  filters.weapon_type = "";
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-panel,
.modal-leave-active .modal-panel {
  transition: transform 0.2s ease;
}
.modal-enter-from .modal-panel,
.modal-leave-to .modal-panel {
  transform: scale(0.95) translateY(8px);
}
</style>
