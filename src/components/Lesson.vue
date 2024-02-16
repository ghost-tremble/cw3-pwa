<template>
   <div  class="lessonPage">
       
        <!-- Sort Tags -->
        <div class="sort-section">
        
            <div class="sort-type">
                <div>
                    <input type="radio" name="sort" value="topic" id="option1" v-model="sortType" /> <label
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
        <div>
            <div v-if="searchText.length  > 0" class="lesson-container">
                <div class="image-card" v-for="(lesson,key) in searchResults" :key="key">
                    <div class="card-image"> <img :src="server +lesson.image" /></div>
                    <div class="card-text">
            <!-- eslint-disable-next-line vue/no-use-v-if-with-v-for -->
                        <div v-for="(value, key) in lesson" :key="key" v-if="!['_id','image'].includes(key)">
                            <h4 v-if="key ==='price'">{{ key }}: ${{ value }}</h4>
                            <h4 v-else>{{ key }}: {{ value }}</h4>
                        </div>
            
                    </div>
                    <div class="card-button"><button v-bind:disabled="lesson.spaces < 1" v-on:click="addToCart(lesson)">Add to
                            cart</button></div>
            
                </div>

            </div>

            <div v-else class="lesson-container">
            <div class="image-card" v-for="(lesson,key) in sortedLessons" :key="key">
                <div class="card-image">  <img :src="server +lesson.image" />
               
                </div>
                <div class="card-text">
                    <!-- eslint-disable-next-line vue/no-use-v-if-with-v-for -->
                    <div v-for="(value, key) in lesson" :key="key" v-if="!['_id','image'].includes(key)">
                        <h4 v-if="key ==='price'">{{ key }}: ${{ value }}</h4>
                        <h4 v-else>{{ key }}: {{ value }}</h4>
                    </div>
        
                </div>
                <div class="card-button"><button v-bind:disabled="lesson.spaces < 1" v-on:click="addToCart(lesson)">Add to
                        cart</button></div>
        
            </div>
        </div>
        </div>
      
     </div> 
     
  </template>
  
  <script>
  export default {
    name: 'HelloWorld',
    props :["lessons","server","searchText","searchResults"],
    data() {
        return{

            sortType: "topic",
    mode: "ascending",
        }
    },
    methods:{
        // EVEVT Emitter
        RemoveLesson :()=>{
            this.$emit("RemoveLesson");
        }
    },

    computed: {
    sortedLessons:  function () {
      let order = this.mode === "ascending" ? 1 : -1;
      return this.lessons?.slice()
        .sort((a, b) => {
          if (
            typeof a[this.sortType] === "string" &&
            typeof b[this.sortType] === "string"
          ) {
            return order * a[this.sortType].localeCompare(b[this.sortType]);
          } else {
            return order * (a[this.sortType] - b[this.sortType]);
          }
        });
    },
}
    
  }
  </script>
  


  