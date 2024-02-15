<template>
    <div class="container">
      <div   class="shoppingCartPage">
    <div class="cart-container">
      <div class="image-card" v-for="(lesson,key) in lessons" :key="key">
                <div class="card-image"> <img :src="lesson.image" />
               
                </div>
                <div class="card-text">
        
                    <!-- eslint-disable-next-line vue/no-use-v-if-with-v-for -->
                    <div v-for="(value, key) in lesson" :key="key" v-if="!['id','image'].includes(key)">
                        <h4 v-if="key ==='price'">{{ key }}: ${{ value }}</h4>
                        <h4 v-else>{{ key }}: {{ value }}</h4>
                    </div>
        
                </div>
                <div class="card-button"><button v-bind:disabled="lesson.spaces < 1" v-on:click="addToCart(lesson)">Remove</button></div>
        
            </div>
    </div>
    <div class="checkout-container">
        <section>
            <h1> Checkout</h1>
        </section>
        <form>
            <div>
                <label for="name">Name :</label> <input  id="name" type="phone" />
            </div>
            <div>
                <label for="name">Phone:</label> <input  id="name" type="text" />
            </div>
        </form>
       
        <div class="checkout-button"><button v-bind:disabled="isCheckoutDisabled" >
                Checkout Order </button></div>
                <p v-if="isCheckoutDisabled === true" ></p>
    </div>
    
</div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Checkout-component',
    props: ["lessons"]
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  
  </style>
  