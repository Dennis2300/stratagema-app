<template>
  <header class="px-2 md:px-0">
    <figure
      class="relative w-full h-48 overflow-hidden rounded-2xl border-2 border-white/25"
    >
      <img
        class="w-full h-full object-cover object-center"
        src="https://act-upload.hoyoverse.com/event-ugc-hoyowiki/2026/06/30/237301566/c029e8b74f0a08c1f9c105a33d920256_1477983527310349538.png?x-oss-process=image%2Fformat%2Cwebp"
        alt=""
      />
      <div class="absolute top-0 left-0 w-full h-full bg-black/75"></div>
      <div
        class="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center"
      >
        <h1>Weapons Archive</h1>
        <p>Explore the complete collection of weapons you can equip.</p>
      </div>
    </figure>
  </header>

  <div class="my-4 flex flex-col md:flex-row justify-center items-center gap-4">
    <select class="select">
      <option selected disabled>Rarity</option>
    </select>
    <select class="select">
      <option selected disabled>Type</option>
    </select>
    <select class="select">
      <option selected disabled>Attribute</option>
    </select>
  </div>

  <article>
    <div
      v-if="weaponsLoading"
      class="flex justify-center items-center h-50 md:h-100"
    >
      <span class="loading loading-xl scale-175"></span>
    </div>

    <div
      v-else-if="weaponsError"
      class="flex justify-center items-center h-50 md:h-100"
    >
      <p>{{ weaponsError }}</p>
    </div>

    <div v-else>
      <div class="px-2 md:px-0">
        <!-- Mobile: card list -->
        <div class="grid grid-cols-1 gap-3 md:hidden">
          <div
            v-for="weapon in weapons"
            :key="weapon.id"
            class="card card-side bg-base-100 shadow-sm border border-base-300"
          >
            <figure class="w-20 shrink-0 p-2">
              <img
                :src="weapon.img_url"
                :alt="weapon.name"
                class="w-full h-auto mask mask-squircle"
                :class="{
                  'rarity-5': weapon.rarity === 5,
                  'rarity-4': weapon.rarity === 4,
                  'rarity-3': weapon.rarity === 3,
                }"
              />
            </figure>

            <div class="card-body p-3 gap-1">
              <h4 class="font-semibold truncate">{{ weapon.name }}</h4>
              <div class="leading-none">
                <span
                  v-for="n in weapon.rarity"
                  :key="n"
                  class="text-yellow-500"
                  >★</span
                >
              </div>

              <div class="text-sm text-base-content/70">
                {{ weapon.weapon_type_id.name }}
              </div>
              <div class="text-sm">
                ATK:
                <span class="text-base-content">{{ weapon.base_atk }}</span>
              </div>
              <div class="text-sm">
                {{ weapon.stat }}:
                <span class="text-base-content">{{ weapon.stat_value }}</span>
              </div>

              <div class="card-actions justify-end mt-1">
                <button class="btn btn-xs btn-accent">Details</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Desktop: table -->
        <div class="hidden md:block overflow-x-auto">
          <table class="table table-zebra">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Type</th>
                <th>Base ATK</th>
                <th>Stat</th>
                <th>DETAILS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="weapon in weapons" :key="weapon.id">
                <td class="w-24">
                  <img
                    :src="weapon.img_url"
                    :alt="weapon.name"
                    class="w-full h-auto mask mask-squircle"
                    :class="{
                      'rarity-5': weapon.rarity === 5,
                      'rarity-4': weapon.rarity === 4,
                      'rarity-3': weapon.rarity === 3,
                    }"
                  />
                </td>
                <td class="w-100">
                  <h4 class="truncate w-100">{{ weapon.name }}</h4>
                  <span
                    v-for="n in weapon.rarity"
                    :key="n"
                    class="text-yellow-500 leading-none"
                    >★</span
                  >
                </td>
                <td>{{ weapon.weapon_type_id.name }}</td>
                <td>
                  ATK:
                  <span class="text-base-content">{{ weapon.base_atk }}</span>
                </td>
                <td>
                  {{ weapon.stat }}:
                  <span class="text-base-content">{{ weapon.stat_value }}</span>
                </td>
                <td>
                  <button class="btn btn-sm btn-accent">Details</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="hasMore" class="flex justify-center items-center mt-6">
        <button
          :disabled="loadingMore"
          @click="loadMoreWeapons"
          class="btn btn-info"
        >
          <span v-if="loadingMore" class="loading loading-xs"></span>
          {{ loadingMore ? "Loading..." : "Load more" }}
        </button>
      </div>

      <div v-else role="alert" class="alert alert-warning mt-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span>You have reached the bottom. No more weapons.</span>
      </div>
    </div>
  </article>
</template>

<script setup>
const supabase = useSupabaseClient();

const pageSize = 10;
const weapons = ref([]);
const currentPage = ref(0);
const totalCount = ref(0);
const weaponsLoading = ref(false);
const loadingMore = ref(false);
const weaponsError = ref(null);

async function fetchWeapons(page, { append = false } = {}) {
  if (append) {
    loadingMore.value = true;
  } else {
    weaponsLoading.value = true;
  }
  weaponsError.value = null;

  const from = page * pageSize;
  const to = from + pageSize - 1;

  try {
    const { data, error, count } = await supabase
      .schema("genshin_impact")
      .from("weapons")
      .select("*, weapon_type_id(*)", { count: "exact" })
      .order("name", { ascending: true })
      .range(from, to);

    if (error) throw error;

    weapons.value = append ? [...weapons.value, ...data] : data;
    totalCount.value = count;
    currentPage.value = page;
  } catch (error) {
    weaponsError.value = error.message;
  } finally {
    weaponsLoading.value = false;
    loadingMore.value = false;
  }
}

function getFirstTenWeapons() {
  return fetchWeapons(0);
}

function loadMoreWeapons() {
  if (hasMore.value && !loadingMore.value) {
    return fetchWeapons(currentPage.value + 1, { append: true });
  }
}

const hasMore = computed(() => weapons.value.length < totalCount.value);

// initial load
getFirstTenWeapons();
</script>
