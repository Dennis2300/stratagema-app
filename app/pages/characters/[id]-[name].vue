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
    <CharacterHeader :character="character" />

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
