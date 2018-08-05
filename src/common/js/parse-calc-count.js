function codeIn(code, arr){
    return arr.indexOf(code)!=-1;
}
/**
 * 算法模型
 *　func(betData, kjData, betWeiShu)
 */
//{{{ 时时彩
//{{{ 多星玩法

// 五星单式
exports.dxwf5d=function(betData, kjData){
    return ds(betData, kjData);
}

// 五星复式
exports.dxwf5f=function(betData, kjData){
    return fs(betData, kjData);
}

// 组选120
exports.dxwf5z120=function(bet, kj){
    kj=kj.split(',').sort();bet=bet.split(',');
    var kkjj=kj.concat().join(',');
    if(kkjj.match(/(\d),\1/)) return 0;
    if(Sames(bet,kj)==5){return 1;}else{return 0;}
}

// 组选60
exports.dxwf5z60=function(bet, kj){
    kj=kj.split(',').sort();bet=bet.split(',');var kjs="";
    var kkjj=kj.concat().join(',');
    if(kkjj.match(/(\d),\1,\1/)) return 0;
    var bet0=bet[0].split('');
    var bet1=bet[1].split('');
    for(var i=0;i<kj.length;i++){
        if(kj[i]==kj[i+1]){
            kjs+=kj[i];kj.splice(i,2);break;
        }
    }
    if(Sames(bet0,kjs.split(''))==1){
        if(Sames(bet1,kj)==3){
            return 1;
        }else{return 0;}
    }else{return 0;}
}

// 组选30
exports.dxwf5z30=function(bet, kj){
    kj=kj.split(',').sort();bet=bet.split(',');var kjs="";
    var kkjj=kj.concat().join(',');
    if(kkjj.match(/(\d),\1,\1/)) return 0;
    var bet0=bet[0].split('');
    var bet1=bet[1].split('');
    for(var i=0;i<kj.length;i++){
        if(kj[i]==kj[i+1]){
            kjs+=kj[i];kj.splice(i,2);break;
        }
    }
    for(var x=0;x<kj.length;x++){
        if(kj[x]==kj[x+1]){
            kjs+=kj[x];kj.splice(x,2);break;
        }
    }
    if(Sames(bet1,kj)==1){
        if(Sames(bet0,kjs.split(''))==2){
            return 1;
        }else{return 0;}
    }else{return 0;}
}

// 组选20
exports.dxwf5z20=function(bet, kj){
    kj=kj.split(',').sort();bet=bet.split(',');var kjs="";
    var kkjj=kj.concat().join(',');
    if(kkjj.match(/(\d),\1,\1,\1/)) return 0;
    var bet0=bet[0].split('');
    var bet1=bet[1].split('');
    for(var i=0;i<kj.length;i++){
        if(kj[i]==kj[i+1] && kj[i+1]==kj[i+2]){
            kjs+=kj[i];kj.splice(i,3);break;
        }
    }
    if(Sames(bet0,kjs.split(''))==1){
        if(Sames(bet1,kj)==2){
            return 1;
        }else{return 0;}
    }else{return 0;}
}

// 组选10
exports.dxwf5z10=function(bet, kj){
    kj=kj.split(',').sort();bet=bet.split(',');var kjs="";var kjs2="";
    var kkjj=kj.concat().join(',');
    if(kkjj.match(/(\d),\1,\1,\1/)) return 0;
    var bet0=bet[0].split('');
    var bet1=bet[1].split('');

    for(var i=0;i<kj.length;i++){
        if(kj[i]==kj[i+1] && kj[i+1]==kj[i+2]){
            kjs+=kj[i];kj.splice(i,3);break;
        }
    }
    for(var j=0;j<kj.length;j++){
        if(kj[j]==kj[j+1]){
            kjs2+=kj[j];kj.splice(j,2);
        }
    }
    if(Sames(bet0,kjs.split(''))==1){
        if(Sames(bet1,kjs2)==1){
            return 1;
        }else{return 0;}
    }else{return 0;}
}

// 组选5
exports.dxwf5z5=function(bet, kj){
    kj=kj.split(',').sort();bet=bet.split(',');var kjs="";
    var kkjj=kj.concat().join(',');
    if(kkjj.match(/(\d),\1,\1,\1,\1/)) return 0;
    var bet0=bet[0].split('');
    var bet1=bet[1].split('');
    for(var i=0;i<kj.length;i++){
        if(kj[i]==kj[i+1] && kj[i+1]==kj[i+2] && kj[i+2]==kj[i+3]){
            kjs+=kj[i];kj.splice(i,4);break;
        }
    }
    if(Sames(bet0,kjs.split(''))==1){
        if(Sames(bet1,kj)==1){
            return 1;
        }else{return 0;}
    }else{return 0;}
}

// 前4复式
exports.dxwfQ4f=function(betData, kjData){
    return fs(betData, kjData.removeFromList(',', 5));
}

// 前4单式
exports.dxwfQ4d=function(betData, kjData){
    return ds(betData, kjData.removeFromList(',', 5));
}

// 后4复式
exports.dxwfH4f=function(bet, kj){
    return fs(bet, kj.removeFromList(',',1));
}

// 后4单式
exports.dxwfH4d=function(bet, kj){
    return ds(bet, kj.removeFromList(',',1));
}

// 任选4复式
exports.dxwfR4f=function(bet, kj){
    var w=bet.split(',').indexOf('-')+1;
    kj=kj.replaceList('-', w);
    return fs(bet, kj);
}

// 任选4单式
exports.dxwfR4d=function(bet, kj){
    var w=bet.substr(0,9).split(',').indexOf('-')+1;
    kj=kj.replaceList('-', w);
    return ds(bet, kj);
}

// 组选24
exports.dxwf4z24=function(bet, kj){
    kj=kj.substr(2,7).split(',').sort();bet=bet.split(',');
    var kkjj=kj.concat().join(',');
    if(kkjj.match(/(\d),\1/)) return 0;
    if(Sames(bet,kj)==4){
        return 1;
    }else{return 0;}
}

// 组选12
exports.dxwf4z12=function(bet, kj){
    kj=kj.substr(2,7).split(',').sort();bet=bet.split(',');var kjs="";
    var kkjj=kj.concat().join(',');
    if(kkjj.match(/(\d),\1,\1/)) return 0;
    var bet0=bet[0].split('');
    var bet1=bet[1].split('');
    for(var i=0;i<kj.length;i++){
        if(kj[i]==kj[i+1]){
            kjs+=kj[i];kj.splice(i,2);break;
        }
    }
    if(Sames(bet0,kjs.split(''))==1){
        if(Sames(bet1,kj)==2){
            return 1;
        }else{return 0;}
    }else{return 0;}
}

// 组选6
exports.dxwf4z6=function(bet, kj){
    kj=kj.substr(2,7).split(',').sort();bet=bet.split(',');var kjs="";var kjs2="";
    var kkjj=kj.concat().join(',');
    if(kkjj.match(/(\d),\1,\1/)) return 0;
    for(var i=0;i<kj.length;i++){
        if(kj[i]==kj[i+1]){
            kjs+=kj[i];kj.splice(i,2);break;
        }
    }
    for(var j=0;j<kj.length;j++){
        if(kj[j]==kj[j+1]){
            kjs2+=kj[j];kj.splice(j,2);break;
        }
    }
    if(Sames(bet,kjs.split(''))==1){
        if(Sames(bet,kjs2)==1){
            return 1;
        }else{return 0;}
    }else{return 0;}
}

// 组选4
exports.dxwf4z4=function(bet, kj){
    kj=kj.substr(2,7).split(',').sort();bet=bet.split(',');var kjs="";
    var kkjj=kj.concat().join(',');
    if(kkjj.match(/(\d),\1,\1,\1/)) return 0;
    var bet0=bet[0].split('');
    var bet1=bet[1].split('');
    for(var i=0;i<kj.length;i++){
        if(kj[i]==kj[i+1] && kj[i+1]==kj[i+2]){
            kjs+=kj[i];kj.splice(i,3);break;
        }
    }
    if(Sames(bet0,kjs.split(''))==1){
        if(Sames(bet1,kj)==1){
            return 1;
        }else{return 0;}
    }else{return 0;}
}

//}}}

//{{{ 三星玩法

// 前三复式
exports.sxwfQ3f=function(bet, kj){
    return fs(bet, kj.removeFromList(',', 4,5));
}

// 前三单式
exports.sxwfQ3d=function(bet, kj){
    return ds(bet, kj.removeFromList(',', 4,5));
}

// 三码--中三单式
exports.sxwfZ3d=function(bet, kj){
    return ds(bet, kj.removeFromList(',', 1,5));
}

// 中三复式
exports.sxwfz3fs=function(bet, kj){
    return fs(bet, kj.substr(2,5));
}

// 中三单式
exports.sxwfz3ds=function(bet, kj){
    return ds(bet, kj.substr(2,5));
}

// 后三复式
exports.sxwfH3f=function(bet, kj){
    return fs(bet, kj.removeFromList(',', 1, 2));
}

// 后三单式
exports.sxwfH3d=function(bet, kj){
    return ds(bet, kj.removeFromList(',', 1,2));
}

// 任选三复式
exports.sxwfR3f=function(bet, kj){
    bet.split(',').map(function(v, i){
        if(v=='-') kj=kj.replaceList('-',i+1);
    });

    return fs(bet, kj);
}

// 任选三单式
exports.sxwfR3d=function(bet, kj){
    bet.substr(0,9).split(',').map(function(v, i){
        if(v=='-') kj=kj.replaceList('-',i+1);
    });

    return ds(bet, kj);
}

// 前三和值尾数
exports.sxq3hzws=function(bet, kj){
    kj=kj.substr(0,5).split(',');bet=bet.split(' ');var bet2="";
    var m=parseInt(kj[0])+parseInt(kj[1])+parseInt(kj[2]);
    if(m<10){var g=m;}else{g=m%10;}
    for(var i=0;i<bet.length;i++){
        if(g==parseInt(bet[i])) {bet2+=bet[i];break;}
    }
    return bet2.length;
}

// 后三和值尾数
exports.sxh3hzws=function(bet, kj){
    kj=kj.substr(4,5).split(',');bet=bet.split(' ');var bet2="";
    var m=parseInt(kj[0])+parseInt(kj[1])+parseInt(kj[2]);
    if(m<10){var g=m;}else{g=m%10;}
    for(var i=0;i<bet.length;i++){
        if(g==parseInt(bet[i])) {bet2+=bet[i];break;}
    }
    return bet2.length;
}

//}}}

//{{{ 三星组选

// 前三组三
exports.sxzxQ3z3=function(bet, kj){

    return z3(bet, kj.substr(0,5));
}

// 前三组六
exports.sxzxQ3z6=function(bet, kj){
    return z6(bet, kj.substr(0,5));
}

// 中三组三
exports.sxzxz3z3=function(bet, kj){

    return z3(bet, kj.substr(2,5));
}

// 中三组六
exports.sxzxz3z6=function(bet, kj){
    return z6(bet, kj.substr(2,5));
}

// 中三混合组选
exports.sxzxZ3h=function(bet, kj){

}

// 前三混合组选
exports.sxzxQ3h=function(bet, kj){

}

// 后三组三
exports.sxzxH3z3=function(bet, kj){
    return z3(bet, kj.substr(4,5));
}

// 后三组六
exports.sxzxH3z6=function(bet, kj){
    return z6(bet, kj.substr(4,5));
}

// 后三混合组选
exports.sxzxH3h=function(bet, kj){

}

// 任三组三
exports.sxzxR3z3=function(bet, kj, w){
    kj=kj.split(',');
    [16, 8, 4, 2, 1].forEach(function(v, i){
        if((w&v)==0) delete kj[i];
    });
    kj=kj.filter(function(v){
        return v!=undefined;
    }).join(',');

    return z3(bet, kj);
}

// 任三组六
exports.sxzxR3z6=function(bet, kj, w){
    kj=kj.split(',');
    [16, 8, 4, 2, 1].forEach(function(v, i){
        if((w&v)==0) delete kj[i];
    });
    kj=kj.filter(function(v){
        return v!=undefined;
    }).join(',');

    return z6(bet, kj);
}

// 任三混合组
exports.sxzxR3h=function(bet, kj, w){
}

// 前三组选和值
exports.sxzxQ3hz=function(bet, kj){
    kj=kj.substr(0,5).split(',');
    bet=bet.split(',');
    var bz=kj.join();
    if(bz.match(/(\d),\1,\1/)) alert(0);
    var m=parseInt(kj[0])+parseInt(kj[1])+parseInt(kj[2]);
    for(var i=0;i<bet.length;i++){
        if(m==bet[i]){
            if(isRepeat(kj)){ return 2;break;}else{return 1;break;}
        }
    }
}

// 后三组选和值
exports.sxzxH3hz=function(bet, kj){
    kj=kj.substr(4,5).split(',');
    bet=bet.split(',');
    var bz=kj.join();
    if(bz.match(/(\d),\1,\1/)) alert(0);
    var m=parseInt(kj[0])+parseInt(kj[1])+parseInt(kj[2]);
    for(var i=0;i<bet.length;i++){
        if(m==bet[i]){
            if(isRepeat(kj)){ return 2;break;}else{return 1;break;}
        }
    }
}

// 前三特殊号码
exports.sxzxQ3ts=function(bet, kj){
    kj=kj.substr(0,5).split(',').sort();
    bet=bet.split(',');
    for(var i=0;i<kj.length;i++){
        if(kj[i]==kj[i+1]){
            if(bet.indexOf('对子')!=-1){return 1;break;}else{return 0;break;}
        }
        if(kj[i]==kj[i+1]-1 && kj[i+1]==kj[i+2]-1){
            if(bet.indexOf('顺子')!=-1){return 4;break;}else{return 0;break;}
        }
        if(kj[i]==kj[i+1] && kj[i+1]==kj[i+2]){
            if(bet.indexOf('豹子')!=-1){return 27;break;}else{return 0;break;}
        }
    }
}

// 后三特殊号码
exports.sxzxH3ts=function(bet, kj){
    kj=kj.substr(4,5).split(',').sort();
    bet=bet.split(',');
    for(var i=0;i<kj.length;i++){
        if(kj[i]==kj[i+1]){
            if(bet.indexOf('对子')!=-1){return 1;break;}else{return 0;break;}
        }
        if(kj[i]==kj[i+1]-1 && kj[i+1]==kj[i+2]-1){
            if(bet.indexOf('顺子')!=-1){return 4;break;}else{return 0;break;}
        }
        if(kj[i]==kj[i+1] && kj[i+1]==kj[i+2]){
            if(bet.indexOf('豹子')!=-1){return 27;break;}else{return 0;break;}
        }
    }
}

// 前三直选跨度
exports.sxzxQ3kd=function(bet, kj){
    kj=kj.substr(0,5).split(',').sort();
    bet=bet.split(',').join('');;
    var m=(parseInt(kj[2])-parseInt(kj[0])).toString().split('');
    if(bet.indexOf(m)!=-1){return 1;}else{return 0;}
}

// 前二直选跨度
exports.sscq2zxkd=function(bet, kj){
    kj=kj.substr(0,3).split(',').sort();
    bet=bet.split(',').join('');;
    var m=(parseInt(kj[1])-parseInt(kj[0])).toString().split('');
    if(bet.indexOf(m)!=-1){return 1;}else{return 0;}
}

// 后三直选跨度
exports.sxzxH3kd=function(bet, kj){
    kj=kj.substr(4,5).split(',').sort();
    bet=bet.split(',').join('');;
    var m=(parseInt(kj[2])-parseInt(kj[0])).toString().split('');
    if(bet.indexOf(m)!=-1){return 1;}else{return 0;}
}
//}}}

//{{{ 二星直选

// 前二复式
exports.rxwfQ2f=function(bet, kj){
    return fs(bet, kj.substr(0,3));
}

// 前二单式
exports.rxwfQ2d=function(bet, kj){
    return ds(bet, kj.substr(0,3));
}

// 后二复式
exports.rxwfH2f=function(bet, kj){
    return fs(bet, kj.substr(6,3));
}

// 后二单式
exports.rxwfH2d=function(bet, kj){
    return ds(bet, kj.substr(6,3));
}

// 前二和值
exports.sscq2zhixhz=function(bet, kj){
    var k=0;kj=kj.split(',');bet=bet.split(',');
    var m=(parseInt(kj[0])+parseInt(kj[1]));
    for(i=0;i<bet.length;i++){
        if(bet[i]==m) k+=1;
    }
    return k;
}

// 后二和值
exports.ssch2zhixhz=function(bet, kj){
    var k=0;kj=kj.split(',');bet=bet.split(',');
    var m=(parseInt(kj[3])+parseInt(kj[4]));
    for(i=0;i<bet.length;i++){
        if(bet[i]==m) k+=1;
    }
    return k;
}

// 前二组选和值
exports.sscq2zhuxhz=function(bet, kj){
    var k=0;kj=kj.split(',');bet=bet.split(',');
    if(kj[0]==kj[1]) return 0;
    var m=(parseInt(kj[0])+parseInt(kj[1]));
    for(i=0;i<bet.length;i++){
        if(bet[i]==m) k+=1;
    }
    return k;
}

// 后二组选和值
exports.ssch2zhuxhz=function(bet, kj){
    var k=0;kj=kj.split(',');bet=bet.split(',');
    if(kj[3]==kj[4]) return 0;
    var m=(parseInt(kj[3])+parseInt(kj[4]));
    for(i=0;i<bet.length;i++){
        if(bet[i]==m) k+=1;
    }
    return k;
}

// 任选二复式
exports.rxwfR2f=exports.sxwfR3f;

// 任选二单式
exports.rxwfR2d=exports.sxwfR3d;

//}}}

//{{{ 二星组选

// 前二组复式
exports.rxzxQ2f=function(bet, kj){
    return z2f(bet, kj.substr(0,3));
}

// 前二组单式
exports.rxzxQ2d=function(bet, kj){
    return z2d(bet, kj.substr(0,3));
}

// 二码--前二组选单式
exports.gd11x5Q2zd=function(bet, kj){
    return z2ds(bet, kj.substr(0,5));
}

// 二码--后二组选单式
exports.gd11x5H2zd=function(bet, kj){
    return z2ds(bet, kj.substr(9,5));
}

/**
 * 二码--组二单式
 *
 * @params bet		投注列表：02,03|05,06|08,07
 * @params data		开奖所需的那几位号码：04,05
 *
 * @return			返回中奖注数
 */
function z2ds(bet, data){
    // 对子不算中奖
    if(data.match(/^(\d),\1/)) return 0;
    data2=data.split(',');
    data1=data2[1]+','+data2[0];

    return bet.split('|').filter(function(v){
        return v==data||v==data1;
    }).length;
}

// 三码--前三组单式
exports.gd11x5Q3zd=function(bet, kj){
    return z3d(bet, kj.substr(0,8));
}
// 三码--中三组单式
exports.gd11x5Z3zd=function(bet, kj){
    return z3d(bet, kj.substr(3,8));
}
// 三码--后三组单式
exports.gd11x5H3zd=function(bet, kj){
    return z3d(bet, kj.substr(6,8));
}
/**
 * 三码--组三单式
 *
 * @params bet		投注列表：02,03|05,06|08,07
 * @params data		开奖所需的那几位号码：04,05
 *
 * @return			返回中奖注数
 */
function z3d(bet, data){
    // 对子不算中奖
    //if(data.match(/^(\d),\1/)) return 0;
    data=data.split(',').sort();
    count=0;
    bet=bet.split('|');
    for(var i=0;i<bet.length;i++){
        bet1=bet[i].split(',').sort();
        if(data[0]==bet1[0]&&data[1]==bet1[1]&&data[2]==bet1[2]){
            count+=1;
        }
    }
    return count;
}

// 后二组复式
exports.rxzxH2f=function(bet, kj){
    return z2f(bet, kj.substr(6,3));
}

// 后二组单式
exports.rxzxH2d=function(bet, kj){
    return z2d(bet, kj.substr(6,3));
}

// 任选二组选复式
exports.rxzxR2f=function(bet, kj, w){
    kj=kj.split(',');
    [16, 8, 4, 2, 1].forEach(function(v, i){
        if((w&v)==0) delete kj[i];
    });
    kj=kj.filter(function(v){
        return v!=undefined;
    }).join(',');

    return z2f(bet, kj);
}

// 任选二组选单式
exports.rxzxR2d=function(bet, kj, w){
    kj=kj.split(',');
    [16, 8, 4, 2, 1].forEach(function(v, i){
        if((w&v)==0) delete kj[i];
    });
    //console.log(kj);
    kj=kj.filter(function(v){
        return v!=undefined;
    }).join(',');

    bet=bet.split('|').map(function(b){
        b=b.split(',');
        [16, 8, 4, 2, 1].forEach(function(v, i){
            if((w&v)==0) delete b[i];
        });
        return b.filter(function(v){
            return v!=undefined;
        }).join(',');
    }).join('|');

    return z2d(bet, kj);
}

// 前二组包胆
exports.rxzxQ2bd=function(bet, kj){
    kj=kj.substr(0,3).split(',');
    if(kj[0]!=kj[1]){
        if(kj.indexOf(bet)!=-1){
            return 9;
        }else{return 0;}
    }else{return 0;}
}

// 后二组包胆
exports.rxzxH2bd=function(bet, kj){
    kj=kj.substr(6,3).split(',');
    if(kj[0]!=kj[1]){
        if(kj.indexOf(bet)!=-1){
            return 9;
        }else{return 0;}
    }else{return 0;}
}
//{{{ 五星定位胆

exports.dwd5x=function(bet, kj){
    kj=kj.split(',');
    var count=0;
    bet.split(',').map(function(v, i){
        if(v.length>1){
            v.split('').map(function(s){
                if(s==kj[i]) count++;
            });
        }else{
            if(v==kj[i]) count++;
        }
    });
    return count;
}

//{{{ 十星定位胆

exports.dwd10x=function(bet, kj){
    kj=kj.split(',');
    var count=0;

    bet.split(',').map(function(v, i){
        if(v.length>2){
            v.split(' ').map(function(s){
                if(s==kj[i]) count++;
            });
        }else{
            if(v==kj[i]) count++;
        }
    });

    return count;
}

//}}}

//{{{ 不定胆

// 后三不定胆
exports.bddH3=function(bet, kj){
    kj=kj.substr(4,5);
    bet=bet.split('').filter(function(v){
        return kj.indexOf(v)!=-1;
    });

    return bet.length;
}

// 前三不定胆
exports.bddQ3=function(bet, kj){
    kj=kj.substr(0,5);
    bet=bet.split('').filter(function(v){
        return kj.indexOf(v)!=-1;
    });
    return bet.length;
}

// 中三不定胆
exports.bddZ3=function(bet, kj){
    kj=kj.substr(2,5);
    bet=bet.split('').filter(function(v){
        return kj.indexOf(v)!=-1;
    });

    return bet.length;
}

// 任选三不定胆
exports.bddR3=function(bet, kj, w){
    kj=kj.split(',');
    [16, 8, 4, 2, 1].forEach(function(v, i){
        if((w&v)==0) delete kj[i];
    });
    kj=kj.filter(function(v){
        return v!=undefined;
    }).join(',');
    bet=bet.split('').filter(function(v){
        return kj.indexOf(v)!=-1;
    });
    return bet.length;
}
// 前三二码  二码不定位
exports.bdwQ32=function(bet, kj){
    kj=filterArray(kj.substr(0,5).split(','));bet=bet.split(' ');
    if(bet.length<kj.length){
        if(Sames(kj,bet)>=2) return Combination(Sames(kj,bet),2);
    }else if(bet.length>=kj.length){
        if(Sames(bet,kj)>=2) return Combination(Sames(bet,kj),2);
    }
}

// 后三二码
exports.bdwH32=function(bet, kj){
    kj=filterArray(kj.substr(4,5).split(','));bet=bet.split(' ');
    if(bet.length<kj.length){
        if(Sames(kj,bet)>=2) return Combination(Sames(kj,bet),2);
    }else if(bet.length>=kj.length){
        if(Sames(bet,kj)>=2) return Combination(Sames(bet,kj),2);
    }
}
// 五星三码
exports.bdw5x3m=function(bet, kj){
    kj=filterArray(kj.split(','));bet=bet.split(' ');
    if(bet.length<kj.length){
        if(Sames(kj,bet)>=3) return Combination(Sames(kj,bet),3);
    }else if(bet.length>=kj.length){
        if(Sames(bet,kj)>=3) return Combination(Sames(bet,kj),3);
    }
}
// 五星二码
exports.bdw5x2m=function(bet, kj){
    kj=filterArray(kj.split(','));bet=bet.split(' ');
    if(bet.length<kj.length){
        if(Sames(kj,bet)>=2) return Combination(Sames(kj,bet),2);
    }else if(bet.length>=kj.length){
        if(Sames(bet,kj)>=2) return Combination(Sames(bet,kj),2);
    }
}
// 五星一码
exports.bdw5x1m=function(bet, kj){
    kj=filterArray(kj.split(','));bet=bet.split(' ');
    if(bet.length<kj.length){
        if(Sames(kj,bet)>=1) return Combination(Sames(kj,bet),1);
    }else if(bet.length>=kj.length){
        if(Sames(bet,kj)>=1) return Combination(Sames(bet,kj),1);
    }
}
// 四星二码
exports.bdw4x2m=function(bet, kj){
    kj=filterArray(kj.substr(2,7).split(','));bet=bet.split(' ');
    if(bet.length<kj.length){
        if(Sames(kj,bet)>=2) return Combination(Sames(kj,bet),2);
    }else if(bet.length>=kj.length){
        if(Sames(bet,kj)>=2) return Combination(Sames(bet,kj),2);
    }
}
// 前四二码
exports.bdw4x2qm=function(bet, kj){
    kj=filterArray(kj.substr(0,7).split(','));bet=bet.split(' ');
    if(bet.length<kj.length){
        if(Sames(kj,bet)>=2) return Combination(Sames(kj,bet),2);
    }else if(bet.length>=kj.length){
        if(Sames(bet,kj)>=2) return Combination(Sames(bet,kj),2);
    }
}
// 四星一码
exports.bdw4x1m=function(bet, kj){
    kj=filterArray(kj.substr(2,7).split(','));bet=bet.split(' ');
    if(bet.length<kj.length){
        if(Sames(kj,bet)>=1) return Sames(kj,bet);
    }else if(bet.length>=kj.length){
        if(Sames(bet,kj)>=1) return Sames(bet,kj);
    }
}
// 前四一码
exports.bdw4x1qm=function(bet, kj){
    kj=filterArray(kj.substr(0,7).split(','));bet=bet.split(' ');
    if(bet.length<kj.length){
        if(Sames(kj,bet)>=1) return Sames(kj,bet);
    }else if(bet.length>=kj.length){
        if(Sames(bet,kj)>=1) return Sames(bet,kj);
    }
}
//}}}
//快三大小单双
exports.fcsdxds=function(bet, kj){
    return sdxds(bet, kj);
}
function sdxds(bet, data){

    var kj=data.split(',');
    var sum=0;
    for(var i=0;i<kj.length;i++){
        var sum=sum+parseInt(kj[i]);
    }
//判断单双
    if(sum%2==0){
        if(bet.indexOf('双')!=-1)return 1;
    }else{
        if(bet.indexOf('单')!=-1)return 1;
    }

    //小于10是小
    if(sum<=10){
        //只是小
        if(bet.indexOf('小')!=-1) return 1;
    }else{
        if(bet.indexOf('大')!=-1) return 1;
    }


    return 0;
}
//{{{ 大小单双

// 前二大小单双
exports.dsQ2=function(bet, kj){
    return dxds(bet, kj.substr(0,3));
}

// 前三大小单双
exports.dsQ3=function(bet, kj){
    return dxds(bet, kj.substr(0,5));
}

// 后二大小单双
exports.dsH2=function(bet, kj){
    return dxds(bet, kj.substr(6,3));
}
// 后三大小单双
exports.dsH3=function(bet, kj){
    return dxds(bet, kj.substr(4,5));
}

// 任选二大小单双
exports.dsR2=function(bet, kj, w){
    kj=kj.split(',');
    bet=bet.split(',').filter(function(v, i){
        if(v=='-'){
            delete kj[i];
        }else{
            return v;
        }
    }).join(',');
    kj=kj.filter(function(v){
        return v!=undefined;
    }).join(',');

    return dxds(bet, kj);
}

// 时时彩
// 龙
exports.ssc_lhh_l=function (bet,kj) {
    bet=bet.split(' ');
    count=0;
    for (var i=0,l=bet.length; i<l; i++){
        val = val12(bet[i],kj).split(',');
        val1=parseInt(val[0],10);
        val2=parseInt(val[1],10);
        if(bet[i].length>0){
            if(val1>val2) count+=1;
        }
    }
    return count;
}
// 虎
exports.ssc_lhh_h=function (bet,kj) {
    bet=bet.split(' ');
    count=0;
    for (var i=0,l=bet.length; i<l; i++){
        val = val12(bet[i],kj).split(',');
        val1=parseInt(val[0],10);
        val2=parseInt(val[1],10);
        if(bet[i].length>0){
            if(val1<val2) count+=1;
        }
    }
    return count;
}
// 和
exports.ssc_lhh_he=function (bet,kj) {
    bet=bet.split(' ');
    count=0;
    for (var i=0,l=bet.length; i<l; i++){
        val = val12(bet[i],kj).split(',');
        val1=parseInt(val[0],10);
        val2=parseInt(val[1],10);
        if(bet[i].length>0){
            if(val1==val2) count+=1;
        }
    }
    return count;
}
// 返回相邻龙虎值
function val12(beti,kj) {
    kj=kj.split(',');
    if(beti=='万千'){
        val1=parseInt(kj[0],10);
        val2=parseInt(kj[1],10);
    }else if(beti=='万百'){
        val1=parseInt(kj[0],10);
        val2=parseInt(kj[2],10);
    }else if(beti=='万十'){
        val1=parseInt(kj[0],10);
        val2=parseInt(kj[2],10);
    }else if(beti=='万个'){
        val1=parseInt(kj[0],10);
        val2=parseInt(kj[4],10);
    }else if(beti=='千百'){
        val1=parseInt(kj[1],10);
        val2=parseInt(kj[2],10);
    }else if(beti=='千十'){
        val1=parseInt(kj[1],10);
        val2=parseInt(kj[3],10);
    }else if(beti=='千个'){
        val1=parseInt(kj[1],10);
        val2=parseInt(kj[4],10);
    }else if(beti=='百十'){
        val1=parseInt(kj[2],10);
        val2=parseInt(kj[3],10);
    }else if(beti=='百个'){
        val1=parseInt(kj[2],10);
        val2=parseInt(kj[4],10);
    }else if(beti=='十个'){
        val1=parseInt(kj[3],10);
        val2=parseInt(kj[4],10);
    }
    return val1+','+val2;
}

// 时时彩信用玩法
// 整合-大小单双
exports.ssczh1=function(bet,kj) {
    kj=kj.split(',')[0];
    return sscxydxds(bet,kj);
}
exports.ssczh2=function(bet,kj) {
    kj=kj.split(',')[1];
    return sscxydxds(bet,kj);
}
exports.ssczh3=function(bet,kj) {
    kj=kj.split(',')[2];
    return sscxydxds(bet,kj);
}
exports.ssczh4=function(bet,kj) {
    kj=kj.split(',')[3];
    return sscxydxds(bet,kj);
}
exports.ssczh5=function(bet,kj) {
    kj=kj.split(',')[4];
    return sscxydxds(bet,kj);
}
// 大小单双 3d通用
function sscxydxds(bet,kj) {
    count=0;
    for (var i=0,l=bet.length; i<l; i++){
        if(bet=='大'){
            if(kj>4) count+=1;
        }else if(bet=='小'){
            if(kj<5) count+=1;
        }else if(bet=='单'){
            if(kj%2!=0) count+=1;
        }else if(bet=='双'){
            if(kj%2==0) count+=1;
        }else if(parseInt(bet)==parseInt(kj)){
            count+=1;
        }
    }
    return count;
}
// 前三球
exports.q3balls=function (bet,kj) {
    kj = kj.substr(0,5);
    return sscsq(bet,kj);
}
// 中三球
exports.z3balls=function (bet,kj) {
    kj = kj.substr(2,5);
    return sscsq(bet,kj);
}
// 后三球
exports.h3balls=function (bet,kj) {
    kj = kj.substr(4,5);
    return sscsq(bet,kj);
}
//  时时彩-三球 3D-三连 通用
function sscsq(bet,kj) {
    kj = kj.split(',').sort();
    kj2=kj[0]+kj[1]+kj[2];
    kj[0]=parseInt(kj[0]);
    kj[1]=parseInt(kj[1]);
    kj[2]=parseInt(kj[2]);
    count=0;
    // 半顺包含组合
    var banshun='013,014,015,016,017,018,023,029,034,039,045,049,056,059,067,069,078,079,124,125,' +
        '126,127,128,129,134,145,156,167,178,189,235,236,237,238,239,245,256,267,278,289,' +
        '346,347,348,349,356,367,378,389,457,458,459,467,478,489,568,569,578,589,679,689';
    if(kj[0]==kj[1]==kj[2] && bet=='豹子'){
        count+=1;
    }else if((kj[0]==kj[1]||kj[1]==kj[2]||kj[0]==kj[2])&&bet=='对子'){
        count+=1;
    }else if(kj[1]==kj[0]+1 && kj[2]==kj[1]+1 && bet=='顺子'){
        count+=1;
    }else if(kj[0]==0 && kj[1]==1 && kj[2]==9 && bet=='顺子'){
        // 9,0,1相连也算顺子
        count+=1;
    }else if(banshun.indexOf(kj2)!=-1 && bet=='半顺'){
        count+=1;
    }else if((kj[0]+kj[1]==6 || kj[0]+kj[2]==6 || kj[1]+kj[2]==6 || kj[1]-kj[0]==6 || kj[2]-kj[1]==6 || kj[2]-kj[0]==6|| kj.indexOf(6)!=-1)&& bet=='杂六'){
        count+=1;
    }
    return count;
}
// 两面盘-总和
exports.ssczonghe=function (bet,kj) {
    return zonghe_ssc(bet,kj);
}
// 总和
function zonghe_ssc(bet,kj){
    kj = kj.split(',');
    sum=0;
    for(i=0;i<5;i++){
        sum+= parseInt(kj[i]);
    }
    count=0;
    if(sum>22 && bet=='总和大'){
        count+=1;
    }else if(sum<23 && bet=='总和小'){
        count+=1;
    }else if(sum%2!=0 && bet=='总和单'){
        count+=1;
    }else if(sum%2==0 && bet=='总和双'){
        count+=1;
    }
    return count;
}
// 龙虎
exports.ssclonghu=function (bet,kj) {
    kj=kj.split(',');
    kj1=kj[0];kj2=kj[4];
    return comparelh(bet,kj1,kj2);
}
// 比较两数大小
function comparelh(bet,kj1,kj2) {
    count=0;
    if(kj1>kj2&&bet=='龙'){
        count+=1;
    }else if(kj1<kj2&&bet=='虎'){
        count+=1;
    }else if(kj1==kj2&&bet=='和'){
        count+=1;
    }
    return count;
}
//时时彩斗牛
exports.sscdouniu=function (bet,kj){
    var order = '123,124,125,134,135,145,234,235,245,345';
    order = order.split(',');
    kj=kj.split(',');
    count=0;
    flag=0;
    for(var i=0;i<order.length;i++){
        order1 = order[i].split('');
        sum = parseInt(kj[order1[0]-1])+parseInt(kj[order1[1]-1])+parseInt(kj[order1[2]-1]);
        if(sum%10==0){
            flag=1;
            sum2=0;
            for(j=0;j<5;j++){
                sum2+=parseInt(kj[j]);
            }
            result = (sum2-sum)%10;
            if(result==1&&bet=='牛1'){
                count=1;
            }else if(result==2&&bet=='牛2'){
                count=1;
            }else if(result==3&&bet=='牛3'){
                count=1;
            }else if(result==4&&bet=='牛4'){
                count=1;
            }else if(result==5&&bet=='牛5'){
                count=1;
            }else if(result==6&&bet=='牛6'){
                count=1;
            }else if(result==7&&bet=='牛7'){
                count=1;
            }else if(result==8&&bet=='牛8'){
                count=1;
            }else if(result==9&&bet=='牛9'){
                count=1;
            }else if(result==0&&bet=='牛牛'){
                count=1;
            }else if(result%2!=0&&bet=='牛单'){
                count=1;
            }else if(result%2==0&&bet=='牛双'){
                count=1;
            }else if(result<6&&bet=='牛小'){
                count=1;
            }else if(result>5&&bet=='牛大'){
                count=1;
            }
        }
    }
    if(bet=='没牛'&&flag==0){
        count=1;
    }
    return count;
}
// 梭哈
exports.sscsuoha=function (bet,kj){
    kj = kj.split(',').sort();
    count=0;
    if(parseInt(kj[0])==parseInt(kj[4]) && bet=='五条'){
        count+=1;
    }else if((parseInt(kj[0])==parseInt(kj[3]) && bet=='四条')||(parseInt(kj[1])==parseInt(kj[4]) && bet=='四条')){
        count+=1;
    }else if((parseInt(kj[0])==parseInt(kj[2]) && bet=='三条')||(parseInt(kj[1])==parseInt(kj[3]) && bet=='三条')||(parseInt(kj[2])==parseInt(kj[4]) && bet=='三条')){
        count+=1;
    }else if((parseInt(kj[0])==parseInt(kj[2]) && parseInt(kj[3])==parseInt(kj[4]) && bet=='葫芦')||(parseInt(kj[2])==parseInt(kj[4]) && parseInt(kj[0])==parseInt(kj[1]) &&bet=='葫芦')){
        count+=1;
    }else if(islinked(kj)&& bet=='顺子'){
        count+=1;
    }else if(compress(kj)==4 && bet=='一对'){
        count+=1;
    }else if(compress(kj)==5 && bet=='散号'){
        count+=1;
    }else if(compress(kj)==3 && kj[0]!=kj[2] && kj[2]!=kj[4] && kj[1]!=kj[3] &&bet=='两对'){
        count+=1;
    }
    return count;

}
// 压缩后一维数组个数
function compress(kj){
    num=1;
    for(i=1;i<5;i++){
        if(parseInt(kj[i])!=parseInt(kj[i-1])){
            num+=1;
        }
    }
    return num;
}
// 五个数是否连贯
function islinked(kj){
    num=1;
    for(i=1;i<5;i++){
        if(parseInt(kj[i])!=parseInt(kj[i-1])+1){
            num=0;
        }
    }
    return num;
}
// 时时彩结束

//{{{ 福彩3D

// 三星直选－复式
exports.fc3dFs=fs;

// 三星直选－单式
exports.fc3dDs=ds;

// 三星直选和值
exports.fc3dhz=function(bet, kj){
    bet=bet.split(',');kj=kj.split(',');var count=0;
    var a=parseInt(kj[0])+parseInt(kj[1])+parseInt(kj[2]);
    if(bet.indexOf(a)!=-1) count+=1;
    return count;
}

// 三星组选－组三
exports.fc3dZ3=z3;

// 三星组选－组六
exports.fc3dZ6=z6;

// 三星组选和值
exports.fc3d_zxhz=function(bet, kj){
    bet=bet.split(',');kj=kj.split(',');
    var kkjj=kj.concat().join(',');
    if(kkjj.match(/(\d),\1,\1/)) return 0;
    var a=parseInt(kj[0])+parseInt(kj[1])+parseInt(kj[2]);
    if(bet.indexOf(a)!=-1)
        if(isRepeat(kj)){ return 2;}else{return 1;}
}

// 前三直选和值
exports.sxwfQ3hz=function(bet, kj){
    kj=kj.substr(0,5).split(',');bet=bet.split(' ');
    var m=parseInt(kj[0])+parseInt(kj[1])+parseInt(kj[2]);
    count=0;
    for(var i=0;i<bet.length;i++){
        if(m==parseInt(bet[i])) {count+=1;break;}
    }
    return count;
}
// 后三直选和值
exports.sxwfH3hz=function(bet, kj){
    kj=kj.substr(4,5).split(',');bet=bet.split(' ');
    var m=parseInt(kj[0])+parseInt(kj[1])+parseInt(kj[2]);
    count=0;
    for(var i=0;i<bet.length;i++){
        if(m==parseInt(bet[i])) {count+=1;break;}
    }
    return count;
}

// 二星直选－前二单式
exports.fc3dQ2d=exports.rxwfQ2d;

// 二星直选－前二复式
exports.fc3dQ2f=exports.rxwfQ2f;

// 二星直选－后二单式
exports.fc3dH2d=function(bet, kj){
    return ds(bet, kj.substr(2,5));
}

// 二星直选－后二复式
exports.fc3dH2f=function(bet, kj){
    return fs(bet, kj.substr(2,5));
}

// 二星组选－前二组选单式
exports.fc3dZQ2d=exports.rxzxQ2d;

// 二星组选－前二组选复式
exports.fc3dZQ2f=exports.rxzxQ2f;

// 二星组选－后二组选单式
exports.fc3dZH2d=function(bet, kj){
    return z2d(bet, kj.substr(2,5));
}

// 二星组选－后二组选复式
exports.fc3dZH2f=function(bet, kj){
    return z2f(bet, kj.substr(2,5));
}

// 三星定位胆
exports.fc3d3xdw=exports.dwd5x;

// 不定胆
exports.fc3dbdd=exports.bddQ3;

// 后二大小单双
exports.fc3dH2dxds=function(bet, kj){
    return dxds(bet, kj.substr(2,3));
}

// 任选二大小单双
exports.fc3dR2dxds=function(bet, kj, w){
    kj=kj.split(',');
    [4, 2, 1].forEach(function(v, i){
        if((w&v)==0) delete kj[i];
    });
    kj=kj.filter(function(v){
        return v!=undefined;
    }).join(',');

    return dxds(bet, kj);
}
//}}}

// 趣味玩法  一帆风顺
exports.qwwfyffs=function(bet, kj){
    kj=filterArray(kj.split(',').sort());bet=bet.split(' ');
    if(kj.length>=bet.length){
        if(Sames(kj,bet)>=1){return Sames(kj,bet);}else{return 0;}
    }else{
        if(Sames(bet,kj)>=1){return Sames(bet,kj);}else{return 0;}
    }
}
// 趣味玩法  好事成双
exports.qwwfhscs=function(bet, kj){
    kj=kj.split(',').sort();bet=bet.split(' ');var kjs="";
    for(var i=0;i<kj.length;i++){
        if(kj[i]==kj[i+1]){
            kjs+=kj[i];
        }
    }
    if(Sames(bet,kjs.split(''))>=1){
        return 1;
    }else{return 0;}
}

// 趣味玩法  三星报喜
exports.qwwfsxbx=function(bet, kj){
    kj=kj.split(',').sort();bet=bet.split(' ');var kjs="";
    for(var i=0;i<kj.length;i++){
        if(kj[i]==kj[i+1] && kj[i+1]==kj[i+2]){
            kjs+=kj[i];break;
        }
    }
    if(Sames(bet,kjs.split(''))==1){
        return 1;
    }else{return 0;}
}

// 趣味玩法  四季发财
exports.qwwfsjfc=function(bet, kj){
    kj=kj.split(',').sort();bet=bet.split(' ');var kjs="";
    for(var i=0;i<kj.length;i++){
        if(kj[i]==kj[i+1] && kj[i+1]==kj[i+2] && kj[i+2]==kj[i+3]){
            kjs+=kj[i];break;
        }
    }
    if(Sames(bet,kjs.split(''))==1){
        return 1;
    }else{return 0;}
}

// 趣味玩法  前三趣味二星
exports.qwwfq3qw2x=function(bet, kj){
    kj=kj.substr(0,5).split(',');bet=bet.split(',');
    var bet0=bet[0].split('');var bet1=bet[1].split('');var bet2=bet[2].split('');
    if(bet[1].indexOf(kj[1])!=-1){
        if(bet[2].indexOf(kj[2])!=-1){
            if(kj[0]<5){
                if(bet[0].indexOf('小')!=-1){return 2;}else{return 1;}
            }else{
                if(bet[0].indexOf('大')!=-1){return 2;}else{return 1;}
            }
        }else{ return 0;}
    }else{ return 0;}
}

// 趣味玩法  后三趣味二星
exports.qwwfh3qw2x=function(bet, kj){
    kj=kj.substr(4,5).split(',');bet=bet.split(',');
    var bet0=bet[0].split('');var bet1=bet[1].split('');var bet2=bet[2].split('');
    if(bet[1].indexOf(kj[1])!=-1){
        if(bet[2].indexOf(kj[2])!=-1){
            if(kj[0]<5){
                if(bet[0].indexOf('小')!=-1){return 2;}else{return 1;}
            }else{
                if(bet[0].indexOf('大')!=-1){return 2;}else{return 1;}
            }
        }else{ return 0;}
    }else{ return 0;}
}

// 趣味玩法  四码趣味三星
exports.qwwf4mqw3x=function(bet, kj){
    kj=kj.substr(2,7).split(',');bet=bet.split(',');
    var bet0=bet[0].split('');var bet1=bet[1].split('');var bet2=bet[2].split('');var bet3=bet[3].split('');
    if(bet[1].indexOf(kj[1])!=-1){
        if(bet[2].indexOf(kj[2])!=-1){
            if(bet[3].indexOf(kj[3])!=-1){
                if(kj[0]<5){
                    if(bet[0].indexOf('小')!=-1){return 2;}else{return 1;}
                }else{
                    if(bet[0].indexOf('大')!=-1){return 2;}else{return 1;}
                }
            }else{ return 0;}
        }else{ return 0;}
    }else{ return 0;}
}

// 趣味玩法  五码趣味三星
exports.qwwf5mqw3x=function(bet, kj){
    kj=kj.split(',');bet=bet.split(',');
    var bet0=bet[0].split('');var bet1=bet[1].split('');var bet2=bet[2].split('');var bet3=bet[3].split('');var bet4=bet[4].split('');
    if(bet2.indexOf(kj[2])!=-1){
        if(bet3.indexOf(kj[3])!=-1){
            if(bet4.indexOf(kj[4])!=-1){
                if(kj[0]<5){
                    if(kj[1]<5){
                        if(bet0.indexOf('小')!=-1){
                            if(bet1.indexOf('小')!=-1){
                                return 8;
                            }else{return 1;}
                        }else{return 1;}
                    }
                }
                if(kj[0]>=5){
                    if(kj[1]>=5){
                        if(bet0.indexOf('大')!=-1){
                            if(bet1.indexOf('大')!=-1){
                                return 8;
                            }else{return 1;}
                        }else{return 1;}
                    }
                }
                if(kj[0]>=5){
                    if(kj[1]<5){
                        if(bet0.indexOf('大')!=-1){
                            if(bet1.indexOf('小')!=-1){
                                return 8;
                            }else{return 1;}
                        }else{return 1;}
                    }
                }
                if(kj[0]<5){
                    if(kj[1]>=5){
                        if(bet0.indexOf('小')!=-1){
                            if(bet1.indexOf('大')!=-1){
                                return 8;
                            }else{return 1;}
                        }else{return 1;}
                    }
                }
            }else{return 0;}
        }else{return 0;}
    }else{return 0;}
}

// 福彩3D 信用玩法
// 1-3球 使用ssc前三球
// 独胆 快3通用
exports.dudan3d=function(bet, kj){
    count=0;
    if(kj.indexOf(bet)!=-1){
        count=1;
    }
    return count;
}
// 跨度
exports.kuadu3d=function(bet, kj){
    kj = kj.split(',').sort();
    num = kj[2]-kj[0];
    count=0;
    if(bet==num){
        count=1;
    }
    return 0;
}
// 总和3D
exports.zonghe3d=function(bet,kj){
    if(bet=='龙'||bet=='虎'||bet=='和'){
        return longhu3d(bet,kj);
    }
    return zonghe3(bet,kj);
}
// 计算3D总和
function zonghe3(bet,kj){
    kj = kj.split(',');
    sum=0;
    for(i=0;i<3;i++){
        sum+= parseInt(kj[i]);
    }
    count=0;
    if(sum>13 && bet=='总和大'){
        count+=1;
    }else if(sum<14 && bet=='总和小'){
        count+=1;
    }else if(sum%2!=0 && bet=='总和单'){
        count+=1;
    }else if(sum%2==0 && bet=='总和双'){
        count+=1;
    }
    return count;
}
// 3D龙虎
function longhu3d(bet,kj){
    kj=kj.split(',');
    count=0;
    if(parseInt(kj[0])>parseInt(kj[2]) && bet=='龙'){
        count+=1;
    }else if(parseInt(kj[0])<parseInt(kj[2]) && bet=='虎'){
        count+=1;
    }else if(parseInt(kj[0])==parseInt(kj[2]) && bet=='和'){
        count+=1;
    }
    return count;
}
// 福彩3d 三连
exports.fc3dsl=function(bet,kj){
    return sscsq(bet,kj);
}
//{{{ 十一选五玩法
// 任选一
exports.gd11x5R1=function(bet, kj){
    bet=bet.split(' ');kj=kj.split(',');
    if(bet.length>kj.length){
        return Sames(bet,kj);
    }else if(kj.length>bet.length){
        return Sames(kj,bet);
    }else{
        return Sames(kj,bet);
    }
}
// 任选一单式
exports.gd11x5R1ds=function(bet, kj){
    kj=kj.split(',');
    if(kj.indexOf(bet)!=-1) return 1;
}
exports.gd11x5R2=function(bet, kj){
    return rx(bet, kj, 2);
}
// 任选二单式
exports.gd11x5R2ds=function(bet, kj){
    kj=kj.split(',');bet=strCut(bet,2);
    if(Sames(kj,bet)==2) return 1;
}
exports.gd11x5R3=function(bet, kj){
    return rx(bet, kj, 3);
}
// 任选三单式
exports.gd11x5R3ds=function(bet, kj){
    kj=kj.split(',');bet=strCut(bet,2);
    if(Sames(kj,bet)==3) return 1;
}
exports.gd11x5R4=function(bet, kj){
    return rx(bet, kj, 4);
}
// 任选四单式
exports.gd11x5R4ds=function(bet, kj){
    kj=kj.split(',');bet=strCut(bet,2);
    if(Sames(kj,bet)==4) return 1;
}
exports.gd11x5R5=function(bet, kj){
    return rx(bet, kj, 5);
}
// 任选五单式
exports.gd11x5R5ds=function(bet, kj){
    kj=kj.split(',');bet=strCut(bet,2);
    if(Sames(kj,bet)==5) return 1;
}
exports.gd11x5R6=function(bet, kj){
    return rx(bet, kj, 6);
}
// 任选六单式
exports.gd11x5R6ds=function(bet, kj){
    kj=kj.split(',');bet=strCut(bet,2);
    if(Sames(bet,kj)==5) return 1;
}
exports.gd11x5R7=function(bet, kj){
    return rx(bet, kj, 7);
}
// 任选七单式
exports.gd11x5R7ds=function(bet, kj){
    kj=kj.split(',');bet=strCut(bet,2);
    if(Sames(bet,kj)==5) return 1;
}
exports.gd11x5R8=function(bet, kj){
    return rx(bet, kj, 8);
}
// 任选八单式
exports.gd11x5R8ds=function(bet, kj){
    kj=kj.split(',');bet=strCut(bet,2);
    if(Sames(bet,kj)==5) return 1;
}
exports.gd11x5R9=function(bet, kj){
    return rx(bet, kj, 9);
}
exports.gd11x5R10=function(bet, kj){
    return rx(bet, kj, 10);
}

// 前一直选
exports.gd11x5Q1=function(bet, kj){
    kj=kj.split(',');bet=bet.split(' ');
    for(var i=0;i<bet.length;i++){
        if(parseInt(kj[0])==parseInt(bet[i])){return 1;break;}
    }
}

// 前二直选
exports.gd11x5Q2=function(bet, kj){
    return qs(bet, kj, 2);
}

// 前二组选
exports.gd11x5Q2z=function(bet, kj){
    return zx(bet, kj.substr(0,5));
}

// 后二组选
exports.gd11x5H2=function(bet, kj){
    return zx(bet, kj.substr(9,5));
}

// 前三直选复式
exports.gd11x5Q3=function(bet, kj){
    return qs(bet, kj, 3);
}
// 中三直选复式
exports.gd11x5Z3=function(bet, kj){
    return qs2(bet, kj, 3);
}
// 后三直选复式
exports.gd11x5H3=function(bet, kj){
    return qs2(bet, kj, 6);
}
// 三码直选复式
function qs2(bet, data, start){

    bet=bet.split(',');
    return data.substr(start,8).split(',')
        .some(function(v,i){
            return bet[i].indexOf(v)==-1;
        })?0:1;
}

// 前三组选复式
exports.gd11x5Q3z=function(bet, kj){
    return zx(bet, kj.substr(0,8));
}
// 中三组选复式
exports.gd11x5Z3z=function(bet, kj){
    return zx(bet, kj.substr(3,8));
}
// 后三组选复式
exports.gd11x5H3z=function(bet, kj){
    return zx(bet, kj.substr(6,8));
}

// 前四组选
exports.gd11x5Q4z=function(bet, kj){
    return zx(bet, kj.substr(0,11));
}

// 定位胆
exports.gd11x5dwd=function(bet, kj){
    kj=kj.substr(0,8).split(',');
    var bets="";
    if(bet.indexOf(',')!=-1){
        bet=bet.split(',');
        if(bet[0].split(' ').indexOf(kj[0])!=-1) bets+=kj[0];
        if(bet[1].split(' ').indexOf(kj[1])!=-1) bets+=kj[1];
        if(bet[2].split(' ').indexOf(kj[2])!=-1) bets+=kj[2];
    }else{
        if(bet.split(' ').indexOf(kj[0])!=-1) bets+=kj[0];
    }
    return bets.length/2;
}

// 不定位
exports.gd11x5bdw=function(bet, kj){
    kj=kj.substr(0,8).split(',');bet=bet.split(' ');
    return Sames(bet,kj);
}

// 趣味_猜中位
exports.qwwfczw=function(bet, kj){
    bet=bet.split(' ');var zs="";
    kj=kj.split(',').sort(function compare(a,b){return a-b;});
    for(var i=0;i<bet.length;i++){
        if(kj[2]==bet[i]) zs+=bet[i];
    }
    return zs.length/2;
}
// 趣味_定单双
exports.qwwfdds=function(bet, kj){
    var ds="";var ss="";var zs="";
    var num=bet.replace(/[^0-9]/ig,"");
    var k=strCut(num,2);
    var h=k.join(',').split(',');
    kj=kj.split(',');
    for(var i=0;i<kj.length;i++){
        if(kj[i]%2==0){ss+=kj[i];}else{ds+=kj[i];}
    }
    ds=ds.length/2;ds=ds.toString();
    ss=ss.length/2;ss=ss.toString();
    m=parseInt(ds+ss);
    for(j=0;j<h.length;j++){
        if(m==h[j]) zs+=h[j];
    }
    return zs.length/2;
}

// 任选拖胆 任二中二
exports.gx11x5tdR2=function(bet, kj){
    bet=bet.split(',');
    kj=kj.split(',');
    bet1 = bet[0];
    same1=0;
    for (i=0;i<kj.length;i++){
        if (bet1==kj[i]) same1=1;
    }

    bet2= bet[1].split(' ');
    same2=0;
    if (same1==1){
        if(bet2.length>kj.length){
            same2=Sames(bet2,kj);
        }else if(kj.length>bet2.length){
            same2=Sames(kj,bet2);
        }else{
            same2=Sames(kj,bet2);
        }
    }
    if(same2>0){
        return 1;
    }else {
        return 0;
    }
}
// 任选拖胆 任三中三
exports.gx11x5tdR3=function(bet, kj){
    bet=bet.split(',');
    kj=kj.split(',');
    bet1 = bet[0].split(' ');
    same1=Sames(kj,bet1);
    bet2= bet[1].split(' ');
    same2=0;
    if (same1==bet1.length){
        if(bet2.length>kj.length){
            same2=Sames(bet2,kj);
        }else if(kj.length>bet2.length){
            same2=Sames(kj,bet2);
        }else{
            same2=Sames(kj,bet2);
        }
    }
    count=0;
    if((same1+same2)>2){
        count=1;
    }
    return count;
}
// 任选拖胆 任四中四
exports.gx11x5tdR4=function(bet, kj){
    bet=bet.split(',');
    kj=kj.split(',');
    bet1 = bet[0].split(' ');
    same1=Sames(kj,bet1);

    bet2= bet[1].split(' ');
    same2=0;
    if (same1==bet1.length){
        if(bet2.length>kj.length){
            same2=Sames(bet2,kj);
        }else if(kj.length>bet2.length){
            same2=Sames(kj,bet2);
        }else{
            same2=Sames(kj,bet2);
        }
    }
    count=0;
    if((same2+same1)>3){
        count=1;
    }
    return count;
}
// 任选拖胆 任五中五
exports.gx11x5tdR5=function(bet, kj){
    bet=bet.split(',');
    kj=kj.split(',');
    bet1 = bet[0].split(' ');
    same1=Sames(kj,bet1);

    bet2= bet[1].split(' ');
    same2=0;
    if (same1==bet1.length){
        if(bet2.length>kj.length){
            same2=Sames(bet2,kj);
        }else if(kj.length>bet2.length){
            same2=Sames(kj,bet2);
        }else{
            same2=Sames(kj,bet2);
        }
    }
    count=0;
    if((same2+same1)>4){
        count=1;
    }
    return count;
}
// 任选拖胆 任六中五
exports.gx11x5tdR6=function(bet, kj){
    bet=bet.split(',');
    kj=kj.split(',');
    bet1 = bet[0].split(' ');
    same1=Sames(kj,bet1);

    bet2= bet[1].split(' ');
    same2=0;
    if (same1==bet1.length){
        if(bet2.length>kj.length){
            same2=Sames(bet2,kj);
        }else if(kj.length>bet2.length){
            same2=Sames(kj,bet2);
        }else{
            same2=Sames(kj,bet2);
        }
    }
    count=0;
    if((same2+same1)>4){
        count=1;
    }
    return count;
}
// 任选拖胆 任七中五
exports.gx11x5tdR7=function(bet, kj){
    bet=bet.split(',');
    kj=kj.split(',');
    bet1 = bet[0].split(' ');
    same1=Sames(kj,bet1);

    bet2= bet[1].split(' ');
    same2=0;
    if (same1==bet1.length){
        if(bet2.length>kj.length){
            same2=Sames(bet2,kj);
        }else if(kj.length>bet2.length){
            same2=Sames(kj,bet2);
        }else{
            same2=Sames(kj,bet2);
        }
    }
    count=0;
    if((same2+same1)>4){
        count=1;
    }
    return count;
}
// 任选拖胆 任八中五
exports.gx11x5tdR8=function(bet, kj){
    bet=bet.split(',');
    kj=kj.split(',');
    bet1 = bet[0].split(' ');
    same1=Sames(kj,bet1);

    bet2= bet[1].split(' ');
    same2=0;
    if (same1==bet1.length){
        if(bet2.length>kj.length){
            same2=Sames(bet2,kj);
        }else if(kj.length>bet2.length){
            same2=Sames(kj,bet2);
        }else{
            same2=Sames(kj,bet2);
        }
    }
    count=0;
    if((same2+same1)>4){
        count=1;
    }
    return count;
}
//11选5 信用玩法
// 和值
exports.hz11x5=function(bet,kj){
    return sumball(bet,kj);
}
// 计算11选5总和
function sumball(bet,kj) {
    kj = kj.split(',');
    sum = 0;
    for(i=0;i<5;i++){
        sum+=parseInt(kj[i]);
    }
    kj2 = parseInt(sum.toString().substr(1,1));
    count = 0;
    if(sum>30&&bet=='和大'){
        count+=1;
    }else if(sum<31&&bet=='和小'){
        count+=1;
    }else if(sum%2!=0&&bet=='和单'){
        count+=1;
    }else if(sum%2==0&&bet=='和双'){
        count+=1;
    }else if(kj2>4&&bet=='尾大'){
        count+=1;
    }else if(kj2<5&&bet=='尾小'){
        count+=1;
    }else if(kj[0]>kj[4] && bet=='龙'){
        count+=1;
    }else if(kj[0]<kj[4] && bet=='虎'){
        count+=1;
    }
    return count;
}
// 五球--大小单双
exports.fiveballs1=function(bet,kj){
    kj = kj.split(',')[0];
    return fiveballdxds(bet,kj);
}
exports.fiveballs2=function(bet,kj){
    kj = kj.split(',')[1];
    return fiveballdxds(bet,kj);
}
exports.fiveballs3=function(bet,kj){
    kj = kj.split(',')[2];
    return fiveballdxds(bet,kj);
}
exports.fiveballs4=function(bet,kj){
    kj = kj.split(',')[3];
    return fiveballdxds(bet,kj);
}
exports.fiveballs5=function(bet,kj){
    kj = kj.split(',')[4];
    return fiveballdxds(bet,kj);
}
function fiveballdxds(bet,kj) {
    kj = parseInt(kj);
    count = 0;
    if(kj>5 && kj<11&&bet=='大'){
        count+=1;
    }else if(kj<6&&bet=='小'){
        count+=1;
    }else if(kj%2!=0&&bet=='单'){
        count+=1;
    }else if(kj%2==0&&bet=='双'){
        count+=1;
    }
    return count;
}
// 1-5
// 第一球
exports.firstball=function(bet,kj){
    kj = kj.split(',')[0];
    return fiveballs(bet,kj);
}
exports.secondball=function(bet,kj){
    kj = kj.split(',')[1];
    return fiveballs(bet,kj);
}
exports.thirdball=function(bet,kj){
    kj = kj.split(',')[2];
    return fiveballs(bet,kj);
}
exports.fourthball=function(bet,kj){
    kj = kj.split(',')[3];
    return fiveballs(bet,kj);
}
exports.fifthball=function(bet,kj){
    kj = kj.split(',')[4];
    return fiveballs(bet,kj);
}
// 1-5球
function fiveballs(bet,kj){
    count=0;
    if(parseInt(bet)==parseInt(kj)){
        count+=1;
    }
    return count;
}
// 任选
function renxuan(bet,kj,num){
    kj = kj.split(',');
    bet = bet.split(',');
    if(bet.length>kj.length){
        same1=Sames(bet,kj);
    }else if(kj.length>bet.length){
        same1=Sames(kj,bet);
    }else{
        same1=Sames(kj,bet);
    }
    count=0;
    if(same1>(num-1)){
        count=1;
    }
    return count;
}
//{{{ 快乐十分玩法
// 任选一 选一数投
exports.klsfR1B=function(bet, kj){
    return bet.split(' ').filter(function(v){
        return kj.substr(0,2).indexOf(v)!=-1;
    }).length;
}

// 任选一 选一红投
exports.klsfR1R=function(bet, kj){
    return bet.split(' ').filter(function(v){
        return kj.substr(0,2).indexOf(v)!=-1;
    }).length;
}
exports.klsfR2=function(bet, kj){
    return rx(bet, kj, 2);
}
exports.klsfR3=function(bet, kj){
    return rx(bet, kj, 3);
}
exports.klsfR4=function(bet, kj){
    return rx(bet, kj, 4);
}
exports.klsfR5=function(bet, kj){
    return rx(bet, kj, 5);
}

// 前二直选
exports.klsfQ2=function(bet, kj){
    return qs(bet, kj, 2);
}

// 前二组选
exports.klsfQ2z=function(bet, kj){
    return zx(bet, kj.substr(0,5));
}

// 前三直选
exports.klsfQ3=function(bet, kj){
    return qs(bet, kj, 3);
}

// 前三组选
exports.klsfQ3z=function(bet, kj){
    return zx(bet, kj.substr(0,8));
}

//}}}


//
//{{{ 北京PK10玩法 1至10位开奖

// 冠军
exports.kjq1=function(betData, kjData){
    return qs(betData, kjData, 1);
}
// 冠亚军
exports.kjq2=function(betData, kjData){
    return qs(betData, kjData, 2);
}

// 前三
exports.kjq3=function(betData, kjData){
    return qs(betData, kjData, 3);
}
// 定位胆 exports.dwd10x
//
exports.pk10lmdxds1=function(betData, kjData){
    return dxds2(betData, kjData.substr(0,2));
}
exports.pk10lmdxds2=function(betData, kjData){
    return dxds2(betData, kjData.substr(3,2));
}
exports.pk10lmdxds3=function(betData, kjData){
    return dxds2(betData, kjData.substr(6,2));
}
exports.pk10lmdxds4=function(betData, kjData){
    return dxds2(betData, kjData.substr(9,2));
}
exports.pk10lmdxds5=function(betData, kjData){
    return dxds2(betData, kjData.substr(12,2));
}
exports.pk10lmdxds6=function(betData, kjData){
    return dxds2(betData, kjData.substr(15,2));
}
exports.pk10lmdxds7=function(betData, kjData){
    return dxds2(betData, kjData.substr(18,2));
}
exports.pk10lmdxds8=function(betData, kjData){
    return dxds2(betData, kjData.substr(21,2));
}
exports.pk10lmdxds9=function(betData, kjData){
    return dxds2(betData, kjData.substr(24,2));
}
exports.pk10lmdxds10=function(betData, kjData){
    return dxds2(betData, kjData.substr(27,2));
}
exports.pk10lmdxds22=function(bet, kj){
    kj=kj.split(',');
    val=parseInt(kj[0],10)+parseInt(kj[1],10);
    bet=bet.split('');
    count=0;
    for (var i=0,l=bet.length; i<l; i++){
        if(bet[i]=='大'){
            if(val>11 && val<20) count+=1;
        }
        else if(bet[i]=='小'){
            if(val>2 && val<12) count+=1;
        }else if(bet[i]=='单'){
            if(val%2!=0) count+=1;
        }else if(bet[i]=='双'){
            if(val%2==0) count+=1;
        }else{}
    }
    return count;
}
exports.pk10lmdxds33=function(betData, kjData){
    kjData=kjData.split(',');
    var gyzh=parseInt(kjData[0],10)+parseInt(kjData[1],10)+parseInt(kjData[2],10);
    return DescartesAlgorithm.apply(null, betData.split(',').map(function(v){return v.split('')}))
        .filter(function(v){
            //console.log(v);
            var o={
                '大':'17,18,19,20,21,22,23,24,25,26,27',
                '小':'6,7,8,9,10,11,12,13,14,15,16',
                '单':'7,9,11,13,15,17,19,21,23,25,27',
                '双':'6,8,10,12,14,16,18,20,22,24,26'
            };
            //throw(v[0]);
            return o[v[0]].indexOf(gyzh)!=-1
        })
        .length;
}

//冠亚季选一
exports.pk10r123=function(bet, kj){
    return rx(bet, kj.substr(0,8), 1);
    /*return bet.split(' ').filter(function(v){
     return kj.substr(0,8).indexOf(v)!=-1;
     }).length;*/
}


// 冠亚总和
exports.pk10gy2=function(bet, kj){
    kj=kj.split(',');
    val=parseInt(kj[0],10)+parseInt(kj[1],10);
    bet=bet.split(' ');
    count=0;
    for (var i=0,l=bet.length; i<l; i++){
        if(parseInt(bet[i],10)==val){
            count+=1;
        }else{}
    }
    return count;
}

//冠亚组合
exports.pk10gyzh=function(bet, kj){
    kj=kj.split(',');
    val1=parseInt(kj[0],10);
    val2=parseInt(kj[1],10);
    str1=val1+'-'+val2;
    str2=val2+'-'+val1;
    bet=bet.split(' ');
    count=0;
    //console.log(str1);
    for (var i=0,l=bet.length; i<l; i++){
        if(bet[i]==str1 || bet[i]==str2){
            count+=1;
        }else{}
    }
    return count;
}



//龙虎
exports.pk10lh1=function(bet, kj){
    return pk10lh(bet, kj, 1);
}
exports.pk10lh2=function(bet, kj){
    return pk10lh(bet, kj, 2);
}
exports.pk10lh3=function(bet, kj){
    return pk10lh(bet, kj, 3);
}
exports.pk10lh4=function(bet, kj){
    return pk10lh(bet, kj, 4);
}
exports.pk10lh5=function(bet, kj){
    return pk10lh(bet, kj, 5);
}
exports.pk10lh12=function(bet, kj){
    kj=kj.split(',');
    val1=parseInt(kj[0],10)+parseInt(kj[1],10);
    val2=parseInt(kj[9],10)+parseInt(kj[8],10);
    bet=bet.split('');
    count=0;
    for (var i=0,l=bet.length; i<l; i++){
        if(bet[i]=='龙'){
            if(val1>val2) count+=1;
        }
        else if(bet[i]=='虎'){
            if(val1<val2) count+=1;
        }else{}
    }
    return count;
}
exports.pk10lh123=function(bet, kj){
    kj=kj.split(',');
    val1=parseInt(kj[0],10)+parseInt(kj[1],10)+parseInt(kj[2],10);
    val2=parseInt(kj[9],10)+parseInt(kj[8],10)+parseInt(kj[7],10);
    bet=bet.split('');
    count=0;
    for (var i=0,l=bet.length; i<l; i++){
        if(bet[i]=='龙'){
            if(val1>val2) count+=1;
        }
        else if(bet[i]=='虎'){
            if(val1<val2) count+=1;
        }else{}
    }
    return count;
}

// 前二组选
exports.kjzx2=function(bet, kj){
    return zx(bet, kj.substr(0,5));
}

// 前三组选
exports.kjzx3=function(bet, kj){
    return zx(bet, kj.substr(0,8));
}
//pk10 信用玩法
// 冠亚军和
//
exports.pk10gysum=function(bet, kj){
    kj=kj.split(',');
    val=parseInt(kj[0],10)+parseInt(kj[1],10);
    bet=bet.split(' ');
    count=0;
    if(val>11 && bet=='冠亚大'){
        count+=1;
    }else if(val<11 && bet=='冠亚小'){
        count+=1;
    }else if(val%2!=0 && bet=='冠亚单'){
        count+=1;
    }else if(val%2==0 && bet=='冠亚双'){
        count+=1;
    }else if(parseInt(bet,10)==val){
        count+=1;
    }
    return count;
}
//1-10
exports.pk10dxds1=function(bet,kj){
    return pk10dxds(bet,kj,1,10);
}
exports.pk10dxds2=function(bet,kj){
    return pk10dxds(bet,kj,2,9);
}
exports.pk10dxds3=function(bet,kj){
    return pk10dxds(bet,kj,3,8);
}
exports.pk10dxds4=function(bet,kj){
    return pk10dxds(bet,kj,4,7);
}
exports.pk10dxds5=function(bet,kj){
    return pk10dxds(bet,kj,5,6);
}
exports.pk10dxds6=function(bet,kj){
    return pk10dxds(bet,kj,6,0);
}
exports.pk10dxds7=function(bet,kj){
    return pk10dxds(bet,kj,7,0);
}
exports.pk10dxds8=function(bet,kj){
    return pk10dxds(bet,kj,8,0);
}
exports.pk10dxds9=function(bet,kj){
    return pk10dxds(bet,kj,9,0);
}
exports.pk10dxds10=function(bet,kj){
    return pk10dxds(bet,kj,10,0);
}
// pk10
// order 1 10,2 9,3 8,4 7,5 6
function pk10dxds(bet,kj,order1,order2) {
    kj = kj.split(',');
    kj1 = kj[order1-1];
    count=0;
    if(order2!=0){
        kj2 = kj[order2-1];
        if(kj1>kj2 && bet=='龙'){
            count=1;
        }else if(kj1<kj2 && bet=='虎'){
            count=1;
        }
    }
    if(kj1>5 && bet=='大'){
        count=1;
    }else if(kj1<6 && bet=='小'){
        count=1;
    }else if(kj1%2!=0 && bet=='单'){
        count=1;
    }else if(kj1%2==0 && bet=='双'){
        count=1;
    }else if(parseInt(kj1)==parseInt(bet)){
        count=1;
    }
    return count;
}
//}}}

//北京快乐8
exports.k8R1=function(bet, kj){
    return rx(bet, kj.split("|")[0], 1);
}
exports.k8R2=function(bet, kj){
    return rx(bet, kj.split("|")[0], 2);
}
exports.k8R3=function(bet, kj){
    return rx(bet, kj.split("|")[0], 3);
}
exports.k8R4=function(bet, kj){
    return rx(bet, kj.split("|")[0], 4);
}
exports.k8R5=function(bet, kj){
    return rx(bet, kj.split("|")[0], 5);
}
exports.k8R6=function(bet, kj){
    return rx(bet, kj.split("|")[0], 6);
}
exports.k8R7=function(bet, kj){
    return rx(bet, kj.split("|")[0], 7);
}

// 北京28
// 特码
exports.pcddtm=function(bet, kj){
    kj=kj.split(',');
    var val=parseInt(kj[0])+parseInt(kj[1])+parseInt(kj[2]);
    count=0;
    if(val==parseInt(bet)){
        count+=1;
    }
    return count;
}
// 豹子
exports.pcddbz=function(bet, kj){
    kj=kj.split(',').sort();
    count=0;
    if(parseInt(kj[0])==parseInt(kj[2])){
        count+=1;
    }
    return count;
}
// 波色
// 绿波1，4，7，10，16，19，22，25；
// 红波3，6，9，12，15，18，21，24；
// 蓝波2，5，8，11，17，20，23，26；
exports.pcddbs=function(bet, kj){
    kj=kj.split(',');
    var val=parseInt(kj[0])+parseInt(kj[1])+parseInt(kj[2]);
    return pcddbsbs(bet,val);
}
function pcddbsbs(bet,kjhz) {
    var green='1,4,7,10,16,19,22,25';
    var red='3,6,9,12,15,18,21,24';
    var blue='2,5,8,11,17,20,23,26';
    count=0;
    if(green.indexOf(kjhz)!=-1 && bet=='绿波'){
        count+=1;
    }else if(red.indexOf(kjhz)!=-1 && bet=='红波'){
        count+=1;
    }else if(blue.indexOf(kjhz)!=-1 && bet=='蓝波'){
        count+=1;
    }
    return count;
}

// 极大极小
// 数字0，1，2，3，4，5为极小 ；
// 数字22，23，24，25，26，27为极大；
exports.pcddjxjd=function(bet, kj){
    kj=kj.split(',');
    var val=parseInt(kj[0])+parseInt(kj[1])+parseInt(kj[2]);
    count=0;
    if(val>21 && bet=='极大'){
        count+=1;
    }else if(val<6 && bet=='极小'){
        count+=1;
    }
    return count;
}
// 大单/大双/小单/小双
exports.pcdddddsxdxs=function(bet, kj){
    kj=kj.split(',');
    var val=parseInt(kj[0])+parseInt(kj[1])+parseInt(kj[2]);
    count=0;
    if(val>13 && val%2!=0 && bet=='大单'){
        count+=1;
    }else if(val%2==0 && val>13 && bet=='大双'){
        count+=1;
    }else if(val<14 && val%2!=0 && bet=='小单'){
        count+=1;
    }else if(val%2==0 && val<14 && bet=='小双'){
        count+=1;
    }
    return count;
}
// 大小单双
// 数字14-27为大 ；数字0-13为小；数字1，3，5，~27为单 ；数字0，2，4，~26为双；
exports.pcdddxds=function(bet, kj){
    kj=kj.split(',');
    var val=parseInt(kj[0])+parseInt(kj[1])+parseInt(kj[2]);
    count=0;
    if(val>13 && bet=='大'){
        count+=1;
    }else if(val<14 && bet=='小'){
        count+=1;
    }else if(val%2!=0 && bet=='单'){
        count+=1;
    }else if(val%2==0 && bet=='双'){
        count+=1;
    }
    return count;
}
// 特码3压1
exports.pcdd3y1=function(bet, kj){
    kj=kj.split(',');
    var val=parseInt(kj[0])+parseInt(kj[1])+parseInt(kj[2]);
    count=0;
    if(bet.indexOf(val)!=-1){
        count+=1;
    }
    return count;
}

//快3
// 和值
exports.k3hz=function(bet, kj){
    kj=kj.split(',');
    bet=bet.split(' ');
    var val=parseInt(kj[0])+parseInt(kj[1])+parseInt(kj[2]);
    var count=0;
    for (var i=0;i<bet.length;i++){
        if(parseInt(bet[i])==val){
            count+=1;
        }
    }
    if(count!=0) {
        return val;
    }else {
        return count;
    }
}

// 三同号通选
exports.k33tx=function(bet, kj){
    kj=kj.replace(/\,/g,"");
    count=0;
    if(bet.indexOf(kj)!=-1) count=1;
    return count;
}

// 三连号通选
exports.k33ltx=exports.k33tx

// 三同号单选
exports.k33dx=function(bet, kj){
    bet=bet.replace(/\*/g,"");
    bet=bet.split(',');
    kj=kj.split(',');
    kj1=kj[0]+kj[1];
    kj2=kj[2];
    kj=kj1+","+kj2;
    return kj.split(',')
        .some(function(v,i){
            return bet[i].indexOf(v)==-1;
        })?0:1;
}

// 三不同号
exports.k33x=function(bet, kj){
    return zx(bet, kj);
}

// 二不同号
exports.k32x=exports.k33x


// 二同号复选
exports.k32fx=function(bet, kj){
    bet=bet.replace(/\*/g,"").replace(/\ /g,"").split('');kj=kj.split(',');
    if(Sames(kj,bet)==2){return 1;}else{return 0;}
}

// 二同号单选
exports.k32dx=function(bet, kj){
    bet=bet.split(' ');
    kj=kj.replace(/\,/g,"");
    count=0;
    for (var i=0,l=bet.length; i<l; i++){
        if(bet[i].indexOf(kj)!=-1) count=1;
    }
    return count;
}
// 快3信用玩法和值
exports.k3hezhi=function(bet, kj){
    kj=kj.split(',');
    var val=parseInt(kj[0])+parseInt(kj[1])+parseInt(kj[2]);
    var count=0;
    if(val>10 && bet=='大'){
        count+=1;
    }else if(val<11 && bet=='小'){
        count+=1;
    }else if(val%2!=0 && bet=='单'){
        count+=1;
    }else if(val%2==0 && bet=='双'){
        count+=1;
    }else if(bet==val){
        count+=1;
    }
    return count;
}
// 豹子
exports.k3baozi=function (bet,kj) {
    bet = bet.split(',')[0];
    kj = kj.split(',').sort();
    count=0;
    if(parseInt(kj[0])==parseInt(kj[2]) && (parseInt(bet)==parseInt(kj[0]) || bet=='豹子')){
        count=1;
    }
    return count;
}
// 对子
exports.k3duizi=function (bet,kj) {
    bet = parseInt(bet.split(',')[0]);
    kj = kj.split(',');
    sum =0;
    for(i=0;i<3;i++){
        if(parseInt(kj[i])==bet){
            sum+=1;
        }
    }
    count=0;
    if(sum>1){
        count=1;
    }
    return count;
}
// 两连易彩
exports.k3lianglian=function (bet,kj) {
    bet=bet.split(',');
    count=0;
    if(kj.indexOf(bet[0])!=-1 && kj.indexOf(bet[1])!=-1){
        count=1;
    }
    return count;
}

// 六合彩
/*特别号*/
exports.SP=function(bet, kj){
    var count=0;
    var kj=kj.split(',');
    var kjtm=kj[6];
    if(bet==kjtm) count=1;
    return count;
}
exports.SPBSOE=function(bet, kj){
    var count=0;
    var kj=kj.split(',');
    var kjtm=kj[6];
    switch(bet){
        case '特大':
            if(parseInt(kjtm)>24 && parseInt(kjtm)!=49) count=1;
            break;

        case '特小':
            if(parseInt(kjtm)<25) count=1;
            break;

        case '特单':
            if(parseInt(kjtm) % 2 != 0 && parseInt(kjtm)!=49) count=1;
            break;

        case '特双':
            if(parseInt(kjtm) % 2 == 0) count=1;
            break;
    }

    return count;
}

exports.SPTBSOE=function(bet, kj){
    var count=0;
    var kj=kj.split(',');
    var kjtm=kj[6];
    var kjtmh=kjtm.split('');
    var val=parseInt(kjtmh[0],10)+parseInt(kjtmh[1],10);
    switch(bet){
        case '特合大':
            if(parseInt(val)>6 && parseInt(kjtm)!=49) count=1;
            break;

        case '特合小':
            if(parseInt(val)<7 && parseInt(kjtm)!=49) count=1;
            break;

        case '特合单':
            if(parseInt(val) % 2 != 0 && parseInt(kjtm)!=49) count=1;
            break;

        case '特合双':
            if(parseInt(val) % 2 == 0 && parseInt(kjtm)!=49) count=1;
            break;
    }

    return count;
}

exports.SPSBS=function(bet, kj){
    var count=0;
    var kj=kj.split(',');
    var kjtm=kj[6];
    var kjtmh=kjtm.split('');
    var val=parseInt(kjtmh[1],10);
    switch(bet){
        case '特尾大':
            if(parseInt(val)>4 && parseInt(kjtm)!=49) count=1;
            break;

        case '特尾小':
            if(parseInt(val)<5 && parseInt(kjtm)!=49) count=1;
            break;
    }

    return count;
}

exports.SPH2=function(bet, kj){
    var count=0;
    var kj=kj.split(',');
    var kjtm=kj[6];
    switch(bet){
        case '大单':
            if(parseInt(kjtm)>24 && parseInt(kjtm) % 2 != 0) count=1;
            break;

        case '大双':
            if(parseInt(kjtm)>24 && parseInt(kjtm) % 2 == 0) count=1;
            break;

        case '小单':
            if(parseInt(kjtm)<25 && parseInt(kjtm) % 2 != 0) count=1;
            break;

        case '小双':
            if(parseInt(kjtm)<25 && parseInt(kjtm) % 2 == 0) count=1;
            break;
    }

    return count;
}
// 特天肖
exports.SPTBX=function(bet, kj){
    var count=0;
    var kj=kj.split(',');
    var kjtm=kj[6];
    count=qhjy(bet,kjtm);
    return count;
}
//天地前后家野生肖
function qhjy(acname,kjtm) {
    var xsbet,count=0;
    switch(acname){
        case '特天肖':
            var xsbet='07,19,31,43,04,16,28,40,02,14,26,38,11,23,35,47,09,21,33,45,06,18,30,42';
            if(xsbet.indexOf(kjtm)!=-1) count=1;
            break;

        case '特地肖':
            var xsbet='05,17,29,41,03,15,27,39,01,13,25,37,49,12,24,36,48,10,22,34,46,08,20,32,44';
            if(xsbet.indexOf(kjtm)!=-1) count=1;
            break;

        case '特前肖':
            var xsbet='10,22,34,46,09,21,33,45,08,20,32,44,07,19,31,43,06,18,30,42,05,17,29,41';
            xsbet=xsbet.split(',');
            if(xsbet.indexOf(kjtm)!=-1) count=1;
            break;

        case '特后肖':
            var xsbet='04,16,28,40,03,15,27,39,02,14,26,38,01,13,25,37,49,12,24,36,48,11,23,35,47';
            if(xsbet.indexOf(kjtm)!=-1) count=1;
            break;

        case '特家肖':
            var xsbet='09,21,33,45,04,16,28,40,03,15,27,39,01,13,25,37,49,12,24,36,48,11,23,35,47';
            if(xsbet.indexOf(kjtm)!=-1) count=1;
            break;

        case '特野肖':
            var xsbet='10,22,34,46,08,20,32,44,07,19,31,43,06,18,30,42,05,17,29,41,02,14,26,38';
            if(xsbet.indexOf(kjtm)!=-1) count=1;
            break;

    }
    return count;
}

/*生肖头尾*/
exports.SPANM=function(bet, kj){
    var count=0;
    var kj=kj.split(',');
    var kjtm=kj[6];
    if(CheckANM(kjtm,bet)) count=1;
    return count;
}

exports.SPTD=function(bet, kj){
    bet=bet.replace(new RegExp("头","g"),'');
    var count=0;
    var kj=kj.split(',');
    var kjtm=kj[6];
    var kjtmh=kjtm.split('');
    var val=parseInt(kjtmh[0],10);
    if(parseInt(val)==parseInt(bet)) count=1;
    return count;
}

exports.SPSD=function(bet, kj){
    bet=bet.replace(new RegExp("尾","g"),'');
    var count=0;
    var kj=kj.split(',');
    var kjtm=kj[6];
    var kjtmh=kjtm.split('');
    var val=parseInt(kjtmh[1],10);
    if(parseInt(val)==parseInt(bet)) count=1;
    return count;
}

/*波色*/
exports.SPCLR=function(bet, kj){
    var count=0;
    var kj=kj.split(',');
    var kjtm=kj[6];
    if(CheckCLR(kjtm,bet)) count=1;
    return count;
}
exports.SPHC=function(bet, kj){
    var count=0;
    var kj=kj.split(',');
    var kjtm=kj[6];
    switch(bet){
        case '红大':
            if(parseInt(kjtm)>24 && CheckCLR(kjtm,'红波')) count=1;
            break;

        case '红小':
            if(parseInt(kjtm)<25 && CheckCLR(kjtm,'红波')) count=1;
            break;

        case '红单':
            if(parseInt(kjtm) % 2 != 0 && CheckCLR(kjtm,'红波')) count=1;
            break;

        case '红双':
            if(parseInt(kjtm) % 2 == 0 && CheckCLR(kjtm,'红波')) count=1;
            break;

        case '蓝大':
            if(parseInt(kjtm)>24 && CheckCLR(kjtm,'蓝波')) count=1;
            break;

        case '蓝小':
            if(parseInt(kjtm)<25 && CheckCLR(kjtm,'蓝波')) count=1;
            break;

        case '蓝单':
            if(parseInt(kjtm) % 2 != 0 && CheckCLR(kjtm,'蓝波')) count=1;
            break;

        case '蓝双':
            if(parseInt(kjtm) % 2 == 0 && CheckCLR(kjtm,'蓝波')) count=1;
            break;

        case '绿大':
            if(parseInt(kjtm)>24 && CheckCLR(kjtm,'绿波')) count=1;
            break;

        case '绿小':
            if(parseInt(kjtm)<25 && CheckCLR(kjtm,'绿波')) count=1;
            break;

        case '绿单':
            if(parseInt(kjtm) % 2 != 0 && CheckCLR(kjtm,'绿波')) count=1;
            break;

        case '绿双':
            if(parseInt(kjtm) % 2 == 0 && CheckCLR(kjtm,'绿波')) count=1;
            break;
    }
    return count;
}

exports.SPHHC=function(bet, kj){
    var count=0;
    var kj=kj.split(',');
    var kjtm=kj[6];
    switch(bet){
        case '红大单':
            if(parseInt(kjtm)>24 && parseInt(kjtm) % 2 != 0 && CheckCLR(kjtm,'红波')) count=1;
            break;

        case '红大双':
            if(parseInt(kjtm)>24 && parseInt(kjtm) % 2 == 0 && CheckCLR(kjtm,'红波')) count=1;
            break;

        case '红小单':
            if(parseInt(kjtm)<25 && parseInt(kjtm) % 2 != 0 && CheckCLR(kjtm,'红波')) count=1;
            break;

        case '红小双':
            if(parseInt(kjtm)<25 && parseInt(kjtm) % 2 == 0 && CheckCLR(kjtm,'红波')) count=1;
            break;

        case '蓝大单':
            if(parseInt(kjtm)>24 && parseInt(kjtm) % 2 != 0 && CheckCLR(kjtm,'蓝波')) count=1;
            break;

        case '蓝大双':
            if(parseInt(kjtm)>24 && parseInt(kjtm) % 2 == 0 && CheckCLR(kjtm,'蓝波')) count=1;
            break;

        case '蓝小单':
            if(parseInt(kjtm)<25 && parseInt(kjtm) % 2 != 0 && CheckCLR(kjtm,'蓝波')) count=1;
            break;

        case '蓝小双':
            if(parseInt(kjtm)<25 && parseInt(kjtm) % 2 == 0 && CheckCLR(kjtm,'蓝波')) count=1;
            break;

        case '绿大单':
            if(parseInt(kjtm)>24 && parseInt(kjtm) % 2 != 0 && CheckCLR(kjtm,'绿波')) count=1;
            break;

        case '绿大双':
            if(parseInt(kjtm)>24 && parseInt(kjtm) % 2 == 0 && CheckCLR(kjtm,'绿波')) count=1;
            break;

        case '绿小单':
            if(parseInt(kjtm)<25 && parseInt(kjtm) % 2 != 0 && CheckCLR(kjtm,'绿波')) count=1;
            break;

        case '绿小双':
            if(parseInt(kjtm)<25 && parseInt(kjtm) % 2 == 0 && CheckCLR(kjtm,'绿波')) count=1;
            break;
    }
    return count;
}
/*正码平码*/
exports.LOTTO=function(bet, kj){
    var count=0;
    var kj=kj.removeFromList(',', 6);
    if(kj.indexOf(bet)!=-1) count=1;
    return count;
}
exports.LTTBSOE=function(bet, kj){
    var count=0;
    var kj=kj.split(',');
    var val=0;
    for(var i=0;i<kj.length;i++){
        val+=parseInt(kj[i],10);
    }

    switch(bet){
        case '总大':
            if(parseInt(val)>174) count=1;
            break;

        case '总小':
            if(parseInt(val)<175) count=1;
            break;

        case '总单':
            if(parseInt(val) % 2 != 0) count=1;
            break;

        case '总双':
            if(parseInt(val) % 2 == 0) count=1;
            break;
    }
    return count;
}

/*平特肖尾 一肖 正特尾数*/
exports.LTTBP=function(bet, kj){
    bet=GetANM(bet);
    return bet.split(',').filter(function(v){
        return kj.indexOf(v)!=-1;
    }).length;
}
exports.LTTSD=function(bet, kj){
    var count=0;
    bet=bet.replace(new RegExp("尾","g"),'');
    kj=kj.split(',').map(function(v){return v.split('')[1].split('').join(',')});
    if(kj.indexOf(bet)!=-1) count=1;
    return count;
}

/*连肖*/
exports.SNBP2=function(bet, kj){
    return SNBP(bet, kj, 2);
}
exports.SNBP3=function(bet, kj){
    return SNBP(bet, kj, 3);
}
exports.SNBP4=function(bet, kj){
    return SNBP(bet, kj, 4);
}
exports.SNBP5=function(bet, kj){
    return SNBP(bet, kj, 5);
}

//连肖函数
function SNBP(bet, kj, num){
    var hbet='';
    return combine(bet.split(' '), num).filter(function(v){

        return v.every(function(c){
            hbet=GetANM(c);
            return hbet.split(',').some(function(v,i){
                return kj.indexOf(v)!=-1;

            });
        });
    }).length;
}

/*连尾*/
exports.SNSD2=function(bet, kj){
    console.log(SNSD(bet, kj, 2));
    return SNSD(bet, kj, 2);
}
exports.SNSD3=function(bet, kj){
    return SNSD(bet, kj, 3);
}
exports.SNSD4=function(bet, kj){
    return SNSD(bet, kj, 4);
}
exports.SNSD5=function(bet, kj){
    return SNSD(bet, kj, 5);
}

//连尾函数
function SNSD(bet, kj, num){
    bet=bet.replace(new RegExp("尾","g"),'');
    kj=kj.split(',').map(function(v){return v.split('')[1].split('').join(',')});
    return combine(bet.split(' '), num).filter(function(v){
        return v.every(function(c){
            return kj.indexOf(c)!=-1;
        });
    }).length;
}


/*连码*/
exports.LM4OF4=function(bet, kj){
    return rx(bet, kj.removeFromList(',', 7), 4);
}
exports.LM3OF3=function(bet, kj){
    return rx(bet, kj.removeFromList(',', 7), 3);
}
exports.LM2OF2=function(bet, kj){
    return rx(bet, kj.removeFromList(',', 7), 2);
}
//三中二
exports.LM2OF3=function(bet, kj){
    var num=0;
    var kj=kj.removeFromList(',', 7);
    bet1=bet.split(' ');
    num=0;
    for(i=0;i<3;i++){
        if(kj.indexOf(bet1[i])!=-1) num+=1;
    }
    if(num==2){
        count=1;
    }else{
        count=rx(bet,kj, 3);
    }
    return count;

}
//PC 三中二
exports.LM2OF31=function(bet, kj){
    var num=0;
    var kj=kj.removeFromList(',', 7);
    bet1=bet.split(' ');
    num=0;
    for(i=0;i<3;i++){
        if(kj.indexOf(bet1[i])!=-1) num+=1;
    }
    if(num==2){
        count=1;
    }else{
        count=rx(bet,kj, 3);
    }
    return count;

}
//二中特
exports.LMSPOF2=function(bet, kj){
    var	count= rx(bet, kj.removeFromList(',', 7), 2);
    if(parseInt(count)<1){
        var kj2=kj.removeFromList(',', 7);
        var kjtm=kj.split(',')[6];
        return combine(bet.split(' '), 2)
            .filter(function(v){
                return (kj2.indexOf(v[0])!=-1 && kjtm.indexOf(v[1])!=-1)||(kj2.indexOf(v[1])!=-1 && kjtm.indexOf(v[0])!=-1);
            }).length;
    }
    return count;
}
// PC 二中特
exports.LMSPOF21=function(bet, kj){
    var	count= rx(bet, kj.removeFromList(',', 7), 2);
    if(parseInt(count)<1){
        var kj2=kj.removeFromList(',', 7);
        var kjtm=kj.split(',')[6];
        return combine(bet.split(' '), 2)
            .filter(function(v){
                return (kj2.indexOf(v[0])!=-1 && kjtm.indexOf(v[1])!=-1)||(kj2.indexOf(v[1])!=-1 && kjtm.indexOf(v[0])!=-1);
            }).length;
    }
    return count;
}
//特串
exports.LMSPOF=function(bet, kj){
    var kj2=kj.removeFromList(',', 7);
    var kjtm=kj.split(',')[6];
    return combine(bet.split(' '), 2)
        .filter(function(v){
            return (kj2.indexOf(v[0])!=-1 && kjtm.indexOf(v[1])!=-1)||(kj2.indexOf(v[1])!=-1 && kjtm.indexOf(v[0])!=-1);
        }).length;
}

/*自选不中*/
exports.NOHIT5=function(bet, kj){
    return NOHIT(bet, kj, 5);
}
exports.NOHIT6=function(bet, kj){
    return NOHIT(bet, kj, 6);
}
exports.NOHIT7=function(bet, kj){
    return NOHIT(bet, kj, 7);
}
exports.NOHIT8=function(bet, kj){
    return NOHIT(bet, kj, 8);
}
exports.NOHIT9=function(bet, kj){
    return NOHIT(bet, kj, 9);
}
exports.NOHIT10=function(bet, kj){
    return NOHIT(bet, kj, 10);
}
exports.NOHIT11=function(bet, kj){
    return NOHIT(bet, kj, 11);
}
exports.NOHIT12=function(bet, kj){
    return NOHIT(bet, kj, 12);
}

/*自选不中函数*/
function NOHIT(bet, kj, num){
    return combine(bet.split(' '), num)
        .filter(function(v){
            if(num<7){
                return v.every(function(c){
                    return kj.indexOf(c)==-1;
                });
            }else{
                return kj.split(',').every(function(c){
                    return v.indexOf(c)==-1;
                });
            }
        }).length;
}

//总肖
exports.LTTZX=function(bet, kj){
    kj=kj.split(',');
    var newList = [];
    for(i=0;i<kj.length;i++){
        m=recheckANM(kj[i]);
        if(newList.indexOf(m)==-1){ //不包含
            newList.push(m);
        }
    }
    num=newList.length;
    bet=bet.replace(new RegExp("肖","g"),'');
    count=0;
    if(num==parseInt(bet)){
        count=1;
    }
    return count;
}
// 总肖单双
exports.LTTZXDS=function(bet, kj){
    kj=kj.split(',');
    var newList = [];
    for(i=0;i<kj.length;i++){
        m=recheckANM(kj[i]);
        if(newList.indexOf(m)==-1){ //不包含
            newList.push(m);
        }
    }
    num=newList.length;
    count=0;
    var result = num % 2;
    if(result == 0 && bet=="总肖双"){
        count=1;
    }else if(result != 0 && bet=="总肖单"){
        count=1;
    }

    return count;
}
// 正肖
exports.LHCZX=function(bet,kj){
    kj=kj.split(',');
    xsbet=GetANM(bet);
    count=0;
    for(i=0;i<6;i++){
        if(xsbet.indexOf(kj[i])!=-1){
            count=1;
        }
    }
    return count;
}

// 返回生肖
function recheckANM(bet){
    var xsbet1='10,22,34,46';
    var xsbet2='09,21,33,45';
    var xsbet3='08,20,32,44';
    var xsbet4='07,19,31,43';
    var xsbet5='06,18,30,42';
    var xsbet6='05,17,29,41';
    var xsbet7='04,16,28,40';
    var xsbet8='03,15,27,39';
    var xsbet9='02,14,26,38';
    var xsbet10='01,13,25,37,49';
    var xsbet11='12,24,36,48';
    var xsbet12='11,23,35,47';
    var flag;
    if(xsbet12.indexOf(bet)!=-1){
        flag="鼠";
    }else if(xsbet1.indexOf(bet)!=-1){
        flag="牛";
    }else if(xsbet2.indexOf(bet)!=-1){
        flag="虎";
    }else if(xsbet3.indexOf(bet)!=-1){
        flag="兔";
    }else if(xsbet4.indexOf(bet)!=-1){
        flag="龙";
    }else if(xsbet5.indexOf(bet)!=-1){
        flag="蛇";
    }else if(xsbet6.indexOf(bet)!=-1){
        flag="马";
    }else if(xsbet7.indexOf(bet)!=-1){
        flag="羊";
    }else if(xsbet8.indexOf(bet)!=-1){
        flag="猴";
    }else if(xsbet9.indexOf(bet)!=-1){
        flag="鸡";
    }else if(xsbet10.indexOf(bet)!=-1){
        flag="狗";
    }else if(xsbet11.indexOf(bet)!=-1){
        flag="猪";
    }
    return flag;
}

//判断生肖
function CheckANM(bet,xs){
    var xsbet,flag=false;
    switch(xs){
        case '鼠':
            xsbet='11,23,35,47';
            if(xsbet.indexOf(bet)!=-1) flag=true;
            break;

        case '牛':
            xsbet='10,22,34,46';
            if(xsbet.indexOf(bet)!=-1) flag=true;
            break;

        case '虎':
            xsbet='09,21,33,45';
            if(xsbet.indexOf(bet)!=-1) flag=true;
            break;

        case '兔':
            xsbet='08,20,32,44';
            if(xsbet.indexOf(bet)!=-1) flag=true;
            break;

        case '龙':
            xsbet='07,19,31,43';
            if(xsbet.indexOf(bet)!=-1) flag=true;
            break;

        case '蛇':
            xsbet='06,18,30,42';
            if(xsbet.indexOf(bet)!=-1) flag=true;
            break;

        case '马':
            xsbet='05,17,29,41';
            if(xsbet.indexOf(bet)!=-1) flag=true;
            break;

        case '羊':
            xsbet='04,16,28,40';
            if(xsbet.indexOf(bet)!=-1) flag=true;
            break;

        case '猴':
            xsbet='03,15,27,39';
            if(xsbet.indexOf(bet)!=-1) flag=true;
            break;

        case '鸡':
            xsbet='02,14,26,38';
            if(xsbet.indexOf(bet)!=-1) flag=true;
            break;

        case '狗':
            xsbet='01,13,25,37,49';
            if(xsbet.indexOf(bet)!=-1) flag=true;
            break;

        case '猪':
            xsbet='12,24,36,48';
            if(xsbet.indexOf(bet)!=-1) flag=true;
            break;

    }
    return flag;
}

function GetANM(xs){
    var xsbet;
    switch(xs){
        case '鼠':
            xsbet='11,23,35,47';
            break;

        case '牛':
            xsbet='10,22,34,46';
            break;

        case '虎':
            xsbet='09,21,33,45';
            break;

        case '兔':
            xsbet='08,20,32,44';
            break;

        case '龙':
            xsbet='07,19,31,43';
            break;

        case '蛇':
            xsbet='06,18,30,42';
            break;

        case '马':
            xsbet='05,17,29,41';
            break;

        case '羊':
            xsbet='04,16,28,40';
            break;

        case '猴':
            xsbet='03,15,27,39';
            break;

        case '鸡':
            xsbet='02,14,26,38';
            break;

        case '狗':
            xsbet='01,13,25,37,49';
            break;

        case '猪':
            xsbet='12,24,36,48';
            break;

    }
    return xsbet;
}

// 正码1-6
exports.LHCZM1=function(bet,kj){
    kj=kj.split(',');
    count=0;
    if(CheckZM16(bet,kj[0])){
        count=1;
    }
    return count;
}
exports.LHCZM2=function(bet,kj){
    kj=kj.split(',');
    count=0;
    if(CheckZM16(bet,kj[1])){
        count=1;
    }
    return count;
}
exports.LHCZM3=function(bet,kj){
    kj=kj.split(',');
    count=0;
    if(CheckZM16(bet,kj[2])){
        count=1;
    }
    return count;
}
exports.LHCZM4=function(bet,kj){
    kj=kj.split(',');
    count=0;
    if(CheckZM16(bet,kj[3])){
        count=1;
    }
    return count;
}
exports.LHCZM5=function(bet,kj){
    kj=kj.split(',');
    count=0;
    if(CheckZM16(bet,kj[4])){
        count=1;
    }
    return count;
}
exports.LHCZM6=function(bet,kj){
    kj=kj.split(',');
    count=0;
    if(CheckZM16(bet,kj[5])){
        count=1;
    }
    return count;
}
//正码一到六判断函数
function CheckZM16(bet,kj) {
    var xsbet,flag=false;
    var kjtmh=kj.split('');
    var val=parseInt(kjtmh[0],10)+parseInt(kjtmh[1],10);
    var val2=parseInt(kjtmh[1],10);
    switch(bet){
        case '单码':
            if(parseInt(kj) % 2 != 0) flag=true;
            break;

        case '双码':
            if(parseInt(kj) % 2 == 0) flag=true;
            break;

        case '大码':
            if(parseInt(kj)>24) flag=true;
            break;

        case '小码':
            if(parseInt(kj)<25) flag=true;
            break;

        case '合单':
            if(parseInt(val) % 2 != 0 && parseInt(val)!=49) flag=true;
            break;

        case '合双':
            if(parseInt(val) % 2 == 0 && parseInt(val)!=49) flag=true;
            break;

        case '合大':
            if(parseInt(val)>6 && parseInt(val)!=49) flag=true;
            break;

        case '合小':
            if(parseInt(val)<7 && parseInt(val)!=49) flag=true;
            break;

        case '红波':
            xsbet='01,02,12,13,23,24,34,35,45,46,07,08,18,19,29,30,40';
            if(xsbet.indexOf(kj)!=-1) flag=true;
            break;

        case '蓝波':
            xsbet='31,41,42,03,04,14,15,25,26,36,37,47,48,09,10,20';
            if(xsbet.indexOf(kj)!=-1) flag=true;
            break;

        case '绿波':
            xsbet='11,21,22,32,33,43,44,05,06,16,17,27,28,38,39,49';
            if(xsbet.indexOf(kj)!=-1) flag=true;
            break;

        case '尾大':
            if(parseInt(val2)>4 && parseInt(kj)!=49) count=1;
            break;

        case '尾小':
            if(parseInt(val2)<5 && parseInt(kj)!=49) count=1;
            break;

    }
    return flag;

}
// 正码特--正一
exports.LHCZMT=function(bet,kj) {
    kj=kj.split(',');
    count=0;
    if(CheckZMt(bet,kj[0])){
        count=1;
    }
    return count;
}
exports.LHCZMTNUM=function(bet,kj) {
    kj=kj.split(',');
    count=0;
    if(kj.indexOf(bet)!=-1){
        count=1;
    }
    return count;
}
// 检查正一
function CheckZMt(bet,kj) {
    var xsbet,flag=false;
    var kjtmh=kj.split('');
    var val=parseInt(kjtmh[0],10)+parseInt(kjtmh[1],10);
    switch(bet){
        case '正一单':
            if(parseInt(kj) % 2 != 0) flag=true;
            break;

        case '正一双':
            if(parseInt(kj) % 2 == 0) flag=true;
            break;

        case '正一大':
            if(parseInt(kj)>24) flag=true;
            break;

        case '正一小':
            if(parseInt(kj)<25) flag=true;
            break;

        case '正一合单':
            if(parseInt(val) % 2 != 0 && parseInt(val)!=49) flag=true;
            break;

        case '正一合双':
            if(parseInt(val) % 2 == 0 && parseInt(val)!=49) flag=true;
            break;

        case '正一红':
            xsbet='01,02,12,13,23,24,34,35,45,46,07,08,18,19,29,30,40';
            if(xsbet.indexOf(kj)!=-1) flag=true;
            break;

        case '正一蓝':
            xsbet='31,41,42,03,04,14,15,25,26,36,37,47,48,09,10,20';
            if(xsbet.indexOf(kj)!=-1) flag=true;
            break;

        case '正一绿':
            xsbet='11,21,22,32,33,43,44,05,06,16,17,27,28,38,39,49';
            if(xsbet.indexOf(kj)!=-1) flag=true;
            break;

    }
    return flag;

}
// 红绿蓝波
exports.LHCHLL=function(bet,kj) {

}
//判断波色
function CheckCLR(bet,xs){
    var xsbet,flag=false;
    switch(xs){
        case '红波':
            xsbet='01,02,12,13,23,24,34,35,45,46,07,08,18,19,29,30,40';
            if(xsbet.indexOf(bet)!=-1) flag=true;
            break;

        case '蓝波':
            xsbet='31,41,42,03,04,14,15,25,26,36,37,47,48,09,10,20';
            if(xsbet.indexOf(bet)!=-1) flag=true;
            break;

        case '绿波':
            xsbet='11,21,22,32,33,43,44,05,06,16,17,27,28,38,39,49';
            if(xsbet.indexOf(bet)!=-1) flag=true;
            break;

    }
    return flag;
}

// 五行
exports.LHCWX=function(bet,kj) {
    xbet1 = '02,03,16,17,24,25,32,33,46,47';
    xbet2 = '06,07,14,15,28,29,36,37,44,45';
    xbet3 = '04,05,12,13,20,21,34,35,42,43';
    xbet4 = '01,08,09,22,23,30,31,38,39';
    xbet5 = '10,11,18,19,26,27,40,41,48,49';

    kj=kj.split(',');
    count=0;
    if(bet=='金' && xbet1.indexOf(parseInt(kj[6]))!=-1){
        count =1;
    }else if (bet=='木' && xbet2.indexOf(parseInt(kj[6]))!=-1){
        count =1;
    }else if (bet=='水' && xbet3.indexOf(parseInt(kj[6]))!=-1){
        count =1;
    }else if (bet=='火' && xbet4.indexOf(parseInt(kj[6]))!=-1){
        count =1;
    }else if (bet=='土' && xbet5.indexOf(parseInt(kj[6]))!=-1){
        count =1;
    }
    return count;
}
//{{{ 常用算法

/**
 * 常用前选算法
 *
 * @params bet		投注列表：01 02 03,04 05
 * @params data		开奖所需的那几个：04,05
 * @params weizhu   开奖前几位数
 *
 * @return 			返回中奖注数
 */
function qs(bet, data, weizhu){

    bet=bet.split(',');
    return data.substr(0,weizhu*3-1).split(',')
        .some(function(v,i){
            return bet[i].indexOf(v)==-1;
        })?0:1;
}

/**
 * 常用复式算法
 *
 * @params bet		投注列表：123,45,2,59
 * @params data		开奖所需的那几个：4,5,0,8
 *
 * @return 			返回中奖注数
 */
function fs(bet, data){

    // 笛卡尔乘取得所投的号码
    return DescartesAlgorithm.apply(null, bet.split(',').map(function(v){return v.split('')}))

    // 把号码由数组变成字符串，以便比较
        .map(function(v){ return v.join(','); })

        // 过滤掉不中奖的号码
        .filter(function(v){ return v==data})

        // 返回中奖号码的总数
        .length;
}

/**
 * 单式算法
 *
 * @params bet		投注列表：1,5,2,9|3,2,4,6
 * @params data		开奖所需的那几位号码：4,5,3,6
 *
 * @return			返回中奖注数
 */
function ds(bet, data){
    return bet.split('|')
        .filter(function(v){ return v==data})
        .length;
}

/**
 * 组三
 *
 * @params bet		投注列表：135687或112,334
 * @params data		开奖所需的那几位号码：4,5,3
 *
 * @return			返回中奖注数
 */
function z3(bet, data){

    // 豹子不算中奖
    if(data.match(/^(\d),\1,\1/)) return 0;
    var reg=/(\d)\d?\1/;

    if(bet.indexOf(',')!=-1||reg.test(bet)){
        // 单选处理
        bet=bet.split(',');
        data=data.split(',').join('');

        var m=data.match(reg);
        if(!m) return 0;		// 如果三位数没有相同，则不中奖
        m=m[1];		// 重复位数
        reg=new RegExp(m, 'g')
        var s=data.replace(reg,'');	// 不重复的位数

        return bet.filter(function(v){
            //console.log('v:%s, s:%s', v, s);
            //console.log(reg);
            return v.replace(reg,'')==s;
        }).length;
    }else{
        // 复选处理
        bet=combine(bet.split(''),2).map(function(v){return v.join(',')});
        data=data.split(',');
        return bet.filter(function(v){
            var i=0;
            for(i in data){
                if(v.indexOf(data[i])==-1) return false;
            }
            return true;
        })
            .length;
    }

}

/**
 * 组六
 *
 * @params bet		投注列表：135687
 * @params data		开奖所需的那几位号码：4,5,3
 *
 * @return			返回中奖注数
 */
function z6(bet, data){

    // 豹子不算中奖
    if(data.match(/^(\d),\1,\1/)) return 0;

    data=permutation(data.split(','),3).map(function(v){return v.join('');});
    if(bet.indexOf(',')!=-1){
        // 录入式投注
        bet=bet.split(',');
    }else{
        // 点击按钮投注
        bet=combine(bet.split(""),3).map(function(v){return v.join("");});
    }
    return bet.filter(function(v){return data.indexOf(v)!=-1}).length;
}

/**
 * 组二复式
 *
 * @params bet		投注列表：135687
 * @params data		开奖所需的那几位号码：4,5
 *
 * @return			返回中奖注数
 */
function z2f(bet, data){
    // 对子不算中奖
    if(data.match(/^(\d),\1/)) return 0;

    data=data.split(',');
    var data1=data.join('');
    data=data.reverse().join('');
    return combine(bet.split(''), 2)
        .map(function(v){return v.join('');})
        .filter(function(v){
            return v==data||v==data1;
        }).length;
}

/**
 * 组二单式
 *
 * @params bet		投注列表：1,3|5,6|8,7
 * @params data		开奖所需的那几位号码：4,5
 *
 * @return			返回中奖注数
 */
function z2d(bet, data){
    // 对子不算中奖
    if(data.match(/^(\d),\1/)) return 0;

    var data1=data.reverse();
    return bet.split('|').filter(function(v){
        return v==data||v==data1;
    }).length;
}


/**
 * 大小单双
 *
 * @params bet		投注列表：大单,小单
 * @params data		开奖所需的那几位号码：4,5
 *
 * @return			返回中奖注数
 */
function dxds(bet, data){

    data=data.split(',');
    return DescartesAlgorithm.apply(null, bet.split(',').map(function(v){return v.split('')}))
        .filter(function(v){
            //console.log(v);
            var o={
                '大':'56789',
                '小':'01234',
                '单':'13579',
                '双':'02468'
            };
            //throw(v[0]);
            return o[v[0]].indexOf(data[0])!=-1 && o[v[1]].indexOf(data[1])!=-1
        })
        .length;
}

function dxds2(bet, data){

    data=data.split(',');
    return DescartesAlgorithm.apply(null, bet.split(',').map(function(v){return v.split('')}))
        .filter(function(v){
            //console.log(v);
            var o={
                '大':'06,07,08,09,10',
                '小':'01,02,03,04,05',
                '单':'01,03,05,07,09',
                '双':'02,04,06,08,10'
            };
            //throw(v[0]);
            return o[v[0]].indexOf(data[0])!=-1
        })
        .length;
}

//龙虎
function pk10lh(bet, kj, num){
    kj=kj.split(',');
    val1=parseInt(kj[num-1],10);
    val2=parseInt(kj[10-num],10);
    bet=bet.split('');
    count=0;
    for (var i=0,l=bet.length; i<l; i++){
        if(bet[i]=='龙'){
            if(val1>val2) count+=1;
        }
        else if(bet[i]=='虎'){
            if(val1<val2) count+=1;
        }else{}
    }
    return count;
}

function rx(bet, kj, num){

    var m,reg=/^\(([\d ]+)\)([\d ]+)$/;
    if(m=bet.match(reg)){
        // 胆拖投注
        var d=m[1].split(' ');

        if(d.some(function(c){return kj.indexOf(c)==-1})) return 0;

        return combine(m[2].split(' '), num-d.length)
            .filter(function(v){
                if(num<5){
                    return v.every(function(c){
                        return kj.indexOf(c)!=-1;
                    });
                }else{
                    v=v.concat(d);
                    return kj.split(',').every(function(c){
                        return v.indexOf(c)!=-1;
                    });
                }
            }).length;
    }else{
        // 普通投注

        return combine(bet.split(' '), num)
            .filter(function(v){
                if(num<5){
                    return v.every(function(c){
                        return kj.indexOf(c)!=-1;
                    });
                }else{
                    return kj.split(',').every(function(c){
                        return v.indexOf(c)!=-1;
                    });
                }
            }).length;
    }
}

function zx(bet, kj){
    var m,reg=/^\(([\d ]+)\)([\d ]+)$/;
    kj=kj.split(',');
    if(m=bet.match(reg)){
        // 胆拖投注
        var d=m[1].split(' ');
        if(d.some(function(c){return kj.indexOf(c)==-1})) return 0;
        return combine(m[2].split(' '), kj.length-d.length)
            .filter(function(v){
                return v.every(function(c){
                    return kj.indexOf(c)!=-1;
                });
            }).length;
    }else{
        // 普通投注
        return combine(bet.split(' '), kj.length)
            .filter(function(v){
                return v.every(function(c){
                    return kj.indexOf(c)!=-1;
                });
            }).length;
    }
}



/**
 * 笛卡尔乘积算法
 *
 * @params 一个可变参数，原则上每个都是数组，但如果数组只有一个值是直接用这个值
 *
 * useage:
 * console.log(DescartesAlgorithm(2, [4,5], [6,0],[7,8,9]));
 */
function DescartesAlgorithm(){
    var i,j,a=[],b=[],c=[];
    if(arguments.length==1){
        if(!Array.isArray(arguments[0])){
            return [arguments[0]];
        }else{
            return arguments[0];
        }
    }

    if(arguments.length>2){
        for(i=0;i<arguments.length-1;i++) a[i]=arguments[i];
        b=arguments[i];

        return arguments.callee(arguments.callee.apply(null, a), b);
    }

    if(Array.isArray(arguments[0])){
        a=arguments[0];
    }else{
        a=[arguments[0]];
    }
    if(Array.isArray(arguments[1])){
        b=arguments[1];
    }else{
        b=[arguments[1]];
    }

    for(i=0; i<a.length; i++){
        for(j=0; j<b.length; j++){
            if(Array.isArray(a[i])){
                c.push(a[i].concat(b[j]));
            }else{
                c.push([a[i],b[j]]);
            }
        }
    }

    return c;
}

/*自选不中函数*/
function NOHIT(bet, kj, num){
    return combine(bet.split(' '), num)
        .filter(function(v){
            if(num<7){
                return v.every(function(c){
                    return kj.indexOf(c)==-1;
                });
            }else{
                return kj.split(',').every(function(c){
                    return v.indexOf(c)==-1;
                });
            }
        }).length;
}

/**
 * 组合算法
 *
 * @params Array arr		备选数组
 * @params Int num
 *
 * @return Array			组合
 *
 * useage:  combine([1,2,3,4,5,6,7,8,9], 3);
 */
function combine(arr, num) {
    var r = [];
    (function f(t, a, n) {
        if (n == 0) return r.push(t);
        for (var i = 0, l = a.length; i <= l - n; i++) {
            f(t.concat(a[i]), a.slice(i + 1), n - 1);
        }
    })([], arr, num);
    return r;
}

/**
 * 排列算法
 */
function permutation(arr, num){
    var r=[];
    (function f(t,a,n){
        if (n==0) return r.push(t);
        for (var i=0,l=a.length; i<l; i++){
            f(t.concat(a[i]), a.slice(0,i).concat(a.slice(i+1)), n-1);
        }
    })([],arr,num);
    return r;
}
//}}}

/**
 * 分割字符串
 *
 * @params str		字符串
 * @params len      长度
 */
function strCut(str, len){
    var strlen = str.length;
    if(strlen == 0) return false;
    var j = Math.ceil(strlen / len);
    var arr = Array();
    for(var i=0; i<j; i++)
        arr[i] = str.substr(i*len, len)
    return arr;
}

//两个数组，返回包含相同数字的个数
function Sames(a,b){
    var num=0;
    for (i=0;i<a.length;i++)
    {   var zt=0;
        for (j=0;j<b.length;j++)
        {
            if(a[i]-b[j]==0){
                zt=1;
            }
        }
        if(zt==1){
            num+=1;
        }
    }
    return num;
}

function Combination(c, b) {
    b = parseInt(b);
    c = parseInt(c);
    if (b < 0 || c < 0) {
        return false
    }
    if (b == 0 || c == 0) {
        return 1
    }
    if (b > c) {
        return 0
    }
    if (b > c / 2) {
        b = c - b
    }
    var a = 0;
    for (i = c; i >= (c - b + 1) ; i--) {
        a += Math.log(i)
    }
    for (i = b; i >= 1; i--) {
        a -= Math.log(i)
    }
    a = Math.exp(a);
    return Math.round(a)
}


//过滤重复的数组
function filterArray(arrs){
    var k=0,n=arrs.length;
    var arr = new Array();
    for(var i=0;i<n;i++)
    {
        for(var j=i+1;j<n;j++)
        {
            if(arrs[i]==arrs[j])
            {
                arrs[i]=null;
                break;
            }
        }
    }
    for(var i=0;i<n;i++)
    {
        if(arrs[i])
        {
            arr[k++]=arrs[i]; // arr.push(this[i]);
        }
    }
    return arr;
}

//是否有重复值
function isRepeat(arr){

    var hash = {};

    for(var i in arr) {

        if(hash[arr[i]])

            return true;

        hash[arr[i]] = true;

    }

    return false;

}