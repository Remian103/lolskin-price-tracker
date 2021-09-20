
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $&는 일치한 전체 문자열을 의미합니다.
}

export function hangulFuzzyMatch(inputString) { // reference : https://taegon.kim/archives/9919
    const offset1 = '가'.charCodeAt(0);
    const offset2 = 'ㅅ'.charCodeAt(0);
    const con2syl = { // consonant to syllable
        'ㄱ': '가'.charCodeAt(0),
        'ㄲ': '까'.charCodeAt(0),
        'ㄴ': '나'.charCodeAt(0),
        'ㄷ': '다'.charCodeAt(0),
        'ㄸ': '따'.charCodeAt(0),
        'ㄹ': '라'.charCodeAt(0),
        'ㅁ': '마'.charCodeAt(0),
        'ㅂ': '바'.charCodeAt(0),
        'ㅃ': '빠'.charCodeAt(0),
        'ㅅ': '사'.charCodeAt(0),
    };
    const final2initial = {
        1: 'ㄱ',
        2: 'ㄲ',
        4: 'ㄴ',
        7: 'ㄷ',
        8: 'ㄹ',
        16: 'ㅁ',
        17: 'ㅂ',
        19: 'ㅅ',
        20: 'ㅆ',
        21: 'ㅇ',
        22: 'ㅈ',
        23: 'ㅊ',
        24: 'ㅋ',
        25: 'ㅌ',
        26: 'ㅍ',
        27: 'ㅎ',
    }

    const pattern = inputString.split('').map((ch, index) => {
        // 한글 음절 확인
        if (/[가-힣]/.test(ch)) {
            const chCode = ch.charCodeAt(0) - offset1;
            const finalCon = chCode % 28;
            // 종성이 존재하는 경우
            if (finalCon > 0) {
                /*
                * case 1 : 종성까지 해서 한글자
                * case 2 : 마지막 글자에서 종성이 다음 초성이 되는 경우 ~~~암 => ~~~아ㅁ
                */
                const initCon = final2initial[finalCon];
                if (index === inputString.length - 1 && initCon !== undefined) {
                    const begin = con2syl[initCon] || (initCon.charCodeAt(0) - offset2) * 588 + con2syl['ㅅ'];
                    const end = begin + 587;
                    return `(${ch}|${String.fromCharCode(chCode - finalCon + offset1)}[${initCon}${String.fromCharCode(begin)}-${String.fromCharCode(end)}])`;
                }
                else {
                    return ch;
                }
            }
            else {
                const end = ch.charCodeAt(0) + 27;
                return `[${ch}-${String.fromCharCode(end)}]`;
            }
        }
        //한글 초성 확인
        else if (/[ㄱ-ㅎ]/.test(ch)) {
            const begin = con2syl[ch] || (ch.charCodeAt(0) - offset2) * 588 + con2syl['ㅅ'];
            const end = begin + 587;
            return `[${ch}${String.fromCharCode(begin)}-${String.fromCharCode(end)}]`;
        }
        // 한글 아닐 경우
        else {
            return ch;
        }
    }).join('.*?');

    return new RegExp(pattern);
}