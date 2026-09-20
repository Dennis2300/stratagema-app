<template>
  <div
    @mouseenter="showPopup = true"
    @mouseleave="showPopup = false"
    class="w-fit"
  >
    <p class="text-lg font-semibold hover:cursor-pointer hover:underline">
      {{ dish.name }}
    </p>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div
        v-if="showPopup"
        class="absolute top-4 right-4 z-10 w-100 rounded-lg bg-base-100 p-4 shadow-xl border border-white/25"
      >
        <figure class="flex items-center gap-3">
          <img
            class="h-16 w-16 rounded-md object-cover"
            :src="dish.img_url"
            :alt="dish.name"
            :class="{
              'rarity-5': dish.rarity === 5,
              'rarity-4': dish.rarity === 4,
              'rarity-3': dish.rarity === 3,
              'rarity-2': dish.rarity === 2,
              'rarity-1': dish.rarity === 1,
            }"
          />
          <figcaption>
            <h4 class="font-semibold leading-tight">{{ dish.name }}</h4>
          </figcaption>
        </figure>

        <p
          class="mt-2 text-xs font-medium uppercase tracking-wide text-base-content"
        >
          {{ dish.utility }}
        </p>
        <div class="divider m-0"></div>
        <p class="text-xs leading-relaxed text-white/60">
          {{ dish.description }}
        </p>
      </div>
    </Transition>
  </div>
</template>

<script setup>
defineProps({
  dish: {
    type: Object,
    required: true,
  },
});

const showPopup = ref(false);
</script>
