<!--
 * @Author: your name
 * @Date: 2020-10-29 17:04:54
 * @LastEditTime: 2020-11-09 09:16:15
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \garbage-book\on_the_job\byself\excel处理.md
-->
# excel导出整理

## 解析流程

```js
// 通过change事件获取file文件
excelUpload (e) {
    let file = e.target.files[0];
    this.readWorkbookFromLocalFile(file, this.outputWorkbook);
},
// 读取本地excel文件
readWorkbookFromLocalFile (file, callback) {
    var reader = new FileReader();
    reader.onload = function (e) {
        var data = e.target.result;
        var workbook = XLSX.read(data, { type: 'binary' });
        if (callback) callback(workbook);
    };
    reader.readAsBinaryString(file);
},
// 处理读取的数据
outputWorkbook (workbook) {
    this.$refs['excel-upload'].value = '';
    var sheetNames = workbook.SheetNames; // 工作表名称集合
    sheetNames.forEach(name => {
        var worksheet = workbook.Sheets[name]; // 只能通过工作表名称来获取指定工作表
        const sheet2JSONOpts = {
            /** Default value for null/undefined values */
            defval: ''// 给defval赋值为空的字符串
        };
        // 转换为json
        let json = XLSX.utils.sheet_to_json(worksheet, sheet2JSONOpts);
        console.log(json, 'XLSX.utils.sheet_to_json');
    });
},
// 导出文档
exportExcel () {
    // 处理表格数据
    let aExcelData = [
        ['first row']
    ];
    var sheet = XLSX.utils.aoa_to_sheet(aExcelData);
    console.log(sheet, 'sheet');
    // 10表示5个汉字
    sheet['!cols'] = Array(7).fill({ wch: 22 });
    this.openDownloadDialog(this.sheet2blob(sheet), 'Storage and Network Calculator.xlsx');
},
sheet2blob (sheet, sheetName) {
    sheetName = sheetName || 'sheet1';
    var workbook = {
        SheetNames: [sheetName],
        Sheets: {}
    };
    workbook.Sheets[sheetName] = sheet;
    var wopts = {
        bookType: 'xlsx', // 要生成的文件类型
        bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        type: 'binary'
    };
    var wbout = XLSX.write(workbook, wopts);
    var blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
    // 字符串转ArrayBuffer
    function s2ab (s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i !== s.length; ++i) {
            view[i] = s.charCodeAt(i) & 0xFF;
        }
        return buf;
    }
    return blob;
},
openDownloadDialog (url, saveName) {
    let b = url;
    if (typeof url === 'object' && url instanceof Blob) {
        url = URL.createObjectURL(url); // 创建blob地址
    }
    var aLink = document.createElement('a');
    aLink.href = url;
    aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
    var event;
    if (window.MouseEvent) {
        try {
            event = new MouseEvent('click');
            // return false; // No need to polyfill
        } catch (e) {
            // Need to polyfill - fall through
            window.navigator.msSaveBlob(b, saveName);
        }
    } else {
        event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }
    aLink.dispatchEvent(event);
},
```