
import { useState, useEffect } from "react";
import { Button, Input, DatePicker } from "../../components/ui";
import { useToast } from "../../context/ToastProvider";

import { useApplication } from "../../context/ApplicationProvider";
import type { MobilityEntryInput, MobilityEntry } from "../../types/mobility_entries";

export default function Step6_Mobility() {
  const {
    addMobilityEntry,
    updateMobilityEntry,
    removeMobilityEntry,
    mobilityEntries,
    completeStep,
    isSubmitted,
  } = useApplication();
  const { show } = useToast();


  type EntryState = MobilityEntryInput & Partial<MobilityEntry>;

  const [entries, setEntries] = useState<EntryState[]>(mobilityEntries);

  useEffect(() => {
    setEntries(mobilityEntries);
  }, [mobilityEntries]);

  const handleChange = async (
    index: number,
    field: keyof MobilityEntryInput,
    value: string
  ) => {
    const updated = [...entries];
    updated[index] = { ...updated[index], [field]: value };
    setEntries(updated);

    const entry = updated[index];
    if (entry.id) {
      const ok = await updateMobilityEntry(entry.id, entry);
      if (!ok) show("Failed to update mobility entry");
    } else if (entry.from_date && entry.to_date) {
      const ok = await addMobilityEntry(entry as MobilityEntryInput);
      if (!ok) show("Failed to add mobility entry");
    }

  };

  const handleAdd = () => {
    const newEntry: EntryState = {
      from_date: "",
      to_date: "",
      organisation: "",
      country: "",
    };
    setEntries([...entries, newEntry]);
  };

  const handleRemove = (index: number) => {
    const entry = entries[index];
    setEntries(entries.filter((_, i) => i !== index));
    if (entry.id) {
      removeMobilityEntry(entry.id);
    }
  };

  const handleSave = async () => {
    await completeStep("step6");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Mobility Entries</h2>
      {entries.map((entry, index) => (
        <div
          key={entry.id ?? index}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 border p-4 rounded-lg shadow-sm"
        >
          <div>
            <label className="block text-sm font-medium">From</label>
            <DatePicker
              value={entry.from_date}
              onChange={(e) => handleChange(index, "from_date", e.target.value)}
              disabled={isSubmitted}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">To</label>
            <DatePicker
              value={entry.to_date}
              onChange={(e) => handleChange(index, "to_date", e.target.value)}
              disabled={isSubmitted}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Organisation</label>
            <Input type="text"
              value={entry.organisation}
              onChange={(e) => handleChange(index, "organisation", e.target.value)}
              disabled={isSubmitted}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Country</label>
            <Input type="text"
              value={entry.country}
              onChange={(e) => handleChange(index, "country", e.target.value)}
              disabled={isSubmitted}
            />
          </div>
          <div className="col-span-1 md:col-span-4 text-right">
            <Button variant="destructive" onClick={() => handleRemove(index)} disabled={isSubmitted}>
              Remove
            </Button>
          </div>
        </div>
      ))}
      <div className="space-x-2">
        <Button onClick={handleAdd} disabled={isSubmitted}>Add Mobility Entry</Button>
        <Button onClick={handleSave} disabled={isSubmitted}>Save All</Button>
      </div>
    </div>
  );
}