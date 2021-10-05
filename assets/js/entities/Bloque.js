export default class Bloque {

    /**
     * @param {String} c_autor del usuario
     * @param {String} c_bloque del usuario
     * @param {Number} canti_dipu del usuario
     * @param {String} d_autor del usuario
     * @param {String} d_bloque del usuario
     */
    constructor(c_autor, c_bloque, d_autor, d_bloque, canti_dipu) {
        this.c_autor = c_autor
        this.c_bloque = c_bloque
        this.d_autor = d_autor
        this.d_bloque = d_bloque
        this.canti_dipu = canti_dipu
    }

    /**
     * @return {String} retorna el nombre del bloque
     */
     getNombre() {
        return this.d_bloque.trim();
    }

    /**
     * @return {String} retorna el codigo del bloque
     */
     getCodigo() {
        return this.c_bloque.trim();
    }


}
