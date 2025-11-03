// =====================================================
// file: app/picker/page.js (JavaScript)
// Left: Giveaway (handle-only, checklist points, modal wheel + confetti)
// Right: Matcha Merch tracker (stickers, keychain, shirt) with 3-for-$5 bundles
// - Purchases persist via localStorage; editable; stats tab for totals
// =====================================================
"use client";
import { useEffect, useMemo, useRef, useState } from "react";

// ------------------------------
// Shared helpers
// ------------------------------
const uid = () => Math.random().toString(36).slice(2, 10);
const normalizeHandle = (raw) => {
  const t = (raw || "").replace(/\s+/g, "");
  if (!t) return "";
  return t.startsWith("@") ? t : `@${t}`;
};

// ------------------------------
// GIVEAWAY (handle-only)
// ------------------------------
const ENTRY_STORE = "giveaway_entries_handle_v2";

const derivedPoints = (e) => {
  const required = e.reqBuyMatcha && e.reqFollowDallas;
  const base = required ? 1 : 0;
  const bonus = (e.bonusSponsors ? 1 : 0) + (e.bonusMerch ? 1 : 0);
  return base + bonus;
};

function pickWeighted(entries) {
  const total = entries.reduce((sum, e) => sum + Math.max(0, derivedPoints(e)), 0);
  if (total <= 0) return null;
  let r = Math.random() * total;
  for (const e of entries) {
    r -= Math.max(0, derivedPoints(e));
    if (r < 0) return e;
  }
  return null;
}

function useSegments(entries) {
  const weighted = useMemo(() => entries.filter((e) => derivedPoints(e) > 0), [entries]);
  const total = useMemo(() => weighted.reduce((s, e) => s + derivedPoints(e), 0), [weighted]);
  const segments = useMemo(() => {
    let start = -Math.PI / 2;
    return weighted.map((e, i) => {
      const frac = derivedPoints(e) / (total || 1);
      const sweep = 2 * Math.PI * frac;
      const end = start + sweep;
      const mid = (start + end) / 2;
      const seg = { e, start, end, mid };
      start = end;
      return seg;
    });
  }, [weighted, total]);
  return { weighted, total, segments };
}

function Wheel({ entries, selectedId, rotation = 0, onClick }) {
  const { weighted, total, segments } = useSegments(entries);

  if (weighted.length === 0 || total <= 0) {
    return <div className="text-white/80">Add eligible entries to see the wheel.</div>;
  }

  const size = 360, r = size / 2, cx = r, cy = r;
  const paths = [], labels = [];
  segments.forEach((seg, i) => {
    const { e, start, end, mid } = seg;
    const x0 = cx + r * Math.cos(start);
    const y0 = cy + r * Math.sin(start);
    const x1 = cx + r * Math.cos(end);
    const y1 = cy + r * Math.sin(end);
    const largeArc = end - start > Math.PI ? 1 : 0;
    const h = Math.abs(((e.id?.charCodeAt?.(0) || 0) * 47 + i * 23) % 360);
    const fill = `hsl(${h} 80% 70%)`;
    const lx = cx + (r * 0.58) * Math.cos(mid);
    const ly = cy + (r * 0.58) * Math.sin(mid);
    paths.push(
      <path key={`p-${e.id}`} d={`M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 ${largeArc} 1 ${x1} ${y1} Z`} fill={e.id === selectedId ? "#fff" : fill} stroke="white" strokeWidth={0.75} />
    );
    const label = (e.handle || "?").replace(/^@/, "");
    labels.push(
      <text key={`t-${e.id}`} x={lx} y={ly} fontSize={11} textAnchor="middle" dominantBaseline="middle" fill={e.id === selectedId ? "#111" : "#222"} style={{ userSelect: "none" }}>{label}</text>
    );
  });

  return (
    <div className="relative select-none" onClick={onClick}>
      <div className="transition-transform will-change-transform" style={{ transform: `rotate(${rotation}deg)` }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow">{paths}{labels}<circle cx={cx} cy={cy} r={10} fill="#111"/></svg>
      </div>
      <div className="absolute -top-3 left-1/2 -translate-x-1/2"><div className="w-0 h-0 border-l-8 border-r-8 border-b-[12px] border-l-transparent border-r-transparent border-b-white"/></div>
    </div>
  );
}

// ------------------------------
// MERCH TRACKER
// ------------------------------
const MERCH_STORE = "matcha_merch_purchases_v1";
const STICKERS = ["Blue Logo","White Lace","Food","Black & White","Sticker 5"];
const PRICES = { sticker: 2, bundle3: 5, keychain: 5, shirt: 25 };

// a purchase record
// { id, ts, handle, singles:[{kind,qty}], bundles:[{a,b,c,qty}], keychainQty, shirtQty, totalCents }

function calcTotals(form) {
  const singlesCount = form.singles.reduce((s, r) => s + Math.max(0, Number(r.qty)||0), 0);
  const singlesCents = singlesCount * PRICES.sticker * 100;

  const bundlesCount = form.bundles.reduce((s, b) => s + Math.max(0, Number(b.qty)||0), 0);
  const bundlesCents = bundlesCount * PRICES.bundle3 * 100;

  const keychainCents = (Math.max(0, Number(form.keychainQty)||0)) * PRICES.keychain * 100;
  const shirtCents = (Math.max(0, Number(form.shirtQty)||0)) * PRICES.shirt * 100;

  const totalCents = singlesCents + bundlesCents + keychainCents + shirtCents;
  return { singlesCount, bundlesCount, totalCents };
}

function MerchPanel() {
  const [handle, setHandle] = useState("");
  const [singles, setSingles] = useState([{ kind: STICKERS[0], qty: 1 }]);
  const [bundles, setBundles] = useState([]); // each: {a,b,c,qty}
  const [keychainQty, setKeychainQty] = useState(0);
  const [shirtQty, setShirtQty] = useState(0);
  const [purchases, setPurchases] = useState([]);
  const [tab, setTab] = useState("form"); // form | stats
  const [editingId, setEditingId] = useState(null);

  // load/save
  useEffect(() => {
    const raw = localStorage.getItem(MERCH_STORE);
    if (raw) { try { const parsed = JSON.parse(raw); if (Array.isArray(parsed)) setPurchases(parsed); } catch {} }
  }, []);
  useEffect(() => { localStorage.setItem(MERCH_STORE, JSON.stringify(purchases)); }, [purchases]);

  const addSingleRow = () => setSingles((rows) => [...rows, { kind: STICKERS[0], qty: 1 }]);
  const removeSingleRow = (i) => setSingles((rows) => rows.filter((_, idx) => idx !== i));

  const addBundle = () => setBundles((rows) => [...rows, { a: STICKERS[0], b: STICKERS[1], c: STICKERS[2], qty: 1 }]);
  const removeBundle = (i) => setBundles((rows) => rows.filter((_, idx) => idx !== i));

  const current = { handle: normalizeHandle(handle), singles, bundles, keychainQty, shirtQty };
  const totals = useMemo(() => calcTotals(current), [handle, singles, bundles, keychainQty, shirtQty]);

  const resetForm = () => {
    setHandle("");
    setSingles([{ kind: STICKERS[0], qty: 1 }]);
    setBundles([]);
    setKeychainQty(0);
    setShirtQty(0);
    setEditingId(null);
  };

  const savePurchase = () => {
    // simple validation for bundles: ensure 3 picks
    for (const b of bundles) {
      if (!b.a || !b.b || !b.c) { alert("Each 3-for-$5 bundle must choose 3 stickers."); return; }
    }
    const record = {
      id: editingId || uid(),
      ts: Date.now(),
      handle: normalizeHandle(handle) || null,
      singles: singles.map((s) => ({ kind: s.kind, qty: Math.max(0, Number(s.qty)||0) })).filter((s) => s.qty>0),
      bundles: bundles.map((b) => ({ a: b.a, b: b.b, c: b.c, qty: Math.max(0, Number(b.qty)||0) })).filter((b)=>b.qty>0),
      keychainQty: Math.max(0, Number(keychainQty)||0),
      shirtQty: Math.max(0, Number(shirtQty)||0),
    };
    const { totalCents } = calcTotals(record);
    record.totalCents = totalCents;

    setPurchases((prev) => {
      if (editingId) return prev.map((p) => (p.id === editingId ? record : p));
      return [record, ...prev];
    });
    resetForm();
  };

  const startEdit = (id) => {
    const rec = purchases.find((p) => p.id === id);
    if (!rec) return;
    setEditingId(id);
    setHandle(rec.handle || "");
    setSingles(rec.singles?.length ? rec.singles : [{ kind: STICKERS[0], qty: 1 }]);
    setBundles(rec.bundles || []);
    setKeychainQty(rec.keychainQty || 0);
    setShirtQty(rec.shirtQty || 0);
    setTab("form");
  };

  const removePurchase = (id) => setPurchases((prev) => prev.filter((p) => p.id !== id));

  // stats
  const stats = useMemo(() => {
    const bySticker = Object.fromEntries(STICKERS.map((s)=>[s,0]));
    let bundleCount=0, keychains=0, shirts=0, revenueCents=0, singlesCount=0;
    for (const p of purchases) {
      revenueCents += p.totalCents || 0;
      keychains += p.keychainQty||0; shirts += p.shirtQty||0;
      for (const s of p.singles||[]) { bySticker[s.kind] = (bySticker[s.kind]||0) + (s.qty||0); singlesCount += s.qty||0; }
      for (const b of p.bundles||[]) { bundleCount += b.qty||0; bySticker[b.a]++; bySticker[b.b]++; bySticker[b.c]++; }
    }
    return { bySticker, bundleCount, keychains, shirts, revenueCents, singlesCount };
  }, [purchases]);

  return (
    <div className="bg-sky-200/30 rounded-2xl p-4 border border-sky-300/40">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sky-900 text-2xl font-extrabold tracking-wide">Matcha Merch</h2>
        <div className="flex gap-2">
          <button onClick={()=>setTab("form")} className={`px-3 py-1 rounded-md ${tab==="form"?"bg-white text-sky-700":"bg-white/40 text-sky-900"}`}>Form</button>
          <button onClick={()=>setTab("stats")} className={`px-3 py-1 rounded-md ${tab==="stats"?"bg-white text-sky-700":"bg-white/40 text-sky-900"}`}>Stats</button>
        </div>
      </div>

      {tab === "form" ? (
        <div className="space-y-3">
          <input type="text" value={handle} onChange={(e)=>setHandle(normalizeHandle(e.target.value))} placeholder="@handle (optional)" className="w-full bg-white rounded-md h-10 px-3 text-sky-900"/>

          {/* Stickers */}
          <div className="bg-white/60 rounded-xl p-3">
            <div className="font-semibold text-sky-900">Stickers ($2 each)</div>
            {singles.map((row, i) => (
              <div key={i} className="mt-2 flex items-center gap-2">
                <select value={row.kind} onChange={(e)=>setSingles((rows)=>rows.map((r,idx)=>idx===i?{...r, kind:e.target.value}:r))} className="bg-white rounded-md px-2 py-1">
                  {STICKERS.map((s)=> <option key={s} value={s}>{s}</option>)}
                </select>
                <input type="number" min={0} value={row.qty} onChange={(e)=>setSingles((rows)=>rows.map((r,idx)=>idx===i?{...r, qty:Number(e.target.value)||0}:r))} className="w-16 bg-white rounded-md px-2 py-1 text-right"/>
                <button onClick={()=>removeSingleRow(i)} className="px-2 py-1 rounded bg-red-500/80 text-white">Remove</button>
              </div>
            ))}
            <button onClick={addSingleRow} className="mt-2 px-3 py-1 rounded bg-sky-700 text-white">+ Add sticker</button>

            {/* Bundles */}
            <div className="mt-4 font-semibold text-sky-900">3 for $5 Bundles</div>
            {bundles.map((b, i) => (
              <div key={i} className="mt-2 grid grid-cols-[1fr_1fr_1fr_auto_auto] gap-2 items-center">
                <select value={b.a} onChange={(e)=>setBundles((rows)=>rows.map((r,idx)=>idx===i?{...r,a:e.target.value}:r))} className="bg-white rounded-md px-2 py-1">{STICKERS.map((s)=> <option key={s}>{s}</option>)}</select>
                <select value={b.b} onChange={(e)=>setBundles((rows)=>rows.map((r,idx)=>idx===i?{...r,b:e.target.value}:r))} className="bg-white rounded-md px-2 py-1">{STICKERS.map((s)=> <option key={s}>{s}</option>)}</select>
                <select value={b.c} onChange={(e)=>setBundles((rows)=>rows.map((r,idx)=>idx===i?{...r,c:e.target.value}:r))} className="bg-white rounded-md px-2 py-1">{STICKERS.map((s)=> <option key={s}>{s}</option>)}</select>
                <input type="number" min={1} value={b.qty} onChange={(e)=>setBundles((rows)=>rows.map((r,idx)=>idx===i?{...r, qty:Math.max(1, Number(e.target.value)||1)}:r))} className="w-16 bg-white rounded-md px-2 py-1 text-right"/>
                <button onClick={()=>removeBundle(i)} className="px-2 py-1 rounded bg-red-500/80 text-white">Remove</button>
              </div>
            ))}
            <button onClick={addBundle} className="mt-2 px-3 py-1 rounded bg-sky-700 text-white">+ Add 3-for-$5</button>
          </div>

          {/* Other items */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/60 rounded-xl p-3 flex items-center justify-between">
              <div className="text-sky-900 font-semibold">Keychain ($5)</div>
              <input type="number" min={0} value={keychainQty} onChange={(e)=>setKeychainQty(Math.max(0, Number(e.target.value)||0))} className="w-20 bg-white rounded-md px-2 py-1 text-right"/>
            </div>
            <div className="bg-white/60 rounded-xl p-3 flex items-center justify-between">
              <div className="text-sky-900 font-semibold">Matcha Shirt ($25)</div>
              <input type="number" min={0} value={shirtQty} onChange={(e)=>setShirtQty(Math.max(0, Number(e.target.value)||0))} className="w-20 bg-white rounded-md px-2 py-1 text-right"/>
            </div>
          </div>

          {/* Totals + actions */}
          <div className="flex items-center justify-between bg-white/70 rounded-xl p-3">
            <div className="text-sky-900">Singles: {totals.singlesCount} • Bundles: {totals.bundlesCount}</div>
            <div className="text-sky-900 font-bold text-lg">Total: ${(totals.totalCents/100).toFixed(2)}</div>
          </div>

          <div className="flex gap-2">
            <button onClick={savePurchase} className="px-4 py-2 rounded-xl bg-sky-700 text-white font-semibold">{editingId?"Update Purchase":"Submit Purchase"}</button>
            <button onClick={resetForm} className="px-4 py-2 rounded-xl bg-white/60 text-sky-900">Clear</button>
          </div>

          {/* Purchases list */}
          <div className="mt-4 bg-white/60 rounded-xl p-3 max-h-[360px] overflow-auto">
            <div className="text-sky-900 font-semibold mb-2">Purchases</div>
            {purchases.length===0 ? (
              <div className="text-sky-900/70">No purchases yet.</div>
            ) : purchases.map((p)=> (
              <div key={p.id} className="border border-sky-300/50 rounded-lg p-2 mb-2 bg-white">
                <div className="flex justify-between text-sky-900 text-sm">
                  <div>{new Date(p.ts).toLocaleTimeString()} {p.handle?`• ${p.handle}`:""}</div>
                  <div className="font-bold">${((p.totalCents||0)/100).toFixed(2)}</div>
                </div>
                <div className="mt-1 text-sky-900/90 text-sm">
                  {p.singles?.length>0 && <div>Singles: {p.singles.map(s=>`${s.kind}×${s.qty}`).join(", ")}</div>}
                  {p.bundles?.length>0 && <div>3-for-5: {p.bundles.map(b=>`(${b.a}, ${b.b}, ${b.c})×${b.qty}`).join(", ")}</div>}
                  {(p.keychainQty||0)>0 && <div>Keychain ×{p.keychainQty}</div>}
                  {(p.shirtQty||0)>0 && <div>Shirt ×{p.shirtQty}</div>}
                </div>
                <div className="mt-2 flex gap-2">
                  <button onClick={()=>startEdit(p.id)} className="px-3 py-1 rounded bg-sky-700 text-white">Edit</button>
                  <button onClick={()=>removePurchase(p.id)} className="px-3 py-1 rounded bg-red-500/80 text-white">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Stats tab
        <div className="space-y-3">
          <div className="bg-white/70 rounded-xl p-3">
            <div className="text-sky-900 font-semibold mb-2">Totals</div>
            <div className="grid grid-cols-2 gap-2 text-sky-900">
              <div>Revenue</div><div className="font-bold">${(stats.revenueCents/100).toFixed(2)}</div>
              <div>Keychains</div><div className="font-bold">{stats.keychains}</div>
              <div>Shirts</div><div className="font-bold">{stats.shirts}</div>
              <div>Bundles (3-for-5)</div><div className="font-bold">{stats.bundleCount}</div>
              <div>Singles (count)</div><div className="font-bold">{stats.singlesCount}</div>
            </div>
          </div>
          <div className="bg-white/70 rounded-xl p-3">
            <div className="text-sky-900 font-semibold mb-2">Stickers breakdown</div>
            <div className="grid grid-cols-2 gap-2 text-sky-900">
              {STICKERS.map((s)=> (
                <>
                  <div key={`${s}-label`}>{s}</div>
                  <div key={`${s}-val`} className="font-bold">{stats.bySticker[s]||0}</div>
                </>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ------------------------------
// PAGE COMBINED
// ------------------------------
export default function Page() {
  // Giveaway state
  const [gwHandle, setGwHandle] = useState("");
  const [reqBuyMatcha, setReqBuyMatcha] = useState(false);
  const [reqFollowDallas, setReqFollowDallas] = useState(false);
  const [bonusSponsors, setBonusSponsors] = useState(false);
  const [bonusMerch, setBonusMerch] = useState(false);
  const [entries, setEntries] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  // modal wheel
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRotation, setModalRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [highlightId, setHighlightId] = useState(null);
  const modalWheelRef = useRef(null);

  // persistence
  useEffect(() => { const raw = localStorage.getItem(ENTRY_STORE); if (raw) { try { const parsed = JSON.parse(raw); if (Array.isArray(parsed)) setEntries(parsed); } catch {} } }, []);
  useEffect(() => { localStorage.setItem(ENTRY_STORE, JSON.stringify(entries)); }, [entries]);

  const canSubmit = reqBuyMatcha && reqFollowDallas && !!gwHandle.trim();
  const currentPoints = useMemo(() => derivedPoints({ reqBuyMatcha, reqFollowDallas, bonusSponsors, bonusMerch }), [reqBuyMatcha, reqFollowDallas, bonusSponsors, bonusMerch]);

  const addEntry = () => {
    if (!canSubmit) return;
    const e = { id: uid(), handle: normalizeHandle(gwHandle), reqBuyMatcha, reqFollowDallas, bonusSponsors, bonusMerch };
    setEntries((prev) => [e, ...prev]);
    setGwHandle(""); setReqBuyMatcha(false); setReqFollowDallas(false); setBonusSponsors(false); setBonusMerch(false);
  };

  const [editingId, setEditingId] = useState(null);
  const startEdit = (id) => { const e = entries.find((x)=>x.id===id); if (!e) return; setEditingId(id); setGwHandle(e.handle||""); setReqBuyMatcha(!!e.reqBuyMatcha); setReqFollowDallas(!!e.reqFollowDallas); setBonusSponsors(!!e.bonusSponsors); setBonusMerch(!!e.bonusMerch); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const updateEntry = () => { if (!editingId || !canSubmit) return; setEntries((prev)=>prev.map((e)=> e.id===editingId?{...e, handle: normalizeHandle(gwHandle), reqBuyMatcha, reqFollowDallas, bonusSponsors, bonusMerch}:e)); setEditingId(null); setGwHandle(""); setReqBuyMatcha(false); setReqFollowDallas(false); setBonusSponsors(false); setBonusMerch(false); };
  const removeEntry = (id) => setEntries((prev)=>prev.filter((e)=>e.id!==id));
  const clearAll = () => { if (confirm("Clear all entries?")) setEntries([]); };

  const filtered = useMemo(() => { const q = search.trim().toLowerCase(); if (!q) return entries; return entries.filter((e)=> (e.handle||"").toLowerCase().includes(q)); }, [entries, search]);
  const totalPoints = useMemo(() => entries.reduce((s, e) => s + derivedPoints(e), 0), [entries]);

  // spin targeting
  const { segments, weighted, total } = useSegments(entries);
  const norm360 = (deg) => ((deg % 360) + 360) % 360;
  function computeTargetRotationForWinner(winnerId, currentRotation) {
    const seg = segments.find((s) => s.e.id === winnerId); if (!seg) return currentRotation + 720;
    const midDeg = (seg.mid * 180) / Math.PI; const sliceWdeg = Math.abs(((seg.end - seg.start) * 180) / Math.PI);
    const baseSpins = 360 * 6; const jitter = (Math.random() - 0.5) * Math.min(20, sliceWdeg * 0.4);
    const absoluteTarget = baseSpins + (-90 - midDeg) + jitter; const delta = absoluteTarget - norm360(currentRotation);
    const turnsAhead = delta < 0 ? Math.ceil(-delta / 360) : 0; return currentRotation + delta + turnsAhead * 360;
  }

  async function fireConfetti() { try { const confetti = (await import("canvas-confetti")).default; confetti({ particleCount: 160, spread: 70, origin: { y: 0.3 } }); setTimeout(()=>confetti({ particleCount: 120, spread: 100, origin: { y: 0.6 } }), 250); } catch {} }

  const pickWinnerAndSpin = async () => {
    if (spinning || weighted.length === 0 || total <= 0) return;
    const winner = pickWeighted(entries); if (!winner) return;
    setSpinning(true); setHighlightId(null); setSelected(null);
    const target = computeTargetRotationForWinner(winner.id, modalRotation);
    const wheelEl = modalWheelRef.current; if (wheelEl) { wheelEl.style.transition = "transform 4.2s cubic-bezier(0.12, 0.6, 0, 1)"; requestAnimationFrame(()=>setModalRotation(target)); const onEnd=()=>{ wheelEl.removeEventListener("transitionend", onEnd); wheelEl.style.transition=""; setModalRotation((r)=>norm360(r)); setSelected(winner); setHighlightId(winner.id); setSpinning(false); fireConfetti(); }; wheelEl.addEventListener("transitionend", onEnd); } else { setModalRotation(target); setSelected(winner); setHighlightId(winner.id); setSpinning(false); fireConfetti(); }
  };

  return (
    <div className="w-full min-h-screen bg-[rgb(252,236,245)] p-4">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
        {/* LEFT: GIVEAWAY */}
        <div className="bg-green-700 rounded-2xl p-6 shadow-xl">
          <div className="text-white text-4xl md:text-5xl text-center">Giveaway Entries</div>

          {/* form */}
          <div className="mx-auto w-full max-w-3xl mt-8 grid grid-cols-1 gap-4">
            <input type="text" placeholder="Instagram Handle" value={gwHandle} onChange={(e)=>setGwHandle(normalizeHandle(e.target.value))} className="text-black text-center bg-white w-[20rem] max-w-full mx-auto rounded-md h-[2.5rem] text-2xl focus:outline-none focus:ring-2 focus:ring-white/70" />
            <div className="grid grid-cols-2 gap-3 text-white/90">
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-white font-semibold">Requirements</div>
                <label className="mt-2 flex items-center gap-2"><input type="checkbox" checked={reqBuyMatcha} onChange={(e)=>setReqBuyMatcha(e.target.checked)} /> Buy matcha</label>
                <label className="mt-2 flex items-center gap-2"><input type="checkbox" checked={reqFollowDallas} onChange={(e)=>setReqFollowDallas(e.target.checked)} /> @DallasMatcha</label>
                <div className="mt-2 text-xs text-white/70">Both required (+1)</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-white font-semibold">Bonuses</div>
                <label className="mt-2 flex items-center gap-2"><input type="checkbox" checked={bonusSponsors} onChange={(e)=>setBonusSponsors(e.target.checked)} /> Sponsors (+1)</label>
                <label className="mt-2 flex items-center gap-2"><input type="checkbox" checked={bonusMerch} onChange={(e)=>setBonusMerch(e.target.checked)} /> Buy merch (+1)</label>
              </div>
            </div>
            <div className="text-white text-center text-xl">Points: <span className="font-bold">{currentPoints}</span></div>
            <div className="flex items-center justify-center gap-3">
              {!editingId ? (
                <button disabled={!canSubmit} onClick={addEntry} className="px-5 py-2 rounded-xl bg-white text-green-700 text-xl font-semibold hover:bg-white/90 disabled:opacity-60">Add Entry</button>
              ) : (
                <>
                  <button disabled={!canSubmit} onClick={updateEntry} className="px-5 py-2 rounded-xl bg-white text-green-700 text-xl font-semibold hover:bg-white/90 disabled:opacity-60">Update Entry</button>
                  <button onClick={()=>{ setEditingId(null); setGwHandle(""); setReqBuyMatcha(false); setReqFollowDallas(false); setBonusSponsors(false); setBonusMerch(false); }} className="px-5 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20">Cancel</button>
                </>
              )}
            </div>
          </div>

          {/* controls */}
          <div className="mt-6 flex flex-wrap gap-3 justify-center items-center">
            <button onClick={()=>setModalOpen(true)} className="px-5 py-2 rounded-xl bg-white text-green-700 text-xl font-semibold hover:bg-white/90">Open Wheel</button>
            <button onClick={clearAll} className="px-5 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20">Clear All</button>
            <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl">
              <span className="text-white/80">Search:</span>
              <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="@handle" className="bg-transparent border-b border-white/30 focus:outline-none text-white placeholder:text-white/60" />
            </div>
          </div>

          {/* winner banner */}
          {selected && (
            <div className="mt-6 bg-white rounded-xl px-5 py-4 text-green-700 text-center text-2xl font-bold">Winner: {selected.handle}</div>
          )}

          {/* table + small wheel */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
            <div className="bg-white/10 rounded-xl p-4 overflow-x-auto">
              <table className="w-full text-white/90">
                <thead>
                  <tr className="border-b border-white/20"><th className="py-2 text-left">Handle</th><th className="py-2 text-center">Req</th><th className="py-2 text-center">Bonuses</th><th className="py-2 text-center">Pts</th><th className="py-2 text-left">Actions</th></tr>
                </thead>
                <tbody>
                  {filtered.length===0 ? (<tr><td colSpan={5} className="py-6 text-center text-white/70">No matching entries.</td></tr>) : filtered.map((e)=> (
                    <tr key={e.id} className="border-b border-white/10 hover:bg-white/5">
                      <td className="py-2 font-semibold">{e.handle}</td>
                      <td className="py-2 text-center">{e.reqBuyMatcha && e.reqFollowDallas ? "✓" : "✗"}</td>
                      <td className="py-2 text-center">{(e.bonusSponsors?1:0)+(e.bonusMerch?1:0)}</td>
                      <td className="py-2 text-center font-bold">{derivedPoints(e)}</td>
                      <td className="py-2 flex gap-2"><button onClick={()=>startEdit(e.id)} className="px-3 py-1 rounded-md bg-white text-green-700 hover:bg-white/90">Edit</button><button onClick={()=>removeEntry(e.id)} className="px-3 py-1 rounded-md bg-red-500/80 text-white hover:bg-red-500">Delete</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {entries.length>0 && (<div className="mt-3 text-white/80 text-sm">Total points: <span className="font-semibold text-white">{totalPoints}</span></div>)}
            </div>
            <div className="bg-white/10 rounded-xl p-4 flex flex-col items-center justify-start">
              <div onClick={()=>setModalOpen(true)} className="cursor-pointer"><Wheel entries={entries} selectedId={highlightId} rotation={0} /><div className="text-white/80 text-sm mt-2">Click to open</div></div>
            </div>
          </div>
        </div>

        {/* RIGHT: MERCH PANEL */}
        <MerchPanel />
      </div>

      {/* Modal Wheel */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-green-700 rounded-2xl w-full max-w-3xl shadow-2xl p-6 relative">
            <button onClick={()=>setModalOpen(false)} className="absolute top-3 right-3 rounded-full bg-white/20 text-white px-3 py-1 hover:bg-white/30">Close</button>
            <div className="text-white text-2xl font-bold text-center mb-4">Spin the Wheel</div>
            <div className="flex flex-col items-center gap-4">
              <div className="relative select-none">
                <div ref={modalWheelRef} className="transition-transform will-change-transform" style={{ transform: `rotate(${modalRotation}deg)` }}>
                  <Wheel entries={entries} selectedId={spinning?null:highlightId} rotation={0} />
                </div>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2"><div className="w-0 h-0 border-l-8 border-r-8 border-b-[12px] border-l-transparent border-r-transparent border-b-white"/></div>
              </div>
              <button disabled={spinning||entries.length===0} onClick={pickWinnerAndSpin} className="px-6 py-3 rounded-xl bg-white text-green-700 text-xl font-semibold hover:bg-white/90 disabled:opacity-60">{spinning?"Spinning...":"SPIN"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Note: run `npm i canvas-confetti` to enable confetti. The app still works if it's missing.