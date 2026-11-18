<template>
  <HomepageHero />
  <article class="animated-bg border-t border-white/50 pt-24 pb-12">
    <div class="shooting-stars" aria-hidden="true">
      <div class="stars-left">
        <div v-for="i in 10" :key="'left-' + i" class="shooting-star"></div>
      </div>

      <div class="stars-right">
        <div v-for="i in 10" :key="'right-' + i" class="shooting-star"></div>
      </div>
    </div>
    <HomepageContent />
    <HomepageNoticeBoard />
  </article>
</template>
