# 导出

## 导出excel

<https://www.cnblogs.com/liuxianan/p/js-excel.html>
<https://github.com/SheetJS/sheetjs>
<https://github.com/eligrey/FileSaver.js>
<https://www.cnblogs.com/yunser/p/7629399.html>
需要安装xlsx 和 file-saver两个库

具体配置详细看第一个链接
<template>
    <div class="dialog-black-header">
        <el-dialog :title="$t('export')" :visible.sync="bExportPlan" :area="500" :close-on-click-modal="false">
            <el-form :model="oExportInfo" label-width="140px"><!--  :rules="oRules"  ref="oExportInfo"-->
                <el-form-item :label="$t('exportType')"><!--  prop="szProjectName" -->
                    <el-radio class="radio" v-model="oExportInfo.szExportType" label="pdf">PDF</el-radio>
                    <el-radio class="radio" v-model="oExportInfo.szExportType" label="word">Word</el-radio>
                </el-form-item>
                <el-form-item :label="$t('projectName')"><!--  prop="szProjectName" -->
                    <el-input v-model="oExportInfo.szProjectName" auto-complete="off" class="text" :maxlength="128"></el-input>
                </el-form-item>
                <el-form-item :label="$t('projectDesigner')"><!--  prop="szProjectDesigner"  -->
                    <el-input v-model="oExportInfo.szProjectDesigner" auto-complete="off" :maxlength="64"></el-input>
                </el-form-item>
                <el-form-item :label="$t('logoFile')">
                    <el-input v-model="oExportInfo.szLogoName" :disabled="true">
                        <template slot="append"><el-button @click="changeLogo">{{$t("changeLogo")}}</el-button></template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <input type="file" id="changeLogo" @change="fileChange($event)" accept=".png,.jpeg,.jpg,.bmp" style="display: none">
                    {{$t("exportPlanLogoTip")}}
                </el-form-item>
            </el-form>
            <!-- 导出的word模板 -->
            <div id="wordPreview" v-show="false">
                <!-- <img src="../../assets/jsPDF/Disclaimer-zh.png"> -->
                <img :src="oExportWordInfo.szLogoImgUrl" width="550" height="80" />
                <br/>
                <br/>
                <img src="../../assets/jsPDF/default.png" width="550" height="300" />
                <div class="project-info">
                    <div class="project-item">
                        <span class="project-label">{{ $t("projectName") }}：</span>
                        <span class="project-value">{{ oExportInfo.szProjectName }}</span>
                    </div>
                    <div class="project-item">
                        <span class="project-label">{{ $t("projectDesigner") }}：</span>
                        <span class="project-value project-designer">{{ oExportInfo.szProjectDesigner }}</span>
                    </div>
                    <div class="project-item">
                        <span class="project-label">{{ $t("designTime") }}：</span>
                        <span class="project-value">{{ oExportInfo.szDesignDate }}</span>
                    </div>
                </div>
                <span class="project-title">{{ $t("deploymentView") }}</span>
                <br/>
                <img :src="szCanvasImgUrl" id="test-img" width="550" height="260" />
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <span class="project-title">{{ $t("device") }}</span>
                <br/>
                <table border="1" cellspacing="0">
                    <tr>
                        <td>{{ $t("serialNumber") }}</td>
                        <td>{{ $t("cameraModel") }}</td>
                        <td>{{ $t("cameraInfo") }}</td>
                        <td>{{ $t("installInfo") }}</td>
                        <td>{{ $t("targetInfo") }}</td>
                        <td>{{ $t("effectiveRange") }}</td>
                    </tr>
                    <tr v-for="(item, index) in oExportWordInfo.aCameraInfo" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.szCameraModel }}</td>
                        <td>{{ item.szCameraInfo }}</td>
                        <td>{{ item.szInstallInfo }}</td>
                        <td>{{ item.szTargetInfo }}</td>
                        <td>{{ item.szEffectiveRange }}</td>
                    </tr>
                </table>
                <template v-if="!oExportInfo.oCustomedImgFile">
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <div class="project-copy" v-html="oExportWordInfo.szCopyRightEn" style="margin-top: 100px;"></div>
                    <img src="../../assets/jsPDF/miniSlogan.png" width="550" height="100">
                </template>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="exportOk" v-loading.fullscreen.lock="bFullscreenLoading">{{$t("ok")}}</el-button>
                <el-button @click="bExportPlan = false">{{$t("cancel")}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import jsPDF from 'jspdf'
    import html2canvas from 'html2canvas'
    import autoTable from 'jspdf-autotable'
    import disclaimerZhImgSrc from '@/assets/jsPDF/Disclaimer-zh.png'
    import disclaimerEnImgSrc from '@/assets/jsPDF/Disclaimer-en.png'
    import disclaimerItImgSrc from '@/assets/jsPDF/Disclaimer-it.png'
    import disclaimerFrImgSrc from '@/assets/jsPDF/Disclaimer-fr.png'
    import disclaimerRuImgSrc from '@/assets/jsPDF/Disclaimer-ru.png'
    import disclaimerSpImgSrc from '@/assets/jsPDF/Disclaimer-sp.png'
    import szSloganImgSrc from '@/assets/jsPDF/slogan.png'
    import szSloganSmallImgSrc from '@/assets/jsPDF/miniSlogan.png'
    // import szGlobalImgSrc from '@/assets/jsPDF/default.png'
    import szGlobalImgSrc from '@/assets/jsPDF/pdfLogo.png'
    import szGlobalSmallImgSrc from '@/assets/jsPDF/miniGlobal.png'
    import szPDFLogo from '@/assets/jsPDF/pdfLogo.png'
    import oUtils from "@/assets/common/Utils"
    import $ from 'jquery'
    import "@/assets/word/FileSaver"
    import "@/assets/word/jquery.wordexport"
    import { mapState, mapMutations, mapActions } from "vuex"
    export default {
        name: 'ExportPDF',
        computed: {
            ...mapState({
                aCameraList: state => state.cameraList.AllList,
                oCurrentPlan: state => state.planList.oCurrentPlan,
                szCurrentStandard: state => state.cameraList.szCurrentStandard
            })
        },
        data () {
            return {
                bFullscreenLoading: false,
                oZhTTF: null,
                bExportPlan: false,
                oExportInfo: {
                    szProjectName: "",
                    szProjectDesigner: "",
                    szLogoName: "",
                    oCustomedImgFile: null,
                    szExportType: "pdf",
                    szDesignDate: this.replaceStr(oUtils.dateFormat(new Date(), "yyyy-MM-dd"))
                },
                // 导出的word中canvas图片url
                szCanvasImgUrl: "",
                oExportWordInfo: {
                    szCopyRightEn: `
                        <p>© 2010 by Hangzhou Hikvision Digital Technology Co., Ltd.All rights reserved.Any and all information, including, among others, wordings, pictures, graphs are the properties of Hangzhou Hikvision Digital Technology Co., Ltd.or its subsidiaries(hereinafter referred to be "Hikvsion").Recipients of this document may copy, distribute or display this document so long as this copyright notice, license and disclaimer are retained with all copies of the document.No license is granted to modify this document.</p>
                        <p>THIS DOCUMENT IS PROVIDED "AS IS" AND HIKVISION MAKES NO REPRESENTATIONS OR WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO, WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR TITLE; THAT THE CONTENTS OF THIS DOCUMENT ARE SUITABLE FOR ANY PURPOSE; OR THAT THE IMPLEMENTATION OF SUCH CONTENTS WILL NOT INFRINGE ANY PATENTS, COPYRIGHTS, TRADEMARKS OR OTHER RIGHTS.</p>
                        <p>IN NO EVENT WILL HIKVISION BE LIABLE FOR ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, PUNITIVE OR CONSEQUENTIAL DAMAGES, ARISING OUT OF OR RELATING TO ANY USE OR DISTRIBUTION OF THIS DOCUMENT, WHETHER OR NOT (1) HIKVISION HAS ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, OR(2) SUCH DAMAGES WERE REASONABLY FORESEEABLE, AND ARISING OUT OF OR RELATING TO ANY USE OR DISTRIBUTION OF THIS DOCUMENT.</p>
                    `,
                    // szCopyRightZh: `
                    //     <p>版权所有@杭州海康威视数字技术股份有限公司2019。保留一切权利。</p>
                    //     <p>本文档的任何部分，包括文字、图片、图形等均归属于杭州海康威视数字技术股份有限公司或其子公司（以下简称“本公司”或“海康威视”）。文档接受者仅可在保留权属说明以及免责说明的前提下，复制、分发或展示本文档。未经书面许可，接收者不得对本文档进行任何形式的修改。</p>
                    //     <p>本文档是“按照现状”提供，可能存在瑕疵或错误。本公司不对本文档提供任何形式的明示或默示保证，包括但不限于适销性、质量满意度、适合特定目的、不侵犯第三方权利等保证；亦不对使用或是分发本文档导致的任何特殊、附带、偶然或间接的损害进行赔偿，包括但不限于商业利润损失、数据或文档丢失产生的损失。</p>
                    // `,
                    szLogoImgUrl: szGlobalImgSrc,
                    aCameraInfo: []
                },
                oSpanishLan: {
                    "projectDesigner": "Project Designer",
                    "designTime": "Design Time",
                    "installAngle": "Mounting Angle(°)",
                    "rotateAngle": "Horizontal Angle(°)",
                    "blindZoneDesc": "Blind Area(m)",
                    "blindZoneDescFt": "Blind Area(m)",
                    "hikVCA": "Behavior Analysis(Recommend 0.5m×1.8m for the size of person.)",
                    "hikVCAFt": "Behavior Analysis(Recommend 1.6ft×5.9ft for the size of person.)"
                }
            }
        },
        methods: {
            ...mapActions({
                setCurrentStandard: "setCurrentStandard",
                createNewPlan: "createNewPlan"
            }),
            exportPlan() {//导出方案
                let self = this;
                if (!self.oCurrentPlan) {
                    self.createNewPlan({oModule: self, szType: "thermal"});
                    return;
                }

                // 判断当前方案是否保存了相机
                if (0 === self.aCameraList.length) {
                    oUtils.notify(self, self.$t("warning"), self.$t("noCamera"), "warning");
                    return;
                }

                // 参数初始化
                self.oExportInfo.szProjectName = "";
                self.oExportInfo.szProjectDesigner = "";
                self.oExportInfo.szLogoName = "default.png";//默认文件
                self.oExportInfo.oCustomedImgFile = null;
                self.oExportWordInfo.szLogoImgUrl = szGlobalImgSrc;

                self.bExportPlan = true;
            },
            changeLogo() {//修改默认logo
                document.getElementById("changeLogo").click();
            },
            fileChange(event) {//修改默认logo
                let self = this;
                let oFile = event.target.files[0];

                if (oFile.type == "image/jpeg" || oFile.type == "image/jpg" || oFile.type == "image/png" || oFile.type == "image/bmp") {
                    let iSize = oFile.size;
                    if (!iSize) {
                        return;
                    } else if (iSize / 1024 > 5 * 1024) {//最大不允许超过5M
                        oUtils.notify(self, self.$t("warning"), self.$t("maxImageSize"), "warning");
                        document.getElementById("changeLogo").value = "";
                        return;
                    };
                    
                    self.oExportInfo.szLogoName = oFile.name;
                    self.oExportInfo.oCustomedImgFile = new Image();

                    let oReader = new FileReader();
                    oReader.readAsDataURL(oFile);
                    oReader.onload = function() {
                        if ("pdf" === self.oExportInfo.szExportType) {
                            self.oExportInfo.oCustomedImgFile.src = this.result;
                        } else {
                            self.oExportWordInfo.szLogoImgUrl = this.result;
                        }
                    };
                } else {
                    oUtils.notify(self, self.$t("typeError"), self.$t("plsChooseIMGorPNGorBMP"), "warning");
                    document.getElementById("changeLogo").value = "";
                }
            },
            // 避免因为相机类型/描述信息太长导致pdf宽度异常，超过一定字符就插入一个回车
            insertEnter (szStr, iNum) {
                let szTempStr = szStr;
                if (szTempStr.length > iNum) {
                    let iEnter = Math.ceil(szTempStr.length / iNum) - 1;
                    while(iEnter > 0) {
                        szTempStr = szTempStr.slice(0, iEnter * iNum) + "enter" + szTempStr.slice(iEnter * iNum);
                        iEnter--;
                    }
                }

                return szTempStr;
            },
            // 组装相机信息
            getCameraInfo(oCamera) {
                let self = this;
                let szCameraInfo = "";
                if ("customCamera" !== oCamera.szCameraType) {
                    szCameraInfo += oCamera.szAppearanceType + "enter";
                }

                szCameraInfo += self.$t("resolution") + ":" + oCamera.szResolution + "enter";

                if ("fixed" === oCamera.szLensType) {
                    szCameraInfo += self.$t("focusInstance") + ":" + oCamera.iFocusDistance + "enter";
                } else {
                    szCameraInfo += self.$t("focusInstance") + ":" + oCamera.iMinFocusDistance + "-" + oCamera.iMaxFocusDistance + "enter";
                }

                // 避免因为相机描述信息太长导致pdf宽度异常，超过80个字符就插入一个回车
                // szCameraInfo += self.$t("cameraDescription") + ":" + "enter" + self.insertEnter(oCamera.szCameraDescribe, 80);
                if (oCamera.iVisibleLightChannelMinFocusDistance) {
                    szCameraInfo += self.$t("visibleLightChannel") + ":" + "enter" + oCamera.iVisibleLightChannelMinFocusDistance + '~' + oCamera.iVisibleLightChannelMaxFocusDistance + "(mm), " + oCamera.szVisibleLightChannelResolution;
                } else {
                    szCameraInfo += self.$t("visibleLightChannel") + ":" + "enter" + "null";
                }

                return szCameraInfo;
            },
            // 组装安装信息
            getInstallInfo(oCamera) {
                let self = this;
                let szInstallInfo = "";

                if ("mereic" === self.szCurrentStandard) {
                    szInstallInfo += self.$t("installHeight") + ":" + oCamera.iInstallHeight + "enter";
                } else {
                    szInstallInfo += self.$t("installHeightFt") + ":" + oCamera.iFTInstallHeight + "enter";
                }

                if ("sp" === self.$i18n.locale) {//西班牙语的部分字符pdf无法显示
                    szInstallInfo += self.oSpanishLan["installAngle"] + ":" + oCamera.iInstallAngle + "enter";
                    szInstallInfo += self.oSpanishLan["rotateAngle"] + ":" + oCamera.iRotateAngle;
                } else {
                    szInstallInfo += self.$t("installAngle") + ":" + oCamera.iInstallAngle + "enter";
                    szInstallInfo += self.$t("rotateAngle") + ":" + oCamera.iRotateAngle;
                }
                
                return szInstallInfo;
            },
            // 组装目标物信息
            getTargetInfo(oCamera) {
                let self = this;
                let szTargetInfo = "";
                let iWidth;
                let iHeight;
                let bMereic = ("mereic" === self.szCurrentStandard);

                switch(oCamera.szParamsType) {
                    case "VCA":
                        iWidth = bMereic ? oCamera.iVCAWidth : oCamera.iFTVCAWidth;
                        iHeight = bMereic ? oCamera.iVCAHeight : oCamera.iFTVCAHeight;
                        break;
                    case "temperature":
                        iWidth = bMereic ? oCamera.iTemperatureWidth : oCamera.iFTTemperatureWidth;
                        iHeight = bMereic ? oCamera.iTemperatureHeight : oCamera.iFTTemperatureHeight;
                        break;
                    case "fire":
                        iWidth = bMereic ? oCamera.iFireWidth : oCamera.iFTFireWidth;
                        iHeight = bMereic ? oCamera.iFireHeight : oCamera.iFTFireHeight;
                        break;
                    case "custom":
                        if ("car" === oCamera.szCustomMode) {
                            iWidth = bMereic ? 0.5 : 1.6;
                            iHeight = bMereic ? 1.8 : 5.9;
                        } else {
                            iWidth = bMereic ? 2.3 : 7.5;
                            iHeight = bMereic ? 2.3 : 7.5;
                        }
                        break;
                }

                if (bMereic) {
                    szTargetInfo += self.$t("objectWidth") + ":" + iWidth + "enter";
                    szTargetInfo += self.$t("objectHeight") + ":" + iHeight;
                } else {
                    szTargetInfo += self.$t("objectWidthFt") + ":" + iWidth + "enter";
                    szTargetInfo += self.$t("objectHeightFt") + ":" + iHeight;
                }

                return szTargetInfo;
            },
            // 组装有效范围信息
            getEffectiveRangeInfo(oCamera) {
                let self = this;
                let szEffectiveRangeInfo = "";
                let iMaxRecognizeDistance;
                let szTypeLan;
                let bMereic = ("mereic" === self.szCurrentStandard);

                switch(oCamera.szParamsType) {
                    case "VCA":
                        szTypeLan = "hikVCA";
                        iMaxRecognizeDistance = bMereic ? oCamera.iVCAMaxDistance : oCamera.iFTVCAMaxDistance;
                        break;
                    case "temperature":
                        szTypeLan = "temperatureAbnormalAlarm";
                        iMaxRecognizeDistance = bMereic ? oCamera.iTemperatureMaxDistance : oCamera.iFTTemperatureMaxDistance;
                        break;
                    case "fire":
                        szTypeLan = "firePointDetection";
                        iMaxRecognizeDistance = bMereic ? oCamera.iFireMaxDistance : oCamera.iFTFireMaxDistance;
                        break;
                    case "custom":
                        szTypeLan = "selfDefine";
                        iMaxRecognizeDistance = bMereic ? oCamera.iCustomMaxDistance : oCamera.iFTCustomMaxDistance;
                        break;
                }

                if ("VCA" === oCamera.szParamsType && "sp" === self.$i18n.locale) {
                    szEffectiveRangeInfo += self.$t("type") + ":" + self.oSpanishLan[szTypeLan] + "enter";
                } else {
                    szEffectiveRangeInfo += self.$t("type") + ":" + self.$t(szTypeLan) + "enter";
                }   
                
                if (bMereic) {
                    if ("sp" === self.$i18n.locale) {//西班牙语的部分字符pdf无法显示
                        szEffectiveRangeInfo += self.oSpanishLan["blindZoneDesc"] + ":" + oCamera.iInstallAngle + "enter";
                    } else {
                        szEffectiveRangeInfo += self.$t("blindZoneDesc") + ":" + oCamera.iInstallAngle + "enter";
                    }
                
                    szEffectiveRangeInfo += self.$t("maxAlarmDistance") + ":" + iMaxRecognizeDistance;
                } else {
                    if ("sp" === self.$i18n.locale) {//西班牙语的部分字符pdf无法显示
                        szEffectiveRangeInfo += self.oSpanishLan["blindZoneDescFt"] + ":" + oCamera.iInstallAngle + "enter";
                    } else {
                        szEffectiveRangeInfo += self.$t("blindZoneDescFt") + ":" + oCamera.iInstallAngle + "enter";
                    }
                    
                    szEffectiveRangeInfo += self.$t("maxAlarmDistanceFt") + ":" + iMaxRecognizeDistance;
                }

                return szEffectiveRangeInfo;
            },
            // 获取需要导出的相机表格数据
            getExportCameraData() {
                let aTbData = [];
                aTbData = this.aCameraList.map((oCamera, iIdx) => {
                    return {
                        iSeq: iIdx + 1,
                        szCameraModel: this.replaceStr(oCamera.szModel),
                        szCameraInfo: this.replaceStr(this.getCameraInfo(oCamera)),
                        szInstallInfo: this.replaceStr(this.getInstallInfo(oCamera)),
                        szTargetInfo: this.replaceStr(this.getTargetInfo(oCamera)),
                        szEffectiveRange: this.replaceStr(this.getEffectiveRangeInfo(oCamera))
                    };
                });
                return aTbData;
            },
            // 确认导出word或pdf
            exportOk() {
                let s = 0;
                function getBase64Image(img) {
                    img.crossOrigin = 'anonymous';
                    var canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, img.width, img.height);
                    
                    var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
                    // console.log(ext)
                    var dataURL = canvas.toDataURL("image/jpeg");
                    return dataURL          
                }
                //递归将要转换的节点中的所有图片的src全部转为base64
                function image2base64() {
                    var image = new Image();
                    image.setAttribute('crossOrigin', 'anonymous');
                    image.src = $("#map img").eq(s).attr('src');
                    image.onload = function() {
                        var base64 = getBase64Image(image);
                        $("#map img").eq(s).attr('src', base64);
                        s++;
                        if (s < $("#map img").length) {
                            image2base64();
                        }
                    }
                }
                // 用于解决谷歌地图下导出图片的问题
                let transform = $(".gm-style>div:first>div:first>div:last>div").css("transform");
                if (transform) {
                    let comp=transform.split(","); //split up the transform matrix
                    let mapleft=parseFloat(comp[4]) ;//get left value
                    let maptop=parseFloat(comp[5]);  //get top value
                    $(".gm-style>div:first>div:first>div:last>div").css({ //get the map container. not sure if stable
                        "transform":"none",
                        "left":mapleft,
                        "top":maptop,
                    })
                }
                this.bFullscreenLoading = true;
                let oDom = "view" === this.oCurrentPlan.szViewType ? document.getElementsByClassName("ol-unselectable")[0] : document.getElementById("map");
                if ("view" === this.oCurrentPlan.szViewType) {
                    this.exportWordOrPdf(oDom);
                } else {
                    image2base64(s);
                    let iTime = 2000;
                    if(!!window.ActiveXObject || "ActiveXObject" in window) {
                         iTime = 8000;
                    } 
                    setTimeout(() => {
                        this.exportWordOrPdf(oDom);
                    }, iTime);
                    
                }
                this.bExportPlan = false;
            },
            // 导出word或PDF的具体逻辑函数
            exportWordOrPdf(oDom) {
                if ("word" === this.oExportInfo.szExportType) {
                    html2canvas(oDom)
                        .then(canvas => {
                            let szImgBase64 = canvas.toDataURL();
                            this.szCanvasImgUrl = szImgBase64;
                            this.oExportWordInfo.aCameraInfo = this.getExportCameraData();
                            $("#test-img").one('load', () => {
                                $("#wordPreview").wordExport(this.oExportInfo.szProjectName);
                            });
                            this.bFullscreenLoading = false;
                        })
                        .catch(err => {
                            this.bFullscreenLoading = false;
                            this.$message.error(this.$t("exportWordError")); 
                        });
                } else {
                    html2canvas(oDom)
                        .then(canvas => {
                            this.createPDF(canvas.toDataURL('image/jpeg', 1));
                        })
                        .catch(error => {
                            this.bFullscreenLoading = false;
                            this.$message.error(this.$t("exportPlanError"));
                        });
                }
            },
            replaceStr: function (str) {
                let szStr = "zh-CN" === this.$i18n.locale ? "" : "-";//中文直接替换成空格，非中文替换成破折号
                return str.replace(/\s+/g, szStr).replace(/enter/g, "\n");
            },
            trimStr: function (str) {
                return str.replace(/(^\s*)|(\s*$)/g, "");//避免非中文情况下用户输入的内容前后有空格，导致出现多余的破折号
            },
            getPDFData() {
                let aData = [{
                    iSeq: this.replaceStr(this.$t("serialNumber")),
                    szCameraModel: this.replaceStr(this.$t("cameraModel")),
                    szCameraInfo: this.replaceStr(this.$t("cameraInfo")),
                    szInstallInfo: this.replaceStr(this.$t("installInfo")),
                    szTargetInfo: this.replaceStr(this.$t("targetInfo")),
                    szEffectiveRange: this.replaceStr(this.$t("effectiveRange"))
                }];
                aData = [...aData, ...this.getExportCameraData()];

                return aData;
            },
            createPDF(dataUrl) {
                let self = this;
                // let oJSPDF = new jsPDF('p', 'px', 'a4');
                let oJSPDF = new jsPDF('p', 'px', [950, 1000]);

                //此处不做语言是否为中文的判断，因为设计项目名称有可能有中文:"zh-CN" === self.$i18n.locale && 
                if (!self.oZhTTF) {
                    self.oZhTTF = require('../../assets/jsPDF/zh.json');
                }

                // 自定义的中文字体是导致无法显示空格的问题的根本原因
                oJSPDF.addFileToVFS('zh.otf', self.oZhTTF.zh);
                oJSPDF.addFont('zh.otf', 'custom', 'normal');
                oJSPDF.setFont('custom');

                
                if (self.oExportInfo.oCustomedImgFile) {
                    // 2.自定义的LOGO:替换默认logo和全球背景
                    oJSPDF.addImage(self.oExportInfo.oCustomedImgFile, 'PNG', 20, 145, 900, 550);//arg3-->距离左边距;arg4-->距离上边距;arg5-->宽度;arg6-->高度
                } else {
                    // 2.LOGO
                    oJSPDF.addImage(szPDFLogo, 'PNG', 260, 145, 400, 52);//arg3-->距离左边距;arg4-->距离上边距;arg5-->宽度;arg6-->高度
                    // 3.全球背景图片
                    // oJSPDF.addImage(szGlobalImgSrc, 'PNG', 20, 250, 900, 500);//arg3-->距离左边距;arg4-->距离上边距;arg5-->宽度;arg6-->高度
                    oJSPDF.addImage(szGlobalSmallImgSrc, 'PNG', 20, 250, 900, 500);//arg3-->距离左边距;arg4-->距离上边距;arg5-->宽度;arg6-->高度
                }

                // 4.项目名称
                oJSPDF.text(225, 840, self.replaceStr(self.$t("projectName")) + ":");
                let szProjectName = self.replaceStr(self.trimStr(self.oExportInfo.szProjectName));
                if (szProjectName && szProjectName.length > 28) {
                    szProjectName = szProjectName.substring(0, 25) + "...";
                }
                oJSPDF.text(425, 840, szProjectName);
                oJSPDF.line(425, 845, 725, 845);
                // 5.项目设计者
                if ("sp" === self.$i18n.locale) {//西班牙语的部分字符pdf无法显示
                    oJSPDF.text(225, 870, self.replaceStr(self.oSpanishLan["projectDesigner"]) + ":");
                } else {
                    oJSPDF.text(225, 870, self.replaceStr(self.$t("projectDesigner")) + ":");
                }
                
                let szProjectDesigner = self.replaceStr(self.trimStr(self.oExportInfo.szProjectDesigner));
                if (szProjectDesigner && szProjectDesigner.length > 28) {
                    szProjectDesigner = szProjectDesigner.substring(0, 25) + "...";
                }
                oJSPDF.text(425, 870, szProjectDesigner);
                oJSPDF.line(425, 875, 725, 875);
                // 6.设计时间
                if ("sp" === self.$i18n.locale) {//西班牙语的部分字符pdf无法显示
                    oJSPDF.text(225, 900, self.replaceStr(self.oSpanishLan["designTime"]) + ":");
                } else {
                    oJSPDF.text(225, 900, self.replaceStr(self.$t("designTime")) + ":");
                }
                
                oJSPDF.text(425, 900, self.replaceStr(oUtils.dateFormat(new Date(), "yyyy-MM-dd")));
                oJSPDF.line(425, 905, 725, 905);
                // 7.插入部署图截图
                oJSPDF.addPage();//重新开一页
                oJSPDF.text(25, 25, self.replaceStr(self.$t("deploymentView")));
                oJSPDF.addImage(dataUrl, 'PNG', 25, 40, 900, 350);//arg3-->距离左边距;arg4-->距离上边距;arg5-->宽度;arg6-->高度
                // 8.设备列表
                oJSPDF.text(30, 500, self.replaceStr(self.$t("device")));
                let aData = self.getPDFData();
                let aColums = [
                    {title: "", dataKey: "iSeq"},
                    {title: "", dataKey: "szCameraModel"},
                    {title: "", dataKey: "szCameraInfo"},
                    {title: "", dataKey: "szInstallInfo"},
                    {title: "", dataKey: "szTargetInfo"},
                    {title: "", dataKey: "szEffectiveRange"}
                ];

                oJSPDF.autoTable(aColums, aData, {
                    showHeader: "never",
                    startX: 0,
                    startY: 530,
                    styles: {
                        font: "custom"
                    }
                });

                if (self.oExportInfo.oCustomedImgFile) {
                }else {
                    // 9.插入免责声明和公司口号公司口号:见远行更远
                    oJSPDF.addPage();//重新开一页
                    // 插入免责声明
                    let iClaimerImgHeight;
                    let szDisclaimerImgSrc;
                    if ("en" === self.$i18n.locale) {
                        szDisclaimerImgSrc = disclaimerEnImgSrc;
                        iClaimerImgHeight = 120;
                    } else if ("zh-CN" === self.$i18n.locale) {
                        szDisclaimerImgSrc = disclaimerZhImgSrc;
                        iClaimerImgHeight = 100;
                    } else if ("fr" === self.$i18n.locale) {
                        szDisclaimerImgSrc = disclaimerFrImgSrc;
                        iClaimerImgHeight = 120;
                    } else if ("ru" === self.$i18n.locale) {
                        szDisclaimerImgSrc = disclaimerRuImgSrc;
                        iClaimerImgHeight = 130;
                    } else if ("it" === self.$i18n.locale) {
                        szDisclaimerImgSrc = disclaimerItImgSrc;
                        iClaimerImgHeight = 120;
                    } else if ("sp" === self.$i18n.locale) {
                        szDisclaimerImgSrc = disclaimerSpImgSrc;
                        iClaimerImgHeight = 110;
                    }
                    // 版权声明
                    oJSPDF.addImage(szDisclaimerImgSrc, 'PNG', 20, 10, 900, iClaimerImgHeight);//arg3-->距离左边距;arg4-->距离上边距;arg5-->宽度;arg6-->高度
                    // oJSPDF.addImage(szSloganImgSrc, 'PNG', 210, 50, 636, 900);//arg3-->距离左边距;arg4-->距离上边距;arg5-->宽度;arg6-->高度
                    oJSPDF.addImage(szSloganSmallImgSrc, 'PNG', 0, 300, 900, 107);//arg3-->距离左边距;arg4-->距离上边距;arg5-->宽度;arg6-->高度
                }


                // 方案名称，如果项目名称为空，则采用方案名称
                let szPDFName = "" === self.oExportInfo.szProjectName ? self.oCurrentPlan.szName : self.oExportInfo.szProjectName;
                szPDFName = self.trimStr(szPDFName);//去掉前后空格

                oJSPDF.save(szPDFName + '.pdf');

                self.bFullscreenLoading = false;
                // 提醒用户导出成功
                self.$message(self.$t("exportPlanOk"));
            }
        }
    }
</script>
