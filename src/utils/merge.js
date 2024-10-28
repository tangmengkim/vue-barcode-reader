// import * as XLSX from 'xlsx';
import XLSX from 'xlsx';

export function mergeExcelFiles(file1Path, file2Path, outputFilePath) {
  // Load the first Excel file
  const workbook1 = XLSX.readFile(file1Path);
  const sheet1 = workbook1.Sheets[workbook1.SheetNames[0]];
  const data1 = XLSX.utils.sheet_to_json(sheet1);

  // Load the second Excel file
  const workbook2 = XLSX.readFile(file2Path);
  const sheet2 = workbook2.Sheets[workbook2.SheetNames[0]];
  const data2 = XLSX.utils.sheet_to_json(sheet2);

  // Combine the data and merge quantities
  const combinedData = [...data1, ...data2];
  const mergedData = combinedData.reduce((acc, item) => {
    const existingItem = acc.find((entry) => entry.code === item.code);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      acc.push({ code: item.code, quantity: item.quantity });
    }
    return acc;
  }, []);

  // Create a new workbook with the merged data
  const worksheet = XLSX.utils.json_to_sheet(mergedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'import-stocktake');

  // Save the merged file to the specified output file path
  XLSX.writeFile(workbook, outputFilePath);

  console.log('Files merged and saved successfully as', outputFilePath);
}

// Example usage
// mergeExcelFiles('../utils/list1.xlsx', '../utils/list2.xlsx', 'merged_file.xlsx');
mergeExcelFiles('/Users/macbook/Code2Do/front/stocktakeweb/src/utils/list1.xlsx', '/Users/macbook/Code2Do/front/stocktakeweb/src/utils/list2.xlsx', '/Users/macbook/Code2Do/front/stocktakeweb/src/utils/merged_file.xlsx');
