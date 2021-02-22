console.log('Griffpatch Scratch Developer Tools Extension Handler');

function initGUI() {
    let find, findInp, ddOut, dd, wksp, offsetX, offsetY;
/*
    function setScTitleColor(){
        var titleColor = document.getElementById("sc_sty_tit").value;
        document.getElementsByClassName("gui_menu-bar-position_6ejza menu-bar_menu-bar_1gLUp box_box_tWy-0").style=titleColor;
    }
*/
    function getWorkspace() {
        let wksp2 = Blockly.getMainWorkspace();
        if (wksp2.getToolbox()) {
            wksp = wksp2
        }
        return wksp
    }

    function getScratchBlocks() {
        let myBlocks = [];
        let myBlocksByProcCode = {};
        let wksp = getWorkspace();
        let b = wksp.getAllBlocks();

        function addBlock(cls, txt, root) {
            let id = root.id ? root.id : root.getId ? root.getId() : null;
            let clone = myBlocksByProcCode[txt];
            if (clone) {
                if (!clone.clones) {
                    clone.clones = []
                }
                clone.clones.push(id);
                return clone
            }
            let items = {
                cls: cls,
                procCode: txt,
                labelID: id,
                y: 0,
                lower: txt.toLowerCase(),
                clones: null
            };
            items.y = root.getRelativeToSurfaceXY ? root.getRelativeToSurfaceXY().y : null;
            myBlocks.push(items);
            myBlocksByProcCode[txt] = items;
            return items
        }

        function getDescFromField(root) {
            let fields = root.inputList[0];
            let desc;
            for (const fieldRow of fields.fieldRow) {
                desc = (desc ? desc + ' ' : '') + fieldRow.getText()
            }
            return desc
        }
        for (const root of b) {
            //Javascript
            if (root.type === "stringExt_charCodeAt") {
                addBlock('stringExt', '(()的第()个字符的编码)', root);
                continue
            }
            if (root.type === "stringExt_fromCharCode") {
                addBlock('stringExt', '(编码()对应的字符)', root);
                continue
            }
            if (root.type === "stringExt_serializeToJson") {
                addBlock('stringExt', '(将()开头的变量转换为JSON)', root);
                continue
            }
            if (root.type === "stringExt_deserializeFromJson") {
                addBlock('stringExt', '将()开头的变量设为JSON', root);
                continue
            }
            if (root.type === "stringExt_postJson") {
                addBlock('stringExt', '发送JSON()到()', root);
                continue
            }
            if (root.type === "stringExt_postResponse") {
                addBlock('stringExt', '(发送JSON应答)', root);
                continue
            }
            if (root.type === "js_serializeToJson") {
                addBlock('js', '(将()开头的变量转换为JSON)', root);
                continue
            }
            if (root.type === "js_deserializeFromJson") {
                addBlock('js', '将()开头的变量设为JSON()', root);
                continue
            }
            if (root.type === "js_postJson") {
                addBlock('js', '发送JSON()到()', root);
                continue
            }
            if (root.type === "js_postResponse") {
                addBlock('js', '(发送JSON应答)', root);
                continue
            }
            if (root.type === "js_callWorker") {
                addBlock('js', '(callWorker)', root);
                continue
            }
            //朗读
            if (root.type === "text2speech_speakAndWait") {
                addBlock('speech', '朗读()', root);
                continue
            }
            if (root.type === "text2speech_setVoice") {
                addBlock('speech', '使用()嗓音', root);
                continue
            }
            if (root.type === "text2speech_setLanguage") {
                addBlock('speech', '将朗读语言设置为()', root);
                continue
            }
            //pen
            if (root.type === "pen_print") {
                addBlock('pen', '打印', root);
                continue
            }
            if (root.type === "pen_setPenDownMode") {
                addBlock('pen', '将落笔模式设为[]', root);
                continue
            }
            if (root.type === "pen_clear") {
                addBlock('pen', '全部擦除', root);
                continue
            }
            if (root.type === "pen_stamp") {
                addBlock('pen', '图章', root);
                continue
            }
            if (root.type === "pen_penDown") {
                addBlock('pen', '落笔', root);
                continue
            }
            if (root.type === "pen_penUp") {
                addBlock('pen', '抬笔', root);
                continue
            }
            if (root.type === "pen_setPenColorToColor") {
                addBlock('pen', '将笔的颜色设为()', root);
                continue
            }
            if (root.type === "pen_changePenColorParamBy") {
                addBlock('pen', '将笔的()增加()', root);
                continue
            }
            if (root.type === "pen_setPenColorParamTo") {
                addBlock('pen', '将笔的()设为()', root);
                continue
            }
            if (root.type === "pen_changePenSizeBy") {
                addBlock('pen', '将笔的粗细增加()', root);
                continue
            }
            if (root.type === "pen_setPenSizeTo") {
                addBlock('pen', '将笔的粗细设为()', root);
                continue
            }
            //canvas
            if (root.type === "canvas_beginPath") {
                addBlock('canvas', '打开路径', root);
                continue
            }
            if (root.type === "canvas_closePath") {
                addBlock('canvas', '关闭路径', root);
                continue
            }
            if (root.type === "canvas_moveTo") {
                addBlock('canvas', '移动到', root);
                continue
            }
            if (root.type === "canvas_lineTo") {
                addBlock('canvas', '直线移动到', root);
                continue
            }
            if (root.type === "canvas_arc") {
                addBlock('canvas', '圆', root);
                continue
            }
            if (root.type === "canvas_rect") {
                addBlock('canvas', '矩形', root);
                continue
            }
            if (root.type === "canvas_clip") {
                addBlock('canvas', '裁剪', root);
                continue
            }
            if (root.type === "canvas_setLineWidth") {
                addBlock('canvas', '设置描边粗细', root);
                continue
            }
            if (root.type === "canvas_setLineCap") {
                addBlock('canvas', '设置线头样式', root);
                continue
            }
            if (root.type === "canvas_setStrokeStyle") {
                addBlock('canvas', '设置描边颜色', root);
                continue
            }
            if (root.type === "canvas_setFillStyle") {
                addBlock('canvas', '设置填充颜色', root);
                continue
            }
            if (root.type === "canvas_stroke") {
                addBlock('canvas', '描边', root);
                continue
            }
            if (root.type === "canvas_fill") {
                addBlock('canvas', '填充', root);
                continue
            }
            if (root.type === "canvas_clearRect") {
                addBlock('canvas', '矩形清除', root);
                continue
            }
            if (root.type === "canvas_setFont") {
                addBlock('canvas', '设置字体', root);
                continue
            }
            if (root.type === "canvas_strokeText") {
                addBlock('canvas', '使用描边样式打印文本', root);
                continue
            }
            if (root.type === "canvas_fillText") {
                addBlock('canvas', '使用填充样式打印文本', root);
                continue
            }
            if (root.type === "canvas_measureText") {
                addBlock('canvas', '(文本长度)', root);
                continue
            }
            if (root.type === "canvas_loadImage") {
                addBlock('canvas', '加载图像', root);
                continue
            }
            if (root.type === "canvas_drawImage") {
                addBlock('canvas', '绘制图像', root);
                continue
            }
            if (root.type === "canvas_scale") {
                addBlock('canvas', '缩放画布（参数1：长的缩放倍数， 参数2：宽的缩放倍数）', root);
                continue
            }
            if (root.type === "canvas_rotate") {
                addBlock('canvas', '旋转当前绘图', root);
                continue
            }
            if (root.type === "canvas_translate") {
                addBlock('canvas', '重新映射画布上的 (0,0) 位置', root);
                continue
            }
            if (root.type === "canvas_transform") {
                addBlock('canvas', '转换矩形', root);
                continue
            }
            if (root.type === "canvas_clearTransform") {
                addBlock('canvas', '清除所有转换效果）', root);
                continue
            }
            if (root.type === "canvas_save") {
                addBlock('canvas', '保存剪切路径', root);
                continue
            }
            if (root.type === "canvas_restore") {
                addBlock('canvas', '撤销剪切路径', root);
                continue
            }
            if (root.type === "canvas_setGlobalAlpha") {
                addBlock('canvas', '设置透明度', root);
                continue
            }
            if (root.type === "canvas_setGlobalCompositeOperation") {
                addBlock('canvas', 'setGlobalCompositeOperation（暂无翻译）', root);
                continue
            }
            if (root.type === "canvas_switchCanvas") {
                addBlock('canvas', '切换canvas画布', root);
                continue
            }
            if (root.type === "canvas_stampOnStage") {
                addBlock('canvas', '映射当前画布到舞台', root);
                continue
            }
            //puzzle
            if (root.type === "puzzle_setResolved") {
                addBlock('puzzie', '将任务设定成已完成', root);
                continue
            }
            if (root.type === "puzzle_convertPaintToWatermark") {
                addBlock('puzzie', '将画板转换为水印', root);
                continue
            }
            if (root.type === "puzzle_showWatermark") {
                addBlock('puzzie', '显示水印', root);
                continue
            }
            if (root.type === "puzzle_hideWatermark") {
                addBlock('puzzie', '隐藏水印', root);
                continue
            }
            if (root.type === "puzzle_isPaintSameAsWatermark") {
                addBlock('puzzie', '<画板与水印是否相同>', root);
                continue
            }
            if (root.type === "puzzle_attemptCount") {
                addBlock('puzzie', '(重置次数)', root);
                continue
            }
            if (root.type === "puzzle_stepInterval") {
                addBlock('puzzie', '(动作间隔)', root);
                continue
            }
            if (root.type === "puzzle_setSpriteTracker") {
                addBlock('puzzie', '设置角色追踪器()', root);
                continue
            }
            //LazyAudio
            if (root.type === "lazyAudio_load") {
                addBlock('lazyaudio', '加载音频()', root);
                continue
            }
            if (root.type === "lazyAudio_playAndWait") {
                addBlock('lazyaudio', '播放音频()', root);
                continue
            }
            //community
            if (root.type === "community_getUserInfo") {
                addBlock('community', '([UserInfo])', root);
                continue
            }
            if (root.type === "community_isFollower") {
                addBlock('community', '<是否关注>', root);
                continue
            }
            if (root.type === "community_isProjectLover") {
                addBlock('community', '<点赞这个作品？>', root);
                continue
            }
            if (root.type === "community_openUrl") {
                addBlock('community', '在新标签页打开链接', root);
                continue
            }
            if (root.type === "community_redirectUrl") {
                addBlock('community', '在此标签页打开链接', root);
                continue
            }
            if (root.type === "community_pay") {
                addBlock('community', '支付()以购买()', root);
                continue
            }
            if (root.type === "community_getError") {
                addBlock('community', '(交易情况反馈)', root);
                continue
            }
            //翻译
            if (root.type === "translate_getTranslate") {
                addBlock('trans', '(将()译为())', root);
                continue
            }
            if (root.type === "translate_getViewerLanguage") {
                addBlock('trans', '(访客语言)', root);
                continue
            }
            //音乐
            if (root.type === "music_playDrumForBeats") {
                addBlock('music', '击打()()拍', root);
                continue
            }
            if (root.type === "music_restForBeats") {
                addBlock('music', '休止()拍', root);
                continue
            }
            if (root.type === "music_playNoteForBeats") {
                addBlock('music', '演奏音符()()拍', root);
                continue
            }
            if (root.type === "music_setInstrument") {
                addBlock('music', '将乐器设为()', root);
                continue
            }
            if (root.type === "music_setTempo") {
                addBlock('music', '将演奏速度设定为()', root);
                continue
            }
            if (root.type === "music_changeTempo") {
                addBlock('music', '将演奏速度增加()', root);
                continue
            }
            if (root.type === "music_getTempo") {
                addBlock('music', '(演奏速度)', root);
                continue
            }
            //视频侦测
            if (root.type === "videoSensing_whenMotionGreaterThan") {
                addBlock('video', '当视频运动 > ()', root);
                continue
            }
            if (root.type === "videoSensing_videoOn") {
                addBlock('video', '(相对于()的视频())', root);
                continue
            }
            if (root.type === "videoSensing_videoToggle") {
                addBlock('video', '()摄像头', root);
                continue
            }
            if (root.type === "videoSensing_setVideoTransparency") {
                addBlock('video', '将视频透明度设为()', root);
                continue
            }
            //战场
            if (root.type === "battle_connect") {
                addBlock('battle', '连接()-()', root);
                continue
            }
            if (root.type === "battle_excute") {
                addBlock('battle', '执行()', root);
                continue
            }
            if (root.type === "battle_refresh") {
                addBlock('battle', '刷新', root);
                continue
            }
            if (root.type === "battle_getId") {
                addBlock('battle', '(ID)', root);
                continue
            }
            if (root.type === "battle_getError") {
                addBlock('battle', '(错误)', root);
                continue
            }
            if (root.type === "battle_getSituation") {
                addBlock('battle', '(战况)', root);
                continue
            }
            //原版模块
            if (root.type === "motion_movesteps") {
                addBlock('motion', '移动()步', root);
                continue
            }
            if (root.type === "motion_turnright") {
                addBlock('motion', '右转()度', root);
                continue
            }
            if (root.type === "motion_turnleft") {
                addBlock('motion', '左转()度', root);
                continue
            }
            if (root.type === "motion_goto") {
                addBlock('motion', '移到()', root);
                continue
            }
            if (root.type === "motion_gotoxy") {
                addBlock('motion', '移到x:()y:()', root);
                continue
            }
            if (root.type === "motion_glideto") {
                addBlock('motion', '在()秒内滑行到()', root);
                continue
            }
            if (root.type === "motion_glidesecstoxy") {
                addBlock('motion', '在()秒内滑行到x:()y:()', root);
                continue
            }
            if (root.type === "motion_pointindirection") {
                addBlock('motion', '面向()方向', root);
                continue
            }
            if (root.type === "motion_pointtowards") {
                addBlock('motion', '面向()', root);
                continue
            }
            if (root.type === "motion_changexby") {
                addBlock('motion', '将x坐标增加()', root);
                continue
            }
            if (root.type === "motion_setx") {
                addBlock('motion', '将x坐标设为()', root);
                continue
            }
            if (root.type === "motion_changeyby") {
                addBlock('motion', '将y坐标增加()', root);
                continue
            }
            if (root.type === "motion_sety") {
                addBlock('motion', '将y坐标设为()', root);
                continue
            }
            if (root.type === "motion_ifonedgebounce") {
                addBlock('motion', '碰到边缘就反弹', root);
                continue
            }
            if (root.type === "motion_setrotationstyle") {
                addBlock('motion', '将旋转方式设为[]', root);
                continue
            }
            if (root.type === "motion_xposition") {
                addBlock('motion', '(x坐标)', root);
                continue
            }
            if (root.type === "motion_yposition") {
                addBlock('motion', '(y坐标)', root);
                continue
            }
            if (root.type === "motion_direction") {
                addBlock('motion', '(方向)', root);
                continue
            }
            if (root.type === "looks_sayforsecs") {
                addBlock('look', '说()()秒', root);
                continue
            }
            if (root.type === "looks_say") {
                addBlock('look', '说()', root);
                continue
            }
            if (root.type === "looks_thinkforsecs") {
                addBlock('look', '思考()()秒', root);
                continue
            }
            if (root.type === "looks_think") {
                addBlock('look', '思考()', root);
                continue
            }
            if (root.type === "looks_switchcostumeto") {
                addBlock('look', '换成()造型', root);
                continue
            }
            if (root.type === "looks_costume") {
                addBlock('look', '(造型[])', root);
                continue
            }
            if (root.type === "looks_nextcostume") {
                addBlock('look', '下一个造型', root);
                continue
            }
            if (root.type === "looks_switchbackdropto") {
                addBlock('look', '换成()背景', root);
                continue
            }
            if (root.type === "looks_backdrops") {
                addBlock('look', '(背景[])', root);
                continue
            }
            if (root.type === "looks_nextbackdrop") {
                addBlock('look', '下一个背景', root);
                continue
            }
            if (root.type === "looks_changesizeby") {
                addBlock('look', '将大小增加()', root);
                continue
            }
            if (root.type === "looks_setsizeto") {
                addBlock('look', '将大小设为()', root);
                continue
            }
            if (root.type === "looks_changeeffectby") {
                addBlock('look', '将[]特效增加()', root);
                continue
            }
            if (root.type === "looks_seteffectto") {
                addBlock('look', '将[]特效设定为()', root);
                continue
            }
            if (root.type === "looks_cleargraphiceffects") {
                addBlock('look', '清除图形特效', root);
                continue
            }
            if (root.type === "looks_show") {
                addBlock('look', '显示', root);
                continue
            }
            if (root.type === "looks_hide") {
                addBlock('look', '隐藏', root);
                continue
            }
            if (root.type === "looks_gotofrontback") {
                addBlock('look', '移到最[]', root);
                continue
            }
            if (root.type === "looks_goforwardbackwardlayers") {
                addBlock('look', '[]()层', root);
                continue
            }
            if (root.type === "looks_costumenumbername") {
                addBlock('look', '(造型[])', root);
                continue
            }
            if (root.type === "looks_backdropnumbername") {
                addBlock('look', '(背景[])', root);
                continue
            }
            if (root.type === "looks_size") {
                addBlock('look', '(大小)', root);
                continue
            }
            if (root.type === "sound_playuntildone") {
                addBlock('sound', '播放声音()等待播完', root);
                continue
            }
            if (root.type === "sound_play") {
                addBlock('sound', '播放声音()', root);
                continue
            }
            if (root.type === "sound_stopallsounds") {
                addBlock('sound', '停止所有声音', root);
                continue
            }
            if (root.type === "sound_changeeffectby") {
                addBlock('sound', '将[]音效增加()', root);
                continue
            }
            if (root.type === "sound_seteffectto") {
                addBlock('sound', '将[]音效设为()', root);
                continue
            }
            if (root.type === "sound_cleareffects") {
                addBlock('sound', '清除音效', root);
                continue
            }
            if (root.type === "sound_changevolumeby") {
                addBlock('sound', '将音量增加()', root);
                continue
            }
            if (root.type === "sound_setvolumeto") {
                addBlock('sound', '将音量设为()%', root);
                continue
            }
            if (root.type === "sound_volume") {
                addBlock('sound', '(音量)', root);
                continue
            }
            if (root.type === "control_wait") {
                addBlock('control', '等待()秒', root);
                continue
            }
            if (root.type === "control_repeat") {
                addBlock('control', '重复执行()次', root);
                continue
            }
            if (root.type === "control_forever") {
                addBlock('control', '重复执行', root);
                continue
            }
            if (root.type === "control_if") {
                addBlock('control', '如果<>那么', root);
                continue
            }
            if (root.type === "control_if_else") {
                addBlock('control', '如果<>那么/否则', root);
                continue
            }
            if (root.type === "control_wait_until") {
                addBlock('control', '等待<>', root);
                continue
            }
            if (root.type === "control_repeat_until") {
                addBlock('control', '重复执行直到<>', root);
                continue
            }
            if (root.type === "control_stop") {
                addBlock('control', '停止[]', root);
                continue
            }
            if (root.type === "control_start_as_clone") {
                addBlock('control', '当作为克隆体启动时', root);
                continue
            }
            if (root.type === "control_create_clone_of") {
                addBlock('control', '克隆()', root);
                continue
            }
            if (root.type === "control_delete_this_clone") {
                addBlock('control', '删除此克隆体', root);
                continue
            }
            if (root.type === "sensing_touchingobject") {
                addBlock('sensing', '<碰到()?>', root);
                continue
            }
            if (root.type === "sensing_touchingcolor") {
                addBlock('sensing', '<碰到颜色()?>', root);
                continue
            }
            if (root.type === "sensing_coloristouchingcolor") {
                addBlock('sensing', '<颜色()碰到()?>', root);
                continue
            }
            if (root.type === "sensing_distanceto") {
                addBlock('sensing', '(到()的距离)', root);
                continue
            }
            if (root.type === "sensing_askandwait") {
                addBlock('sensing', '询问()并等待', root);
                continue
            }
            if (root.type === "sensing_answer") {
                addBlock('sensing', '(回答)', root);
                continue
            }
            if (root.type === "sensing_keypressed") {
                addBlock('sensing', '<按下()键?>', root);
                continue
            }
            if (root.type === "sensing_mousedown") {
                addBlock('sensing', '<按下鼠标?>', root);
                continue
            }
            if (root.type === "sensing_mousex") {
                addBlock('sensing', '(鼠标的x坐标)', root);
                continue
            }
            if (root.type === "sensing_mousey") {
                addBlock('sensing', '(鼠标的y坐标)', root);
                continue
            }
            if (root.type === "sensing_setdragmode") {
                addBlock('sensing', '将拖动模式设为[]', root);
                continue
            }
            if (root.type === "sensing_loudness") {
                addBlock('sensing', '(响度)', root);
                continue
            }
            if (root.type === "sensing_timer") {
                addBlock('sensing', '(计时器)', root);
                continue
            }
            if (root.type === "sensing_resettimer") {
                addBlock('sensing', '计时器归零', root);
                continue
            }
            if (root.type === "sensing_of") {
                addBlock('sensing', '(()的[])', root);
                continue
            }
            if (root.type === "sensing_current") {
                addBlock('sensing', '(当前时间的[])', root);
                continue
            }
            if (root.type === "sensing_dayssince2000") {
                addBlock('sensing', '(2000年至今的天数)', root);
                continue
            }
            if (root.type === "sensing_username") {
                addBlock('sensing', '(用户名)', root);
                continue
            }
            if (root.type === "operator_add") {
                addBlock('operation', '(()+())', root);
                continue
            }
            if (root.type === "operator_subtract") {
                addBlock('operation', '(()-())', root);
                continue
            }
            if (root.type === "operator_multiply") {
                addBlock('operation', '(()*())', root);
                continue
            }
            if (root.type === "operator_divide") {
                addBlock('operation', '(()/())', root);
                continue
            }
            if (root.type === "operator_random") {
                addBlock('operation', '(在()和()之间取随机数)', root);
                continue
            }
            if (root.type === "operator_gt") {
                addBlock('operation', '<()>()>', root);
                continue
            }
            if (root.type === "operator_lt") {
                addBlock('operation', '<()<()>', root);
                continue
            }
            if (root.type === "operator_equals") {
                addBlock('operation', '<()=()>', root);
                continue
            }
            if (root.type === "operator_and") {
                addBlock('operation', '<<>与<>>', root);
                continue
            }
            if (root.type === "operator_or") {
                addBlock('operation', '<<>或<>>', root);
                continue
            }
            if (root.type === "operator_not") {
                addBlock('operation', '<<>不成立>', root);
                continue
            }
            if (root.type === "operator_join") {
                addBlock('operation', '(连接()和())', root);
                continue
            }
            if (root.type === "operator_letter_of") {
                addBlock('operation', '(()的第()个字符)', root);
                continue
            }
            if (root.type === "operator_length") {
                addBlock('operation', '(()的字符数)', root);
                continue
            }
            if (root.type === "operator_contains") {
                addBlock('operation', '<()包含()?>', root);
                continue
            }
            if (root.type === "operator_mod") {
                addBlock('operation', '(()除以()的余数)', root);
                continue
            }
            if (root.type === "operator_round") {
                addBlock('operation', '(四舍五入())', root);
                continue
            }
            if (root.type === "operator_mathop") {
                addBlock('operation', '([]())', root);
                continue
            }
            if (root.type === "procedures_definition") {
                let fields = root.inputList[0];
                let typeDesc = fields.fieldRow[0].getText();
                let label = root.getChildren()[0];
                let procCode = label.getProcCode();
                procCode = procCode.replace(/ %s/g, '『数字/文本』');
                if (procCode.startsWith('%s')) {
                    procCode = '『数字/文本』' + procCode.substr(3)
                }
                procCode = procCode.replace(/ %b/g, '『布尔值』');
                if (procCode.startsWith('%b')) {
                    procCode = '『布尔值』' + procCode.substr(3)
                }
                if (!procCode) {
                    continue
                }
                addBlock('define', typeDesc + ' ' + procCode, root);
                continue
            }
            if (root.type === "event_whenflagclicked") {
                addBlock('flag', '当 ⚐ 被点击', root);
                continue
            }
            if (root.type === "event_whenbroadcastreceived") {
                try {
                    let fields = root.inputList[0];
                    let typeDesc = fields.fieldRow[0].getText();
                    let eventName = fields.fieldRow[1].getText();
                    addBlock('receive', typeDesc + ' ' + eventName, root).eventName = eventName
                } catch (e) {}
                continue
            }
            if (root.type.substr(0, 10) === 'event_when') {
                addBlock('event', getDescFromField(root), root);
                continue
            }
            if (root.type === 'control_start_as_clone') {
                addBlock('event', getDescFromField(root), root);
                continue
            }
        }
        let map = wksp.getVariableMap();
        let vars = map.getVariablesOfType('');
        for (const row of vars) {
            addBlock((row.isLocal ? "var" : "VAR"), (row.isLocal ? "私有变量 " : "公有变量 ") + row.name, row)
        }
        let lists = map.getVariablesOfType('list');
        for (const row of lists) {
            addBlock((row.isLocal ? "list" : "LIST"), (row.isLocal ? "私有列表 " : "公有列表 ") + row.name, row)
        }
        const clsOrder = {
            flag: 0,
            receive: 1,
            event: 2,
            define: 3,
            var: 4,
            VAR: 5,
            list: 6,
            LIST: 7,
            pen: 8,
            canvas: 9,
            js: 10,
            community: 11,
            lazyaudio: 12,
            puzzie: 13,
            speech: 14,
            trans: 15,
            video: 16
        };
        myBlocks.sort(function(a, b) {
            let t = clsOrder[a.cls] - clsOrder[b.cls];
            if (t !== 0) {
                return t
            }
            if (a.lower < b.lower) {
                return -1
            }
            if (a.lower > b.lower) {
                return 1
            }
            return a.y - b.y
        });
        return {
            procs: myBlocks
        }
    }
    let rhdd = 0;

    function showDropDown() {
        clearTimeout(rhdd);
        rhdd = 0;
        if (ddOut.classList.contains('vis')) {
            return
        }
        prevVal = null;
        ddOut.classList.add('vis');
        let scratchBlocks = getScratchBlocks();
        dom_removeChildren(dd);
        let procs = scratchBlocks.procs;
        for (const proc of procs) {
            let li = document.createElement("li");
            li.innerText = proc.procCode;
            li.data = proc;
            li.className = proc.cls;
            dd.appendChild(li)
        }
        let label = document.getElementById('s3devFindLabel');
        offsetX = ddOut.getBoundingClientRect().right - label.getBoundingClientRect().left + 26;
        offsetY = 32
    }

    function hideDropDown() {
        clearTimeout(rhdd);
        rhdd = setTimeout(reallyHideDropDown, 250)
    }

    function reallyHideDropDown() {
        if (findInp === document.activeElement) {
            hideDropDown();
            return
        }
        ddOut.classList.remove('vis');
        rhdd = 0
    }

    function dom_removeChildren(myNode) {
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild)
        }
    }

    function getTopBlocks() {
        let columns = getOrderedTopBlockColumns();
        let topBlocks = [];
        for (const col of columns) {
            topBlocks = topBlocks.concat(col.blocks)
        }
        return topBlocks
    }

    function doCleanUp() {
        let columns = getOrderedTopBlockColumns(true);
        let cursorX = 48;
        for (const column of columns) {
            let cursorY = 64;
            let maxWidth = 0;
            for (const block of column.blocks) {
                let xy = block.getRelativeToSurfaceXY();
                block.moveBy(cursorX - xy.x, cursorY - xy.y);
                let heightWidth = block.getHeightWidth();
                cursorY += heightWidth.height + 72;
                maxWidth = Math.max(maxWidth, heightWidth.width)
            }
            cursorX += maxWidth + 96
        }
    }

    function isBlockAnOrphan(topBlock) {
        if (topBlock.getOutputShape() && !topBlock.getSurroundParent()) {
            return true
        }
        return false
    }

    function getOrderedTopBlockColumns(separateOrphans) {
        let w = getWorkspace();
        let topBlocks = w.getTopBlocks();
        let cols = [];
        const TOLERANCE = 256;
        let orphans = {
            x: -999999,
            count: 0,
            blocks: []
        };
        for (const topBlock of topBlocks) {
            let position = topBlock.getRelativeToSurfaceXY();
            let bestCol = null;
            let bestError = TOLERANCE;
            if (separateOrphans && isBlockAnOrphan(topBlock)) {
                orphans.blocks.push(topBlock);
                continue
            }
            for (const col of cols) {
                let err = Math.abs(position.x - col.x);
                if (err < bestError) {
                    bestError = err;
                    bestCol = col
                }
            }
            if (bestCol) {
                bestCol.x = (bestCol.x * bestCol.count + position.x) / ++bestCol.count;
                bestCol.blocks.push(topBlock)
            } else {
                cols.push({
                    x: position.x,
                    count: 1,
                    blocks: [topBlock]
                })
            }
        }
        if (orphans.blocks.length > 0) {
            cols.push(orphans)
        }
        cols.sort(function(a, b) {
            return a.x - b.x
        });
        for (const col of cols) {
            col.blocks.sort(function(a, b) {
                return a.getRelativeToSurfaceXY().y - b.getRelativeToSurfaceXY().y
            })
        }
        return cols
    }

    function getVariableUsesById(id) {
        let uses = [];
        let topBlocks = getTopBlocks(true);
        for (const topBlock of topBlocks) {
            let kids = topBlock.getDescendants();
            for (const block of kids) {
                let blockVariables = block.getVarModels();
                if (blockVariables) {
                    for (const blockVar of blockVariables) {
                        if (blockVar.getId() === id) {
                            uses.push(block)
                        }
                    }
                }
            }
        }
        return uses
    }

    function getCallsToProcedureById(id) {
        let w = getWorkspace();
        let procBlock = w.getBlockById(id);
        let label = procBlock.getChildren()[0];
        let procCode = label.getProcCode();
        let uses = [procBlock];
        let topBlocks = getTopBlocks(true);
        for (const topBlock of topBlocks) {
            let kids = topBlock.getDescendants();
            for (const block of kids) {
                if (block.type === "procedures_call") {
                    if (block.getProcCode() === procCode) {
                        uses.push(block)
                    }
                }
            }
        }
        return uses
    }

    function getCallsToEventsByName(name) {
        let uses = [];
        let topBlocks = getTopBlocks(true);
        for (const topBlock of topBlocks) {
            let kids = topBlock.getDescendants();
            for (const block of kids) {
                if (block.type === "event_broadcast" || block.type === "event_broadcastandwait") {
                    if (name === block.getChildren()[0].inputList[0].fieldRow[0].getText()) {
                        uses.push(block)
                    }
                }
            }
        }
        return uses
    }

    function buildNavigationCarosel(nav, li, blocks) {
        if (nav && nav.parentNode === li) {
            multi.navRight()
        } else {
            if (nav) {
                nav.remove()
            }
            li.insertAdjacentHTML('beforeend', `<span id="s3devMulti"class="s3devMulti"><span id="s3devMultiLeft"class="s3devNav">◀</span><span id="s3devMultiCount"></span><span id="s3devMultiRight"class="s3devNav">▶</span></span>`);
            document.getElementById('s3devMultiLeft').addEventListener("click", multi.navLeft);
            document.getElementById('s3devMultiRight').addEventListener("click", multi.navRight);
            multi.idx = 0;
            multi.blocks = blocks;
            multi.update();
            if ((blocks.length > 0)) {
                centerTop(blocks[0])
            }
        }
    }

    function dropDownClick(e) {
        let workspace = getWorkspace();
        if (prevVal === null) {
            prevVal = findInp.value
        }
        let li = e.target;
        for (;;) {
            if (!li || li === dd) {
                return
            }
            if (li.data) {
                break
            }
            li = li.parentNode
        }
        if (!e.navKey) {
            let sel = dd.getElementsByClassName('sel');
            sel = sel.length > 0 ? sel[0] : null;
            if (sel && sel !== li) {
                try {
                    sel.classList.remove('sel')
                } catch (e) {
                    console.log(sel);
                    console.error(e)
                }
            }
            if (li !== sel) {
                li.classList.add('sel')
            }
        }
        let nav = document.getElementById('s3devMulti');
        let cls = li.data.cls;
        if (cls === 'var' || cls === 'VAR' || cls === 'list' || cls === 'LIST') {
            let blocks = getVariableUsesById(li.data.labelID);
            buildNavigationCarosel(nav, li, blocks)
        } else if (cls === 'define') {
            let blocks = getCallsToProcedureById(li.data.labelID);
            buildNavigationCarosel(nav, li, blocks)
        } else if (cls === 'receive') {
            let blocks = [workspace.getBlockById(li.data.labelID)];
            if (li.data.clones) {
                for (const cloneID of li.data.clones) {
                    blocks.push(workspace.getBlockById(cloneID))
                }
            }
            blocks = blocks.concat(getCallsToEventsByName(li.data.eventName));
            buildNavigationCarosel(nav, li, blocks)
        } else if (li.data.clones) {
            let blocks = [workspace.getBlockById(li.data.labelID)];
            for (const cloneID of li.data.clones) {
                blocks.push(workspace.getBlockById(cloneID))
            }
            buildNavigationCarosel(nav, li, blocks)
        } else {
            multi.blocks = null;
            centerTop(li.data.labelID);
            if (nav) {
                nav.remove()
            }
        }
    }
    let multi = {
        idx: 0,
        blocks: null,
        update: function() {
            let count = document.getElementById('s3devMultiCount');
            count.innerText = multi.blocks && multi.blocks.length > 0 ? enc((multi.idx + 1) + " / " + multi.blocks.length) : "0"
        },
        navLeft: function(e) {
            return multi.navSideways(e, -1)
        },
        navRight: function(e) {
            return multi.navSideways(e, 1)
        },
        navSideways: function(e, dir) {
            if (multi.blocks && multi.blocks.length > 0) {
                multi.idx = (multi.idx + dir + multi.blocks.length) % multi.blocks.length;
                multi.update();
                centerTop(multi.blocks[multi.idx])
            }
            if (e) {
                e.cancelBubble = true;
                e.preventDefault()
            }
            return true
        }
    };
    let myFlash = {
        block: null,
        timerID: null,
        colour: null
    };
    let myFlashTimer;

    function centerTop(e, force) {
        let wksp = getWorkspace();
        if (e = (e && e.id ? e : wksp.getBlockById(e))) {
            let root = e.getRootBlock();
            let base = e;
            while (base.getOutputShape() && base.getSurroundParent()) {
                base = base.getSurroundParent()
            }
            let ePos = base.getRelativeToSurfaceXY(),
                rPos = root.getRelativeToSurfaceXY(),
                eSiz = e.getHeightWidth(),
                scale = wksp.scale,
                x = rPos.x * scale,
                y = ePos.y * scale,
                xx = e.width + x,
                yy = e.height + y,
                s = wksp.getMetrics();
            if (x < s.viewLeft + offsetX - 4 || xx > s.viewLeft + s.viewWidth || y < s.viewTop + offsetY - 4 || yy > s.viewTop + s.viewHeight) {
                let sx = x - s.contentLeft - offsetX,
                    sy = y - s.contentTop - offsetY;
                wksp.scrollbar.set(sx, sy)
            }
            if (myFlash.timerID > 0) {
                clearTimeout(myFlash.timerID);
                myFlash.block.setColour(myFlash.colour)
            }
            let count = 4;
            let flashOn = true;
            myFlash.colour = e.getColour();
            myFlash.block = e;

            function flash() {
                myFlash.block.setColour(flashOn ? "#ffff80" : myFlash.colour);
                flashOn = !flashOn;
                count--;
                if (count > 0) {
                    myFlash.timerID = setTimeout(flash, 200)
                } else {
                    myFlash.timerID = 0
                }
            }
            flash()
        }
    }

    function enc(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
    }
    let prevVal = '';

    function inputChange(e) {
        if (!ddOut.classList.contains('vis')) {
            showDropDown();
            hideDropDown()
        }
        let val = (findInp.value || '').toLowerCase();
        if (val === prevVal) {
            return
        }
        prevVal = val;
        multi.blocks = null;
        let listLI = dd.getElementsByTagName('li');
        for (const li of listLI) {
            let procCode = li.data.procCode;
            let i = li.data.lower.indexOf(val);
            if (i >= 0) {
                li.style.display = 'block';
                dom_removeChildren(li);
                if (i > 0) {
                    li.appendChild(document.createTextNode(procCode.substring(0, i)))
                }
                let bText = document.createElement('b');
                bText.appendChild(document.createTextNode(procCode.substr(i, val.length)));
                li.appendChild(bText);
                if (i + val.length < procCode.length) {
                    li.appendChild(document.createTextNode(procCode.substr(i + val.length)))
                }
            } else {
                li.style.display = 'none'
            }
        }
    }

    function navigateFilter(dir) {
        let sel = dd.getElementsByClassName('sel');
        let nxt = null;
        if (sel.length > 0 && sel[0].style.display !== 'none') {
            nxt = dir === -1 ? sel[0].previousSibling : sel[sel.length - 1].nextSibling
        } else {
            nxt = dd.children[0];
            dir = 1
        }
        while (nxt && nxt.style.display === 'none') {
            nxt = dir === -1 ? nxt.previousSibling : nxt.nextSibling
        }
        if (nxt) {
            for (const i of sel) {
                i.classList.remove("sel")
            }
            nxt.classList.add('sel');
            dropDownClick({
                target: nxt,
                navKey: true
            })
        }
    }

    function inputKeyDown(e) {
        if (e.keyCode === 38) {
            navigateFilter(-1);
            e.preventDefault();
            return
        }
        if (e.keyCode === 40) {
            navigateFilter(1);
            e.preventDefault();
            return
        }
        if (e.keyCode === 37) {
            let sel = dd.getElementsByClassName('sel');
            if (sel && multi.blocks) {
                multi.navLeft(e)
            }
        }
        if (e.keyCode === 39) {
            let sel = dd.getElementsByClassName('sel');
            if (sel && multi.blocks) {
                multi.navRight(e)
            }
        }
        if (e.keyCode === 13) {
            let sel = dd.getElementsByClassName('sel');
            if (sel.length === 0) {
                navigateFilter(1)
            }
            document.activeElement.blur();
            e.preventDefault();
            return
        }
        if (e.keyCode === 27) {
            if (findInp.value.length > 0) {
                findInp.value = '';
                inputChange(e)
            } else {
                document.activeElement.blur()
            }
            e.preventDefault();
            return
        }
    }

    function deepSearch(e) {
        let selected = document.querySelector('[class*=sprite-selector-item_is-selected_]');
        let wksp = getWorkspace();
        let myTopBlocks = wksp.getTopBlocks();
        let dict = {};
        wksp.setVisible(false);
        document.body.insertAdjacentHTML('beforeend', `<div id="s3devOverlay"></div>`);
        let overlay = document.getElementById("s3devOverlay");
        let sprites = document.querySelectorAll('[class*=sprite-selector_sprite_]');
        let sprite = null,
            name = null;
        let i = -1;

        function nextSprite() {
            if (sprite !== null) {
                let topBlocks;
                if (sprite === selected) {
                    topBlocks = myTopBlocks
                } else {
                    sprite.click();
                    topBlocks = wksp.getTopBlocks()
                }
                dict[name] = topBlocks
            }
            if (++i >= sprites.length) {
                selected.click();
                wksp.setVisible(true);
                return overlay.remove()
            }
            sprite = sprites[i];
            name = sprite.querySelector('[class*=sprite-selector-item_sprite-name]').textContent;
            console.log('Loading ' + name);
            let divElement = document.createElement("div");
            divElement.appendChild(document.createTextNode("Searching in " + name));
            overlay.appendChild(divElement);
            setTimeout(nextSprite, 50)
        }
        nextSprite();
        e.preventDefault();
        return true
    }

    function initInner() {
        let tab = document.getElementById('react-tabs-0');
        if (!tab) {
            setTimeout(initInner, 1000);
            return
        }
        let root = tab.parentNode;
        root.insertAdjacentHTML('beforeend', `
        <div id="s3devToolBar">
            <label class='title'id=s3devFindLabel>
                <span>搜寻</span>
                <span id=s3devFind>
                    <div id='s3devDDOut'>
                    <input id='s3devInp'type='search'placeholder='搜寻 (Ctrl+F)'autocomplete='off'>
                    <ul id='s3devDD'></ul>
                    </div>
                </span>
                <a id="s3devDeep"href="#">Deep</a>
                <a id="s3devCleanUp"href="#">整理积木</a>
                <div id="scratch_style">主题(研发中)
                    <span class="set_style">
                        <span>标题栏颜色&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                            <input id="sc_sty_tit" class="input_color" type="color" name="scratch_style" href="#">
                        </span>
                        <span>
                            <a onclick="setScTitleColor()">确定</a>
                        </span>
                    </span>
                </div>
            </label>
        </div>`);
        find = document.getElementById('s3devFind');
        findInp = document.getElementById('s3devInp');
        ddOut = document.getElementById('s3devDDOut');
        ddOut.addEventListener('click', dropDownClick);
        dd = document.getElementById('s3devDD');
        find.addEventListener('mouseenter', showDropDown);
        find.addEventListener('mouseleave', hideDropDown);
        findInp.addEventListener('keyup', inputChange);
        findInp.addEventListener('keydown', inputKeyDown);
        findInp.addEventListener('focus', inputChange);
        document.addEventListener('keydown', function(e) {
            if (document.URL.indexOf('editor') > 0 && e.key === 'f' && e.ctrlKey) {
                findInp.focus();
                findInp.select();
                e.cancelBubble = true;
                e.preventDefault();
                return true
            }
        });
        document.getElementById('s3devDeep').addEventListener('click', deepSearch);
        document.getElementById('s3devCleanUp').addEventListener('click', function(e) {
            doCleanUp()
        })
    }

    setTimeout(initInner, 1000)
}

function initSinicizationCnvas(){
    document.querySelector("g[data-id='beginPath']").text.innerHTML ="打开路径";
    document.querySelector("g[data-id='canvas_closePath']").lastChild.innerHTML ="关闭路径";
    document.querySelector("g[data-id='canvas_moveTo']").lastChild.innerHTML ="移动到";
    document.querySelector("g[data-id='canvas_lineTo']").lastChild.innerHTML ="直线移动到";
    document.getElementById('canvas_arc').node.lastChild.innerHTML ="圆";/*
    document.getElementById('canvas_rect').node.lastChild.innerHTML ="矩形";
    document.getElementById('canvas_clip').node.lastChild.innerHTML ="裁剪";
    document.getElementById('canvas_setLineWidth').node.lastChild.innerHTML ="设置描边粗细";
    document.getElementById('canvas_setLineCap').node.lastChild.innerHTML ="设置线头样式";
    document.getElementById('canvas_setStrokeStyle').node.lastChild.innerHTML ="设置描边颜色";
    document.getElementById('canvas_satFillStyle').node.lastChild.innerHTML ="设置填充颜色";
    document.getElementById('canvas_stroke').node.lastChild.innerHTML ="描边";
    document.getElementById('canvas_fill').node.lastChild.innerHTML ="填充";
    document.getElementById('canvas_clearRect').node.lastChild.innerHTML ="矩形清除";
    document.getElementById('canvas_setFont').node.lastChild.innerHTML ="设置字体";
    document.getElementById('canvas_strokeText').node.lastChild.innerHTML ="使用描边样式打印文本";
    document.getElementById('canvas_fillText').node.lastChild.innerHTML ="使用填充样式打印文本";
    document.getElementById('canvas_measureText').node.lastChild.innerHTML ="文本长度";/*
    document.getElementById('').node.lastChild.innerHTML ="";
    document.getElementById('').node.lastChild.innerHTML ="";
    document.getElementById('').node.lastChild.innerHTML ="";
    document.getElementById('').node.lastChild.innerHTML ="";
    document.getElementById('').node.lastChild.innerHTML ="";
    document.getElementById('').node.lastChild.innerHTML ="";
    document.getElementById('').node.lastChild.innerHTML ="";
    document.getElementById('').node.lastChild.innerHTML ="";
    document.getElementById('').node.lastChild.innerHTML ="";
    document.getElementById('').node.lastChild.innerHTML ="";
    document.getElementById('').node.lastChild.innerHTML ="";
    document.getElementById('').node.lastChild.innerHTML ="";
    document.getElementById('').node.lastChild.innerHTML ="";
    document.getElementById('').node.lastChild.innerHTML ="";
    document.getElementById('').node.lastChild.innerHTML ="";
    document.getElementById('').node.lastChild.innerHTML ="";
    document.getElementById('').node.lastChild.innerHTML ="";*/
}

initGUI();
initSinicizationCnvas();