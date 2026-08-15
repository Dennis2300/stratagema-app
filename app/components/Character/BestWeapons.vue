<template>
  <section
    class="flex-2 h-fit rounded-lg border border-white/25 bg-base-200 px-6 py-5 shadow-lg"
  >
    <!-- Header -->
    <div class="mb-5 flex items-center gap-3">
      <div class="h-12 w-1 rounded-full bg-primary"></div>

      <div>
        <h2 class="font-bold tracking-wide">Best Weapons</h2>

        <p class="text-xs text-white/50">
          Recommended weapons for this character
        </p>
      </div>
    </div>

    <div class="space-y-3">
      <NuxtLink
        v-for="weapon in weapons"
        :key="weapon.id"
        class="group flex items-center gap-4 rounded-lg border border-base-300 bg-base-100 p-3 transition-all duration-200 hover:border-primary/50 hover:bg-base-300 hover:shadow-md hover:cursor-pointer"
      >
        <div class="relative shrink-0 overflow-hidden rounded-lg">
          <img
            :src="weapon.weapon_id.img_url"
            :alt="weapon.weapon_id.name"
            class="h-16 w-16 object-cover"
            :class="{
              'rarity-5': weapon.weapon_id.rarity === 5,
              'rarity-4': weapon.weapon_id.rarity === 4,
              'rarity-3': weapon.weapon_id.rarity === 3,
            }"
          />
        </div>

        <div class="min-w-0 flex-1">
          <h3
            class="truncate font-semibold text-base-content transition-colors group-hover:text-primary"
          >
            {{ weapon.weapon_id.name }}
          </h3>

          <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs">
            <div class="flex items-center gap-1">
              <span class="text-base-content/40">Stat</span>
              <span class="font-medium text-base-content/80">
                {{ weapon.weapon_id.stat }}
              </span>
            </div>

            <div class="flex items-center gap-1">
              <span class="text-base-content/40">Value</span>
              <span class="font-medium text-primary">
                {{ weapon.weapon_id.stat_value }}
              </span>
            </div>
          </div>
        </div>

        <div
          class="hidden text-base-content/30 transition-all duration-200 group-hover:translate-x-1 group-hover:text-primary sm:block"
        >
          →
        </div>
      </NuxtLink>
    </div>

    <div
      v-if="weapons.length === 0"
      class="rounded-lg border border-dashed border-base-300 bg-base-100 px-4 py-8 text-center"
    >
      <p class="text-sm text-base-content/50">No recommended weapons found.</p>
    </div>
  </section>
</template>

<script setup>
defineProps({
  weapons: {
    type: Array,
    default: () => [],
  },
});
</script>
