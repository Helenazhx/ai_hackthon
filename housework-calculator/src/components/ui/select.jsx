// src/components/ui/select.jsx
export const Select = ({ value, onValueChange, children }) => (
    <select 
      value={value} 
      onChange={(e) => onValueChange(e.target.value)}
      className="w-full p-2 border rounded-md"
    >
      {children}
    </select>
  );
  
export const SelectTrigger = ({ children }) => children;
export const SelectValue = () => null;
export const SelectContent = ({ children }) => children;
export const SelectItem = ({ value, children }) => (
  <option value={value}>{children}</option>
);