export const createBadgeCell = (value: number) => {
  return value > 0 ? (
    <span className="inline-flex items-center justify-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
      {value}
    </span>
  ) : (
    "-"
  );
}; 