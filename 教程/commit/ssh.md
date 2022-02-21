# mac ssh

$ cat ~/.ssh/id_rsa.pub

## 卸载node内容 (因为nvm 切换不了)

```js
brew remove --force node
sudo rm -r /usr/local/lib/node_modules
brew prune
sudo rm -r /usr/local/include/node
```