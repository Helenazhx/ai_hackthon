// src/components/ui/checkbox.jsx
export const Checkbox = ({ checked, onCheckedChange }) => (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      className="h-4 w-4"
    />
  );