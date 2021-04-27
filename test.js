var a = 0
var b = async () => {
    console.log('3', a)
  a = a + await 10
  console.log('2', a) // -> ？
}
b()
a++
console.log('1', a) // -> ？