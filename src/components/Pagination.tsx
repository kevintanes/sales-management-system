import Link from "next/link";
import { Button } from "@/components/ui/button";

type PaginationProps = {
  page: number;
  totalPages: number;
  basePath: string;
  searchParams: Record<string, string | undefined>;
};

const Pagination = ({ page, totalPages, basePath, searchParams }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const buildHref = (targetPage: number) => {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (key !== "page" && value) params.set(key, value);
    });
    params.set("page", String(targetPage));
    return `${basePath}?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-center gap-1">
      {page <= 1 ? (
        <Button variant="outline" size="sm" disabled>
          Prev
        </Button>
      ) : (
        <Button variant="outline" size="sm" asChild>
          <Link href={buildHref(page - 1)}>Prev</Link>
        </Button>
      )}

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
        <Button
          key={pageNumber}
          variant={pageNumber === page ? "default" : "outline"}
          size="sm"
          asChild
        >
          <Link href={buildHref(pageNumber)}>{pageNumber}</Link>
        </Button>
      ))}

      {page >= totalPages ? (
        <Button variant="outline" size="sm" disabled>
          Next
        </Button>
      ) : (
        <Button variant="outline" size="sm" asChild>
          <Link href={buildHref(page + 1)}>Next</Link>
        </Button>
      )}
    </div>
  );
};

export default Pagination;
