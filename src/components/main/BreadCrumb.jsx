import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
    const navigate = useNavigate();

    const handleClick = (item, e) => {
        if (item.href && item.state) {
            e.preventDefault();
            console.log('Breadcrumb navigation:', item.href, item.state);
            navigate(item.href, { state: item.state });
        }
    };

    return (
        <nav dir="rtl" className="text-xl font-bold my-4 px-6 lg:px-12">
            <ul className="flex space-x-1 rtl:space-x-reverse">
                {items.map((item, index) => (
                    <li key={index} className="flex items-center">
                        {index !== 0 && <span className="mx-1">/</span>}
                        {index === items.length - 1 ? (
                            <span className="text-gray-800">{item.label}</span>
                        ) : (
                            item.href && (
                                <Link
                                    to={item.href}
                                    state={item.state}
                                    className="text-blue-500 hover:text-blue-700"
                                    onClick={(e) => handleClick(item, e)}
                                >
                                    {item.label}
                                </Link>
                            )
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Breadcrumb;