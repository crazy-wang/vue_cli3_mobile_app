<template>
  <div class="home">
    <head-nav></head-nav>
    <!--<keep-alive>-->
      <router-view></router-view>
    <!--</keep-alive>-->

  </div>
</template>

<script>
// @ is an alias to /src
import headNav from '@/components/headNav'

export default {
  name: 'home',
  components: {
    headNav
  }
}
</script>
