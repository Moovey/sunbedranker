export default function MultiSelectField({
    label,
    options,
    selectedValues,
    onChange,
    onAdd,
    customValue,
    onCustomChange,
    error,
    placeholder = "Other (type custom option and press Enter)..."
}) {
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && customValue.trim()) {
            e.preventDefault();
            if (!selectedValues.includes(customValue.trim())) {
                onChange([...selectedValues, customValue.trim()]);
            }
            onCustomChange('');
        }
    };

    const handleAddClick = () => {
        if (customValue.trim() && !selectedValues.includes(customValue.trim())) {
            onChange([...selectedValues, customValue.trim()]);
            onCustomChange('');
        }
    };

    const handleRemove = (index) => {
        onChange(selectedValues.filter((_, i) => i !== index));
    };

    return (
        <div>
            <label className="block text-sm font-light text-neutral-700 mb-3 tracking-wide">
                {label}
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                {options.map(option => (
                    <label key={option} className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={selectedValues.includes(option)}
                            onChange={e => {
                                if (e.target.checked) {
                                    onChange([...selectedValues, option]);
                                } else {
                                    onChange(selectedValues.filter(item => item !== option));
                                }
                            }}
                            className="w-4 h-4 rounded border-neutral-300 text-neutral-900 focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-sm font-light text-neutral-700">{option}</span>
                    </label>
                ))}
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={customValue}
                    onChange={e => onCustomChange(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={placeholder}
                    className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light"
                />
                <button
                    type="button"
                    onClick={handleAddClick}
                    className="px-4 py-2 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 font-light transition-all duration-300 whitespace-nowrap"
                >
                    Add
                </button>
            </div>
            {selectedValues.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {selectedValues.map((item, index) => (
                        <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-light">
                            {item}
                            <button
                                type="button"
                                onClick={() => handleRemove(index)}
                                className="text-blue-600 hover:text-blue-900"
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
            )}
            {error && <p className="mt-1 text-sm text-red-600 font-light">{error}</p>}
        </div>
    );
}
