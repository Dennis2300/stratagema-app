// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ["@nuxtjs/supabase"],
  supabase: {
    redirectOptions: {
      login: "/",
      callback: "/confirm",
      exclude: [
        "/",
        "/characters",
        "/characters/**",
        "/weapons",
        "/weapons/**",
        "/artifacts",
      ],
    },
  },
  app: {
    head: {
      title: "Stratagema",
      titleTemplate: "Stratagema | %s",
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
      meta: [
        {
          name: "description",
          content:
            "Stratagema is a Genshin Impact build guide — find the best weapons, artifacts, and team comps for every character.",
        },
        { property: "og:title", content: "Stratagema" },
        {
          property: "og:description",
          content:
            "Genshin Impact build guide — find the best weapons, artifacts, and team comps for every character.",
        },
        {
          property: "og:image",
          content: "https://www.stratagema.app/opengraph.webp",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://www.stratagema.app" },
        { property: "og:site_name", content: "Stratagema" },

        // Twitter/X
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Stratagema" },
        {
          name: "twitter:description",
          content:
            "Genshin Impact build guide — find the best weapons, artifacts, and team comps for every character.",
        },
        {
          name: "twitter:image",
          content: "https://www.stratagema.app/opengraph.webp",
        },
      ],
    },
  },
});
