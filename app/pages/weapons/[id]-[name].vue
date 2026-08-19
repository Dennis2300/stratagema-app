<template>
  <div v-if="weaponLoading" class="flex justify-center items-center h-[80vh]">
    <span class="loading loading-spinner loading-xl"></span>
  </div>

  <div v-else-if="weaponError">
    <ErrorMessage :error="error" />
  </div>

  <article
    v-else-if="weapon"
    class="mx-auto w-full max-w-4xl space-y-4 sm:space-y-6 px-4 md:px-0"
  >
    <section
      class="rounded-xl border border-base-content/25 bg-base-300 p-4 sm:p-6"
    >
      <figure
        class="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-5"
      >
        <img
          class="h-28 w-28 shrink-0 rounded-xl object-cover sm:h-32 sm:w-32"
          :class="{
            'rarity-5': weapon.rarity === 5,
            'rarity-4': weapon.rarity === 4,
            'rarity-3': weapon.rarity === 3,
          }"
          :src="weapon.img_url"
          :alt="weapon.name"
        />

        <figcaption class="min-w-0 w-full text-center sm:text-left">
          <h1
            class="wrap-break-words text-2xl font-bold tracking-tight sm:text-3xl"
          >
            {{ weapon.name }}
          </h1>

          <div
            class="mt-1 mb-2 flex justify-center gap-0.5 text-sm text-yellow-500 sm:justify-start"
          >
            <span v-for="n in weapon.rarity" :key="n">★</span>
          </div>

          <p class="text-sm leading-relaxed text-base-content/80 sm:max-w-2xl">
            {{ weapon.description }}
          </p>
        </figcaption>
      </figure>
    </section>

    <section
      class="rounded-xl border border-base-content/25 bg-base-300 p-4 sm:p-6"
    >
      <div class="mb-3 flex items-center gap-3 sm:mb-4">
        <div class="h-7 w-1 rounded-full bg-primary sm:h-8"></div>

        <h2
          class="font-bold uppercase text-base-content tracking-wider sm:tracking-widest"
        >
          STATS
        </h2>
      </div>

      <div class="grid grid-cols-1 gap-3 xs:grid-cols-2 sm:grid-cols-3">
        <div class="stat min-w-0 rounded-xl bg-base-200 p-4">
          <div class="stat-title text-xs uppercase tracking-wider">Rarity</div>

          <div class="stat-value text-lg text-primary sm:text-xl">
            {{ weapon.rarity }} ★
          </div>
        </div>

        <div
          class="stat min-w-0 rounded-xl bg-base-200 p-4 xs:col-span-1 sm:col-span-2"
        >
          <div class="stat-title text-xs uppercase tracking-wider">
            Weapon Type
          </div>

          <div
            class="stat-value truncate text-lg sm:text-xl"
            :title="weapon.weapon_type_id.name"
          >
            {{ weapon.weapon_type_id.name }}
          </div>
        </div>

        <div class="stat min-w-0 rounded-xl bg-base-200 p-4">
          <div class="stat-title text-xs uppercase tracking-wider">
            Base ATK
          </div>

          <div class="stat-value text-lg sm:text-xl">
            {{ weapon.base_atk }}
          </div>
        </div>

        <div class="stat min-w-0 rounded-xl bg-base-200 p-4">
          <div class="stat-title text-xs uppercase tracking-wider">
            Secondary Stat
          </div>

          <div class="stat-value truncate text-lg sm:text-xl">
            {{ weapon.stat }}
          </div>
        </div>

        <div class="stat min-w-0 rounded-xl bg-base-200 p-4">
          <div class="stat-title text-xs uppercase tracking-wider">
            Stat Value
          </div>

          <div class="stat-value text-lg text-primary sm:text-xl">
            {{ weapon.stat_value }}
          </div>
        </div>
      </div>
    </section>

    <section
      class="rounded-xl border border-base-content/25 bg-base-300 p-4 sm:p-6"
    >
      <div class="mb-3 flex items-center gap-3 sm:mb-4">
        <div class="h-7 w-1 rounded-full bg-primary sm:h-8"></div>

        <h2
          class="font-bold uppercase text-base-content tracking-wider sm:tracking-widest"
        >
          Passive
        </h2>
      </div>

      <p
        class="rounded-xl bg-base-200 p-4 text-sm leading-relaxed sm:p-5 sm:text-base"
      >
        {{ weapon.ability }}
      </p>
    </section>

    <section
      class="rounded-xl border border-base-content/25 bg-base-300 p-4 sm:p-6"
    >
      <div class="mb-3 flex items-center gap-3 sm:mb-4">
        <div class="h-7 w-1 rounded-full bg-primary sm:h-8"></div>

        <h2
          class="font-bold uppercase text-base-content tracking-wider sm:tracking-widest"
        >
          Suitable Characters
        </h2>
      </div>
      <NuxtLink
        v-for="c in relatedCharacters"
        :key="c.character.id"
        :to="`/characters/${c.character.id}-${slugify(c.character.name)}`"
        class="group relative flex justify-start items-center"
      >
        <img
          class="w-16 h-16 rounded-2xl transition-transform duration-200 group-hover:scale-105"
          :class="{
            'rarity-5': c.character.rarity === 5,
            'rarity-4': c.character.rarity === 4,
          }"
          :src="c.character.img_url"
          :alt="c.character.name"
        />

        <p
          class="absolute top-full mt-2 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none z-10"
        >
          {{ c.character.name }}
        </p>
      </NuxtLink>
    </section>
  </article>

  <div v-else>
    <p class="text-center">Something went wrong</p>
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
