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
    // payload = $('#form1').serialize();
    var payload = new FormData($('#form1'));
    $.post('/api/colorch/upload/', payload, function(data, status, xhr){
        var ct = xhr.getResponseHeader('content-type') || '';
        if ('application/json' != ct) {
            alert(ct);
            $('#img_reponse').attr('src','data:image/png;base64,' + data);
        } else {
            alert(data['msg']);
        }
    });
}