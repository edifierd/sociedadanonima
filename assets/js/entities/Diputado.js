export default class Diputado {

    /**
     * @param {String} ape_autor del usuario
     * @param {String} c_autor del usuario
     * @param {String} c_bloque del usuario
     * @param {String} d_autor del usuario
     * @param {String} d_bloque del usuario
     * @param {String} nom_autor del usuario
     * @param {String} sexo del usuario
     */
    constructor(ape_autor, c_autor, c_bloque, d_autor, d_bloque, nom_autor, sexo) {
        this.ape_autor = ape_autor
        this.c_autor = c_autor
        this.c_bloque = c_bloque
        this.d_autor = d_autor
        this.d_bloque = d_bloque
        this.nom_autor = nom_autor
        this.sexo = sexo
    }

    /**
     * @return {String} retorna el nombre y el apellido
     */
    getNombreYApellido() {
        return this.nom_autor.trim()+" "+this.ape_autor.trim();
    }

    /**
     * @return {String} retorna el nombre 
     */
    getNombre() {
        return this.nom_autor.trim();
    }

    /**
     * @return {String} retorna el apellido
     */
    getApellido() {
        return this.ape_autor.trim();
    }

    /**
     * @return {String}
     */
    getCodigo() {
        return this.c_autor;
    }

    /**
     * @return {String}
     */
    getSexo() {
        return this.sexo;
    }


}
