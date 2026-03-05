// International dial code → country name(s). Accepts +81 or 81.
export const command = (t) => {
  if (!t) return 'Usage: tel <dial-code>  e.g. tel +81  or  tel 81'
  const dial = {
    '1':'United States / Canada', '7':'Russia / Kazakhstan',
    '20':'Egypt', '27':'South Africa', '30':'Greece', '31':'Netherlands',
    '32':'Belgium', '33':'France', '34':'Spain', '36':'Hungary',
    '39':'Italy', '40':'Romania', '41':'Switzerland', '43':'Austria',
    '44':'United Kingdom', '45':'Denmark', '46':'Sweden', '47':'Norway',
    '48':'Poland', '49':'Germany', '52':'Mexico', '54':'Argentina',
    '55':'Brazil', '56':'Chile', '57':'Colombia', '60':'Malaysia',
    '61':'Australia', '62':'Indonesia', '63':'Philippines',
    '64':'New Zealand', '65':'Singapore', '66':'Thailand',
    '81':'Japan', '82':'South Korea', '84':'Vietnam', '86':'China',
    '90':'Turkey', '91':'India', '92':'Pakistan', '94':'Sri Lanka',
    '98':'Iran',
    '212':'Morocco', '213':'Algeria', '216':'Tunisia',
    '221':'Senegal', '233':'Ghana', '234':'Nigeria',
    '254':'Kenya', '255':'Tanzania', '256':'Uganda',
    '351':'Portugal', '352':'Luxembourg', '353':'Ireland', '354':'Iceland',
    '358':'Finland', '380':'Ukraine', '381':'Serbia', '385':'Croatia',
    '420':'Czechia', '421':'Slovakia',
    '852':'Hong Kong', '855':'Cambodia', '880':'Bangladesh', '886':'Taiwan',
    '961':'Lebanon', '962':'Jordan', '964':'Iraq', '965':'Kuwait',
    '966':'Saudi Arabia', '971':'UAE', '972':'Israel', '974':'Qatar',
    '977':'Nepal', '994':'Azerbaijan', '995':'Georgia', '998':'Uzbekistan',
  }
  const code = t.trim().replace(/^\+/, '')
  return dial[code] ? `+${code} — ${dial[code]}` : `Unknown: +${code}`
}
