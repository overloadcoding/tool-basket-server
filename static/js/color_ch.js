function change_imgfile() {
    $('#div_img_file').css('display', 'none');
    $('#img_preview').attr('src', URL.createObjectURL($('#img')[0].files[0]));
    $('#img_preview').css('display', 'block');
}

function change_img() {
    $('#img').click();
}

function refresh_code() {
    var url = 'http://127.0.0.1/api/tools/code/' + '?t=' + (new Date()).getTime();
    $('#img_code').attr('src', url)
}

function upload() {
    payload = $('#form1').serialize();
    $.post('http://127.0.0.1/api/colorch/upload/', payload, function(data){
        $('#img_reponse').attr('src','data:image/png;base64,' + data);
    })
}