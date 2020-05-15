import base64

from django.shortcuts import render
from django.http import Http404
from django.http import HttpResponse, JsonResponse
from utils.lib import SUCCESS, FAIL, res

import cv2
import numpy as np

from . import service


def upload(request):
    """底色转换"""
    if request.method == 'POST':
        param = request.POST

        # 验证码检查
        code = request.session.get('code')
        if code and code.lower() == param['code'].lower():
            del request.session['code']

            # 文件检查
            if request.FILES.get('img') is not None:
                simg_bin = request.FILES['img'].read()
            else:
                return JsonResponse(res(FAIL, 'Need an image'))

            # 图片底色转换
            dimg_bin = service.bg_color_cvt(simg_bin, param['bg_color'])
            if dimg_bin is None:
                return JsonResponse(res(FAIL, 'No such color'))

            base64_dimg_bin = str(base64.b64encode(dimg_bin))[1:].strip("'")
            return JsonResponse(res(SUCCESS, 'success', base64_dimg_bin))
        else:
            return JsonResponse(res(FAIL, 'Wrong code'))
    else:
        raise Http404
