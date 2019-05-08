// Object.key(args)  -  object 의 key 들을 배열로 리턴
// 배열에서 반복돌려 null이 아니면 새 object에 위치
// typeScript 에서 해당 파라미터가 null일 수 없기때문에.
// 만약 된다해도 null값으로 업데이트가 되곘지?
//    Object.keys(args).forEach(key => {
//      if (args[key] !== null) {
//        notNullCheckObject[key] = args[key];
//        delete notNullCheckObject.password;
//      }
//    });

const cleanNullArgs = (args: object): object => {
  const notNull = {};
  Object.keys(args).forEach(key => {
    if (args[key] !== null) {
      notNull[key] = args[key];
    }
  });
  return notNull;
};

export default cleanNullArgs;
