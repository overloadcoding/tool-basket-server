def res(status, msg, data=None):
    response = {
        'status': status,
        'msg': msg,
        'data': data
    }
    return response