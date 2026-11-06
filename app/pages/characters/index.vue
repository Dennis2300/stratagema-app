<template>
  <Navbar class="fixed top-0 z-50" />

  <figure
    class="relative max-w-7xl mx-auto h-48 overflow-hidden mt-24 border border-white/25 rounded-lg"
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

  <div v-if="pending" class="flex justify-center items-center h-100">
    <div class="loader"></div>
  </div>

  <div v-else-if="error" class="mt-12">
    <ErrorMessage :error="error" />
  </div>

  <article v-else-if="characters" class="max-w-7xl mx-auto mb-24">
    <section v-if="upcomingCharacters.length" class="my-4">
      <div class="flex items-center gap-3 my-6">
        <div class="w-1 rounded-full h-9 bg-primary"></div>
        <h3 class="">Upcoming</h3>
      </div>
      <div class="grid grid-cols-4 gap-4">
        <NuxtLink
          v-for="character in upcomingCharacters"
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
    </section>

    <section v-if="characters" class="">
      <div class="flex items-center gap-3 mt-4">
        <div class="w-1 rounded-full h-9 bg-primary"></div>
        <h3 class="font-bold">Playable Characters</h3>
      </div>

      <label class="input mt-2 mb-6">
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

      <div class="grid grid-cols-4 gap-4">
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
    </section>
  </article>

  <div v-else>
    <EmptyFallback />
  </div>
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
