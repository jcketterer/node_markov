const { MarkovMachine } = require('./markov')

describe('markov machine tests', () => {
  test('test chain creation', () => {
    let mm = new MarkovMachine('zz yy xx zz YY zz XX')

    expect(mm.chains).toEqual(
      new Map([
        ['zz', ['yy', 'YY', 'XX']],
        ['yy', ['xx']],
        ['xx', ['zz']],
        ['YY', ['zz']],
        ['XX', [null]],
      ]),
    )
  })
  test('choice pick from the array', () => {
    expect(MarkovMachine.choice([1, 1, 1])).toEqual(1)
    expect([1, 2, 3]).toContain(MarkovMachine.choice([1, 2, 3]))
  })
  test('created partially predictable outputs', () => {
    let mm = new MarkovMachine('x y z')
    let text = mm.makeText()
    expect(['xyz', 'yz', 'z']).toContain(text)
  })
})
