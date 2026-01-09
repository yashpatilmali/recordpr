export default function FilterSelect({
  label,
  value,
  onChange,
  options = [],
  disabled = false
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-blue-700 uppercase">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="px-4 py-3 rounded-xl border border-blue-300 bg-white
                   focus:outline-none focus:ring-4 focus:ring-blue-200
                   disabled:bg-gray-100"
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
