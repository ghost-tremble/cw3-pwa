<template>
    <div class="container">
      <div   class="shoppingCartPage">
    <div class="cart-container">
      <div class="image-card" v-for="(lesson,key) in cart" :key="key">
                <div class="card-image"> <img :src="server + lesson.image" />
               
                </div>
                <div class="card-text">
        
                    <!-- eslint-disable-next-line vue/no-use-v-if-with-v-for -->
                    <div v-for="(value, key) in lesson" :key="key" v-if="!['_id','image'].includes(key)">
                        <h4 v-if="key ==='price'">{{ key }}: ${{ value }}</h4>
                        <h4 v-else>{{ key }}: {{ value }}</h4>
                    </div>
        
                </div>
                <div class="card-button"><button v-bind:disabled="lesson.spaces < 1" @click="removeFromCart(lesson)">Remove</button></div>
        
            </div>
    </div>
    <div class="checkout-container">
        <section>
            <h1> Checkout</h1>
        </section>
        <form>
            <div>
                <label for="name">Name :</label> <input  id="name" v-model="order.name" type="phone" />
            </div>
            <div>
                <label for="name">Phone:</label> <input v-model="order.phone"  id="name" type="text" />
            </div>
        </form>
       
        <div class="checkout-button"><button v-bind:disabled="isCheckoutDisabled" @click="completeCheckout">
                Checkout Order </button></div>
                <p v-if="isCheckoutDisabled === true" >
                {{ order.errorMessage }}
                </p>
    </div>
    
</div>
    </div>
  </template>
  
  <script>
  import { createNewOrder, updateLessons } from '@/Api/services';
  export default {
    name: 'Checkout-component',
    props: ["cart","server"],
    data() {
        return {
            order: {
      name: "",
      phone: "",
      errorMessage: "sss",
    },
        }
    },
    methods:{
        // EVEVT Emitter
        removeFromCart(lesson){
            this.$emit("remove-item-from-cart",lesson);
        },
        completeCheckout: async function () {
      const order = await createNewOrder(
        {
          name: this.order.name,
          phoneNumber: this.order.phone,
          lessonIds: this.cart,
          spaces:this.cart.reduce((track, currentElement) => {
            return track + currentElement.spaces;
          }, 0)
        }

      )
      if(order){
       alert (`Order with the ID ${order.newOrder.insertedId} was ${order.message}`)
        updateLessons(order.newOrder.insertedId).then((data)=>{
          alert(data.message)
        })
      }
    },

    },

    computed: {
        isCheckoutDisabled: function () {
      let isValidName =
        this.order.name.trim().length > 0 &&
        /^[A-Za-z\s]*$/.test(this.order.name);
      let isVaidNumber =
        this.order.phone.trim().length > 0 && /^[0-9]*$/.test(this.order.phone);

      let isButtonDisabled = !(isVaidNumber && isValidName) ;
      // force set Disabled if cart is empty
      if(this.cart.length === 0) {
        isButtonDisabled = true;
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.order.errorMessage = "cart is empty";
        return isButtonDisabled;
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.order.errorMessage = "please enter a valid name and phone number";
      return isButtonDisabled;
    },
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  
  </style>
  