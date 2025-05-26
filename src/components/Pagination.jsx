import React from "react";

export default function Pagination({ page, totalPages, setPage }) {
  return (
    <nav className="mt-3">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => setPage(page - 1)}>
            Previous
          </button>
        </li>
        <li className="page-item disabled">
          <span className="page-link">
            Page {page} of {totalPages}
          </span>
        </li>
        <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => setPage(page + 1)}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
