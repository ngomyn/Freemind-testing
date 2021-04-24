
function RunApp() {
    $("form").submit(function(e) { e.preventDefault() });
    $('#fb-form').submit(function () {
        if($(this).valid()) {
            postForm();
        }
    });
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
    let image = $('#exampleFormControlFile3').val().split("\\");
    let applyData = {
        name : $('#inputName3').val(),
        phone : $('#inputTel3').val(),
        position: $('#selectPosition').val(),
        exp : $('#FormControlTextarea3').val(),
        picture : image.slice(-1).pop(),
        email : $('#inputEmail3').val()
    }
    console.log(applyData);
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
    let errorMsg = JSON.stringify(response);
    if (response.readyState === 0)
    errorMsg = "Có sự cố về mạng";
    if (response.responseJSON &&
    response.responseJSON.description)
    errorMsg = response.responseJSON.description;
    showError(errorMsg);
  }

