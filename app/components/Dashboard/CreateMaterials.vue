<template>
  <article class="bg-zinc-700 my-4 p-4 rounded-2xl space-y-4">
    <h2>Create Materials</h2>
    <div class="flex items-center gap-2">
      <input v-model="form.name" type="text" class="input" placeholder="Name" />
      <select v-model="form.rarity" class="select">
        <option selected disabled :value="null">Select Rarity</option>
        <option v-for="rarity in rarities" :key="rarity" :value="rarity">
          {{ rarity }}
        </option>
      </select>
      <select v-model="form.category" class="select">
        <option selected disabled :value="null">Select Category</option>
        <option
          v-for="material in material_category"
          :key="material"
          :value="material"
        >
          {{ material }}
        </option>
      </select>
      <input
        v-model="form.img_url"
        type="text"
        class="input"
        placeholder="img_url"
      />
    </div>
    <div class="flex justify-center items-center">
      <button class="btn btn-success" :disabled="loading" @click="createMaterial">
        {{ loading ? "Saving..." : "Add Material" }}
      </button>
    </div>
    <p v-if="error" class="text-red-400 text-sm">{{ error }}</p>
  </article>
</template>

<script setup>
const rarities = ref([1, 2, 3, 4, 5]);
const material_category = ref([
  "exp",
  "enhancement",
  "level_up",
  "talent",
  "ascension",
  "weapon_ascension",
  "local_specialty",
]);

const supabase = useSupabaseClient();

const form = ref({
  name: "",
  rarity: null,
  category: null,
  img_url: "",
});

const loading = ref(false);
const error = ref(null);

async function createMaterial() {
  error.value = null;

  if (!form.value.name || !form.value.rarity || !form.value.category) {
    error.value = "Name, rarity, and category are required.";
    return;
  }

  loading.value = true;

  const { data, error: insertError } = await supabase
    .schema("genshin_impact")
    .from("materials")
    .insert({
      name: form.value.name,
      rarity: form.value.rarity,
      category: form.value.category,
      img_url: form.value.img_url || null,
    })
    .select()
    .single();

  loading.value = false;

  if (insertError) {
    error.value = insertError.message;
    return;
  }

  // reset form on success
  form.value = { name: "", rarity: null, category: null, img_url: "" };

  // optional: emit or push to a local list
  console.log("Created material:", data);
}
</script>
