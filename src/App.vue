<template>
  <div id="app">  
    <h1>After School Activities</h1>
    <!-- Disabling the cart only on the lesson Page -->
    <button class="cart" v-bind:disabled ="cart.length < 1 && rendered !== 'CheckoutComponent'" @click="switchPage()">   
            <h3>Cart</h3>
           
            <svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path
                    d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
            </svg>
    <p>{{cart.length}} </p>
       </button>

       <div v-if="rendered==='LessonComponent'" class="search-container">
            <input type="search" placeholder="Type to Search Lessons" v-model="searchText" />
        </div>

<!-- // listen for event here 
// event emitters -->
<!-- emits add to cart custom event -->



<!-- Dynamic component Rendering -->
<component :is="rendered" :lessons="lessons" :server="apiServer" :searchResults="searchResults" :searchText="searchText"  @add-item-to-cart = "addToCart"  :cart="cart" @remove-item-from-cart="removeFromCart"/>

      
   <!-- <CheckoutComponent :lessons="lessons"/> -->
  </div>
</template>

<script>
import Lesson from './components/Lesson.vue';

import {getLessons, localServer,searchLessons} from "./Api/services"
import Checkout from './components/Checkout.vue';
export default {
  name: 'App',
  data() {
    return {
      cart: [],
      lessons:[],
      apiServer:localServer,
    
    query: "",
    searchText: "",
    searchResults:[],
    rendered:"LessonComponent"
      
    }
  },
  watch: {
    searchText: function (newSearchText) {
      if (newSearchText.length > 0) {
        this.searchLessons();
      } else {
        this.searchResults = [];
      }
    },
  },
  methods:{

    switchPage(){
   if (this.rendered === "LessonComponent"){
     this.rendered = "CheckoutComponent";
   }
   else {
    this.rendered = "LessonComponent"
   }
    },
    async searchLessons() {
      if (this.searchText.length > 0) {
        try {
          // Use await to wait for the searchLessons promise to resolve
          const data = await searchLessons(this.searchText);
          this.searchResults = data;
        } catch (error) {
          console.error('Error fetching data:', error);
          this.searchResults = []; // Handle errors as needed
        }
      } else {
        // If search text is empty, reset the searchResults
        this.searchResults = [];
      }
    },

    addToCart: function (lesson) {
      let lessonInCart = this.cart.find((item) => item._id === lesson._id);
      // check if lesson is already in cart
      if (lessonInCart) {
        lessonInCart.spaces += 1;
      } else {
        this.cart = [...this.cart, { ...lesson, spaces: 1 }];
      }
      lesson.spaces--;
    },
    removeFromCart: function (lesson) {
      let lessonInLessons = this.lessons.find((item) => item._id === lesson._id);
      // remove the item if spaces less than zero
      if (lesson.spaces <= 1) {
        this.cart = this.cart.filter((item) => item._id !== lesson._id);
      } else {
        lesson.spaces -= 1;
      }
      lessonInLessons.spaces += 1;
    },
  },


  mounted() {
    getLessons().then((data)=>{
this.lessons = data
    })
  },

  // Register Components Here 
  components: {  
    "LessonComponent" :Lesson,
   "CheckoutComponent" :Checkout
  },
 
}
</script>

<style src="./assets/global.css">

</style>
