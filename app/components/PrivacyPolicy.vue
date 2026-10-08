<template>
  <section class="space-y-3">
    <div class="flex items-center gap-3">
      <div class="w-1 h-12 bg-white rounded-2xl"></div>
      <h2>Privacy Policy</h2>
    </div>

    <div
      v-for="(s, i) in sections"
      :key="s.title"
      class="collapse bg-base-200 border border-base-300"
    >
      <input type="radio" name="my-accordion-1" :checked="i === 0" />
      <div class="flex items-center gap-2 collapse-title font-semibold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="text-app-accent"
          aria-hidden="true"
        >
          <path
            d="M12 3a12 12 0 0 0 8.5 3A12 12 0 0 1 12 21A12 12 0 0 1 3.5 6A12 12 0 0 0 12 3"
          ></path>
          <path d="M12 11m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
          <path d="M12 12l0 2.5"></path>
        </svg>
        {{ s.title }}
      </div>

      <div class="collapse-content text-sm space-y-2">
        <template v-for="(b, j) in s.blocks" :key="j">
          <p v-if="b.type === 'p'">{{ b.text }}</p>
          <p v-else-if="b.type === 'h'" class="text-info text-lg">
            {{ b.text }}
          </p>
          <ul v-else-if="b.type === 'ul'" class="list-disc space-y-1 pl-5">
            <li v-for="item in b.items" :key="item">{{ item }}</li>
          </ul>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
// Fill in your details once here. Everything marked [ ] below must be replaced.
const c = {
  name: `[Your name or company name]`,
  address: `[Street, postcode, city, country]`,
  email: `[privacy@yourdomain.com]`,
  region: `[EU region, e.g. Frankfurt]`,
  deleteDays: `[30]`,
  updated: `October 8, 2026`,
};

const sections = [
  {
    title: `Who is responsible for your data`,
    blocks: [
      {
        type: "p",
        text: `${c.name} ("we", "us") is the controller of the personal data processed through this website. Our address is ${c.address}. You can contact us about anything related to privacy at ${c.email}.`,
      },
    ],
  },
  {
    title: `Information we collect`,
    blocks: [
      {
        type: "p",
        text: `We collect only the data we need to run the website:`,
      },
      {
        type: "ul",
        items: [
          `Account information: your email address and a password (stored only as a secure hash, never in plain text) when you sign up. [Add any other profile fields you collect.]`,
          `Content you provide: [describe what users can submit, e.g. posts, uploads, messages].`,
          `Technical data: when you visit the site, our hosting provider automatically processes your IP address, browser and device type, and the pages requested in server logs.`,
          `Login session: a token that keeps you signed in (see "Cookies and similar technologies").`,
        ],
      },
    ],
  },
  {
    title: `Why we use it and our legal basis`,
    blocks: [
      {
        type: "ul",
        items: [
          `To create and manage your account and provide the service. Legal basis: performing a contract with you (Art. 6(1)(b) GDPR).`,
          `To keep the website secure, prevent abuse and fix errors, using server logs. Legal basis: our legitimate interest in a secure and working website (Art. 6(1)(f) GDPR).`,
          `To answer messages you send us. Legal basis: performing a contract or our legitimate interest in replying (Art. 6(1)(b) or (f) GDPR).`,
          `For optional features such as analytics, if we ever add them: only with your consent (Art. 6(1)(a) GDPR), which you can withdraw at any time.`,
        ],
      },
      {
        type: "p",
        text: `Providing your account information is required to create an account. Without it we can't offer you one. We do not sell your data, use it for advertising, or make automated decisions that have legal or similarly significant effects on you.`,
      },
    ],
  },
  {
    title: `Cookies and similar technologies`,
    blocks: [
      { type: "h", text: `Strictly necessary` },
      {
        type: "p",
        text: `When you sign in, our authentication provider stores a session token in your browser (in local storage or a cookie). It keeps you signed in and is removed when you sign out. Because the website can't work without it, it doesn't require your consent.`,
      },
      { type: "h", text: `Analytics and marketing` },
      {
        type: "p",
        text: `We currently do not use analytics, advertising or tracking cookies or scripts. If we add them, we will ask for your permission first and update this policy. You can clear stored data at any time in your browser settings.`,
      },
    ],
  },
  {
    title: `Who we share it with`,
    blocks: [
      {
        type: "p",
        text: `We use the following service providers (processors). They handle your data only on our instructions and under data processing agreements:`,
      },
      {
        type: "ul",
        items: [
          `Vercel Inc.: website hosting and delivery.`,
          `Supabase: database, authentication and file storage. Our project data is stored in ${c.region}.`,
        ],
      },
      {
        type: "p",
        text: `These providers are US companies, so data may be accessed from outside the European Economic Area. Such transfers are protected by safeguards like the EU-US Data Privacy Framework or Standard Contractual Clauses. We don't share your data with anyone else, unless the law requires it.`,
      },
    ],
  },
  {
    title: `How long we keep it`,
    blocks: [
      {
        type: "ul",
        items: [
          `Account data: for as long as your account exists, and deleted within ${c.deleteDays} days after you delete it.`,
          `Content you provide: until you delete it or your account.`,
          `Server logs: kept for a short period by our hosting provider, then deleted automatically.`,
          `Anything we are legally required to keep (for example for accounting) is kept for as long as the law requires.`,
        ],
      },
    ],
  },
  {
    title: `Your rights`,
    blocks: [
      { type: "p", text: `Under the GDPR you have the right to:` },
      {
        type: "ul",
        items: [
          `access the personal data we hold about you and get a copy;`,
          `have inaccurate data corrected;`,
          `have your data deleted ("right to be forgotten");`,
          `restrict how we process your data;`,
          `receive your data in a portable format;`,
          `object to processing based on our legitimate interests;`,
          `withdraw consent at any time, without affecting processing done before.`,
        ],
      },
      {
        type: "p",
        text: `To use any of these rights, email us at ${c.email}. We will respond within one month. You also have the right to complain to the data protection authority in the country where you live or work, or where you think your rights were violated. You can find yours on the European Data Protection Board website (edpb.europa.eu). We would appreciate the chance to resolve your concern first.`,
      },
    ],
  },
  {
    title: `Changes to this policy`,
    blocks: [
      {
        type: "p",
        text: `We may update this Privacy Policy from time to time. Changes will be posted on this page with a new date, and we will tell you directly if they significantly affect how we use your data. Last updated: ${c.updated}.`,
      },
    ],
  },
];
</script>
