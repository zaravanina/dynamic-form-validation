const SUPABASE_URL = "https://uyzgkvmxyqwdlyrhvadf.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5emdrdm14eXF3ZGx5cmh2YWRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0NjczODIsImV4cCI6MjA3NDA0MzM4Mn0.N_k5pig8glzW0nbhGiyFcJnTjZYW_KW3GL2m2sp4UOg";

// get rows
export async function getAllContacts() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/Contacts?select=*`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  });
  return res.json();
}

// add a row
export async function addUser(name: string, age: number) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/Contacts`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, age }),
  });
  return res.json();
}
