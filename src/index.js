module.exports = function check(str, bracketsConfig) {
    var stack = [];
    var last = '';
    var isRight = true;

    [...str].some(bracket => {
        last = '';
        if (bracketsConfig.some(elem => elem[0] == elem[1] && elem[0] == bracket)) {
            var temp = stack.find(item => item == bracket);
            if (temp != undefined || temp != null) {
                var x = stack.pop();
                if (x != bracket) {
                    isRight = false;
                    return true;
                } else if (x == bracket) isRight = true;
            } else {
                isRight = false;
                stack.push(bracket);
            }
        } else {
            if (bracketsConfig.some(elem => elem[0] == bracket)) {
                isRight = false;
                stack.push(bracket);
            } else if (bracketsConfig.some(elem => {
                    last = elem[0];
                    return elem[1] == bracket;
                })) {
                if (stack == [] || stack.length == 0) {
                    isRight = false;
                    return true;
                } else {
                    var x = stack.pop();
                    if (x != last) {
                        isRight = false;
                        return true;
                    } else if (x == last) isRight = true;
                }
            }
        }
    })
    return isRight;
}