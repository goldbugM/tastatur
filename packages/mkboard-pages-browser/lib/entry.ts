import "./entry.less";
import { main } from "./App.tsx";

// Ensure globalThis has the page data for compatibility
if (
  typeof window !== "undefined" &&
  window.__PAGE_DATA__ &&
  !globalThis.__PAGE_DATA__
) {
  globalThis.__PAGE_DATA__ = window.__PAGE_DATA__;
}

function initApp() {
  try {
    main();
  } catch (error) {
    console.error("Error in main():", error);
  }
}

// Wait for DOM to be ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  // DOM is already ready
  initApp();
}
