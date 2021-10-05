<template>
    <div>
        <!-- Menú adicional para agregar mas acciones a la vista -->
        <!-- <b-card no-body v-show="!isLoading" class="pt-0 mt-1">
            <b-card-header header-tag="nav">

                <h4>Trámites a distancia</h4>
                
                <b-nav card-header tabs>
                    <b-nav-item>OPCIONES ADICIONALES</b-nav-item>
                </b-nav>
            </b-card-header>
            <b-card-body class="text-center">
                 <a :href="absoluteUrl('document/generate')" target="_blank" class="btn btn-outline-primary btn-sm">Documento Word - Imprimir</a>
                <a :href="absoluteUrl('document/cloud')" class="btn btn-outline-primary btn-sm">Google Drive</a> 
            </b-card-body>
        </b-card> -->

        <b-card-group columns class="mt-2">
            <b-card v-for="tramite in tramites" :key="tramite.id" :title="tramite.titulo">
                <b-card-text>{{tramite.descrip}}</b-card-text>
                <template #footer>
                    <b-button :href="tramite.url" variant="primary" :disabled="!tramite.habilitado">Iniciar Trámite</b-button>
                </template>
            </b-card>
        </b-card-group>

        <!-- Loading con overlay en toda la pagina -->
        <barra-cargando v-bind:isLoading="isLoading"></barra-cargando>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import BarraCargando from './BarraCargando';

export default {
    components: {
        BarraCargando
    },
    data() {
        return {
            tramites: [
                {id: 1, titulo: "Solicitud de Alta Sociedad Anónima", descrip: "Permitirá completar todos los datos necesarios para iniciar el trámite de alta de una sociedad anónima", url: "/sociedad/alta", habilitado: true},
                {id: 2, titulo: "Solicitud de informes no judiciales", descrip: "Solicitud de informes no judiciales", url: "#", habilitado: false},
                {id: 3, titulo: "Solicitud de rúbrica de libros", descrip: "Solicitud de rúbrica de libros", url: "#", habilitado: false},
                {id: 4, titulo: "Solicitud de inicio de normalización", descrip: "Solicitud de inicio de normalización", url: "#", habilitado: false},
                {id: 5, titulo: "Solicitud de desarchivo de actuaciones", descrip: "Solicitud de desarchivo de actuaciones", url: "#", habilitado: false},
                {id: 6, titulo: "Solicitud de certificado de vigencia de asociaciones civiles", descrip: "Solicitud de certificado de vigencia de asociaciones civiles", url: "#", habilitado: false},
            ]
        };
    },
    computed: {
        ...mapState({
            isLoading: state => state.loading,
        }),
    },

    mounted() {
        
    },


    watch: {},

    methods: {},

    filters: {},

}
</script>

<style lang="css" scoped>
.breadcrumb {
    background-color: transparent !important;
}
</style>