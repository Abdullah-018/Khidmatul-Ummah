(function () {
  const config = window.KU_SUPABASE_CONFIG || {};
  const hasClient = Boolean(window.supabase && config.url && config.anonKey);
  const client = hasClient ? window.supabase.createClient(config.url, config.anonKey) : null;
  const stateId = config.stateId || "main";

  window.KU_SUPABASE_ENABLED = Boolean(client);
  window.kuSupabase = client;

  function normalizeState(payload) {
    return mergeKUData(deepClone(KU_DEFAULT_DATA), payload || {});
  }

  window.loadKUDataAsync = async function loadKUDataAsync() {
    if (!client) return loadKUData();
    try {
      const { data, error } = await client
        .from("cms_state")
        .select("data")
        .eq("id", stateId)
        .maybeSingle();
      if (error) throw error;
      const base = normalizeState(data?.data);

      const donationsResult = await client
        .from("donations")
        .select("*")
        .order("created_at", { ascending: false });
      if (!donationsResult.error && Array.isArray(donationsResult.data)) {
        base.donations = donationsResult.data.map(fromDonationRow);
      }
      syncDonorsFromDonations(base);
      saveKUData(base);
      return base;
    } catch (error) {
      console.error("Supabase load failed, using local data", error);
      return loadKUData();
    }
  };

  window.saveKUDataAsync = async function saveKUDataAsync(data) {
    saveKUData(data);
    if (!client) return data;
    try {
      const snapshot = deepClone(data);
      delete snapshot.donations;
      const { error } = await client
        .from("cms_state")
        .upsert({ id: stateId, data: snapshot, updated_at: new Date().toISOString() });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Supabase save failed", error);
      throw error;
    }
  };

  window.resetKUDataAsync = async function resetKUDataAsync() {
    const seeded = resetKUData();
    if (client) await window.saveKUDataAsync(seeded);
    return seeded;
  };

  window.addDonationAsync = async function addDonationAsync(data, donation) {
    upsert(data.donations, donation);
    upsertDonorFromDonation(data, donation);
    saveKUData(data);
    if (!client) return donation;
    try {
      const { data: inserted, error } = await client
        .from("donations")
        .insert(toDonationRow(donation))
        .select("*")
        .single();
      if (error) throw error;
      return fromDonationRow(inserted);
    } catch (error) {
      console.error("Supabase donation insert failed", error);
      throw error;
    }
  };

  window.updateDonationStatusAsync = async function updateDonationStatusAsync(id, status) {
    if (!client) return;
    const { error } = await client.from("donations").update({ status }).eq("receipt_no", id);
    if (error) throw error;
  };

  window.deleteDonationAsync = async function deleteDonationAsync(id) {
    if (!client) return;
    const { error } = await client.from("donations").delete().eq("receipt_no", id);
    if (error) throw error;
  };

  window.signInAdminAsync = async function signInAdminAsync(user, password) {
    if (!client) return user === "KU-Admin" && password === "KU@24445";
    const aliases = {
      "ku-admin": "ku-admin@khidmatul-ummah.local",
      "ku_admin": "ku-admin@khidmatul-ummah.local",
      "kuadmin": "ku-admin@khidmatul-ummah.local"
    };
    const normalizedUser = user.trim().toLowerCase();
    const email = user.includes("@") ? normalizedUser : (aliases[normalizedUser] || `${normalizedUser}@khidmatul-ummah.local`);
    const { error } = await client.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return true;
  };

  window.signOutAdminAsync = async function signOutAdminAsync() {
    if (client) await client.auth.signOut();
  };

  window.hasAdminSessionAsync = async function hasAdminSessionAsync() {
    if (!client) return sessionStorage.getItem("ku_admin_logged_in") === "true";
    const { data } = await client.auth.getSession();
    return Boolean(data?.session);
  };

  window.uploadKUAsset = async function uploadKUAsset(bucket, file, prefix) {
    if (!file) return "";
    if (!client) return fileToDataURL(file);
    try {
      const ext = (file.name.split(".").pop() || "png").toLowerCase();
      const path = `${prefix || "uploads"}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await client.storage.from(bucket).upload(path, file, { upsert: true });
      if (error) throw error;
      return client.storage.from(bucket).getPublicUrl(path).data.publicUrl;
    } catch (error) {
      console.warn("Supabase storage upload failed, using embedded image", error);
      return fileToDataURL(file);
    }
  };

  function toDonationRow(donation) {
    return {
      receipt_no: donation.id,
      donor_name: donation.donorName,
      mobile: donation.mobile,
      email: donation.email || "",
      address: donation.address || "",
      fund: donation.fund,
      amount: Number(donation.amount || 0),
      payment_method: donation.paymentMethod || "",
      account_number: donation.accountNumber || "",
      account_holder: donation.accountHolder || "",
      transaction_id: donation.transactionId || "",
      status: donation.status || "Pending",
      created_at: donation.date || new Date().toISOString()
    };
  }

  function fromDonationRow(row) {
    return {
      id: row.receipt_no,
      donorName: row.donor_name,
      mobile: row.mobile,
      email: row.email || "",
      address: row.address || "",
      fund: row.fund,
      amount: Number(row.amount || 0),
      paymentMethod: row.payment_method || "",
      accountNumber: row.account_number || "",
      accountHolder: row.account_holder || "",
      transactionId: row.transaction_id || "",
      status: row.status || "Pending",
      date: row.created_at || new Date().toISOString(),
      adminNote: row.admin_note || ""
    };
  }
})();
