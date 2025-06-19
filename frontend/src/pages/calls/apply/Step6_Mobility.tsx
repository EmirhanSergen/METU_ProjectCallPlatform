
import { useState, useEffect } from "react";
import { Button } from "../../../components/ui/Button";
import { useApplication } from "../../../context/ApplicationProvider";
import type { MobilityEntryInput, MobilityEntry } from "../../../types/mobility.types";

export default function Step6_Mobility() {
  const { application, updateApplicationField } = useApplication();
  const [entries, setEntries] = useState<MobilityEntry[]>(application.mobility_entries || []);

  useEffect(() => {
    setEntries(application.mobility_entries || []);
  }, [application.mobility_entries]);

  const handleChange = (index: number, field: keyof MobilityEntry, value: string) => {
    const updated = [...entries];
    updated[index][field] = value;
    setEntries(updated);
    updateApplicationField("mobility_entries", updated);
  };

  const handleAdd = () => {
    const newEntry = { from_date: "", to_date: "", organisation: "", country: "" };
    const updated = [...entries, newEntry];
    setEntries(updated);
    updateApplicationField("mobility_entries", updated);
  };

  const handleRemove = (index: number) => {
    const updated = entries.filter((_, i) => i !== index);
    setEntries(updated);
    updateApplicationField("mobility_entries", updated);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Mobility Entries</h2>
      {mobilityEntries.map((entry) => (
        <div
          key={entry.id}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 border p-4 rounded-lg shadow-sm"
        >
          <div>
            <label className="block text-sm font-medium">From</label>
            <input
              type="date"
              value={entry.from_date}
              onChange={(e) => handleChange(entry.id, "from_date", e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">To</label>
            <input
              type="date"
              value={entry.to_date}
              onChange={(e) => handleChange(entry.id, "to_date", e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Organisation</label>
            <input
              type="text"
              value={entry.organisation}
              onChange={(e) => handleChange(entry.id, "organisation", e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Country</label>
            <input
              type="text"
              value={entry.country}
              onChange={(e) => handleChange(entry.id, "country", e.target.value)}
              className="input"
            />
          </div>
          <div className="col-span-1 md:col-span-4 text-right">
            <Button variant="destructive" onClick={() => handleRemove(entry.id)}>
              Remove
            </Button>
          </div>
        </div>
      ))}
      <Button onClick={handleAdd}>Add Mobility Entry</Button>
    </div>
  );
}