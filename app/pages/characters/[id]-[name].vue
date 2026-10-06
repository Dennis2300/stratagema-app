<template>
  <Navbar class="fixed top-0 z-50" />

  <div
    v-if="characterLoading"
    class="h-screen flex justify-center items-center"
  >
    <span class="loader"></span>
  </div>

  <div
    v-else-if="characterError"
    class="h-screen flex justify-center items-center"
  >
    <ErrorMessage :error="characterError" />
  </div>

  <article v-else-if="character" class="min-h-screen pt-24">
    <!-- Splash Art Background -->
    <div
      class="fixed inset-0 -z-10 bg-no-repeat bg-center blur-xs opacity-25 md:opacity-50"
      :style="{ backgroundImage: `url(${character.splash_art_url})` }"
    />

    <div class="max-w-7xl mx-auto space-y-8 mb-12">
      <!-- Header -->
      <section class="flex flex-col md:flex-row md:justify-between gap-3">
        <!-- Avatar -->
        <div class="flex flex-col items-center md:flex-row gap-3">
          <figure class="relative">
            <img
              class="absolute -top-2 -left-2 w-10 bg-gray-700 rounded-full border border-white/50"
              :src="character.vision.img_url"
              alt=""
            />
            <img
              class="rounded-full w-32 h-32"
              :class="{
                'rarity-5': character.rarity === 5,
                'rarity-4': character.rarity === 4,
              }"
              :src="character.img_url"
              alt=""
            />
          </figure>
          <div class="flex flex-col items-center md:items-start">
            <span class="italic text-white/50">"{{ character.title }}"</span>
            <h1>{{ character.name }}</h1>
            <div class="flex flex-wrap items-center gap-2 mt-2">
              <span class="badge badge-neutral badge-sm">{{
                character.vision.name
              }}</span>
              <span class="h-1 w-1 rounded-full bg-white"></span>
              <span class="badge badge-neutral badge-sm">{{
                character.weapon_type.name
              }}</span>
              <span class="h-1 w-1 rounded-full bg-white"></span>
              <span class="badge badge-neutral badge-sm">{{
                character.role
              }}</span>
              <span class="h-1 w-1 rounded-full bg-white"></span>
              <span class="badge badge-neutral badge-sm">{{
                character.main_stat
              }}</span>
            </div>
          </div>
        </div>
        <!-- Voice Actors -->
        <div class="space-y-3 mx-2 text-xs">
          <div class="flex items-center gap-3">
            <div class="h-6 w-1 rounded-full bg-white"></div>
            <h6>Voice Actors</h6>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-1.5 md:gap-3">
            <dl
              v-for="voiceActor in sortedVoiceActors"
              :key="voiceActor.language"
              class="bg-base-300/90 flex gap-4 justify-between p-4 border border-white/25 rounded-md"
            >
              <dt>{{ voiceActor.language }}</dt>
              <dd>
                <template
                  v-for="(actor, index) in voiceActor.actors"
                  :key="actor.id"
                >
                  <a
                    :href="actor.link"
                    target="_blank"
                    class="hover:underline hover:text-warning transition duration-100"
                  >
                    {{ actor.name }}
                  </a>
                  <span
                    v-if="index < voiceActor.actors.length - 1"
                    class="text-white/60"
                    >&</span
                  >
                </template>
              </dd>
            </dl>
          </div>
        </div>
      </section>

      <!-- Dossier -->
      <section class="px-4 md:px-0">
        <span class="text-xs text-white/50 italic"> Character Profile</span>
        <div class="flex items-center gap-2 mb-2">
          <div class="h-9 w-1 rounded-full bg-white"></div>
          <h2>Dossier</h2>
        </div>

        <div
          class="stats stats-vertical bg-base-300/90 w-full shadow md:stats-horizontal"
        >
          <div class="stat">
            <div class="stat-title">Rarity</div>
            <div class="stat-value text-yellow-400">
              {{ "★".repeat(character.rarity) }}
            </div>
            <div class="stat-desc">{{ character.rarity }} Star</div>
          </div>

          <div class="stat">
            <div class="stat-title">Constellation</div>
            <div class="stat-value italic">{{ character.constellation }}</div>
            <div class="stat-desc">{{ character.constellation }}</div>
          </div>

          <div class="stat">
            <div class="stat-title">Birthday</div>
            <div class="stat-value">{{ character.birthday }}</div>
            <div class="stat-desc">Month/Day</div>
          </div>

          <div class="stat">
            <div class="stat-title">Team Role</div>
            <div class="stat-value">{{ character.role }}</div>
            <div class="stat-desc">
              {{ character.vision.name }} {{ character.role }}
            </div>
          </div>

          <div class="stat">
            <div class="stat-title">Release Date</div>
            <div class="stat-value">
              <NuxtTime
                :datetime="character.release_date"
                month="short"
                day="numeric"
                year="numeric"
              />
            </div>
            <div class="stat-desc">
              <NuxtTime
                :datetime="character.release_date"
                month="long"
                day="numeric"
                year="numeric"
              />
            </div>
          </div>
        </div>

        <div
          v-if="character.special_dish"
          class="stats stats-vertical bg-base-300/90 w-full shadow md:stats-horizontal mt-1.5"
        >
          <div class="stat">
            <div class="stat-title">Signature Dish</div>

            <div class="stat-figure text-secondary">
              <div class="avatar">
                <div class="w-16 rounded-2xl">
                  <img
                    :src="character.special_dish.img_url"
                    :alt="character.special_dish.name"
                    :class="`rarity-${character.special_dish.rarity}`"
                  />
                </div>
              </div>
            </div>

            <div class="stat-value">{{ character.special_dish.name }}</div>

            <div class="stat-desc text-info">
              {{ character.special_dish.utility }} Star
            </div>

            <div>
              <div class="divider m-0"></div>
              <p class="text-xs text-white/50 w-full">
                {{ character.special_dish.description }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Waepons -->
      <section class="px-4 md:px-0">
        <span class="text-xs text-white/50 italic"
          >Best weapons for {{ character.name }}</span
        >
        <div class="flex items-center gap-2 mb-2">
          <div class="h-9 w-1 rounded-full bg-white"></div>
          <h2>Best Weapons</h2>
        </div>

        <div class="min-h-[25vh] space-y-3">
          <div
            v-for="w in sortedWeapons"
            :key="w.weapon.id"
            class="bg-base-300/90 rounded-lg p-4"
          >
            <figure class="flex items-center gap-3">
              <img
                class="w-20 h-20 mask mask-squircle"
                :class="`rarity-${w.weapon.rarity}`"
                :src="w.weapon.img_url"
                :alt="w.weapon.name"
              />
              <figcaption>
                <p class="md:text-xl font-bold">{{ w.weapon.name }}</p>
                <div class="space-x-2">
                  <span class="badge badge-sm badge-accent">
                    Stat: {{ w.weapon.stat }}
                  </span>
                  <span class="badge badge-sm badge-warning">
                    Value: {{ w.weapon.stat_value }}
                  </span>
                </div>
              </figcaption>
            </figure>
            <div v-if="w.details">
              <div class="divider" />
              <p>{{ w.details }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Builds -->
      <section class="px-4 md:px-0">
        <span class="text-xs text-white/50 italic"
          >Recommended builds for {{ character.name }}</span
        >
        <div class="flex items-center gap-2 mb-2">
          <div class="h-9 w-1 rounded-full bg-white"></div>
          <h2>Build(s)</h2>
        </div>

        <div class="min-h-[45vh] bg-base-300/90 p-4 rounded-lg">
          <h4 class="divider">Artifact Main Stats</h4>

          <div class="flex justify-center items-center">
            <div class="stats stats-vertical md:stats-horizontal shadow">
              <!-- Sands -->
              <div class="stat" v-if="groupedStats.sands.length">
                <div class="stat-figure text-secondary">
                  <div class="avatar">
                    <div class="w-16 rounded-full">
                      <img
                        class="flex justify-center items-center"
                        src="/imgs/sands.webp"
                        alt="Sands"
                      />
                    </div>
                  </div>
                </div>
                <div class="stat-value">Sands</div>
                <div
                  class="stat-desc text-info text-base max-w-64 whitespace-normal"
                >
                  {{ groupedStats.sands.map((s) => s.stat).join(" or ") }}
                </div>
              </div>
              <!-- Goblet -->
              <div class="stat" v-if="groupedStats.goblet.length">
                <div class="stat-figure text-secondary">
                  <div class="avatar">
                    <div class="w-16 rounded-full">
                      <img
                        class="flex justify-center items-center"
                        src="/imgs/goblet.webp"
                        alt="Sands"
                      />
                    </div>
                  </div>
                </div>
                <div class="stat-value">Goblet</div>
                <div
                  class="stat-desc text-info text-base max-w-64 whitespace-normal"
                >
                  {{ groupedStats.goblet.map((s) => s.stat).join(" or ") }}
                </div>
              </div>
              <!-- Circlet -->
              <div class="stat" v-if="groupedStats.circlet.length">
                <div class="stat-figure text-secondary">
                  <div class="avatar">
                    <div class="w-16 rounded-full">
                      <img
                        class="flex justify-center items-center"
                        src="/imgs/circlet.webp"
                        alt="Sands"
                      />
                    </div>
                  </div>
                </div>
                <div class="stat-value">Circlet</div>
                <div
                  class="stat-desc text-info text-base max-w-64 whitespace-normal"
                >
                  {{ groupedStats.circlet.map((s) => s.stat).join(" or ") }}
                </div>
              </div>
            </div>
          </div>

          <!-- Desktop -->
          <div v-if="groupedStats.substat.length" class="hidden md:block">
            <h4 class="divider">Substats</h4>
            <div class="breadcrumbs px-auto">
              <ul class="justify-center">
                <li v-for="(s, i) in groupedStats.substat" :key="s.id">
                  {{ s.stat }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Mobile -->
          <div v-if="groupedStats.substat.length" class="md:hidden">
            <h4 class="divider mt-6">Substats</h4>
            <ol>
              <li v-for="(s, i) in groupedStats.substat" :key="s.id">
                <span class="font-bold">{{ i + 1 }}.</span> {{ s.stat }}
              </li>
            </ol>
          </div>

          <h4 class="divider md:px-32 mt-6">Artifacts</h4>
          <div
            v-if="buildsLoading"
            class="h-50 flex justify-center items-center"
          >
            <span class="loading loading-xl"></span>
          </div>
          <ErrorMessage v-else-if="buildsError" :error="buildsError" />

          <div
            v-else-if="builds"
            v-for="build in builds"
            :key="build.id"
            class="mb-8"
          >
            <h5>{{ build.title }}</h5>
            <div
              v-for="piece in build.build_artifact"
              :key="piece.id"
              class="mb-2"
            >
              <div class="flex gap-3">
                <img
                  :src="piece.artifact_id.flower_img_url"
                  :alt="piece.artifact_id.name"
                  class="w-20 h-20 rounded-xl rarity-5"
                />
                <div>
                  <span
                    class="badge badge-neutral badge-xs border border-white/50"
                  >
                    {{ piece.piece_count }} Piece
                  </span>
                  <p class="text-lg font-bold text-info">
                    {{ piece.artifact_id.name }}
                  </p>
                  <div
                    v-if="piece.piece_count === 4"
                    class="text-xs text-white/66 space-y-1"
                  >
                    <p>
                      {{ piece.artifact_id.two_piece_bonus_id.name }}
                    </p>
                    <p>
                      {{ piece.artifact_id.four_piece_bonus }}
                    </p>
                  </div>
                  <p
                    v-if="piece.piece_count === 2"
                    class="text-xs text-white/66"
                  >
                    {{ piece.artifact_id.two_piece_bonus_id.name }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Teams -->
      <section class="px-4 md:px-0" v-if="character.teams.length > 0">
        <span class="text-xs text-white/50 italic"
          >Possible Team Comps for {{ character.name }}</span
        >
        <div class="flex items-center gap-2 mb-2">
          <div class="h-9 w-1 rounded-full bg-white"></div>
          <h2>Teams</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div
            v-for="team in sortTeams(character.teams)"
            :key="team.id"
            class="bg-base-300/90 p-4 rounded-xl"
          >
            <div class="flex justify-between items-center">
              <p class="font-bold">{{ team.name }}</p>
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

      <!-- Materials -->
      <section class="px-4 md:px-0">
        <span class="text-xs text-white/50 italic">
          All Materials for {{ character.name }} LvL. 90 & Max Talents
        </span>
        <div class="flex items-center gap-2 mb-2">
          <div class="h-9 w-1 rounded-full bg-white"></div>
          <h2>Materials</h2>
        </div>

        <div
          v-for="(items, type) in groupedMaterials"
          :key="type"
          class="bg-base-300/90 mb-4 min-h-50 p-4"
        >
          <h3 class="divider divider-start capitalize">
            {{ type.replaceAll("_", " ") }}
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-y-4">
            <div v-for="item in items" :key="item.id">
              <figure class="flex items-center gap-3">
                <img
                  :src="item.material.img_url"
                  :class="`rarity-${item.material.rarity}`"
                  class="w-16 h-16 mask mask-squircle"
                />
                <figcaption>
                  <p class="max-w-56 truncate">{{ item.material.name }}</p>
                  <span class="badge badge-info badge-sm">
                    ×{{ item.amount.toLocaleString() }}
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>
    </div>
  </article>

  <div v-else>
    <EmptyFallback />
  </div>
</template>

<script setup>
import MarkdownRender from "~/components/MarkdownRender.vue";

const supabase = useSupabaseClient();
const route = useRoute();

const param_id = route.params.id;

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
