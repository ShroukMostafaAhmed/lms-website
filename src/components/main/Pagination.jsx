import React from 'react';

const Pagination = ({ totalQuestions, currentPage, onPageChange }) => {
    return (
        <div className="flex flex-wrap justify-center gap-2 mt-6">
            {Array.from({ length: totalQuestions }, (_, i) => (
                <button
                    key={i}
                    className={`w-10 h-10 border rounded-md ${
                        currentPage === i + 1
                            ? 'bg-blue-500 text-white'
                            : 'bg-white border-blue-300 text-blue-500 hover:bg-blue-100'
                    }`}
                    onClick={() => onPageChange(i + 1)}
                >
                    {i + 1}
                </button>
            ))}
        </div>
    );
};

export default Pagination;