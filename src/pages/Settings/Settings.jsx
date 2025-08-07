import React, { useState, useEffect } from 'react';
import { Check, Star, Zap, Crown, CheckCircle2 } from 'lucide-react';

export default function ModernSubscriptionPlans() {
    const [selectedPlanId, setSelectedPlanId] = useState(null);
    const [pendingSelection, setPendingSelection] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        const savedPlan = localStorage.getItem('selectedPlanId');
        if (savedPlan) setSelectedPlanId(savedPlan);
    }, []);

    const confirmChange = () => {
        setSelectedPlanId(pendingSelection);
        localStorage.setItem('selectedPlanId', pendingSelection);
        setPendingSelection(null);
        setShowConfirm(false);
    };

    const handlePlanClick = (id) => {
        if (selectedPlanId && selectedPlanId !== id) {
            setPendingSelection(id);
            setShowConfirm(true);
        } else {
            setSelectedPlanId(id);
            localStorage.setItem('selectedPlanId', id);
        }
    };

    const plans = [
        {
            id: 'basic',
            label: "الباقة الأساسية",
            subtitle: "مثالية للبداية",
            price: 20,
            period: "شهرياً",
            icon: <Star className="w-8 h-8" />,
            gradient: "from-amber-400 to-orange-500",
            borderGradient: "from-amber-200 to-orange-300",
            features: [
                "تشمل جميع المراحل الدراسية",
                "دروس تعليمية شاملة", 
                "فيديوهات تعليمية شاملة",
                "اختبارات متطورة لتقييم الفهم"
            ],
        },
        {
            id: 'premium',
            label: "الباقة المميزة",
            subtitle: "الأكثر شعبية",
            price: 40,
            period: "شهرياً",
            icon: <Zap className="w-8 h-8" />,
            gradient: "from-blue-500 to-indigo-600",
            borderGradient: "from-blue-200 to-indigo-300",
            features: [
                "جميع ميزات الباقة الأساسية",
                "دروس تعليمية شاملة",
                "فيديوهات تعليمية شاملة", 
                "اختبارات متطورة لتقييم الفهم",
                "حل الأسئلة والواجبات"
            ],
        },
        {
            id: 'ultimate',
            label: "الباقة الفائقة",
            subtitle: "للطلاب المتميزين",
            price: 60,
            period: "شهرياً",
            icon: <Crown className="w-8 h-8" />,
            gradient: "from-purple-500 to-pink-600",
            borderGradient: "from-purple-200 to-pink-300",
            features: [
                "جميع ميزات الباقة المميزة",
                "دروس تعليمية شاملة",
                "فيديوهات تعليمية شاملة",
                "اختبارات متطورة لتقييم الفهم", 
                "حل الأسئلة والواجبات",
                "مساعد ذكي متقدم",
                "دعم فني متقدم 24/7"
            ],
        }
    ];

    return (
        <div className="min-h-screen py-10 px-4 relative">
            <div className="text-center mb-30">
                <h1 className="text-5xl font-bold text-blue-700 mb-4">باقاتنا المميزة</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    اختر الباقة المناسبة لك وابدأ رحلتك التعليمية مع أفضل المحتوى والأدوات التعليمية
                </p>
            </div>

            <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 lg:gap-12">
                {plans.map((plan) => (
                    <div key={plan.id} className={`relative group`}>
                        <div className={`
                            relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl 
                            border border-gray-200 hover:border-blue-400 transition-colors
                            transition-all duration-500 hover:scale-105 hover:shadow-2xl
                            ${selectedPlanId === plan.id ? 'ring-2 ring-blue-500/50 shadow-blue-500/25' : ''}
                            group-hover:bg-white/90
                        `}>
                            <div className={`absolute inset-0 bg-gradient-to-r ${plan.borderGradient} rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}></div>

                            <div className="text-center mb-8">
                                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${plan.gradient} rounded-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    {React.cloneElement(plan.icon, { className: "w-8 h-8 text-white" })}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.label}</h3>
                                <p className="text-gray-500 text-sm">{plan.subtitle}</p>
                            </div>

                            <div className="text-center mb-8">
                                <div className="flex items-baseline justify-center gap-2">
                                    <span className={`text-5xl font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                                        ${plan.price}
                                    </span>
                                    <span className="text-gray-500">{plan.period}</span>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                {plan.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-3 group/item hover:bg-gray-50 rounded-lg p-2 transition-colors duration-200">
                                        <div className={`flex-shrink-0 w-6 h-6 bg-gradient-to-r ${plan.gradient} rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-200`}>
                                            <Check className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="text-gray-700 text-right flex-1">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => handlePlanClick(plan.id)}
                                className={`
                                    w-full py-4 px-6 bg-gradient-to-r ${plan.gradient} text-white font-semibold rounded-2xl
                                    shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300
                                    hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-500/30
                                    relative overflow-hidden group/btn
                                `}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {selectedPlanId === plan.id && <CheckCircle2 className="w-5 h-5 text-white" />} 
                                    {selectedPlanId === plan.id ? 'الباقة المختارة' : 'اشترك الآن'}
                                </span>
                                <div className="absolute inset-0 bg-white/20 transform translate-x-full group-hover/btn:-translate-x-full transition-transform duration-500"></div>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showConfirm && (
                <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-white border border-blue-200 shadow-xl rounded-xl p-6 z-50 w-[90%] max-w-md text-center space-y-4">
                    <p className="text-gray-800 text-lg font-medium">هل تريد تغيير باقتك الحالية إلى <span className="text-blue-600 font-bold">{plans.find(p => p.id === pendingSelection)?.label}</span>؟</p>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={confirmChange}
                            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                        >
                            نعم، غير الباقة
                        </button>
                        <button
                            onClick={() => setShowConfirm(false)}
                            className="px-6 py-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition"
                        >
                            إلغاء
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
