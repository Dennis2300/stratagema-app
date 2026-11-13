<template>
  <article
    class="h-screen"
    style="
      background: radial-gradient(ellipse at top, #1b2735 0%, #090a0f 100%);
    "
  >
    <h2 class="text-center">Notice Board</h2>
    <p class="text-sm text-white/75 text-center">
      Stay informed about website maintenance, downtime, and other important
      updates.
    </p>

    <div v-if="pending" class="h-24 flex justify-center items-center">
      <span class="loading loading-xl"></span>
    </div>

    <div v-else-if="error" class="mt-8">
      <ErrorMessage :error="error" />
    </div>

    <section v-else-if="posts" class="max-w-7xl mx-auto mt-4">
      <div
        v-for="post in posts"
        :key="post.id"
        class="bg-base-200 p-4 border border-white/25 rounded-lg"
      >
        <div class="flex justify-between items-end border-b border-white/25 mb-4">
          <h3>{{ post.title }}</h3>
          <NuxtTime
            class="text-white/50"
            :datetime="post.created_at"
            month="short"
            day="numeric"
            year="numeric"
          />
        </div>
        <p>{{ post.content }}</p>
      </div>
    </section>
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
