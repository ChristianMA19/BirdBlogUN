import birds from './suggestions.model.js';

export async function scientificname(req, res) {
    const input = req.params.input;
    try {
        // Utiliza la agregación de MongoDB para agrupar por Scientific y obtener sugerencias únicas
        const suggestions = await birds.aggregate([
            { $match: { Scientific: { $regex: `^${input}`, $options: 'i' } } },
            { $group: { _id: '$Scientific' } },
            { $limit: 10 }
        ]);

        // Convierte el resultado de la agregación en un array de sugerencias
        const uniqueSuggestions = suggestions.map(suggestion => suggestion._id);

        res.json(uniqueSuggestions);
    } catch (error) {
        console.error('Error al buscar sugerencias:', error);
        res.status(500).send('Error al buscar sugerencias');
    }
}

export async function commonname(req, res) {
    const input = req.params.input;
    try {
        // Utiliza la agregación de MongoDB para agrupar por English y obtener sugerencias únicas
        const suggestions = await birds.aggregate([
            { $match: { English: { $regex: `^${input}`, $options: 'i' } } },
            { $group: { _id: '$English' } },
            { $limit: 10 }
        ]);

        // Convierte el resultado de la agregación en un array de sugerencias
        const uniqueSuggestions = suggestions.map(suggestion => suggestion._id);

        res.json(uniqueSuggestions);
    } catch (error) {
        console.error('Error al buscar sugerencias:', error);
        res.status(500).send('Error al buscar sugerencias');
    }
}

export async function family(req, res) {
    const input = req.params.input;
    try {
        // Utiliza la agregación de MongoDB para agrupar por BLFamilyEnglish y obtener sugerencias únicas
        const suggestions = await birds.aggregate([
            { $match: { BLFamilyEnglish: { $regex: `^${input}`, $options: 'i' } } },
            { $group: { _id: '$BLFamilyEnglish' } },
            { $limit: 5 }
        ]);

        // Convierte el resultado de la agregación en un array de sugerencias
        const uniqueSuggestions = suggestions.map(suggestion => suggestion._id);

        res.json(uniqueSuggestions);
    } catch (error) {
        console.error('Error al buscar sugerencias:', error);
        res.status(500).send('Error al buscar sugerencias');
    }
}


export async function order(req, res) {
    const input = req.params.input;
    try {
        // Utiliza la agregación de MongoDB para agrupar por IOCOrder y obtener sugerencias únicas
        const suggestions = await birds.aggregate([
            { $match: { IOCOrder: { $regex: `^${input}`, $options: 'i' } } },
            { $group: { _id: '$IOCOrder' } },
            { $limit: 5 }
        ]);

        // Convierte el resultado de la agregación en un array de sugerencias
        const uniqueSuggestions = suggestions.map(suggestion => suggestion._id);

        res.json(uniqueSuggestions);
    } catch (error) {
        console.error('Error al buscar sugerencias:', error);
        res.status(500).send('Error al buscar sugerencias');
    }
}
