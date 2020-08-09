function media(array) {
    const sum = soma(array);
    const media = sum / array.length;
    return media;
}

function soma(array) {
    const sum = array.reduce((previousValue, currentValue) => {
        return previousValue + currentValue;
    }, 0);
    return sum;
}

export default {media, soma};