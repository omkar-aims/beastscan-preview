<script setup lang="ts">
const { redirect } = useRedirectMiddleware();

definePageMeta({
  middleware: [redirect("/dashboard/pages/landing")],
});
</script>
