/**
 * Created by Administrator on 2017/11/2.
 */
$(function(){
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005,
    indicators:false
  });
 var id = tools.getParam("productId");

  $.ajax({
    type:"get",
    url:"/product/queryProductDetail",
    data:{id:id},
    success:function(data){
      console.log(data);
      var arr = data.size.split("-");
      var sizeArr = [];
      console.log(arr);
      for(var i = +arr[0];i <= +arr[1];i++){
           sizeArr.push(i);
      }
      data.size = sizeArr;
      console.log(data);
      $(".mui-scroll").html(template("tpl",data));
      mui('.mui-slider').slider({
        interval:5000
      });
      mui(".mui-numbox").numbox();
    }
  })
});