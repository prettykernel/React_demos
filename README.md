## React examples

git config --global user.name "prettykernel"

git config --global user.email "prettykernel@gmail.com"

ssh-add /d/sshkey备份/.ssh/id_rsa

git clone git@github.com:prettykernel/study.git

cd study

编写代码

git add . && git commit -m ''

git push





npm config set registry "https://registry.npm.taobao.org"

mkdir global_node_modules

npm config set prefix "~/global_node_modules"

# yarn 会被安装到 /home/z/global_node_modules/lib/node_modules/yarn/ 中
npm i -g yarn

npm list -g

# 所有登陆方式都会读取的文件只有 /etc/profile 和 /etc/bashrc
# 写入两者都需要 root 权限
su
cat >>/etc/profile <<EOF
export PATH=\$PATH:~/global_node_modules/bin
EOF
exit
source /etc/bashrc

yarn -v




npm i -g umi   # yarn global add umi

npm list -g    # yarn global list

umi -v

mkdir myapp && cd myapp

# 新建页面
umi generate page index

# 本地开发
umi dev

# 构建上线
umi build


# 受 npm config set prefix 影响。输出 /home/z/global_node_modules/bin
yarn global bin


# npm 缓存路径。/home/z/.npm
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

# 改变 yarn global add 的安装目录
# yarn global add 会在该目录下生成 node_modules\.bin 目录
yarn config set global-folder "你的磁盘路径"

# yarn 缓存路径。/home/z/.cache/yarn/v4
yarn cache dir
# 改变 yarn 缓存路径
yarn config set cache-folder "你的磁盘路径"




yarn/npm -g 默认安装路径？ 如何修改












