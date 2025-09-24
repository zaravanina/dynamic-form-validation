import buildForm from "./buildForm.js";
import { type FieldConfig } from "./models/data.interface.js";

async function loadConfig(): Promise<FieldConfig[]> {
  const res = await fetch("./config/fields.json");
  if (!res.ok) throw new Error("Failed to load fields.json");
  return res.json();
}

async function main() {
  try {
    const config = await loadConfig();
    buildForm(config);
  } catch (e) {
    const app = document.getElementById("app")!;
    app.innerHTML =
      '<p class="text-rose-700 bg-rose-50 p-3 rounded-lg">Failed to load form config.</p>';
  }
}

main();
