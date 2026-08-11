<template>
  <div>
    <h1>Welcome to STRATAGEMA APP</h1>
    <div v-if="pending">Loading characters...</div>
    <div v-else-if="error">Something went wrong: {{ error.message }}</div>
    <div v-else>
      <div v-for="character in characters" :key="character.id" class="card">
        <h3>{{ character.name }}</h3>
        <p>{{ character.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient();

const {
  data: characters,
  pending,
  error,
  refresh,
} = await useAsyncData("characters", async () => {
  const { data, error } = await supabase
    .schema("genshin_impact")
    .from("characters")
    .select("*");

  if (error) throw error;
  return data;
});
</script>
