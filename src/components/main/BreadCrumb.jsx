import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
    const navigate = useNavigate();

    const handleClick = (item, e) => {
        if (item.href) {
            e.preventDefault();
            navigate(item.href, { state: item.state || {} });
        }
    };


    return (
        <nav dir="rtl" className="text-base sm:text-lg md:text-xl font-bold my-2 px-4 sm:px-6 md:px-12">
            <ul className="flex flex-wrap items-center gap-1 sm:gap-2 md:gap-4">
                {items.map((item, index) => (
                    <li key={index} className="flex items-center">
                        {index !== 0 && <span className="mx-1 text-blue-500">/</span>}
                        {index === items.length - 1 ? (
                            <span className="text-gray-800">{item.label}</span>
                        ) : (
                            <Link
                                to={item.href}
                                state={item.state}
                                className="text-blue-500 hover:text-blue-700"
                                onClick={(e) => handleClick(item, e)}
                            >
                                {item.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Breadcrumb;