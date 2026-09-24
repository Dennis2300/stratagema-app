<template>
  <div
    v-if="characterLoading"
    class="flex justify-center items-center h-[75vh]"
  >
    <span class="loading loading-spinner loading-xl"></span>
  </div>

  <div v-else-if="characterError">
    <ErrorMessage :error="characterError" />
  </div>

  <article v-else-if="character" class="relative min-h-[125vh]">
    <figure class="absolute inset-0">
      <img
        class="w-full object-cover"
        :src="character.splash_art_url"
        :alt="character.name"
      />
    </figure>
    <div class="relative w-full z-10 space-y-6">
      <section
        class="w-full flex flex-col gap-8 bg-base-300/66 py-6 md:p-6 border border-base-content/50 rounded-xl backdrop-blur-xs md:flex-row md:gap-0"
      >
        <figure class="flex flex-2 flex-col items-center gap-6 md:flex-row">
          <div class="relative shrink-0 rounded-full overflow-hidden">
            <img
              class="h-32 w-32 object-cover md:h-40 md:w-40"
              :class="{
                'rarity-5': character.rarity === 5,
                'rarity-4': character.rarity === 4,
              }"
              :src="character.img_url"
              :alt="character.name"
            />
          </div>

          <figcaption class="text-white text-center md:text-left">
            <span
              v-if="character.title"
              class="mb-2 block text-sm font-medium uppercase tracking-[0.3em] text-white/50"
            >
              {{ character.title }}
            </span>

            <h1
              class="text-6xl font-bold uppercase leading-none tracking-tight md:text-8xl"
            >
              {{ character.name }}
            </h1>

            <div
              class="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium uppercase tracking-[0.2em] text-white md:justify-start"
            >
              <span
                :class="visionColors[character.vision.name] ?? 'text-white'"
              >
                {{ character.vision.name }}
              </span>
              <span class="h-1 w-1 rounded-full bg-white/50"></span>
              <span>{{ character.weapon_type.name }}</span>
              <span class="h-1 w-1 rounded-full bg-white/50"></span>
              <span>{{ character.role }}</span>
              <span class="h-1 w-1 rounded-full bg-white/50"></span>
              <span>{{ character.main_stat }}</span>
            </div>
          </figcaption>
        </figure>

        <div class="flex flex-1 flex-col items-center md:items-end">
          <!-- Section heading -->
          <div class="mb-4 flex items-center gap-3">
            <div class="h-6 w-1 rounded-full bg-white"></div>
            <h3 class="font-semibold text-white">Voice Actors</h3>
          </div>

          <!-- Voice actors -->
          <div class="flex w-fit max-w-md flex-col gap-2">
            <div
              v-for="voiceActor in sortedVoiceActors"
              :key="voiceActor.language"
              class="flex items-center justify-between rounded-lg bg-base-300 px-4 py-2.5 border border-white/15"
            >
              <span
                class="w-10 text-sm font-bold uppercase tracking-wide text-white/60"
              >
                {{ voiceActor.language }}
              </span>

              <span
                class="flex items-center gap-1 text-sm font-medium text-white"
              >
                <template
                  v-for="(actor, index) in voiceActor.actors"
                  :key="actor.id"
                >
                  <a
                    :href="actor.link"
                    target="_blank"
                    class="hover:underline hover:text-base-content"
                  >
                    {{ actor.name }}
                  </a>
                  <span
                    v-if="index < voiceActor.actors.length - 1"
                    class="text-white/60"
                    >&</span
                  >
                </template>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section
        class="relative w-full bg-base-300/66 p-6 border border-base-content/50 rounded-xl backdrop-blur-xs"
      >
        <span
          class="text-xs font-medium uppercase tracking-widest text-primary/60"
        >
          Character Profile</span
        >
        <div class="flex items-center gap-3 mb-4">
          <div class="w-1 h-9 bg-white rounded-xl"></div>
          <h2>Dossier</h2>
        </div>

        <div
          class="grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-base-content/10"
        >
          <div class="bg-base-300/80 p-5">
            <span
              class="w-10 text-sm font-bold uppercase tracking-wide text-white/60"
              >Rarity</span
            >
            <div class="text-lg text-yellow-400">
              <span v-for="star in character.rarity" :key="star">★</span>
            </div>
          </div>

          <div class="bg-base-300/80 p-5">
            <span
              class="w-10 text-sm font-bold uppercase tracking-wide text-white/60"
              >Signature Dish</span
            >
            <SpecialDishPopUp
              v-if="character.special_dish"
              :dish="character.special_dish"
            />
            <p v-else class="text-lg font-semibold text-red-700">
              No Special Dish!
            </p>
          </div>

          <div class="bg-base-300/80 p-5">
            <span
              class="w-10 text-sm font-bold uppercase tracking-wide text-white/60"
              >Constellation</span
            >
            <p class="text-lg font-semibold">{{ character.constellation }}</p>
          </div>

          <div class="bg-base-300/80 p-5">
            <span
              class="w-10 text-sm font-bold uppercase tracking-wide text-white/60"
              >Birthday</span
            >
            <p class="text-lg font-semibold" v-if="character.birthday">
              {{ character.birthday }}
            </p>
            <p v-else class="text-lg font-semibold text-red-700">
              No Birthday!
            </p>
          </div>

          <div class="bg-base-300/80 p-5">
            <span
              class="w-10 text-sm font-bold uppercase tracking-wide text-white/60"
              >Team Role</span
            >
            <p class="text-lg font-semibold uppercase">{{ character.role }}</p>
          </div>

          <div class="bg-base-300/80 p-5">
            <span
              class="w-10 text-sm font-bold uppercase tracking-wide text-white/60"
              >Release Date</span
            >
            <p class="text-lg font-semibold">{{ character.release_date }}</p>
          </div>
        </div>
      </section>

      <section
        class="w-full bg-base-300/66 p-6 border border-base-content/50 rounded-xl backdrop-blur-xs"
      >
        <span
          class="text-xs font-medium uppercase tracking-widest text-primary/60"
        >
          Recommended Weapons for {{ character.name }}
        </span>
        <div class="flex items-center gap-3 mb-4">
          <div class="w-1 h-9 bg-white rounded-xl"></div>
          <h2>Weapons</h2>
        </div>
        <div class="space-y-6">
          <div
            v-for="w in sortedWeapons"
            :key="w.weapon.id"
            class="group overflow-hidden rounded-xl border border-white/15 bg-base-300/80 shadow-sm transition-all duration-200 hover:border-white/30 hover:bg-base-300/95"
          >
            <div
              class="flex items-center justify-between gap-3 border-b border-white/10 p-4"
            >
              <figure class="flex min-w-0 items-center gap-4">
                <div
                  class="shrink-0 overflow-hidden rounded-xl ring-1 ring-white/10"
                >
                  <img
                    class="h-20 w-20 object-cover transition-transform duration-300 group-hover:scale-105"
                    :class="{
                      'rarity-5': w.weapon.rarity === 5,
                      'rarity-4': w.weapon.rarity === 4,
                      'rarity-3': w.weapon.rarity === 3,
                    }"
                    :src="w.weapon.img_url"
                    :alt="w.weapon.name"
                  />
                </div>

                <figcaption class="min-w-0">
                  <h3 class="truncate">
                    {{ w.weapon.name }}
                  </h3>

                  <div
                    class="mt-2 flex items-center gap-3 text-sm text-white/60"
                  >
                    <p>
                      <span class="text-white/40">STAT:</span>
                      {{ w.weapon.stat }}
                    </p>

                    <span class="h-1 w-1 rounded-full bg-white/20"></span>

                    <p>
                      <span class="text-white/40">VALUE:</span>
                      {{ w.weapon.stat_value }}
                    </p>
                  </div>
                </figcaption>
              </figure>

              <div
                class="hidden md:block shrink-0 text-white/30 transition-all duration-200 group-hover:translate-x-1 group-hover:text-white/70"
              >
                <span class="text-xl">→</span>
              </div>
            </div>

            <p v-if="w.details" class="p-4 text-white/70">
              {{ w.details }}
            </p>
          </div>
        </div>
      </section>

      <section
        class="w-full bg-base-300/66 p-2 md:p-6 border border-base-content/50 rounded-xl backdrop-blur-xs"
      >
        <span
          class="text-xs font-medium uppercase tracking-widest text-primary/60"
        >
          Recommended Build(s) for {{ character.name }}
        </span>
        <div class="flex items-center gap-3 mb-4">
          <div class="w-1 h-9 bg-white rounded-xl"></div>
          <h2>Build(s)</h2>
        </div>
        <div v-if="buildsLoading" class="h-75 flex justify-center items-center">
          <span class="loading loading-xl scale-200"></span>
        </div>

        <ErrorMessage v-else-if="buildsError" :error="buildsError" />

        <div v-else-if="builds">
          <div>
            <div
              v-for="build in builds"
              :key="build.id"
              class="card bg-base-200 shadow-md"
            >
              <div class="card-body">
                <h3 class="card-title text-base">{{ build.title }}</h3>
                <p v-if="build.details" class="text-sm opacity-70">
                  {{ build.details }}
                </p>
                <div class="divider m-0"></div>
                <!-- Artifact pieces -->
                <div class="flex flex-col gap-3">
                  <div
                    v-for="piece in build.build_artifact"
                    :key="piece.id"
                    class="flex items-center gap-3"
                  >
                    <img
                      :src="piece.artifact_id.flower_img_url"
                      :alt="piece.artifact_id.name"
                      class="w-24 h-24 rounded-lg rarity-5 object-contain"
                    />
                    <div class="flex-1">
                      <span class="badge badge-accent badge-xs">
                        {{ piece.piece_count }} piece
                      </span>
                      <h4 class="font-semibold text-sm">
                        {{ piece.artifact_id.name }}
                      </h4>

                      <div v-if="piece.piece_count === 4">
                        <p class="text-xs opacity-70 mt-1 line-clamp-3">
                          {{ piece.artifact_id.two_piece_bonus_id.name }}
                        </p>
                        <p class="text-xs opacity-70 mt-1">
                          {{ piece.artifact_id.four_piece_bonus }}
                        </p>
                      </div>
                      <p
                        v-if="piece.piece_count === 2"
                        class="text-xs opacity-70 mt-1 line-clamp-3"
                      >
                        {{ piece.artifact_id.two_piece_bonus_id.name }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else>No Builds Yet</div>

        <h3 class="divider divider-start">Artifact Stats</h3>
        <div class="stat-block">
          <div>
            <div v-if="groupedStats.sands.length">
              <h4>Sands</h4>
              <p>{{ groupedStats.sands.map((s) => s.stat).join(" or ") }}</p>
            </div>

            <div v-if="groupedStats.goblet.length">
              <h4>Goblet</h4>
              <p>{{ groupedStats.goblet.map((s) => s.stat).join(" or ") }}</p>
            </div>

            <div v-if="groupedStats.circlet.length">
              <h4>Circlet</h4>
              <p>{{ groupedStats.circlet.map((s) => s.stat).join(" or ") }}</p>
            </div>
          </div>

          <template v-if="groupedStats.substat.length">
            <h4>Substats (priority order)</h4>
            <ol>
              <li v-for="s in groupedStats.substat" :key="s.id">
                {{ s.stat }}
              </li>
            </ol>
          </template>
        </div>
      </section>

      <section
        class="w-full bg-base-300/66 p-6 border border-base-content/50 rounded-xl backdrop-blur-xs"
      >
        <div>
          <span
            class="text-xs font-medium uppercase tracking-widest text-primary/60"
          >
            Possible Teams for {{ character.name }}
          </span>

          <div class="mt-2 flex items-center gap-3">
            <div class="h-8 w-1 rounded-full bg-primary"></div>
            <h2 class="text-xl font-semibold">Teams</h2>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div
            v-for="team in sortTeams(character.teams)"
            :key="team.id"
            class="bg-base-300/80 p-4 border border-white/15 rounded-xl"
          >
            <div class="flex justify-between items-center">
              <h4 class="text-base-content">{{ team.name }}</h4>
              <span class="text-white/15">#{{ team.id }}</span>
            </div>
            <div class="divider mt-0 mb-2"></div>

            <div class="flex justify-center items-center gap-4">
              <img
                class="h-16 w-16 mask mask-squircle"
                :class="{
                  'rarity-5': character.rarity === 5,
                  'rarity-4': character.rarity === 4,
                }"
                :src="character.img_url"
                :alt="character.name"
              />
              <div class="h-8 w-px bg-base-content/50"></div>
              <NuxtLink
                v-for="member in sortedMembers(team.members)"
                :key="member.id"
                class="tooltip tooltip-bottom tooltip-primary hover:cursor-pointer"
                :data-tip="`${member.character.name} (${member.role})`"
                :to="`/characters/${member.character.id}-${slugify(member.character.name)}`"
                target="_blank"
              >
                <img
                  class="h-16 w-16 mask mask-squircle"
                  :class="{
                    'rarity-5': member.character.rarity === 5,
                    'rarity-4': member.character.rarity === 4,
                  }"
                  :src="member.character.img_url"
                  :alt="member.character.name"
                />
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

      <section
        class="w-full bg-base-300/66 p-6 border border-base-content/50 rounded-xl backdrop-blur-xs"
      >
        <span
          class="text-xs font-medium uppercase tracking-widest text-primary/60"
        >
          All materials needed to reach Level 90 and max out Talents.
        </span>

        <div class="flex items-center gap-3 mb-4">
          <div class="w-1 h-9 bg-white rounded-xl"></div>
          <h2>Materials</h2>
        </div>

        <div class="space-y-8 mt-4">
          <div v-for="(items, type) in groupedMaterials" :key="type">
            <h3
              class="whitespace-nowrap text-xs font-bold uppercase tracking-widest text-primary/70 divider divider-start"
            >
              {{ type.replaceAll("_", " ") }}
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div
                v-for="item in items"
                :key="item.id"
                class="bg-base-300 p-4 border-2 border-base-content/10 rounded-lg hover:bg-zinc-700/50 transition duration-200"
              >
                <figure class="flex items-center gap-3">
                  <img
                    :src="item.material.img_url"
                    class="w-16 h-16 mask mask-squircle"
                    :class="{
                      'rarity-5': item.material.rarity === 5,
                      'rarity-4': item.material.rarity === 4,
                      'rarity-3': item.material.rarity === 3,
                      'rarity-2': item.material.rarity === 2,
                      'rarity-1': item.material.rarity === 1,
                    }"
                  />
                  <figcaption class="min-w-0">
                    <p
                      class="truncate text-sm font-medium text-base-content/90"
                    >
                      {{ item.material.name }}
                    </p>
                    <span
                      class="mt-1 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary"
                    >
                      ×{{ item.amount.toLocaleString() }}
                    </span>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </article>

  <div v-else>Empty Fallback</div>
</template>

<script setup>
import SpecialDishPopUp from "~/components/Character/SpecialDishPopUp.vue";
import MarkdownRender from "~/components/MarkdownRender.vue";

const supabase = useSupabaseClient();
const route = useRoute();

const param_id = route.params.id;

const visionColors = {
  Pyro: "text-red-400",
  Hydro: "text-blue-400",
  Anemo: "text-teal-300",
  Electro: "text-purple-400",
  Dendro: "text-green-400",
  Cryo: "text-cyan-300",
  Geo: "text-yellow-400",
};

const usageOrder = ["character_ascension", "character_talent"];
const languageOrder = ["EN", "JP", "CN", "KR"];

const {
  data: character,
  pending: characterLoading,
  error: characterError,
} = useAsyncData(`character-${param_id}`, async () => {
  const { data, error } = await supabase
    .schema("genshin_impact")
    .from("characters")
    .select(
      `
    *,
    vision:vision_id(*),
    weapon_type:weapon_type_id(*),
    weapons:character_weapon(*, weapon:weapon_id(*)),
    materials:character_material(id, material:material_id(*), usage_type, amount),
    teams(*, members:team_character(*, character:character_id(id, name, rarity, img_url))),
    voice_actors:character_voice_actor(*, voice_actor_id(*)),
    special_dish(*),
    stats:character_stat(*)
    `,
    )
    .eq("id", param_id)
    .single();
  if (error) throw error;
  // console.log(data);

  return data;
});

const {
  data: builds,
  pending: buildsLoading,
  error: buildsError,
} = useAsyncData(`character-${param_id}-build`, async () => {
  const { data, error } = await supabase
    .schema("genshin_impact")
    .from("builds")
    .select(
      "*, build_artifact(*, artifact_id(name, two_piece_bonus_id(name), four_piece_bonus, flower_img_url))",
    )
    .eq("character_id", param_id)
    .order("rank", { ascending: true, nullsFirst: false });
  if (error) throw error;
  return data;
});

function sortedMembers(members) {
  return [...members].sort((a, b) => a.slot - b.slot);
}

function sortTeams(teams) {
  return [...teams].sort((a, b) => a.id - b.id);
}

const sortedWeapons = computed(() => {
  return [...character.value.weapons].sort((a, b) => a.rank - b.rank);
});

const sortedVoiceActors = computed(() => {
  const sorted = [...character.value.voice_actors].sort(
    (a, b) =>
      languageOrder.indexOf(a.language) - languageOrder.indexOf(b.language),
  );

  const grouped = [];

  for (const entry of sorted) {
    const existing = grouped.find((g) => g.language === entry.language);

    if (existing) {
      existing.actors.push(entry.voice_actor_id);
    } else {
      grouped.push({
        language: entry.language,
        actors: [entry.voice_actor_id],
      });
    }
  }

  return grouped;
});

const categoryPriority = {
  ascension: 1,
  enhancement: 2,
};

const groupedMaterials = computed(() => {
  if (!character.value?.materials) return {};

  return usageOrder.reduce((acc, type) => {
    acc[type] = character.value.materials
      .filter((m) => m.usage_type === type)
      .map((m) => ({
        ...m,
        amount: type === "character_talent" ? m.amount * 3 : m.amount,
      }))
      .sort((a, b) => {
        const prioA = categoryPriority[a.material.category] ?? 99;
        const prioB = categoryPriority[b.material.category] ?? 99;

        // different priority groups: gems before insignias before "everything else"
        if (prioA !== prioB) return prioA - prioB;

        // same priority group (both gems, or both insignias): sort by rarity ascending
        if (prioA !== 99) return a.material.rarity - b.material.rarity;

        // both fall in "everything else": leave as-is (stable sort preserves original order)
        return 0;
      });
    return acc;
  }, {});
});

const groupedStats = computed(() => {
  const groups = { sands: [], goblet: [], circlet: [], substat: [] };
  for (const s of character.value.stats) {
    groups[s.slot]?.push(s);
  }
  groups.substat.sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0));
  return groups;
});
</script>
