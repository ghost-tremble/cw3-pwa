<template>
   <div  class="lessonPage">
        <div class="search-container">
            <input type="search" placeholder="Type to Search Lessons" v-model="searchText" />
        </div>
        <!-- Sort Tags -->
        <div class="sort-section">
        
            <div class="sort-type">
                <div>
                    <input type="radio" name="sort" value="subject" id="option1" v-model="sortType" /> <label
                        for="option1">Subject</label>
                </div>
                <div>
                    <input type="radio" name="sort" value="location" id="option2" v-model="sortType" /> <label
                        for="option2">Location</label>
                </div>
                <div>
                    <input type="radio" name="sort" value="price" id="option3" v-model="sortType" /> <label
                        for="option3">Price</label>
                </div>
                <div>
                    <input type="radio" name="sort" value="spaces" id="option4" v-model="sortType" /> <label
                        for="option4">Spaces</label>
                </div>
        
        
        
            </div>
            <div class="sort-mode">
                <div>
                    <input type="radio" name="mode" value="descending" id="descending" v-model="mode" /> <label
                        for="descending">Descending</label>
                </div>
                <div>
                    <input type="radio" name="mode" value="ascending" id="ascending" v-model="mode" /> <label
                        for="ascending">Ascending</label>
                </div>
        
            </div>
        
        
        
        </div>
        
        <!-- Lessons section -->
        <div class="lesson-container">
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
                <div class="card-button"><button v-bind:disabled="lesson.spaces < 1" v-on:click="addToCart(lesson)">Add to
                        cart</button></div>
        
            </div>
        </div>
     </div> 
     
  </template>
  
  <script>
  export default {
    name: 'HelloWorld',
    props :["lessons"],
    methods:{
        // EVEVT Emitter
        RemoveLesson :()=>{
            this.$emit("RemoveLesson");
        }
    }
  }
  </script>
  


  