<template>
  <article>
    <div class="flex justify-between items-center">
      <h1>This is the Dashboard</h1>
      <button @click="logout" type="button" class="btn btn-error">
        Log out
      </button>
    </div>
    <p>Email: {{ user.email }}</p>
  </article>
</template>

<script setup>
const user = useSupabaseUser();
const supabase = useSupabaseClient();
const router = useRouter();

console.log(user.value);

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
