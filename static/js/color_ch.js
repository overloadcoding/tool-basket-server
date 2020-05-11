function change_imgfile() {
    $('#div_img_file').css('display', 'none');
    $('#img_preview').attr('src', URL.createObjectURL($('#img')[0].files[0]));
    $('#img_preview').css('display', 'block');
}

function change_img() {
    $('#img').click();
}

function refresh_code() {
    var url = '/api/utils/code/' + '?t=' + (new Date()).getTime();
    $('#img_code').attr('src', url)
}