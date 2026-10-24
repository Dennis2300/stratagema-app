<template>
  <Navbar class="fixed top-0 z-50" />

  <article class="max-w-7xl mx-auto min-h-screen py-24">
    <figure
      class="relative w-full h-48 overflow-hidden rounded-2xl border-2 border-white/25"
    >
      <img
        class="w-full h-full object-cover object-center"
        src="https://act-upload.hoyoverse.com/event-ugc-hoyowiki/2024/09/30/237301566/41b650fe494d714eb5d65bcbb055daab_552786018036640071.png?x-oss-process=image%2Fformat%2Cwebp"
      />
      <div class="absolute top-0 left-0 w-full h-full bg-black/75"></div>
      <div
        class="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center"
      >
        <h1>Redeem Codes</h1>
        <p>See all valid redeem codes for some Primogems</p>
      </div>
    </figure>

    <section class="max-w-3xl mx-auto space-y-6 mt-6">
      <div
        v-for="redeem in redeem_codes"
        :key="redeem.code"
        class="bg-base-300 p-4 h-fit border border-white/25 rounded-2xl"
      >
        <span
          v-if="redeem.is_livestream_code"
          class="badge badge-xs badge-warning mb-2"
          >Livestream Code</span
        >
        <span v-else class="badge badge-xs badge-warning mb-2">Promo Code</span>
        <div class="flex justify-between items-end">
          <div class="join">
            <input
              class="input input-primary font-mono tracking-widest select-text cursor-text focus:outline-none focus:ring-0"
              :value="redeem.code"
              readonly
            />
            <button
              class="btn btn-primary join-item"
              @click="copyCode(redeem.code)"
            >
              Copy
            </button>
          </div>
          <span v-if="redeem.expires_at" class="text-xs text-white/25">
            Expires {{ formatDate(redeem.expires_at) }}
          </span>
        </div>
        <div class="divider mt-1 mb-2"></div>
        <div class="space-y-3">
          <div
            v-for="reward in redeem.rewards"
            :key="reward.item.id"
            class="flex justify-between items-center"
          >
            <figure class="flex items-center gap-2">
              <img
                class="w-12 h-12 mask mask-squircle"
                :class="`rarity-${reward.item.rarity}`"
                :src="reward.item.img_url"
              />
              <figcaption>
                <p>{{ reward.item.name }}</p>
              </figcaption>
            </figure>
            <div>
              <span class="text-xs">x</span>
              <span class="text-warning">{{
                reward.amount.toLocaleString()
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </article>

  <div v-if="toast.show" class="toast toast-bottom toast-end z-50">
    <div class="alert alert-success" :class="`alert-${toast.type}`">
      <span>{{ toast.message }}</span>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient();
const toast = ref({ show: false, message: "", type: "success" });

const showToast = (message, type = "success") => {
  toast.value = { show: true, message, type };
  setTimeout(() => {
    toast.value.show = false;
  }, 2000);
};

const {
  data: redeem_codes,
  pending,
  error,
} = useAsyncData("redeem_codes", async () => {
  const { data, error } = await supabase
    .schema("genshin_impact")
    .from("redeem_codes")
    .select("*, rewards:redeem_code_reward(id, item:reward_id(*), amount)")
    .order("created_at", { ascending: false });
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

function copyCode(code) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(code)
      .then(() => showToast("Code copied to clipboard!"))
      .catch(() => showToast("Failed to copy code", "error"));
  } else {
    // Fallback for non-HTTPS / older browsers
    const textarea = document.createElement("textarea");
    textarea.value = code;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      showToast("Code copied to clipboard!");
    } catch (err) {
      showToast("Failed to copy code", "error");
    }
    document.body.removeChild(textarea);
  }
}
</script>
