const CategoryBadge = ({ label }: { label: string }) => {
  return (
    <span className="bg-muted rounded-xl px-2 py-1 text-xs font-medium">
      {label}
    </span>
  );
};

export default CategoryBadge;
