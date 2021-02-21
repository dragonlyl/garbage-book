// JS chunk 加载函数
__webpack_require__.e = function requireEnsure(chunkId) {
    var promises = [];

    // installedChunks 是在 webpackBootstrap 中维护的 chunk 缓存
    var installedChunkData = installedChunks[chunkId];

    // chunk 未加载
    if (installedChunkData !== 0) {
        // installedChunkData 为 promise 表示 chunk 加载中
        if (installedChunkData) {
            promises.push(installedChunkData[2]);
        } else {
            /*** 首次加载 chunk: ***/
            // 初始化 promise 对象
            var promise = new Promise(function (resolve, reject) {
                installedChunkData = installedChunks[chunkId] = [
                    resolve,
                    reject,
                ];
            });
            promises.push((installedChunkData[2] = promise));

            // 创建 script 标签加载 chunk
            var head = document.getElementsByTagName("head")[0];
            var script = document.createElement("script");
            var onScriptComplete;

            // ... 省略一些 script 属性设置

            // src 根据 publicPath 和 chunkId 拼接
            script.src = jsonpScriptSrc(chunkId);

            // 加载结束回调函数，处理 script 加载完成、加载超时、加载失败的情况
            onScriptComplete = function (event) {
                script.onerror = script.onload = null; // 避免 IE 内存泄漏问题
                clearTimeout(timeout);
                var chunk = installedChunks[chunkId];

                // 处理 script 加载完成，但 chunk 没有加载完成的情况
                if (chunk !== 0) {
                    // chunk 加载中
                    if (chunk) {
                        var errorType =
                            event &&
                            (event.type === "load" ? "missing" : event.type);
                        var realSrc = event && event.target && event.target.src;
                        var error = new Error(
                            "Loading chunk " +
                                chunkId +
                                " failed.\n(" +
                                errorType +
                                ": " +
                                realSrc +
                                ")"
                        );
                        error.type = errorType;
                        error.request = realSrc;

                        // reject(error)
                        chunk[1](error);
                    }

                    // 统一将没有加载的 chunk 标记为未加载
                    installedChunks[chunkId] = undefined;
                }
            };

            // 设置 12 秒超时时间
            var timeout = setTimeout(function () {
                onScriptComplete({ type: "timeout", target: script });
            }, 120000);

            script.onerror = script.onload = onScriptComplete;
            head.appendChild(script);

            /*** 首次加载 chunk ***/
        }
    }
    return Promise.all(promises);
};
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
    [0],
    {
        "./src/utils/math.js": function (
            module,
            __webpack_exports__,
            __webpack_require__
        ) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(
                __webpack_exports__,
                "plus",
                function () {
                    return plus;
                }
            );
            /* harmony export (binding) */ __webpack_require__.d(
                __webpack_exports__,
                "minus",
                function () {
                    return minus;
                }
            );
            const plus = (a, b) => {
                return a + b;
            };

            const minus = (a, b) => {
                return a - b;
            };
        },
    },
]);
