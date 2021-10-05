import Bloque from '../../entities/Bloque';

const bloquesService = {
    namespaced: true,
    state: {
        esElPrimero: true, // Funciona como barrera ante multiples solicitudes
        list: [],
    },
    mutations: {
        SET_BLOQUES: (state, data) => {
            state.list = data;
        },
        SET_FIRST: (state, data) => {
            state.esElPrimero = data;
        },
    },
    actions: {
        async obtenerBloques({ rootGetters, commit, state}) {
            if (state.esElPrimero && state.list.length == 0) {
                commit('SET_FIRST', false);
                var response = await axios.get(rootGetters.absoluteUrlApi("/bloques"));
                if(response.status == 200){
                    var bloquesAux = []
                    response.data.forEach(element => {
                        var bloque = new Bloque(element.c_autor, element.c_bloque, element.d_autor, element.d_bloque, element.canti_dipu)
                        bloquesAux.push(bloque);
                    });
                    commit('SET_BLOQUES', bloquesAux);
                }
            }
        },
    },
    getters: {
        // buscarDiputado: (state) => (input) => {
        //     var rta = null;
        //     if (typeof input === 'string' && input.length > 0) { 
        //         var diputado = state.list.find(autor => {
        //             return (autor.nom_autor.trim()+" "+autor.ape_autor.trim()).toLowerCase().trim().includes(input.trim().toLowerCase());
        //         });
        //         if(typeof diputado !== 'undefined'){
        //             rta = new Diputado(diputado.ape_autor, diputado.c_autor, diputado.c_bloque, diputado.d_autor, diputado.d_bloque, diputado.nom_autor, diputado.sexo);
        //         }
        //     }
        //     return rta;
        // },
        buscarBloqueByCodigo: (state) => (codigo) => {
            var rta = null;
            if (typeof codigo === 'string' && codigo.length == 8) { 
                var bloque = state.list.find(blo => {
                    return blo.c_bloque == codigo;
                });
                if(typeof bloque !== 'undefined'){
                    rta = new Bloque(bloque.c_autor, bloque.c_bloque, bloque.d_autor, bloque.d_bloque, bloque.canti_dipu);
                }
            }
            return rta;
        },
    }
};

export default bloquesService;