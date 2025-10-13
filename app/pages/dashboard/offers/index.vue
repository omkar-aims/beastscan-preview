<script setup lang="ts">
const { redirect } = useRedirectMiddleware();

definePageMeta({
  middleware: [redirect("/dashboard/offers/my-offers")],
});
</script>