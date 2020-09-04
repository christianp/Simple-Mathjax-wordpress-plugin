export function stripDelimiters(str) {
    if(str===undefined) {
        str = '';
    }
    return str.replace(/^(?:\\\[)*(.*?)(?:\\\])*$/,'$1');
}
