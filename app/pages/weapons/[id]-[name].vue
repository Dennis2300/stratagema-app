<template>
  <article>
    <figure class="flex items-center gap-3">
      <img
        class="w-32 h-32 rounded-xl"
        :class="{
          'rarity-5': weapon.rarity === 5,
          'rarity-4': weapon.rarity === 4,
          'rarity-3': weapon.rarity === 3,
        }"
        :src="weapon.img_url"
        alt=""
      />
      <figcaption>
        <h1>{{ weapon.name }}</h1>
        <p>{{ weapon.description }}</p>
      </figcaption>
    </figure>
    <div>
      <p>{{ weapon.rarity }}</p>
      <p>{{ weapon.stat }}</p>
      <p>{{ weapon.stat_value }}</p>
      <p>{{ weapon.weapon_type_id.name }}</p>
      <p>{{ weapon.base_atk }}</p>
      <p>{{ weapon.ability }}</p>
    </div>
    <pre>{{ weapon }}</pre>
  </article>
</template>

<script setup>
const supabase = useSupabaseClient();
const route = useRoute();

const weapon_id = route.params.id;
const weapon_name = route.params.name;

const {
  data: weapon,
  pending,
  error,
} = useAsyncData(`weapon-${weapon_id}-${weapon_name}`, async () => {
  const { data, error } = await supabase
    .schema("genshin_impact")
    .from("weapons")
    .select("*, weapon_type_id(name)")
    .eq("id", weapon_id)
    .single();
  if (error) throw error;
  return data;
});
</script>
