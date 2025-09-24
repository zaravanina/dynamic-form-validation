import { getAllFormEntries } from "./data.js";

const displayAllFormEntries = async () => {
  const data = await getAllFormEntries();
  const app = document.getElementById("app")!;
  app.innerHTML = "";

  renderGoBackButton(app);

  const table = document.createElement("table");
  table.className = "rounded-2xl bg-white p-6 shadow-lg w-full max-w-md";

  const thead = document.createElement("thead");
  thead.className = "bg-gray-50";
  const headerRow = document.createElement("tr");
  ["ID", "Created At", "Name", "Email", "Phone"].forEach((col) => {
    const th = document.createElement("th");
    th.scope = "col";
    th.className =
      "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";
    th.textContent = col;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);
  const tbody = document.createElement("tbody");
  tbody.className = "bg-white divide-y divide-gray-200";
  data.forEach((entry) => {
    const row = document.createElement("tr");
    // Define the order of columns to match the table header
    const columns = ["id", "created_at", "name", "email", "phone"];
    columns.forEach((alias) => {
      const td = document.createElement("td");
      td.className = "px-6 py-4 whitespace-nowrap text-sm text-gray-500";
      if (
        alias === "created_at" &&
        entry[alias as keyof typeof entry] !== undefined
      ) {
        const date = new Date(
          entry[alias as keyof typeof entry] as unknown as string
        );
        td.textContent = date.toLocaleString();
      } else {
        td.textContent =
          entry[alias as keyof typeof entry] !== undefined
            ? String(entry[alias as keyof typeof entry])
            : "";
      }
      row.appendChild(td);
    });
    tbody.appendChild(row);
  });
  table.appendChild(tbody);
  app.appendChild(table);
};
export default displayAllFormEntries;

const renderGoBackButton = (container: HTMLElement) => {
  const goBackButton = document.createElement("button");
  goBackButton.type = "button";
  goBackButton.textContent = "Go Back";
  goBackButton.className =
    "mb-4 inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
  goBackButton.addEventListener("click", () => {
    container.innerHTML = "";
    window.location.reload();
  });
  container.appendChild(goBackButton);
};
