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

    // Handle sidebar positioning relative to footer
    useEffect(() => {
        const sidebar = sidebarRef.current;
        
        if (sidebar) {
            sidebar.style.position = 'fixed';
            sidebar.style.top = '0px';
            sidebar.style.bottom = 'auto';
            sidebar.style.height = '100vh';
        }

        const handleScroll = () => {
            const footer = document.querySelector('footer');
            
            if (sidebar && footer && window.innerWidth >= 1024) {
                const footerRect = footer.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                const scrollY = window.scrollY;
                const documentHeight = document.documentElement.scrollHeight;
                const footerHeight = footer.offsetHeight;
                
                const footerStartPosition = documentHeight - viewportHeight - footerHeight;
                
                if (scrollY >= footerStartPosition && footerRect.top <= viewportHeight) {
                    const footerVisibleHeight = Math.max(0, viewportHeight - footerRect.top);
                    const slideUpDistance = Math.min(footerVisibleHeight, sidebar.offsetHeight);
                    
                    sidebar.style.position = 'fixed';
                    sidebar.style.top = `-${slideUpDistance}px`;
                    sidebar.style.bottom = 'auto';
                    sidebar.style.height = '100vh';
                } else {
                    sidebar.style.position = 'fixed';
                    sidebar.style.top = '0px';
                    sidebar.style.bottom = 'auto';
                    sidebar.style.height = '100vh';
                }
            }
        };

        const initTimer = setTimeout(() => {
            if (sidebar && window.innerWidth >= 1024) {
                sidebar.style.position = 'fixed';
                sidebar.style.top = '0px';
                sidebar.style.bottom = 'auto';
                sidebar.style.height = '100vh';
            }
            handleScroll();
        }, 100);

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);

        return () => {
            clearTimeout(initTimer);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    return (
        <>
            {/* Mobile Menu Button - Fixed */}
            <div className="lg:hidden fixed top-4 right-4 z-50">
                <button className="px-3 py-4 text-blue-500 bg-white rounded-lg shadow-md" onClick={toggleSidebar}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Sidebar Drawer */}
            <div
                ref={sidebarRef}
                className={`w-[212px] right-0 bg-[#F9F9F9] px-4 py-6 transition-transform overflow-y-auto z-40 ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                } lg:translate-x-0`}
                dir="rtl"
                style={{
                    position: 'fixed',
                    top: '0px',
                    bottom: 'auto',
                    height: '100vh',
                    right: '0px'
                }}
            >
                {/* Close button for mobile */}
                <div className="flex justify-end lg:hidden mb-4">
                    <button className="text-blue-500" onClick={toggleSidebar}>
                        <X size={28} />
                    </button>
                </div>

                {/* Logo */}
                <Link to="/" className="block text-center mb-8">
                    <img src="/logo.png" alt="Logo" className="w-[45%] mx-auto" />
                </Link>

                {/* Navigation Menu */}
                <ul className="space-y-6">
                    {sidebarConfig.map((item) => {
                        const isActiveCategory =
                            location.pathname === item.path ||
                            item.subcategories.some(sub => location.pathname === sub.path);

                        return (
                            <li key={item.key}>
                                <div
                                    className={`flex items-center space-x-3 rounded-xl px-4 py-3 cursor-pointer font-bold transition-colors ${
                                        isActiveCategory ? 'text-[#ffffff] bg-blue-500' : 'text-[#4A4A4A] hover:bg-gray-100'
                                    }`}
                                    onClick={() => {
                                        if (item.subcategories.length > 0) {
                                            toggleSection(item.key);
                                        } else {
                                            navigatingToPath(item.path);
                                        }
                                    }}
                                >
                                    <div className="flex flex-row items-center gap-1">
                                        {item.subcategories.length > 0 && (
                                            <span className={`${isActiveCategory ? 'text-white' : 'text-blue-500'} font-bold`}>
                                                {openSections[item.key] ? <ChevronUp size={16} /> : <ChevronLeft size={16} />}
                                            </span>
                                        )}
                                        <span className={isActiveCategory ? 'text-white' : 'text-blue-500'}>
                                            {item.icon}
                                        </span>
                                    </div>
                                    <span className="font-bold">{item.title}</span>
                                </div>

                                {openSections[item.key] && item.subcategories.length > 0 && (
                                    <ul className="mr-6 mt-2 space-y-2">
                                        {item.subcategories.map((sub, index) => (
                                            <li
                                                key={index}
                                                className={`cursor-pointer px-3 py-2 rounded-md transition-colors ${
                                                    location.pathname === sub.path
                                                        ? 'bg-[#2079EB1A] text-[#2079EB]'
                                                        : 'text-[#4A4A4A] hover:bg-gray-50'
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

            {/* Overlay for mobile */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}

export default Sidebar;
