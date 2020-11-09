<template>
    <div class="container">
        <!-- 账号单独一行
        input一行加底部border
        带颜色的登录按钮 -->
        <div class="login-container">
            <div class="input-floor">
                <p class="key">账号</p>
                <input type="text" placeholder="输入账号" placeholder-style='color: #B7BDC4;'>
            </div>
            <div class="input-floor">
                <p class="key">密码</p>
                <input type="text" placeholder="输入密码" placeholder-style='color: #B7BDC4;'>
            </div>
            <div class="login-btn blue">
                登录
            </div>
        </div>
        
        <!-- 搜索栏 -->
        <div class="search-wrapper">
          <div class="search-block" @click="routerChange(0)">
            <img src="/static/images/icon-search.png" class="icon"/>
            <span class="txt">搜索商品</span>
          </div>
        </div>
        <!-- tab搜索栏 -->
        <div class="tab-wrapper">
            <div class="tab-item" v-for="item in aTabList" :key="item.value" @click="changeTab(item)">
                <span class="key" :class="{active: iTab === item.value}">
                    {{item.name}}
                </span>
            </div>
        </div>
        底部两个btn
        <div class="footer">
            <div class="btn">
                拒绝签章
            </div>
            <div class="btn blue">
                同意签章
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            // 待审批 , 已审核
            iTab: 1,
            aTabList: [
                {name: '待审批',value: 1},
                {name: '已审批',value: 2}
            ]
        };
    },
    computed: {
    },
    methods: {
        goTag(item) {
            let id = item && item.id
            if (!id) {
                id = this.iconList[0].id;
            }
            Core.Util.reLaunchGo(`/pages/商品分类/main?id=${id}`);
        },
        routerChange(i) {
            let arr = ['搜索', '购物车'];
            Core.Util.go(`/pages/p_shop/${arr[i]}/main`);
        },
        changeTab(item) {
            this.iTab = item.value;
        }
     
    },
    onPullDownRefresh() {
        wx.showLoading({
            title: '加载中'
        });
        setTimeout(() => {
            wx.stopPullDownRefresh();
            wx.hideLoading();
        }, 500);
    },
    onShow() {
      
    },
    onLoad() {
    },
    // 刷新模板 添加配置
    // "enablePullDownRefresh": true,
    onPullDownRefresh() {
        wx.showLoading({
            title: '加载中'
        });
        setTimeout(() => {
            wx.stopPullDownRefresh();
            wx.hideLoading();
        }, 500);
    },
    onReachBottom () {
        if (this.bCanLoad) {
            this.iCurrentPage++;
            this.bCanLoad = false;
        }
    },
  };

</script>
<style lang="scss" scoped>
.login-container {
    margin-top: 132px;
    background-color: #fff;
    height: calc(100vh - 132px);
    width: 100%;
    position: relative;
    z-index: 10;
    border-radius: 24px;
    padding: 40px 30px 0;
    box-sizing: border-box;
    .input-floor {
        .key {
            font-size: 14px;
            color: #34373B;
            letter-spacing: 0;
            margin-bottom: 14px;
        }
        input {
            font-size: 16px;
            padding-bottom: 15px;
            letter-spacing: 0;
            margin-bottom: 20px;
            border-bottom: 1px #f2f3f4 solid;
        }
    }
    .login-btn {
        text-align: center;
        font-size: 16px;
        border-radius: 3px;
        padding: 11px 0;
        color: #FFFFFF;
        &.blue {
            background-color: #1C5BB8;
        }
        &.green {
            background-color: #1CB8A2;
        }
    }

}
.search-search {
    padding: 6px 10px 12px;
    // .my-search {
    .search-block {
        vertical-align: middle;
        width: 100%;
        background: #FFFFFF;
        border-radius: 17px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 32px;

        .icon {
            width: 16px;
            height: 16px;
        }
        .txt {
            font-size: 14px;
            color: #90949A;
            margin-left: 6px;
        }
    }
}

.tab-wrapper {
    height: 40px;
    display: flex;
    .tab-item {
        text-align: center;
        flex: 1;
        @include after-border-right (#DBDFE6,5px ,5px);
        .key {
            font-size: 14px;
            padding-bottom: 7px;
            letter-spacing: 0;
            line-height: 40px;
            text-align: center;
            &.active {
                color: #1C5BB8;
                border-bottom: 3px solid #1C5BB8;
            }
        }
    }
}

.footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    background-color: #fff;
    padding: 10px 14px 0;
    .btn {
        width: calc(50% - 5px);
        display: inline-block;
        text-align: center;
        padding: 9px 0;
        vertical-align: middle;
        font-size: 16px;
        color: #34373B;
        border-radius: 3px;
        box-sizing: border-box;
        border: 1px solid #CFD2D9;
        &.blue {
            color: #FFFFFF;
            border-color: transparent;
            background-color: #1C5BB8;
        }
        &+.btn {
            margin-left: 9px;
        }
    }
}
</style>