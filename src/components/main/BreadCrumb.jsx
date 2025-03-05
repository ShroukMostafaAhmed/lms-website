import React from "react";

const Breadcrumb = ({ items }) => {
    return (
        <nav dir="rtl" className="text-xl font-bold my-4 px-6 lg:px-12">
            <ul className="flex space-x-1 rtl:space-x-reverse">
                {items.map((item, index) => (
                    <li key={index} className="flex items-center">
                        {index !== 0 && <span className="mx-1">/</span>}
                        {index === items.length - 1 ? (
                            <span className="text-gray-800">{item.label}</span>
                        ) : (
                            <a href={item.href} className="text-blue-500 hover:text-blue-700">
                                {item.label}
                            </a>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Breadcrumb