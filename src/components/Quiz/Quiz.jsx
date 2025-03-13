import React, { useState } from 'react';
import Pagination from '../main/Pagination.jsx';
import Swal from 'sweetalert2';

const questions = [
    {
        question: 'قاعدة اليد اليمنى لتحديد حركة السلك تُستخدم في ...',
        options: [
            'تحديد اتجاه حركة السلك',
            'تحديد اتجاه التيار المستخدم في السلك',
            'تحديد اتجاه المجال الناتج عن مرور تيار في سلك',
            'لا يوجد إجابة صحيحة'
        ]
    },
    {
        question: 'ما هو العنصر الأساسي في الدائرة الكهربائية؟',
        options: ['المقاومة', 'الملف', 'المكثف', 'المفتاح']
    },
    {
        question: 'أي من التالي يُعد وحدة قياس التيار الكهربائي؟',
        options: ['الأمبير', 'الأوم', 'الفولت', 'الواط']
    }
];

const Quiz = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    const handleNextOrEnd = () => {
        if (currentPage === questions.length) {
            // Show SweetAlert on last question
            Swal.fire({
                icon: 'warning',
                title: 'هل تريد إنهاء الأختبار ؟',
                text: 'سوف يتم حساب النتيجة بناء على الأسئلة التي قمت بإجابتها',
                showCancelButton: true,
                confirmButtonText: 'إنهى الأختبار',
                cancelButtonText: 'إلغاء',
                reverseButtons: true,
                customClass: {
                    confirmButton: 'bg-blue-500 text-white px-6 py-2 rounded-md',
                    cancelButton: 'bg-gray-400 text-white px-6 py-2 rounded-md'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire('تم إنهاء الاختبار!', 'شكراً على مشاركتك.', 'success');
                }
            });
        } else {
            setCurrentPage(currentPage + 1);
            setSelectedOption(null);
        }
    };

    return (
        <div className="max-w-6xl p-4 mx-3 lg:mx-7">
            <div className="bg-gray-100 rounded-xl p-6 shadow-lg">
                {/* Question Title */}
                <div className="flex justify-start items-center gap-4 mb-4">
                    <button className="text-gray-700 text-lg border-3 rounded-lg w-6 h-6 flex items-center justify-center font-bold">
                        ?
                    </button>
                    <h2 className="font-semibold text-lg">
                        {questions[currentPage - 1].question}
                    </h2>
                </div>

                {/* Options */}
                {questions[currentPage - 1].options.map((option, index) => (
                    <label
                        key={index}
                        className={`block p-3 border rounded-md cursor-pointer mb-2 ${
                            selectedOption === option
                                ? 'bg-blue-100 border-blue-500'
                                : 'bg-white border-gray-300 hover:bg-gray-100'
                        }`}
                    >
                        <input
                            type="radio"
                            name="option"
                            value={option}
                            className="hidden"
                            onChange={() => handleOptionChange(option)}
                            checked={selectedOption === option}
                        />
                        {option}
                    </label>
                ))}

                {/* Next or End Button */}
                <button
                    onClick={handleNextOrEnd}
                    className={`w-full py-2 text-white rounded-md mt-4 bg-blue-500 hover:bg-blue-600 cursor-pointer`}
                >
                    {currentPage === questions.length ? 'إنهاء' : 'التالي'}
                </button>
            </div>

            {/* Pagination */}
            <Pagination
                totalQuestions={questions.length}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default Quiz;