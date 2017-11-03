/**
 * Created by Administrator on 2017/11/2.
 */
$(function(){
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005,
    indicators:false
  });
 var data = {
   proName:"",
   brandId:"",
   price:"",
   num:"",
   page:1,
   pageSize:100
 } ;
 var key =decodeURI(tools.getParam("key"));
  $(".search_text").val(key);
  data.proName = key;
  function render(data){
    $.ajax({
      type:"get",
      url:"/product/queryProduct",
      data:data,
      success:function(data){
        setTimeout(function () {
          $(".lt_product").html(template("tpl", data));
        }, 1000);
      }
    });
  };
  render(data);

  $(".lt_sort a[data-type]").on("click",function(){
       var $span = $(this).find("span");
          if($(this).hasClass("now")){
            //if($span.hasClass("fa-angle-down")){
            //  $span.removeClass("fa-angle-down").addClass("fa-angle-up");
            //}else{
            //  $span.removeClass("fa-angle-up").addClass("fa-angle-down");
            //}
            $span.toggleClass("fa-angle-up").toggleClass("fa-angle-down");
          }else{
            $(this).addClass("now").siblings().removeClass("now");
            $(".lt_sort span").removeClass("fa-angle-up").addClass("fa-angle-down");
          }

      var type = $(this).data("type");
       var value = $span.hasClass("fa-angle-down")?2:1;
      data[type] = value;
    $(".lt_product").html('<div class="loading"></div>');
     render(data);
    data.price = "";
    data.num = "";
  });

  $(".search_btn").on("click",function(){
    console.log(11);
    var key = $(".search_text").val().trim();
    if(key === ""){
      return;
    }
    $(".lt_sort span").removeClass("fa-angle-up").addClass("fa-angle-down");
    $(".lt_sort a").removeClass("now");
      data.proName = key;
      data.price = "";
      data.num = "";
    $(".lt_product").html('<div class="loading"></div>');
     render(data);

  })

});
