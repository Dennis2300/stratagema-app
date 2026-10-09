<template>
  <Navbar class="fixed top-0 z-50" />

  <article class="max-w-7xl mx-auto min-h-screen py-24 space-y-12">
    <section class="space-y-3">
      <div class="flex items-center gap-3">
        <div class="w-1 h-12 bg-white rounded-2xl"></div>
        <h1>About STRATAGEMA</h1>
      </div>
      <p>
        <span class="text-base-content">STRATAGEMA</span> is your no-fluff
        companion for building stronger teams in Genshin Impact. Whether you're
        farming ascension materials for your first five-star or fine-tuning
        artifact stats for endgame content, we cut through the noise and give
        you exactly what you need — optimized builds, material checklists, and
        team compositions for every playable character, all in one place. Built
        for travelers who'd rather spend time playing than spreadsheet-hopping.
      </p>
    </section>

    <section class="space-y-3">
      <div class="flex items-center gap-3">
        <div class="w-1 h-12 bg-white rounded-2xl"></div>
        <h2>Privacy policy</h2>
      </div>
      <p>
        You can read about or privacy policy
        <NuxtLink
          to="/privacy-policy"
          class="underline bold hover:text-white/50 hover:cursor-pointer transition"
        >
          here
        </NuxtLink>
      </p>
    </section>

    <section class="space-y-3">
      <div class="flex items-center gap-3">
        <div class="w-1 h-12 bg-white rounded-2xl"></div>
        <h2>What does the website offer?</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <p
          class="flex items-center gap-2 bg-base-200 p-4 border border-base-content/50 rounded-xl"
        >
          <svg
            class="w-4 h-4 text-app-accent shrink-0 mt-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M9 12l2 2 4-4"></path>
            <rect x="3" y="3" width="18" height="18" rx="3"></rect></svg
          >Optimized builds for all playable characters.
        </p>
        <p
          class="flex items-center gap-2 bg-base-200 p-4 border border-base-content/50 rounded-xl"
        >
          <svg
            class="w-4 h-4 text-app-accent shrink-0 mt-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M9 12l2 2 4-4"></path>
            <rect x="3" y="3" width="18" height="18" rx="3"></rect>
          </svg>
          Look up all playable character, weapons and artifacts in the game.
        </p>
        <p
          class="flex items-center gap-2 bg-base-200 p-4 border border-base-content/50 rounded-xl"
        >
          <svg
            class="w-4 h-4 text-app-accent shrink-0 mt-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M9 12l2 2 4-4"></path>
            <rect x="3" y="3" width="18" height="18" rx="3"></rect>
          </svg>
          Redeem codes tracker
        </p>
        <p
          class="flex items-center gap-2 bg-base-200 p-4 border border-base-content/50 rounded-xl"
        >
          <svg
            class="w-4 h-4 text-app-accent shrink-0 mt-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M9 12l2 2 4-4"></path>
            <rect x="3" y="3" width="18" height="18" rx="3"></rect>
          </svg>
          Team compositions for all playable characters
        </p>
      </div>
    </section>

    <section class="space-y-3">
      <div class="flex items-center gap-3">
        <div class="w-1 h-12 bg-white rounded-2xl"></div>
        <h2>Future features</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <p
          class="flex items-center gap-2 bg-base-200 p-4 border border-base-content/50 rounded-xl"
        >
          <span class="loading loading-xs"></span> Genshin Lore Timeline with
          cutscenes
        </p>

        <p
          class="flex items-center gap-2 bg-base-200 p-4 border border-base-content/50 rounded-xl"
        >
          <span class="loading loading-xs"></span>
          Spiral Abyss & Imaginarium Theater Teams
        </p>
      </div>
    </section>

    <section class="space-y-3">
      <div class="flex items-center gap-3">
        <div class="w-1 h-12 bg-white rounded-2xl"></div>
        <h2>Support the project</h2>
      </div>
      <p>
        If you find STRATAGEMA useful, consider supporting on Ko-fi. It helps
        keep the project running.
      </p>

      <div class="aura aura-dual">
        <a
          href="https://ko-fi.com/stratagema"
          target="_blank"
          class="inline-flex items-center gap-2 btn btn-info"
          ><svg
            class="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
            <line x1="6" y1="1" x2="6" y2="4"></line>
            <line x1="10" y1="1" x2="10" y2="4"></line>
            <line x1="14" y1="1" x2="14" y2="4"></line>
          </svg>
          Support on Ko-fi
        </a>
      </div>
    </section>

    <section class="space-y-6">
      <div class="flex items-center gap-4">
        <div class="h-10 w-1 rounded-full bg-primary"></div>

        <div>
          <p
            class="text-xs font-medium uppercase tracking-[0.25em] text-base-content/40"
          >
            Techstacks
          </p>
          <h2 class="text-2xl font-semibold tracking-tight">Built with...</h2>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <a
          class="flex items-center gap-3 bg-base-200 p-4 border border-white/25 rounded-xl hover:border hover:border-white/50 hover:bg-base-100 transition duration-200"
          href="https://www.nuxt.com/"
          target="_blank"
        >
          <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="#01C58E"
            height="48"
            width="48"
          >
            <title>Nuxt</title>
            <path
              d="M13.4642 19.8295h8.9218c.2834 0 .5618-.0723.8072-.2098a1.5899 1.5899 0 0 0 .5908-.5732 1.5293 1.5293 0 0 0 .216-.783 1.529 1.529 0 0 0-.2167-.7828L17.7916 7.4142a1.5904 1.5904 0 0 0-.5907-.573 1.6524 1.6524 0 0 0-.807-.2099c-.2833 0-.5616.0724-.807.2098a1.5904 1.5904 0 0 0-.5907.5731L13.4642 9.99l-2.9954-5.0366a1.5913 1.5913 0 0 0-.591-.573 1.6533 1.6533 0 0 0-.8071-.2098c-.2834 0-.5617.0723-.8072.2097a1.5913 1.5913 0 0 0-.591.573L.2168 17.4808A1.5292 1.5292 0 0 0 0 18.2635c-.0001.2749.0744.545.216.783a1.59 1.59 0 0 0 .5908.5732c.2454.1375.5238.2098.8072.2098h5.6003c2.219 0 3.8554-.9454 4.9813-2.7899l2.7337-4.5922L16.3935 9.99l4.3944 7.382h-5.8586ZM7.123 17.3694l-3.9083-.0009 5.8586-9.8421 2.9232 4.921-1.9572 3.2892c-.7478 1.1967-1.5972 1.6328-2.9163 1.6328z"
            />
          </svg>
          <h3>NUXT<span class="text-[#01C58E]">JS</span></h3>
        </a>

        <a
          class="flex items-center gap-3 bg-base-200 p-4 border border-white/25 rounded-xl hover:border hover:border-white/50 hover:bg-base-100 transition duration-200"
          href="https://www.supabase.com/"
          target="_blank"
        >
          <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="#3FCF8E"
            height="48"
            width="48"
          >
            <title>Supabase</title>
            <path
              d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642z"
            />
          </svg>
          <h3>Supabase</h3>
        </a>

        <a
          class="flex items-center gap-3 bg-base-200 p-4 border border-white/25 rounded-xl hover:border hover:border-white/50 hover:bg-base-100 transition duration-200"
          href="https://www.tailwindcss.com/"
          target="_blank"
        >
          <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="#06B6D4"
            height="48"
            width="48"
          >
            <title>Tailwind CSS</title>
            <path
              d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"
            />
          </svg>
          <h3>TailwindCSS</h3>
        </a>
      </div>
    </section>
    <div class="divider mb-2">Disclaimer</div>
    <p class="text-center text-xs">
      This website is a fan-made project and is not affiliated with, endorsed
      by, or sponsored by <span class="text-info">HoYoverse</span> or
      <span class="text-info">miHoYo</span>. All characters, images, names, and
      other assets used on this site are the property of
      <span class="text-info">HoYoverse</span>.
    </p>
  </article>
</template>
