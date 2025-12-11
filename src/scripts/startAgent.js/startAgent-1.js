// startAgent.js
// Globale Funktion für Demo-Buttons

window.startAgent = async function startAgent(type) {
    try {
        const res = await fetch(`/api/agent-dev?agent=${type}`);
        const json = await res.json();

        document.getElementById("flow").innerHTML = `
            <pre style="padding:16px; background:#f4f4f4; border-radius:12px;">
${JSON.stringify(json, null, 2)}
            </pre>
        `;
    } catch (err) {
        document.getElementById("flow").innerHTML = `
            <pre style="padding:16px; background:#ffeeee; border-radius:12px; color:#900;">
Fehler: ${err}
            </pre>
        `;
    }
};