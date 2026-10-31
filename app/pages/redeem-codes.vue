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
        <p>Use these redeem codes for some Primogems</p>
      </div>
    </figure>

    <div v-if="pending" class="h-100 flex justify-center items-center">
      <span class="loader"></span>
    </div>

    <div v-else-if="error" class="h-100 flex justify-center items-center">
      <ErrorMessage :error="error" />
    </div>

    <section
      v-else-if="redeem_codes"
      class="columns-1 md:columns-3 space-y-4 mt-8"
    >
      <div
        v-for="redeem in redeem_codes"
        :key="redeem.code"
        class="break-inside-avoid bg-base-300 p-4 h-fit border border-white/25 rounded-2xl"
      >
        <div class="flex justify-center items-end mt-4">
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-copy"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
                />
              </svg>
            </button>
            <a
              :href="`https://genshin.hoyoverse.com/en/gift?code=${redeem.code}`"
              target="_blank"
              class="btn btn-accent join-item"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-box-arrow-up-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
                />
                <path
                  fill-rule="evenodd"
                  d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
                />
              </svg>
            </a>
          </div>
          <span v-if="redeem.expires_at" class="text-xs text-white/25">
            Expires {{ formatDate(redeem.expires_at) }}
          </span>
        </div>

        <div
          v-if="redeem.is_livestream_code"
          class="flex flex-col justify-center items-center mt-4"
        >
          <span class="badge badge-xs badge-warning">Livestream Code</span>
        </div>

        <div class="divider mt-2"></div>

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
            <span>x{{ reward.amount.toLocaleString() }}</span>
          </div>
        </div>
      </div>
    </section>

    <div v-else>
      <EmptyFallback />
    </div>
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
    .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)
    .order("id", { ascending: false });
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
