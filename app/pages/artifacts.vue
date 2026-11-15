<template>
  <section class="max-w-7xl mx-auto pt-24 px-4 md:px-0">
    <figure
      class="relative h-48 w-full overflow-hidden border border-white/25 rounded-lg"
    >
      <img
        class="w-full h-full object-center object-cover"
        src="https://act-upload.hoyoverse.com/event-ugc-hoyowiki/2025/01/14/237301566/17a99dc92e113ac0eb8542099b12cdd0_7647289234785786678.png?x-oss-process=image%2Fformat%2Cwebp"
        alt="Stratagema"
      />
      <div class="absolute top-0 left-0 w-full h-full bg-black/45"></div>
      <figcaption
        class="absolute top-0 left-0 h-full w-full flex flex-col justify-center items-center text-center"
      >
        <h1>Artifacts Archive</h1>
        <p class="text-sm my-2">See details of all Artifacts</p>
      </figcaption>
    </figure>
  </section>

  <div v-if="pending" class="h-100 flex justify-center items-center">
    <div class="loader"></div>
  </div>

  <div v-else-if="error">
    <ErrorMessage :error="error" />
  </div>

  <section v-else-if="artifacts">
    <div class="flex justify-center items-center mt-8">
      <input
        id="artifact-search"
        v-model="searchQuery"
        type="text"
        placeholder="Search by artifact name..."
        class="input input-bordered bg-base-200 pr-12 text-base-content placeholder:text-base-content/40 focus:border-primary focus:outline-none"
      />
    </div>
    <div
      class="max-w-7xl mx-auto grid md:grid-cols-2 gap-4 my-8 px-4 md:px-0 items-start"
    >
      <div
        v-for="artifact in filteredArtifacts"
        :key="artifact.id"
        class="bg-base-200 rounded-lg border border-white/25 hover:border-white/50 transition duration-300"
      >
        <!-- Card header (click target) -->
        <div
          class="p-4 flex justify-between items-center group hover:cursor-pointer"
          role="button"
          tabindex="0"
          :aria-expanded="openId === artifact.id"
          @click="toggle(artifact.id)"
          @keydown.enter.prevent="toggle(artifact.id)"
          @keydown.space.prevent="toggle(artifact.id)"
        >
          <figure class="flex items-center gap-2">
            <img
              class="w-12 h-12 md:w-18 md:h-18 mask mask-squircle"
              :src="artifact.flower_img_url"
              :alt="artifact.name"
            />
            <figcaption class="space-y-1">
              <div class="text-sm md:text-xl">{{ artifact.name }}</div>
            </figcaption>
          </figure>
          <div
            class="transition duration-300"
            :class="
              openId === artifact.id ? 'rotate-90' : 'group-hover:translate-x-1'
            "
          >
            →
          </div>
        </div>

        <!-- Expandable panel -->
        <div
          class="grid transition-[grid-template-rows] duration-300 ease-in-out"
          :class="
            openId === artifact.id ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          "
        >
          <div class="overflow-hidden">
            <div class="p-4 border-t border-white/25 space-y-4">
              <div class="flex justify-around items-center">
                <img
                  class="w-12 h-12 md:w-16 md:h-16"
                  :src="artifact.flower_img_url"
                  :alt="artifact.name"
                />
                <img
                  class="w-12 h-12 md:w-16 md:h-16"
                  :src="artifact.plume_img_url"
                  :alt="artifact.name"
                />
                <img
                  class="w-12 h-12 md:w-16 md:h-16"
                  :src="artifact.sands_img_url"
                  :alt="artifact.name"
                />
                <img
                  class="w-12 h-12 md:w-16 md:h-16"
                  :src="artifact.goblet_img_url"
                  :alt="artifact.name"
                />
                <img
                  class="w-12 h-12 md:w-16 md:h-16"
                  :src="artifact.circlet_img_url"
                  :alt="artifact.name"
                />
              </div>
              <div>
                <p class="">Two piece bonus:</p>
                <p class="text-white/75 font-inter">
                  {{ artifact.two_piece_bonus_id.name }}
                </p>
              </div>

              <div>
                <p class="">Four piece bonus:</p>
                <p class="text-white/75 font-inter">
                  {{ artifact.four_piece_bonus }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div v-else class="h-100 flex justify-center items-center">
    <EmptyFallback />
  </div>
</template>

<script setup>
const supabase = useSupabaseClient();

const searchQuery = ref("");
const openId = ref(null);

const toggle = (id) => {
  openId.value = openId.value === id ? null : id;
};

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
