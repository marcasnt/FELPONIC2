type Option = { value: string; label: string; disabled?: boolean };

export default function CustomSelect({ label, value, onChange, options, name, required }: {
  label: string; value: string; onChange: (value: string) => void; options: Option[]; name: string; required?: boolean;
}) {
  return <div>
    <label className="mb-2 block font-medium" htmlFor={name}>{label}</label>
    <select className="field" id={name} name={name} value={value} required={required} onChange={event => onChange(event.target.value)}>
      {options.map(option => <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>)}
    </select>
  </div>;
}
