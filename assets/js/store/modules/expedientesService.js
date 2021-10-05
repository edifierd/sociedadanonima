const expedientesService = {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
        async obtenerExpediente({ rootGetters, commit, state},{origen_exp,numero_exp,anios_exp,alcance}) {
            if(!validData(origen_exp,numero_exp,anios_exp,alcance)){
                return null;
            }
            let form_data = new FormData();
            form_data.append("origen", origen_exp);
            form_data.append("numero_exp", numero_exp);
            form_data.append("anios_exp", anios_exp);
            form_data.append("alcance", alcance);
            var response = await axios.post(rootGetters.absoluteUrlApi("/expediente"),form_data);
            if(response.status == 200){
                var exp = response.data[0];
                if(esExpedienteValido(exp)){
                    return exp;
                }
            }
            return null;
        },
    },
    getters: {}
};
export default expedientesService;

function esExpedienteValido(expediente){
    var valid = (expediente.d_autor != ""); // Se Evalua siempre para saber si existe el expediente
    // if(this.isProductionEnv()){ // En Produccion tiene que cumplir estas condiciones
    //     valid = ( 
    //         valid && 
    //         this.tiposProyecto.includes(expediente.tipo_pro) && // El tipo de proyecto debe estar incluido en el listado recibido por Prop
    //         expediente.estado != "L" // El proyecto no debe haber sido sancionado LEY
    //     );
    // }
    return valid;
}

function validData(origen,numero_exp,anios_exp,alcance) {
    var tiposOrigen = ["D","A","PE","RO","E"];

    if(!tiposOrigen.includes(origen.trim().toUpperCase())){ // El origen debe ser: D, A, E, PE o RO
        return false;
    }
    else if(numero_exp == null || numero_exp.toString().length > 6 || !isNumeric(numero_exp)){ // No es númerico
        return false;
    }
    else if(alcance.toString() == "" || alcance.toString().length > 2 || !isNumeric(alcance)){ // No es númerico
        return false;
    } 
    return true;
}

function isNumeric(value){
    return (!isNaN(parseFloat(value)) && isFinite(value));
}

