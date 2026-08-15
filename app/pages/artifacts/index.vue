<template>
  <header>
    <figure
      class="relative w-full h-48 overflow-hidden rounded-2xl border-2 border-white/25"
    >
      <img
        class="w-full h-full object-cover object-center"
        src="https://act-upload.hoyoverse.com/event-ugc-hoyowiki/2024/10/23/237301566/bf8ee46d2caba6d5928fbe7b125d37c4_8565732607361309926.png?x-oss-process=image%2Fformat%2Cwebp"
        alt=""
      />
      <div class="absolute top-0 left-0 w-full h-full bg-black/75"></div>
      <div
        class="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center"
      >
        <h1>Artifacts Archive</h1>
      </div>
    </figure>
  </header>
  <article>
    <div v-if="pending">
      <p>Loading</p>
    </div>
    <div v-else-if="error">
      <p>{{ error.message }}</p>
    </div>
    <div v-else-if="artifacts">
      <div v-for="artifact in artifacts" :key="artifact.id">
        <img :src="artifact.flower_img_url" :alt="artifact.name" />
        <p>{{ artifact.name }}</p>
        <p>{{ artifact.two_piece_bonus_id.name }}</p>
        <p>{{ artifact.four_piece_bonus }}</p>
      </div>
      <p>{{ artifacts.name }}</p>
    </div>
    <div v-else>Empty Fallback</div>
  </article>
</template>

<script setup>
const supabase = useSupabaseClient();

const {
  data: artifacts,
  pending,
  error,
} = useAsyncData("artifacts", async () => {
  const { data, error } = await supabase
    .schema("genshin_impact")
    .from("artifacts")
    .select("*,two_piece_bonus_id(*)");
  if (error) throw error;
  return data;
});
</script>
