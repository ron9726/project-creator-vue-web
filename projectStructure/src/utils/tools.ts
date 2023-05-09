import { Modal } from 'ant-design-vue';

interface GeneralObj {
  [key: string]: any;
}
export function deepClone(obj, cleanMode = false) {
  if (!obj) {
    console.error('deepClone: 参数为undefined | Null');
    return null;
  }
  if (typeof obj !== 'object') {
    console.error('deepClone: 传入参数非对象,只接受对象参数');
    return null;
  }
  let result: any;
  if (obj instanceof Array) {
    result = [];
    obj.forEach((v) => {
      if (typeof v !== 'boolean' && !v && cleanMode) {
        void 0;
      } else if (typeof v === 'object' && v !== null) {
        result.push(deepClone(v, cleanMode));
      } else {
        result.push(v);
      }
    });
    return result;
  }
  result = {};
  for (let key in obj) {
    if (typeof obj[key] !== 'boolean' && !obj[key] && cleanMode) {
      continue;
    }
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      result[key] = deepClone(obj[key], cleanMode);
    } else {
      result[key] = obj[key];
    }
  }
  return result;
}

export function inDevMode() {
  return import.meta.env.MODE === 'development';
}

export function errorModal(title, errorMsg) {
  Modal.error({
    title,
    content: errorMsg,
    centered: true,
    onOk() {
      Modal.destroyAll();
    },
    onCancel() {
      Modal.destroyAll();
    },
  });
}

export function printLogInDevMode(logMsg) {
  if (inDevMode()) {
    console.log(logMsg);
  }
}

export function setProps2Undefined(obj: GeneralObj): void {
  for (const key in obj) {
    obj[key] = undefined;
  }
}

export function copyProps(to: GeneralObj, from: GeneralObj): void {
  for (const key in from) {
    to[key] = from[key];
  }
}

export function convertToTreeData(src: any[], valueKey, idKey, labelKey): any[] {
  const result: any = [];
  src.forEach((item) => {
    const temp = {} as any;
    temp.value = item[valueKey];
    temp.label = item[labelKey];
    temp.key = item[idKey];
    if (item.children?.length) {
      item.children = convertToTreeData(item.children, valueKey, idKey, labelKey);
    }
    result.push(temp);
  });
  return result;
}
