import Diputado from '../../entities/Diputado';

const autoresService = {
    namespaced: true,
    state: {
        esElPrimero: true, // Funciona como barrera ante multiples solicitudes
        listDiputados: [],
        listSenadores: [],
    },
    mutations: {
        SET_DIPUTADOS: (state, data) => {
            state.listDiputados = data;
        },
        SET_SENADORES: (state, data) => {
            state.listSenadores = data;
        },
        SET_FIRST: (state, data) => {
            state.esElPrimero = data;
        },
    },
    actions: {
        async obtenerAutores({ rootGetters, commit, state}, {nro_periodo}) {
            if (state.esElPrimero && state.listDiputados.length == 0 && state.listSenadores.length == 0) {
                commit('SET_FIRST', false);
                var params = { origen: 'D' };  //Siempre busco un diputado 'D'
                if(typeof nro_periodo != 'undefined'){
                    params.pl = nro_periodo;
                }
                var response = await axios.get(rootGetters.absoluteUrlApi("/autores"), {params});
                if(response.status == 200){
                    commit('SET_DIPUTADOS', response.data);
                }
                params.origen = 'S';
                var response = await axios.get(rootGetters.absoluteUrlApi("/autores"), {params});
                if(response.status == 200){
                    commit('SET_SENADORES', response.data);
                }
            }
        },
    },
    getters: {
        buscarDiputado: (state) => (input) => {
            var rta = null;
            if (typeof input === 'string' && input.length > 0) { 
                var diputado = state.listDiputados.find(autor => {
                    return (autor.nom_autor.trim()+" "+autor.ape_autor.trim()).toLowerCase().trim().includes(input.trim().toLowerCase());
                });
                if(typeof diputado !== 'undefined'){
                    rta = new Diputado(diputado.ape_autor, diputado.c_autor, diputado.c_bloque, diputado.d_autor, diputado.d_bloque, diputado.nom_autor, diputado.sexo);
                }
            }
            return rta;
        },
        buscarDiputadoByCodigo: (state) => (codigo) => {
            var rta = null;
            if (typeof codigo === 'string' && codigo.length == 8) { 
                var diputado = state.listDiputados.find(autor => {
                    return autor.c_autor == codigo;
                });
                if(typeof diputado !== 'undefined'){
                    rta = new Diputado(diputado.ape_autor, diputado.c_autor, diputado.c_bloque, diputado.d_autor, diputado.d_bloque, diputado.nom_autor, diputado.sexo);
                }
            }
            return rta;
        },
        buscarSenador: (state) => (input) => {
            var rta = null;
            if (typeof input === 'string' && input.length > 0) { 
                var diputado = state.listSenadores.find(autor => {
                    return (autor.nom_autor.trim()+" "+autor.ape_autor.trim()).toLowerCase().trim().includes(input.trim().toLowerCase());
                });
                if(typeof diputado !== 'undefined'){
                    rta = new Diputado(diputado.ape_autor, diputado.c_autor, diputado.c_bloque, diputado.d_autor, diputado.d_bloque, diputado.nom_autor, diputado.sexo);
                }
            }
            return rta;
        },
    }
};

export default autoresService;