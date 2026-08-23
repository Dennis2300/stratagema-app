<template>
  <article class="bg-zinc-700 my-4 p-4 rounded-2xl space-y-4">
    <h2>Link Material to Character</h2>
    <div class="grid grid-cols-5 gap-2">
      <select v-model="form.character_id" class="select">
        <option selected disabled :value="null">Select Character</option>
        <option
          v-for="character in characters"
          :key="character.id"
          :value="character.id"
        >
          {{ character.name }}
        </option>
      </select>

      <select
        v-model="selectedCategory"
        class="select"
        @change="onCategoryChange"
      >
        <option value="">Select Material Category</option>
        <option v-for="cat in material_category" :key="cat" :value="cat">
          {{ cat }}
        </option>
      </select>

      <select
        v-model="form.material_id"
        class="select"
        :disabled="!selectedCategory"
      >
        <option value="">Select Material</option>
        <option
          v-for="material in filteredMaterials"
          :key="material.id"
          :value="material.id"
        >
          {{ material.name }}
        </option>
      </select>

      <input
        v-model.number="form.amount"
        type="number"
        class="input"
        placeholder="amount"
      />

      <select v-model="form.usage_type" class="select">
        <option value="">Select usage type</option>
        <option v-for="usage in usage_type" :key="usage" :value="usage">
          {{ usage }}
        </option>
      </select>
    </div>

    <div class="flex justify-center items-center gap-2">
      <button class="btn btn-success" :disabled="loading" @click="linkMaterial">
        {{ loading ? "Saving..." : "Link Material" }}
      </button>
      <p v-if="error" class="text-red-400 text-sm">{{ error }}</p>
      <p v-if="success" class="text-green-400 text-sm">Linked successfully!</p>
    </div>
  </article>
</template>

<script setup>
const supabase = useSupabaseClient();

const material_category = ref([
  "exp",
  "enhancement",
  "level_up",
  "talent",
  "ascension",
  "weapon_ascension",
  "local_specialty",
]);
const usage_type = ref([
  "character_ascension",
  "weapon_ascension",
  "character_talent",
]);

const characters = ref([]);
const materials = ref([]);
const selectedCategory = ref("");
const loading = ref(false);
const error = ref(null);
const success = ref(false);

const form = ref({
  character_id: null,
  material_id: "",
  amount: null,
  usage_type: "",
});

const filteredMaterials = computed(() =>
  materials.value.filter((m) => m.category === selectedCategory.value),
);

function onCategoryChange() {
  form.value.material_id = "";
}

async function getBasicCharacterInfo() {
  try {
    const { data, error } = await supabase
      .schema("genshin_impact")
      .from("characters")
      .select("id, name")
      .order("name", { ascending: true });
    if (error) throw error;
    characters.value = data;
  } catch (error) {
    console.log(error.message);
  }
}

async function getBasicMaterialsInfo() {
  try {
    const { data, error } = await supabase
      .schema("genshin_impact")
      .from("materials")
      .select("id, name, category")
      .order("id", { ascending: true });
    if (error) throw error;
    materials.value = data;
  } catch (error) {
    console.log(error.message);
  }
}

async function linkMaterial() {
  error.value = null;
  success.value = false;

  // usage_type is nullable in the table, so it's excluded from this check
  if (
    !form.value.character_id ||
    !form.value.material_id ||
    !form.value.amount
  ) {
    error.value = "Character, material, and amount are required.";
    return;
  }

  if (form.value.amount <= 0) {
    error.value = "Amount must be greater than 0.";
    return;
  }

  loading.value = true;

  const { data, error: insertError } = await supabase
    .schema("genshin_impact")
    .from("character_material")
    .insert({
      character_id: form.value.character_id,
      material_id: form.value.material_id,
      amount: form.value.amount,
      usage_type: form.value.usage_type || null,
    })
    .select()
    .single();

  loading.value = false;

  if (insertError) {
    error.value = insertError.message;
    return;
  }

  success.value = true;

  // reset form on success, keep character selected for faster consecutive entries
  form.value.material_id = "";
  form.value.amount = null;
  form.value.usage_type = "";
  selectedCategory.value = "";

  console.log("Linked material:", data);
}

onMounted(() => {
  getBasicCharacterInfo();
  getBasicMaterialsInfo();
});
</script>
