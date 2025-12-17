// src/scripts/demo.ts
// STEP 5.3 — UI logic extraction (NO business logic)

export function initDemo() {
  const btn = document.getElementById("demo-run-btn");
  const output = document.getElementById("demo-output");

  if (!btn || !output) return;

  btn.addEventListener("click", () => {
    output.textContent = "Demo logic placeholder (wired)";
  });
}
