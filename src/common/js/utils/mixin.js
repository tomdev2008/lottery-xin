export const saveScrollPosition = {
  data(){
    return {
      SCROLLY: 0
    }
  },
  beforeRouteLeave(to, from, next){
    this.SCROLLY = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset
    console.log(this.SCROLLY)
    next()
  },
  beforeRouteEnter(to, from, next){
    next(vm => {
      window.scroll(0, vm.SCROLLY)
    })
  }
}
