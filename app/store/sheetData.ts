// store/dataStore.ts
import { makeAutoObservable } from 'mobx';
import { FilteredRow } from '../components/ExcelUploader/interface';

type SheetDataType = FilteredRow;

class DataStore {
  sheetData: SheetDataType[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setSheetData(data: SheetDataType[]) {
    this.sheetData = data;
    console.log(data, 'data');
  }

  clearSheetData() {
    this.sheetData = [];
  }

  // 添加数据
  addData(data: SheetDataType) {
    this.sheetData.push(data);
  }

  // 根据某个条件更新数据
  updateData(
    updateFn: (data: SheetDataType) => boolean,
    newData: SheetDataType
  ) {
    const dataIndex = this.sheetData.findIndex(updateFn);
    if (dataIndex !== -1) {
      this.sheetData[dataIndex] = newData;
    }
  }

  // 根据某个条件删除数据
  removeData(deleteFn: (data: SheetDataType) => boolean) {
    const dataIndex = this.sheetData.findIndex(deleteFn);
    if (dataIndex !== -1) {
      this.sheetData.splice(dataIndex, 1);
    }
  }

  // 更多的操作方法...
}

export const dataStore = new DataStore();
