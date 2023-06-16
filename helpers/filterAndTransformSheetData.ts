import moment from 'moment';
import { FilteredRow } from '../components/ExcelUploader/interface';
import { dataStore } from '../store/sheetData';

export default function filterAndTransformSheetData(sheetData: any[][]) {
  const filteredData = sheetData
    .filter((row: any[]) => row.length >= 6)
    .map((row: any[]) => {
      const excelDate = parseFloat(row[0]);
      let 交易时间;
      if (!isNaN(excelDate)) {
        const date = new Date(Math.round((excelDate - 25569) * 86400 * 1000));
        交易时间 = moment(date).format('YYYY-MM-DD HH:mm:ss');
      } else {
        交易时间 = moment(row[0]).format('YYYY-MM-DD HH:mm:ss');
      }

      return {
        交易时间,
        交易对方: row[2],
        商品: row[3],
        金额元:
          row[5] !== undefined
            ? parseFloat(row[5].replace('¥', ''))
            : undefined,
        当前状态: row[7],
      } as FilteredRow;
    })
    .filter(
      (row: FilteredRow) =>
        row['交易时间'] !== undefined &&
        row['交易对方'] !== undefined &&
        row['商品'] !== undefined &&
        row['金额元'] !== undefined &&
        row['当前状态'] !== undefined
    );

  // 在筛选和转换数据成功之后，将数据存储到 MobX Store 中
  dataStore.setSheetData(filteredData);

  return filteredData;
}
