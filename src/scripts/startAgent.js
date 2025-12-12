// src/scripts/startAgent.js
// WikiSure Agent – minimal working global starter (Demo-safe)

(function () {
  /**
   * Global Agent Starter
   * Can be called from buttons, UI, console
   */
  function startAgent(config = {}) {
    const payload = {
      status: "started",
      timestamp: new Date().toISOString(),
      context: config.context || "demo",
      product: "WikiSure",
      company: "SynsureTech",
    };

    console.log("🧠 WikiSure Agent started", payload);

    // Simple visual feedback for demo
    const el = document.getElementById("agent-status");
    if (el) {
      el.innerText = "✅ WikiSure Agent is running";
      el.style.color = "#0a4cff"; // SynsureTech Blue
      el.style.fontWeight = "600";
    }

    return payload;
  }

  // expose globally
  window.startAgent = startAgent;
})();
