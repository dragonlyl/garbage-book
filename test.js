var a = 0
var b = async () => {
  a = a + await 10
  console.log('2', a) // -> ？
}
b()
a++
console.log('1', a) // -> ？