// ===== Initialize Supabase =====
const supabaseUrl = 'https://xxkjkrauwifjqvjazmis.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4a2prcmF1d2lmanF2amF6bWlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2Mzc4NzcsImV4cCI6MjA3NTIxMzg3N30.4JL279pqkcopdpgGOuMchgyA_uxUCCniANN69_RDH1I';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// ===== Global Variables =====
let userId = null;
let records = [];
let editId = null;

// ===== Wait for DOM =====
document.addEventListener("DOMContentLoaded", async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    alert("Session expired. Please login again.");
    window.location.href = "index.html";
    return;
  }

  userId = user.id;
  console.log("Logged in as:", user.email);

  await fetchRecords();

  // Event listeners
  document.getElementById("addForm").addEventListener("submit", addRecord);
  document.getElementById("applyFilters").addEventListener("click", applyFilters);
  document.getElementById("clearFilters").addEventListener("click", clearFilters);
  document.getElementById("editForm").addEventListener("submit", saveEdit);
  document.getElementById("cancelEdit").addEventListener("click", cancelEdit);
  document.getElementById("logoutBtn").addEventListener("click", logout);
});

// ===== Fetch Records =====
async function fetchRecords() {
  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false });

  if (error) {
    console.error("Fetch error:", error);
    alert("Error fetching records.");
    return;
  }

  records = data || [];
  renderTable();
  updateSummary();
  renderReports();
}

// ===== Add Record =====
async function addRecord(e) {
  e.preventDefault();

  const amount = parseFloat(document.getElementById("amount").value);
  const date = document.getElementById("date").value;
  const type = document.getElementById("type").value.toLowerCase();
  const category = document.getElementById("category").value || "Other";
  const note = document.getElementById("note").value.trim();

  if (!amount || amount <= 0) return alert("Enter valid amount.");
  if (!date) return alert("Select a date.");

  const { data, error } = await supabase
    .from("expenses")
    .insert([{ amount, date, type, category, note, user_id: userId }])
    .select();

  if (error) {
    console.error(error);
    alert("Insert failed: " + error.message);
    return;
  }

  records.unshift(data[0]);
  renderTable();
  updateSummary();
  renderReports();
  e.target.reset();
}

// ===== Edit =====
function startEdit(id) {
  const r = records.find(x => x.id === id);
  if (!r) return;
  editId = id;
  document.getElementById("editAmount").value = r.amount;
  document.getElementById("editDate").value = r.date;
  document.getElementById("editType").value = r.type;
  document.getElementById("editCategory").value = r.category;
  document.getElementById("editNote").value = r.note || "";
  document.getElementById("editModal").classList.remove("hidden");
}

async function saveEdit(e) {
  e.preventDefault();
  if (!editId) return;

  const amount = parseFloat(document.getElementById("editAmount").value);
  const date = document.getElementById("editDate").value;
  const type = document.getElementById("editType").value;
  const category = document.getElementById("editCategory").value;
  const note = document.getElementById("editNote").value;

  if (!amount || amount <= 0) return alert("Enter valid amount.");
  if (!date) return alert("Select a date.");

  const { error } = await supabase
    .from("expenses")
    .update({ amount, date, type, category, note })
    .eq("id", editId);

  if (error) return alert("Update failed: " + error.message);

  document.getElementById("editModal").classList.add("hidden");
  editId = null;
  fetchRecords();
}

function cancelEdit(e) {
  e.preventDefault();
  document.getElementById("editModal").classList.add("hidden");
  editId = null;
}

// ===== Delete =====
async function deleteRecord(id) {
  if (!confirm("Delete this record?")) return;
  const { error } = await supabase.from("expenses").delete().eq("id", id);
  if (error) return alert("Delete failed: " + error.message);
  records = records.filter(r => r.id !== id);
  renderTable();
  updateSummary();
  renderReports();
}

// ===== Render Table (with filters) =====
function renderTable() {
  const tbody = document.querySelector("#expenseTable tbody");
  tbody.innerHTML = "";

  const categoryFilter = document.getElementById("filterCategory").value;
  const fromDate = document.getElementById("filterFrom").value;
  const toDate = document.getElementById("filterTo").value;

  const filtered = records.filter(r => {
    const d = new Date(r.date);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;
    if (categoryFilter && r.category !== categoryFilter) return false;
    if (from && d < from) return false;
    if (to && d > to) return false;
    return true;
  });

  filtered.forEach(r => {
    const color = r.type === "income" ? "#00ff9d" : "#ff3264";
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>₹${r.amount}</td>
      <td>${r.date}</td>
      <td style="color:${color}">${r.type}</td>
      <td>${r.category}</td>
      <td>${r.note || "-"}</td>
      <td>
        <button class="btn tiny ghost" onclick="startEdit(${r.id})">Edit</button>
        <button class="btn tiny danger" onclick="deleteRecord(${r.id})">Delete</button>
      </td>`;
    tbody.appendChild(tr);
  });

  if (filtered.length === 0) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="6" style="text-align:center; color:#888;">No records found</td>`;
    tbody.appendChild(tr);
  }
}

// ===== Filters =====
function applyFilters(e) {
  e.preventDefault();
  renderTable();
}

function clearFilters(e) {
  e.preventDefault();
  document.getElementById("filterCategory").value = "";
  document.getElementById("filterFrom").value = "";
  document.getElementById("filterTo").value = "";
  renderTable();
}

// ===== Summary =====
function updateSummary() {
  let inc = 0, exp = 0;
  records.forEach(r => {
    if (r.type === "income") inc += +r.amount;
    else exp += +r.amount;
  });
  document.getElementById("totalIncome").textContent = "₹" + inc.toLocaleString();
  document.getElementById("totalSpending").textContent = "₹" + exp.toLocaleString();
  document.getElementById("netBalance").textContent = "₹" + (inc - exp).toLocaleString();
}

// ===== Reports =====
function renderReports() {
  const catEl = document.getElementById("reportByCategory");
  const monthEl = document.getElementById("reportByMonth");
  if (!catEl || !monthEl) return; // skip if not found

  const byCat = {};
  records.forEach(r => {
    byCat[r.category] = (byCat[r.category] || 0) + (r.type === "expense" ? r.amount : 0);
  });
  catEl.innerHTML = Object.entries(byCat)
    .map(([c, v]) => `<div>${c}: ₹${v}</div>`).join("") || "<div class='muted'>No data</div>";

  const byMonth = {};
  records.forEach(r => {
    const d = new Date(r.date);
    const m = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    if (!byMonth[m]) byMonth[m] = { income: 0, expense: 0 };
    byMonth[m][r.type] += r.amount;
  });
  monthEl.innerHTML = Object.entries(byMonth)
    .map(([m, v]) => `<div>${m} — Income ₹${v.income} | Spent ₹${v.expense}</div>`).join("") || "<div class='muted'>No data</div>";
}

// expose
window.startEdit = startEdit;
window.deleteRecord = deleteRecord;
