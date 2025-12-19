---
import AgentFlow from "./AgentFlow.tsx";
---

<div class="flow">
  <nav class="steps">
    <span>1. Why</span>
    <span>2. Context</span>
    <span>3. Term</span>
    <span>4. Definition</span>
    <span>5. Validation</span>
    <span>6. Decision</span>
  </nav>

  <AgentFlow client:load />
</div>

<style>
.flow {
  max-width: 820px;
  margin: 60px auto;
  padding: 0 16px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.steps {
  display: flex;
  gap: 12px;
  font-size: 13px;
  color: #666;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.card {
  background: white;
  border-radius: 18px;
  padding: 36px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.06);
}

.controls {
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
}

button {
  padding: 10px 22px;
  border-radius: 20px;
  border: none;
  background: #007aff;
  color: white;
  font-size: 15px;
}

button:disabled {
  background: #ccc;
}
</style>
