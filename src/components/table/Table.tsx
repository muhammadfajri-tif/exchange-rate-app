import { useState } from 'react';
import DataTable from "../../components/dataTable/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import exchange from "../../data/exchange-rates.json";
import './Table.scss';

const rows = exchange.flatMap((rate, index) => [
    {
        id: `${index}_buy`,
        date: new Date(rate.date * 1000).toLocaleDateString(),
        type: rate.type,
        bank: rate.bank,
        transaction: 'Buy',
        USD: rate.IDRExchangeRate.USD.buy,
        SGD: rate.IDRExchangeRate.SGD.buy,
        EUR: rate.IDRExchangeRate.EUR.buy,
        CNY: rate.IDRExchangeRate.CNY.buy,
        GBP: rate.IDRExchangeRate.GBP.buy,
        JPY: rate.IDRExchangeRate.JPY.buy,
        SAR: rate.IDRExchangeRate.SAR.buy,
    },
    {
        id: `${index}_sell`,
        date: new Date(rate.date * 1000).toLocaleDateString(),
        type: rate.type,
        bank: rate.bank,
        transaction: 'Sell',
        USD: rate.IDRExchangeRate.USD.sell,
        SGD: rate.IDRExchangeRate.SGD.sell,
        EUR: rate.IDRExchangeRate.EUR.sell,
        CNY: rate.IDRExchangeRate.CNY.sell,
        GBP: rate.IDRExchangeRate.GBP.sell,
        JPY: rate.IDRExchangeRate.JPY.sell,
        SAR: rate.IDRExchangeRate.SAR.sell,
    },
  ]);

  function formatDate(dateString) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleString(undefined, options);
  }

  function formatCurrency(value) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
  }
  
  const columns: GridColDef[] = [
    { field: 'date', headerName: 'Date', width: 140, headerAlign: 'center', align: 'center', valueGetter: (params) => formatDate(params.value) },
    //{ field: 'type', headerName: 'Type', width: 100 },
    //{ field: 'bank', headerName: 'Bank', width: 50 },
    //{ field: 'transaction', headerName: 'Transaction', width: 100 },
    { field: 'USD', headerName: 'USD', width: 120, headerAlign: 'center', align: 'right', valueGetter: (params) => formatCurrency(params.value)},
    { field: 'SGD', headerName: 'SGD', width: 120, headerAlign: 'center', align: 'right', valueGetter: (params) => formatCurrency(params.value)},
    { field: 'EUR', headerName: 'EUR', width: 120, headerAlign: 'center', align: 'right', valueGetter: (params) => formatCurrency(params.value)},
    { field: 'CNY', headerName: 'CNY', width: 120, headerAlign: 'center', align: 'right', valueGetter: (params) => formatCurrency(params.value)},
    { field: 'GBP', headerName: 'GBP', width: 120, headerAlign: 'center', align: 'right', valueGetter: (params) => formatCurrency(params.value)},
    { field: 'JPY', headerName: 'JPY', width: 120, headerAlign: 'center', align: 'right', valueGetter: (params) => formatCurrency(params.value)},
    { field: 'SAR', headerName: 'SAR', width: 120, headerAlign: 'center', align: 'right', valueGetter: (params) => formatCurrency(params.value)},
  ];

  function formatBankName(bank) {
    const banksToUppercase = ['bi', 'bca', 'bni', 'bri', 'cimb', 'ocbc', 'btn'];
    if (banksToUppercase.includes(bank.toLowerCase())) {
      return bank.toUpperCase();
    } else {
      return bank.charAt(0).toUpperCase() + bank.slice(1).toLowerCase();
    }
  }
  
  const Table = () => {
    const [showBuy, setShowBuy] = useState(true);
    const [selectedBank, setSelectedBank] = useState("bi");
    const [selectedType, setSelectedType] = useState("bank notes");
    const banks = Array.from(new Set(rows.map(row => row.bank)));
  
    const filteredRows = rows.filter(row => row.transaction === (showBuy ? 'Buy' : 'Sell') && (!selectedBank || row.bank === selectedBank) && (!selectedType || row.type === selectedType));
  
    return (
      <div>
        <button onClick={() => setShowBuy(!showBuy)}>
          Toggle {showBuy ? 'Sell' : 'Buy'}
        </button>
        <select onChange={(e) => setSelectedType(e.target.value)}>
          <option value="bank notes">Bank Notes</option>
          <option value="dd/tt">DD/TT</option>
          <option value="e-rates">E-Rates</option>
        </select>
        <div className="bank-buttons">
          {banks.map(bank => (
            <button
              key={bank}
              onClick={() => setSelectedBank(bank)}
              className={`bank-button ${bank === selectedBank ? 'active' : ''}`}
            >
              {formatBankName(bank)}
            </button>
          ))}
        </div>
        <p>Bank - {formatBankName(selectedBank)}, Type - {selectedType}, Transaction - {showBuy ? 'Buy' : 'Sell'}</p> 
        <DataTable columns={columns} rows={filteredRows} slug="mydata"  />
      </div>
    );
  };

export default Table;