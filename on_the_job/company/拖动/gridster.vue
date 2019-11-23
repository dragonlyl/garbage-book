<template>
    <div class="gridster-outer">
        <div class="gridster">
            <ul>
                <li
                    :data-row="oItem.row"
                    :data-col="oItem.col"
                    :data-sizex="oItem.sizex"
                    :data-sizey="oItem.sizey"
                    :data-id="oItem.index"
                    v-for="oItem in aList"
                    :key="oItem.index"
                >
                    <div class="inner">
                        {{ oItem.content }}
                        <div class="float" @click="remove"></div>
                    </div>
                </li>
            </ul>
            <div class="position-bottom">
                <div class="cell-bottom" :style="{width: bottomCellWidth + 'px',height: bottomCellWidth + 'px'}" v-for="(i,index) in bottomCellNum" :key="index">
                </div>
            </div>
            <div class="button">
                <button @click="addWidget">addWidget</button>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'jquery';
export default {
    name: "",
    components: {},
    data() {
        return {
            gridster: null,
            aList: [
                {
                    row: 1,
                    col: 1,
                    sizex: 1,
                    sizey: 1,
                    index: 1,
                    content: '内容1'
                },
                {
                    row: 2,
                    col: 1,
                    sizex: 1,
                    sizey: 1,
                    index: 2,
                    content: '我是空模块'
                },
            ],
            cellWidthList: [116, 87, 70, 58, 50, 43],
            currentCol: 3,
            changeSize: false,
            bottomCellWidth: 116,
            bottomCellNum: 9
        };
    },
    computed: {},
    watch: {},
    // created() {},
    mounted() {
        this.initGridster();
    },
    methods: {
        remove(event) {
            let dom = null;
            event.path.map(el => {
                console.log(el.classList);
                if (el.classList && el.classList.contains('gs-w')) {
                    dom = el;
                }
                return true;
            });
            console.log(dom);
            let cannotAddEmpty = false;
            if (dom) {
                // 1,3 上面有元素，直接下移就好
                cannotAddEmpty = !this.gridster.is_empty(1, 3);
                this.gridster.remove_widget(dom, false);
            }
            // 不是空就添加空白块
            if (!cannotAddEmpty) {
                this.addEmptyCell();
            }
            this.getCellWidth(this.gridster.get_highest_occupied_cell().col);
            console.log(this.gridster.gridmap);
        },
        addWidget() {
            console.log(this.gridster.next_position(), 'next_psition');
            let content = 'cesss';
            let li = `<li>
                <div class="inner">${content}
                    <div class="float"></div>
                </div>                
            </li>`;
            let a = this.gridster.add_widget(li, 1, 1);
            
            let children = $(a[0]).find(".float")[0];
            a = null;
            if (children) {
                children.addEventListener('click', this.remove);
                children = null;
            }
            this.getCellWidth(this.gridster.get_highest_occupied_cell().col);
            console.log(this.gridster.get_highest_occupied_cell());//坐标轴的最大区域
            // console.log(this.gridster.is_valid_col(4,1)); // 获取第四列是否可使用
            console.log(this.gridster.gridmap);
        },
        getCellWidth(cols = 3) {
            let width = this.cellWidthList[0];
            // if (cols > 8) {
            //     $('.gridster-outer').css('width', '100%');
            //     return false;
            // }
            if (cols > 3) {
                width = this.cellWidthList[cols - 3];
                this.currentCol = cols;
                this.bottomCellNum = cols * 3;
            } else {
                width = this.cellWidthList[0];
                this.currentCol = 3;
                this.bottomCellNum = 9;
            }
            let cssWidth = cols === 8 ? width + 10 : width;
            $('.gridster-outer').css('height', 3 * width + 10)
                .css('width', '100%')
                .css('width', "+=" + cssWidth + 'px');
            console.log($('.gridster-outer .preview-holder'), 'holder');
            $('.gridster-outer .preview-holder').css('height', width).css('width', width);
            this.bottomCellWidth = width;
            
            this.gridster.resize_widget_dimensions({widget_base_dimensions: [width, width]});
        },
        addEmptyCell() {
            if (this.gridster.is_empty(1, 2)) {
                let content = '我是空模块';
                let li = `<li>
                    <div class="inner">${content}
                        <div class="float"></div>
                    </div>                
                </li>`;
                let a = this.gridster.add_widget(li, 1, 1, 1, 2);
                let children = $(a[0]).find(".float")[0];
                a = null;
                if (children) {
                    children.addEventListener('click', this.remove);
                    children = null;
                }
            }
        },
        initGridster() {
            let self = this;
            this.gridster = new Gridster(".gridster ul", {
                widget_base_dimensions: [116, 116], //模块的宽高 [宽,高]
                widget_margins: [1, 1], //模块的间距 [上下,左右]
                max_cols: 8,
                max_rows: 3,
                extra_rows: 0,
                extra_cols: 9,
                avoid_overlapped_widgets: false,
                shift_larger_widgets_down: false,
                shift_widgets_up: true,
                draggable: {
                    start: function (e, ui, $widget) {
                        let obj = self.gridster.get_highest_occupied_cell();
                        console.log(obj)

                    },
                    drag: function (e, ui, $widget) {
                        // console.log(self.gridster.is_player_in(2,2)); // 判断是否经过某一个快
                        // console.log(e,ui)
                        
                        console.log(self.gridster.is_placeholder_in_col(self.currentCol + 1));
                        if (self.gridster.is_placeholder_in_col(self.currentCol + 1)) {
                            if (!self.changeSize) {
                                self.getCellWidth(self.currentCol + 1);
                            }
                            self.changeSize = true;
                        }
                    },
                    stop: function (e, ui, $widget) {
                        // let have = self.gridster.get_widgets_at_cell(1,2);
                        // if(!have.length) {
                        self.addEmptyCell();
                        self.changeSize = false;
                        // console.log(self.gridster.is_placeholder_in_col(2));//放置的是否在具体某一列
                        // console.log(self.gridster.is_placeholder_in(2,2));
                        // let list = self.gridster.get_widgets_from(1, 1);// 获取所有的块
                        // console.log(self.gridster.widgets_constraints(list)); // 获取能向上移动的块
                        self.getCellWidth(self.gridster.get_highest_occupied_cell().col);
                        console.log(self.gridster.gridmap);
                    }
                    
                },
                on_start_drag: {},
                // shift_widgets_up: false,
                // shift_larger_widgets_down: false,
                collision: {
                    wait_for_mouseup: true
                    // on_overlap_start: function(data) {
                    // },
                    // on_overlap: function(data) {
                    // },
                    // on_overlap_stop: function(data) {
                    // },
                    // on_overlapped_column_change: function() {
                    // }
                }
            });
            // this.gridster.$el.on('mouseenter','.inner',(e)=>{
            // })
            console.log(this.gridster);
        }
    }
};
</script>

<style lang='scss'>
.gridster-outer {
    box-sizing: border-box;
    // padding: 24px;
    padding-left: 24px;
    padding-top: 24px;
    width: calc(100% + 110px);
    // height: 100%;
    height: 370px;
    .gridster{
        &.dragging {
            .position-bottom {
                display: block;
            }
        }
        ul {
            // background-color: #EFEFEF;
            // background-color: transparent;
            // height: 352px !important;
            position: absolute !important;
            list-style-type: none;
        }
        li {
            font-size: 1em;
            font-weight: bold;
            text-align: center;
            line-height: 100%;
            .inner{
                width: 100%;
                height: 100%;
                position: relative;
                .float {
                    width:20px;
                    height:20px;
                    position:absolute;
                    top:0;
                    right:0;
                    background:black;
                    display:none;
                }
                &:hover {
                    position: relative;
                    z-index: 50;
                    .float {
                        display: block;
                        z-index: 100;
                    }
                }
            }
        }
        .gs-w {
        // 原本颜色
            background: #61A9CF;
            cursor: pointer;
            -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        }
        .player {
            // 移动颜色
            -webkit-box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
            box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
            background: #BBB;
        }
        //   .gs-w.try {
        //     // background-image: url('../assets/sprite.png');
        //     background-color: blue !important;
        //     // background-repeat: no-repeat;
        //     // background-position: 37px -169px;
        //   }
          .preview-holder {
            border: none !important;
            border-radius: 0 !important;
            background: blue !important;
          }
        .position-bottom {
            top: 0;
            left: 0;
            // display: none;
            width: 357px;
            height: 352px;
            font-size: 0;
            border-top: 1px dashed #CACACC;
            border-left: 1px dashed #CACACC;
            
            .cell-bottom {
                display: inline-block;
                width: 116px;
                height: 116px;
                border-right: 1px dashed #CACACC;
                border-bottom: 1px dashed #CACACC;
            }
        }
        .button {
            position: absolute;
            top: 300px
        }
    }
}

.gridster-box {
    position: relative;
    width: 100%;
    height: 100%;
}
.controls {
    margin-bottom: 20px;
}
</style>
