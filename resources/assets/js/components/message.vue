<template>
    <div>
        <li class="list-group-item" :class="className"><small>{{time}}</small>:<b><slot> </slot></b></li>

        <small class="badge float-right" :class="badgeClass"> {{user}}</small>
    </div>

</template>

<script>
    export default {

        props: [ 'color', 'user', 'time' ],

        computed: {

            className(){
                return 'list-group-item-'+this.color;
            },
            badgeClass(){
                return 'badge-'+this.color;
            }
        },


        name: "message"
    }
</script>

<style scoped>

</style>