import { useState } from "react";
import { Button, Input, DatePicker } from "../../../components/ui";
import { useApplication } from "../../../context/ApplicationProvider";

interface MobilityEntry {
  from_date: string;
  to_date: string;
  organisation: string;
  country: string;
}

export default function Step6_Mobility() {
  const { updateField, data } = useApplication();
  const [entries, setEntries] = useState<MobilityEntry[]>(data.mobility_entries || []);

  const handleChange = (index: number, field: keyof MobilityEntry, value: string) => {
    const updated = [...entries];
    updated[index][field] = value;
    setEntries(updated);
    updateField("mobility_entries", updated);
  };

  const handleAdd = () => {
    const newEntry = { from_date: "", to_date: "", organisation: "", country: "" };
    const updated = [...entries, newEntry];
    setEntries(updated);
    updateField("mobility_entries", updated);
  };

  const handleRemove = (index: number) => {
    const updated = entries.filter((_, i) => i !== index);
    setEntries(updated);
    updateField("mobility_entries", updated);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Mobility Entries</h2>
      {entries.map((entry, index) => (
        <div
          key={index}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 border p-4 rounded-lg shadow-sm"
        >
          <div>
            <label className="block text-sm font-medium">From</label>
            <DatePicker
              value={entry.from_date}
              onChange={(e) => handleChange(index, "from_date", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">To</label>
            <DatePicker
              value={entry.to_date}
              onChange={(e) => handleChange(index, "to_date", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Organisation</label>
            <Input type="text"
              value={entry.organisation}
              onChange={(e) => handleChange(index, "organisation", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Country</label>
            <Input type="text"
              value={entry.country}
              onChange={(e) => handleChange(index, "country", e.target.value)}
            />
          </div>
          <div className="col-span-1 md:col-span-4 text-right">
            <Button variant="destructive" onClick={() => handleRemove(index)}>
              Remove
            </Button>
          </div>
        </div>
      ))}
      <Button onClick={handleAdd}>Add Mobility Entry</Button>
    </div>
  );
}