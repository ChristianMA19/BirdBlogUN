import birds from './suggestions.model.js';

export async function scientificname(req, res) {
  const input = req.params.input;
    try {
        // Buscar en la base de datos nombres científicos que comiencen con el valor ingresado
        const suggestions = await birds.find({ Scientific: { $regex: `^${input}`, $options: 'i' } }).limit(10);
        res.json(suggestions.map(suggestion => suggestion.Scientific));
    } catch (error) {
        console.error('Error al buscar sugerencias:', error);
        res.status(500).send('Error al buscar sugerencias');
    }
}