const queue  = require('./5.队列.js')

function hotPotato ( elementList, num) {
    let eliminatedList = []
    for (let index = 0; index < elementList.length; index++) {
        queue.enqueue(elementList[index]);
    }
    while(queue.size() > 1)  {
        for (let index = 0; index < num; index++) {
            queue.enqueue(queue.dequeue());
        }
        eliminatedList.push(queue.dequeue())
    }
    return {
        eliminated: eliminatedList,
        winner: queue.dequeue()
    }
}
const names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl'];
const result = hotPotato(names, 7);
console.log(result, 'result')