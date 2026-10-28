/**
 * Accessible Pagination component.
 * Demonstrates:
 * - Pagination state calculation
 * - Controlled page navigation
 * - Accessibility landmarks (role="navigation", aria-current="page")
 * 
 * Fulfills syllabus: Lectures 67-72 (Pagination pattern)
 */
export default function Pagination({
  currentPage,
  totalItems,
  pageSize = 6,
  onPageChange
}) {
  const totalPages = Math.ceil(totalItems / pageSize);

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="pagination-wrapper" role="navigation" aria-label="Pagination">
      <div className="pagination-info">
        Page {currentPage} of {totalPages} ({totalItems} total items)
      </div>

      <div className="pagination-buttons">
        <button
          className="pagination-btn pagination-prev"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Go to previous page"
        >
          ← Prev
        </button>

        {pages.map((page) => (
          <button
            key={page}
            className={`pagination-btn pagination-number ${
              page === currentPage ? "pagination-active" : ""
            }`}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? "page" : undefined}
            aria-label={`Page ${page}`}
          >
            {page}
          </button>
        ))}

        <button
          className="pagination-btn pagination-next"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Go to next page"
        >
          Next →
        </button>
      </div>
    </nav>
  );
}
