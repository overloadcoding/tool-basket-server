function change_imgfile() {
    $('#div_img_file').css('display', 'none');
    $('#img_preview').attr('src', URL.createObjectURL($('#img')[0].files[0]));
    $('#img_preview').css('display', 'block');
}

function change_img() {
    $('#img').click();
}

function refresh_code() {
    url = '/api/tools/code/' + '?t=' + (new Date()).getTime();
    $('#img_code').attr('src', url)
}

function upload() {
    payload = new FormData($('#form1')[0]);
    $('#button_ch').attr('style', 'display: none');
    $('#button_ching').removeAttr('style');
    upload_ajax = $.ajax({
        url: '/api/colorch/upload/',
        type: 'POST',
        data: payload,
        timeout : 60000, //超时时间设置，单位毫秒
        processData: false,
        contentType: false,
        success: function(data){
            if ('success' == data['status']) {
                $('#img_response').attr('src', 'data:image/jpg;base64,' + data['data']);
                $('#button_ch').removeAttr('style');
                $('#button_ching').attr('style', 'display: none');
                refresh_code();
            } else {
                $('#button_ch').removeAttr('style');
                $('#button_ching').attr('style', 'display: none');
                alert(data['msg']);
            }
        },
        error: function(){
            alert('请求出错，请重试！')
            $('#button_ch').removeAttr('style');
            $('#button_ching').attr('style', 'display: none');
            refresh_code();
        },
        complete: function(XMLHttpRequest, status){
            if('timeout' == status){
                upload_ajax.abort();
                alert('请求超时，请重试！')
                $('#button_ch').removeAttr('style');
                $('#button_ching').attr('style', 'display: none');
                refresh_code();
    　　　　}
    　　}
    });
}

function download() {
    url = $('#img_response').attr('src');
    tmp_a = $('<a id="tmp_a" download="pic.png" style="display:none"></a>');
    $('#img_response').append(tmp_a);
    $('#tmp_a').attr('href', url);
    $('#tmp_a')[0].click();
    $('#tmp_a').remove();
}