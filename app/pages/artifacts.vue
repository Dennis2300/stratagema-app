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

  <div class="my-6 max-w-100 mx-auto px-2">
    <label
      for="artifact-search"
      class="mb-2 block text-center text-sm font-semibold uppercase tracking-wider text-base-content/70"
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

  <article>
    <div v-if="pending">
      <p>Loading</p>
    </div>
    <div v-else-if="error">
      <p>{{ error.message }}</p>
    </div>
    <div v-else-if="artifacts" class="space-y-6 p-2">
      <div
        v-for="artifact in filteredArtifacts"
        :key="artifact.id"
        class="card overflow-hidden border-2 border-white/25 bg-base-200 shadow-xl"
      >
        <div class="bg-base-100 py-8">
          <div class="grid grid-cols-5 gap-2 sm:gap-4">
            <!-- Flower -->
            <div class="group flex flex-col items-center gap-2">
              <div
                class="rounded-xl border border-base-content/25 bg-base-200 p-1.5"
              >
                <img
                  class="aspect-square w-12 object-cover sm:w-16 md:w-20"
                  :src="artifact.flower_img_url"
                  :alt="`${artifact.name} Flower`"
                />
              </div>

              <span
                class="text-[10px] uppercase tracking-wider text-base-content/50 sm:text-xs"
              >
                Flower
              </span>
            </div>

            <!-- Plume -->
            <div class="group flex flex-col items-center gap-2">
              <div
                class="rounded-xl border border-base-content/25 bg-base-200 p-1.5"
              >
                <img
                  class="aspect-square w-12 object-cover sm:w-16 md:w-20"
                  :src="artifact.plume_img_url"
                  :alt="`${artifact.name} Plume`"
                />
              </div>

              <span
                class="text-[10px] uppercase tracking-wider text-base-content/50 sm:text-xs"
              >
                Plume
              </span>
            </div>

            <!-- Sands -->
            <div class="group flex flex-col items-center gap-2">
              <div
                class="rounded-xl border border-base-content/25 bg-base-200 p-1.5"
              >
                <img
                  class="aspect-square w-12 object-cover sm:w-16 md:w-20"
                  :src="artifact.sands_img_url"
                  :alt="`${artifact.name} Sands`"
                />
              </div>

              <span
                class="text-[10px] uppercase tracking-wider text-base-content/50 sm:text-xs"
              >
                Sands
              </span>
            </div>

            <!-- Goblet -->
            <div class="group flex flex-col items-center gap-2">
              <div
                class="rounded-xl border border-base-content/25 bg-base-200 p-1.5"
              >
                <img
                  class="aspect-square w-12 object-cover sm:w-16 md:w-20"
                  :src="artifact.goblet_img_url"
                  :alt="`${artifact.name} Goblet`"
                />
              </div>

              <span
                class="text-[10px] uppercase tracking-wider text-base-content/50 sm:text-xs"
              >
                Goblet
              </span>
            </div>

            <!-- Circlet -->
            <div class="group flex flex-col items-center gap-2">
              <div
                class="rounded-xl border border-base-content/25 bg-base-200 p-1.5"
              >
                <img
                  class="aspect-square w-12 object-cover sm:w-16 md:w-20"
                  :src="artifact.circlet_img_url"
                  :alt="`${artifact.name} Circlet`"
                />
              </div>

              <span
                class="text-[10px] uppercase tracking-wider text-base-content/50 sm:text-xs"
              >
                Circlet
              </span>
            </div>
          </div>
        </div>

        <!-- Divider -->
        <div class="mx-5 h-px bg-base-300"></div>

        <!-- Artifact information -->
        <div class="space-y-5 p-5">
          <!-- Name -->
          <div>
            <h2
              class="text-xl font-bold tracking-wide text-base-content sm:text-2xl"
            >
              {{ artifact.name }}
            </h2>

            <div class="mt-2 h-0.5 w-12 bg-primary"></div>
          </div>

          <!-- 2-piece bonus -->
          <div class="border-l-2 border-primary bg-base-100 p-4">
            <p
              class="mb-1 text-xs font-bold uppercase tracking-[0.15em] text-primary"
            >
              2-Piece Bonus
            </p>

            <p class="text-sm leading-relaxed text-base-content/80">
              {{ artifact.two_piece_bonus_id.name }}
            </p>
          </div>

          <!-- 4-piece bonus -->
          <div class="border-l-2 border-secondary bg-base-100 p-4">
            <p
              class="mb-1 text-xs font-bold uppercase tracking-[0.15em] text-secondary-content"
            >
              4-Piece Bonus
            </p>

            <p class="text-sm leading-relaxed text-base-content/80">
              {{ artifact.four_piece_bonus }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>Empty Fallback</div>
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
    .select("*,two_piece_bonus_id(*)");
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
