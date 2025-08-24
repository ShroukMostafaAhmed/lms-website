import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const BarCharts = ({ data = [] }) => {
  if (!data || data.length === 0)
    return <p className="text-center text-gray-500 mt-6">لا توجد بيانات لعرضها</p>;

  return (
    <div className="w-full max-w-6xl mt-10 p-6 rounded-xl">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          barGap={6}
          margin={{ top: 10, right: 30, left: 30, bottom: 10 }}
        >
          {/* X Axis */}
          <XAxis
            dataKey="day"
            tick={{ fill: '#94A3B8', fontSize: 16, fontWeight: '600' }}
            axisLine={false}
            tickLine={false}
          />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              border: '1px solid #E5E7EB',
              color: '#1E293B',
              fontSize: '16px',
            }}
            wrapperStyle={{ outline: 'none' }}
            cursor={{ fill: 'transparent' }}
            labelFormatter={(label) => `اليوم: ${label}`}
            formatter={(value) => [`${value} دقيقة`, 'الزمن']}
          />

          {/* Bars */}
          <Bar
            dataKey="value"
            radius={[10, 10, 0, 0]}
            barSize={50}
            label={{ position: 'top', fill: '#1D4ED8', fontSize: 14 }}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.day === 'الأربعاء' ? '#FF6B6B' : '#1E78EB'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* القيم تحت الأعمدة */}
      <div className="flex justify-around mt-3 px-1">
        {data.map((entry) => (
          <div key={entry.day} className="flex flex-col items-center flex-1 text-center">
            <span
              className={`font-semibold text-xl ${
                entry.day === 'الأربعاء' ? 'text-[#FF6B6B]' : 'text-[#1D4ED8]'
              }`}
            >
              {entry.value} د
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarCharts;
