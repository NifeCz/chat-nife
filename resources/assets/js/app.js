require('./bootstrap');

window.Vue = require('vue');
var Vue = require('vue');


//chat scroll fix
Vue.use(require('vue-chat-scroll'));

//notification added by toaster
import Toaster from 'v-toaster'
import 'v-toaster/dist/v-toaster.css'
Vue.use(Toaster, {timeout: 5000})


Vue.component('example-component', require('./components/ExampleComponent.vue'));
Vue.component('message', require('./components/message.vue'));

const app = new Vue({
    el: '#app',
    data: {
        message: '',
        chat: {
            message: [],
            user: [],
            color: [],
            time: []
        },
        typing: '',
        numberOfUsers: ''
    },

    watch: {

      message(){
          Echo.private('chat')
              .whisper('typing', {
                  name: this.message
              });
      }

    },

    methods: {

        send() {
            if (this.message.length != 0) {
                this.chat.message.push(this.message);;
                this.chat.user.push('you');
                this.chat.color.push('success');
                this.chat.time.push(this.getTime());
                axios.post('/send', {
                    message: this.message,
                    chat:this.chat
                })

                    .then(response => {
                        console.log(response);
                        this.message = '';
                    })

                    .catch(function (error) {
                        console.log(error);

                    })
            }

        },

        getTime() {

            let time = new Date();
            return time.getHours()+':'+time.getMinutes();

        },


    },



    mounted(){

        Echo.private('chat')
            .listen('ChatEvent', (e) => {
                this.chat.message.push(e.message);
                this.chat.user.push(e.user);
                this.chat.color.push('warning');
                this.chat.time.push(this.getTime());


            })

            .listenForWhisper('typing', (e) => {
                if(e.name != ''){
                    this.typing = 'typing...'
                } else{
                    this.typing = ''
                }
            });

        Echo.join(`chat`)
            .here((users) => {
                this.numberOfUsers = users.length;
            })
            .joining((user) => {
                this.numberOfUsers += 1;
                this.$toaster.success(user.name +'is joined the chat room')
            })
            .leaving((user) => {
                this.numberOfUsers -= 1;
                this.$toaster.warning(user.name +'left the chat room')
            });

    },



});
