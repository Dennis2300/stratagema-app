<template>
  <header>
    <figure
      class="relative w-full h-48 overflow-hidden rounded-2xl border-2 border-white/25"
    >
      <img
        class="w-full h-full object-cover object-center"
        src="https://act-upload.hoyoverse.com/event-ugc-hoyowiki/2024/10/23/237301566/bf8ee46d2caba6d5928fbe7b125d37c4_8565732607361309926.png?x-oss-process=image%2Fformat%2Cwebp"
        alt=""
      />
      <div class="absolute top-0 left-0 w-full h-full bg-black/75"></div>
      <div
        class="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center"
      >
        <h1>Characters Archive</h1>
        <p>Here you can find all playable and upcoming playable characters</p>
      </div>
    </figure>
  </header>

  <article v-if="upcomingCharacters.length">
    <div class="my-6 flex items-center gap-3">
      <div class="h-7 w-1 rounded-full bg-primary"></div>
      <h2 class="text-2xl font-bold">Upcoming Character(s)</h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 px-2">
      <NuxtLink
        v-for="character in upcomingCharacters"
        :key="character.id"
        :to="`/characters/${character.id}-${slugify(character.name)}`"
        class="relative group bg-base-300 p-4 rounded-xl hover:bg-zinc-800 hover:-translate-y-0.5 transition duration-300"
      >
        <figure class="flex items-center gap-3">
          <div class="relative w-24 h-24 shrink-0">
            <img
              class="w-full h-full rounded-2xl object-cover"
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
  </article>

  <article class="min-h-screen">
    <div class="my-6">
      <div class="flex items-center gap-3">
        <div class="h-7 w-1 rounded-full bg-primary"></div>
        <h2 class="text-2xl font-bold">Playable Characters</h2>
      </div>
      <label class="input mt-3">
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

    <div v-if="pending" class="text-center py-6">
      <span class="loading loading-spinner loading-xl"></span>
    </div>

    <div v-else-if="error">
      <p>{{ error.message }}</p>
    </div>

    <div
      v-else-if="characters.length"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2"
    >
      <NuxtLink
        v-for="character in filteredPlayableCharacters"
        :key="character.id"
        :to="`/characters/${character.id}-${slugify(character.name)}`"
        class="relative group bg-base-300 p-4 rounded-xl hover:bg-zinc-800 hover:-translate-y-0.5 transition duration-300"
      >
        <figure class="flex justify-between">
          <figure class="flex items-center gap-3">
            <div class="relative w-24 h-24 shrink-0">
              <img
                class="w-full h-full rounded-2xl object-cover"
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
                loading="lazy"
              />
            </div>
            <figcaption>
              <h4 class="truncate max-w-36">{{ character.name }}</h4>
              <div class="leading-none text-yellow-600">
                <span v-for="n in character.rarity" :key="n">★</span>
              </div>
            </figcaption>
          </figure>
          <img
            class="h-24 w-auto opacity-50 group-hover:opacity-100 transition duration-300"
            :src="character.splash_art_url"
            :alt="character.name"
            loading="lazy"
          />
        </figure>

        <div class="grid grid-cols-3 gap-1 mt-3 text-center text-sm">
          <span class="truncate bg-zinc-700 rounded-md py-1 px-1">{{
            character?.weapon_type_id?.name
          }}</span>
          <span class="truncate bg-zinc-700 rounded-md py-1 px-2">{{
            character?.main_stat
          }}</span>
          <span class="truncate bg-zinc-700 rounded-md py-1 px-1">{{
            character?.role
          }}</span>
        </div>

        <span
          v-if="character.is_new"
          class="absolute -top-3 -left-3 badge badge-info badge-sm"
          >New!</span
        >
      </NuxtLink>
    </div>

    <div v-else>Empty Fallback</div>
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
