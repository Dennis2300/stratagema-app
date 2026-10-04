<template>
  <div class="flex flex-col justify-center items-center gap-4">
    <img
      class="w-32 h-32"
      src="https://act-upload.hoyoverse.com/event-ugc-hoyowiki/2025/11/17/35428890/b6153550f3f0257394a1d55aa3a7638d_6266986972528057193.png?x-oss-process=image%2Fformat%2Cwebp"
    />
    <h1>Something went wrong!</h1>
    <div role="alert" class="alert alert-error">
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
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{{ error.message }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  error: {
    type: Error,
  },
});
</script>
