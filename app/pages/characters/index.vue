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
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div
        v-for="character in upcomingCharacters"
        :key="character.id"
        class="relative bg-base-300 p-4 rounded-xl"
      >
        <figure class="relative flex gap-3">
          <img
            class="w-24 h-24 rounded-2xl"
            :class="{
              'rarity-5': character.rarity === 5,
              'rarity-4': character.rarity === 4,
            }"
            :src="character.img_url"
            :alt="character.name"
          />
          <figcaption class="flex flex-col justify-center">
            <h3 class="w-full">{{ character.name }}</h3>
            <div class="leading-none text-yellow-600">
              <span v-for="n in character.rarity">★</span>
            </div>
            <div class="w-full flex items-center gap-2 mt-2">
              <div class="text-xs bg-secondary p-2 rounded-lg">
                {{ character?.weapon_type_id?.name }}
              </div>
              <div class="text-xs bg-accent p-2 rounded-md truncate max-w-28">
                {{ character?.main_stat }}
              </div>
              <div
                class="text-xs p-2 rounded-lg truncate max-w-24"
                :class="roleColors[character?.role] || 'bg-accent'"
              >
                {{ character?.role }}
              </div>
            </div>
          </figcaption>
          <img
            class="absolute -top-2.5 -left-2.5 w-8 h-8 bg-gray-800 border border-white/33 rounded-full"
            :src="character.vision_id.img_url"
            alt=""
          />
        </figure>
        <p class="absolute top-2 right-3 text-xs text-white/25">
          #{{ character.id }}
        </p>
      </div>
    </div>
  </article>

  <article>
    <div class="my-6 flex items-center gap-3">
      <div class="h-7 w-1 rounded-full bg-primary"></div>
      <h2 class="text-2xl font-bold">Playable Characters</h2>
    </div>

    <div v-if="pending" class="text-center py-6">
      <span class="loading loading-spinner loading-xl"></span>
    </div>

    <div v-else-if="error">
      <p>{{ error.message }}</p>
    </div>

    <div
      v-else-if="characters.length"
      class="grid grid-cols-2 md:grid-cols-3 gap-4"
    >
      <NuxtLink
        v-for="character in playableCharacters"
        :key="character.id"
        :to="`/characters/${character.id}-${slugify(character.name)}`"
        class="relative bg-base-300 p-4 rounded-xl"
      >
        <figure class="relative flex gap-3">
          <img
            class="w-24 h-24 rounded-2xl"
            :class="{
              'rarity-5': character.rarity === 5,
              'rarity-4': character.rarity === 4,
            }"
            :src="character.img_url"
            :alt="character.name"
          />
          <figcaption class="flex flex-col justify-center">
            <h3 class="w-full">
              {{ character.name }}
              <span v-if="character.is_new" class="badge badge-xs badge-info"
                >NEW!</span
              >
            </h3>
            <div class="leading-none text-yellow-600">
              <span v-for="n in character.rarity">★</span>
            </div>
            <div class="w-full flex items-center gap-2 mt-2">
              <span class="text-xs bg-secondary p-2 rounded-lg">
                {{ character?.weapon_type_id?.name }}
              </span>
              <span class="text-xs bg-accent p-2 rounded-lg truncate max-w-28">
                {{ character?.main_stat }}
              </span>
              <span
                class="text-xs p-2 rounded-lg truncate max-w-24"
                :class="roleColors[character?.role] || 'bg-accent'"
              >
                {{ character?.role }}
              </span>
            </div>
          </figcaption>
          <img
            class="absolute -top-2.5 -left-2.5 w-8 h-8 bg-gray-800 border border-white/33 rounded-full"
            :src="character.vision_id.img_url"
            alt=""
          />
        </figure>
        <p class="absolute top-2 right-3 text-xs text-white/25">
          #{{ character.id }}
        </p>
      </NuxtLink>
    </div>
    <div v-else>Empty Fallback</div>
  </article>
</template>

<script setup>
const supabase = useSupabaseClient();

const roleColors = {
  DPS: "bg-[#5c3038]",
  "Sub-DPS": "bg-[#5c4930]",
  Healer: "bg-[#315044]",
  Support: "bg-[#304653]",
  Shielder: "bg-[#443653]",
};

const {
  data: characters,
  pending,
  error,
} = useAsyncData("characters", async () => {
  const { data, error } = await supabase
    .schema("genshin_impact")
    .from("characters")
    .select("*, vision_id(*), weapon_type_id(*)")
    .order("id", { ascending: false });

  if (error) throw error;
  return data;
});

const upcomingCharacters = computed(() =>
  (characters.value ?? []).filter((character) => character.is_upcoming),
);

const playableCharacters = computed(() =>
  (characters.value ?? []).filter((character) => !character.is_upcoming),
);
</script>
