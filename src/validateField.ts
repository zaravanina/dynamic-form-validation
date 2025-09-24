import type { FieldState } from "./models/data.interface.js";

const baseInput =
  "block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500";
const errorInput = "border-rose-500 bg-rose-50";
const okInput = "border-emerald-500 bg-emerald-50";

export default function validateField(st: FieldState): boolean {
  const value = st.input.value.trim();
  const ok = st.regex.test(value);
  if (!ok) {
    st.input.className = `${baseInput} ${errorInput}`;
    st.errorEl.textContent = st.message;
    st.errorEl.style.display = "block";
  } else {
    st.input.className = `${baseInput} ${okInput}`;
    st.errorEl.style.display = "none";
  }
  return ok;
}
