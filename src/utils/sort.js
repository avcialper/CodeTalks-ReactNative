// To sort the list
function oldToNew (data) {
    return data.sort(function(a, b) {
        return (a.date < b.date) ? -1 : ((a.date > b.date) ? 1 : 0);
    })
}

function newToOld(data) {
    return data.sort(function (a, b) {
        return a.date > b.date ? - 1 : 0
    })
}

export {oldToNew, newToOld}