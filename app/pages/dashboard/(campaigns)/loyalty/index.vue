<script setup lang="ts">
const { redirect } = useRedirectMiddleware();

definePageMeta({
  middleware: [redirect("/dashboard/loyalty/gift-cards")],
});
</script>
