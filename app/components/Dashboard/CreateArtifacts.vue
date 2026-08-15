<template>
  <article class="bg-zinc-700 my-4 p-4 rounded-2xl space-y-4">
    <h2>Create Artifact</h2>
    <div class="space-x-4">
      <input type="text" class="input" placeholder="Artifact Name" v-model="form.name" />
      <select class="select" v-model="form.two_piece_bonus_id">
        <option :value="null" selected disabled>Select Two Piece Bonus</option>
        <option
          v-for="two_piece_bonus in two_piece_bonuses"
          :key="two_piece_bonus.id"
          :value="two_piece_bonus.id"
        >
          {{ two_piece_bonus.name }}
        </option>
      </select>
    </div>

    <div>
      <textarea
        class="textarea w-full h-100"
        placeholder="Artifacts four piece effect"
        v-model="form.four_piece_bonus"
      ></textarea>
    </div>

    <div class="grid grid-cols-5 gap-2">
      <input type="text" class="input" placeholder="Flower" v-model="form.flower_img_url" />
      <input type="text" class="input" placeholder="Plume" v-model="form.plume_img_url" />
      <input type="text" class="input" placeholder="Sands" v-model="form.sands_img_url" />
      <input type="text" class="input" placeholder="Goblet" v-model="form.goblet_img_url" />
      <input type="text" class="input" placeholder="Circlet" v-model="form.circlet_img_url" />
    </div>
    <div class="flex justify-center items-center">
      <button class="btn btn-success" :disabled="submitting" @click="createArtifact">
        {{ submitting ? "Adding..." : "Add Artifacts" }}
      </button>
    </div>
  </article>
</template>

<script setup>
const supabase = useSupabaseClient();

const two_piece_bonuses = ref([
  { id: 1, name: "Gain a 15% Geo DMG Bonus." },
  { id: 2, name: "Cryo DMG Bonus +15%" },
  { id: 3, name: "Physical DMG +25%" },
  { id: 4, name: "Pyro DMG Bonus +15%." },
  { id: 5, name: "Dendro DMG Bonus +15%" },
  { id: 6, name: "Anemo DMG Bonus +15%" },
  { id: 7, name: "ATK +18%." },
  { id: 8, name: "Energy Recharge +20%." },
  { id: 9, name: "Elemental Mastery +80" },
  { id: 10, name: "Elemental Skill DMG +20%" },
  { id: 11, name: "Hydro DMG Bonus +15%" },
  { id: 12, name: "DEF +30%" },
  { id: 13, name: "Pyro RES increased by 40%." },
  { id: 14, name: "Plunging Attack DMG increased by 25%." },
  { id: 15, name: "Character Healing Effectiveness +15%." },
  { id: 16, name: "Normal and Charged Attack DMG +15%" },
  { id: 17, name: "Elemental Burst DMG +20%." },
  {
    id: 18,
    name: "While the equipping character is in Nightsoul's Blessing and is on the field, their DMG dealt is increased by 15%.",
  },
  { id: 19, name: "Healing Bonus +15%" },
  { id: 20, name: "Increases Shield Strength by 35%" },
  {
    id: 21,
    name: "When a nearby party member triggers a Nightsoul Burst, the equipping character regenerates 6 Elemental Energy.",
  },
  { id: 22, name: "Energy Recharge +20%" },
  { id: 23, name: "HP +20%." },
  { id: 24, name: "Electro DMG Bonus +15%" },
  { id: 25, name: "Electro RES increased by 40%." },
]);

const submitting = ref(false);

const emptyForm = () => ({
  name: "",
  two_piece_bonus_id: null,
  four_piece_bonus: "",
  flower_img_url: "",
  plume_img_url: "",
  sands_img_url: "",
  goblet_img_url: "",
  circlet_img_url: "",
});

const form = ref(emptyForm());

async function createArtifact() {
  // basic validation
  if (!form.value.name.trim()) {
    alert("Please enter an artifact name.");
    return;
  }
  if (!form.value.two_piece_bonus_id) {
    alert("Please select a two piece bonus.");
    return;
  }
  if (!form.value.four_piece_bonus.trim()) {
    alert("Please enter the four piece effect.");
    return;
  }

  submitting.value = true;

  const { data, error } = await supabase
    .schema("genshin_impact")
    .from("artifacts")
    .insert({
      name: form.value.name.trim(),
      two_piece_bonus_id: form.value.two_piece_bonus_id,
      four_piece_bonus: form.value.four_piece_bonus.trim(),
      flower_img_url: form.value.flower_img_url.trim() || null,
      plume_img_url: form.value.plume_img_url.trim() || null,
      sands_img_url: form.value.sands_img_url.trim() || null,
      goblet_img_url: form.value.goblet_img_url.trim() || null,
      circlet_img_url: form.value.circlet_img_url.trim() || null,
    })
    .select()
    .single();

  submitting.value = false;

  if (error) {
    console.error("Failed to create artifact:", error);
    alert(`Failed to add artifact: ${error.message}`);
    return;
  }

  // reset form and notify caller / list
  form.value = emptyForm();
  emit("created", data);
}

const emit = defineEmits(["created"]);
</script>