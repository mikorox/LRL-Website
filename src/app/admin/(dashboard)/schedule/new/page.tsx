import { TextField, SubmitButton } from "@/components/admin/fields";
import { createFixture } from "../actions";

export default function NewFixturePage() {
  return (
    <div>
      <h1 className="font-accent text-3xl text-white mb-6">Add Fixture</h1>
      <form action={createFixture} className="space-y-5 max-w-xl">
        <TextField label="Date" name="date" placeholder="e.g. 19 Dec 2026" required />
        <TextField label="Time" name="time" placeholder="e.g. 1:00 PM" required />
        <TextField label="Fixture" name="fixture" placeholder="e.g. Colombo Capitals vs Mirissa Mavericks" required />
        <TextField label="Boat Class" name="boatClass" placeholder="e.g. Men's Four" required />
        <SubmitButton label="Add Fixture" />
      </form>
    </div>
  );
}
