export function TextField({
  label,
  name,
  defaultValue,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-widest text-gold-light mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-sm border border-navy-line bg-navy-950 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-gold-light focus:outline-none"
      />
    </div>
  );
}

export function TextAreaField({
  label,
  name,
  defaultValue,
  rows = 4,
  required,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
  required?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-widest text-gold-light mb-2">
        {label}
      </label>
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        required={required}
        className="w-full rounded-sm border border-navy-line bg-navy-950 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-gold-light focus:outline-none"
      />
      {hint && <p className="mt-1 text-xs text-white/40">{hint}</p>}
    </div>
  );
}

export function ColorField({
  label,
  name,
  defaultValue,
}: {
  label: string;
  name: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-widest text-gold-light mb-2">
        {label}
      </label>
      <div className="flex items-center gap-3">
        <input
          type="color"
          name={name}
          defaultValue={defaultValue || "#021329"}
          className="h-11 w-14 rounded-sm border border-navy-line bg-navy-950"
        />
      </div>
    </div>
  );
}

export function SelectField({
  label,
  name,
  options,
  defaultValue,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-widest text-gold-light mb-2">
        {label}
      </label>
      <select
        name={name}
        defaultValue={defaultValue}
        className="w-full rounded-sm border border-navy-line bg-navy-950 px-4 py-3 text-sm text-white focus:border-gold-light focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function SubmitButton({ label }: { label: string }) {
  return (
    <button
      type="submit"
      className="inline-flex items-center rounded-sm bg-gold-light px-6 py-3 text-xs font-bold uppercase tracking-widest text-navy-950 hover:bg-gold transition-colors"
    >
      {label}
    </button>
  );
}
