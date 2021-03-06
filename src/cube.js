export default {
  data : {
    loading: true,
    carouselList: [],
    textList: []
  },
  onLoad(){
    /*cube 被加载之后 */
  },
  onReady(){
    /*cube 被添加到页面之后 */
    this.request({
      api:'list',
      complete: (offlineData, res) => {
        this.setData({
          loading: false
        })

        if (res && res.errno === 0) {
          const data = res.data.img_list ? res.data : offlineData
          this.handleData(data)
          this.setStorage({
            key: 'data',
            data: data
          })
        } else {
          this.getStorage({
            key: 'data',
            success: res => {
              const data = res || offlineData
              this.handleData(data)
            }
          })
        }
      }
    })
  },
  handleData (data) {
    const carouselList = data.img_list
    const textList = data.text_list
    this.setData({
      carouselList,
      textList
    })
  }
}