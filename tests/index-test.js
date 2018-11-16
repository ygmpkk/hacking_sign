import expect from 'expect'

import HackingSign from 'src/index'

describe('Hacking Sign', () => {
  it('Sign with key and secret', () => {
    const options = {
      expireAt: 1577880000000,
      maxSize: 1048576000,
      accessKeyId: '6MKOqxGiGU4AUk44',
      accessKeySecret: 'ufu7nS8kS59awNihtjSonMETLI0KLy',
      directory: 'demo/',
    }

    const signature = '8qbZWrQvf0ztXuLT25YpxftfMpY='
    const policy = 'eyJleHBpcmF0aW9uIjoiMjAyMC0wMS0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF0sWyJlcSIsIiRrZXkiLCJkZW1vL3o1NEFZN0p6cHAuZ2lmIl1dfQ=='

    const client = new HackingSign(options)
    const signed = client.sign('z54AY7Jzpp.gif')

    expect(signed.policy).toEqual(policy)
    expect(signed.signature).toEqual(signature)
  })
})
