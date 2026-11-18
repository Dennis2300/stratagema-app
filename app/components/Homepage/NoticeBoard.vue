<template>
  <section class="relative z-10 mt-12">
    <h2 class="text-center">Notice Board</h2>
    <p class="text-sm text-white/75 text-center">
      Stay informed about website maintenance, downtime, and other important
      updates.
    </p>
    <div v-if="pending" class="h-24 flex justify-center items-center">
      <span class="loading loading-xl"></span>
    </div>

    <div v-else-if="error" class="mt-12">
      <ErrorMessage :error="error" />
    </div>

    <section v-else-if="posts" class="max-w-7xl mx-auto mt-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div v-for="post in posts" :key="post.id" class="bg-base-200 p-4 border border-white/25">
          <NuxtTime
            class="text-white/50 text-xs"
            :datetime="post.created_at"
            month="short"
            day="numeric"
            year="numeric"
          />
          <p class="border-b border-white/50">{{ post.title }}</p>
          <p class="text-sm pt-2 text-white/75">{{ post.content }}</p>
        </div>
      </div>
    </section>

    <div v-else>
      <EmptyFallback />
    </div>
  </section>
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
