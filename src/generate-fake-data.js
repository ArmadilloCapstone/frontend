import randomColor from 'randomcolor'
import moment from 'moment'
import 'moment/locale/ko';

export default function (groupCount = 1, itemCount = 10, daysInPast = 30) {
  let randomSeed = Math.floor(Math.random() * 1000)
  let groups = []
  // for (let i = 0; i < groupCount; i++) {
    groups.push(
      {id: 1, title: 'aaa', rightTitle: 'right', bgcolor: 'white'}, 
      {id: 2, title: 'bbb', rightTitle: 'right', bgcolor: 'white'}, 
      {id: 3, title: 'ccc', rightTitle: 'right', bgcolor: 'white'}, 
      {id: 4, title: 'ddd', rightTitle: 'right', bgcolor: 'white'}, 
      {id: 5, title: 'eee', rightTitle: 'right', bgcolor: 'white'}
    )
    //   {
    //   id: `${i + 1}`,
    //   title: 'a',
    //   rightTitle: 'rightTitle',
    //   bgColor: randomColor({ luminosity: 'light', seed: randomSeed + i })
    // })
  // }

  let items = []
  for (let i = 0; i < itemCount; i++) {
    const startDate = daysInPast.valueOf() + (daysInPast * 0.3) * 86400 * 1000
    const startValue = Math.floor(moment(startDate).valueOf() / 10000000) * 10000000
    const endValue = moment(startDate + 2 * 15 * 60 * 1000).valueOf()

    items.push({
      id: i + '',
      group: 1 + '',
      title: 'title',
      start: moment('2023-04-30 3:00'),
      // startValue,
      end: moment('2023-04-30 8:00'),
      // endValue,
      // canMove: startValue > new Date().getTime(),
      // canResize: startValue > new Date().getTime() ? (endValue > new Date().getTime() ? 'both' : 'left') : (endValue > new Date().getTime() ? 'right' : false),
      className: (moment(startDate).day() === 6 || moment(startDate).day() === 0) ? 'item-weekend' : '',
      itemProps: {
        'data-tip': 'data-tip'
      }
    })
  }

  items = items.sort((a, b) => b - a)

  return { groups, items }
}
