<template>
  <article class="bg-base-300 p-4 rounded-xl border border-white/25">
    <h2 class="divider">Notice Board</h2>
    <p class="text-sm text-center text-white/33">
      Stay informed about website maintenance, downtime, and other important
      updates.
    </p>
    <section v-if="pending" class="flex justify-center items-center h-75">
      <span class="loading loading-xl scale-200"></span>
    </section>
    <section
      v-else-if="error"
      class="flex flex-col justify-center items-center h-75"
    >
      <h3>Sorry about that, but something went wrong</h3>
      <p>{{ error.message }}</p>
    </section>
    <section v-else-if="posts" class="space-y-6 mt-4">
      <div
        v-for="post in posts"
        :key="post.id"
        class="bg-base-100 p-4 rounded-xl"
      >
        <div class="flex justify-between items-center">
          <h3 class="text-base-content">{{ post.title }}</h3>
          <NuxtTime
            class="text-white/80"
            :datetime="post.created_at"
            month="short"
            day="numeric"
            year="numeric"
          />
        </div>
        <div class="divider divider-secondary m-0"></div>
        <p class="text-white/75">{{ post.content }}</p>
      </div>
    </section>
    <section v-else class="text-center text-red-700">
      <p>Nothing to show here yet...</p>
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
