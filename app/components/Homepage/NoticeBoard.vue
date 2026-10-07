<template>
  <article
    class="h-screen flex flex-col items-center"
    style="
      background: radial-gradient(ellipse at top, #1b2735 0%, #090a0f 100%);
    "
  >
    <h2 class="mt-8">Notice Board</h2>
    <p class="text-sm text-white/50 text-center md:text-start">
      Stay informed about website maintenance, downtime, and other important
      updates.
    </p>

    <div v-if="pending" class="mt-12">
      <span class="loading loading-xl scale-200"></span>
    </div>

    <div v-else-if="error" class="mt-12 text-center space-y-4">
      <h3>Sorry about that, but something went wrong</h3>
      <p class="badge badge-error">{{ error.message }}</p>
    </div>

    <section v-else-if="posts" class="pt-4">
      <div
        v-for="post in posts"
        :key="post.id"
        class="bg-base-300 p-6 md:w-7xl border border-white/25 rounded-xl"
      >
        <div class="flex flex-col md:flex-row justify-between md:items-center">
          <h3>{{ post.title }}</h3>
          <NuxtTime
            class="text-white/50"
            :datetime="post.created_at"
            month="short"
            day="numeric"
            year="numeric"
          />
        </div>
        <div class="divider mt-0 mb-2"></div>
        <p>{{ post.content }}</p>
      </div>
    </section>

    <div v-else>
      <EmptyFallback />
    </div>
  </article>
</template>

<script setup>
const supabase = useSupabaseClient();

const {
  data: posts,
  pending,
  error,
} = useAsyncData("posts", async () => {
  const { data, error } = await supabase
    .schema("genshin_impact")
    .from("announcements")
    .select("*");
  if (error) throw error;
  return data;
});
</script>
