export default class User {

    /**
     * @param {Int} id del usuario
     * @param {String} username del usuario
     * @param {Array} roles del usuario
     */
    constructor(id, username, roles) {
        this.id = id
        this.username = username
        this.roles = roles
    }

    /**
     * @return {Boolean} concede acceso por rol
     */
    has_role(rol) {
        return this.roles.includes(rol);
    }
}
