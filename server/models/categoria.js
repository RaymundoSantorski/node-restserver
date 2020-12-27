const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    descripcion: {
        type: String,
        unique: true,
        required: [true, 'Es necesario el nombre de la categoria']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});

module.exports = mongoose.model('Categoria', categoriaSchema);