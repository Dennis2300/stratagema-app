<template>
  <article class="bg-zinc-700 my-4 p-4 rounded-2xl space-y-4">
    <h2>Create character</h2>
    <section class="grid grid-cols-3 gap-x-3 gap-y-6">
      <div class="flex justify-center items-center">
        <input
          v-model="form.name"
          type="text"
          class="input"
          placeholder="Character Name"
        />
      </div>

      <div class="flex justify-center items-center">
        <input
          v-model="form.img_url"
          type="text"
          class="input"
          placeholder="Character avatar url"
        />
      </div>

      <div class="flex justify-center items-center">
        <input
          v-model="form.splash_art_url"
          type="text"
          class="input"
          placeholder="Character splash art url"
        />
      </div>

      <div class="flex justify-center items-center gap-4">
        <label class="btn btn-primary">
          <input
            v-model="form.rarity"
            type="radio"
            name="character_rating"
            :value="5"
            checked
          />
          5 star
        </label>

        <label class="btn btn-primary">
          <input v-model="form.rarity" type="radio" name="character_rating" :value="4" />
          4 star
        </label>
      </div>

      <div class="flex justify-center items-center">
        <input
          v-model="form.constellation"
          type="text"
          class="input"
          placeholder="Character Constellation"
        />
      </div>

      <div class="flex justify-center items-center">
        <input
          v-model="form.birthday"
          type="text"
          class="input"
          placeholder="Character Birthday"
        />
      </div>

      <div class="flex justify-center items-center">
        <select class="select" v-model="form.vision_id">
          <option :value="null" selected disabled>Select a vision</option>
          <option v-for="vision in visions" :key="vision.id" :value="vision.id">
            {{ vision.name }}
          </option>
        </select>
      </div>

      <div class="flex justify-center items-center">
        <select class="select" v-model="form.weapon_type_id">
          <option :value="null" selected disabled>Select a weapon type</option>
          <option
            v-for="weapon_type in weapon_types"
            :key="weapon_type.id"
            :value="weapon_type.id"
          >
            {{ weapon_type.name }}
          </option>
        </select>
      </div>

      <div class="flex justify-center items-center">
        <select class="select" v-model="form.main_stat">
          <option :value="null" selected disabled>Select a main stat</option>
          <option
            v-for="main_stat in main_stats"
            :key="main_stat.name"
            :value="main_stat.name"
          >
            {{ main_stat.name }}
          </option>
        </select>
      </div>

      <div class="flex justify-center items-center">
        <select class="select" v-model="form.role">
          <option :value="null" selected disabled>Select a role</option>
          <option v-for="role in roles" :key="role.name" :value="role.name">
            {{ role.name }}
          </option>
        </select>
      </div>

      <div class="flex justify-center items-center">
        <input type="date" class="input" v-model="form.release_date" />
      </div>

      <div class="flex justify-center items-center gap-4">
        <div class="flex items-center gap-2 bg-base-200 py-2 px-3 rounded-xl">
          <label>Is new?</label>
          <input type="checkbox" class="checkbox" v-model="form.is_new" />
        </div>

        <div class="flex items-center gap-2 bg-base-200 py-2 px-3 rounded-xl">
          <label>Is upcoming?</label>
          <input type="checkbox" class="checkbox" v-model="form.is_upcoming" />
        </div>
      </div>
    </section>
    <div class="flex justify-center items-center">
      <button
        type="button"
        class="btn btn-success"
        :disabled="submitting"
        @click="addCharacter"
      >
        {{ submitting ? "Adding..." : "Add Character" }}
      </button>
    </div>
    <p v-if="errorMsg" class="text-error text-sm text-center">{{ errorMsg }}</p>
  </article>
</template>

<script setup>
const supabase = useSupabaseClient();

const visions = ref([
  { id: 1, name: "Pyro" },
  { id: 2, name: "Hydro" },
  { id: 3, name: "Dendro" },
  { id: 4, name: "Electro" },
  { id: 5, name: "Anemo" },
  { id: 6, name: "Cryo" },
  { id: 7, name: "Geo" },
]);

const weapon_types = ref([
  { id: 1, name: "Sword" },
  { id: 2, name: "Claymore" },
  { id: 3, name: "Bow" },
  { id: 4, name: "Catalyst" },
  { id: 5, name: "Polearm" },
]);

const main_stats = ref([
  { name: "ATK" },
  { name: "ATK%" },
  { name: "DEF" },
  { name: "DEF%" },
  { name: "HP" },
  { name: "HP%" },
  { name: "Elemental Mastery" },
  { name: "Energy Recharge" },
  { name: "Healing Bonus" },
  { name: "CRIT Rate" },
  { name: "CRIT DMG" },
  { name: "Pyro DMG Bonus" },
  { name: "Anemo DMG Bonus" },
  { name: "Cryo DMG Bonus" },
  { name: "Hydro DMG Bonus" },
  { name: "Geo DMG Bonus" },
  { name: "Electro DMG Bonus" },
  { name: "Dendro DMG Bonus" },
  { name: "Physical DMG Bonus" },
  { name: "CRIT Rate/CRIT DMG" },
  { name: "EM" },
]);

const roles = ref([
  { name: "DPS" },
  { name: "Sub-DPS" },
  { name: "Healer" },
  { name: "Support" },
  { name: "Shielder" },
]);

const form = ref({
  name: "",
  img_url: "",
  splash_art_url: "",
  rarity: 5,
  constellation: "",
  birthday: "",
  vision_id: null,
  weapon_type_id: null,
  main_stat: null,
  role: null,
  is_new: false,
  is_upcoming: false,
  release_date: null,
});

const submitting = ref(false);
const errorMsg = ref(null);

async function addCharacter() {
  errorMsg.value = null;

  if (!form.value.name || !form.value.img_url || !form.value.vision_id) {
    errorMsg.value = "Name, avatar URL, and Vision are required.";
    return;
  }

  submitting.value = true;

  const { data, error } = await supabase
    .schema("genshin_impact")
    .from("characters")
    .insert({
      name: form.value.name,
      rarity: form.value.rarity,
      vision_id: form.value.vision_id,
      weapon_type_id: form.value.weapon_type_id,
      main_stat: form.value.main_stat,
      constellation: form.value.constellation || null,
      birthday: form.value.birthday || null,
      role: form.value.role,
      is_new: form.value.is_new,
      is_upcoming: form.value.is_upcoming,
      img_url: form.value.img_url,
      splash_art_url: form.value.splash_art_url || null,
      release_date: form.value.release_date || null,
    })
    .select()
    .single();

  submitting.value = false;

  if (error) {
    errorMsg.value = error.message;
    console.error(error);
    return;
  }

  resetForm();
}

function resetForm() {
  form.value = {
    name: "",
    img_url: "",
    splash_art_url: "",
    rarity: 5,
    constellation: "",
    birthday: "",
    vision_id: null,
    weapon_type_id: null,
    main_stat: null,
    role: null,
    is_new: false,
    is_upcoming: false,
    release_date: null,
  };
}
</script>
