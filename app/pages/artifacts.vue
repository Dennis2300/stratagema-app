<template>
  <Navbar class="fixed top-0 z-50" />

  <article class="max-w-7xl mx-auto min-h-screen py-24">
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
        <p>See details of all Artifacts</p>
      </div>
    </figure>

    <!-- Search Bar -->
    <div class="mx-auto max-w-100 my-4">
      <label
        for="artifact-search"
        class="mb-2 block text-center text-sm font-semibold uppercase tracking-wider text-base-content/66"
      >
        Search Artifacts
      </label>

      <div class="relative">
        <input
          id="artifact-search"
          v-model="searchQuery"
          type="text"
          placeholder="Search by artifact name..."
          class="input input-bordered w-full bg-base-200 pr-12 text-base-content placeholder:text-base-content/40 focus:border-primary focus:outline-none"
        />

        <span
          class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-base-content/40"
        >
          🔍
        </span>
      </div>
    </div>

    <!-- Loading -->
    <div class="h-100 flex justify-center items-center" v-if="pending">
      <span class="loader"></span>
    </div>

    <!-- Error -->
    <div class="h-100 flex justify-center items-center" v-else-if="error">
      <ErrorMessage :error="error" />
    </div>

    <!-- Content -->
    <section v-else-if="artifacts">
      <ul class="list bg-base-100 rounded-box shadow-md">
        <li
          class="list-row"
          v-for="artifact in filteredArtifacts"
          :key="artifact.id"
        >
          <div>
            <img
              class="size-12 rounded-box rarity-5"
              alt="Tailwind CSS list item"
              :src="artifact.flower_img_url"
            />
          </div>
          <div>
            <div>{{ artifact.name }}</div>
            <div class="text-xs uppercase font-semibold opacity-60">
              {{ artifact.two_piece_bonus_id.name }}
            </div>
          </div>
          <p class="list-col-wrap text-xs">
            {{ artifact.four_piece_bonus }}
          </p>
        </li>
      </ul>
    </section>

    <!-- Empty Fallback -->
    <div class="h-100 flex justify-center items-center" v-else>
      <EmptyFallback />
    </div>
  </article>
</template>

<script setup>
const supabase = useSupabaseClient();

const searchQuery = ref("");

const {
  data: artifacts,
  pending,
  error,
} = useAsyncData("artifacts", async () => {
  const { data, error } = await supabase
    .schema("genshin_impact")
    .from("artifacts")
    .select("*,two_piece_bonus_id(*)")
    .order("name", { ascending: true });
  if (error) throw error;
  return data;
});

const filteredArtifacts = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();

  if (!query) {
    return artifacts.value;
  }

  return artifacts.value.filter((artifact) =>
    artifact.name.toLowerCase().startsWith(query),
  );
});
</script>
