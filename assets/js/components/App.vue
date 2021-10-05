<script>
import { mapActions } from 'vuex';
import User from '../entities/User';
import AltaSociedad from './sociedad/Alta';
import Inicio from './Inicio';


export default {
    components: {
        Inicio, AltaSociedad
    },

    props: ['dataAssetsPath', 'dataAppBaseUrl', 'dataWebsocket', 'dataEnv'],

    created() {
        // le saca la ultima "/" a la url
        this.$root.$data.env = this.dataEnv;
        this.$root.$data.websocket = this.dataWebsocket;
        this.$root.$data.assetsPath = this.dataAssetsPath;
        this.$root.$data.appUrl = this.dataAppBaseUrl.slice(0, -1);

        //Actualiza el usuario de la sesion de symfony a vue
        // this.fetchCurrentUser();
        // this.$store.dispatch('vue', {vm: this});
    },

    mounted() {},

    methods: {
        /**
         * Obtiene el usuario actualmente logeado
         */
        async fetchCurrentUser() {
            const response = await axios.get(this.currentUserUrl())
            this.loadUser(response.data)
        },

        /**
         * @param {Object} response
         */
        loadUser(user) {
            this.$root.$data.currentUser = new User(
                user.id,
                user.username,
                user.roles
            );
        },
    },
}
</script>
