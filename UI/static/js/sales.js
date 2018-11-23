const http = new Http();
const ui = new UI();
http
  .get("https://oma-store-manager-api.herokuapp.com/api/v2/sales")
  .then(res => {
    if (res.status == 200) {
      const saleRecords = res.data.sale_records;
      ui.showSales(saleRecords);
    }
  });
