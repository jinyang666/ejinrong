<template>
  <div id="app">
    <transition name="slide-fade">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
    </transition>
    <transition name="slide-fade">
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  components:{
      
  }
}
</script>

<style>
.slide-fade-enter-active {
   transition: all .3s ease;
}
.slide-fade-leave-active {
   display: none;
   transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(100%);
    opacity: 0;
}
</style>