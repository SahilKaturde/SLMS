import React, { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";

const STEPS = [
  { key: "details", label: "Details" },
  { key: "picture", label: "Picture" },
  { key: "policy", label: "Policy" },
  { key: "account", label: "Account" },
];

export default function LibraryRegister() {
  const [active, setActive] = useState(0);
  const [completed, setCompleted] = useState(new Set());
  const [form, setForm] = useState({
    details: { name: "", address: "", phone: "" },
    picture: { file: null, preview: "" },
    policy: { penaltyPerDay: "", borrowLimit: "" },
    account: { username: "", email: "", password: "", confirm: "" },
  });
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const sectionRefs = useRef([]);

  // Observe which section is in view to set `active`
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = sectionRefs.current.findIndex((el) => el === visible.target);
        if (index !== -1) setActive(index);
      },
      { threshold: [0.5, 0.75, 0.9] }
    );
    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Responsive classes
  const inputClass = "w-full p-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white";
  const cardClass = "border-4 border-black p-4 sm:p-6 rounded-xl bg-white w-full max-w-md mx-4";
  const btnPrimary = "w-full p-2 bg-black text-white font-bold rounded hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed";
  const btnGhost = "px-4 py-2 border-2 border-black rounded font-bold hover:bg-black hover:text-white transition";

  const validateStep = (i) => {
    switch (STEPS[i].key) {
      case "details": {
        const { name, address } = form.details;
        return name.trim().length >= 2 && address.trim().length >= 5;
      }
      case "picture": {
        return !!form.picture.file;
      }
      case "policy": {
        const p = Number(form.policy.penaltyPerDay);
        const b = Number(form.policy.borrowLimit);
        return Number.isFinite(p) && p >= 0 && Number.isInteger(b) && b > 0;
      }
      case "account": {
        const { username, email, password, confirm } = form.account;
        const okU = username.trim().length >= 3 && !username.includes(" ");
        const okE = /.+@.+\..+/.test(email);
        const okP = password.length >= 6 && password === confirm;
        return okU && okE && okP;
      }
      default:
        return false;
    }
  };

  const markAndNext = (i) => {
    if (!validateStep(i)) {
      setError("Please complete required fields for this checkpoint.");
      const el = sectionRefs.current[i];
      if (el) {
        el.classList.remove("shake");
        // eslint-disable-next-line no-unused-expressions
        el.offsetWidth;
        el.classList.add("shake");
      }
      return;
    }
    setError("");
    setCompleted((prev) => new Set(prev).add(i));
    const next = Math.min(i + 1, STEPS.length - 1);
    sectionRefs.current[next]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollTo = (i) => {
    sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const progressPercent = useMemo(() => {
    const total = STEPS.length - 1;
    if (total <= 0) return 0;
    const furthest = Math.max(-1, ...Array.from(completed.values()));
    const base = ((furthest + 1) / STEPS.length) * 100;
    const activeBase = (active / total) * 100;
    return Math.max(base, activeBase);
  }, [active, completed]);

  const handleFinalSubmit = async () => {
    const allOk = STEPS.every((_, i) => validateStep(i));
    if (!allOk) return alert("Please complete all checkpoints correctly.");

    setIsLoading(true);
    try {
      const data = new FormData();
      data.append("library_name", form.details.name);
      data.append("library_address", form.details.address);
      data.append("library_phone", form.details.phone);
      data.append("penalty_per_day", form.policy.penaltyPerDay);
      data.append("borrow_limit", form.policy.borrowLimit);
      data.append("username", form.account.username);
      data.append("email", form.account.email);
      data.append("password", form.account.password);
      if (form.picture.file) data.append("logo", form.picture.file);

      // const resp = await axios.post("http://localhost:8000/api/library/register/", data, { headers: { "Content-Type": "multipart/form-data" } });
      // console.log(resp.data);

      alert("Registration complete! ✅");
    } catch (err) {
      const msg = err.response?.data?.detail || "Registration failed. Please try again.";
      alert(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // DnD handlers
  const onDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };
  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer?.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return setError("Please upload a valid image file.");
    setForm((prev) => ({ ...prev, picture: { file, preview: URL.createObjectURL(file) } }));
  };
  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return setError("Please upload a valid image file.");
    setForm((prev) => ({ ...prev, picture: { file, preview: URL.createObjectURL(file) } }));
  };

  return (
    <div className="min-h-screen bg-white font-mono text-[15px] text-black">
      {/* App title */}
      <div className="text-center py-4 px-2">
        <h1 className="text-2xl sm:text-3xl font-bold">SLMS</h1>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">Smart Library Management System</p>
      </div>

      {/* Shared error */}
      {error && (
        <div className="mx-auto max-w-md mt-4 mb-2 p-2 bg-red-100 text-red-700 rounded text-center font-semibold border border-red-300 text-xs sm:text-sm">
          {error}
        </div>
      )}

      {/* Scrolling viewport with snap */}
      <main className="mx-auto max-w-6xl px-2 sm:px-4 h-[calc(100vh-120px)] sm:h-[calc(100vh-132px)] overflow-y-auto scroll-smooth snap-y snap-mandatory">
        {/* STEP 1: Library Details */}
        <section ref={(el) => (sectionRefs.current[0] = el)} className="min-h-[calc(100vh-120px)] sm:min-h-[calc(100vh-132px)] snap-start flex items-center justify-center py-4">
          <div className={cardClass}>
            <h2 className="text-lg font-bold mb-4">Library Details</h2>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block mb-1 sm:mb-2 font-medium text-sm sm:text-base" htmlFor="lib-name">Library Name *</label>
                <input id="lib-name" className={inputClass} value={form.details.name} onChange={(e) => setForm({ ...form, details: { ...form.details, name: e.target.value } })} placeholder="Sahyadri Public Library" />
              </div>
              <div>
                <label className="block mb-1 sm:mb-2 font-medium text-sm sm:text-base" htmlFor="lib-address">Library Address *</label>
                <input id="lib-address" className={inputClass} value={form.details.address} onChange={(e) => setForm({ ...form, details: { ...form.details, address: e.target.value } })} placeholder="Street, City, State, PIN" />
              </div>
              <div>
                <label className="block mb-1 sm:mb-2 font-medium text-sm sm:text-base" htmlFor="lib-phone">Contact Number</label>
                <input id="lib-phone" className={inputClass} value={form.details.phone} onChange={(e) => setForm({ ...form, details: { ...form.details, phone: e.target.value } })} placeholder="Optional" />
              </div>
              <button type="button" onClick={() => markAndNext(0)} className={`${btnPrimary} mt-2`}>Save & Continue</button>
            </div>
          </div>
        </section>

        {/* STEP 2: Library Picture */}
        <section ref={(el) => (sectionRefs.current[1] = el)} className="min-h-[calc(100vh-120px)] sm:min-h-[calc(100vh-132px)] snap-start flex items-center justify-center py-4">
          <div className={cardClass}>
            <h2 className="text-lg font-bold mb-4">Library Picture</h2>
            <div
              className={`w-full h-40 sm:h-48 border-4 border-black rounded-xl flex flex-col items-center justify-center cursor-pointer ${dragActive ? "bg-blue-100" : "bg-white"} transition`}
              onDragEnter={onDrag}
              onDragOver={onDrag}
              onDragLeave={onDrag}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click(); }}
            >
              {form.picture.preview ? (
                <img src={form.picture.preview} alt="Library logo preview" className="w-full h-full object-cover rounded-xl" />
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mb-1 sm:mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A10.012 10.012 0 0112 15c2.42 0 4.64.847 6.313 2.245M12 12a4 4 0 100-8 4 4 0 000 8z" />
                  </svg>
                  <p className="text-gray-600 text-center px-2 select-none text-xs sm:text-sm">Drag & Drop or Click to Upload</p>
                </>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
            </div>
            <div className="mt-3 sm:mt-4">
              <button type="button" onClick={() => markAndNext(1)} className={btnPrimary}>Save & Continue</button>
            </div>
          </div>
        </section>

        {/* STEP 3: Library Policy */}
        <section ref={(el) => (sectionRefs.current[2] = el)} className="min-h-[calc(100vh-120px)] sm:min-h-[calc(100vh-132px)] snap-start flex items-center justify-center py-4">
          <div className={cardClass}>
            <h2 className="text-lg font-bold mb-4">Library Policy</h2>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block mb-1 sm:mb-2 font-medium text-sm sm:text-base" htmlFor="penalty">Penalty Per Day (₹) *</label>
                <input id="penalty" type="number" className={inputClass} value={form.policy.penaltyPerDay} onChange={(e) => setForm({ ...form, policy: { ...form.policy, penaltyPerDay: e.target.value } })} placeholder="5" />
              </div>
              <div>
                <label className="block mb-1 sm:mb-2 font-medium text-sm sm:text-base" htmlFor="limit">Borrow Limit Per User *</label>
                <input id="limit" type="number" className={inputClass} value={form.policy.borrowLimit} onChange={(e) => setForm({ ...form, policy: { ...form.policy, borrowLimit: e.target.value } })} placeholder="3" />
              </div>
              <button type="button" onClick={() => markAndNext(2)} className={btnPrimary}>Save & Continue</button>
            </div>
          </div>
        </section>

        {/* STEP 4: Account Setup */}
        <section ref={(el) => (sectionRefs.current[3] = el)} className="min-h-[calc(100vh-120px)] sm:min-h-[calc(100vh-132px)] snap-start flex items-center justify-center py-4">
          <div className={cardClass}>
            <h2 className="text-lg font-bold mb-4">Account Setup</h2>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block mb-1 sm:mb-2 font-medium text-sm sm:text-base" htmlFor="username">Username *</label>
                <input id="username" className={inputClass} value={form.account.username} onChange={(e) => setForm({ ...form, account: { ...form.account, username: e.target.value } })} placeholder="admin" autoComplete="username" />
              </div>
              <div>
                <label className="block mb-1 sm:mb-2 font-medium text-sm sm:text-base" htmlFor="email">Email *</label>
                <input id="email" type="email" className={inputClass} value={form.account.email} onChange={(e) => setForm({ ...form, account: { ...form.account, email: e.target.value } })} placeholder="you@example.com" autoComplete="email" />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                <div>
                  <label className="block mb-1 sm:mb-2 font-medium text-sm sm:text-base" htmlFor="password">Password *</label>
                  <input id="password" type="password" className={inputClass} value={form.account.password} onChange={(e) => setForm({ ...form, account: { ...form.account, password: e.target.value } })} autoComplete="new-password" />
                </div>
                <div>
                  <label className="block mb-1 sm:mb-2 font-medium text-sm sm:text-base" htmlFor="confirm">Confirm Password *</label>
                  <input id="confirm" type="password" className={inputClass} value={form.account.confirm} onChange={(e) => setForm({ ...form, account: { ...form.account, confirm: e.target.value } })} autoComplete="new-password" />
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                <button type="button" onClick={() => markAndNext(3)} className={btnGhost}>Save</button>
                <button type="button" onClick={handleFinalSubmit} className={`${btnPrimary} sm:w-auto`}>{isLoading ? "Registering..." : "Complete Registration"}</button>
              </div>
              <div className="mt-3 sm:mt-4 text-center">
                <p className="text-xs sm:text-sm text-gray-700">
                  Already registered?{" "}
                  <Link to="/login" className="text-blue-600 hover:underline font-semibold">Login here</Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer blurb */}
      <div className="max-w-lg text-center px-4 mx-auto my-4 sm:my-6">
        <p className="text-gray-700 text-xs sm:text-sm">
          This is the Smart Library Management System developed by Omkar and Sahil. It's a project for educational purposes,
          allowing you to read books from a library as well as explore reading materials from the web.
        </p>
      </div>

      {/* Shake animation */}
      <style>{`
        .shake { animation: shake 300ms ease-in-out; }
        @keyframes shake {
          10%, 90% { transform: translateX(-1px); }
          20%, 80% { transform: translateX(2px); }
          30%, 50%, 70% { transform: translateX(-4px); }
          40%, 60% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}

LibraryRegister.propTypes = {
  onRegisterSuccess: PropTypes.func,
};