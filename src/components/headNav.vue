<template>
  <header>
    <div class="title">
      <div class="title-item" :class="{'active-item': currentItem === 1}" @click="toggleItem(1)">COMMERCIAL CUSTOMER</div>
      <div class="title-item" :class="{'active-item': currentItem === 2}" @click="toggleItem(2)">CHANNEL PARTNER</div>
    </div>
  </header>
</template>

<script>
  export default {
    name: "head-nav",
    data() {
      return {
        currentItem: 1,
      }
    },
    methods: {
      toggleItem(value) {
        if (value === this.currentItem) {
          return
        } else {
          this.currentItem = value
          if (this.currentItem === 1) {
            this.$router.push('commercialCustomer')
          }else {
            this.$router.push('channelPartner')
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.title {
  width: 375px;
  /*width: 750px;*/ // 根据设计图来设置，750的话把config里的换算基数rootValue设置成32即可
  height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  font-size: 12px;
  font-weight: bold;
  color: #7C8694;
  .title-item {
    display: flex;
    flex: 1;
    justify-content: center;
  }
  .active-item {
    color: #FF5B00;
  }
}
</style>
