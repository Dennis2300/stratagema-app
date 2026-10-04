<template>
  <h2 class="text-center mt-8">Notice Board</h2>
  <p class="text-center text-sm text-white/50">
    Stay informed about website maintenance, downtime, and other important
    updates.
  </p>
  <article class="min-h-100 pt-6">
    <div v-if="pending" class="flex justify-center items-center">
      <span class="loading loading-xl"></span>
    </div>
    <div v-else-if="error" class="text-center space-y-3">
      <h3>Sorry about that, but something went wrong</h3>
      <p class="badge badge-error">{{ error.message }}</p>
    </div>
    <section
      v-else-if="posts"
      class="flex flex-col items-center space-y-4 mb-8"
    >
      <div
        v-for="post in posts"
        class="bg-base-300 max-w-7xl p-4 rounded-xl border border-white/25"
      >
        <div class="flex justify-between items-center">
          <h3>{{ post.title }}</h3>
          <NuxtTime
            class="text-white/80"
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
