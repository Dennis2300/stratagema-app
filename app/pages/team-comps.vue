<template>
  <header>
    <figure
      class="relative w-full h-48 overflow-hidden rounded-2xl border-2 border-white/25"
    >
      <img
        class="w-full h-full object-cover object-center"
        src="https://act-upload.hoyoverse.com/event-ugc-hoyowiki/2025/01/14/237301566/17a99dc92e113ac0eb8542099b12cdd0_7647289234785786678.png?x-oss-process=image%2Fformat%2Cwebp"
        alt=""
      />
      <div class="absolute top-0 left-0 w-full h-full bg-black/55"></div>
      <div
        class="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center"
      >
        <h1>Team Compositions</h1>
        <p>
          Here you can find all meta, funny or creative team compositions to try
        </p>
      </div>
    </figure>
  </header>
  <div class="divider"></div>
  <div v-if="pending" class="flex justify-center items-center h-100">
    <span class="loading scale-200"></span>
  </div>

  <div v-else-if="error">
    <ErrorMessage :error="error" />
  </div>

  <article v-else-if="teams" class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div
      v-for="team in teams"
      :key="team.id"
      class="card bg-base-300 p-4 shadow-xl border border-white/25"
    >
      <h4 class="text-center">{{ team.name }}</h4>
      <div class="flex justify-center items-center gap-2 mt-4">
        <img
          class="w-24 h-24 mask mask-squircle"
          :class="{
            'rarity-5': team.primary_character_id.rarity === 5,
            'rarity-4': team.primary_character_id.rarity === 4,
          }"
          :src="team.primary_character_id.img_url"
          :alt="team.primary_character_id.name"
        />
        <h3>{{ team.primary_character_id.name }}</h3>
      </div>
      <div class="divider"></div>
      <div class="flex justify-center items-center gap-6">
        <div
          v-for="member in team.members"
          :key="member.id"
          class="tooltip tooltip-bottom tooltip-primary hover:cursor-pointer"
          :data-tip="member.character.name"
        >
          <img
            class="h-16 w-16 mask mask-squircle"
            :class="{
              'rarity-5': member.character.rarity === 5,
              'rarity-4': member.character.rarity === 4,
            }"
            :src="member.character.img_url"
            :alt="member.character.name"
          />
        </div>
      </div>
    </div>
  </article>

  <div v-else>Something went wrong!</div>
</template>

<script setup>
const supabase = useSupabaseClient();

const {
  data: teams,
  pending,
  error,
} = useAsyncData("page:teams", async () => {
  const { data, error } = await supabase
    .schema("genshin_impact")
    .from("teams")
    .select(
      "*, primary_character_id(id, name, img_url, rarity), members:team_character(id, character:character_id(id, name, img_url, rarity), role, slot)",
    );
  if (error) throw error;
  return data;
});
</script>
