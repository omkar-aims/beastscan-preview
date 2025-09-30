import { useRouter, useRoute } from "vue-router";
import { watch } from "vue";
export function useRouteStepSync(stepIndex: Ref<number>) {
  const router = useRouter();
  const route = useRoute();

  watch(
    stepIndex,
    (newStepIndex) => {
      if (Number(route.query.step) !== newStepIndex) {
        router.push({
          query: {
            ...route.query,
            step: newStepIndex,
          },
        });
      }
    },
    { immediate: true }
  );

  watch(
    () => route.query,
    (query) => {
      const routeStep = Number(query.step);
      if (routeStep && routeStep !== stepIndex.value) {
        stepIndex.value = routeStep;
      }
    }
  );
}
