<template>
  <div class="flex flex-col justify-center items-center">
    <h1>ERROR!</h1>
    <img
      src="https://act-upload.hoyoverse.com/event-ugc-hoyowiki/2025/11/17/35428890/b6153550f3f0257394a1d55aa3a7638d_6266986972528057193.png?x-oss-process=image%2Fformat%2Cwebp"
    />
    <p>{{ error?.message }}</p>
  </div>
</template>

<script setup>
defineProps({
  error: {
    type: Error,
  },
});
</script>
