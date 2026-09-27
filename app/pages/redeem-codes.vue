<template>
  <header>
    <figure
      class="relative w-full h-48 overflow-hidden rounded-2xl border-2 border-white/25"
    >
      <img
        class="w-full h-full object-cover object-center"
        src="https://act-upload.hoyoverse.com/event-ugc-hoyowiki/2024/09/30/237301566/41b650fe494d714eb5d65bcbb055daab_552786018036640071.png?x-oss-process=image%2Fformat%2Cwebp"
        alt=""
      />
      <div class="absolute top-0 left-0 w-full h-full bg-black/55"></div>
      <div
        class="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center"
      >
        <h1>Redeem Codes</h1>
        <p>
          Here you can find all meta, funny or creative team compositions to try
        </p>
      </div>
    </figure>
  </header>
  <div class="divider"></div>

  <article class="columns-1 md:columns-3 gap-4 space-y-4">
    <div
      v-for="redeem in redeem_codes"
      :key="redeem.code"
      class="card bg-base-200 shadow-sm break-inside-avoid"
    >
      <div class="card-body p-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium text-base-content/70">
            Redeem code
          </span>

          <a class="text-sm font-medium text-info/80 hover:underline" href=""
            >Code Link</a
          >
        </div>

        <div class="join w-full">
          <input
            :value="redeem.code"
            readonly
            class="input input-ghost join-item w-full bg-base-300 font-mono font-semibold tracking-[0.15em] select-text cursor-text focus:outline-none focus:ring-0"
          />

          <button
            class="btn btn-accent join-item"
            @click="copyCode(redeem.code)"
          >
            Copy
          </button>
        </div>

        <div class="mt-2 flex justify-between text-xs text-base-content/50">
          <span> Created {{ formatDate(redeem.created_at) }} </span>

          <span v-if="redeem.expires_at">
            Expires {{ formatDate(redeem.expires_at) }}
          </span>
        </div>
      </div>

      <div
        v-for="reward in redeem.rewards"
        :key="reward.item.id"
        class="flex justify-between items-center px-6 mb-4"
      >
        <figure class="flex gap-2">
          <img
            class="w-10 h-10 mask mask-squircle"
            :class="{
              'rarity-5': reward.item.rarity === 5,
              'rarity-4': reward.item.rarity === 4,
              'rarity-3': reward.item.rarity === 3,
              'rarity-2': reward.item.rarity === 2,
              'rarity-1': reward.item.rarity === 1,
            }"
            :src="reward.item.img_url"
            alt=""
          />
          <figcaption>
            <p>{{ reward.item.name }}</p>
          </figcaption>
        </figure>
        <p>x{{ reward.amount.toLocaleString() }}</p>
      </div>
    </div>
  </article>
</template>

<script setup>
const supabase = useSupabaseClient();

const {
  data: redeem_codes,
  pending,
  error,
} = useAsyncData("redeem_codes", async () => {
  const { data, error } = await supabase
    .schema("genshin_impact")
    .from("redeem_codes")
    .select("*, rewards:redeem_code_reward(id, item:reward_id(*), amount)")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data;
});

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
</script>
