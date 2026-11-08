<template>
  <Navbar class="fixed top-0 z-50" />

  <div v-if="weaponLoading" class="h-screen flex justify-center items-center">
    <span class="loader"></span>
  </div>

  <div
    v-else-if="weaponError"
    class="h-screen flex justify-center items-center"
  >
    <ErrorMessage :error="weaponError" />
  </div>

  <article
    v-else-if="weapon"
    class="mx-auto min-h-screen w-full max-w-7xl space-y-8 mt-24"
  >
    <section class="bg-base-300 p-4 rounded-lg">
      <figure class="flex items-center gap-4">
        <img
          class="w-16 h-16 md:w-32 md:h-32 mask mask-squircle"
          :class="`rarity-${weapon.rarity}`"
          :src="weapon.img_url"
          :alt="weapon.name"
        />
        <figcaption>
          <h1 class="mb-2 mt-1">{{ weapon.name }}</h1>
        </figcaption>
      </figure>
      <div class="divider my-2"></div>
      <p class="text-sm text-white/50">{{ weapon.description }}</p>
    </section>

    <section class="bg-base-300 p-4 rounded-lg">
      <h4 class="divider divider-start">Weapon Stats</h4>
      <div class="stats stats-vertical lg:stats-horizontal shadow w-full">
        <div class="stat place-items-center">
          <div class="stat-title">Rarity</div>
          <div class="stat-value">
            {{ weapon.rarity }} <span class="text-yellow-500">★</span>
          </div>
        </div>

        <div class="stat place-items-center">
          <div class="stat-title">Weapon Type</div>
          <div class="stat-value">{{ weapon.weapon_type_id.name }}</div>
        </div>

        <div class="stat place-items-center">
          <div class="stat-title">Base Attack</div>
          <div class="stat-value">{{ weapon.base_atk }}</div>
        </div>

        <div class="stat place-items-center">
          <div class="stat-title">Secondary Stat</div>
          <div class="stat-value">{{ weapon.stat }}</div>
        </div>

        <div class="stat place-items-center">
          <div class="stat-title">Stat Value</div>
          <div class="stat-value">
            {{ weapon.stat_value
            }}{{ weapon.stat === "Elemental Mastery" ? "" : "%" }}
          </div>
        </div>
      </div>
    </section>

    <section class="bg-base-300 p-4 rounded-lg">
      <h4 class="divider divider-start">Weapon Passive</h4>
      <p>{{ weapon.ability }}</p>
    </section>

    <section class="bg-base-300 p-4 rounded-lg">
      <h4 class="divider divider-start">Suitable Character(s)</h4>
      <div class="flex flex-wrap gap-4">
        <NuxtLink
          v-for="c in relatedCharacters"
          :key="c.character.id"
          :to="`/characters/${c.character.id}-${slugify(c.character.name)}`"
          class="tooltip tooltip-bottom tooltip-primary"
          :data-tip="c.character.name"
        >
          <img
            class="w-16 h-16 rounded-lg"
            :class="`rarity-${c.character.rarity}`"
            :src="c.character.img_url"
            :alt="c.character.name"
          />
        </NuxtLink>
      </div>
    </section>
  </article>

  <div v-else class="h-screen flex justify-center items-center">
    <EmptyFallback />
  </div>
</template>

<script setup>
const supabase = useSupabaseClient();
const route = useRoute();

const weapon_id = route.params.id;
const weapon_name = route.params.name;

const {
  data: weapon,
  pending: weaponLoading,
  error: weaponError,
} = useAsyncData(`weapon-${weapon_id}-${weapon_name}`, async () => {
  const { data, error } = await supabase
    .schema("genshin_impact")
    .from("weapons")
    .select("*, weapon_type_id(name)")
    .eq("id", weapon_id)
    .single();
  if (error) throw error;
  return data;
});

const {
  data: relatedCharacters,
  pending: relatedCharactersLoading,
  error: relatedCharactersError,
} = useAsyncData(`characters-related-${weapon_id}-${weapon_name}`, async () => {
  const { data, error } = await supabase
    .schema("genshin_impact")
    .from("character_weapon")
    .select("character:character_id(id, name, img_url, rarity)")
    .eq("weapon_id", weapon_id);
  if (error) throw error;
  return data;
});
</script>
