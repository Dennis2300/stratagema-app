<template>
  <header class="max-w-7xl mx-auto pt-24 px-4 md:px-0">
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
  </header>

  <div v-if="pending" class="h-100 flex justify-center items-center">
    <div class="loader"></div>
  </div>

  <div v-else-if="error" class="h-100 flex justify-center items-center">
    <ErrorMessage :error="error" />
  </div>

  <article v-else-if="characters" class="max-w-7xl mx-auto px-4 md:px-0 mb-16">
    <section v-if="upcomingCharacters.length">
      <div class="flex items-center gap-3 mt-6 mb-2">
        <div class="w-1 rounded-full h-9 bg-primary"></div>
        <h2 class="">Upcoming</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <NuxtLink
          v-for="character in upcomingCharacters"
          :key="character.id"
          :to="`/characters/${character.id}-${slugify(character.name)}`"
          class="bg-base-300 p-4 rounded-lg group border border-white/25 hover:border-white/50 hover:bg-base-200 transition duration-300"
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
      </div>
    </section>

    <section v-if="characters">
      <div class="flex justify-between items-center mt-6 mb-2">
        <div class="flex items-center gap-3">
          <div class="w-1 rounded-full h-9 bg-primary"></div>
          <h2 class="">Playable Characters</h2>
        </div>
        <div class="flex items-center gap-4">
          <label class="input">
            <svg
              class="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              v-model="search"
              type="search"
              required
              placeholder="Search..."
            />
          </label>
          <button
            class="btn btn-primary"
            :class="{ 'btn-active': showFilters }"
            :aria-expanded="showFilters"
            @click="showFilters = !showFilters"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-funnel-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5z"
              />
            </svg>
            Filters
            <span v-if="activeFilterCount" class="badge badge-sm">{{
              activeFilterCount
            }}</span>
          </button>
        </div>
      </div>

      <Teleport to="body">
        <Transition name="modal">
          <div
            v-if="showFilters"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            @click.self="showFilters = false"
          >
            <div
              class="modal-panel bg-base-300 border border-white/25 rounded-lg w-2xl h-auto overflow-y-auto p-6"
              role="dialog"
              aria-modal="true"
              aria-label="Filters"
            >
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold">Filters</h3>
                <button
                  class="btn btn-ghost btn-sm btn-circle"
                  aria-label="Close filters"
                  @click="showFilters = false"
                >
                  ✕
                </button>
              </div>

              <!-- Filter controls will go here -->
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <h4>Vision</h4>
                  <div class="flex flex-col gap-2">
                    <label class="label" v-for="vision in visions">
                      <input
                        v-model="selectedVisions"
                        :value="vision.name"
                        type="checkbox"
                        class="checkbox"
                      />
                      {{ vision.name }}
                    </label>
                  </div>
                </div>

                <div>
                  <h4>Weapon Type</h4>
                  <div class="flex flex-col gap-2">
                    <label class="label" v-for="weapon_type in weapon_types">
                      <input
                        v-model="selectedWeapons"
                        :value="weapon_type.name"
                        type="checkbox"
                        class="checkbox"
                      />
                      {{ weapon_type.name }}
                    </label>
                  </div>
                </div>

                <div>
                  <h4>Team Role</h4>
                  <div class="flex flex-col gap-2">
                    <label class="label" v-for="role in roles">
                      <input
                        v-model="selectedRoles"
                        :value="role.name"
                        type="checkbox"
                        class="checkbox"
                      />
                      {{ role.name }}
                    </label>
                  </div>
                </div>

                <div>
                  <h4>Rarity</h4>
                  <div class="flex flex-col gap-2">
                    <label class="label">
                      <input
                        v-model="selectedRarities"
                        value="5"
                        type="checkbox"
                        class="checkbox"
                      />
                      <div>
                        <span
                          class="text-yellow-500 leading-none"
                          v-for="i in 5"
                          :key="i"
                          >★</span
                        >
                      </div>
                    </label>
                    <label class="label">
                      <input
                        v-model="selectedRarities"
                        value="4"
                        type="checkbox"
                        class="checkbox"
                      />
                      <div>
                        <span
                          class="text-yellow-500 leading-none"
                          v-for="i in 4"
                          :key="i"
                          >★</span
                        >
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div class="flex justify-end gap-2 mt-6">
                <button
                  class="btn btn-ghost"
                  :disabled="!activeFilterCount"
                  @click="clearFilters"
                >
                  Clear
                </button>
                <button class="btn btn-error" @click="showFilters = false">
                  Close
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>

      <div
        v-if="filteredPlayableCharacters.length"
        class="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <NuxtLink
          v-for="character in filteredPlayableCharacters"
          :key="character.id"
          :to="`/characters/${character.id}-${slugify(character.name)}`"
          class="relative overflow-hidden rounded-lg h-100 bg-base-300 group hover:cursor-pointer"
        >
          <!-- Background image -->
          <div
            class="absolute inset-0 z-0 transition duration-200 opacity-25 group-hover:opacity-80"
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
                <span class="badge badge-xs badge-neutral">
                  {{ character?.weapon_type_id?.name }}
                </span>

                <span class="badge badge-xs badge-neutral">
                  {{ character?.main_stat }}
                </span>

                <span class="badge badge-xs badge-neutral">
                  {{ character?.role }}
                </span>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <div
        v-else
        class="flex flex-col items-center justify-center text-center gap-3 py-24 border border-dashed border-white/25 rounded-lg"
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
        <button
          v-if="hasActiveFilters"
          class="btn btn-primary btn-sm"
          @click="resetAll"
        >
          Clear search & filters
        </button>
      </div>
    </section>
  </article>
</template>

<script setup>
const supabase = useSupabaseClient();
const route = useRoute();
const router = useRouter();

const showFilters = ref(false);

const search = computed({
  get: () => route.query.q ?? "",
  set: (val) => {
    router.replace({ query: { ...route.query, q: val || undefined } });
  },
});

const visions = [
  { name: "Anemo" },
  { name: "Geo" },
  { name: "Electro" },
  { name: "Dendro" },
  { name: "Hydro" },
  { name: "Pyro" },
  { name: "Cryo" },
];

const weapon_types = [
  { name: "Sword" },
  { name: "Claymore" },
  { name: "Polearm" },
  { name: "Catalyst" },
  { name: "Bow" },
];

const roles = [
  { name: "DPS" },
  { name: "Sub-DPS" },
  { name: "Support" },
  { name: "Shielder" },
  { name: "Healer" },
];

function onKeydown(e) {
  if (e.key === "Escape") showFilters.value = false;
}

function toArray(value) {
  if (!value) return [];
  return (Array.isArray(value) ? value : [value])
    .flatMap((v) => String(v).split(","))
    .filter(Boolean);
}

function useQueryArray(key) {
  return computed({
    get: () => toArray(route.query[key]),
    set: (val) => {
      router.replace({
        query: {
          ...route.query,
          [key]: val.length ? val.join(",") : undefined,
        },
      });
    },
  });
}

function clearFilters() {
  router.replace({
    query: {
      ...route.query,
      vision: undefined,
      weapon: undefined,
      role: undefined,
      rarity: undefined,
    },
  });
}

function resetAll() {
  router.replace({ query: {} });
}

const selectedVisions = useQueryArray("vision");
const selectedWeapons = useQueryArray("weapon");
const selectedRoles = useQueryArray("role");
const selectedRarities = useQueryArray("rarity");
const activeFilterCount = computed(
  () =>
    selectedVisions.value.length +
    selectedWeapons.value.length +
    selectedRoles.value.length +
    selectedRarities.value.length,
);

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

const upcomingCharacters = computed(() =>
  (characters.value ?? []).filter((character) => character.is_upcoming),
);

const playableCharacters = computed(() =>
  (characters.value ?? []).filter((character) => !character.is_upcoming),
);

const filteredPlayableCharacters = computed(() => {
  const query = search.value.toLowerCase().trim();

  return playableCharacters.value.filter((c) => {
    if (query && !c.name.toLowerCase().startsWith(query)) return false;

    if (
      selectedVisions.value.length &&
      !selectedVisions.value.includes(c.vision_id?.name)
    )
      return false;

    if (
      selectedWeapons.value.length &&
      !selectedWeapons.value.includes(c.weapon_type_id?.name)
    )
      return false;

    if (selectedRoles.value.length && !selectedRoles.value.includes(c.role))
      return false;

    if (
      selectedRarities.value.length &&
      !selectedRarities.value.includes(String(c.rarity))
    )
      return false;

    return true;
  });
});

const hasActiveFilters = computed(
  () => activeFilterCount.value > 0 || search.value.trim() !== "",
);

onMounted(() => window.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown);
  document.body.style.overflow = "";
});

watch(showFilters, (open) => {
  document.body.style.overflow = open ? "hidden" : "";
});
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
