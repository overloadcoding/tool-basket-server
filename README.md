# 多功能网站

目前功能：照片换底色

## 开发测试环境

1. 环境安装
   - 安装 python3.5.4
   - 安装依赖包：`pip install -r requirements.txt`（requirements.txt 文件在项目根目录中）
2. 服务启动

   项目根目录下执行：`python manage.py runserver 80`

## 后端接口

### 文件上传并修改底色

- 路径：`/api/colorch/upload/`
- 请求类型：POST
- 参数：
  - img：用户选择的原图片文件
  - bg_color：目标底色（值只能为其中一个：white、red、blue）
  - code：用户输入的验证码
- 返回：
  - 请求为 GET 请求：返回 404 页面
  - 验证码错误：'{"res": "Wrong code"}'
  - 目标底色参数错误：'{"res": "No such color"}'
  - 正常情况：
    - 内容：底色转换后的图片的二进制数据（JPG 格式）
    - content_type：image

### 获取验证码

- 路径：`/api/utils/code/`
- 请求类型：GET/POST
- 参数：无
- 返回：
  - 内容：验证码图片二进制数据（PNG 格式，图片 size 后端可控制）
  - content_type：image

## 待完成

- django 返回 404 到 nginx
