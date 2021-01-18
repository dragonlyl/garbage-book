var isPalindrome = function(s) {
    for(let i = 0, j = s.length - 1; i < j; i++, j--) {
        while (s[i] === ' ') {
            i++
        }
        while (s[j] === ' ') {
            j--
        }
        let f = s[i].toLowerCase();
        let e = s[j].toLowerCase();
        console.log(f, e)
        if (f !== e) {
            return false;
        }
    }
    return true;
};
console.log(isPalindrome("race a car"))
