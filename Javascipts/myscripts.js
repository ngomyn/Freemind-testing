function RunApp() {
    $('#label-filename').hide();
    $("#fb-form").validate({
		rules: {
			"fullname": {
				required: true
			},
			"phone": {
				required: true,
				minlength: 10,
                maxlength: 12
			},
			"selectPosition": {
				required: true
			},
            "exp": {
				required: true,
                minlength: 10
			},
            "imagefile": {
                required: true
            },
            "email": {
                required: true,
                email: true
            }
		},
		messages: {
			"fullname": {
				required: "Bắt buộc nhập Họ tên"
			},
			"phone": {
				required: "Bắt buộc nhập số điện thoại",
				minlength: "Hãy nhập ít nhất 10 số",
                maxlength: "Hãy nhập ít nhất 12 số"
			},
			"selectPosition": {
                required: "Bắt buộc lựa chọn vị trí ứng tuyển"
			},
            "exp": {
                required: "Bắt buộc nhập kinh nghiệm làm việc",
                minlength: "Hãy mô tả kinh nghiệm làm việc trên 10 ký tự"
            },
            "imagefile": {
                required: "Bắt buộc đính kèm ảnh"
            },
            "email": {
                required: "Bắt buộc nhập email",
                email : "Hãy nhập đúng dạng email"
            }
		}
	});
    $('.form-control, .custom-select, .form-control-file').on('blur', function(){
        showFileName();
        if($('#fb-form').valid()) {
            $('#sub-form').prop('disabled', false);
        } else {
            $('#sub-form').prop('disabled', 'disabled');
        }

    })
    
    $("form").submit(function(e) { e.preventDefault() });
    $('#fb-form').submit(function () {
        if($(this).valid()) {
            postForm();
        }
    });
}

function showFileName(){
    let fileName = $('#exampleFormControlFile3').val().split("\\").slice(-1).pop();
    if(fileName != null) {
        $('#label-filename').text(fileName);
        $('#label-filename').show();
    }
}
function showInfo(message) {
    $('#success').text(message);
    $('#success').show();
    setTimeout(function() {$('#success').fadeOut();
    }, 3000); 
}

function showError(message) {
    $('#fail').text(message);
    $('#fail').show();
}

function postForm() {
    const urlFreemind = "https://freemind-test.netlify.app/.netlify/functions/test";
    let image = $('#exampleFormControlFile3').val().split("\\").slice(-1).pop();
    let applyData = {
        name : $('#inputName3').val(),
        phone : $('#inputTel3').val(),
        position: $('#selectPosition').val(),
        exp : $('#FormControlTextarea3').val(),
        picture : image,
        email : $('#inputEmail3').val()
    }
    $.ajax({
        method: "POST",
        url: urlFreemind,
        data: JSON.stringify(applyData),
        success: postSuccess,
        error: handleAjaxError
        });
}

function postSuccess (response) {
    showInfo("Form ứng tuyển đã được gửi cho Freemind")
}

function handleAjaxError(response) {

    showError("Có sự cố về mạng, xin hãy kiểm tra lại.");
}

