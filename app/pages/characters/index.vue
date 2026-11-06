<template>
  <Navbar class="fixed top-0 z-50" />

  <article class="px-4 py-20 mx-auto max-w-7xl md:py-24 md:px-0">
    <figure
      class="relative w-full h-48 overflow-hidden border-2 rounded-2xl border-white/25"
    >
      <img
        class="object-cover object-center w-full h-full"
        src="https://act-upload.hoyoverse.com/event-ugc-hoyowiki/2024/10/23/237301566/bf8ee46d2caba6d5928fbe7b125d37c4_8565732607361309926.png?x-oss-process=image%2Fformat%2Cwebp"
        alt=""
      />
      <div class="absolute top-0 left-0 w-full h-full bg-black/75"></div>
      <figcaption
        class="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full text-center"
      >
        <h1>Characters Archive</h1>
        <p class="text-xs md:text-base">
          Here you can find all playable and upcoming playable characters
        </p>
      </figcaption>
    </figure>

    <section v-if="upcomingCharacters.length">
      <div class="flex items-center gap-3 my-6">
        <div class="w-1 rounded-full h-7 bg-primary"></div>
        <h3 class="font-bold">Upcoming Character(s)</h3>
      </div>
      <div class="grid grid-cols-1 gap-4 px-2 md:grid-cols-3">
        <NuxtLink
          v-for="character in upcomingCharacters"
          :key="character.id"
          :to="`/characters/${character.id}-${slugify(character.name)}`"
          class="relative group bg-base-300 p-4 rounded-xl hover:bg-zinc-800 hover:-translate-y-0.5 transition duration-300"
        >
          <figure class="flex items-center gap-3">
            <div class="relative w-24 h-24 shrink-0">
              <img
                class="object-cover w-full h-full rounded-2xl"
                :class="{
                  'rarity-5': character.rarity === 5,
                  'rarity-4': character.rarity === 4,
                }"
                :src="character.img_url"
                :alt="character.name"
                loading="lazy"
              />
              <img
                class="absolute -top-2.5 -right-2.5 w-8 h-8 bg-gray-800 border border-white/33 rounded-full"
                :src="character.vision_id.img_url"
                alt=""
              />
            </div>
            <figcaption>
              <h4 class="truncate max-w-32">{{ character.name }}</h4>
              <div class="leading-none text-yellow-600">
                <span v-for="n in character.rarity" :key="n">★</span>
              </div>
            </figcaption>
          </figure>
        </NuxtLink>
      </div>
    </section>

    <div class="mt-4 mb-8">
      <div class="flex items-center gap-3">
        <div class="w-1 rounded-full h-7 bg-primary"></div>
        <h3 class="font-bold">Playable Characters</h3>
      </div>
      <label class="mt-3 input">
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
    </div>

    <section class="min-h-screen">
      <div v-if="pending" class="py-6 text-center">
        <span class="loading loading-spinner loading-xl"></span>
      </div>

      <div v-else-if="error">
        <ErrorMessage :error="error" />
      </div>

      <div v-else-if="characters" class="grid grid-cols-1 gap-3 md:grid-cols-4">
        <NuxtLink
          :to="`/characters/${character.id}-${slugify(character.name)}`"
          v-for="character in filteredPlayableCharacters"
          :key="character.id"
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

      <div v-else>
        <EmptyFallback />
      </div>
    </section>
  </article>
</template>

<script setup>
const supabase = useSupabaseClient();
const search = ref("");

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

  if (!query) return playableCharacters.value;

  return playableCharacters.value.filter((character) =>
    character.name.toLowerCase().startsWith(query),
  );
});
</script>
