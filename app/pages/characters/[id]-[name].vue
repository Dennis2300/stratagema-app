<template>
  <div
    v-if="pending"
    class="h-[75vh] w-full flex flex-col justify-center items-center gap-2"
  >
    <h1>Fetching character</h1>
    <span class="loading loading-bars loading-xl"></span>
  </div>

  <div
    v-if="error"
    class="h-[75vh] w-full flex flex-col justify-center items-center gap-2"
  >
    <img
      src="https://act-upload.hoyoverse.com/event-ugc-hoyowiki/2025/03/03/151578876/8f1b87b2e1899d656e0619748895bd8b_5458940438354931341.png?x-oss-process=image%2Fformat%2Cwebp"
      alt=""
    />
    <h1>Something went wrong</h1>
    <p class="text-red-700">{{ error.message }}</p>
  </div>

  <article class="relative space-y-8">
    <section class="flex flex-col md:flex-row">
      <figure class="flex flex-col md:flex-row flex-2 items-center gap-4">
        <img
          class="w-32 h-32 rounded-2xl"
          :class="{
            'rarity-5': character.rarity === 5,
            'rarity-4': character.rarity === 4,
          }"
          :src="character.img_url"
          alt=""
        />
        <figcaption class="text-center md:text-start">
          <h1>{{ character.name }}</h1>
          <div class="leading-none text-yellow-600">
            <span v-for="n in character.rarity">★</span>
          </div>
          <div class="flex items-center gap-2 my-2">
            <span
              class="bg-zinc-700 px-2.5 py-1.5 text-xs border border-white/25 rounded-lg"
              >{{ character.vision_id.name }}</span
            >
            <span
              class="bg-zinc-700 px-2.5 py-1.5 text-xs border border-white/25 rounded-lg"
              >{{ character.weapon_type_id.name }}</span
            >
            <span
              class="bg-zinc-700 px-2.5 py-1.5 text-xs border border-white/25 rounded-lg"
              >{{ character.role }}</span
            >
            <span
              class="bg-zinc-700 px-2.5 py-1.5 text-xs border border-white/25 rounded-lg"
              >{{ character.main_stat }}</span
            >
          </div>
        </figcaption>
      </figure>
      <div class="flex-1 flex flex-col justify-center">
        <div class="flex items-center gap-3">
          <div class="h-9 w-1 rounded-full bg-primary"></div>
          <h2>Voice Actor's</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2">
          <p>Placeholder</p>
          <p>Placeholder</p>
          <p>Placeholder</p>
          <p>Placeholder</p>
        </div>
      </div>
    </section>

    <CharacterDossier :character="character" />

    <CharacterBestWeapons id="weapons" :weapons="character?.weapons" />

    <CharacterBestArtifacts id="artifacts" />

    <section
      class="flex-2 h-fit bg-base-200 px-6 py-5 border border-white/25 rounded-lg"
    >
      <div class="flex items-center gap-3 mb-4">
        <div class="h-9 w-1 rounded-full bg-primary"></div>
        <h2>Best Builds</h2>
      </div>
    </section>

    <section
      class="flex-2 h-fit bg-base-200 px-6 py-5 border border-white/25 rounded-lg"
    >
      <div class="flex items-center gap-3 mb-4">
        <div class="h-9 w-1 rounded-full bg-primary"></div>
        <h2>Team Comps</h2>
      </div>
    </section>

    <section
      class="flex-2 h-fit bg-base-200 px-6 py-5 border border-white/25 rounded-lg"
    >
      <div class="flex items-center gap-3 mb-4">
        <div class="h-9 w-1 rounded-full bg-primary"></div>
        <h2>Materials</h2>
      </div>
    </section>

    <CharacterTableOfContent />
  </article>
</template>

<script setup>
const supabase = useSupabaseClient();
const route = useRoute();

const character_id = route.params.id;
const character_name = route.params.name;

const {
  data: character,
  pending,
  error,
} = useAsyncData(`character-${character_name}`, async () => {
  const { data, error } = await supabase
    .schema("genshin_impact")
    .from("characters")
    .select(
      "*, vision_id(*), weapon_type_id(*), weapons:character_weapon(id, weapon_id(*, weapon_type_id(name)), rank, details)",
    )
    .eq("id", character_id)
    .single();
  if (error) throw error;
  console.log(data);

  return data;
});
</script>
