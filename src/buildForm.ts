import { submitFormEntry } from "./data.js";
import displayAllFormEntries from "./displayAllFormEntries.js";
import type { FieldConfig, FieldState } from "./models/data.interface.js";
import validateField from "./validateField.js";

//classes
const baseInput =
  "block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500";
const labelCls = "mb-1 block text-sm font-medium text-gray-700";
const groupCls = "mb-4";
const errorTextCls = "mt-1 text-sm text-rose-600";
const buttonCls =
  "cursor-pointer inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500";
const buttonSecondaryCls =
  "cursor-pointer inline-flex w-full items-center justify-center rounded-lg bg-transparent px-4 py-2.5 font-medium text-blue-600";

const createRegex = (s: string) => new RegExp(s);

export default function buildForm(fields: FieldConfig[]) {
  const app = document.getElementById("app")!;
  const formSection = document.createElement("section");
  formSection.className = "rounded-2xl bg-white p-6 shadow-lg w-full max-w-md";

  const headline = document.createElement("h1");
  headline.className = "mb-6 text-2xl font-semibold text-gray-900";
  headline.textContent = "Create account";
  formSection.appendChild(headline);

  //this is the form element
  const form = document.createElement("form");

  //since i am validating manually
  form.noValidate = true;

  const states: Record<string, FieldState> = {};

  //fields
  fields.forEach((f) => {
    const group = document.createElement("div");
    group.className = groupCls;

    const label = document.createElement("label");
    label.className = labelCls;
    label.htmlFor = f.alias;
    label.textContent = f.title;

    const input = document.createElement("input");
    input.id = f.alias;
    input.name = f.alias;
    input.type = f.type || "text";
    input.placeholder = f.placeholder ?? f.title;
    input.className = baseInput;

    const errorEl = document.createElement("p");
    errorEl.className = errorTextCls;
    errorEl.style.display = "none";

    group.append(label, input, errorEl);
    form.appendChild(group);

    states[f.alias] = {
      input,
      errorEl,
      regex: createRegex(f.regex),
      message: f.message,
    };
  });

  //submit button
  const submit = document.createElement("button");
  submit.type = "submit";
  submit.className = buttonCls;
  submit.textContent = "Submit";
  form.appendChild(submit);

  //success message
  const success = document.createElement("p");
  success.className =
    "mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-emerald-700";
  success.style.display = "none";
  form.appendChild(success);

  //go to all entries button
  const goToAllEntriesButton = document.createElement("button");
  goToAllEntriesButton.type = "button";
  goToAllEntriesButton.className = buttonSecondaryCls;
  goToAllEntriesButton.textContent = "View All Entries";
  goToAllEntriesButton.addEventListener("click", async () => {
    await displayAllFormEntries();
  });

  formSection.appendChild(form);
  formSection.appendChild(goToAllEntriesButton);
  app.innerHTML = "";
  app.appendChild(formSection);

  //live validation
  Object.entries(states).forEach(([_, st]) => {
    const validate = () => validateField(st);
    st.input.addEventListener("blur", validate);
    st.input.addEventListener("input", validate);
  });

  //on submit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let allOK = true;
    Object.values(states).forEach((st) => {
      if (!validateField(st)) allOK = false;
    });

    if (allOK) {
      const data: Record<string, string> = {};
      Object.entries(states).forEach(([alias, st]) => {
        data[alias] = st.input.value.trim();
      });
      await submitFormEntry(data);
      success.textContent =
        "✅ Form valid! Thank you " + JSON.stringify(data.name);
      success.style.display = "block";
      form.reset();
    } else {
      success.style.display = "none";
    }
  });
}
