$(document).ready(function(){
    // test
    // var fs = katex.renderToString('(1 + q)^n', {throwOnError: false});
    // $('#test_1').html(fs);
});

$(document).on("shown.bs.modal", "#modal_formula_remember", function(){
    if (!$('#modal_fr_condition').text()) {
        formulaRemember();
    }
});

// 公式
var FORMULAS = {
    // '问题': ['答案', ['已知条件1', '已知条件2'], '计算方法'], 
    '增长率_1': ['\\cfrac{增长量}{基期量}', ['增长量', '基期量'], ''], 
    '增长率_2': ['\\cfrac{增长量}{现期量 - 增长量}', ['增长量', '现期量'], ''],
    '增长率_3': ['\\cfrac{现期量}{基期量} - 1', ['现期量', '基期量'], ''],
    '增长量_1': ['基期量 \\times 增长率', ['基期量', '增长率'], ''],
    '增长量_2': ['现期量 - 基期量', ['现期量', '基期量'], ''],
    '增长量_3': ['\\cfrac{现期量}{1 + 增长率} \\times 增长率', ['现期量', '增长率'], ''],
    '基期量_1': ['现期量 - 增长量', ['现期量', '增长量'], ''],
    '基期量_2': ['\\cfrac{现期量}{1 + 增长率}', ['现期量', '增长率'], ''],
    '现期量_1': ['基期量 + 增长量', ['基期量', '增长量'], ''],
    '现期量_2': ['基期量 \\times (1 + 增长率)', ['基期量', '增长率'], ''],
    '总量': ['\\cfrac{分量}{占比}', ['分量', '占比'], ''],
    '隔年基期量': ['\\cfrac{A}{(1 + q_1)(1 + q_2)}', ['现期量A', '第一年增长率q_1', '第二年增长率q_2'], ''],
    '隔年增长率': ['q_1 + q_2 + q_1 \\cdot q_2', ['第一年增长率q_1', '第二年增长率q_2'], ''],
    '年均增长量\\overline{a}': ['\\cfrac{末 - 初}{n}', ['末期量', '初期量', '年份差n'], ''],
    '年均增长率\\overline{q}': ['\\sqrt[n]{\\cfrac{末}{初}} - 1 \\approx \\cfrac{\\cfrac{末}{初} - 1}{n} = \\cfrac{末 - 初}{n \\cdot 初}', ['末期量', '初期量', '年份差n'], '偏大选小'],
    '\\cfrac{末}{初}': ['(1 + \\overline{q})^n \\approx 1 + n \\cdot \\overline{q}', ['年均增长率', '年份差n'], '偏小选大'],
};
// 公式key值数组，用于随机取用
formulasKeys = [];
formulaKeyFlush();

function formulaRemember() {
    if ($('#modal_fr_question2').is(':visible')) {
        if (formulasKeys.length > 0) {
            // 随机获取一个公式key，并将其从数组中删除，保证不会取到重复值
            var formulaIndex = getRndInteger(0, formulasKeys.length);
            var formulaKey = formulasKeys.splice(formulaIndex, 1);
            var answer = FORMULAS[formulaKey][0];
            var conditions = FORMULAS[formulaKey][1].join('，');
            var resolvent = FORMULAS[formulaKey][2];
            // 只显示下划线前的字符串
            var formulaKeyStr = String(formulaKey).match(/(.*)_\d+/);
            if (formulaKeyStr) {
                formulaKeyStr = formulaKeyStr[1];
            } else {
                formulaKeyStr = String(formulaKey);
            }
            // 更新页面显示
            var fs = katex.renderToString(conditions, {throwOnError: false});
            $('#modal_fr_condition').html(fs);
            var fs = katex.renderToString(formulaKeyStr + ' = ', {throwOnError: false});
            $('#modal_fr_question1').html(fs);
            $('#modal_fr_question2').hide();
            var fs = katex.renderToString(answer, {throwOnError: false});
            $('#modal_fr_question2').html(fs);
            $('#modal_fr_resolvent').hide();
            var fs = katex.renderToString(resolvent, {throwOnError: false});
            $('#modal_fr_resolvent').html(fs);
        } else {
            // 重新开始循环
            again = confirm('再来一次？');
            if (again) {
                formulaKeyFlush();
                formulaRemember();
            }
        }
    } else {
        $('#modal_fr_question2').show();
        $('#modal_fr_resolvent').show();
    }
}

function formulaView() {
    // 
}

function formulaKeyFlush() {
    /* 刷新公式key数组 */
    for (var key in FORMULAS) {
        formulasKeys.push(key);
    }
}

function getRndInteger(min, max) {
    /* 获取随机数 */
    // return Math.floor(Math.random() * (max - min + 1) ) + min; // 左闭右闭
    return Math.floor(Math.random() * (max - min) ) + min; //左闭右开
}
