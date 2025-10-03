export function useScrollToTopWizard(stepIndex: Ref) {
  watch(stepIndex, () => {
    const mainContainer = document.querySelector("#main");
    if (!mainContainer) return;
    mainContainer.scrollTo({ top: 0, behavior: "smooth" });
  });
}
