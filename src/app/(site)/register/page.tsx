"use client";

import { useState } from "react";
import { createRegistration } from "./actions";
import ExternalFileUploadField from "@/components/ExternalFileUploadField";

export default function RegisterPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  return (
    <div className="relative bg-black overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at top, rgba(2,19,41,0.7) 0%, transparent 60%)",
        }}
      />

      <section className="relative overflow-hidden bg-oar-fan">
        <div className="absolute inset-0 bg-navy-900" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-950/80 to-black" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="font-accent text-4xl sm:text-5xl md:text-6xl leading-[0.95] max-w-3xl">
            Your Journey Starts Here
          </h1>
          <p className="mt-5 max-w-xl text-white/70 text-base sm:text-lg">
            Think you have what it takes to compete in the Lanka Rowing
            League? Register below to join the official player pool and
            become eligible for the league&apos;s player draft.
          </p>
        </div>
      </section>

      <section className="relative bg-gradient-to-b from-black to-navy-950">
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        {submitted ? (
          <div className="rounded-sm border border-gold-light bg-navy-900 p-8 text-center">
            <h2 className="font-accent text-2xl text-gold-light">
              Registration Received
            </h2>
            <p className="mt-3 text-white/70">
              Thank you for registering. The LRL team will be in touch ahead
              of the player draft.
            </p>
          </div>
        ) : (
          <form
            className="space-y-6"
            onSubmit={async (e) => {
              e.preventDefault();
              setError("");

              const formData = new FormData(e.currentTarget);
              if (!String(formData.get("profilePictureUrl") || "")) {
                setError("Please upload a profile picture before submitting.");
                return;
              }
              if (!String(formData.get("nicPassportUrl") || "")) {
                setError("Please upload a NIC or Passport image before submitting.");
                return;
              }

              setPending(true);
              try {
                await createRegistration(formData);
                setSubmitted(true);
              } catch {
                setError("Something went wrong submitting your registration. Please try again.");
              } finally {
                setPending(false);
              }
            }}
          >
            <TextField label="Name" name="name" required />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextField label="Age" name="age" type="number" required />
              <SelectField
                label="Gender"
                name="gender"
                options={["Male", "Female"]}
                required
              />
            </div>
            <TextField label="Weight (kg)" name="weight" type="number" required />
            <SelectField
              label="Stroke Side / Bow Side"
              name="side"
              options={["Stroke Side", "Bow Side", "Either"]}
              required
            />
            <SelectField
              label="Preferred Discipline"
              name="discipline"
              options={["Sculling", "Sweep"]}
              required
            />
            <SelectField
              label="Role"
              name="role"
              options={["Oarsman", "Oarswoman", "Coxswain"]}
              required
            />

            <ExternalFileUploadField
              label="Profile Picture"
              name="profilePictureUrl"
              hint="This will be used for the player auction."
              required
            />
            <ExternalFileUploadField
              label="NIC or Passport Image"
              name="nicPassportUrl"
              hint="This is required for identity verification purposes only."
              required
            />

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={pending}
              className="w-full inline-flex items-center justify-center rounded-sm bg-gold-light px-6 py-3 text-xs font-bold uppercase tracking-widest text-navy-950 hover:bg-gold transition-colors disabled:opacity-60"
            >
              {pending ? "Submitting..." : "Submit Registration"}
            </button>
          </form>
        )}
        </div>
      </section>
    </div>
  );
}

function TextField({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-xs font-bold uppercase tracking-widest text-gold-light mb-2"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-sm border border-navy-line bg-navy-900 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-gold-light focus:outline-none"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  required,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-xs font-bold uppercase tracking-widest text-gold-light mb-2"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        defaultValue=""
        className="w-full rounded-sm border border-navy-line bg-navy-900 px-4 py-3 text-sm text-white focus:border-gold-light focus:outline-none"
      >
        <option value="" disabled>
          Select {label.toLowerCase()}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
