<template>
  <article class="bg-zinc-700 my-4 p-4 rounded-2xl space-y-4">
    <h2>Create Weapon</h2>
    <section class="grid grid-cols-3 gap-x-3 gap-y-6">
      <div class="flex justify-center items-center">
        <input
          type="text"
          class="input"
          placeholder="Weapon Name"
          v-model="form.name"
        />
      </div>

      <div class="flex justify-center items-center">
        <select class="select" v-model="form.stat">
          <option :value="null" selected disabled>Select Stat</option>
          <option v-for="stat in stats" :key="stat.name" :value="stat.name">
            {{ stat.name }}
          </option>
        </select>
      </div>

      <div class="flex justify-center items-center">
        <input
          type="text"
          class="input"
          placeholder="Stat Value"
          v-model="form.stat_value"
        />
      </div>

      <div class="flex justify-center items-center">
        <select class="select" v-model="form.weapon_type_id">
          <option :value="null" selected disabled>Select Type</option>
          <option
            v-for="weapon_type in weapon_types"
            :key="weapon_type.id"
            :value="weapon_type.id"
          >
            {{ weapon_type.name }}
          </option>
        </select>
      </div>

      <div class="flex justify-center items-center gap-4">
        <label class="btn btn-primary">
          <input
            type="radio"
            name="weapon_rating"
            :value="5"
            v-model="form.rarity"
          />
          5 star
        </label>

        <label class="btn btn-primary">
          <input
            type="radio"
            name="weapon_rating"
            :value="4"
            v-model="form.rarity"
          />
          4 star
        </label>

        <label class="btn btn-primary">
          <input
            type="radio"
            name="weapon_rating"
            :value="3"
            v-model="form.rarity"
          />
          3 star
        </label>
      </div>

      <div class="flex justify-center items-center">
        <input
          type="text"
          class="input"
          placeholder="Base ATK"
          v-model="form.base_atk"
        />
      </div>

      <div class="flex justify-center items-center">
        <input
          type="text"
          class="input"
          placeholder="img url"
          v-model="form.img_url"
        />
      </div>

      <div></div>

      <div class="col-span-2 flex justify-center items-center">
        <textarea
          class="textarea w-full h-50"
          placeholder="Weapon Description"
          v-model="form.description"
        ></textarea>
      </div>

      <div class="col-span-2 flex justify-center items-center">
        <textarea
          class="textarea w-full h-100"
          placeholder="Weapon Ability"
          v-model="form.ability"
        ></textarea>
      </div>
    </section>

    <p v-if="errorMsg" class="text-error text-center">{{ errorMsg }}</p>

    <div class="flex justify-center items-center">
      <button
        type="button"
        class="btn btn-success"
        :disabled="submitting"
        @click="handleSubmit"
      >
        {{ submitting ? "Adding..." : "Add weapon" }}
      </button>
    </div>
  </article>
</template>

<script setup>
const supabase = useSupabaseClient();

const weapon_types = ref([
  { id: 1, name: "Sword" },
  { id: 2, name: "Claymore" },
  { id: 3, name: "Bow" },
  { id: 4, name: "Catalyst" },
  { id: 5, name: "Polearm" },
]);

const stats = ref([
  { name: "ATK%" },
  { name: "DEF%" },
  { name: "HP%" },
  { name: "Elemental Mastery" },
  { name: "Energy Recharge" },
  { name: "CRIT Rate" },
  { name: "CRIT DMG" },
  { name: "Physical DMG Bonus" },
]);

const form = ref({
  name: "",
  stat: null,
  stat_value: "",
  weapon_type_id: null,
  rarity: 5,
  img_url: "",
  description: "",
  ability: "",
  base_atk: "",
});

const submitting = ref(false);
const errorMsg = ref("");

const emit = defineEmits(["created"]);

function resetForm() {
  form.value = {
    name: "",
    stat: null,
    stat_value: "",
    weapon_type_id: null,
    rarity: 5,
    img_url: "",
    description: "",
    ability: "",
    base_atk: "",
  };
}

async function handleSubmit() {
  errorMsg.value = "";

  if (!form.value.name || !form.value.weapon_type_id) {
    errorMsg.value = "Name and weapon type are required.";
    return;
  }

  submitting.value = true;

  const { data, error } = await supabase
    .schema("genshin_impact")
    .from("weapons")
    .insert({
      name: form.value.name.trim(),
      rarity: form.value.rarity,
      weapon_type_id: form.value.weapon_type_id,
      stat: form.value.stat,
      stat_value:
        form.value.stat_value === "" ? null : Number(form.value.stat_value),
      description: form.value.description || null,
      ability: form.value.ability || null,
      img_url: form.value.img_url || null,
      base_atk: form.value.base_atk === "" ? null : Number(form.value.base_atk),
    })
    .select()
    .single();

  submitting.value = false;

  if (error) {
    errorMsg.value = error.message;
    return;
  }

  emit("created", data);
  resetForm();
}
</script>
