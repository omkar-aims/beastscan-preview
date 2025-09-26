<script setup lang="ts">
const { redirect } = useRedirectMiddleware();

definePageMeta({
  middleware: [redirect("/dashboard/forms/my-form/overview")],
});
</script>
