const SUPABASE_URL = "https://uyzgkvmxyqwdlyrhvadf.supabase.co";
const SUPABASE_KEY = "SPECIAL-KEY"; // replace anon key

// get rows
export async function getAllFormEntries(): Promise<FormDataEntryValue[]> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/formEntries?select=*`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  });
  return res.json();
}

// add a row
export async function submitFormEntry(body: Record<string, string>) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/formEntries`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return "success";
  } catch (error) {
    console.error("Error submitting form entry:", error);
    throw error;
  }
}
