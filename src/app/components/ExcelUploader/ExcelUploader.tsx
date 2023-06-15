import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import moment from 'moment';
import { ExcelRow, FilteredRow } from './interface';
import Styles from './index.module.scss';

const ExcelUploader = () => {
  const [rows, setRows] = useState<ExcelRow[]>([]);

  const onDrop = useCallback((acceptedFiles: any[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        const binaryStr = reader.result;
        const workbook = XLSX.read(binaryStr, { type: 'binary' });

        workbook.SheetNames.forEach((sheetName) => {
          const sheetData: any[][] = XLSX.utils.sheet_to_json(
            workbook.Sheets[sheetName],
            {
              header: 1,
              range: 17, // 从第16行开始读取
            }
          );

          console.log(sheetData, 'sheetData');

          const filteredData = sheetData
            .filter((row: any[]) => row.length >= 6)
            .map((row: any[]) => ({
              交易时间: moment(row[0]).format('YYYY-MM-DD HH:mm:ss'),
              交易对方: row[2],
              商品: row[3],
              金额元:
                row[5] !== undefined
                  ? parseFloat(row[5].replace('¥', ''))
                  : undefined,
              当前状态: row[7],
            }))
            .filter(
              (row: FilteredRow) =>
                row['交易时间'] !== undefined &&
                row['交易对方'] !== undefined &&
                row['商品'] !== undefined &&
                row['金额元'] !== undefined &&
                row['当前状态'] !== undefined
            );

          console.log(filteredData, 'filteredData');

          setRows(filteredData as ExcelRow[]);
        });
      };
      reader.readAsBinaryString(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xlsx',
      ],
    },
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className={Styles.excelUploaderCon}
      style={{
        backgroundColor: isDragActive ? '#eee' : '',
        borderColor: isDragActive ? '#888' : '#aaa',
      }}
    >
      <input {...getInputProps()} />

      {rows.length === 0 ? (
        <p>拖拽Excel文件到这里，或点击选择文件</p>
      ) : (
        <div className={Styles.table}>
          <table>
            <thead>
              <tr>
                <th>交易时间</th>
                <th>交易对方</th>
                <th>商品</th>
                <th>金额元</th>
                <th>当前状态</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>{row.交易时间}</td>
                  <td>{row.交易对方}</td>
                  <td>{row.商品}</td>
                  <td>{row.金额元}</td>
                  <td className={Styles.statusColumn}>{row.当前状态}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExcelUploader;
