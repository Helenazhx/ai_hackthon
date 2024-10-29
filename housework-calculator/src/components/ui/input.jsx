// src/components/ui/input.jsx
export const Input = ({ ...props }) => (
    <input
      {...props}
      className={`border rounded-md px-2 py-1 ${props.className}`}
    />
  );