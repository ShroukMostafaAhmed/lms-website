const Table = ({headers, rows}) => {
    return (
        <div className="overflow-x-auto">
            <table
                className="w-full border-collapse border border-gray-200 rounded-lg overflow-hidden"
                style={{
                    borderBottom: '1px solid #1E78EB66', // Custom border color with transparency
                }}
            >
                <thead>
                <tr className="bg-blue-500 text-white">
                    {headers.map((header, index) => (
                        <th
                            key={index}
                            className={`py-6 px-4 border border-gray-300 text-center
                  ${index === 0 ? 'rounded-tr-lg' : ''}
                  ${index === headers.length - 1 ? 'rounded-tl-lg' : ''}`}
                        >
                            {header}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                <tr>
                    {rows.map((row, index) => (
                        <td
                            key={index}
                            className={`py-6 px-4 border border-gray-300 text-center text-blue-500
                          ${index === 0 ? 'rounded-bl-lg' : ''}
                          ${index === rows.length - 1 ? 'rounded-br-lg' : ''}`}
                        >
                            {row}
                        </td>
                    ))}
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Table;