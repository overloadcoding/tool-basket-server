function change_imgfile() {
    $('#div_img_file').css('display', 'none');
    $('#img_preview').attr('src', URL.createObjectURL($('#img')[0].files[0]));
    $('#img_preview').css('display', 'block');
}

function change_img() {
    $('#img').click();
}

function refresh_code() {
    var url = '/api/tools/code/' + '?t=' + (new Date()).getTime();
    $('#img_code').attr('src', url)
}

function upload() {
    var payload = new FormData($('#form1')[0]);
    $.ajax({
        url: '/api/colorch/upload/',
        type: 'POST',
        processData: false,
        contentType: false,
        data: payload,
        success: function(data){
                    if ('success' == data['status']) {
                        $('#img_reponse').attr('src', 'data:image/jpg;base64,' + data['data']);
                    } else {
                        alert(data['msg']);
                    }
                }
    });
}