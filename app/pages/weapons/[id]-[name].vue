<template>
  <article v-if="weapon" class="max-w-7xl mx-auto pt-24 space-y-6">
    <section class="bg-base-200 p-4 rounded-lg border border-white/25">
      <figure class="flex items-center gap-4">
        <img
          class="w-16 h-16 md:w-32 md:h-32 mask mask-squircle"
          :class="`rarity-${weapon.rarity}`"
          :src="weapon.img_url"
          :alt="weapon.name"
        />
        <figcaption>
          <h1 class="mb-2 mt-1">{{ weapon.name }}</h1>
          <p class="text-xs text-white/50">{{ weapon.description }}</p>
        </figcaption>
      </figure>
      <h4 class="divider mb-0"></h4>
      <div class="text-center">
        <p class="badge badge-xs badge-primary">Level 90</p>
      </div>

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

    <section class="bg-base-200 p-4 rounded-lg border border-white/25">
      <div class="flex items-center gap-2">
        <div class="h-9 w-1 rounded-full bg-white"></div>
        <h3>Weapon Passive</h3>
      </div>
      <div class="divider my-1"></div>
      <p class="text-white/75">{{ weapon.ability }}</p>
    </section>

    <section class="bg-base-200 p-4 rounded-lg border border-white/25">
      <div class="flex items-center gap-2">
        <div class="h-9 w-1 rounded-full bg-white"></div>
        <h3>Character(s) using this</h3>
      </div>
      <div class="divider my-1"></div>
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
