<template>
  <article class="bg-zinc-700 p-4 rounded-2xl">
    <div class="flex justify-between items-center">
      <h1>This is the Dashboard</h1>
      <button @click="logout" type="button" class="btn btn-error">
        Log out
      </button>
    </div>
    <p>Email: {{ user.email }}</p>
  </article>

  <DashboardCreateCharacter />
  <DashboardCreateWeapons />
  <DashboardLinkCharacterWeapon />
  <DashboardCreateArtifacts />
  <DashboardCreateMaterials />
</template>

<script setup>
const user = useSupabaseUser();
const supabase = useSupabaseClient();
const router = useRouter();

async function logout() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    router.push("/");
  } catch (error) {
    console.log(error.message);
  }
}
</script>
