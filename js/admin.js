let data = loadKUData();

const TEXT_LABELS = [
  { group: "ওয়েবসাইট: পরিচয়", key: "organizationName", label: "সংগঠনের নাম" },
  { group: "ওয়েবসাইট: পরিচয়", key: "slogan", label: "স্লোগান" },
  { group: "ওয়েবসাইট: হোম", key: "heroEyebrow", label: "হিরো ছোট টেক্সট" },
  { group: "ওয়েবসাইট: হোম", key: "heroTitle", label: "হিরো শিরোনাম" },
  { group: "ওয়েবসাইট: হোম", key: "heroCopy", label: "হিরো প্যারাগ্রাফ", long: true },
  { group: "ওয়েবসাইট: হোম", key: "heroDonateBtn", label: "হিরো দান বাটন" },
  { group: "ওয়েবসাইট: হোম", key: "heroProjectBtn", label: "হিরো প্রকল্প বাটন" },
  { group: "ওয়েবসাইট: হোম", key: "heroPanelSmall", label: "সেবার অগ্রগতি ছোট টেক্সট" },
  { group: "ওয়েবসাইট: হোম", key: "heroPanelText", label: "সেবার অগ্রগতি প্যারাগ্রাফ", long: true },
  { group: "ওয়েবসাইট: ফাউন্ডেশন", key: "foundationEyebrow", label: "ফাউন্ডেশন ছোট টেক্সট" },
  { group: "ওয়েবসাইট: ফাউন্ডেশন", key: "foundationTitle", label: "ফাউন্ডেশন শিরোনাম" },
  { group: "ওয়েবসাইট: ফাউন্ডেশন", key: "foundationIntro", label: "ফাউন্ডেশন ভূমিকা", long: true },
  { group: "ওয়েবসাইট: কার্যক্রম", key: "activityEyebrow", label: "কার্যক্রম ছোট টেক্সট" },
  { group: "ওয়েবসাইট: কার্যক্রম", key: "activityTitle", label: "কার্যক্রম শিরোনাম" },
  { group: "ওয়েবসাইট: কার্যক্রম", key: "activityIntro", label: "কার্যক্রম ভূমিকা", long: true },
  { group: "ওয়েবসাইট: About/Donate", key: "aboutTitle", label: "পরিচিতি শিরোনাম" },
  { group: "ওয়েবসাইট: About/Donate", key: "donateTitle", label: "দান শিরোনাম" },
  { group: "ওয়েবসাইট: About/Donate", key: "donateText", label: "দান প্যারাগ্রাফ", long: true },
  { group: "ওয়েবসাইট: লাইব্রেরি/শূরা", key: "libraryTitle", label: "লাইব্রেরি শিরোনাম" },
  { group: "ওয়েবসাইট: লাইব্রেরি/শূরা", key: "libraryIntro", label: "লাইব্রেরি প্যারাগ্রাফ", long: true },
  { group: "ওয়েবসাইট: লাইব্রেরি/শূরা", key: "shuraTitle", label: "শূরা শিরোনাম" },
  { group: "ওয়েবসাইট: লাইব্রেরি/শূরা", key: "shuraIntro", label: "শূরা প্যারাগ্রাফ", long: true },
  { group: "ওয়েবসাইট: রিপোর্ট/স্বেচ্ছাসেবক", key: "reportEyebrow", label: "রিপোর্ট ছোট টেক্সট" },
  { group: "ওয়েবসাইট: রিপোর্ট/স্বেচ্ছাসেবক", key: "reportTitle", label: "রিপোর্ট শিরোনাম" },
  { group: "ওয়েবসাইট: রিপোর্ট/স্বেচ্ছাসেবক", key: "volunteerEyebrow", label: "স্বেচ্ছাসেবক ছোট টেক্সট" },
  { group: "ওয়েবসাইট: রিপোর্ট/স্বেচ্ছাসেবক", key: "volunteerTitle", label: "স্বেচ্ছাসেবক শিরোনাম" },
  { group: "ওয়েবসাইট: রিপোর্ট/স্বেচ্ছাসেবক", key: "volunteerIntro", label: "স্বেচ্ছাসেবক প্যারাগ্রাফ", long: true },
  { group: "ওয়েবসাইট: ফুটার/নেভিগেশন", key: "footerText", label: "ফুটার টেক্সট", long: true },
  { group: "ওয়েবসাইট: ফুটার/নেভিগেশন", key: "navAdmin", label: "এডমিন লিংক টেক্সট" },
  { group: "ওয়েবসাইট: ফুটার/নেভিগেশন", key: "navDonate", label: "দান বাটনের টেক্সট" },
  { group: "এডমিন: লগইন", key: "adminLoginTitle", label: "লগইন শিরোনাম" },
  { group: "এডমিন: লগইন", key: "adminUsername", label: "ইউজারনেম লেবেল" },
  { group: "এডমিন: লগইন", key: "adminPassword", label: "পাসওয়ার্ড লেবেল" },
  { group: "এডমিন: লগইন", key: "adminLoginButton", label: "লগইন বাটন" },
  { group: "এডমিন: মেনু", key: "adminPanelSmall", label: "প্যানেল সাবটাইটেল" },
  { group: "এডমিন: মেনু", key: "adminNavDashboard", label: "ড্যাশবোর্ড মেনু" },
  { group: "এডমিন: মেনু", key: "adminNavProjects", label: "প্রকল্প মেনু" },
  { group: "এডমিন: মেনু", key: "adminNavDonations", label: "দান ও রসিদ মেনু" },
  { group: "এডমিন: মেনু", key: "adminNavDonors", label: "ডোনার মেনু" },
  { group: "এডমিন: মেনু", key: "adminNavAccounts", label: "একাউন্ট মেনু" },
  { group: "এডমিন: মেনু", key: "adminNavLibrary", label: "লাইব্রেরি মেনু" },
  { group: "এডমিন: মেনু", key: "adminNavShura", label: "শূরা মেনু" },
  { group: "এডমিন: মেনু", key: "adminNavTexts", label: "টেক্সট ইডিটর মেনু" },
  { group: "এডমিন: মেনু", key: "adminNavBackup", label: "ব্যাকআপ মেনু" },
  { group: "এডমিন: টপবার", key: "adminTopEyebrow", label: "টপবার ছোট টেক্সট" },
  { group: "এডমিন: টপবার", key: "adminTopTitle", label: "টপবার শিরোনাম" },
  { group: "এডমিন: টপবার", key: "adminTopIntro", label: "টপবার প্যারাগ্রাফ", long: true },
  { group: "এডমিন: টপবার", key: "adminViewWebsite", label: "ওয়েবসাইট দেখুন বাটন" },
  { group: "এডমিন: টপবার", key: "adminLogout", label: "লগআউট বাটন" },
  { group: "এডমিন: সেকশন", key: "adminQuickNotesTitle", label: "দ্রুত নোট শিরোনাম" },
  { group: "এডমিন: সেকশন", key: "adminQuickNotesText", label: "দ্রুত নোট প্যারাগ্রাফ", long: true },
  { group: "এডমিন: সেকশন", key: "adminProjectsTitle", label: "প্রকল্প সেকশন শিরোনাম" },
  { group: "এডমিন: সেকশন", key: "adminProjectsIntro", label: "প্রকল্প সেকশন প্যারাগ্রাফ", long: true },
  { group: "এডমিন: সেকশন", key: "adminDonationsTitle", label: "দান/রসিদ শিরোনাম" },
  { group: "এডমিন: সেকশন", key: "adminDonationsIntro", label: "দান/রসিদ প্যারাগ্রাফ", long: true },
  { group: "এডমিন: সেকশন", key: "adminDonorsTitle", label: "ডোনার শিরোনাম" },
  { group: "এডমিন: সেকশন", key: "adminDonorsIntro", label: "ডোনার প্যারাগ্রাফ", long: true },
  { group: "এডমিন: সেকশন", key: "adminAccountsTitle", label: "দানের একাউন্ট শিরোনাম" },
  { group: "এডমিন: সেকশন", key: "adminLibraryTitle", label: "লাইব্রেরি শিরোনাম" },
  { group: "এডমিন: সেকশন", key: "adminShuraTitle", label: "শূরা শিরোনাম" },
  { group: "এডমিন: সেকশন", key: "adminTextsTitle", label: "টেক্সট ইডিটর শিরোনাম" },
  { group: "এডমিন: সেকশন", key: "adminTextsIntro", label: "টেক্সট ইডিটর প্যারাগ্রাফ", long: true },
  { group: "এডমিন: সেকশন", key: "adminBackupTitle", label: "ব্যাকআপ শিরোনাম" },
  { group: "এডমিন: সেকশন", key: "adminBackupIntro", label: "ব্যাকআপ প্যারাগ্রাফ", long: true }
];

async function initAdmin() {
  if (typeof loadKUDataAsync === "function") {
    data = await loadKUDataAsync();
  }
  syncDonorsFromDonations(data);
  saveKUData(data);
  applyAdminTexts();
  bindLogin();
  bindTabs();
  bindProjectForm();
  bindAccountForm();
  bindBookForm();
  bindShuraForm();
  bindDonorForm();
  bindBackupTools();
  renderTextEditor();
  renderAll();
  if (typeof hasAdminSessionAsync === "function" && await hasAdminSessionAsync()) showAdminApp();
}

function bindLogin() {
  const form = document.getElementById("login-form");
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const user = document.getElementById("login-user").value.trim();
    const pass = document.getElementById("login-pass").value.trim();
    try {
      const ok = typeof signInAdminAsync === "function"
        ? await signInAdminAsync(user, pass)
        : user === "KU-Admin" && pass === "KU@24445";
      if (!ok) throw new Error("Login failed");
      sessionStorage.setItem("ku_admin_logged_in", "true");
      if (typeof loadKUDataAsync === "function") data = await loadKUDataAsync();
      showAdminApp();
    } catch (error) {
      document.getElementById("login-error").textContent = "ইউজারনেম বা পাসওয়ার্ড সঠিক নয়।";
    }
  });
  document.getElementById("logout-btn").addEventListener("click", async () => {
    if (typeof signOutAdminAsync === "function") await signOutAdminAsync();
    sessionStorage.removeItem("ku_admin_logged_in");
    document.getElementById("admin-app").classList.add("hidden");
    document.getElementById("login-screen").classList.remove("hidden");
  });
}

function showAdminApp() {
  document.getElementById("login-screen").classList.add("hidden");
  document.getElementById("admin-app").classList.remove("hidden");
  applyAdminTexts();
  renderAll();
}

function applyAdminTexts() {
  document.querySelectorAll("[data-text]").forEach(el => {
    const key = el.dataset.text;
    if (data.texts && data.texts[key]) el.textContent = data.texts[key];
  });
  document.title = `${data.texts.adminPanelSmall || "এডমিন প্যানেল"} | ${data.texts.organizationName || "খিদমাতুল উম্মাহ"}`;
}

function bindTabs() {
  document.querySelectorAll("[data-admin-tab]").forEach(button => {
    button.addEventListener("click", () => openTabDirect(button.dataset.adminTab));
  });
}
function openTabDirect(tab) {
  document.querySelectorAll("[data-admin-tab]").forEach(b => b.classList.toggle("active", b.dataset.adminTab === tab));
  document.querySelectorAll(".admin-section").forEach(section => section.classList.remove("active"));
  document.getElementById(`tab-${tab}`)?.classList.add("active");
}

function renderAll() {
  syncDonorsFromDonations(data);
  renderDashboard();
  renderProjectsTable();
  renderDonationTable();
  renderDonorTable();
  renderAccountsTable();
  renderBooksTable();
  renderShuraTable();
}
async function saveAndRender() {
  syncDonorsFromDonations(data);
  try {
    if (typeof saveKUDataAsync === "function") await saveKUDataAsync(data);
    else saveKUData(data);
  } catch (error) {
    alert("Supabase-এ সেভ করা যায়নি। Login/session বা RLS policy চেক করুন।");
  }
  applyAdminTexts();
  renderAll();
}

function renderDashboard() {
  const completed = data.projects.filter(p => p.type === "completed" && p.status === "published");
  const upcoming = data.projects.filter(p => p.type === "upcoming" && p.status === "published");
  const verifiedDonations = data.donations.filter(d => ["Verified", "Approved"].includes(d.status));
  const pending = data.donations.filter(d => d.status === "Pending");
  const cards = [
    ["কমপ্লিট প্রকল্প", formatNumberBN(completed.length)],
    ["পরবর্তী প্রকল্প", formatNumberBN(upcoming.length)],
    ["মোট প্রকল্প ব্যয়", formatBDT(totalCompletedExpense(data))],
    ["মোট দান", formatBDT(verifiedDonations.reduce((s,d)=>s+Number(d.amount||0),0))],
    ["Pending Donation", formatNumberBN(pending.length)],
    ["মোট ডোনার", formatNumberBN((data.donors || []).length)],
    ["লাইব্রেরির বই", formatNumberBN((data.books || []).length)],
    ["সক্রিয় শূরা সদস্য", formatNumberBN((data.shura || []).filter(m=>m.active).length)]
  ];
  document.getElementById("dashboard-summary").innerHTML = cards.map(([label, value]) => `<article class="summary-card"><span>${label}</span><strong>${value}</strong></article>`).join("");
}

function bindProjectForm() {
  document.getElementById("project-form").addEventListener("submit", async e => {
    e.preventDefault();
    const id = getVal("project-id") || makeId();
    const existing = data.projects.find(p => p.id === id) || {};
    const fileData = await getAdminAsset("project-images", document.getElementById("project-image-file").files[0], "projects");
    const project = {
      id,
      type: getVal("project-type"),
      status: getVal("project-status"),
      title: getVal("project-title"),
      date: getVal("project-date"),
      location: getVal("project-location"),
      jimmadar: getVal("project-jimmadar"),
      expense: Number(getVal("project-expense") || 0),
      target: Number(getVal("project-target") || 0),
      short: getVal("project-short"),
      details: getVal("project-details"),
      featuredImage: fileData || getVal("project-image-url") || existing.featuredImage || "",
      videoUrl: getVal("project-video-url")
    };
    upsert(data.projects, project);
    clearProjectForm();
    await saveAndRender();
    alert("প্রকল্প সেভ হয়েছে।");
  });
  document.getElementById("project-clear").addEventListener("click", clearProjectForm);
}
function clearProjectForm() { document.getElementById("project-form").reset(); setVal("project-id", ""); setVal("project-expense", 0); setVal("project-target", 0); }
function renderProjectsTable() {
  document.getElementById("project-table").innerHTML = sortByDateDesc(data.projects).map(p => {
    const amount = p.type === "completed" ? p.expense : p.target;
    return `<tr><td><b>${escapeHTML(p.title)}</b></td><td>${translateProjectType(p.type)}</td><td>${translateStatus(p.status)}</td><td>${formatDateBN(p.date)}</td><td>${formatBDT(amount)}</td><td><div class="action-row"><button class="btn small soft" onclick="editProject('${p.id}')">এডিট</button><button class="btn small danger" onclick="deleteProject('${p.id}')">ডিলিট</button></div></td></tr>`;
  }).join("");
}
window.editProject = function(id) {
  const p = data.projects.find(item => item.id === id); if (!p) return;
  setVal("project-id", p.id); setVal("project-type", p.type); setVal("project-status", p.status); setVal("project-title", p.title); setVal("project-date", p.date); setVal("project-location", p.location); setVal("project-jimmadar", p.jimmadar); setVal("project-expense", p.expense); setVal("project-target", p.target); setVal("project-short", p.short); setVal("project-details", p.details); setVal("project-image-url", p.featuredImage && !p.featuredImage.startsWith("data:") ? p.featuredImage : ""); setVal("project-video-url", p.videoUrl); openTab("projects");
};
window.deleteProject = async function(id) { if (confirm("এই প্রকল্পটি ডিলিট করতে চান?")) { data.projects = data.projects.filter(p => p.id !== id); await saveAndRender(); } };

function renderDonationTable() {
  const rows = sortByDateDesc(data.donations).map(d => `<tr>
    <td><b>${escapeHTML(d.id)}</b><br><small>${formatDateBN(d.date)}</small></td>
    <td>${escapeHTML(d.donorName)}</td>
    <td>${escapeHTML(d.mobile)}</td>
    <td>${escapeHTML(d.fund)}</td>
    <td><b>${formatBDT(d.amount)}</b></td>
    <td>${escapeHTML(d.paymentMethod || "-")}<br><small>${escapeHTML(d.transactionId || "")}</small></td>
    <td><select onchange="updateDonationStatus('${d.id}', this.value)"><option value="Pending" ${selected(d.status,"Pending")}>অপেক্ষমাণ</option><option value="Verified" ${selected(d.status,"Verified")}>ভেরিফাইড</option><option value="Approved" ${selected(d.status,"Approved")}>অনুমোদিত</option><option value="Cancelled" ${selected(d.status,"Cancelled")}>বাতিল</option></select></td>
    <td><div class="action-row"><button class="btn small soft" onclick="printDonation('${d.id}')">রসিদ</button><button class="btn small danger" onclick="deleteDonation('${d.id}')">ডিলিট</button></div></td>
  </tr>`).join("");
  document.getElementById("donation-table").innerHTML = rows || `<tr><td colspan="8">এখনো কোনো দানের তথ্য নেই।</td></tr>`;
}
window.updateDonationStatus = async function(id, status) { const d = data.donations.find(item => item.id === id); if (d) { d.status = status; if (typeof updateDonationStatusAsync === "function") await updateDonationStatusAsync(id, status); await saveAndRender(); } };
window.deleteDonation = async function(id) { if (confirm("এই দানের তথ্য ডিলিট করতে চান?")) { data.donations = data.donations.filter(d => d.id !== id); if (typeof deleteDonationAsync === "function") await deleteDonationAsync(id); await saveAndRender(); } };
window.printDonation = function(id) {
  const d = data.donations.find(item => item.id === id); if (!d) return;
  const html = `<!doctype html><html lang="bn"><head><meta charset="utf-8"><title>রসিদ ${escapeHTML(d.id)}</title><style>body{font-family:Arial,sans-serif;padding:30px;color:#07110a}.receipt{max-width:620px;margin:auto;border:1px solid #d7ecd0;border-radius:18px;padding:24px}.head{display:flex;align-items:center;gap:12px;border-bottom:1px solid #d7ecd0;padding-bottom:12px;margin-bottom:14px}.head img{width:72px}h1{margin:0;color:#093b17}.line{display:flex;justify-content:space-between;border-bottom:1px solid #e8fbdc;padding:9px 0}.print{margin-top:18px}</style></head><body><div class="receipt"><div class="head"><img src="assets/khidmatul-ummah-official-logo-transparent.png"><div><h1>খিদমাতুল উম্মাহ</h1><strong>দানের রসিদ</strong></div></div><div class="line"><b>রসিদ নম্বর</b><span>${escapeHTML(d.id)}</span></div><div class="line"><b>তারিখ</b><span>${formatDateBN(d.date)}</span></div><div class="line"><b>দাতার নাম</b><span>${escapeHTML(d.donorName)}</span></div><div class="line"><b>মোবাইল</b><span>${escapeHTML(d.mobile)}</span></div><div class="line"><b>ফান্ড</b><span>${escapeHTML(d.fund)}</span></div><div class="line"><b>দান পদ্ধতি</b><span>${escapeHTML(d.paymentMethod || "-")}</span></div><div class="line"><b>পরিমাণ</b><span>${formatBDT(d.amount)}</span></div><div class="line"><b>স্ট্যাটাস</b><span>${translateStatus(d.status)}</span></div><p>আপনার দানের জন্য জাযাকাল্লাহু খাইরান।</p><button class="print" onclick="window.print()">প্রিন্ট করুন</button></div></body></html>`;
  const win = window.open("", "_blank");
  win.document.write(html);
  win.document.close();
};

function bindDonorForm() {
  document.getElementById("donor-form").addEventListener("submit", async e => {
    e.preventDefault();
    const id = getVal("admin-donor-id") || makeId();
    const existing = data.donors.find(d => d.id === id) || {};
    const donor = {
      ...existing,
      id,
      name: getVal("admin-donor-name"),
      mobile: getVal("admin-donor-mobile"),
      email: getVal("admin-donor-email"),
      address: getVal("admin-donor-address"),
      status: getVal("admin-donor-status"),
      note: getVal("admin-donor-note"),
      source: existing.source || "ম্যানুয়াল",
      totalAmount: existing.totalAmount || 0,
      totalDonations: existing.totalDonations || 0,
      lastDonationDate: existing.lastDonationDate || ""
    };
    upsert(data.donors, donor);
    clearDonorForm();
    await saveAndRender();
    alert("ডোনার তথ্য সেভ হয়েছে।");
  });
  document.getElementById("donor-clear").addEventListener("click", clearDonorForm);
}
function clearDonorForm() { document.getElementById("donor-form").reset(); setVal("admin-donor-id", ""); setVal("admin-donor-status", "Active"); }
function renderDonorTable() {
  const rows = (data.donors || []).map(d => `<tr>
    <td><b>${escapeHTML(d.name || "-")}</b><br><small>${escapeHTML(d.source || "-")}</small></td>
    <td>${escapeHTML(d.mobile || "-")}</td>
    <td>${escapeHTML(d.email || "-")}</td>
    <td>${formatBDT(d.totalAmount || 0)}</td>
    <td>${formatNumberBN(d.totalDonations || 0)}</td>
    <td>${d.lastDonationDate ? formatDateBN(d.lastDonationDate) : "-"}</td>
    <td>${translateStatus(d.status)}</td>
    <td><div class="action-row"><button class="btn small soft" onclick="editDonor('${d.id}')">এডিট</button><button class="btn small danger" onclick="deleteDonor('${d.id}')">ডিলিট</button></div></td>
  </tr>`).join("");
  document.getElementById("donor-table").innerHTML = rows || `<tr><td colspan="8">এখনো কোনো ডোনার তথ্য নেই।</td></tr>`;
}
window.editDonor = function(id) {
  const d = data.donors.find(item => item.id === id); if (!d) return;
  setVal("admin-donor-id", d.id); setVal("admin-donor-name", d.name); setVal("admin-donor-mobile", d.mobile); setVal("admin-donor-email", d.email); setVal("admin-donor-address", d.address); setVal("admin-donor-status", d.status || "Active"); setVal("admin-donor-note", d.note); openTab("donors");
};
window.deleteDonor = async function(id) { if (confirm("এই ডোনার তথ্য ডিলিট করতে চান?")) { data.donors = data.donors.filter(d => d.id !== id); await saveAndRender(); } };

function bindAccountForm() {
  document.getElementById("account-form").addEventListener("submit", async e => {
    e.preventDefault();
    const id = getVal("account-id") || makeId();
    const existing = data.accounts.find(a => a.id === id) || {};
    const fileData = await getAdminAsset("qr-codes", document.getElementById("account-qr-file").files[0], "accounts");
    const account = { id, type: getVal("account-type"), holder: getVal("account-holder"), number: getVal("account-number"), gatewayUrl: getVal("account-gateway-url"), qrImage: fileData || getVal("account-qr-url") || existing.qrImage || "", active: getVal("account-active") === "true", instruction: getVal("account-instruction") };
    upsert(data.accounts, account);
    clearAccountForm();
    await saveAndRender();
  });
  document.getElementById("account-clear").addEventListener("click", clearAccountForm);
}
function clearAccountForm() { document.getElementById("account-form").reset(); setVal("account-id", ""); setVal("account-gateway-url", ""); setVal("account-qr-url", ""); setVal("account-active", "true"); }
function renderAccountsTable() {
  document.getElementById("account-table").innerHTML = data.accounts.map(a => `<tr><td><b>${escapeHTML(a.type)}</b></td><td>${escapeHTML(a.holder)}</td><td>${escapeHTML(a.number)}</td><td>${a.qrImage ? "যোগ করা" : "নেই"}</td><td>${a.gatewayUrl ? "যোগ করা" : "নেই"}</td><td>${a.active ? "সক্রিয়" : "নিষ্ক্রিয়"}</td><td><div class="action-row"><button class="btn small soft" onclick="editAccount('${a.id}')">এডিট</button><button class="btn small danger" onclick="deleteAccount('${a.id}')">ডিলিট</button></div></td></tr>`).join("");
}
window.editAccount = function(id) { const a = data.accounts.find(item => item.id === id); if (!a) return; setVal("account-id", a.id); setVal("account-type", a.type); setVal("account-holder", a.holder); setVal("account-number", a.number); setVal("account-gateway-url", a.gatewayUrl || ""); setVal("account-qr-url", a.qrImage && !a.qrImage.startsWith("data:") ? a.qrImage : ""); setVal("account-active", String(a.active)); setVal("account-instruction", a.instruction); openTab("accounts"); };
window.deleteAccount = async function(id) { if (confirm("এই একাউন্ট ডিলিট করতে চান?")) { data.accounts = data.accounts.filter(a => a.id !== id); await saveAndRender(); } };

function bindBookForm() {
  document.getElementById("book-form").addEventListener("submit", async e => {
    e.preventDefault();
    const id = getVal("book-id") || makeId();
    const existing = data.books.find(b => b.id === id) || {};
    const fileData = await getAdminAsset("book-covers", document.getElementById("book-cover-file").files[0], "books");
    const book = { id, name: getVal("book-name"), author: getVal("book-author"), category: getVal("book-category"), language: getVal("book-language"), quantity: Number(getVal("book-quantity") || 0), status: getVal("book-status"), coverUrl: fileData || getVal("book-cover-url") || existing.coverUrl || "", description: getVal("book-description") };
    upsert(data.books, book);
    clearBookForm();
    await saveAndRender();
  });
  document.getElementById("book-clear").addEventListener("click", clearBookForm);
}
function clearBookForm() { document.getElementById("book-form").reset(); setVal("book-id", ""); setVal("book-language", "বাংলা"); setVal("book-quantity", 1); setVal("book-status", "উপলব্ধ"); }
function renderBooksTable() {
  document.getElementById("book-table").innerHTML = data.books.map(b => `<tr><td><b>${escapeHTML(b.name)}</b></td><td>${escapeHTML(b.author)}</td><td>${escapeHTML(b.category)}</td><td>${formatNumberBN(b.quantity)}</td><td>${translateStatus(b.status)}</td><td><div class="action-row"><button class="btn small soft" onclick="editBook('${b.id}')">এডিট</button><button class="btn small danger" onclick="deleteBook('${b.id}')">ডিলিট</button></div></td></tr>`).join("");
}
window.editBook = function(id) { const b = data.books.find(item => item.id === id); if (!b) return; setVal("book-id", b.id); setVal("book-name", b.name); setVal("book-author", b.author); setVal("book-category", b.category); setVal("book-language", b.language); setVal("book-quantity", b.quantity); setVal("book-status", b.status); setVal("book-cover-url", b.coverUrl && !b.coverUrl.startsWith("data:") ? b.coverUrl : ""); setVal("book-description", b.description); openTab("library"); };
window.deleteBook = async function(id) { if (confirm("এই বইটি ডিলিট করতে চান?")) { data.books = data.books.filter(b => b.id !== id); await saveAndRender(); } };

function bindShuraForm() {
  document.getElementById("shura-form").addEventListener("submit", async e => {
    e.preventDefault();
    const id = getVal("shura-id") || makeId();
    const existing = data.shura.find(m => m.id === id) || {};
    const fileData = await getAdminAsset("shura-photos", document.getElementById("shura-photo-file").files[0], "shura");
    const member = { id, name: getVal("shura-name"), position: getVal("shura-position"), role: getVal("shura-role"), session: getVal("shura-session"), order: normalizeShuraOrder(getVal("shura-order")), active: getVal("shura-active") === "true", phone: getVal("shura-phone"), email: getVal("shura-email"), photoUrl: fileData || getVal("shura-photo-url") || existing.photoUrl || "", bio: getVal("shura-bio") };
    upsert(data.shura, member);
    clearShuraForm();
    await saveAndRender();
  });
  document.getElementById("shura-clear").addEventListener("click", clearShuraForm);
  document.getElementById("shura-new").addEventListener("click", clearShuraForm);
}
function normalizeShuraOrder(value, fallback = 1) {
  const order = Number(value || fallback);
  if (!Number.isFinite(order)) return fallback;
  return Math.min(Math.max(Math.round(order), 1), 21);
}
function nextShuraOrder() {
  const used = new Set((data.shura || []).map(member => normalizeShuraOrder(member.order)));
  for (let order = 1; order <= 21; order += 1) {
    if (!used.has(order)) return order;
  }
  return 21;
}
function orderedShuraMembers(members) {
  const used = new Set();
  return [...members].map((member, index) => {
    let displayOrder = normalizeShuraOrder(member.order, index + 1);
    if (used.has(displayOrder)) {
      displayOrder = index + 1;
      while (displayOrder <= 21 && used.has(displayOrder)) displayOrder += 1;
    }
    displayOrder = Math.min(displayOrder, 21);
    used.add(displayOrder);
    return { ...member, displayOrder };
  }).sort((a,b)=>a.displayOrder-b.displayOrder);
}
function clearShuraForm() { document.getElementById("shura-form").reset(); setVal("shura-id", ""); setVal("shura-session", "২০২৬"); setVal("shura-order", nextShuraOrder()); setVal("shura-active", "true"); }
function renderShuraTable() {
  document.getElementById("shura-table").innerHTML = orderedShuraMembers(data.shura)
    .map((m, index) => `<tr><td><b>${formatNumberBN(m.displayOrder || index + 1)}</b></td><td>${escapeHTML(m.name)}</td><td>${escapeHTML(m.position)}</td><td>${escapeHTML(m.role)}</td><td>${escapeHTML(m.session)}</td><td>${m.active ? "সক্রিয়" : "নিষ্ক্রিয়"}</td><td><div class="action-row"><button class="btn small soft" onclick="editShura('${m.id}')">এডিট</button><button class="btn small danger" onclick="deleteShura('${m.id}')">ডিলিট</button></div></td></tr>`)
    .join("");
}
window.editShura = function(id) { const m = data.shura.find(item => item.id === id); if (!m) return; setVal("shura-id", m.id); setVal("shura-name", m.name); setVal("shura-position", m.position); setVal("shura-role", m.role); setVal("shura-session", m.session); setVal("shura-order", normalizeShuraOrder(m.order)); setVal("shura-active", String(m.active)); setVal("shura-phone", m.phone); setVal("shura-email", m.email); setVal("shura-photo-url", m.photoUrl && !m.photoUrl.startsWith("data:") ? m.photoUrl : ""); setVal("shura-bio", m.bio); openTab("shura"); };
window.deleteShura = async function(id) { if (confirm("এই সদস্যকে ডিলিট করতে চান?")) { data.shura = data.shura.filter(m => m.id !== id); await saveAndRender(); } };

function renderTextEditor() {
  const grouped = TEXT_LABELS.reduce((acc, item) => { (acc[item.group] ||= []).push(item); return acc; }, {});
  const form = document.getElementById("text-form");
  form.innerHTML = Object.entries(grouped).map(([group, items]) => `
    <fieldset class="text-group full">
      <legend>${escapeHTML(group)}</legend>
      <div class="form-grid">
        ${items.map(item => `
          <label class="${item.long ? "full" : ""}">${escapeHTML(item.label)}
            <textarea id="text-${item.key}" rows="${item.long ? 4 : 2}">${escapeHTML(data.texts[item.key] || "")}</textarea>
          </label>
        `).join("")}
      </div>
    </fieldset>
  `).join("") + `<div class="actions full sticky-save"><button class="btn" type="submit">সব লেখা সেভ করুন</button></div>`;
  form.onsubmit = async e => {
    e.preventDefault();
    TEXT_LABELS.forEach(item => data.texts[item.key] = document.getElementById(`text-${item.key}`).value);
    await saveAndRender();
    applyAdminTexts();
    renderAll();
    alert("টেক্সট সেভ হয়েছে। ওয়েবসাইট refresh করলে update দেখাবে।");
  };
}

function bindBackupTools() {
  document.getElementById("export-all").addEventListener("click", () => downloadJSON("khidmatul-ummah-cms-backup.json", data));
  document.getElementById("reset-data").addEventListener("click", async () => {
    if (confirm("সব ডেমো ডাটা reset করতে চান?")) {
      data = typeof resetKUDataAsync === "function" ? await resetKUDataAsync() : resetKUData();
      renderTextEditor();
      await saveAndRender();
    }
  });
  document.getElementById("import-data").addEventListener("click", async () => {
    const file = document.getElementById("import-file").files[0];
    if (!file) return alert("JSON backup file select করুন।");
    try {
      data = JSON.parse(await file.text());
      renderTextEditor();
      await saveAndRender();
      alert("Data import হয়েছে।");
    } catch (e) {
      alert("সঠিক JSON file নয়।");
    }
  });
}

function upsert(list, item) { const index = list.findIndex(x => x.id === item.id); if (index >= 0) list[index] = item; else list.push(item); }
async function getAdminAsset(bucket, file, prefix) {
  if (!file) return "";
  if (typeof uploadKUAsset === "function") return uploadKUAsset(bucket, file, prefix);
  return fileToDataURL(file);
}
function getVal(id) { return document.getElementById(id)?.value.trim() || ""; }
function setVal(id, value) { const el = document.getElementById(id); if (el) el.value = value ?? ""; }
function selected(a, b) { return a === b ? "selected" : ""; }
function openTab(tab) { openTabDirect(tab); window.scrollTo({ top: 0, behavior: "smooth" }); }

document.addEventListener("DOMContentLoaded", initAdmin);

