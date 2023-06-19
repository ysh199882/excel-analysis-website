import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import { ExcelRow, ExcelUploaderProps } from './interface';
import Styles from './index.module.scss';
import filterAndTransformSheetData from '@/helpers/filterAndTransformSheetData';
import { observer } from 'mobx-react';
import { dataStore } from '@/store/sheetData';

const ExcelUploader = ({ reset, onReset }: ExcelUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (reset) {
      if (fileInputRef.current instanceof HTMLInputElement) {
        fileInputRef.current.value = '';
      }
      onReset();
    }
  }, [reset, onReset]);

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
          filterAndTransformSheetData(sheetData);
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
      <input {...getInputProps()} ref={fileInputRef} />

      {dataStore.sheetData.length === 0 ? (
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
              {dataStore.sheetData.map((row, index) => (
                <tr key={index}>
                  <td className={Styles.statusColumn}>{row.交易时间}</td>
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

export default observer(ExcelUploader);
