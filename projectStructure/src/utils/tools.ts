interface GeneralObj {
  [key: string]: any;
}

export function setProps2Undefined(obj: GeneralObj): void {
  for (const key in obj) {
    obj[key] = undefined;
  }
}

export function copyProps(to: GeneralObj, from: GeneralObj):void {
  for (const key in from) {
    to[key] = from[key];
  }
}

export function convertToTreeData(src:any[],valueKey, idKey, labelKey):any[]{
  const result:any = [];
  src.forEach(item=>{
    const temp = {} as any;
    temp.value = item[valueKey];
    temp.label = item[labelKey];
    temp.key = item[idKey];
    if(item.children?.length){
      item.children = convertToTreeData(item.children, valueKey, idKey, labelKey);
    }
    result.push(temp);
  })
  return result;
}