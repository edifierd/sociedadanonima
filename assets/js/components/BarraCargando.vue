<template>
    <div>
        <loading 
            :active.sync="isLoading" 
            :can-cancel="false" 
            :color="color" 
            :opacity="opacity"
            :height="size"
            :width="size"
            :is-full-page="true">
        </loading>
    </div>
</template>

<script>
// Import Loading component
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
    name: 'loading-component',
    props: ['isLoading'],
    components: {
        Loading
    },
    data() {
        return {
            color: "#17a2b8",
            opacity: 0.7,
            size: 120
        };
    },
}
</script>
