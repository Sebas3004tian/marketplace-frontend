import { useState } from 'react';

interface FilterMenuProps {
    onFilter: (category: string) => void;
}

export default function FilterMenu({ onFilter }: FilterMenuProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        onFilter(category);
    };

    return (
        <div className="mb-4">
            <button onClick={() => handleCategoryChange('hombre')} className="mr-4">Hombre</button>
            <button onClick={() => handleCategoryChange('mujer')} className="mr-4">Mujer</button>
            <button onClick={() => handleCategoryChange('niños')}>Niños</button>

            {selectedCategory && (
                <p className="mt-4">Categoría seleccionada: {selectedCategory}</p>
            )}
        </div>
    );
}
