/**
 * Created by Administrator on 2017/10/29.
 */
$(function(){
  if(location.href.indexOf("login.html") === -1){
    $.ajax({
      type:"get",
      url:" /employee/checkRootLogin",
      success:function(data){
        if(data.error === 400){
          location.href = "login.html";
        }
      }
    })
  }
  $(document).ajaxStart(function(){
    NProgress.start();
  });
  $(document).ajaxSuccess(function(){
    NProgress.done();
  },500);


  $(".icon_loginout").on("click",function(){
    $(".logout_modal").modal("show");
  });

  $(".father").on("click",function(){
    $(".child").slideToggle();
  });

  $(".icon_menu").on("click",function(){
    $(".lt_aside,.lt_main,.lt_header").toggleClass("active");
  });
  $(".login_out").on("click",function(){
    $.ajax({
      type:"get",
      url: "/employee/employeeLogout",
      success:function(data){
      if(data.success){
        location.href = "login.html";
      }
    }
    })
  });
  $(window).on("resize",function(){
    var width = $(window).width();
    var headerWidth = width - 180;
    $(".lt_header"). css({width:headerWidth});
  }).trigger("resize");

});
