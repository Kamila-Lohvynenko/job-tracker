// interface
interface PasswordRequirementProps {
  isValid: boolean;
  label: string;
}

// component
export const PasswordRequirementComponent = ({
  isValid,
  label,
}: PasswordRequirementProps) => {
  // return
  return (
    <div className="flex items-center gap-2 text-sm">
      <div
        className={`h-2 w-2 rounded-full ${
          isValid ? "bg-green-600" : "bg-gray-400"
        }`}
      />

      <span className={isValid ? "text-green-700" : "text-gray-500"}>
        {label}
      </span>
    </div>
  );
};
