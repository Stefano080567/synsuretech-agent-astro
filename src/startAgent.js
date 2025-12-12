window.startAgent = function (type) {
  console.log("startAgent called with:", type);

  let flow = document.getElementById("flow");

  if (!flow) {
    flow = document.createElement("div");
    flow.id = "flow";
    document.body.appendChild(flow);
  }

  flow.innerHTML = `
    <div style="
      margin-top:40px;
      padding:24px;
      border:1px solid #ddd;
      border-radius:12px;
      background:#f5f7fa;
      font-family: system-ui, -apple-system, BlinkMacSystemFont;
    ">
      <h3>Agent started: ${type}</h3>
      <p>Status: Frontend-only demo is working ✅</p>
      <pre>{
  "agent": "${type}",
  "result": "This is a simulated output. Backend integration comes next."
}</pre>
    </div>
  `;
};
