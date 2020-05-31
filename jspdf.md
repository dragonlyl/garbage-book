# 使用jspdf的问题点在哪

1.由于jspdf

## 添加页面

通过调用addPage,其中可以通过第一个参数format来指点page的页面大小,默认尺寸为a4纸大小,当然可以自定义页面宽度(由于项目中报表的表格内容每一列的文字内容较多,页面a4纸大小放不下,所以适当调为a3或者自定义页面的宽度来达到页面内容显示的下)

## 添加内容

最常用的是生成文字和插入图片以及表格,表格有专门使用的插件,所以这个放到后面描述

## 插入文字

调用text方法text(text, x, y)输入文字,设置文字的位置以及指定文字在于页面的位置
有问题的是由于jspdf默认情况下是不支持中文的(显示效果会乱码),所以需要特殊处理 ,找到jspdf的依赖包,然后将要引入的字体文件放到指定位置,运行代码就可以生成你需要引入的自定义字体的,
生成文件的js
oJSPDF.addFileToVFS('zh.otf', self.oZhTTF.zh);
doc.addFont("msyh-normal.ttf", "fontName", "normal");
        doc.setFont('fontName');
同时这里引入的字体文件可以引入多个,每次切换用setFont来切换字体就好

## 插入图片

这部分一般都是通过联立html2canvas,
oJSPDF.addImage(self.oExportInfo.oCustomedImgFile, 'PNG', 20, 145, 900, 550);

1. 如果要实现水印,可以通过设置html2canvas的background为,然后将其导出为png,同时用addImage指定参数为"PNG"就能达到透明图片的效果,这样就能将其设置为水印

2. 实现图片旋转,由于html2canvas在onrendered方法里面中设置图片的旋转导出时会导致图片缺失(即在html2canvas处理不了旋转的要求),然后发现 ,addImage的第9个参数,rotation.只需写成数字,这样之前设置的长度会复用于生成图片的宽度上(在处理长度特别长,但是宽度特别短的情况下)

3. 实现图片压缩,可以自定义图片是否压缩,如果对于导出的文档有大小要求的(其中有个项目有封面图和尾部声明图导致文件过大,同时也考虑到首图和尾图的清晰度不影响用户配单使用),第八个参数compression,当然这里需要设置图片的格式必须为JPEG,默认参数为"NONE",然后 'FAST'可以压缩很大的尺寸,亲自尝试过从 2M文件大小变成只有500k左右, 其他还有'MEDIUM' and 'SLOW'两个参数,都有小幅度的减少

4. 设置图片的放缩可以通过获取页面的长宽来调整图片在页面的展示效果

>注意: 笔记本和pc电脑在添加image的时候会有不同的效果(有个项目缺陷是用htmltoCanvas生成图片,在pc端就默认用canvas.width和canvas.height界面上显示没问题,但是在笔记本会因为图片过大导致内容缺失),
所以在设置图片的时候,一定要指定image的长宽,兼容pc和笔记本),那么如何设置图片的宽度呢.首先要获取该page的长宽(因为jspdf的页面大小可以通过调用开来确认页面的宽度), 那就可以通过公式 pageWidth/canvasWidth*canvasHeight来得到图片在页面的展示高度.

5.图片还有一种情况就是,一张图片如果正好快到上个页面的页尾,那么直接添加就会导致页面显示不下, 那么如何处理呢. 这里其实可以通过计算,来得出.比如你添加图片的时候,你是知道当前pdf页面内容已经添加到哪了,那么就可以通过上面的计算得出当前的页面剩余高度(而这边还可以特殊处理,即空出页尾的空间),代码示例如下

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

## 页眉页尾

可以通过上面的讲的调用jspdf的属性获取页面的长宽,然后在调用 的for循环将每个页面的头和页尾,要设置文字的话就用上面的text,插入图片就用addImage就能实现炫酷的页眉页尾