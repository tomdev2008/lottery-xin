let numList = () => {
  return [{num: 0, odds: '9.900'}, {num: 1, odds: '9.900'}, {num: 2, odds: '9.900'}, {num: 3, odds: '9.900'}, {
    num: 4,
    odds: '9.900'
  }, {num: 5, odds: '9.900'}, {num: 6, odds: '9.900'}, {num: 7, odds: '9.900'}, {num: 8, odds: '9.900'}, {
    num: 9,
    odds: '9.900'
  }];
};
let pk10NumList = () => {
  return [{num: '01', odds: '9.761'}, {num: '02', odds: '9.761'}, {num: '03', odds: '9.761'}, {
    num: '04',
    odds: '9.761'
  }, {num: '05', odds: '9.761'}, {num: '06', odds: '9.761'}, {num: '07', odds: '9.761'}, {
    num: '08',
    odds: '9.761'
  }, {num: '09', odds: '9.761'}, {num: '10', odds: '9.761'}];
};
let pcddNumList = () => {
  return [
    {num: '0',color:'yellow', odds: '16'}, {num: '1',color:'green', odds: '15'}, {num: '2',color:'blue', odds: '14'}, {num: '3',color:'red', odds: '13'}, {
      num: '4',color:'green',
      odds: '12'
    },
    {num: '5',color:'blue', odds: '11'},
    {num: '6', color:'red',odds: '10'}, {num: '7',color:'green', odds: '10'}, {num: '8',color:'blue', odds: '10'}, {num: '9',color:'red', odds: '10'},
    {num: '10',color:'green', odds: '10'}, {num: '11',color:'blue', odds: '10'}, {num: '12',color:'red', odds: '10'}, {num: '13',color:'yellow', odds: '10'}, {
      num: '14',color:'yellow',
      odds: '10'
    },
    {num: '15',color:'red', odds: '10'}, {num: '16',color:'green', odds: '10'}, {num: '17',color:'blue', odds: '10'}, {num: '18',color:'red', odds: '10'}, {
      num: '19',color:'green',
      odds: '10'
    },
    {num: '20',color:'blue', odds: '10'}, {num: '21',color:'red', odds: '10'}, {num: '22',color:'green', odds: '11'}, {num: '23',color:'blue', odds: '12'},
    {num: '24',color:'red', odds: '13'}, {num: '25',color:'green', odds: '14'}, {num: '26',color:'blue', odds: '15'}, {num: '27',color:'yellow', odds: '16'}
  ];
};
let pcddDxdsList = () => {
  return dxdsList().concat([{num: '大单', odds: '1.960'}, {num: '小单', odds: '1.960'}, {
    num: '大双',
    odds: '1.960'
  }, {num: '小双', odds: '1.960'}, {num: '极大', odds: '10'}, {num: '极小', odds: '10'}])
}
let pcddBzList = () => {
  return [{num: '豹子', odds: '60'}];
};
let pcddBsList = () => {
  return [{num: '红波', odds: '3.000', color: 'red'}, {num: '蓝波', odds: '3.000', color: 'blue'}, {
    num: '绿波',
    odds: '3.000',
    color: 'green'
  }]
};
let lhcTmList = () => {
  return [{num: '红波', odds: '3.000', color: 'red'}, {num: '蓝波', odds: '3.000', color: 'blue'}, {
    num: '绿波',
    odds: '3.000',
    color: 'green'
  }]
};
let guanList = () => {
  return [
    {num: '冠亚大', odds: '1.870'}, {num: '冠亚小', odds: '1.870'}, {num: '冠亚单', odds: '1.870'}, {num: '冠亚双', odds: '1.870'}
  ]
}
let lhList = () => {
  return [{num: '龙', odds: '1.963'}, {num: '虎', odds: '1.963'}];
};
let GuanYaHeList = () => {
  return [
    {num: 3, odds: '9.900'}, {num: 4, odds: '9.900'}, {num: 5, odds: '9.900'}, {num: 6, odds: '9.900'}, {
      num: 7,
      odds: '9.900'
    },
    {num: 8, odds: '9.900'}, {num: 9, odds: '9.900'}, {num: 10, odds: '9.900'}, {num: 11, odds: '9.900'}, {
      num: 12,
      odds: '9.900'
    },
    {num: 13, odds: '9.900'}, {num: 14, odds: '9.900'}, {num: 15, odds: '9.900'}, {num: 16, odds: '9.900'}, {
      num: 17,
      odds: '9.900'
    },
    {num: 18, odds: '9.900'}, {num: 19, odds: '9.900'}
  ]
}
let syx5NumList = () => {
  return [{num: '01', odds: '10.746'}, {num: '02', odds: '10.746'}, {num: '03', odds: '10.746'}, {
    num: '04',
    odds: '10.746'
  }, {num: '05', odds: '10.746'}, {num: '06', odds: '10.746'}, {num: '07', odds: '10.746'}, {
    num: '08',
    odds: '10.746'
  }, {num: '09', odds: '10.746'}, {num: '10', odds: '10.746'}, {num: '11', odds: '10.746'}];
};
let dxdsList = () => {
  return [{num: '大', odds: '1.960'}, {num: '小', odds: '1.960'}, {num: '单', odds: '1.960'}, {num: '双', odds: '1.960'}];
};
let lhhList = () => {
  return [{num: '龙'}, {num: '虎'}, {num: '和'}];
};
let baoList = () => {
  return [{num: '豹子', odds: '2.020'}, {num: '对子', odds: '2.020'}, {num: '顺子', odds: '2.020'}, {
    num: '半顺',
    odds: '2.020'
  }, {num: '杂六', odds: '2.020'}];
};
let zongList = () => {
  return [
    {num: '总和大', odds: '1.963'}, {num: '总和小', odds: '1.963'}, {num: '总和单', odds: '1.963'}, {num: '总和双', odds: '1.963'}
  ];
};
let weiList = () => {
  return [
    {num: '尾大', odds: '1.960'}, {num: '尾小', odds: '1.960'}, {num: '龙', odds: '1.960'}, {num: '虎', odds: '1.960'}
  ];
};
let niuList = () => {
  return [{num: '没牛', odds: '2.020'}, {num: '牛1', odds: '2.020'}, {num: '牛2', odds: '2.020'}, {
    num: '牛3',
    odds: '2.020'
  }, {num: '牛4', odds: '2.020'}, {num: '牛5', odds: '2.020'}, {num: '牛6', odds: '2.020'}, {
    num: '牛7',
    odds: '2.020'
  }, {num: '牛8', odds: '2.020'}, {num: '牛9', odds: '2.020'}, {num: '牛牛', odds: '2.020'}, {
    num: '牛大',
    odds: '2.020'
  }, {num: '牛小', odds: '2.020'}, {num: '牛单', odds: '2.020'}, {num: '牛双', odds: '2.020'}];
};
let suoList = () => {
  return [
    {num: '五条', odds: '97.020'}, {num: '四条', odds: '97.020'}, {num: '葫芦', odds: '69.300'}, {num: '顺子', odds: '59.400'},
    {num: '三条', odds: '10.791'}, {num: '两对', odds: '7.227'}, {num: '一对', odds: '1.841'}, {num: '散号', odds: '2.821'}
  ]
};
let pl3List = () => {
  return numList().concat(dxdsList())
}
let xList1 = () => {
  return numList().concat(dxdsList())
};
let balls = () => {
  return [{show: false}, {show: false}, {show: false}, {show: false}, {show: false}]
}
//时时彩
let sscZH = () => {
  return [
    {
      title: '第一球',
      numList: xList1(),
      balls: balls()
    },
    {
      title: '第二球', numList: xList1(), balls: balls()
    },
    {
      title: '第三球', numList: xList1(), balls: balls()
    },
    {
      title: '第四球', numList: xList1(), balls: balls()
    },
    {
      title: '第五球', numList: xList1(), balls: balls()
    },

    {
      title: '前三球', numList: baoList(), balls: balls()
    },
    {
      title: '中三球', numList: baoList(), balls: balls()
    },
    {
      title: '后三球', numList: baoList(), balls: balls()
    },
    {
      title: '总和', numList: zongList(), balls: balls()
    },
    {
      title: '龙虎和', numList: lhhList(), balls: balls()
    },
    {
      title: '斗牛', numList: niuList(), balls: balls()
    },
    {
      title: '梭哈', numList: suoList(), balls: balls()
    },
  ]
}
let sscLMP = () => {
  return [
    {
      title: '第一球',
      numList: dxdsList(),
      balls: balls()
    },
    {
      title: '第二球', numList: dxdsList(),
      balls: balls()
    },
    {
      title: '第三球', numList: dxdsList(),
      balls: balls()
    },
    {
      title: '第四球', numList: dxdsList(),
      balls: balls()
    },
    {
      title: '第五球', numList: dxdsList(),
      balls: balls()
    },

    {
      title: '总和', numList: zongList(),
      balls: balls()
    },
    {
      title: '龙虎', numList: zongList(),
      balls: balls()
    },
  ]
}
//11选5
let syx5LMP = () => {
  return [
    {
      title: '第一球', numList: dxdsList(), balls: balls()
    },
    {
      title: '第二球', numList: dxdsList(), balls: balls()
    },
    {
      title: '第三球', numList: dxdsList(), balls: balls()
    },
    {
      title: '第四球', numList: dxdsList(), balls: balls()
    },
    {
      title: '第五球', numList: dxdsList(), balls: balls()
    },
    {
      title: '总和', numList: zongList().concat(weiList()), balls: balls()
    }
  ]
}
let syx51_5 = () => {
  return [
    {
      title: '第一球', numList: syx5NumList(), balls: balls()
    },
    {
      title: '第二球', numList: syx5NumList(), balls: balls()
    },
    {
      title: '第三球', numList: syx5NumList(), balls: balls()
    },
    {
      title: '第四球', numList: syx5NumList(), balls: balls()
    },
    {
      title: '第五球', numList: syx5NumList(), balls: balls()
    },
  ]
}
let syx5RX = () => {
  return [
    {
      title: '一中一', numList: syx5NumList(), balls: balls()
    },
    {
      title: '二中二', numList: syx5NumList(), balls: balls()
    },
    {
      title: '三中三', numList: syx5NumList(), balls: balls()
    },
    {
      title: '四中四', numList: syx5NumList(), balls: balls()
    },
    {
      title: '五中五', numList: syx5NumList(), balls: balls()
    },
    {
      title: '六中六', numList: syx5NumList(), balls: balls()
    },
    {
      title: '七中七', numList: syx5NumList(), balls: balls()
    },
    {
      title: '八中八', numList: syx5NumList(), balls: balls()
    },
  ]
}
let syx5ZUX = () => {
  return [
    {
      title: '前二', numList: syx5NumList(), balls: balls()
    },
    {
      title: '前三', numList: syx5NumList(), balls: balls()
    },
  ]
}
let syx5ZHIX = () => {
  return [
    {
      title: '前二 (第一球)', numList: syx5NumList(), balls: balls()
    },
    {
      title: '前二 (第二球)', numList: syx5NumList(), balls: balls()
    },
    {
      title: '前三 (第一球)', numList: syx5NumList(), balls: balls()
    },
    {
      title: '前三 (第二球)', numList: syx5NumList(), balls: balls()
    },
    {
      title: '前三 (第三球)', numList: syx5NumList(), balls: balls()
    },
  ]
}
//pk10
let pk10LMP = () => {
  return [
    {
      title: '冠亚军和', numList: guanList(), balls: balls()
    },
    {
      title: '冠军', numList: dxdsList().concat(lhList()), balls: balls()
    },
    {
      title: '亚军', numList: dxdsList().concat(lhList()), balls: balls()
    },
    {
      title: '第三名', numList: dxdsList().concat(lhList()), balls: balls()
    },
    {
      title: '第四名', numList: dxdsList().concat(lhList()), balls: balls()
    },
    {
      title: '第五名', numList: dxdsList().concat(lhList()), balls: balls()
    },
    {
      title: '第六名', numList: dxdsList(), balls: balls()
    },
    {
      title: '第七名', numList: dxdsList(), balls: balls()
    },
    {
      title: '第八名', numList: dxdsList(), balls: balls()
    },
    {
      title: '第九名', numList: dxdsList(), balls: balls()
    },
    {
      title: '第十名', numList: dxdsList(), balls: balls()
    },
  ]
}
let pk10GY = () => {
  return [
    {
      title: '冠亚军和', numList: GuanYaHeList().concat(guanList()), balls: balls()
    },
  ]
}
let pk101_5 = () => {
  return [
    {
      title: '冠军', numList: pk10NumList().concat(dxdsList()).concat(lhList()), balls: balls()
    },
    {
      title: '亚军', numList: pk10NumList().concat(dxdsList()).concat(lhList()), balls: balls()
    },
    {
      title: '第三名', numList: pk10NumList().concat(dxdsList()).concat(lhList()), balls: balls()
    },
    {
      title: '第四名', numList: pk10NumList().concat(dxdsList()).concat(lhList()), balls: balls()
    },
    {
      title: '第五名', numList: pk10NumList().concat(dxdsList()).concat(lhList()), balls: balls()
    },
  ]
}
let pk101_6_10 = () => {
  return [
    {
      title: '第六名', numList: pk10NumList().concat(dxdsList()), balls: balls()
    },
    {
      title: '第七名', numList: pk10NumList().concat(dxdsList()), balls: balls()
    },
    {
      title: '第八名', numList: pk10NumList().concat(dxdsList()), balls: balls()
    },
    {
      title: '第九名', numList: pk10NumList().concat(dxdsList()), balls: balls()
    },
    {
      title: '第十名', numList: pk10NumList().concat(dxdsList()), balls: balls()
    },
  ]
}
//pcdd
let pcddTM = () => {
  return [
    {
      title: '特码', numList: pcddNumList(), balls: balls()
    },
  ]
}
let pcddHH = () => {
  return [
    {
      title: '混合', numList: pcddDxdsList(), balls: balls()
    },
  ]
}
let pcddBS = () => {
  return [
    {
      title: '波色', numList: pcddBsList(), balls: balls()
    },
  ]
}
let pcddTMBS = () => {
  return [
    {
      title: '特码包三', numList: pcddNumList(), balls: balls()
    },
  ]
}
let pcddBZ = () => {
  return [
    {
      title: '特码', numList: pcddBzList(), balls: balls()
    },
  ]
}
//排列3,福彩3D
let pl31_3 = () => {
  return [
    {
      title: '1-3球', numList: numList(), balls: balls()
    },
  ]
}
let pl3ZH = () => {
  return [
    {
      title: '整合', numList: numList(), balls: balls()
    },
  ]
}

export let sscTpl = () => {//返回一个函数保证里面数据不会被更改
  return {
    sscZH: sscZH(),
    sscLMP: sscLMP()
  }
}
export let syx5Tpl = () => {
  return {
    syx5LMP: syx5LMP(),
    syx51_5: syx51_5(),
    syx5RX: syx5RX(),
    syx5ZUX: syx5ZUX(),
    syx5ZHIX: syx5ZHIX()
  }
}
export let pk10Tpl = () => {
  return {
    pk10LMP: pk10LMP(),
    pk10GY: pk10GY(),
    pk101_5: pk101_5(),
    pk101_6_10: pk101_6_10(),
  }
}
export let pcddTpl = () => {
  return {
    pcddTM: pcddTM(),
    pcddHH: pcddHH(),
    pcddBS: pcddBS(),
    pcddTMBS: pcddTMBS(),
    pcddBZ: pcddBZ(),
  }
}
export let pl3Tpl = () => {
  return {
    pl31_3: pl31_3(),
    pl3ZH: pl3ZH(),
  }
}
