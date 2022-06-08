true;
false;

  //
  // var e=1;
  // console.log(e==true);
  // console.log(e===true);
  // var args=process.argv;
  // console.log(args  );
  // if(args[2]=='C1'){
  //   console.log('C1');
  // }else {
  //   console.log('C2');
  // }
  // while (true) {
  //   ;
  // }
  // for (var i = 0; i < 100; i++) {
  //   console.log('A');
  // }
var arr=[1,'A',2];
var arr2=new Array(1,2,3);
console.log(arr);
arr.push(3);
arr.unshift(0);
arr.splice(2,0,5);
console.log(arr);
arr.splice(0,1);
console.log(arr);
console.log(f1(1,2));
function f1(a, b) {
  return a+b;
}
