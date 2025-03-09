import React from 'react';
import {CreditCardIcon, HeadphonesIcon, LogOutIcon, TrashIcon, UserIcon} from "lucide-react";

function Settings() {
    return (
        <>
            <div className="font-sans p-4 mx-auto bg-white mt-6 rounded-lg" dir="rtl">
                <h1 className="text-2xl font-bold mb-6 text-right">الإعدادات</h1>

                <div className="space-y-4">
                    {/* Personal Info */}
                    <div className="flex justify-start gap-8 max-w-7xl items-center p-4 bg-gray-50 rounded-full shadow-sm h-20">
                        <div className="bg-blue-500 p-2 rounded-lg">
                            <UserIcon className="w-5 h-5 lg:w-7 lg:h-7 text-white" />
                        </div>
                        <div className="text-lg text-[#333333] font-bold">البيانات الشخصية</div>
                    </div>

                    {/* Technical Support */}
                    <div className="flex justify-start gap-8 max-w-7xl items-center p-4 bg-gray-50 rounded-full shadow-sm h-20">
                        <div className="bg-blue-500 p-2 rounded-lg">
                            <HeadphonesIcon className="w-5 h-5 lg:w-7 lg:h-7 text-white" />
                        </div>
                        <div className="text-lg text-[#333333] font-bold">الدعم الفني</div>
                    </div>

                    {/* Cancel Subscription */}
                    <div className="flex justify-start gap-8 max-w-7xl items-center p-4 bg-gray-50 rounded-full shadow-sm h-20">
                        <div className="bg-blue-500 p-2 rounded-lg">
                            <CreditCardIcon className="w-5 h-5 lg:w-7 lg:h-7 text-white" />
                        </div>
                        <div className="text-lg text-[#333333] font-bold">الغاء الإشتراك</div>
                    </div>

                    {/* Delete Account */}
                    <div className="flex justify-start gap-8 max-w-7xl items-center p-4 bg-gray-50 rounded-full shadow-sm h-20">
                        <div className="bg-blue-500 p-2 rounded-lg">
                            <TrashIcon className="w-5 h-5 lg:w-7 lg:h-7 text-white" />
                        </div>
                        <div className="text-lg text-[#333333] font-bold">حذف الحساب</div>
                    </div>

                    {/* Logout */}
                    <div className="flex justify-start gap-8 max-w-7xl items-center p-4 bg-gray-50 rounded-full shadow-sm h-20">
                        <div className="bg-orange-500 p-2 rounded-lg">
                            <img src="/logout.png" alt="logout" className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                        </div>
                        <div className="text-lg text-[#333333] font-bold">تسجيل الخروج</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Settings;