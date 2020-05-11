from django.shortcuts import redirect
from django.http import HttpResponse

from . import service

def get_ver_code(request):
    """验证码"""
    img_bin, code = service.create_verification_code()
    request.session['code'] = code
    return HttpResponse(img_bin, content_type='image')
