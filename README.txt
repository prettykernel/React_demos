git clone git@github.com:prettykernel/react_demos.git && cd react_demos

编写代码

git add . && git commit -m ' '

再次编写代码

git add . && git commit -m ' '

git push    # 可能需要手工解决冲突



master 只用于合并，不用于开发新功能。

一、开发分支 dev 上的代码达到上线的标准后，要合并到 master 分支
git checkout dev
git pull
git checkout master
git merge dev
git push -u origin master

二、当 master 代码改动了，需要更新开发分支 dev 上的代码
git checkout master 
git pull 
git checkout dev
git merge master 
git push -u origin dev




git remote remove origin >/dev/null
git remote add origin git@github.com:prettykernel/react_demos.git
git remote -v

git checkout -b dev

上一次 git push 成功后，或者初次 git clone 后，本地代码和远程代码一致。

进行一些本地开发。

git add . && git commit -m 'commit log'

# 看看是否有冲突，即是否有其他人和我修改了同一个文件
git pull

如果有冲突，则根据 git pull 的报错信息，打开冲突文件，手工解决冲突。

git add . && git commit -m 'commit log'

git push -u origin master


















# npm 缓存路径。默认是 /home/z/.npm。
npm config get cache

# 默认输出 /usr。npm i -g 会将包安装在该目录下的 lib/node_modules/ 子目录中。
npm config get prefix




# yarn global add 的安装目录，不受 npm config set prefix 影响。默认是 /home/z/.config/yarn/global。
# 执行 yarn global add umi，会将 umi 包及其所有依赖的包都安装到 /home/z/.config/yarn/global/node_modules/ 下。
# npm 会把依赖的包安装到 /usr/lib/node_modules/npm/node_modules/ 下。
yarn global dir

# 可执行文件的软链接，受 npm config set prefix 影响。输出 /home/z/global_node_modules/bin
# yarn 虽然会把全局包安装到 yarn global dir 制定的目录，但会在 `npm config set prefix`/bin 下生成安装的包中包含的所有可执行文件的符号链接。
yarn global bin

# 改变 yarn global add 的安装目录。默认为 undefined。
# yarn global add 会在该目录下生成 node_modules\.bin 目录
yarn config set global-folder "目录"

# yarn 缓存路径。/home/z/.cache/yarn/v4
yarn cache dir
# 改变 yarn 缓存路径。默认为 undefined。
yarn config set cache-folder "目录"

yarn cache clean
yarn cache list




## React examples

git config --global user.name "prettykernel"

git config --global user.email "prettykernel@gmail.com"

cp /d/sshkey备份/.ssh/id_rsa /home/z/.ssh/id_rsa && chmod 400 /home/z/.ssh/id_rsa

ssh -vT git@github.com

npm config set registry "https://registry.npm.taobao.org"

mkdir global_node_modules

npm config set prefix "~/global_node_modules"

# bash 的所有启动方式都会读取的文件只有 /etc/bashrc 和 ~/.bashrc，但写入 /etc/bashrc 需要 root 权限，所以自定义的 bash 配置推荐放入 ~/.bashrc。
cat >>~/.bashrc <<EOF
export PATH=\$PATH:~/global_node_modules/bin
EOF
source ~/.bashrc

# yarn 会被安装到 /home/z/global_node_modules/lib/node_modules/yarn/ 中
npm i -g yarn

npm i -g umi            # yarn global add umi

npm list -g --depth=0   # yarn global list --depth=0

npm cache clean -f && npm cache verify

umi -v




mkdir myapp && cd myapp

# 新建页面，页面名不要以数字开头。
# 初次执行 umi generate page/umi g page 时，会在当前工作目录 myapp/ 下新建一个 pages/ 子目录，并在其中新建 index.js 和 index.css 两个文件。
umi generate page index

# 因为 pages/ 子目录已经存在，所以直接在其中新建 users.js 和 users.css 两个文件。
umi g page users

# 本地开发。
# 初次执行 umi dev 时，会在 pages/ 子目录下新建一个 .umi/ 子目录，并在其中新建 history.js，polyfills.js，router.js，umi.js，umiExports.js 几个文件。
# 然后，自动执行 Webpack，编译整个项目。
# 接下来，启动 development server，用于与浏览器交互。
# 最后，浏览器自动打开 http://localhost:8000/。
# 之后，每当修改了源码文件，都会自动重新构建，更新 .umi/ 下的相应文件，并自动刷新浏览器。浏览器控制台输出 hotModuleReplacement.js:197 [HMR] Detected local css modules. Reload all css.
umi dev
# Ctrl + C 终止 umi dev 进程时，浏览器控制台输出 webpackHotDevClient.js:66 The development server has disconnected.


# 开发完成后，需要构建，用于发布上线。
# 初次执行 umi build 时，会在 myapp/ 下新建一个 dist/ 子目录。
# 然后，自动执行 Webpack，编译出三个文件 index.html，umi.css，umi.js，并写入 dist/ 中。
umi build

# cmd 中执行 tree /F pages
tree .
.
├── dist
│   ├── index.html
│   ├── umi.css
│   └── umi.js
└── pages
    ├── index.css
    ├── index.js
    ├── users.css
    └── users.js

发布前，可以通过 serve 做本地验证，结果和 umi dev 一致：
npm i serve now -g --registry=https://registry.npm.taobao.org
serve -v
now -v
serve ./dist

本地验证完，可以使用 now(Global Serverless Deployments，https://zeit.co/now) 演示部署(可能需要翻墙执行)：
now ./dist

# umi 内置了基于 jest 的测试工具 umi-test
Options:
    --coverage                    indicates that test coverage information should be collected and reported in the output
    --collectCoverageFrom=<glob>  a glob pattern relative to matching the files that coverage info needs to be collected from, e.g, --collectCoverageFrom=src/**/*.js
    --detectLeaks                 debug memory leaks
umi test

# 使用 umi inspect 列出配置项的内容用以检查
Options:
    --mode                specify env mode (development or production, default is development)
    --rule <ruleName>     inspect a specific module rule
    --plugin <pluginName> inspect a specific plugin
    --rules               list all module rule names
    --plugins             list all plugin names
    --verbose             show full function definitions in output
umi inspect




pages/ 是页面所在的目录，umi 约定 pages/ 下所有的 js 文件即路由。
pages/.umi/ 是 umi 的临时目录，可以在这里做一些验证，但不要直接在这里修改代码，umi 重启或 pages/ 下的文件修改后，都会重新生成 pages/.umi/ 下的文件。



return 后不能用 \。
JSX 中不能用 // 或 /**/ 注释，只能用 {/**/}。





