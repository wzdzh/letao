/**
 * Created by Administrator on 2017/10/29.
 */
$(function(){
  $(document).ajaxStart(function(){
    NProgress.start();
  });
  $(document).ajaxSuccess(function(){
    NProgress.done();
  })
});
