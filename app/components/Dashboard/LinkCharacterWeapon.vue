<template>
  <article class="bg-zinc-700 my-4 p-4 rounded-2xl space-y-4">
    <h2>Link Weapon To a Character</h2>
    <div class="flex justify-between items-center gap-2">
      <select class="select" v-model="selectedCharacter">
        <option :value="null" selected disabled>Select Character</option>
        <option
          v-for="character in characters"
          :key="character.id"
          :value="character.id"
        >
          {{ character.name }}
        </option>
      </select>

      <select
        class="select"
        v-model="selectedWeapon"
        :disabled="!selectedCharacter"
      >
        <option :value="null" selected disabled>Select Weapon</option>
        <option
          v-for="weapon in filteredWeapons"
          :key="weapon.id"
          :value="weapon.id"
        >
          {{ weapon.name }}
        </option>
      </select>

      <select class="select" v-model="selectedRank">
        <option :value="null" selected disabled>Select Rank</option>
        <option value="1">1st</option>
        <option value="2">2nd</option>
        <option value="3">3rd</option>
        <option value="4">4th</option>
        <option value="5">5th</option>
      </select>
    </div>

    <textarea
      class="textarea w-full h-50"
      v-model="details"
      placeholder="Details (optional)"
    ></textarea>

    <div class="flex justify-center items-center">
      <button
        class="btn btn-success"
        :disabled="!canLink || linking"
        @click="handleLink"
      >
        {{ linking ? "Linking..." : "Link" }}
      </button>
    </div>

    <p v-if="linkError" class="text-error text-sm">{{ linkError }}</p>
    <p
      v-if="selectedCharacter && !filteredWeapons.length && !weaponsLoading"
      class="text-sm text-zinc-400"
    >
      No weapons found for this character's weapon type.
    </p>

    <div class="min-h-50 space-y-4">
      <div v-if="!selectedCharacter" class="text-sm text-zinc-400">
        Select a character to see their linked weapons.
      </div>

      <div v-else-if="linksPending" class="text-sm text-zinc-400">
        Loading...
      </div>

      <div v-else-if="!characterWeapons?.length" class="text-sm text-zinc-400">
        No weapons linked yet.
      </div>

      <div
        v-for="link in characterWeapons"
        :key="link.id"
        class="bg-base-100 w-1/2 p-2 rounded-lg space-y-1"
      >
        <div class="flex justify-between">
          <span>{{ link.weapons?.name }}</span>
          <span>{{ link.rank }}</span>
        </div>
        <p v-if="link.details" class="text-sm text-zinc-400">
          {{ link.details }}
        </p>
      </div>
    </div>
  </article>
</template>

<script setup>
const supabase = useSupabaseClient();

const selectedCharacter = ref(null);
const selectedWeapon = ref(null);
const selectedRank = ref(null);
const details = ref("");

const linking = ref(false);
const linkError = ref(null);

const {
  data: characters,
  pending: charactersLoading,
  error: charactersError,
} = useAsyncData("select_characters_array", async () => {
  const { data, error } = await supabase
    .schema("genshin_impact")
    .from("characters")
    .select("id, name, weapon_type_id(id)")
    .order("name", { ascending: true });
  if (error) throw error;
  return data;
});

const {
  data: weapons,
  pending: weaponsLoading,
  error: weaponsError,
} = useAsyncData("select_weapons_array", async () => {
  const { data, error } = await supabase
    .schema("genshin_impact")
    .from("weapons")
    .select("id, name, weapon_type_id")
    .order("name", { ascending: true });
  if (error) throw error;
  return data;
});

// The character's allowed weapon type
const selectedCharacterWeaponType = computed(() => {
  const character = characters.value?.find(
    (c) => c.id === selectedCharacter.value,
  );
  return character?.weapon_type_id?.id ?? null;
});

// Only weapons matching that type
const filteredWeapons = computed(() => {
  if (!weapons.value || !selectedCharacterWeaponType.value) return [];
  return weapons.value.filter(
    (w) => w.weapon_type_id === selectedCharacterWeaponType.value,
  );
});

// Reset weapon selection whenever the character (and thus allowed type) changes
watch(selectedCharacter, () => {
  selectedWeapon.value = null;
});

// Fetch weapons already linked to the selected character
const {
  data: characterWeapons,
  pending: linksPending,
  error: linksError,
  refresh: refreshLinks,
} = useAsyncData(
  "select_character_weapons",
  async () => {
    if (!selectedCharacter.value) return [];
    const { data, error } = await supabase
      .schema("genshin_impact")
      .from("character_weapon")
      .select("id, rank, details, weapons ( id, name )")
      .eq("character_id", selectedCharacter.value)
      .order("rank", { ascending: true });
    if (error) throw error;
    return data;
  },
  { watch: [selectedCharacter] },
);

const canLink = computed(
  () =>
    !!selectedCharacter.value && !!selectedWeapon.value && !!selectedRank.value,
);

async function handleLink() {
  if (!canLink.value) return;

  linking.value = true;
  linkError.value = null;

  try {
    const { error } = await supabase
      .schema("genshin_impact")
      .from("character_weapon")
      .insert({
        character_id: selectedCharacter.value,
        weapon_id: selectedWeapon.value,
        rank: Number(selectedRank.value),
        details: details.value.trim() || null,
      });

    if (error) throw error;

    selectedWeapon.value = null;
    selectedRank.value = null;
    details.value = "";

    await refreshLinks();
  } catch (err) {
    linkError.value = err.message ?? "Failed to link weapon.";
  } finally {
    linking.value = false;
  }
}
</script>
