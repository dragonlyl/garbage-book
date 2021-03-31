# 标题

## 使用jspdf的问题点

前端导出pdf中，最常用的是功能是：生成文字、插入图片以及表格，而我表格都是用跟jspdf配套的插件jspdf-autotable就不在该文章里面赘述了。案例中主要是如下几点

1. 由于jspdf使用的单位不为像素，且不能按照百分比来定义元素大小，使得添加到页面效果不尽人意
2. 中文兼容性不好，需要特殊处理
3. 插入图片效果不佳，需要加工才能达到想要的效果

### 创建jspdf对象和添加页面

```js
// npm 安装jspdf包依赖
import jsPDF from 'jspdf';
// 新建一个jspdf对象
// 第一个参数是页面方向orientation，分为portrait（竖向的）和landscape(横向)
// 第二个参数是定位unit，可以指定为mm或者px
// 第三个参数是纸张大小，默认尺寸为a4纸大小,也可以像我这样自定义页面的纸张大小
let oJspdf = new jsPDF('p', 'px', [595, 841]);
// 后续添加新的页面只需调用addPage方法
oJspdf.addPage();
```

>自定义页面宽度由于项目中报表的表格内容每一列的文字内容较多,页面a4纸大小放不下,所以适当调为a3或者自定义页面的宽度来达到页面内容显示下的效果

### 插入文字

调用`text`方法,即`oJspdf.text(textCotent, x, y, option)`输入文字。
`textCotent`里面输入想要展示的内容；
`x,y`即设置文字的在pdf当前页面的位置
`option`可以配置文字对齐方式，行高，最大宽度
插入文字是没啥大问题，最大问题是由于jspdf默认情况下是不支持中文的(显示效果会乱码),所以需要特殊处理，下面就讲解如何适配中文

#### 插入中文字符

网上流行的处理版本是

1. 下载`npm install jspdf-customfonts`安装
2. 找到依赖包的包位置，并进入fonts文件夹下，放入需要转的字体,例如 `testFont.ttf`文件名的字体
3. 之后返回fonts上层文件夹运行makeFonts.js，将在dist目录下生成default_vfs.js
4. 拷贝该js文件到引入的地方
5. oJspdf.addFont('testFont.ttf', 'fontName', 'normal');oJspdf.setFont('fontName');

而我这边的处理是，将default_vfs.js里面的一大串字符拷贝出来，黏贴到我自己创建的json文件里（这样做的原因是因为我还有部分base64的封面图和尾部的责任说明图，统一在这个json里面引入便于管理）
下面便是我的代码

```js
// 将json中所有内容赋予oZhTTF，要拿字体掉字体内容，要拿图片掉图片内容
if (!this.oZhTTF) {
    this.oZhTTF = require('../assets/img/jsPDF/zh.json');
}
let szContentFont = 'customEn';
// 多语言判断，中文引入中文字体，英文改变原本默认字体样式
// 下面代码可以优化，如下写法只做展示说明
if (this.$i18n.locale === 'zh') {
    oJspdf.addFileToVFS('zh.otf', self.oZhTTF.zh);
    oJspdf.addFont('zh.otf', 'customZh', 'normal');
    oJSPDF.setFont('customZh');
    szContentFont = 'customZh';
} else {
    oJspdf.addFileToVFS('zh.otf', self.oZhTTF.en);
    oJspdf.addFont('en.otf', 'customEn', 'normal');
    oJSPDF.setFont('customEn');
    szContentFont = 'customEn';
}
// 如果有多个字体切换需求的话，那么就将两者字体引入，通过setFont来切换需要的字体
```

### 插入图片

插入图片这部分一般都是通过联立html2canvas,联立html2canvas的目的在于项目中web页面有示意图，直接通过截取页面的示意图然后引入到pdf中。
`oJSPDF.addImage(self.oExportInfo.oCustomedImgFile, 'PNG', 20, 145, 900, 550);`
addImage方法中，第一个参数是图片的内容；第二个参数是图片的格式png，jpeg等；第三个和第四个指定在pdf上的横纵坐标；第五个和第六个参数指定图片的大小。
>如果图片尺寸设置过大的话会超出pdf范围，造成内容缺失；如果图片尺寸没有按照导出的图片尺寸会导致图片变形，这些都是要注意的

下面就讲述我使用插入图片中需要实现的几个功能内容

1. 实现pdf添加水印功能,这个功能要求的是图片为透明png图片，需要在用`html2canvas`生成canvas的时候在调用该方法中第二个option参数传入`backgroundColor: 'transparent'`属性（注意：在自己图片中设置背景图片是没有效果的！！）,然后将canvas转换成png,之后在调用addImage方法将第二个参数指定为为"PNG"就能达到透明图片的效果

2. 实现图片在pdf中旋转(由于项目中示例图会有图片长度特别长，但是高度又很低，横向展示图片效果不好，乱调整图片展示的尺寸会导致图片过度拉伸效果不好，所以要实现图片旋转效果)。由于html2canvas在onrendered方法里面中设置图片的旋转导出的canvas会导致图片缺失(即在html2canvas处理不了旋转的要求)。那么只能在jspdf里面操作了，同时发现发现addImage的第9个参数,rotation（旋转角度），这里我们只需要传入数字不用带单位。这样调用addImage方法传入的图片高度属性会复用于pdf最终图片的宽度上。

3. 实现添加的图片压缩,可以自定义图片是否压缩,如果对于导出的文档有大小要求的(其中有个项目有封面图和尾部声明图导致文件过大,同时也考虑到首图和尾图的清晰度不影响用户配单使用，所以对其进行压缩处理),addImage方法的第八个参数compression,当然这里需要设置图片的格式必须为JPEG,默认参数为"NONE",然后 'FAST'可以压缩图片到很小的大小,亲自尝试过内容不变导出的文档从2M文件大小变成只有200KB左右, 其他还有'MEDIUM' and 'SLOW'两个参数,都有较调用'FAST'有小幅度的减少。

4. 保持图片的比例尺寸，并放缩不同大小（即不是通过写死的宽度）来适配不同pdf页面尺寸。

>注意: 笔记本和pc电脑在调用addImage方法添加image的时候会有不同的效果(**有个项目缺陷是用htmltoCanvas生成图片,在pc端就默认用canvas.width和canvas.height界面上显示没问题,但是在笔记本会因为图片过大导致内容缺失**,
所以在设置图片的时候,一定要指定image的长宽,兼容pc和笔记本)。那么如何设置图片的宽度呢，实现的原理就是调用pdf暴露出来的属性来对图片尺寸进行放缩。代码如下

```js
// 首先要获取该pdf的page的宽度
let pageSize = oJspdf.internal.pageSize;
let pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
// 通过公式 displayWidth/canvasWidth*canvasHeight 来获取displayHeight
// 我这边是故意给左右各留10，这样图片在pdf的总占用宽度是 pageWidth - 20
// 计算出图片的放缩比例
let imgRate = this.szCanvasImg.width / (pageWidth - 20);;
// 将canvas转换成dataurl
let imgDataUrl = this.szTextImg.toDataURL('image/png', 1);
// 这样就能实现按一定比例放缩了
oJspdf.addImage(imgDataUrl, 'PNG',  10, 20, pageWidth - 20, this.szCanvasImg.height / rate);
```

5. 图片还有一种情况就是,一张图片如果正好快到上个页面的页尾,那么直接添加就会导致页面显示不下（从而造成图片内容的缺失）。 那么如何处理呢。 这里其实还是需要通过计算来进行处。比如你添加图片的时候,你是知道当前pdf页面内容已经添加到哪了,那么就可以通过上面的计算得出当前的页面剩余高度(而这边还可以特殊处理,即空出页尾的空间),代码示例如下

```js

    iCurrentHeight = 100; // 这里假设还剩下的页面高度(算已扣除页尾高度)
    iImgHeight = 200; // 这里假设图片高度
    szImgData = 'url'; // 图片的data
    // 图片高于剩余高度
    pdf.addImage(szImgData, 'JPEG', 0, iCurrentHeight, iImgWidth, iImgHeight);
    //图片在上个页面显示不下
    if (iCurrentHeight < iImgHeight) {
        pdf.addPage();
        // 需要添加页面偏移量,
        pdf.addImage(szImgData, 'JPEG', 0, -iCurrentHeight, iImgWidth, iImgHeight)
    }
```

### 页眉页尾

可以通过上面的讲的调用jspdf的属性获取页面的总体长宽,然后在调用`oJspdf.internal.getNumberOfPages()`来获取当前所有的页面数量，通过for循环将每个页面的头和页尾,要设置文字的话就用上面的text,插入图片就用addImage就能实现炫酷的页眉页尾，代码实例如下

```js
// 获取页面总共数量
let iPageCount = oJspdf.internal.getNumberOfPages();
for (let index = 0; index < iPageCount; index++) {
    // 切换pdf到具体的页面
    oJspdf.setPage(index);
    // 在切换到的页面进行内容的添加
    oJspdf.text( oJspdf.internal.getCurrentPageInfo().pageNumber + '/' + iPageCount, pageWidth / 2 - 10, pageHeight - 20);
```

## 写在最后

由于现在有三个项目都需要在前端导出pdf，觉得整理一份关于如何操作pdf还是需要的，而上面写的除了导出表格已经能够解决很多场景了（至少我的项目的所有功能都已经能够涵盖了）。如果后续有什么新的需求需要实现到时候再继续添加内容。