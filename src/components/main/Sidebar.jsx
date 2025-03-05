import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronLeft, ChevronUp } from 'lucide-react';
import { sidebarConfig } from "./sidebarConfig.jsx";
import { useNavigate, useLocation, Link } from "react-router-dom";

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef(null);
    const [openSections, setOpenSections] = useState({});

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const toggleSection = (key) => {
        setOpenSections((prevState) => ({
            ...prevState,
            [key]: !prevState[key],
        }));
    };

    const navigatingToPath = (path) => {
        navigate(`${path}`);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div dir="rtl" className="lg:flex z-50 lg:flex-col w-auto lg:w-[212px] fixed lg:h-screen shadow-md">
            <button className="px-3 py-4 text-blue-500 lg:hidden" onClick={toggleSidebar}>
                {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Sidebar Drawer */}
            <div
                ref={sidebarRef}
                className={`fixed top-0 w-[212px] right-0 h-full bg-[#F9F9F9] shadow-lg p-4 transition-transform overflow-y-auto ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                } lg:translate-x-0 lg:relative lg:flex lg:flex-col`}
            >
                <div className="flex justify-end">
                    <button className="text-blue-500 lg:hidden" onClick={toggleSidebar}>
                        <X size={28} />
                    </button>
                </div>

                <Link to="/" className="text-center mb-12">
                    <img src="/logo.png" alt="Logo" className="w-24 mx-auto" />
                </Link>

                <ul className="space-y-14 mx-auto">
                    {sidebarConfig.map((item) => {
                        const isActiveCategory =
                            location.pathname === item.path ||
                            item.subcategories.some(sub => location.pathname === sub.path);

                        return (
                            <li key={item.key}>
                                <div
                                    className={`flex items-center space-x-5 cursor-pointer ${
                                        isActiveCategory ? 'text-[#2079EB]' : 'text-[#4A4A4A]'
                                    }`}
                                    onClick={() => {
                                        if (item.subcategories.length > 0) {
                                            toggleSection(item.key);
                                        } else {
                                            navigatingToPath(item.path);
                                        }
                                    }}
                                >
                                    <div className="flex flex-row gap-1">
                                        {item.subcategories.length > 0 && (
                                            <span className="text-blue-500">
                                                {openSections[item.key] ? <ChevronUp size={16} /> : <ChevronLeft size={16} />}
                                            </span>
                                        )}
                                        {item.icon}
                                    </div>
                                    <span className="lg:block">{item.title}</span>
                                </div>

                                {openSections[item.key] && item.subcategories.length > 0 && (
                                    <ul className="mr-2 mt-4 space-y-4">
                                        {item.subcategories.map((sub, index) => (
                                            <li
                                                key={index}
                                                className={`cursor-pointer px-2 py-1 rounded-md ${
                                                    location.pathname === sub.path
                                                        ? 'bg-[#2079EB1A] text-[#2079EB]'
                                                        : 'text-[#4A4A4A]'
                                                }`}
                                                onClick={() => navigatingToPath(sub.path)}
                                            >
                                                {sub.title}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
