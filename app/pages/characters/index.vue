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
        <h1>All playable characters</h1>
        <p>Here you can find all playable and upcoming playable characters</p>
      </div>
    </figure>
  </header>

  <article>
    <h2>Upcoming Characters</h2>
    <div>
      <div>
        <h3>Odette</h3>
      </div>
    </div>
  </article>

  <article>
    <h2>Characters</h2>
    <div>
      <div v-for="character in characters" :key="character.id">
        <pre>{{ character }}</pre>
      </div>
    </div>
  </article>
</template>

<script setup>
const supabase = useSupabaseClient();

const {
  data: characters,
  pending,
  error,
} = await useAsyncData("characters", async () => {
  const { data, error } = await supabase
    .schema("genshin_impact")
    .from("characters")
    .select("*, vision_id(*), weapon_type_id(*)");

  if (error) throw error;
  return data;
});
</script>
