<template>
  <div v-loading="loading">
    <div
      style="margin: 30px 260px;font-size: 16px;font-weight: bold;color: #333333;"
    >{{$t("schedule_meeting")}}</div>
    <div class="ditailbox">
      <el-form
        ref="form"
        label-position="left"
        :model="param"
        label-width="154px"
        :rules="addRules"
      >
        <el-form-item :label="$t('meetingName')" required prop="topic">
          <!-- <el-input v-model="param.topic"></el-input> -->
          <el-input type="textarea" :rows="1" :count="200" :maxlength="200" v-model="param.topic"></el-input>
        </el-form-item>
        <el-form-item :label="$t('meeting_content')">
          <el-input type="textarea" :rows="4" :count="1000" v-model="param.content"></el-input>
        </el-form-item>
        <el-form-item :label="$t('meetingDate')" required>
          <el-date-picker
            type="date"
            :placeholder="$t('select_date')"
            v-model="form.date1"
            :picker-options="pickerOptions"
            :format="szWeek"
            style="width: 240px;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('meetingDZ')" required>
          <el-select
            v-model="param.placeId"
            style="width: 240px;"
            :placeholder="$t('select_meeting_place')"
          >
            <el-option
              v-for="(item, index) in items"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('meetingRoom')" required>
          <el-select
            v-model="param.roomId"
            style="width: 240px;"
            :placeholder="$t('select_meeting_place')"
          >
            <el-option
              v-for="(item, index) in oPlaces"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-button type="default" @click="clickdemo" id="selectMeeting">{{$t('Select_free_room')}}</el-button>
        </el-form-item>
        <el-form-item :label="$t('meetingTime')" required>
          <el-time-picker
            is-range
            v-model="form.value4"
            :start-placeholder="$t('starting_time')"
            :end-placeholder="$t('end_time')"
            format="HH:mm"
          />
        </el-form-item>
        <el-form-item :label="$t('conference_staff')" required>
          <div class="div-textarea" @click="txtContainerClick">
            <el-tag
              class="textarea-tag"
              v-for="(item, index) in aTextareaTag"
              :key="index"
              :closable="true"
              type="primary"
              @close.stop="closeTags(index)"
            >{{item.id}}</el-tag>
            <el-autocomplete
              class="textarea-input"
              v-model.trim="form.textarea"
              :fetch-suggestions="querySearch"
              :clear-icon-click="clearSearch"
              @visible="handleSelect"
              @select="textareaSelected"
              kind="surface"
              ref="textareaIpt"
            ></el-autocomplete>
          </div>
        </el-form-item>
        <el-form-item :label="$t('Cc_personnel')">
          <div class="div-textarea" @click="txtCpoyContainerClick">
            <el-tag
              class="textarea-tag"
              v-for="(item, index) in aTextCopyareaTag"
              :key="index"
              :closable="true"
              type="primary"
              @close.stop="closeCopyTags(index)"
            >{{item.id}}</el-tag>
            <el-autocomplete
              class="textarea-input"
              v-model.trim="form.textcopyarea"
              :fetch-suggestions="queryCopySearch"
              :clear-icon-click="clearSearch"
              @visible="handleSelect"
              @select="textCopyareaSelected"
              kind="surface"
              ref="textcopyareaIpt"
            ></el-autocomplete>
          </div>
          <!-- <input type="text" placeholder="请输入..." v-model="searchVal"> -->
        </el-form-item>
        <el-form-item :label="$t('compere')" required>
          <el-select style="width: 240px;" v-model="param.moderatorId" :placeholder="$t('compere')">
            <el-option
              v-for="(item, index) in aTextareaTag"
              :key="index"
              :label="item.id"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('notekeeper')" required>
          <el-select
            style="width: 240px;"
            v-model="param.recorderId"
            :placeholder="$t('notekeeper')"
          >
            <el-option
              v-for="(item,index) in aTextareaTag"
              :key="index"
              :label="item.id"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('meeting_material')">
          <!-- <el-upload
            class="upload-demo"
            :action="url"
            :on-success="submit"
            :on-remove="remove"
            :file-list="fileList"
          >
            <el-button type="default">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">最大支持200M</div>
          </el-upload>-->
          <el-button class="upload-btn" type="default" @click="fileUpload">{{$t("file_upload")}}</el-button>
          <div id="fileUploadBtn" ref="bookFileUploadBtn"></div>
          <!-- <div v-for="(item,index) in resourceGuidData" :key="index">
            <a :href="testUrl+item.id+'?'+szJWT">{{item.name}}</a>
            <a @click="remove(item,resourceGuidData)">--删除</a>
          </div>-->

          <div class="file-container">
            <div class="file-box" v-for="(item, maxIndex) in resourceGuidData" :key="maxIndex">
              <i class="h-icon-details"></i>
              <a :href="testUrl+item.id+'?'+szJWT">{{item.name}}</a>
              <i class="h-icon-tip_error" @click="remove(item, resourceGuidData)"></i>
            </div>
          </div>
        </el-form-item>
        <el-form-item :label="$t('change_reason')" v-if="bReasonShow">
          <el-input
            type="textarea"
            :rows="1"
            :count="500"
            :maxlength="500"
            v-model="szChangeReason"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveParam">{{$t("submit_applications")}}</el-button>
          <el-button type="default" @click="cancel">{{$t("cancel")}}</el-button>
        </el-form-item>

        <com-addMDialog
          :bOpenBookingPlan.sync="bBookingPlan"
          :placeOption="items"
          :placeId="param.placeId"
          :meetingDate="form.date1"
          @certain="reveivePlan"
        ></com-addMDialog>
      </el-form>
    </div>
  </div>
</template>
<script>
import oUtils from "lib/utils";
import oWebSdk from "@api/websdk";
import oCommon from "@lib/common";
import $ from "jquery";
import oStatusCode from "@api/statuscode";
import oWebSession from "@lib/websession";
import bookingplan from "pages/booking/bookingPlan";
import bookingInfo from "pages/booking/bookingInfo.js";
import oWebuploader from "pages/booking/webuploader.js";
import { mapState } from "vuex";

export default {
  data: function() {
    let validateAddMCUmcuName = (rule, value, callback) => {
      let self = this;
      if (oUtils.isEmpty(value)) {
        callback(new Error(self.$t("input_topic")));
      } else if (oUtils.isSpecChar(value)) {
        callback(new Error(self.$t("wrong_topic")));
      } else if (value.length > 200) {
        callback(new Error(self.$t("limit_the_length_of_the_topic")));
      } else {
        callback();
      }
    };
    return {
      pickerOptions: {
        disabledDate(time) {
          let curDate = new Date().getTime();
          let one = 30 * 24 * 3600 * 1000;
          let oneMonths = curDate + one;
          return (
            time.getTime() < Date.now() - 8.64e7 || time.getTime() > oneMonths
          );
        }
      },
      szJWT: "",
      aTest: ["test"],
      loading: false,
      testUrl: "",
      // 添加MCU规则
      addRules: {
        topic: [
          {
            validator: validateAddMCUmcuName,
            trigger: "blur,change"
          }
        ]
      },
      // textarea-start
      aTextareaSearch: [],
      aTextCopyareaSearch: [],
      url: "",
      aTextareaTag: [],
      aTextCopyareaTag: [],
      searchVal: "",
      test: 60,
      week: [],
      checkedDays: [],
      currentPlanType: 1,
      roomInfoList: [],
      rangeData: [],
      customRangeColor: {
        "1": "#4390FA"
      },
      focus: 0,
      isPopoverShow: false,
      checkAll: false,
      isIndeterminate: false,
      searchVal: "",
      bBookingPlan: false,
      fileList: [],
      items: [],
      region: "",
      regions: "",
      oPlaces: [],
      form: {
        name: "",
        date1: new Date(),
        textarea: "",
        value4: [+new Date() + 15 * 60 * 1000, +new Date() + 75 * 60 * 1000]
      },
      resourceGuidData: [],
      param: {
        topic: "",
        content: "",
        startTime: " 00:00",
        endTime: " 23:00",
        placeId: "",
        roomId: "",
        participantIdList: [], //会议人员ID列表
        initiatorId: "", //发起人ID
        recorderId: "", //记录人ID
        moderatorId: "", //主持人ID
        resourceGuidList: [], //会议资料Guid列表
        copyParticipantIdList: [] //抄送人员ID列表
      },
      emailistate: false,
      iMId: "",
      szStatus: "",
      szWeek: "",
      bReasonShow: false,
      szChangeReason: ""
    };
  },
  props: {
    bOpenBookingPlan: {
      type: Boolean
    }
  },
  components: {
    "com-addMDialog": bookingplan
  },
  computed: {
    newPlaceId() {
      return this.param.placeId;
    },
    ...mapState({
      row: state => {
        let val = state.myMeeting.oRow;
        if (val && val.routeType === "modify") {
          console.log("有数据");
          return val;
        }
      }
    })
  },
  watch: {
    // 搜索框清除，重新加载
    newPlaceId: function(val) {
      if (val) {
        this.getMeetingPlaceId(val);
      }
    },
    "form.date1": {
      handler: function(val) {
        let value = val;
        if (typeof val === "string") {
          value = new Date(val);
        }
        let number = "7123456".charAt(value.getDay());
        //检测多语言
        let szLan = $.cookie("language") || "zh-CN";
        if (szLan === "zh-CN") {
          this.szWeek = "yyyy 年 MM 月 dd 日 ";
          let self = this;
          switch (number) {
            case "1":
              this.szWeek += self.$t("Monday");
              break;
            case "2":
              this.szWeek += self.$t("Tuesday");
              break;
            case "3":
              this.szWeek += self.$t("Wednesday");
              break;
            case "4":
              this.szWeek += self.$t("Thursday");
              break;
            case "5":
              this.szWeek += self.$t("Friday");
              break;
            case "6":
              this.szWeek += self.$t("Saturday");
              break;
            case "7":
              this.szWeek += self.$t("Sunday");
              break;
            default:
              break;
          }
        } else {
          this.szWeek = "yyyy / MM / dd  ";
        }
      },
      immediate: true
    }
  },
  methods: {
    submit(file) {
      this.param.resourceGuidList.push(file.data.fileGuid);
    },
    remove(file, fileList) {
      let self = this;
      var index = this.param.resourceGuidList.indexOf(file.id);
      if (index > -1) {
        let oParams = {
          fileInfoRequest: {
            fileRequestIdList: [
              {
                id: file.id
              }
            ]
          }
        };
        oWebSdk
          .WSDK_GetDeviceConfig("deleteFileData", null, {
            data: oParams,
            async: false
          })
          .then(
            function(data, status) {
              if (data.code == "00-0000") {
                fileList.splice(index, 1);
                self.param.resourceGuidList.splice(index, 1);
              } else {
                oStatusCode.CODE_check(data.code, self);
              }
            },
            function(data) {
              if (!data) {
                oUtils.notificationConstructor(
                  self,
                  self.$t("error"),
                  self.$t("error_in_network_connection"),
                  "error"
                );
                return;
              }
              oStatusCode.CODE_check(data.code, self);
            }
          );
      }
    },
    //textarea-start
    txtContainerClick() {
      this.$refs.textareaIpt.$el.querySelector("input").focus();
    },
    txtCpoyContainerClick() {
      this.$refs.textcopyareaIpt.$el.querySelector("input").focus();
    },
    querySearch(queryString, callback) {
      this.getPeople(callback);
    },
    queryCopySearch(queryString, callback) {
      this.getCopyPeople(callback);
    },
    handleSelect(val) {
      //输入框聚焦和失焦事件
      //val: true/false
    },
    clearSearch() {
      //点击输入删除输入内容事件
    },
    textareaSelected(val) {
      //选中模糊查询下拉触发事件
      this.aTextareaTag.push({
        id: val.value,
        name: val.address
      });
      this.form.textarea = "";
      if (!this.param.moderatorId) {
        //默认主持人、记录人
        if (this.aTextareaTag.length > 0) {
          this.param.moderatorId = this.aTextareaTag[0].name;
          this.param.recorderId = this.aTextareaTag[0].name;
        }
      }
    },
    textCopyareaSelected(val) {
      //选中模糊查询下拉触发事件
      this.aTextCopyareaTag.push({
        id: val.value,
        name: val.address
      });
      this.form.textcopyarea = "";
    },
    closeTags(val) {
      //标签点击删除事件
      //主持人
      if (this.param.moderatorId === this.aTextareaTag[val].name) {
        this.param.moderatorId = "";
      }
      //记录人
      if (this.param.recorderId === this.aTextareaTag[val].name) {
        this.param.recorderId = "";
      }
      this.aTextareaTag.splice(val, 1);
      //默认主持人、记录人
      if (this.aTextareaTag.length > 0) {
        this.param.moderatorId = this.aTextareaTag[0].name;
        this.param.recorderId = this.aTextareaTag[0].name;
      }
      return;
    },
    closeCopyTags(val) {
      //标签点击删除事件
      this.aTextCopyareaTag.splice(val, 1);
      return;
    },
    getPeople(callback) {
      let val = this.form.textarea;
      this.aTextareaSearch.length = 0;
      bookingInfo.getPeopleInfo(val, this).then(data => {
        if (data && data.length > 0) {
          data.forEach(item => {
            let temp = true;
            this.aTextareaTag.map(items => {
              if (items.name == item.uid) {
                temp = false;
              }
            });

            if (temp) {
              this.aTextareaSearch.push({
                value: item.uName,
                address: item.uid + ""
              });
            }
          });
        }
        if (callback) {
          callback(this.aTextareaSearch);
        } else {
          //获取用户名
          let szUserName = oWebSession.getItem("userName");
          let aResult;
          data.forEach(v => {
            if (v.uName === szUserName) {
              aResult = {
                id: v.uName,
                name: v.uid
              };
            }
          });
          if (aResult) {
            if (!aResult.id) {
              //发起人不参与会议中
              aResult = {
                id: data[0].uName,
                name: data[0].uid
              };
            }
            this.aTextareaTag.push(aResult);
            this.param.moderatorId = this.aTextareaTag[0].name;
            this.param.recorderId = this.aTextareaTag[0].name;
          }
        }
      });
    },
    getCopyPeople(callback) {
      let val = this.form.textcopyarea;
      this.aTextCopyareaSearch = [];
      bookingInfo.getPeopleInfo(val).then(data => {
        if (data && data.length > 0) {
          data.forEach(item => {
            let temp = true;
            this.aTextCopyareaTag.map(items => {
              if (items.name == item.uid) {
                temp = false;
              }
            });
            if (temp) {
              this.aTextCopyareaSearch.push({
                value: item.uName,
                address: item.uid + ""
              });
            }
          });
        }
        if (callback) {
          callback(this.aTextCopyareaSearch);
        }
      });
    },
    // 获取会议室地点
    getMeetingPlace() {
      let _this = this;
      _this.items.length = 0;
      _this.regions = "";
      bookingInfo.getMeetingPlace(_this).then(data => {
        if (data && data.length > 0) {
          _this.items = data;
          if (!_this.param.placeId) {
            // _this.param.placeId = data[0].id;
            //判断是否有默认值
            let defaultMeetingLocation = $.cookie("meetingLocationSelect");
            console.log(defaultMeetingLocation, "会议地点cookie");
            let bResult = data.some(item => {
              return defaultMeetingLocation === item.id;
            });
            _this.param.placeId = bResult ? defaultMeetingLocation : data[0].id;
          }
        }
      });
    },
    // 获取会议地点下的会议室
    getMeetingPlaceId(val) {
      let _this = this;
      _this.oPlaces.length = 0;
      _this.region = "";
      bookingInfo.getMeetingPlaceId(val, _this).then(data => {
        if (data && data.length > 0) {
          _this.oPlaces = data;
          //判断已选值是否在获取地点中
          if (_this.param.roomId) {
            let bResult = data.some(item => {
              return this.param.roomId === item.id;
            });
            if (!bResult) {
              _this.param.roomId = "";
            }
          }
          if (!_this.param.roomId) {
            //判断是否有默认值
            let defaultMeetingRoom = $.cookie("meetingRoomSelect");
            console.log(defaultMeetingRoom, "会议室cookie");
            let bResult = data.some(item => {
              return defaultMeetingRoom === item.id;
            });
            _this.param.roomId = bResult ? defaultMeetingRoom : data[0].id;
          }
        } else {
          _this.param.roomId = "";
        }
      });
    },
    getMeetingList(val) {
      bookingInfo.getMeetingList(this).then(data => {
        if (data) {
          this.roomInfoList = bookingInfo.roomInfoList;
          this.rangeData = bookingInfo.rangeData;
        }
      });
    },
    clickdemo() {
      let self = this;
      self.bBookingPlan = true;
      //   self.getMeetingList(self).then(() => {
      //     self.bBookingPlan = true;
      //   });
    },
    formartDate(param) {
      // let date = param;
      let date = new Date(param);
      let Y = date.getFullYear() + "-";
      let M =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1) + "-"
          : date.getMonth() + 1 + "-";
      let D =
        date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + " ";
      return Y + M + D;
    },
    formartTime(param) {
      // let date = param;
      let date = new Date(param);
      let h =
        date.getHours() < 10
          ? "0" + date.getHours() + ":"
          : date.getHours() + ":";
      let m =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      return h + m;
    },
    //文件上传
    fileUpload() {
      this.$refs.bookFileUploadBtn.querySelector("input").click();
    },
    //提交申请
    saveParam() {
      let self = this;
      if (!this.param.topic) {
        oUtils.notificationConstructor(
          self,
          self.$t("failed"),
          self.$t("input_topic"),
          "error",
          2000
        );
        return;
      }
      if (!this.form.date1) {
        oUtils.notificationConstructor(
          self,
          self.$t("failed"),
          self.$t("select_meeting_data"),
          "error",
          2000
        );
        return;
      }
      if (!this.param.roomId) {
        oUtils.notificationConstructor(
          self,
          self.$t("failed"),
          self.$t("select_meeting_room"),
          "error",
          2000
        );
        return;
      }
      if (!this.form.value4) {
        oUtils.notificationConstructor(
          self,
          self.$t("failed"),
          self.$t("select_meeting_time"),
          "error",
          2000
        );
        return;
      }
      let bookingTime = +this.form.value4[1] - +this.form.value4[0];
      let timeLimit = 15 * 60 * 1000;
      if (!(bookingTime > timeLimit)) {
        oUtils.notificationConstructor(
          self,
          self.$t("failed"),
          self.$t("meeting_time_least"),
          "error",
          2000
        );
        return;
      }
      if (this.aTextareaTag.length === 0) {
        oUtils.notificationConstructor(
          self,
          self.$t("failed"),
          self.$t("select_meeting_person"),
          "error",
          2000
        );
        return;
      }
      if (!this.param.moderatorId && this.param.moderatorId !== 0) {
        oUtils.notificationConstructor(
          self,
          self.$t("failed"),
          self.$t("select_meeting_host"),
          "error",
          2000
        );
        return;
      }
      if (!this.param.recorderId && this.param.recorderId !== 0) {
        oUtils.notificationConstructor(
          self,
          self.$t("failed"),
          self.$t("select_meeting_recorder"),
          "error",
          2000
        );
        return;
      }
      let szUID = oWebSession.getItem("UID");
      this.param.initiatorId = szUID;
      this.formartDate(this.form.date1) + this.formartTime(this.form.value4[0]);
      this.param.startTime =
        this.formartDate(this.form.date1) +
        this.formartTime(this.form.value4[0]);
      this.param.endTime =
        this.formartDate(this.form.date1) +
        this.formartTime(this.form.value4[1]);
      this.param.participantIdList = [];
      this.param.copyParticipantIdList = [];
      this.aTextareaTag.forEach(item => {
        this.param.participantIdList.push(item.name);
      });
      this.aTextCopyareaTag.forEach(item => {
        this.param.copyParticipantIdList.push(item.name);
      });
      //  this.param.resourceGuidList = [];
      //变更理由
      if (this.bReasonShow) {
        this.param.reason = this.szChangeReason;
      }
      Object.assign(bookingInfo.param, this.param);
      //会议冲突判断
      bookingInfo.meetingConflict(this).then(response => {
        if (response) {
          if ((this.iMId || this.iMId === 0) && !this.szStatus) {
            //修改会议
            bookingInfo.operatMeeting(this);
          } else {
            //提交申请
            bookingInfo.setMeetInfo(this);
          }
        }
      });
    },
    cancel() {
      //清空修改详情带来的数据
      this.$store.commit("saveRowData", "");
      //显示我的会议
      this.$store.commit("meetingTitleHide", "");
      this.$router.push({
        name: "myMeeting",
        params: {
          iMId: this.iMId
        }
      });
    },
    //上传文件
    // 替换字符串中的占位符，{0}
    stringFormat(arg1, arg2) {
      return oUtils.replaceStr(arg1, arg2);
    },
    //上传文件回调
    upLoadRecive(data) {
      console.log(data);
      if (data) {
        this.loading = false;
        //超出文件大小限制
        if (data === "F_EXCEED_SIZE") {
          oUtils.notificationConstructor(
            this,
            this.$t("error"),
            this.$t("file_exceeds_limit"),
            "error"
          );
          return;
        }
        //错误码
        if (data.code) {
          oStatusCode.CODE_check(data.code, this);
          return;
        }
        this.resourceGuidData.push(data);
        this.param.resourceGuidList.push(data.id);
      } else {
        this.loading = false;
        oUtils.notificationConstructor(
          this,
          this.$t("error"),
          "上传失败",
          "error"
        );
      }
    },
    //获取文件名称
    getFileName(v) {
      let self = this;
      let fileRequest = [];
      v.forEach(val => {
        fileRequest.push({
          id: val
        });
      });
      let oParams = {
        fileInfoRequest: {
          fileRequestIdList: fileRequest
        }
      };

      let fileName = [];
      oWebSdk
        .WSDK_GetDeviceConfig("getFileData", null, {
          data: oParams,
          async: false
        })
        .then(
          function(data, status) {
            if (data.code == "00-0000") {
              console.log(data, "获取的文件信息");
              data.data.fileInfoResponse.forEach(v => {
                fileName.push({
                  name: v.fileName,
                  id: v.fileId
                });
              });
            } else {
              oStatusCode.CODE_check(data.code, self);
            }
          },
          function(data) {
            if (!data) {
              oUtils.notificationConstructor(
                self,
                self.$t("error"),
                self.$t("error_in_network_connection"),
                "error"
              );
              return;
            }
            oStatusCode.CODE_check(data.code, self);
          }
        );
      return fileName;
    },
    //删除文件
    deleteFileName(value, index) {
      let self = this;
      let oParams = {
        fileInfoRequest: {
          fileRequestIdList: [
            {
              id: value
            }
          ]
        }
      };

      oWebSdk
        .WSDK_GetDeviceConfig("deleteFileData", null, {
          data: oParams,
          async: false
        })
        .then(
          function(data, status) {
            if (data.code == "00-0000") {
              self.aTest.splice(index, 1);
              oUtils.notificationConstructor(
                self,
                self.$t("success"),
                self.$t("successful_operation"),
                "success"
              );
            } else {
              oStatusCode.CODE_check(data.code, self);
            }
          },
          function(data) {
            if (!data) {
              oUtils.notificationConstructor(
                self,
                self.$t("error"),
                self.$t("error_in_network_connection"),
                "error"
              );
              return;
            }
            oStatusCode.CODE_check(data.code, self);
          }
        );
    },
    //数据整合
    dataForm(val) {
      let oValue = val || this.row;
      this.bReasonShow = true;
      oValue.placeId = oValue.placeInfo.id;
      oValue.roomId = oValue.roomSimpleInfo.id;
      // 会议人员
      let partiArr = [];
      if (oValue.participantList.length > 0) {
        oValue.participantList.forEach(v => {
          partiArr.push({
            name: v.id,
            id: v.name
          });
        });
      }
      this.aTextareaTag = partiArr;
      // 抄送人员
      let copyArr = [];
      if (oValue.copyParticipantList.length > 0) {
        oValue.copyParticipantList.forEach(v => {
          copyArr.push({
            name: v.id,
            id: v.name
          });
        });
      }
      this.aTextCopyareaTag = copyArr;
      //主持人
      oValue.moderatorId = oValue.moderator.id;
      //记录人
      oValue.recorderId = oValue.recorder.id;
      //会议日期
      let szStartDate = oValue.startTime.slice(0, 10);
      this.form.date1 = szStartDate;
      //会议时间
      this.form.value4 = [new Date(oValue.startTime), new Date(oValue.endTime)];
      //上传文件
      let fileArr = [];
      if (oValue.resourceGuidList && !this.szStatus) {
        this.resourceGuidData = [];
        this.getFileName(oValue.resourceGuidList).forEach(v => {
          this.resourceGuidData.push(v);
          fileArr.push(v.id);
        });
      }
      oValue.resourceGuidList = fileArr;
      this.param = JSON.parse(JSON.stringify(oValue));
    },
    //选择会议室后赋值
    reveivePlan(planObj) {
      this.form.date1 = new Date(...planObj.date);
      this.param.roomId = planObj.id;
      this.form.value4 = [
        new Date(...planObj.date, ...planObj.startTime),
        new Date(...planObj.date, ...planObj.endTime)
      ];
    }
  },
  mounted() {
    oWebuploader.initWebUploader(this, this.upLoadRecive);
    this.getMeetingPlace();
    this.szUID = oWebSession.getItem("UID") + "";
    this.param.initiatorId = this.szUID;
    let szJWT = oWebSession.getItem("JWT");
    this.szJWT = szJWT;

    //点击下载测试
    this.testUrl =
      "http://" + oCommon.m_szHostName + "/api/hikinspire/v1/meeting/download/"; //C8B7D1F9E5C000012A841FE010A0EC50?" +
    //szJWT;

    this.url = `${oCommon.m_szHttpProtocol}${oCommon.m_szHostName}/api/hikinspire/v1/fileManagement/webFileWholeUpload?${szJWT}`;
    //获取iMId
    this.iMId = this.$route.params.iMId;
    //获取会议状态(针对已取消/重新预定)
    this.szStatus = this.$route.params.status;
    //获取路由传参
    let oRouteData = this.$route.params.routeData;
    //整合修改数据
    if (this.row) {
      this.dataForm();
    } else if (oRouteData) {
      this.dataForm(oRouteData.meetingDetail);
    } else {
      //获取会议人员
      this.getPeople();
      //获取抄送人员
      this.getCopyPeople();
    }
  }
};
</script>
<style scoped>
.el-range-editor {
  width: 320px;
}
.el-textarea.is-count {
  padding-bottom: 24px;
  border: 1px solid #b3b3b3;
  border-radius: 2px;
}
.el-input--width {
  width: 240px;
}
.el-textarea--height {
  height: 92px;
}
.h-plan-group {
  background-color: #edf4fc;
}
.div-textarea {
  /* width: 789px; */
  min-height: 70px;
  border: 1px solid #b3b3b3;
  padding: 10px;
}
.textarea-tag {
  margin-right: 10px;
}
#fileUploadBtn {
  display: none;
}
#rt_rt_1dsr8jn6oke11ampmmr19vi1flf1 {
  width: 100%;
  height: 100%;
}
.webUploader-box::after {
  display: block;
  content: "";
  clear: both;
}
.webUploader-btn {
  float: left;
  margin-right: 20px;
}
.file-box {
  min-width: 80px;
  height: 32px;
  line-height: 32px;
  padding: 0 10px;
  background: #f2f2f2;
  border-radius: 2px;
  float: left;
  margin-right: 16px;
  margin-bottom: 10px;
}
.file-box a {
  cursor: pointer;
}
.file-box a,
.file-box .h-icon-details,
.file-box .h-icon-tip_error {
  vertical-align: middle;
}
.h-icon-details {
  font-size: 20px;
}
.h-icon-tip_error {
  font-size: 22px;
  color: #c9c9c9;
  margin-left: 6px;
  cursor: pointer;
}
.upload-btn {
  float: left;
  margin-right: 20px;
}
</style> 

