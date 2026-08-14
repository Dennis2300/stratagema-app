<template>
  <header>
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
  <article>
    <div v-if="pending" class="text-center py-6">
      <span class="loading loading-spinner loading-xl"></span>
    </div>

    <div v-else-if="error">
      <p>{{ error.message }}</p>
    </div>

    <table class="table table-zebra w-full">
      <thead>
        <tr class="text-base">
          <th class="w-20"></th>
          <th class="min-w-48">Name</th>
          <th class="w-32">Type</th>
          <th class="w-32">Stat</th>
          <th class="w-32">Stat Value</th>
          <th class="min-w-64">Description</th>
          <th class="w-28"></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="weapon in weapons" :key="weapon.id">
          <td>
            <figure class="size-16">
              <img
                :src="weapon.img_url"
                :alt="weapon.name"
                class="size-16 mask mask-squircle object-cover"
                :class="{
                  'rarity-5': weapon.rarity === 5,
                  'rarity-4': weapon.rarity === 4,
                }"
              />
            </figure>
          </td>

          <td>
            <div class="flex flex-col gap-1">
              <p class="max-w-64 truncate text-lg font-medium">
                {{ weapon.name }}
              </p>

              <div class="leading-none text-yellow-500">
                <span v-for="n in weapon.rarity" :key="n">★</span>
              </div>
            </div>
          </td>

          <td>
            <span class="whitespace-nowrap">
              {{ weapon.weapon_type_id.name }}
            </span>
          </td>

          <td>
            <span class="whitespace-nowrap">
              {{ weapon.stat }}
            </span>
          </td>

          <td>
            <span class="whitespace-nowrap font-medium">
              {{ weapon.stat_value }}
            </span>
          </td>

          <td>
            <p class="max-w-64 truncate">
              {{ weapon.description }}
            </p>
          </td>

          <td class="text-right">
            <NuxtLink
              :to="`/weapons/${weapon.id}-${slugify(weapon.name)}`"
              class="btn btn-xs btn-primary"
            >
              Details →
            </NuxtLink>
          </td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<script setup>
const supabase = useSupabaseClient();

const {
  data: weapons,
  pending,
  error,
} = useAsyncData("weapons", async () => {
  const { data, error } = await supabase
    .schema("genshin_impact")
    .from("weapons")
    .select("*, weapon_type_id(*)");
  if (error) throw error;
  return data;
});
</script>
