<template>
    <div v-show="mensajes.length > 0">
        <b-alert v-for="(msg,index) in mensajes" :key="msg.text+index"
            class="mt-2 mb-2"
            :show="dismissCountDown(msg)"
            :dismissible="(msg.dismissCountDown == null)? false : true "
            :variant="msg.variant"
            @dismissed="close(index)"
        >
            {{msg.text}}
        </b-alert>
    </div>
</template>

<script>

export default {
    components: {},
    data() {
        return {
            // VARIANT: primary, secondary, info, success, warning, danger, light, dark. The default is info.
            mensajes: [],
        };
    },

    methods: {
        show(variant, text, dismissCountDown = 4){
            var length = this.mensajes.push({
                variant: variant,
                dismissCountDown: dismissCountDown,
                text: text
            });
            return length - 1; // Retorna el index del elemento
        },
        close(index){
            this.mensajes.splice(index, 1);
        },
        //METODOS AUXILIARES
        dismissCountDown(msg){
            if(msg.dismissCountDown == null){
                return true;
            } else {
                return msg.dismissCountDown;
            } 
        }
    }
}
</script>
