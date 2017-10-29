/**
 * Created by Administrator on 2017/10/29.
 */
$(function(){
  var $form = $("#form");
  $form.bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          callback:{
            message:"用户名错误"
          }
        }
      },
      password: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 6,
            max: 30,
            message: '用户名长度必须在6到30之间'
          },
          callback:{
            message:"用户名密码错误"
          }
        }
      },
    }

  });
  var validator = $form.data('bootstrapValidator');
  $form.on('success.form.bv', function (e) {
    e.preventDefault();

    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data:$form.serialize(),
      datatype:"json",
      success:function(data){
        if(data.success === true){
          location.href = "index.html";
        }else if(data.error === 1000){
          validator.updateStatus("username", "INVALID", "callback");
        }else if(data.error === 1001){
          validator.updateStatus("username", "INVALID", "callback");
        }
      }
    });
  });

  $("[type=reset]").on("click",function(){
    validator.resetForm();
  })
});