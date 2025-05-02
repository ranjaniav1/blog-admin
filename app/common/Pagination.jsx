const Pagination = ({ pagination }) => {
  const handlePageChange = (newPage) => {
    if (pagination.onPageChange) {
      pagination.onPageChange(newPage);
    }
  };

  return (
    <div className="flex justify-end items-center mt-4 gap-2">
      <button
        onClick={() =>
          handlePageChange(Math.max(1, pagination.currentPage - 1))
        }
        disabled={pagination.currentPage === 1}
        className="btn btn-sm btn-outline"
      >
        Previous
      </button>
      <span className="text-sm font-medium">
        Page {pagination.currentPage} of {pagination.totalPages}
      </span>
      <button
        onClick={() => handlePageChange(pagination.currentPage + 1)}
        disabled={pagination.currentPage === pagination.totalPages}
        className="btn btn-sm btn-outline"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
