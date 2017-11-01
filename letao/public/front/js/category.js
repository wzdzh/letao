/**
 * Created by Administrator on 2017/11/1.
 */
$(function(){
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005,
    indicators:false
  });

  $.ajax({
    type:"get",
    url:"/category/queryTopCategory",
    success:function(data){
      console.log(data);
      $(".cate_left ul").html(template("first",data));
      renderSecond(data.rows[0].id);
    }
  });
     function renderSecond(id){
       $.ajax({
         type:"get",
         url:"/category/querySecondCategory",
         data:{
           id:id
         },
         success:function(data){
            $(".cate_right ul").html(template("second",data));
         }
       })
     };
  $(".cate_left").on("click",'a',function(){
    console.log(111);
       var id = $(this).data("id");
       $(this).addClass("now").parent().siblings().find("a").removeClass("now");
       renderSecond(id);
  });

});