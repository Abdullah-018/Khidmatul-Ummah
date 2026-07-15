let kuData = loadKUData();
let archiveVisible = false;

async function initPublicSite() {
  if (typeof loadKUDataAsync === "function") {
    kuData = await loadKUDataAsync();
  }
  bindMenu();
  applyEditableTexts();
  renderStats();
  renderReminder();
  renderDynamicProjects();
  bindIslamicCalendar();
  renderDonationAccounts();
  bindZakatCalculator();
  bindDonationForm();
  bindArchiveButtons();
  renderLibrary();
  bindLibraryFilters();
  renderShura();
  startReminderRotation();
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
  const totalLabel = formatBDT(total);
  const stat = document.getElementById("home-total-expense");
  if (stat) stat.textContent = totalLabel;
  const impactTotal = document.querySelector(".impact-metrics article:first-child strong");
  if (impactTotal) impactTotal.textContent = totalLabel;
  const activityIntro = document.querySelector('[data-text="activityIntro"]');
  if (activityIntro) {
    activityIntro.textContent = `সম্পন্ন প্রকল্পগুলোর মোট ব্যয় ${totalLabel}; প্রতিটি কাজের হিসাব প্রকল্প ব্যয় থেকে স্বয়ংক্রিয়ভাবে আপডেট হয়।`;
  }
}

let reminderIndex = -1;
let calendarCursor = new Date();

const HIJRI_MONTHS = [
  "মুহাররম", "সফর", "রবিউল আউয়াল", "রবিউস সানি", "জুমাদাল উলা", "জুমাদাস সানি",
  "রজব", "শাবান", "রমজান", "শাওয়াল", "জিলকদ", "জিলহজ"
];

const ISLAMIC_EVENTS = [
  { month: 1, day: 1, title: "হিজরি নববর্ষ" },
  { month: 1, day: 10, title: "আশুরা" },
  { month: 7, day: 27, title: "ইসরা ও মিরাজ স্মরণ" },
  { month: 8, day: 15, title: "শবে বরাত স্মরণ" },
  { month: 9, day: 1, title: "রমজান শুরু" },
  { month: 9, day: 27, title: "লাইলাতুল কদর স্মরণ" },
  { month: 10, day: 1, title: "ঈদুল ফিতর" },
  { month: 12, day: 9, title: "আরাফার দিন" },
  { month: 12, day: 10, title: "ঈদুল আজহা" }
];

function renderReminder() {
  const reminders = Array.isArray(kuData.reminders) ? kuData.reminders.filter(item => item && item.text) : [];
  if (!reminders.length) return;
  reminderIndex = reminderIndex < 0 ? Math.floor(Math.random() * reminders.length) : (reminderIndex + 1) % reminders.length;
  const item = reminders[reminderIndex];
  setText("reminder-type", `${item.type || "স্মরণিকা"} • ${item.category || "আমল"}`);
  setText("reminder-text", item.text);
  setText("reminder-reference", item.reference || "");
}

function startReminderRotation() {
  if (!document.getElementById("reminder-text")) return;
  window.setInterval(renderReminder, 9000);
}

function bindIslamicCalendar() {
  if (!document.getElementById("calendar-grid")) return;
  const prev = document.getElementById("calendar-prev");
  const next = document.getElementById("calendar-next");
  const today = document.getElementById("calendar-today");
  const convertDate = document.getElementById("calendar-convert-date");
  if (prev) prev.addEventListener("click", () => changeCalendarMonth(-1));
  if (next) next.addEventListener("click", () => changeCalendarMonth(1));
  if (today) today.addEventListener("click", () => {
    calendarCursor = new Date();
    renderIslamicCalendar();
  });
  if (convertDate) {
    convertDate.valueAsDate = new Date();
    convertDate.addEventListener("change", renderHijriConverter);
  }
  renderIslamicCalendar();
  renderHijriConverter();
}

function changeCalendarMonth(direction) {
  calendarCursor = new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() + direction, 1);
  renderIslamicCalendar();
}

function renderIslamicCalendar() {
  const grid = document.getElementById("calendar-grid");
  if (!grid) return;
  const year = calendarCursor.getFullYear();
  const month = calendarCursor.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leadingBlanks = (firstDay.getDay() + 6) % 7;
  const today = new Date();
  const todayKey = dateKey(today);
  const title = document.getElementById("calendar-title");
  const range = document.getElementById("calendar-hijri-range");
  const monthDates = Array.from({ length: daysInMonth }, (_, index) => new Date(year, month, index + 1));
  const firstHijri = getHijriParts(monthDates[0]);
  const lastHijri = getHijriParts(monthDates[monthDates.length - 1]);
  if (title) title.textContent = new Intl.DateTimeFormat("bn-BD", { month: "long", year: "numeric" }).format(firstDay);
  if (range && firstHijri && lastHijri) {
    const startMonth = HIJRI_MONTHS[firstHijri.month - 1] || "";
    const endMonth = HIJRI_MONTHS[lastHijri.month - 1] || "";
    range.textContent = startMonth === endMonth
      ? `${startMonth} ${formatNumberBN(firstHijri.year)}`
      : `${startMonth} - ${endMonth} ${formatNumberBN(lastHijri.year)}`;
  }

  const cells = Array.from({ length: leadingBlanks }, () => `<div class="calendar-day empty"></div>`);
  monthDates.forEach(date => {
    const hijri = getHijriParts(date);
    const event = hijri ? ISLAMIC_EVENTS.find(item => item.month === hijri.month && item.day === hijri.day) : null;
    cells.push(`
      <div class="calendar-day ${dateKey(date) === todayKey ? "today" : ""} ${event ? "has-event" : ""}">
        <strong>${formatNumberBN(date.getDate())}</strong>
        <span>${hijri ? formatNumberBN(hijri.day) : "-"}</span>
        ${event ? `<small>${escapeHTML(event.title)}</small>` : ""}
      </div>
    `);
  });
  grid.innerHTML = cells.join("");
  renderTodayHijri(today);
  renderIslamicEvents(monthDates);
}

function renderTodayHijri(date) {
  const hijri = getHijriParts(date);
  setText("today-gregorian", new Intl.DateTimeFormat("bn-BD", { dateStyle: "full" }).format(date));
  setText("today-hijri", hijri ? formatHijriDate(hijri) : "হিজরি তারিখ পাওয়া যায়নি");
}

function renderIslamicEvents(dates) {
  const wrap = document.getElementById("calendar-events");
  if (!wrap) return;
  const events = dates.map(date => {
    const hijri = getHijriParts(date);
    if (!hijri) return null;
    const event = ISLAMIC_EVENTS.find(item => item.month === hijri.month && item.day === hijri.day);
    return event ? { ...event, date, hijri } : null;
  }).filter(Boolean);
  wrap.innerHTML = events.length ? events.map(event => `
    <div class="event-item">
      <span>${formatDateBN(event.date.toISOString())}</span>
      <strong>${escapeHTML(event.title)}</strong>
      <small>${formatHijriDate(event.hijri)}</small>
    </div>
  `).join("") : `<p class="muted">এই Gregorian মাসে নির্ধারিত বিশেষ দিন পাওয়া যায়নি।</p>`;
}

function renderHijriConverter() {
  const input = document.getElementById("calendar-convert-date");
  const result = document.getElementById("calendar-convert-result");
  if (!input || !result || !input.value) return;
  const date = new Date(input.value + "T00:00:00");
  const hijri = getHijriParts(date);
  result.textContent = hijri ? `${formatDateBN(date.toISOString())} = ${formatHijriDate(hijri)}` : "এই তারিখ রূপান্তর করা যায়নি।";
}

function getHijriParts(date) {
  try {
    const parts = new Intl.DateTimeFormat("en-u-ca-islamic", {
      day: "numeric",
      month: "numeric",
      year: "numeric"
    }).formatToParts(date);
    return {
      day: Number(parts.find(part => part.type === "day")?.value || 0),
      month: Number(parts.find(part => part.type === "month")?.value || 0),
      year: Number(parts.find(part => part.type === "year")?.value || 0)
    };
  } catch (error) {
    return null;
  }
}

function formatHijriDate(hijri) {
  const month = HIJRI_MONTHS[hijri.month - 1] || "";
  return `${formatNumberBN(hijri.day)} ${month} ${formatNumberBN(hijri.year)} হিজরি`;
}

function dateKey(date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function bindZakatCalculator() {
  const form = document.getElementById("zakat-calculator");
  if (!form) return;
  const calculateButton = document.getElementById("zakat-calculate");
  const resetButton = document.getElementById("zakat-reset");
  form.querySelectorAll(".zakat-input").forEach(input => {
    input.addEventListener("input", calculateZakat);
  });
  if (calculateButton) calculateButton.addEventListener("click", calculateZakat);
  if (resetButton) resetButton.addEventListener("click", () => {
    setTimeout(calculateZakat, 0);
  });
  calculateZakat();
}

function calculateZakat() {
  const ids = ["zakat-cash", "zakat-bank", "zakat-gold", "zakat-silver", "zakat-business", "zakat-receivable"];
  const assets = ids.reduce((sum, id) => sum + getNumberValue(id), 0);
  const liability = getNumberValue("zakat-liability");
  const nisab = getNumberValue("zakat-nisab");
  const net = Math.max(assets - liability, 0);
  const payable = nisab > 0 && net >= nisab ? net * 0.025 : 0;
  setText("zakat-net", formatBDT(net));
  setText("zakat-payable", formatBDT(payable));
  const status = document.getElementById("zakat-status");
  if (!status) return;
  if (!assets && !liability) {
    status.textContent = "আপনার তথ্য দিলে হিসাব এখানে দেখা যাবে।";
  } else if (nisab <= 0) {
    status.textContent = "নিসাব মূল্য লিখলে যাকাত প্রযোজ্য কি না দেখা যাবে।";
  } else if (payable > 0) {
    status.textContent = "আপনার সম্পদ নিসাব অতিক্রম করেছে। প্রযোজ্য যাকাত ২.৫% হিসেবে দেখানো হয়েছে।";
  } else {
    status.textContent = "বর্তমান হিসাব অনুযায়ী নিসাব পূর্ণ হয়নি, তাই যাকাত প্রযোজ্য নয়।";
  }
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
  fieldset.innerHTML = `<legend>দান পাঠানোর পদ্ধতি</legend>` + active.map((a, i) => {
    const brand = paymentBrand(a);
    return `
    <label class="payment-option">
      <input type="radio" name="payment-method" value="${escapeHTML(a.id)}" ${i === 0 ? "checked" : ""}>
      <span class="payment-logo ${brand.className}" aria-hidden="true">${escapeHTML(brand.label)}</span>
      <span>${escapeHTML(a.type)}</span>
    </label>
  `;
  }).join("");
  fieldset.querySelectorAll('input[name="payment-method"]').forEach(radio => {
    radio.addEventListener("change", updatePaymentInstructions);
  });
  updatePaymentInstructions();
}

function paymentBrand(account) {
  const type = String(account?.type || "").toLowerCase();
  if (type.includes("বিকাশ") || type.includes("bkash")) return { className: "bkash", label: "bKash" };
  if (type.includes("নগদ") || type.includes("nagad")) return { className: "nagad", label: "নগদ" };
  return { className: "bank", label: "ব্যাংক" };
}

function updatePaymentInstructions() {
  const instructions = document.getElementById("payment-instructions");
  const selected = document.querySelector('input[name="payment-method"]:checked');
  if (!instructions) return;
  const account = kuData.accounts.find(a => a.id === selected?.value) || kuData.accounts.find(a => a.active);
  if (!account) {
    instructions.innerHTML = `<strong>দান পাঠানোর একাউন্ট এখনো যোগ করা হয়নি।</strong><span>এডমিন প্যানেল থেকে একাউন্ট যোগ করুন।</span>`;
    return;
  }
  const gatewayUrl = String(account.gatewayUrl || "").trim();
  const qrImage = String(account.qrImage || "").trim();
  const qrCard = qrImage ? `
    <div class="payment-qr-card">
      <img src="${escapeHTML(qrImage)}" alt="${escapeHTML(account.type)} QR কোড">
      <div>
        <b>QR কোড স্ক্যান করুন</b>
        <small>মোবাইল থেকে স্ক্যান করে পেমেন্ট সম্পন্ন করুন।</small>
      </div>
    </div>
  ` : "";
  const gatewayButton = gatewayUrl ? `
    <a class="btn small gateway-btn" href="${escapeHTML(gatewayUrl)}" target="_blank" rel="noopener">পেমেন্ট করুন</a>
    <small>গেটওয়ে থেকে পেমেন্ট সম্পন্ন হলে লেনদেন নম্বর সংরক্ষণ করুন।</small>
  ` : `<small>পেমেন্ট গেটওয়ে লিংক যোগ করা না থাকলে ম্যানুয়ালি দান পাঠিয়ে লেনদেন নম্বর সংরক্ষণ করুন।</small>`;
  instructions.innerHTML = `
    <strong>${escapeHTML(account.type)}-এ দান পাঠানোর নির্দেশনা</strong>
    <span>${escapeHTML(account.instruction || "দান পাঠিয়ে লেনদেন নম্বর সংরক্ষণ করুন।")}</span>
    <ul><li><b>${escapeHTML(account.type)}:</b> ${escapeHTML(account.number)} — ${escapeHTML(account.holder)}</li></ul>
    ${qrCard}
    <div class="gateway-actions">${gatewayButton}</div>
  `;
}

function bindDonationForm() {
  const form = document.getElementById("donation-form");
  const printButton = document.getElementById("print-receipt");
  if (!form) return;
  form.addEventListener("submit", async (event) => {
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
    try {
      const savedDonation = typeof addDonationAsync === "function"
        ? await addDonationAsync(kuData, donation)
        : donation;
      renderReceipt(savedDonation);
      form.reset();
      renderDonationAccounts();
    } catch (error) {
      alert("দান তথ্য সেভ করা যায়নি। একটু পরে আবার চেষ্টা করুন।");
    }
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
  const members = orderedShuraMembers(kuData.shura.filter(m => m.active));
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

function normalizeShuraOrder(value, fallback = 1) {
  const order = Number(value || fallback);
  if (!Number.isFinite(order)) return fallback;
  return Math.min(Math.max(Math.round(order), 1), 21);
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

function getValue(id) { return document.getElementById(id)?.value.trim() || ""; }
function getNumberValue(id) { return Number(getValue(id) || 0) || 0; }
function setText(id, value) { const el = document.getElementById(id); if (el) el.textContent = value || "-"; }

document.addEventListener("DOMContentLoaded", initPublicSite);
