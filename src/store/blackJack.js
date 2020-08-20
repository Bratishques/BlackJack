export const blackJack = (arr) => {
    let count = 0
    for (let elem of arr) {
        const preValue = elem.replace(/[htcp]/ig,"")
        if (preValue === "j" || preValue === "q" || preValue === "k") {
            let value = 10
            count += value
        }
        else if (preValue === "a") {
            let value = 11
            count += value
        }
        else {
            let value = Number(preValue)
            count += value
        }
    
    }

    return count

}