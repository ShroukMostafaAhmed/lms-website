import InputField from "./InputField.jsx";

const AuthForm = ({ title, fields, buttonText, footerText, footerLink, footerLinkText, breadcrumbPrefix = "الرئيسية", breadcrumbLink = "/" }) => {
    return (
        <div dir='rtl' className="flex flex-col lg:flex-row items-center lg:items-start  justify-center lg:justify-between min-h-1/2 bg-white px-4 my-20 lg:px-16">
            {/* Breadcrumb */}
            <div className="w-full md:w-3/4 lg:w-1/2 mb-4 text-right top-0 p-6 lg:p-0">
                <a href={breadcrumbLink} className="text-blue-600 text-xl font-bold">{breadcrumbPrefix}</a> / <span className="text-gray-600 text-lg font-bold">{title}</span>
            </div>
            {/* Form Container */}
            <div className="bg-white p-6 rounded-4xl w-[90%] md:w-[70%] lg:w-[60%] shadow-[6px_7px_20px_0px_#0000001A,22px_29px_37px_0px_#00000017,50px_65px_49px_0px_#0000000D,89px_116px_59px_0px_#00000003,140px_181px_64px_0px_#00000000]">
                <form>
                    {fields.map((field, index) => (
                        <InputField key={index} {...field} />
                    ))}
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                        {buttonText}
                    </button>
                </form>
                <p className="text-center mt-4 text-gray-600">
                    {footerText} <a href={footerLink} className="text-blue-600">{footerLinkText}</a>
                </p>
            </div>
        </div>
    );
};


export default AuthForm;