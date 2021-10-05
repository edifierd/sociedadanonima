<template>
    <div>
        <!-- Menú adicional para agregar mas acciones a la vista -->
        <b-card no-body v-show="!isLoading" class="pt-0 mt-1">
            <b-card-header header-tag="nav">

                <h4>Alta Sociedad Anónima</h4>
                
                <b-nav card-header tabs>
                    <b-nav-item>OPCIONES ADICIONALES</b-nav-item>
                </b-nav>
            </b-card-header>
            <b-card-body class="text-center">
                <!-- <a :href="absoluteUrl('document/generate')" target="_blank" class="btn btn-outline-primary btn-sm">Documento Word - Imprimir</a>
                <a :href="absoluteUrl('document/cloud')" class="btn btn-outline-primary btn-sm">Google Drive</a> -->
            </b-card-body>
        </b-card>



        <!-- Loading con overlay en toda la pagina -->
        <barra-cargando v-bind:isLoading="isLoading"></barra-cargando>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import BarraCargando from '../BarraCargando';

export default {
    components: {
        BarraCargando
    },
    data() {
        return {
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