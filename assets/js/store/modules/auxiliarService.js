/*
    ESTE SERVICIO MODELADO EN VUEX PERMITE ACCEDER A LA TABLA carpeta_auxiliar DONDE SE GUARDAN DATOS SENCILLOS
    QUE PUEDAN LLEGAR A SER USADOS EN MAS DE UNA CARPETA. 
*/
const auxiliarService = {
    namespaced: true,
    state: {
        allData: {}
    },
    mutations: {
        SET_ALL_DATA: (state, data) => {
            state.allData = data;
        },
    },
    actions: {
        async obtenerDatosAuxiliares({ rootGetters, state, commit, dispatch }, {id_sesion}) {
            try {
                var response = await axios.get(rootGetters.absoluteUrlApi("/infoauxiliar/"+id_sesion))
                if(response.status == 200 ){
                    commit('SET_ALL_DATA', response.data);
                    if(Object.keys(state.allData).length == 0){
                        response = await  dispatch('guardarDatosAuxiliares', {id_sesion: id_sesion});
                    }
                }
                return response;
            } catch (error) {
                throw 'No se pudo acceder a los datos auxiliares. '+ error.message;
            }
        },
        async guardarDatosAuxiliares({ rootGetters, commit }, {accion, id_sesion, ordenable_st, nro_resolucion, nro_periodo, reunion, sesion_ordinaria}) {
            try {
                let form_data = new FormData();
                if(accion != null){ form_data.append("accion", accion); } 
                if(id_sesion != null){ form_data.append("id_sesion", id_sesion); } 
                if(ordenable_st != null){ form_data.append("ordenable_st", ordenable_st); } 
                if(nro_resolucion != null){ form_data.append("nro_resolucion", nro_resolucion); } 
                if(nro_periodo != null){ form_data.append("nro_periodo", nro_periodo); } 
                if(reunion != null){ form_data.append("reunion", reunion); } 
                if(sesion_ordinaria != null){ form_data.append("sesion_ordinaria", sesion_ordinaria); } 
                const response = await axios.post(rootGetters.absoluteUrlApi("/infoauxiliar/grabar"),form_data);
                if(response.status == 200){
                    commit('SET_ALL_DATA', response.data);
                }
                return response;
            } catch (error) {
                throw 'No se pudo guardar los datos auxiliares. '+ error.message;
            }
        }
    },
    getters: {
        isOrdenable: state => {
            return (state.allData != null)? Boolean(state.allData.ordenable_st) : true;
        },
        nroResolucion: state => {
            return (state.allData != null)? state.allData.nro_resolucion : null;
        },
        nroPeriodo: state => {
            return (state.allData != null)? state.allData.nro_periodo : null;
        },
        reunion: state => {
            return (state.allData != null)? state.allData.reunion : null;
        },
        sesionOrdinaria: state => {
            return (state.allData != null)? state.allData.sesion_ordinaria : null;
        }
    }
};

export default auxiliarService;
