import { Injectable } from '@angular/core';
import { Workbook, Worksheet } from 'exceljs';
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  private title = 'hello';

  constructor() {}

  setTitle(title: string): void {
    this.title = title;
  }

  // Balance Report

  generateBalanceReport(excelInfo: any, time: any) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Balance Report', {
      properties: { defaultRowHeight: 30, defaultColWidth: 20 },
    });
    this.balanceSetData(excelInfo, worksheet);
    this.balanceSetStyles(worksheet);
    this.balanceDownload(workbook, time);
  }

  balanceSetData(excelInfo: any, worksheet: Worksheet): void {
    worksheet.getCell('A1').value = 'Username';
    worksheet.getCell('B1').value = 'Name';
    worksheet.getCell('C1').value = 'Balance';
    worksheet.getCell('D1').value = 'Deposit';
    worksheet.getCell('E1').value = 'Withdraw';
    worksheet.getCell('F1').value = 'Profit';
    worksheet.getCell('G1').value = 'Total Balance';

    worksheet.getRow(1).font = { bold: true, size: 20 };

    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '130f63' },
    };

    let currentRowCount = 1;

    excelInfo.promoters.forEach((promoter) => {
      ++currentRowCount;

      let currentRow = worksheet.getRow(currentRowCount);

      currentRow.font = { bold: true, size: 20 };
      currentRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '153349' },
        bgColor: { argb: '153349' },
      };

      currentRow.getCell(1).value = promoter.userName;
      currentRow.getCell(2).value = promoter.name;
      currentRow.getCell(3).value = promoter.balance;
      currentRow.getCell(4).value = promoter.deposit;
      currentRow.getCell(5).value = promoter.withdraw;
      currentRow.getCell(6).value = promoter.profit;
      currentRow.getCell(7).value = promoter.totalBalance;

      promoter.shops.forEach((shop) => {
        ++currentRowCount;

        let currentRow = worksheet.getRow(currentRowCount);

        currentRow.font = { bold: true, size: 16 };

        currentRow.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '28a714' },
          bgColor: { argb: '28a714' },
        };

        currentRow.getCell(1).value = shop.userName;
        currentRow.getCell(2).value = shop.name;
        currentRow.getCell(3).value = shop.balance;
        currentRow.getCell(4).value = shop.deposit;
        currentRow.getCell(5).value = shop.withdraw;
        currentRow.getCell(6).value = shop.profit;
        currentRow.getCell(7).value = shop.totalBalance;

        shop.customers.forEach((customer) => {
          ++currentRowCount;

          let currentRow = worksheet.getRow(currentRowCount);

          currentRow.font = { bold: false, size: 14 };

          currentRow.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '8000BF' },
            bgColor: { argb: '8000BF' },
          };

          currentRow.getCell(1).value = customer.userName;
          currentRow.getCell(2).value = customer.name;
          currentRow.getCell(3).value = customer.balance;
          currentRow.getCell(4).value = customer.deposit;
          currentRow.getCell(5).value = customer.withdraw;
          currentRow.getCell(6).value = customer.profit;
          currentRow.getCell(7).value = customer.totalBalance;
        });
      });
    });
  }

  balanceSetData2(excelInfo: any, worksheet: Worksheet): void {
    worksheet.mergeCells('C2:E2');

    worksheet.getCell('B4').value = 'Name';
    worksheet.getCell('C4').value = 'Balance';
    worksheet.getCell('D4').value = 'Deposit';
    worksheet.getCell('E4').value = 'Withdraw';
    worksheet.getCell('F4').value = 'Profit';
    worksheet.getCell('G4').value = 'Total Balance';
    worksheet.getCell('B5').value = 'Totals';
    worksheet.getCell('C5').value = 'Totals';
    worksheet.getCell('D5').value = 'Totals';
    worksheet.getCell('E5').value = 'Totals';
    worksheet.getCell('F5').value = 'Totals';
    worksheet.getCell('G5').value = 'Totals';

    worksheet.getCell('A5').value = 'Stake';
    worksheet.getCell('A6').value = 'Running Bets';
    worksheet.getCell('A7').value = 'Payout';
    worksheet.getCell('A8').value = 'Voided bets';
    worksheet.getCell('A9').value = 'Bonus';
    worksheet.getCell('A10').value = 'Com';

    worksheet.getCell('C5').value = 'Stake';
    worksheet.getCell('C6').value = 'Running Bets';
    worksheet.getCell('C7').value = 'Payout';
    worksheet.getCell('C8').value = 'Voided bets';
    worksheet.getCell('C9').value = 'Bonus';
    worksheet.getCell('C10').value = 'Com';

    worksheet.getCell('E5').value = 'Deposited';
    worksheet.getCell('E6').value = 'Deposit Cost';
    worksheet.getCell('E7').value = 'Withdrawal';
    worksheet.getCell('E8').value = 'Withdrawal Cost';
    worksheet.getCell('E9').value = 'Previous Cash Balance';
    worksheet.getCell('E10').value = 'Current Balance';

    //Setting Variables

    const cellArray = [
      'B5',
      'B6',
      'B7',
      'B8',
      'B9',
      'B10',
      'B11',
      'D5',
      'D6',
      'D7',
      'D8',
      'D9',
      'D10',
      'D11',
      'F5',
      'F6',
      'F7',
      'F8',
      'F9',
      'F10',
      'F11',
      'D13',
    ];

    let index = 0;

    for (const key in excelInfo) {
      worksheet.getCell(cellArray[index]).value = excelInfo[key];
      index++;
    }
  }

  balanceSetStyles(worksheet: Worksheet): void {
    worksheet.columns.forEach((column) => {
      column.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };

      column.alignment = {
        vertical: 'middle',
        horizontal: 'center',
      };

      column.font = {
        color: { argb: 'FFFFFF' },
      };

      column.width = 30;
    });
  }

  balanceDownload(workbook: Workbook, time: any): void {
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(
        blob,
        // `Balance Report ${time.startDate} ${time.startTime} - ${time.endDate} ${time.endTime} `
        `Balance Report ${time.startDate} - ${time.endDate}.xlsx`
      );
    });
  }

  // WinLoss Report

  generateWinLossReport(excelInfo: any, time: any): void {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('WinLoss Report');
    this.winLossSetData(excelInfo, worksheet);
    this.setWinLossStyles(worksheet);
    this.winLossDownload(workbook, time);
  }

  setWinLossStyles(worksheet: Worksheet): void {
    worksheet.properties.defaultRowHeight = 30;
    this.winLossMergeCells(worksheet);
    this.winLossSetAlignment(worksheet);
    this.winLossSetBold(worksheet);
    this.winLossSetBorder(worksheet);
  }

  winLossSetBorder(worksheet: Worksheet): void {
    let col = 1;
    let getCol;

    for (col; col <= 6; col++) {
      getCol = worksheet.getColumn(col);
      getCol.eachCell((cell) => {
        if (cell._value.model.value === undefined) return;
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
    }
  }

  winLossMergeCells(worksheet: Worksheet): void {
    worksheet.mergeCells('A4:B4');
    worksheet.mergeCells('C4:D4');
    worksheet.mergeCells('E4:F4');
    worksheet.mergeCells('B2:E2');
    worksheet.mergeCells('B13:C13');
    worksheet.mergeCells('D13:E13');

    worksheet.mergeCells('B14:C14');
    worksheet.mergeCells('B15:C15');
    worksheet.mergeCells('D14:E14');
    worksheet.mergeCells('D15:E15');
  }

  winLossSetAlignment(worksheet: Worksheet): void {
    let index = 1;
    let col;
    for (index; index <= 6; index++) {
      col = worksheet.getColumn(index);
      col.alignment = {
        vertical: 'middle',
        horizontal: 'center',
      };

      col.width = 30;
    }
  }

  winLossSetData(excelInfo: any, worksheet: Worksheet): void {
    //Setting Text Values

    worksheet.getCell('B2').value = 'Profit Loss Report';
    worksheet.getCell('A4').value = 'Sports Book';
    worksheet.getCell('C4').value = 'Lay off';
    worksheet.getCell('E4').value = 'Banking';
    worksheet.getCell('A11').value = 'Profit';
    worksheet.getCell('C11').value = 'Profit';
    worksheet.getCell('E11').value = 'Total';
    worksheet.getCell('B13').value = 'Profit Loss';

    worksheet.getCell('A5').value = 'Stake';
    worksheet.getCell('A6').value = 'Running Bets';
    worksheet.getCell('A7').value = 'Payout';
    worksheet.getCell('A8').value = 'Voided bets';
    worksheet.getCell('A9').value = 'Bonus';
    worksheet.getCell('A10').value = 'Com';

    worksheet.getCell('C5').value = 'Stake';
    worksheet.getCell('C6').value = 'Running Bets';
    worksheet.getCell('C7').value = 'Payout';
    worksheet.getCell('C8').value = 'Voided bets';
    worksheet.getCell('C9').value = 'Bonus';
    worksheet.getCell('C10').value = 'Com';

    worksheet.getCell('E5').value = 'Deposited';
    worksheet.getCell('E6').value = 'Deposit Cost';
    worksheet.getCell('E7').value = 'Withdrawal';
    worksheet.getCell('E8').value = 'Withdrawal Cost';
    worksheet.getCell('E9').value = 'Previous Cash Balance';
    worksheet.getCell('E10').value = 'Current Balance';

    worksheet.getCell('B14').value = 'Credit Withdraw';
    worksheet.getCell('B15').value = 'Credit Deposit';

    //Setting Variables

    const cellArray = [
      'B5',
      'B6',
      'B7',
      'B8',
      'B9',
      'B10',
      'B11',
      'D5',
      'D6',
      'D7',
      'D8',
      'D9',
      'D10',
      'D11',
      'F5',
      'F6',
      'F7',
      'F8',
      'F9',
      'F10',
      'F11',
      'D13',

      'D14',
      'D15',
    ];

    let index = 0;

    for (const key in excelInfo) {
      worksheet.getCell(cellArray[index]).value = excelInfo[key];
      index++;
    }
  }

  winLossDownload(workbook: Workbook, time: any): void {
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(
        blob,
        // `WinLoss-Report ${time.startDate} ${time.startTime} - ${time.endDate} ${time.endTime}.xlsx `
        `WinLoss-Report ${time.startDate}- ${time.endTime}.xlsx`
      );
    });
  }

  winLossSetBold(worksheet: Worksheet): void {
    const font = {
      bold: true,
    };

    worksheet.getCell('B2').font = font;
    worksheet.getCell('A4').font = font;
    worksheet.getCell('C4').font = font;
    worksheet.getCell('E4').font = font;
    worksheet.getCell('A11').font = font;
    worksheet.getCell('C11').font = font;
    worksheet.getCell('E11').font = font;
    worksheet.getCell('B13').font = font;
    worksheet.getCell('B11').font = font;
    worksheet.getCell('D11').font = font;
    worksheet.getCell('F11').font = font;
    worksheet.getCell('D13').font = font;

    worksheet.getCell('B14').font = font;
    worksheet.getCell('B15').font = font;
    worksheet.getCell('D14').font = font;
    worksheet.getCell('D15').font = font;
  }

  // profit report

  generateProfitReport(excelInfo: any, time: any): void {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Profit Report', {
      properties: { defaultRowHeight: 30, defaultColWidth: 30 },
    });
    // const worksheet = workbook.addWorksheet("Profit Report");
    this.ProfitSetData(excelInfo, worksheet);
    this.setProfitStyles(worksheet);
    this.profitDownload(workbook, time);
  }

  // style functions
  setProfitStyles(worksheet: Worksheet): void {
    worksheet.properties.defaultRowHeight = 30;

    worksheet.columns.forEach((column) => {
      // column.border = {
      //   top: { style: "thick" },
      //   left: { style: "thick" },
      //   bottom: { style: "thick" },
      //   right: { style: "thick" }
      // };

      column.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };

      column.alignment = {
        vertical: 'middle',
        horizontal: 'center',
      };

      column.font = {
        color: { argb: 'FFFFFF' },
      };

      column.width = 30;
    });

    // this.profitMergeCells(worksheet);
    // this.profitSetAlignment(worksheet);
    // this.profitSetBold(worksheet);
    // this.profitSetBorder(worksheet);
  }

  profitMergeCells(worksheet: Worksheet): void {
    worksheet.mergeCells('A4:B4');
    worksheet.mergeCells('C4:D4');
    worksheet.mergeCells('E4:F4');
    worksheet.mergeCells('B2:E2');
    worksheet.mergeCells('B13:C13');
    worksheet.mergeCells('D13:E13');

    worksheet.mergeCells('B14:C14');
    worksheet.mergeCells('B15:C15');
    worksheet.mergeCells('D14:E14');
    worksheet.mergeCells('D15:E15');
  }

  profitSetAlignment(worksheet: Worksheet): void {
    let index = 1;
    let col;
    for (index; index <= 6; index++) {
      col = worksheet.getColumn(index);
      col.alignment = {
        vertical: 'middle',
        horizontal: 'center',
      };

      col.width = 30;
    }
  }

  profitSetBold(worksheet: Worksheet): void {
    const font = {
      bold: true,
    };

    worksheet.getCell('B2').font = font;
    worksheet.getCell('A4').font = font;
    worksheet.getCell('C4').font = font;
    worksheet.getCell('E4').font = font;
    worksheet.getCell('A11').font = font;
    worksheet.getCell('C11').font = font;
    worksheet.getCell('E11').font = font;
    worksheet.getCell('B13').font = font;
    worksheet.getCell('B11').font = font;
    worksheet.getCell('D11').font = font;
    worksheet.getCell('F11').font = font;
    worksheet.getCell('D13').font = font;

    worksheet.getCell('B14').font = font;
    worksheet.getCell('B15').font = font;
    worksheet.getCell('D14').font = font;
    worksheet.getCell('D15').font = font;
  }

  profitSetBorder(worksheet: Worksheet): void {
    let col = 1;
    let getCol;

    for (col; col <= 6; col++) {
      getCol = worksheet.getColumn(col);
      getCol.eachCell((cell) => {
        if (cell._value.model.value === undefined) return;
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
    }
  }

  // setting data functions

  ProfitSetData(excelInfo: any, worksheet: Worksheet): void {
    //Setting Text Values

    // worksheet.getCell("B3").style.fill= {
    //   type: 'pattern',
    //   pattern: 'solid',
    //   fgColor: {argb: 'FFD8D8D8'}
    // };
    worksheet.getRow(1).font = { bold: true, size: 20 };

    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '130f63' },
    };

    worksheet.getRow(2).font = { bold: true, size: 20 };
    worksheet.getRow(2).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '130f63' },
    };

    // worksheet.getRow(3).fill= {
    //   type: 'pattern',
    //   pattern:'solid',
    //   fgColor:{argb:'FF0000FF'},
    //   bgColor:{argb:'FF0000FF'}
    // };

    // worksheet.getRow(4).font =  {'size': 12, 'color':{'argb': 'FFFF6600'}, 'name': 'Calibri', 'family': 2, 'scheme': 'minor'};
    // worksheet.getRow(3).font =  {'size': 15, 'bold': true};

    // worksheet.getRow(3).fill= {
    //   type: 'pattern',
    //   pattern:'solid',
    //   fgColor:{argb:'FF0000FF'},
    //   bgColor:{argb:'FF0000FF'}
    // };

    worksheet.getCell('A1').value = 'Username';
    worksheet.getCell('B1').value = 'Name';
    worksheet.getCell('C1').value = 'Played Bets';
    worksheet.getCell('D1').value = 'Running Bets';
    worksheet.getCell('E1').value = 'Winning';
    worksheet.getCell('F1').value = 'Voided';
    worksheet.getCell('G1').value = 'Bonus';
    worksheet.getCell('H1').value = 'Commission';
    worksheet.getCell('I1').value = 'Profit';

    worksheet.getCell('A2').value = 'Total';
    worksheet.getCell('B2').value = '';
    worksheet.getCell('C2').value = excelInfo.playedBets;
    worksheet.getCell('D2').value = excelInfo.running;
    worksheet.getCell('E2').value = excelInfo.winning;
    worksheet.getCell('F2').value = excelInfo.voided;
    worksheet.getCell('G2').value = excelInfo.bonus;
    worksheet.getCell('H2').value = excelInfo.comission;
    worksheet.getCell('I2').value = excelInfo.profit;

    let currentRowCount: number = 2;

    excelInfo.promoters.forEach((promoter) => {
      currentRowCount++;
      let currentRow = worksheet.getRow(currentRowCount);
      // currentRow.font=  { 'color':{'argb': '28a714'}, };
      currentRow.font = { bold: true, size: 20 };
      currentRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '153349' },
        bgColor: { argb: '153349' },
      };

      currentRow.getCell(1).value = promoter.userName;
      currentRow.getCell(2).value = promoter.name;
      currentRow.getCell(3).value = promoter.playedBets;
      currentRow.getCell(4).value = promoter.running;
      currentRow.getCell(5).value = promoter.winning;
      currentRow.getCell(6).value = promoter.voided;
      currentRow.getCell(7).value = promoter.bonus;
      currentRow.getCell(8).value = promoter.comission;
      currentRow.getCell(9).value = promoter.profit;

      promoter.shops.forEach((shop) => {
        currentRowCount++;
        let currentRow = worksheet.getRow(currentRowCount);
        // currentRow.font=  { 'color':{'argb': '153349'}, };
        currentRow.font = { bold: true, size: 16 };

        currentRow.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '28a714' },
          bgColor: { argb: '28a714' },
        };

        currentRow.getCell(1).value = shop.userName;
        currentRow.getCell(2).value = shop.name;
        currentRow.getCell(3).value = shop.playedBets;
        currentRow.getCell(4).value = shop.running;
        currentRow.getCell(5).value = shop.winning;
        currentRow.getCell(6).value = shop.voided;
        currentRow.getCell(7).value = shop.bonus;
        currentRow.getCell(8).value = shop.comission;
        currentRow.getCell(9).value = shop.profit;

        shop.customers.forEach((customer) => {
          currentRowCount++;
          let currentRow = worksheet.getRow(currentRowCount);
          // currentRow.font=  { 'color':{'argb': '8000BF'}, };
          currentRow.font = { bold: false, size: 14 };

          currentRow.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '8000BF' },
            bgColor: { argb: '8000BF' },
          };

          currentRow.getCell(1).value = customer.userName;
          currentRow.getCell(2).value = customer.name;
          currentRow.getCell(3).value = customer.playedBets;
          currentRow.getCell(4).value = customer.running;
          currentRow.getCell(5).value = customer.winning;
          currentRow.getCell(6).value = customer.voided;
          // currentRow.getCell(7).value = '-';
          currentRow.getCell(7).value = customer.bonus;
          // currentRow.getCell(8).value = '-';
          currentRow.getCell(8).value = customer.comission;
          currentRow.getCell(9).value = customer.profit;
        });
      });
    });

    //Setting Variables

    // const cellArray = [
    //   "B5",
    //   "B6",
    //   "B7",
    //   "B8",
    //   "B9",
    //   "B10",
    //   "B11",
    //   "D5",
    //   "D6",
    //   "D7",
    //   "D8",
    //   "D9",
    //   "D10",
    //   "D11",
    //   "F5",
    //   "F6",
    //   "F7",
    //   "F8",
    //   "F9",
    //   "F10",
    //   "F11",
    //   "D13",

    //   "D14",
    //   "D15",
    // ];

    // let index = 0;

    // for (const key in excelInfo) {
    //
    //   worksheet.getCell(cellArray[index]).value = excelInfo[key];
    //   index++;
    // }
  }

  // download

  profitDownload(workbook: Workbook, time: any): void {
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(
        blob,
        // `WinLoss-Report ${time.startDate} ${time.startTime} - ${time.endDate} ${time.endTime}.xlsx `
        `profit-Report ${time.startDate}- ${time.endDate}.xlsx`
      );
    });
  }

  // end of profit report

  // payment report

  generatepaymentReport(excelInfo: any, time: any): void {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('payment Report', {
      properties: { defaultRowHeight: 30, defaultColWidth: 30 },
    });

    this.paymentSetData(excelInfo, worksheet);
    this.setpaymentStyles(worksheet);
    this.paymentDownload(workbook, time);
  }

  paymentSetData(excelInfo: any, worksheet: Worksheet): void {
    worksheet.getRow(1).font = { bold: true, size: 20 };

    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '130f63' },
    };

    worksheet.getCell('A1').value = 'Name';
    worksheet.getCell('B1').value = 'Deposit';
    worksheet.getCell('C1').value = 'Deposit Cost';
    worksheet.getCell('D1').value = 'Withdraw';
    worksheet.getCell('E1').value = 'Withdrawal Cost';
    worksheet.getCell('F1').value = 'Total Cost';

    let currentRowCount: number = 1;

    excelInfo.forEach((payment) => {
      currentRowCount++;
      let currentRow = worksheet.getRow(currentRowCount);
      currentRow.font = { bold: true, size: 20 };
      currentRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '153349' },
      };

      currentRow.getCell(1).value = payment.name;
      currentRow.getCell(2).value = payment.deposit;
      currentRow.getCell(3).value = payment.depositCost;
      currentRow.getCell(4).value = payment.withdraw;
      currentRow.getCell(5).value = payment.withdrawCost;
      currentRow.getCell(6).value = payment.totalCost;

      currentRowCount++;
      currentRow = worksheet.getRow(currentRowCount);
      currentRow.font = { bold: true, size: 20 };
      currentRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '6CA9F8' },
      };

      currentRow.getCell(1).value = 'Username';
      currentRow.getCell(2).value = 'Name';
      currentRow.getCell(3).value = 'Date';
      currentRow.getCell(4).value = 'Time';
      currentRow.getCell(5).value = 'Currency';
      currentRow.getCell(6).value = 'Amount';

      payment.records.forEach((record) => {
        currentRowCount++;
        let currentRow = worksheet.getRow(currentRowCount);
        currentRow.font = { bold: true, size: 16 };

        if (record.isDeposit) {
          currentRow.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '00cc00' },
          };
        } else {
          currentRow.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'cc0000' },
          };
        }

        // let date = this.dataService.returnDateTime(record.date );
        // let date = this.returnDateTime(record.date );
        // let d = this.datePipe.transform(date,'yyyy-MM-dd');
        // let t = this.datePipe.transform(date,'HH:mm');

        currentRow.getCell(1).value = record.userName;
        currentRow.getCell(2).value = record.name;
        currentRow.getCell(3).value = record.date;
        currentRow.getCell(4).value = record.time;
        currentRow.getCell(5).value = record.currency;
        currentRow.getCell(6).value = record.amount;
      });
    });
  }

  // style functions
  setpaymentStyles(worksheet: Worksheet): void {
    worksheet.properties.defaultRowHeight = 30;

    worksheet.columns.forEach((column) => {
      column.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };

      column.alignment = {
        vertical: 'middle',
        horizontal: 'center',
      };

      column.font = {
        color: { argb: 'FFFFFF' },
      };

      column.width = 30;
    });
  }

  // download

  paymentDownload(workbook: Workbook, time: any): void {
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(
        blob,
        // `WinLoss-Report ${time.startDate} ${time.startTime} - ${time.endDate} ${time.endTime}.xlsx `
        `Payment-Report ${time.startDate}- ${time.endDate}.xlsx`
      );
    });
  }

  // end of payment report

  // customer selections Report

  generateCustomerSelectionReport(excelInfo: any, start, end): void {
    excelInfo.start = start;
    excelInfo.end = end;
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Customer Selections Report', {
      properties: { defaultRowHeight: 30, defaultColWidth: 30 },
    });

    this.SelctionsSetData(excelInfo, worksheet);
    this.setSelectionsStyles(worksheet);
    this.selectionDownload(workbook, start, end, excelInfo.username);
  }

  // style functions
  setSelectionsStyles(worksheet: Worksheet): void {
    worksheet.properties.defaultRowHeight = 30;

    worksheet.columns.forEach((column) => {
      // column.border = {
      //   top: { style: "thick" },
      //   left: { style: "thick" },
      //   bottom: { style: "thick" },
      //   right: { style: "thick" }
      // };

      column.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };

      column.alignment = {
        vertical: 'middle',
        horizontal: 'center',
      };

      column.font = {
        // color:{argb:"FFFFFF"},
        color: { argb: '000000' },
        bold: true,
      };

      column.width = 25;
    });

    worksheet.columns[3].width = 45;
    // this.profitMergeCells(worksheet);
    // this.profitSetAlignment(worksheet);
    // this.profitSetBold(worksheet);
    // this.profitSetBorder(worksheet);
  }

  selectionsMergeCells(worksheet: Worksheet): void {
    worksheet.mergeCells('A4:B4');
    worksheet.mergeCells('C4:D4');
    worksheet.mergeCells('E4:F4');
    worksheet.mergeCells('B2:E2');
    worksheet.mergeCells('B13:C13');
    worksheet.mergeCells('D13:E13');

    worksheet.mergeCells('B14:C14');
    worksheet.mergeCells('B15:C15');
    worksheet.mergeCells('D14:E14');
    worksheet.mergeCells('D15:E15');
  }

  selectionsSetAlignment(worksheet: Worksheet): void {
    let index = 1;
    let col;
    for (index; index <= 6; index++) {
      col = worksheet.getColumn(index);
      col.alignment = {
        vertical: 'middle',
        horizontal: 'center',
      };

      col.width = 30;
    }
  }

  selectionsSetBold(worksheet: Worksheet): void {
    const font = {
      bold: true,
    };

    worksheet.getCell('B2').font = font;
    worksheet.getCell('A4').font = font;
    worksheet.getCell('C4').font = font;
    worksheet.getCell('E4').font = font;
    worksheet.getCell('A11').font = font;
    worksheet.getCell('C11').font = font;
    worksheet.getCell('E11').font = font;
    worksheet.getCell('B13').font = font;
    worksheet.getCell('B11').font = font;
    worksheet.getCell('D11').font = font;
    worksheet.getCell('F11').font = font;
    worksheet.getCell('D13').font = font;

    worksheet.getCell('B14').font = font;
    worksheet.getCell('B15').font = font;
    worksheet.getCell('D14').font = font;
    worksheet.getCell('D15').font = font;
  }

  selectionsSetBorder(worksheet: Worksheet): void {
    let col = 1;
    let getCol;

    for (col; col <= 6; col++) {
      getCol = worksheet.getColumn(col);
      getCol.eachCell((cell) => {
        if (cell._value.model.value === undefined) return;
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
    }
  }

  // setting data functions

  SelctionsSetData(excelInfo: any, worksheet: Worksheet): void {
    let currentRowCount: number = 1;

    let purpoleRgb = '2596be';

    let greenRgb = 'c8eccc';
    let redRgb = 'ffc4cc';
    let orangRgb = 'ffec9c';
    let purplyBlueRgb = 'c0cce4';

    //0 (1)

    worksheet.getCell('A' + currentRowCount).value = 'Username (Name):';
    worksheet.getCell('B' + currentRowCount).value =
      excelInfo.username + ' (' + excelInfo.name + ')';
    worksheet.getCell('C' + currentRowCount).value = 'Role:';
    worksheet.getCell('D' + currentRowCount).value = excelInfo.role;

    currentRowCount++;

    // hfa

    worksheet.getCell('A' + currentRowCount).value = 'Start date:';
    worksheet.getCell('B' + currentRowCount).value = excelInfo.start;
    worksheet.getCell('C' + currentRowCount).value = 'End date:';
    worksheet.getCell('D' + currentRowCount).value = excelInfo.end;

    currentRowCount++;

    //1

    worksheet.getCell('A' + currentRowCount).value = 'Bets:';
    worksheet.getCell('B' + currentRowCount).value = excelInfo.bets;
    worksheet.getCell('C' + currentRowCount).value = 'Selections:';
    worksheet.getCell('D' + currentRowCount).value = excelInfo.selections;

    currentRowCount++;

    //2

    worksheet.getCell('A' + currentRowCount).value = 'Total Stake:';
    worksheet.getCell('B' + currentRowCount).value = excelInfo.totalStake;
    worksheet.getCell('C' + currentRowCount).value = 'Customer profit:';
    worksheet.getCell('D' + currentRowCount).value = excelInfo.profit;

    currentRowCount++;

    //3

    worksheet.getCell('A' + currentRowCount).value = 'Void:';
    worksheet.getCell('B' + currentRowCount).value = excelInfo.void;
    worksheet.getCell('C' + currentRowCount).value = 'Total Void:';
    worksheet.getCell('D' + currentRowCount).value = excelInfo.totalVoid;

    currentRowCount++;

    //4

    worksheet.getCell('A' + currentRowCount).value = 'Win:';
    worksheet.getCell('B' + currentRowCount).value = excelInfo.win;
    worksheet.getCell('C' + currentRowCount).value = 'Total Win:';
    worksheet.getCell('D' + currentRowCount).value = excelInfo.totalWin;

    currentRowCount++;

    //5

    worksheet.getCell('A' + currentRowCount).value = 'Loss:';
    worksheet.getCell('B' + currentRowCount).value = excelInfo.loss;
    worksheet.getCell('C' + currentRowCount).value = 'Total Loss:';
    worksheet.getCell('D' + currentRowCount).value = excelInfo.totalLoss;

    currentRowCount++;

    //6

    worksheet.getCell('A' + currentRowCount).value = 'Pending:';
    worksheet.getCell('B' + currentRowCount).value = excelInfo.pending;
    worksheet.getCell('C' + currentRowCount).value = 'Total Pending:';
    worksheet.getCell('D' + currentRowCount).value = excelInfo.totalPending;

    for (let i = 1; i <= currentRowCount; i++) {
      worksheet.getRow(i).font = { bold: true, size: 30 };

      // worksheet.getRow(i).fill ={
      //   type: 'pattern',
      //   pattern: 'solid',
      //   fgColor: {argb: 'FFFFFF'}
      // };
    }

    // coloring top rows

    let i = 1;

    //row1

    worksheet.getRow(i).eachCell(function (cell) {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'b8dcec' },
      };
    });
    i++;
    //row1

    worksheet.getRow(i).eachCell(function (cell) {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'b8dcec' },
      };
    });
    i++;
    //row1

    worksheet.getRow(i).eachCell(function (cell) {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'b8dcec' },
      };
    });
    i++;
    //row2

    if (excelInfo.profit > 0) {
      worksheet.getRow(i).eachCell(function (cell) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: greenRgb },
        };
      });
    } else {
      worksheet.getRow(i).eachCell(function (cell) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: redRgb },
        };
      });
    }
    i++;

    //row3

    worksheet.getRow(i).eachCell(function (cell) {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: purplyBlueRgb },
      };
    });
    i++;
    //row4

    worksheet.getRow(i).eachCell(function (cell) {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: greenRgb },
      };
    });
    i++;
    //row5

    worksheet.getRow(i).eachCell(function (cell) {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: redRgb },
      };
    });
    i++;
    //row6

    worksheet.getRow(i).eachCell(function (cell) {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: orangRgb },
      };
    });
    i++;

    currentRowCount++;
    currentRowCount++;

    //8
    worksheet.getRow(currentRowCount).font = { bold: true, size: 40 };
    // worksheet.getRow(currentRowCount).fill ={
    //   type: 'pattern',
    //   pattern: 'solid',
    //   fgColor: {argb: '24abc9'},
    // };

    worksheet.getCell('A' + currentRowCount).value = 'Bet Id';
    worksheet.getCell('B' + currentRowCount).value = 'Bet Type';
    worksheet.getCell('C' + currentRowCount).value = 'Date';
    worksheet.getCell('D' + currentRowCount).value = 'Event';
    worksheet.getCell('E' + currentRowCount).value = 'Market';
    worksheet.getCell('F' + currentRowCount).value = 'Selection';
    worksheet.getCell('G' + currentRowCount).value = 'Odd';
    worksheet.getCell('H' + currentRowCount).value = 'Stake';
    worksheet.getCell('I' + currentRowCount).value = 'Payout';
    worksheet.getCell('J' + currentRowCount).value = 'Status';

    worksheet.getRow(currentRowCount).eachCell(function (cell) {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '24abc9' },
        bgColor: { argb: '24abc9' },
      };
    });

    // 1/ filling 1 cell only

    // worksheet.getCell("A1").fill = {
    //   type: 'pattern',
    //   pattern: 'solid',
    //   fgColor: {argb: orangRgb},
    // };

    // 2/ filling complete row

    // worksheet.getRow(currentRowCount).fill ={
    //   type: 'pattern',
    //   pattern: 'solid',
    //   fgColor: {argb: '24abc9'},
    // };

    // 3/ filling onlly used cells in a row

    // worksheet.getRow(5).eachCell(function(cell) {
    //   cell.fill = {
    //     type: 'pattern',
    //     pattern: 'solid',
    //     fgColor: {argb: redRgb},
    //   };
    // });

    // let currentRowCount:number = 3;

    // feel selections
    excelInfo.selectionList.forEach((sel) => {
      currentRowCount++;
      let currentRow = worksheet.getRow(currentRowCount);
      // currentRow.font=  { 'color':{'argb': '28a714'}, };
      let bgColor = greenRgb;

      if (sel.status == 'Win') {
        bgColor = greenRgb;
      } else if (sel.status == 'Loss') {
        bgColor = redRgb;
      } else if (sel.status == 'Pending') {
        bgColor = orangRgb;
      } else if (sel.status == 'Void') {
        bgColor = purplyBlueRgb;
      }

      currentRow.font = { bold: true, size: 20 };
      // currentRow.fill= {
      //     type: 'pattern',
      //     pattern:'solid',
      //     fgColor:{argb:bgColor},
      //     bgColor:{argb:bgColor}
      //   };

      currentRow.getCell(1).value = sel.betId;
      currentRow.getCell(2).value = sel.betType;
      currentRow.getCell(3).value = sel.date;
      currentRow.getCell(4).value = sel.event;
      currentRow.getCell(5).value = sel.market;
      currentRow.getCell(6).value = sel.selection;
      currentRow.getCell(7).value = sel.odd;
      currentRow.getCell(8).value = sel.stake;
      currentRow.getCell(9).value = sel.payout;
      currentRow.getCell(10).value = sel.status;

      currentRow.eachCell(function (cell) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: bgColor },
          bgColor: { argb: bgColor },
        };
      });
    });
  }

  // download

  selectionDownload(workbook: Workbook, start, end, name): void {
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(
        blob,
        // `WinLoss-Report ${time.startDate} ${time.startTime} - ${time.endDate} ${time.endTime}.xlsx `
        `selectionsReport - ${name} / ${start}- ${end}.xlsx`
      );
    });
  }

  // end of customer selections Report

  // Bets Report

  generateBetsReport(excelInfo: any, start, end): void {
    excelInfo.start = start;
    excelInfo.end = end;
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Customer Selections Report', {
      properties: { defaultRowHeight: 30, defaultColWidth: 30 },
    });

    this.betsSetData(excelInfo, worksheet);
    this.setBetsStyles(worksheet);
    this.betsDownload(workbook, start, end, excelInfo.username);
  }

  // style functions
  setBetsStyles(worksheet: Worksheet): void {
    worksheet.properties.defaultRowHeight = 30;

    worksheet.columns.forEach((column) => {
      // column.border = {
      //   top: { style: "thick" },
      //   left: { style: "thick" },
      //   bottom: { style: "thick" },
      //   right: { style: "thick" }
      // };

      column.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };

      column.alignment = {
        vertical: 'middle',
        horizontal: 'center',
      };

      column.font = {
        // color:{argb:"FFFFFF"},
        color: { argb: '000000' },
        bold: true,
      };

      column.width = 25;
    });

    worksheet.columns[3].width = 45;
    // this.profitMergeCells(worksheet);
    // this.profitSetAlignment(worksheet);
    // this.profitSetBold(worksheet);
    // this.profitSetBorder(worksheet);
  }

  betsMergeCells(worksheet: Worksheet): void {
    worksheet.mergeCells('A4:B4');
    worksheet.mergeCells('C4:D4');
    worksheet.mergeCells('E4:F4');
    worksheet.mergeCells('B2:E2');
    worksheet.mergeCells('B13:C13');
    worksheet.mergeCells('D13:E13');

    worksheet.mergeCells('B14:C14');
    worksheet.mergeCells('B15:C15');
    worksheet.mergeCells('D14:E14');
    worksheet.mergeCells('D15:E15');
  }

  betsSetAlignment(worksheet: Worksheet): void {
    let index = 1;
    let col;
    for (index; index <= 6; index++) {
      col = worksheet.getColumn(index);
      col.alignment = {
        vertical: 'middle',
        horizontal: 'center',
      };

      col.width = 30;
    }
  }

  betsSetBold(worksheet: Worksheet): void {
    const font = {
      bold: true,
    };

    worksheet.getCell('B2').font = font;
    worksheet.getCell('A4').font = font;
    worksheet.getCell('C4').font = font;
    worksheet.getCell('E4').font = font;
    worksheet.getCell('A11').font = font;
    worksheet.getCell('C11').font = font;
    worksheet.getCell('E11').font = font;
    worksheet.getCell('B13').font = font;
    worksheet.getCell('B11').font = font;
    worksheet.getCell('D11').font = font;
    worksheet.getCell('F11').font = font;
    worksheet.getCell('D13').font = font;

    worksheet.getCell('B14').font = font;
    worksheet.getCell('B15').font = font;
    worksheet.getCell('D14').font = font;
    worksheet.getCell('D15').font = font;
  }

  betsSetBorder(worksheet: Worksheet): void {
    let col = 1;
    let getCol;

    for (col; col <= 6; col++) {
      getCol = worksheet.getColumn(col);
      getCol.eachCell((cell) => {
        if (cell._value.model.value === undefined) return;
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
    }
  }

  // setting data functions

  betsSetData(excelInfo: any, worksheet: Worksheet): void {
    let currentRowCount: number = 1;

    let purpoleRgb = '2596be';

    let greenRgb = 'c8eccc';
    let redRgb = 'ffc4cc';
    let orangRgb = 'ffec9c';
    let purplyBlueRgb = 'c0cce4';

    for (let i = 1; i <= currentRowCount; i++) {
      worksheet.getRow(i).font = { bold: true, size: 40 };
    }

    // coloring top rows

    let i = 1;

    //1
    worksheet.getRow(currentRowCount).font = { bold: true, size: 40 };

    worksheet.getCell('A' + currentRowCount).value = 'Id';
    worksheet.getCell('B' + currentRowCount).value = 'Username';
    worksheet.getCell('C' + currentRowCount).value = 'Parent';
    worksheet.getCell('D' + currentRowCount).value = 'Bet Type';
    worksheet.getCell('E' + currentRowCount).value = 'Sel. Mode';
    worksheet.getCell('F' + currentRowCount).value = 'Selections';
    worksheet.getCell('G' + currentRowCount).value = 'Winning Sel.';
    worksheet.getCell('H' + currentRowCount).value = 'Stake';
    worksheet.getCell('I' + currentRowCount).value = 'E. Win';
    worksheet.getCell('J' + currentRowCount).value = 'E. Win + Bonus';
    worksheet.getCell('K' + currentRowCount).value = 'Real Win';
    worksheet.getCell('L' + currentRowCount).value = 'Net';
    worksheet.getCell('M' + currentRowCount).value = 'Action Date';
    worksheet.getCell('N' + currentRowCount).value = 'Date';

    worksheet.getRow(currentRowCount).eachCell(function (cell) {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '24abc9' },
        bgColor: { argb: '24abc9' },
      };
    });

    //2
    currentRowCount++;
    worksheet.getRow(currentRowCount).font = { bold: true, size: 40 };

    worksheet.getCell('A' + currentRowCount).value = '';
    worksheet.getCell('B' + currentRowCount).value =
      'Total:' + excelInfo.total.totalBets;
    worksheet.getCell('C' + currentRowCount).value = '';
    worksheet.getCell('D' + currentRowCount).value = '';
    worksheet.getCell('E' + currentRowCount).value = '';
    worksheet.getCell('F' + currentRowCount).value =
      excelInfo.total.totalSelections;
    worksheet.getCell('G' + currentRowCount).value =
      excelInfo.total.winningSelection;
    worksheet.getCell('H' + currentRowCount).value = excelInfo.total.stake;
    worksheet.getCell('I' + currentRowCount).value = excelInfo.total.ew;
    worksheet.getCell('J' + currentRowCount).value = excelInfo.total.ewb;
    worksheet.getCell('K' + currentRowCount).value = excelInfo.total.rwb;
    worksheet.getCell('L' + currentRowCount).value = excelInfo.total.net;
    worksheet.getCell('M' + currentRowCount).value = '';
    worksheet.getCell('N' + currentRowCount).value = '';

    worksheet.getRow(currentRowCount).eachCell(function (cell) {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '7ae3fa' },
        bgColor: { argb: '7ae3fa' },
      };
    });

    // fill selections
    excelInfo.bets.forEach((sel) => {
      currentRowCount++;
      let currentRow = worksheet.getRow(currentRowCount);
      // currentRow.font=  { 'color':{'argb': '28a714'}, };
      let bgColor = greenRgb;

      if (sel.status == 'Win') {
        bgColor = greenRgb;
      } else if (sel.status == 'Loss') {
        bgColor = redRgb;
      } else if (sel.status == 'Pending') {
        bgColor = orangRgb;
      } else if (sel.status == 'Void') {
        bgColor = purplyBlueRgb;
      }

      currentRow.font = { bold: true, size: 20 };

      currentRow.getCell(1).value = sel.id;
      currentRow.getCell(2).value = sel.userName;
      currentRow.getCell(3).value = sel.parentName;
      currentRow.getCell(4).value = sel.betType;
      currentRow.getCell(5).value = sel.selectionType;
      currentRow.getCell(6).value = sel.totalSelections;
      currentRow.getCell(7).value = sel.winningSelections;
      currentRow.getCell(8).value = sel.stake;
      currentRow.getCell(9).value = sel.payout;
      currentRow.getCell(10).value = sel.maxPayout;
      currentRow.getCell(11).value = sel.realWin;
      currentRow.getCell(12).value = sel.net;
      currentRow.getCell(13).value = sel.actionDate;
      currentRow.getCell(14).value = sel.date + ' | ' + sel.time;

      currentRow.eachCell(function (cell) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: bgColor },
          bgColor: { argb: bgColor },
        };
      });
    });
  }

  // download

  betsDownload(workbook: Workbook, start, end, name): void {
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(
        blob,
        // `WinLoss-Report ${time.startDate} ${time.startTime} - ${time.endDate} ${time.endTime}.xlsx `
        `BetsReport / ${start} - ${end}.xlsx`
      );
    });
  }

}
