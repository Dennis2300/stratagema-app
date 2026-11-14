<template>
  <section class="max-w-7xl mx-auto pt-24 px-4 md:px-0">
    <figure
      class="relative h-48 w-full overflow-hidden border border-white/25 rounded-lg"
    >
      <img
        class="w-full h-full object-center object-cover"
        src="https://act-upload.hoyoverse.com/event-ugc-hoyowiki/2026/06/30/237301566/c029e8b74f0a08c1f9c105a33d920256_1477983527310349538.png?x-oss-process=image%2Fformat%2Cwebp"
        alt="Stratagema"
      />
      <div class="absolute top-0 left-0 w-full h-full bg-black/66"></div>
      <figcaption
        class="absolute top-0 left-0 h-full w-full flex flex-col justify-center items-center text-center"
      >
        <h1>Weapons Archive</h1>
        <p class="text-sm my-2">
          Explore the complete collection of weapons you can equip.
        </p>
      </figcaption>
    </figure>
  </section>

  <article class="max-w-7xl mx-auto px-4 md:px-0 mb-16">
    <header class="flex items-center gap-3 my-6 border-b border-white/25">
      <div class="w-1 rounded-full h-9 bg-primary"></div>
      <h2 class="">Equippable Weapons</h2>
    </header>

    <section>
      <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th>Name</th>
              <th class="hidden md:table-cell">Base Attack</th>
              <th class="hidden md:table-cell">Stat</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="weapon in weapons">
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="mask mask-squircle h-16 w-16">
                      <img
                        :src="weapon.img_url"
                        :alt="weapon.name"
                        :class="`rarity-${weapon.rarity}`"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">{{ weapon.name }}</div>
                    <div class="text-sm">
                      <span
                        class="text-yellow-500 leading-none"
                        v-for="n in weapon.rarity"
                        :key="n"
                        >★</span
                      >
                    </div>
                  </div>
                </div>
              </td>
              <td class="text-white/90 hidden md:table-cell">
                Base ATK:
                <span class="text-info">{{ weapon.base_atk }}</span>
              </td>
              <td class="text-white/90 hidden md:table-cell">
                {{ weapon.stat.replace("%", "") }}:
                <span class="text-info">
                  {{ weapon.stat_value
                  }}{{ weapon.stat === "Elemental Mastery" ? "" : "%" }}
                </span>
              </td>
              <th>
                <NuxtLink
                  :to="`/weapons/${weapon.id}-${slugify(weapon.name)}`"
                  class="btn btn-primary btn-sm"
                >
                  Details
                </NuxtLink>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </article>
</template>

<script setup>
const supabase = useSupabaseClient();

const types = ref([
  { id: 1, name: "Sword" },
  { id: 2, name: "Claymore" },
  { id: 3, name: "Bow" },
  { id: 4, name: "Catalyst" },
  { id: 5, name: "Polearm" },
]);

const stats = ref([
  { name: "ATK" },
  { name: "ATK%" },
  { name: "DEF" },
  { name: "DEF%" },
  { name: "HP" },
  { name: "HP%" },
  { name: "Elemental Mastery" },
  { name: "Energy Recharge" },
  { name: "Healing Bonus" },
  { name: "CRIT Rate" },
  { name: "CRIT DMG" },
  { name: "Pyro DMG Bonus" },
  { name: "Anemo DMG Bonus" },
  { name: "Cryo DMG Bonus" },
  { name: "Hydro DMG Bonus" },
  { name: "Geo DMG Bonus" },
  { name: "Electro DMG Bonus" },
  { name: "Dendro DMG Bonus" },
  { name: "Physical DMG Bonus" },
  { name: "CRIT Rate/CRIT DMG" },
  { name: "EM" },
]);

const {
  data: weapons,
  pending,
  error,
} = useAsyncData("weapons", async () => {
  const { data, error } = await supabase
    .schema("genshin_impact")
    .from("weapons")
    .select(
      "id, name, rarity, weapon_type_id(id,name), stat, stat_value, base_atk, img_url",
    )
    .order("name", { ascending: true });
  if (error) throw error;

  return data;
});
</script>
