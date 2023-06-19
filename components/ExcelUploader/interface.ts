/**需要筛选出的表头 */
export interface FilteredRow {
  交易时间: any;
  交易对方: any;
  商品: any;
  金额元: number | undefined;
  当前状态: any;
}

/**微信导出账单全部表头 */
export interface ExcelRow {
  交易时间: string;
  交易类型: string;
  交易对方: string;
  商品: string;
  收支: string;
  金额元: number;
  支付方式: string;
  当前状态: string;
  交易单号: string;
  商户单号: string;
  备注: string;
}

/**上传组件属性 */
export interface ExcelUploaderProps {
  reset: boolean;
  onReset: () => void;
}
