import { notFound } from "next/navigation";
import { getSchedule } from "@/lib/data";
import { TextField, SubmitButton } from "@/components/admin/fields";
import { updateFixture } from "../actions";

export default async function EditFixturePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const schedule = await getSchedule();
  const row = schedule.find((f) => f.id === id);
  if (!row) notFound();

  return (
    <div>
      <h1 className="font-accent text-3xl text-white mb-6">Edit Fixture</h1>
      <form action={updateFixture} className="space-y-5 max-w-xl">
        <input type="hidden" name="id" value={row.id} />
        <TextField label="Date" name="date" defaultValue={row.date} required />
        <TextField label="Time" name="time" defaultValue={row.time} required />
        <TextField label="Fixture" name="fixture" defaultValue={row.fixture} required />
        <TextField label="Boat Class" name="boatClass" defaultValue={row.boatClass} required />
        <SubmitButton label="Save Changes" />
      </form>
    </div>
  );
}
