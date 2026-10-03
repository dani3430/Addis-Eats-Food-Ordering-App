export const Field = ({ label, error, children, required = false, className = '' }) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="text-xs text-red-500 font-medium animate-fadeIn">
          {error}
        </p>
      )}
    </div>
  );
};

export default Field;