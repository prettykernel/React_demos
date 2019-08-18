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




git clone git@github.com:prettykernel/study.git && cd study

编写代码

git add . && git commit -m ''

git push

mkdir myapp && cd myapp

# 新建页面
umi generate page index

# 本地开发
umi dev

# 构建上线
umi build






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















