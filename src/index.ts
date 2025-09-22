import { getAllContacts } from "./data.js";

const button = document.getElementById("clickMe") as HTMLButtonElement;

button.addEventListener("click", async () => {
  const contacts = await getAllContacts();
  console.log("🚀 ~ contacts:", contacts);
});
