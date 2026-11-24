
import "./style.css";

const systems = [
  { name: "ZEUS", role: "Orchestration & Command", status: "ONLINE" },
  { name: "TITAN", role: "Cognitive Intelligence", status: "ONLINE" },
  { name: "ELEANOR", role: "Central Intelligence", status: "ONLINE" },
  { name: "KRONOS", role: "Simulation & Digital Twin", status: "ONLINE" },
  { name: "OMEGA", role: "Adversarial Intelligence", status: "ONLINE" },
  { name: "ARES", role: "Execution Engine", status: "ACTIVE" }
];

const state = {
  page: "overview",
  tasks: [
    { id: 101, name: "Initialize execution environment", department: "SYSTEMS", priority: "HIGH", status: "COMPLETED" },
    { id: 102, name: "Validate workflow dependencies", department: "OPERATIONS", priority: "HIGH", status: "IN PROGRESS" },
    { id: 103, name: "Prepare resource allocation", department: "RESOURCES", priority: "MEDIUM", status: "PENDING" },
    { id: 104, name: "Generate execution report", department: "ANALYTICS", priority: "LOW", status: "PENDING" }
  ],
  approvals: [
    { id: 501, name: "Approve simulated workflow launch", detail: "Demo execution sequence", status: "PENDING" },
    { id: 502, name: "Confirm resource allocation", detail: "Operations resource request", status: "PENDING" }
  ],
  logs: [
    { time: "12:00:01", type: "SYSTEM", message: "ARES execution engine initialized." },
    { time: "12:00:05", type: "NETWORK", message: "VENOM system registry loaded." },
    { time: "12:00:11", type: "WORKFLOW", message: "Execution pipeline standing by." },
    { time: "12:00:18", type: "AUTHORITY", message: "Human approval gateway enabled." }
  ],
  nextId: 105
};

const app = document.querySelector("#app");

const nav = [
  ["overview", "◈", "Command Overview"],
  ["execution", "▶", "Execution Engine"],
  ["workflows", "⌘", "Workflow Control"],
  ["tasks", "▤", "Task Management"],
  ["resources", "▦", "Resource Matrix"],
  ["approvals", "⬡", "Approval Gateway"],
  ["systems", "◎", "System Network"],
  ["logs", "≡", "Execution Logs"]
];

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function addLog(type, message) {
  state.logs.unshift({
    time: new Date().toLocaleTimeString(),
    type,
    message
  });
  state.logs = state.logs.slice(0, 50);
}

function getTaskCounts() {
  return {
    total: state.tasks.length,
    completed: state.tasks.filter(t => t.status === "COMPLETED").length,
    active: state.tasks.filter(t => t.status === "IN PROGRESS").length,
    pending: state.tasks.filter(t => t.status === "PENDING").length
  };
}

function statusClass(status) {
  if (status === "COMPLETED" || status === "APPROVED" || status === "ONLINE" || status === "ACTIVE") return "good";
  if (status === "IN PROGRESS") return "working";
  if (status === "PENDING" || status === "STANDBY") return "waiting";
  return "neutral";
}

function statusTag(status) {
  return `<span class="status-tag ${statusClass(status)}">${escapeHTML(status)}</span>`;
}

function metric(label, value, note, number) {
  return `
    <div class="metric-card">
      <div class="metric-head"><span>${label}</span><small>0${number}</small></div>
      <div class="metric-value">${value}</div>
      <div class="metric-note">${note}</div>
    </div>
  `;
}

function taskRows(limit = 20) {
  return `
    <div class="table-wrap">
      <table>
        <thead><tr><th>TASK ID</th><th>EXECUTION ITEM</th><th>DEPARTMENT</th><th>PRIORITY</th><th>STATUS</th><th>ACTION</th></tr></thead>
        <tbody>
          ${state.tasks.slice(0, limit).map(task => `
            <tr>
              <td class="mono">#${task.id}</td>
              <td>${escapeHTML(task.name)}</td>
              <td>${escapeHTML(task.department)}</td>
              <td><span class="priority ${task.priority.toLowerCase()}">${task.priority}</span></td>
              <td>${statusTag(task.status)}</td>
              <td>${task.status !== "COMPLETED" ? `<button class="mini-btn" data-task="${task.id}">ADVANCE</button>` : `<span class="done-label">DONE</span>`}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function logRows(limit = 6) {
  return `
    <div class="log-list">
      ${state.logs.slice(0, limit).map(log => `
        <div class="log-row">
          <span class="log-time">${escapeHTML(log.time)}</span>
          <span class="log-type">${escapeHTML(log.type)}</span>
          <span class="log-message">${escapeHTML(log.message)}</span>
          <i></i>
        </div>
      `).join("") || `<p class="empty-state">No events recorded.</p>`}
    </div>
  `;
}

function approvalCards() {
  return `
    <div class="approval-list">
      ${state.approvals.map(item => `
        <div class="approval-card">
          <div class="approval-icon">⬡</div>
          <div class="approval-content">
            <strong>${escapeHTML(item.name)}</strong>
            <small>${escapeHTML(item.detail)}</small>
            ${statusTag(item.status)}
          </div>
          ${item.status === "PENDING" ? `<button class="approve-btn" data-approve="${item.id}">APPROVE</button>` : `<span class="done-label">AUTHORIZED</span>`}
        </div>
      `).join("")}
    </div>
  `;
}

function overviewPage() {
  const counts = getTaskCounts();
  const progress = counts.total ? Math.round(counts.completed / counts.total * 100) : 0;

  return `
    <section class="hero">
      <div class="hero-grid"></div>
      <div class="hero-copy">
        <div class="eyebrow"><i></i> VENOM EXECUTION DIVISION / SYSTEM 003</div>
        <h1>ARES<span>.</span></h1>
        <h2>EXECUTION INTELLIGENCE ENGINE</h2>
        <p>From approved decisions to measurable action. ARES organizes execution, tracks operations, coordinates resources, and reports performance across the VENOM ecosystem.</p>
        <div class="hero-actions">
          <button class="primary-btn" data-action="run">▶ INITIATE DEMO EXECUTION</button>
          <button class="secondary-btn" data-page="execution">OPEN EXECUTION ENGINE</button>
        </div>
      </div>
      <div class="ares-visual">
        <div class="ares-ring ring-one"></div>
        <div class="ares-ring ring-two"></div>
        <div class="ares-ring ring-three"></div>
        <div class="ares-core"><span>A</span></div>
        <div class="ares-core-label">ARES / EXECUTION CORE</div>
      </div>
      <div class="hero-footer">
        <span>EXECUTION ENGINE / 003</span>
        <span>THE SHELBY PREDATOR ENTERPRISE</span>
        <span>HUMAN CONTROL ENABLED</span>
      </div>
    </section>

    <div class="section-title">
      <div><span class="eyebrow">OPERATIONAL INTELLIGENCE</span><h2>EXECUTION STATUS</h2></div>
      <span class="live-status">● LOCAL DEMO ACTIVE</span>
    </div>

    <div class="metric-grid">
      ${metric("TOTAL TASKS", counts.total, "REGISTERED TASKS", 1)}
      ${metric("COMPLETED", counts.completed, "CLOSED TASKS", 2)}
      ${metric("IN PROGRESS", counts.active, "ACTIVE OPERATIONS", 3)}
      ${metric("PENDING", counts.pending, "AWAITING EXECUTION", 4)}
    </div>

    <div class="dashboard-grid">
      <section class="panel">
        <div class="panel-title"><div><span class="eyebrow">EXECUTION PIPELINE</span><h3>OPERATIONAL PROGRESS</h3></div><span class="panel-code">FLOW / 01</span></div>
        <div class="progress-number">${progress}<small>%</small></div>
        <div class="progress-track"><span style="width:${progress}%"></span></div>
        <div class="progress-labels"><span>${counts.completed} COMPLETED</span><span>${counts.total} TOTAL TASKS</span></div>
        <div class="pipeline">
          ${["INTAKE", "VALIDATION", "AUTHORIZATION", "EXECUTION", "REPORTING"].map((step, i) => `
            <div class="pipeline-node ${i < 2 ? "reached" : ""}">
              <div class="node-dot">${i + 1}</div><span>${step}</span>
            </div>
          `).join("")}
        </div>
      </section>
      <section class="panel">
        <div class="panel-title"><div><span class="eyebrow">CONTROL CENTER</span><h3>ENGINE STATUS</h3></div><span class="panel-code">CORE / 01</span></div>
        <div class="engine-status">
          <div class="engine-symbol">A</div>
          <h3>EXECUTION CORE READY</h3>
          <p>Demo environment initialized.</p>
          <div class="engine-row"><span>WORKFLOW ENGINE</span><strong>READY</strong></div>
          <div class="engine-row"><span>RESOURCE TRACKING</span><strong>READY</strong></div>
          <div class="engine-row"><span>APPROVAL GATEWAY</span><strong>ENABLED</strong></div>
          <div class="engine-row"><span>LIVE BACKEND</span><strong>NOT CONNECTED</strong></div>
        </div>
      </section>
    </div>

    <section class="panel">
      <div class="panel-title"><div><span class="eyebrow">ACTIVE OPERATIONS</span><h3>EXECUTION TASK REGISTER</h3></div><button class="text-btn" data-page="tasks">VIEW ALL ↗</button></div>
      ${taskRows(4)}
    </section>

    <section class="panel">
      <div class="panel-title"><div><span class="eyebrow">SYSTEM EVENT STREAM</span><h3>RECENT EXECUTION LOG</h3></div><button class="text-btn" data-page="logs">VIEW LOGS ↗</button></div>
      ${logRows(4)}
    </section>
  `;
}

function executionPage() {
  return `
    <div class="page-intro"><span class="eyebrow">ARES / CORE OPERATIONS</span><h1>EXECUTION ENGINE</h1><p>The operational layer responsible for progressing authorized work through defined execution stages.</p></div>
    <div class="execution-banner">
      <div class="execution-mark">A</div>
      <div><span class="eyebrow">ENGINE STATE</span><h2>EXECUTION CORE INITIALIZED</h2><p>Ready to process local demonstration tasks.</p></div>
      <button class="primary-btn" data-action="run">RUN EXECUTION CYCLE ↗</button>
    </div>
    <div class="metric-grid">
      ${metric("TASK QUEUE", state.tasks.length, "REGISTERED ITEMS", 1)}
      ${metric("APPROVAL QUEUE", state.approvals.filter(a => a.status === "PENDING").length, "PENDING AUTHORIZATIONS", 2)}
      ${metric("SYSTEMS", systems.length, "REGISTERED SYSTEMS", 3)}
      ${metric("LOG EVENTS", state.logs.length, "RECORDED EVENTS", 4)}
    </div>
    <section class="panel"><div class="panel-title"><div><span class="eyebrow">EXECUTION SEQUENCE</span><h3>PROCESS STAGES</h3></div></div>
      ${["Receive authorized work", "Validate dependencies and requirements", "Confirm resources and approvals", "Execute assigned operation", "Verify completion and report results"].map((x, i) => `<div class="process-step"><span class="process-number">0${i + 1}</span><span>${x}</span>${statusTag(i === 0 ? "ACTIVE" : "PENDING")}</div>`).join("")}
    </section>
  `;
}

function workflowsPage() {
  return `
    <div class="page-intro"><span class="eyebrow">PROCESS MANAGEMENT</span><h1>WORKFLOW CONTROL</h1><p>Organize work into structured stages with dependencies, authorization, and completion tracking.</p></div>
    <div class="workflow-grid">
      ${[
        ["01", "INTAKE", "Capture an incoming request or assignment.", "ACTIVE"],
        ["02", "VALIDATION", "Check requirements, dependencies, and readiness.", "READY"],
        ["03", "AUTHORIZATION", "Obtain approval before consequential action.", "GATED"],
        ["04", "EXECUTION", "Progress authorized tasks and record outcomes.", "READY"],
        ["05", "VERIFICATION", "Review completion against acceptance criteria.", "READY"],
        ["06", "REPORTING", "Publish results and close the workflow.", "READY"]
      ].map(w => `<div class="workflow-card"><span class="workflow-number">${w[0]}</span><span class="workflow-status">${w[3]}</span><h2>${w[1]}</h2><p>${w[2]}</p><div class="workflow-line"></div></div>`).join("")}
    </div>
    <section class="panel"><div class="eyebrow">DESIGN PRINCIPLE</div><h3>NO UNAUTHORIZED EXECUTION</h3><p class="muted">A production workflow must enforce permissions, validate prerequisites, preserve an audit trail, and stop when required approval is missing.</p></section>
  `;
}

function tasksPage() {
  return `
    <div class="page-intro"><span class="eyebrow">OPERATIONS REGISTER</span><h1>TASK MANAGEMENT</h1><p>Create, advance, and monitor tasks within the local ARES demonstration.</p></div>
    <section class="panel">
      <div class="panel-title"><div><span class="eyebrow">TASK REGISTRY</span><h3>REGISTERED EXECUTION ITEMS</h3></div><button class="primary-btn" data-action="new-task">+ CREATE TASK</button></div>
      ${taskRows()}
    </section>
    <section class="panel">
      <div class="eyebrow">TASK LIFECYCLE</div>
      <h3>PENDING → IN PROGRESS → COMPLETED</h3>
      <p class="muted">Use ADVANCE to move a task through the local demonstration lifecycle. Production execution would require role permissions and verified acceptance criteria.</p>
    </section>
  `;
}

function resourcesPage() {
  const resources = [
    ["COMPUTE", "Processing capacity", "AVAILABLE"],
    ["INTELLIGENCE", "Analysis and decision support", "AVAILABLE"],
    ["OPERATIONS", "Assigned execution personnel", "AVAILABLE"],
    ["DATA", "Validated information sources", "REQUIRES CONNECTION"],
    ["INFRASTRUCTURE", "Execution environment", "DEMO READY"],
    ["AUTHORITY", "Approval and access controls", "ENABLED"]
  ];

  return `
    <div class="page-intro"><span class="eyebrow">RESOURCE INTELLIGENCE</span><h1>RESOURCE MATRIX</h1><p>Track resource categories, readiness, availability, and dependencies.</p></div>
    <div class="resource-grid">
      ${resources.map((r, i) => `<div class="resource-card"><span class="resource-index">RESOURCE / 0${i + 1}</span><div class="resource-icon">▦</div><h2>${r[0]}</h2><p>${r[1]}</p>${statusTag(r[2])}</div>`).join("")}
    </div>
    <section class="panel"><div class="eyebrow">RESOURCE GOVERNANCE</div><h3>ALLOCATION RULE</h3><p class="muted">ARES tracks resource readiness in this prototype. It does not provision real infrastructure, assign real personnel, or control external systems.</p></section>
  `;
}

function approvalsPage() {
  return `
    <div class="page-intro"><span class="eyebrow">GOVERNANCE / AUTHORIZATION</span><h1>APPROVAL GATEWAY</h1><p>Human authorization before designated consequential operations.</p></div>
    <div class="authority-banner"><div class="authority-symbol">⬡</div><div><span class="eyebrow">CONTROL PRINCIPLE</span><h2>HUMAN AUTHORITY REMAINS FINAL.</h2><p>ARES can organize work and prepare actions. Authorized humans decide whether designated actions may proceed.</p></div></div>
    <section class="panel"><div class="panel-title"><div><span class="eyebrow">AUTHORIZATION QUEUE</span><h3>AWAITING HUMAN REVIEW</h3></div><span class="panel-code">${state.approvals.filter(a => a.status === "PENDING").length} PENDING</span></div>${approvalCards()}</section>
    <section class="panel"><div class="eyebrow">AUDIT REQUIREMENT</div><h3>EVERY APPROVAL MUST BE TRACEABLE</h3><p class="muted">This prototype records approval state locally. A production gateway must authenticate approvers and retain identity, timestamp, scope, and decision records.</p></section>
  `;
}

function systemsPage() {
  return `
    <div class="page-intro"><span class="eyebrow">VENOM SYSTEM NETWORK</span><h1>CONNECTED ARCHITECTURE</h1><p>ARES operates as the execution layer within the wider VENOM intelligence and orchestration architecture.</p></div>
    <div class="system-grid">
      ${systems.map((s, i) => `<div class="system-card"><div class="system-top"><span>NODE / 0${i + 1}</span>${statusTag(s.status)}</div><div class="system-symbol">◈</div><h2>${s.name}</h2><p>${s.role}</p></div>`).join("")}
    </div>
    <section class="panel"><div class="eyebrow">OPERATING RELATIONSHIP</div><h3>INTELLIGENCE → ORCHESTRATION → EXECUTION</h3><p class="muted">ELEANOR, OMEGA, KRONOS, and TITAN provide intelligence capabilities. ZEUS coordinates the workflow. ARES manages authorized execution and reporting.</p></section>
  `;
}

function logsPage() {
  return `
    <div class="page-intro"><span class="eyebrow">OPERATIONAL AUDIT TRAIL</span><h1>EXECUTION LOGS</h1><p>Chronological record of events generated during this local demonstration.</p></div>
    <section class="panel"><div class="panel-title"><div><span class="eyebrow">EVENT ARCHIVE</span><h3>ACTIVITY RECORD</h3></div><button class="text-btn" data-action="clear-logs">CLEAR LOG</button></div>${logRows(50)}</section>
  `;
}

function renderPage() {
  const pages = {
    overview: overviewPage,
    execution: executionPage,
    workflows: workflowsPage,
    tasks: tasksPage,
    resources: resourcesPage,
    approvals: approvalsPage,
    systems: systemsPage,
    logs: logsPage
  };
  return (pages[state.page] || overviewPage)();
}

function render() {
  app.innerHTML = `
    <div class="app-shell">
      <header class="topbar">
        <div class="brand">
          <div class="brand-mark">A</div>
          <div><strong>ARES</strong><small>EXECUTION INTELLIGENCE ENGINE</small></div>
        </div>
        <div class="topbar-right">
          <span class="system-indicator"><i></i> ENGINE INITIALIZED</span>
          <span id="clock" class="clock"></span>
          <span class="version">VENOM / 003</span>
        </div>
      </header>
      <div class="app-body">
        <aside class="sidebar">
          <div class="side-label">COMMAND INTERFACE</div>
          <nav>
            ${nav.map(([id, icon, label]) => `<button class="nav-item ${state.page === id ? "active" : ""}" data-page="${id}"><span>${icon}</span>${label}</button>`).join("")}
          </nav>
          <div class="sidebar-bottom">
            <div class="side-label">EXECUTION STATUS</div>
            <div class="side-status"><i></i> ARES CORE ACTIVE</div>
            <div class="side-caption">THE SHELBY PREDATOR<br/>ENTERPRISE<br/><br/>THE COBRA WAY</div>
          </div>
        </aside>
        <main class="main-content">${renderPage()}</main>
      </div>
      <footer class="footer"><span>THE COBRA WAY</span><span>ARES / EXECUTION INTELLIGENCE</span><span>PROTOTYPE / DEMO ENVIRONMENT</span></footer>
    </div>
  `;
  updateClock();
}

function updateClock() {
  const clock = document.querySelector("#clock");
  if (clock) clock.textContent = new Date().toLocaleTimeString();
}

function runExecution() {
  const task = state.tasks.find(t => t.status === "PENDING");
  if (!task) {
    addLog("EXECUTION", "No pending tasks available in the demo queue.");
    render();
    return;
  }

  task.status = "IN PROGRESS";
  addLog("EXECUTION", `Task #${task.id} moved into progress: ${task.name}`);
  render();
}

function advanceTask(id) {
  const task = state.tasks.find(t => t.id === Number(id));
  if (!task) return;

  if (task.status === "PENDING") {
    task.status = "IN PROGRESS";
    addLog("TASK", `Task #${task.id} started: ${task.name}`);
  } else if (task.status === "IN PROGRESS") {
    task.status = "COMPLETED";
    addLog("TASK", `Task #${task.id} completed: ${task.name}`);
  }
  render();
}

function approveItem(id) {
  const item = state.approvals.find(a => a.id === Number(id));
  if (!item || item.status !== "PENDING") return;

  item.status = "APPROVED";
  addLog("AUTHORITY", `Demo approval recorded for: ${item.name}`);
  render();
}

function createTask() {
  const name = prompt("Enter the new execution task:");
  if (!name || !name.trim()) return;

  const task = {
    id: state.nextId++,
    name: name.trim(),
    department: "OPERATIONS",
    priority: "MEDIUM",
    status: "PENDING"
  };

  state.tasks.push(task);
  addLog("TASK", `New task registered: ${task.name}`);
  render();
}

app.addEventListener("click", event => {
  const pageButton = event.target.closest("[data-page]");
  const actionButton = event.target.closest("[data-action]");
  const taskButton = event.target.closest("[data-task]");
  const approveButton = event.target.closest("[data-approve]");

  if (pageButton) {
    state.page = pageButton.dataset.page;
    render();
    return;
  }

  if (taskButton) {
    advanceTask(taskButton.dataset.task);
    return;
  }

  if (approveButton) {
    approveItem(approveButton.dataset.approve);
    return;
  }

  if (!actionButton) return;

  switch (actionButton.dataset.action) {
    case "run":
      runExecution();
      break;
    case "new-task":
      createTask();
      break;
    case "clear-logs":
      state.logs = [];
      render();
      break;
  }
});

render();
setInterval(updateClock, 1000);

