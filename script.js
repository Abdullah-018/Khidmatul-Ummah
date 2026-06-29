let kuData = loadKUData();
let archiveVisible = false;

function initPublicSite() {
  bindMenu();
  applyEditableTexts();
  renderStats();
  renderDynamicProjects();
  renderDonationAccounts();
  bindDonationForm();
  bindArchiveButtons();
  renderLibrary();
  bindLibraryFilters();
  renderShura();
}

function bindMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

function applyEditableTexts() {
  document.querySelectorAll("[data-text]").forEach(el => {
    const key = el.dataset.text;
    if (kuData.texts && kuData.texts[key]) el.textContent = kuData.texts[key];
  });
  const libraryTitle = document.querySelector("#library .section-heading h2");
  const libraryIntro = document.querySelector("#library .section-heading p:not(.eyebrow)");
  const shuraTitle = document.querySelector("#shura .section-heading h2");
  const shuraIntro = document.querySelector("#shura .section-heading p:not(.eyebrow)");
  const footerText = document.querySelector(".site-footer > p");
  if (libraryTitle) libraryTitle.textContent = kuData.texts.libraryTitle;
  if (libraryIntro) libraryIntro.textContent = kuData.texts.libraryIntro;
  if (shuraTitle) shuraTitle.textContent = kuData.texts.shuraTitle;
  if (shuraIntro) shuraIntro.textContent = kuData.texts.shuraIntro;
  if (footerText) footerText.textContent = kuData.texts.footerText;
  document.title = `${kuData.texts.organizationName} | ${kuData.texts.slogan}`;
}

function renderStats() {
  const total = totalCompletedExpense(kuData);
  const stat = document.getElementById("home-total-expense");
  if (stat) stat.textContent = `${formatBDT(total || 500000)}+`;
}

function projectMedia(project) {
  if (project && project.featuredImage) {
    return `<div class="media-box"><img src="${project.featuredImage}" alt="${escapeHTML(project.title)}"></div>`;
  }
  return `<div class="media-box"><span>${escapeHTML(project?.title || "খিদমাতুল উম্মাহ")}</span></div>`;
}

function projectCard(project, featured = false) {
  if (!project) return `<article class="dynamic-card"><p class="muted">এখনো কোনো তথ্য publish করা হয়নি।</p></article>`;
  const isCompleted = project.type === "completed";
  const amountLabel = isCompleted ? "প্রকল্প ব্যয়" : "লক্ষ্য এমাউন্ট";
  const amount = isCompleted ? project.expense : project.target;
  return `
    <article class="dynamic-card ${featured ? "featured" : ""}">
      ${projectMedia(project)}
      <span class="tag">${isCompleted ? "কমপ্লিট প্রকল্প" : "পরবর্তী প্রকল্প"}</span>
      <h3>${escapeHTML(project.title)}</h3>
      <p>${escapeHTML(project.short || project.details || "")}</p>
      <div class="meta">
        <span>${formatDateBN(project.date)}</span>
        <span>${escapeHTML(project.location || "লোকেশন নেই")}</span>
      </div>
      <strong class="amount">${amountLabel}: ${formatBDT(amount)}</strong>
      ${project.jimmadar ? `<p class="muted">জিম্মাদার: ${escapeHTML(project.jimmadar)}</p>` : ""}
      ${project.videoUrl ? `<a class="btn ghost small" href="${escapeHTML(project.videoUrl)}" target="_blank" rel="noopener">ভিডিও দেখুন</a>` : ""}
    </article>
  `;
}

function renderDynamicProjects() {
  const published = kuData.projects.filter(p => p.status === "published");
  const completed = sortByDateDesc(published.filter(p => p.type === "completed"));
  const upcoming = sortByDateDesc(published.filter(p => p.type === "upcoming"));
  const latest = completed[0];
  const next = upcoming[0];

  const latestSlot = document.getElementById("latest-completed-project");
  const nextSlot = document.getElementById("next-project-card");
  const upcomingHighlight = document.getElementById("upcoming-highlight");
  const archive = document.getElementById("completed-project-archive");

  if (latestSlot) latestSlot.innerHTML = projectCard(latest, true);
  if (nextSlot) nextSlot.innerHTML = projectCard(next, true);
  if (upcomingHighlight) {
    upcomingHighlight.innerHTML = next ? `
      <div>
        <p class="eyebrow" style="color:#cfffbe">বিজ্ঞাপনের মতো হাইলাইটেড পরবর্তী প্রকল্প</p>
        <h2>${escapeHTML(next.title)}</h2>
        <p>${escapeHTML(next.details || next.short || "")}</p>
        <div class="meta">
          <span>${formatDateBN(next.date)}</span>
          <span>${escapeHTML(next.location || "")}</span>
          <span>লক্ষ্য: ${formatBDT(next.target)}</span>
        </div>
        <a class="btn" href="#donate">এই প্রকল্পে দান করুন</a>
      </div>
      ${projectMedia(next)}
    ` : "";
  }
  if (archive) archive.innerHTML = completed.map(p => projectCard(p)).join("") || `<article class="dynamic-card"><p class="muted">কোনো সম্পন্ন প্রকল্প পাওয়া যায়নি।</p></article>`;
}

function bindArchiveButtons() {
  const showBtn = document.getElementById("show-all-completed");
  const hideBtn = document.getElementById("hide-all-completed");
  const wrap = document.getElementById("completed-project-archive-wrap");
  if (!wrap) return;
  if (showBtn) showBtn.addEventListener("click", () => { archiveVisible = true; wrap.hidden = false; wrap.scrollIntoView({ behavior: "smooth", block: "start" }); });
  if (hideBtn) hideBtn.addEventListener("click", () => { archiveVisible = false; wrap.hidden = true; });
}

function renderDonationAccounts() {
  const fieldset = document.querySelector(".payment-methods");
  const instructions = document.getElementById("payment-instructions");
  const active = kuData.accounts.filter(a => a.active);
  if (!fieldset) return;
  fieldset.innerHTML = `<legend>দান পাঠানোর পদ্ধতি</legend>` + active.map((a, i) => `
    <label class="payment-option">
      <input type="radio" name="payment-method" value="${escapeHTML(a.id)}" ${i === 0 ? "checked" : ""}>
      <span>${escapeHTML(a.type)}</span>
    </label>
  `).join("");
  fieldset.querySelectorAll('input[name="payment-method"]').forEach(radio => {
    radio.addEventListener("change", updatePaymentInstructions);
  });
  updatePaymentInstructions();
}

function updatePaymentInstructions() {
  const instructions = document.getElementById("payment-instructions");
  const selected = document.querySelector('input[name="payment-method"]:checked');
  if (!instructions) return;
  const account = kuData.accounts.find(a => a.id === selected?.value) || kuData.accounts.find(a => a.active);
  if (!account) {
    instructions.innerHTML = `<strong>দান পাঠানোর account এখনো add করা হয়নি।</strong><span>Admin panel থেকে account যোগ করুন।</span>`;
    return;
  }
  instructions.innerHTML = `
    <strong>${escapeHTML(account.type)}-এ দান পাঠানোর নির্দেশনা</strong>
    <span>${escapeHTML(account.instruction || "দান পাঠিয়ে Transaction ID সংরক্ষণ করুন।")}</span>
    <ul><li><b>${escapeHTML(account.type)}:</b> ${escapeHTML(account.number)} — ${escapeHTML(account.holder)}</li></ul>
  `;
}

function bindDonationForm() {
  const form = document.getElementById("donation-form");
  const printButton = document.getElementById("print-receipt");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const selected = document.querySelector('input[name="payment-method"]:checked');
    const account = kuData.accounts.find(a => a.id === selected?.value) || kuData.accounts.find(a => a.active);
    const donation = {
      id: "KU-" + Date.now().toString().slice(-8),
      fund: getValue("fund-type"),
      amount: Number(getValue("donation-amount") || 0),
      donorName: getValue("donor-name"),
      mobile: getValue("donor-mobile"),
      email: getValue("donor-email"),
      address: getValue("donor-address"),
      paymentMethod: account ? account.type : "",
      accountNumber: account ? account.number : "",
      accountHolder: account ? account.holder : "",
      transactionId: getValue("transaction-id"),
      date: new Date().toISOString(),
      status: "Pending",
      adminNote: ""
    };
    kuData.donations.push(donation);
    upsertDonorFromDonation(kuData, donation);
    saveKUData(kuData);
    renderReceipt(donation);
    form.reset();
    renderDonationAccounts();
  });
  if (printButton) printButton.addEventListener("click", () => window.print());
}

function renderReceipt(donation) {
  const card = document.getElementById("receipt-card");
  if (!card) return;
  setText("receipt-id", donation.id);
  setText("receipt-date", new Intl.DateTimeFormat("bn-BD", { dateStyle: "medium", timeStyle: "short" }).format(new Date(donation.date)));
  setText("receipt-name", donation.donorName);
  setText("receipt-mobile", donation.mobile);
  setText("receipt-fund", donation.fund);
  setText("receipt-method", donation.paymentMethod + (donation.transactionId ? ` • ${donation.transactionId}` : ""));
  setText("receipt-amount", formatBDT(donation.amount));
  card.hidden = false;
  card.scrollIntoView({ behavior: "smooth", block: "center" });
}

function bindLibraryFilters() {
  const search = document.getElementById("book-search");
  const cat = document.getElementById("book-category-filter");
  if (search) search.addEventListener("input", renderLibrary);
  if (cat) cat.addEventListener("change", renderLibrary);
}

function renderLibrary() {
  const grid = document.getElementById("library-grid");
  const catSelect = document.getElementById("book-category-filter");
  if (!grid) return;
  const categories = [...new Set(kuData.books.map(b => b.category).filter(Boolean))];
  if (catSelect) {
    const current = catSelect.value;
    catSelect.innerHTML = `<option value="">সব ক্যাটাগরি</option>` + categories.map(c => `<option value="${escapeHTML(c)}">${escapeHTML(c)}</option>`).join("");
    catSelect.value = current;
  }
  const q = (document.getElementById("book-search")?.value || "").trim().toLowerCase();
  const cat = catSelect?.value || "";
  const books = kuData.books.filter(book => {
    const text = `${book.name} ${book.author} ${book.category} ${book.language}`.toLowerCase();
    return (!q || text.includes(q)) && (!cat || book.category === cat);
  });
  grid.innerHTML = books.length ? books.map(book => `
    <article class="book-card">
      <div class="book-cover">${book.coverUrl ? `<img src="${book.coverUrl}" alt="${escapeHTML(book.name)}">` : escapeHTML(book.category || "বই")}</div>
      <span class="tag">${escapeHTML(translateStatus(book.status || "উপলব্ধ"))}</span>
      <h3>${escapeHTML(book.name)}</h3>
      <p class="muted">লেখক: ${escapeHTML(book.author || "-")}</p>
      <p>ক্যাটাগরি: ${escapeHTML(book.category || "-")} • ভাষা: ${escapeHTML(book.language || "-")}</p>
      <strong>সংখ্যা: ${formatNumberBN(book.quantity || 0)}</strong>
      <p class="muted">${escapeHTML(book.description || "")}</p>
    </article>
  `).join("") : `<article class="book-card"><p class="muted">কোনো বই পাওয়া যায়নি।</p></article>`;
}

function renderShura() {
  const grid = document.getElementById("shura-grid");
  if (!grid) return;
  const members = kuData.shura.filter(m => m.active).sort((a,b)=>Number(a.order || 0)-Number(b.order || 0));
  grid.innerHTML = members.length ? members.map(member => `
    <article class="member-card">
      <div class="member-photo">${member.photoUrl ? `<img src="${member.photoUrl}" alt="${escapeHTML(member.name)}">` : escapeHTML((member.name || "KU").slice(0, 2))}</div>
      <span class="tag">${escapeHTML(member.role || "শূরা সদস্য")}</span>
      <h3>${escapeHTML(member.name)}</h3>
      <p><strong>${escapeHTML(member.position || "")}</strong></p>
      <p class="muted">${escapeHTML(member.bio || "")}</p>
      <small>সেশন: ${escapeHTML(member.session || "")}</small>
    </article>
  `).join("") : `<article class="member-card"><p class="muted">শূরা সদস্য তথ্য এখনো publish করা হয়নি।</p></article>`;
}

function getValue(id) { return document.getElementById(id)?.value.trim() || ""; }
function setText(id, value) { const el = document.getElementById(id); if (el) el.textContent = value || "-"; }

document.addEventListener("DOMContentLoaded", initPublicSite);
