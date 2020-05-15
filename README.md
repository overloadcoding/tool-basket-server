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
  - 验证码错误：{"status": "fail", "data": null, "msg": "Wrong code"}
  - 目标底色参数错误：{"status": "fail", "data": null, "msg": "No such color"}
  - 正常情况：
    - 内容：底色转换后的图片的二进制数据（JPG 格式）
    - content_type：image

### 获取验证码

- 路径：`/api/tools/code/`
- 请求类型：GET/POST
- 参数：无
- 返回：
  - 内容：验证码图片二进制数据（PNG 格式，图片 size 后端可控制）
  - content_type：image

## 项目部署

1. 克隆代码到 `/home/server/` 目录

2. 安装项目依赖：`sudo pip install -r requirements.txt`

3. 从 `/home/server/config_db.sql` 获取数据库用户名及密码

4. 修改 Django 项目 `settings.py` 数据库连接配置

   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.mysql',
           'NAME': 'DATABASE_NAME',
           'USER': 'DATABASE_USER',
           'PASSWORD': 'DATABASE_PASSWORD',
           'HOST': 'localhost',
           'PORT': '3306',
           'OPTIONS': {
               'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
           },
       }
   }
   ```

5. 迁移数据库

   ```shell
   python manage.py makemigrations
   python manage.py migrate
   ```

6. 从 `/usr/local/etc/uwsgi.ini` 拷贝一份 uwsgi 配置到 Django 项目中，并按照目前项目修改配置

7. 修改项目文件所有者：`sudo chown -R server:server tool-basket-server/`

8. 维护

   ```shell
   # 启动
   uwsgi --ini uwsgi.ini
   # 停止
   uwsgi --stop /var/run/uwsgi/uwsgi.pid
   # 查看异常日志
   cat /var/log/uwsgi/uwsgi.log
   ```

## 待完成

- django 返回 404 到 nginx
