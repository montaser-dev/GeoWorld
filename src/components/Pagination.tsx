    import React from 'react';
    import '../styles/Pagination.css'
    import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

    interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    }

    const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (page: number) => {
        onPageChange(page);
    };

    const renderPageNumbers = () => {
        const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
        let displayedPages: number[];

        if (currentPage <= 3) {
        displayedPages = pageNumbers.slice(0, 6);
        } else if (currentPage >= totalPages - 2) {
        displayedPages = pageNumbers.slice(totalPages - 6, totalPages);
        } else {
        displayedPages = pageNumbers.slice(currentPage - 3, currentPage + 3);
        }

        return displayedPages.map((pageNumber) => (
        <li
            key={pageNumber}
            className={`page-item${currentPage === pageNumber ? ' active' : ''}`}
            onClick={() => handlePageChange(pageNumber)}
        >
            <button className="page-link">{pageNumber}</button>
        </li>
        ));
    };

    const handlePrevClick = () => {
        if (currentPage > 1) {
        handlePageChange(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) {
        handlePageChange(currentPage + 1);
        }
    };

    return (
        <ul className="pagination">
            <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`} onClick={handlePrevClick}>
            <button className="page-link" aria-label="Previous">
                <FaChevronLeft/>
            </button>
            </li>
            {renderPageNumbers()}
            <li className={`page-item${currentPage === totalPages ? ' disabled' : ''}`} onClick={handleNextClick}>
            <button className="page-link" aria-label="Next">
                <FaChevronRight />
            </button>
            </li>
        </ul>
    );
    };

    export default Pagination;
