const url2 = "https://fapi.binance.com/fapi/v1/ticker/price";
let lastPrices = {};

setInterval(() => {
    fetch(url2)
        .then(res => res.json())
        .then(data => {
            let table = document.querySelector('#table1');
            table.innerHTML = '';

            let trheader = document.createElement('tr');
            let th1 = document.createElement('th');
            let th2 = document.createElement('th');
            let th3 = document.createElement('th');
            let th4 = document.createElement('th');

            th1.textContent = 'Symbol';
            th2.textContent = 'Last Price';
            th3.textContent = 'New Price';
            th4.textContent = 'Price Change' + ' ' + '15min';

            trheader.appendChild(th1);
            trheader.appendChild(th2);
            trheader.appendChild(th3);
            trheader.appendChild(th4);
            table.appendChild(trheader);

            data.forEach(item => {
                let tr = document.createElement('tr');
                let symbol = document.createElement('td');
                symbol.textContent = item.symbol;

                let lastPrice = lastPrices[item.symbol] || 0;
                let newPrice = parseFloat(item.price);
                let priceChange = ((newPrice - lastPrice) / lastPrice) * 100 || 0;

                let lastprices = document.createElement('td');
                lastprices.textContent = lastPrice;

                let newprices = document.createElement('td');
                newprices.textContent = newPrice;

                let percent = document.createElement('td');
                percent.textContent = priceChange.toFixed(2) + '%';
                if (priceChange > 0) {
                    percent.style.background = 'rgb(120, 247, 139)';
                } else if (priceChange < 0) {
                    percent.style.background = 'rgb(253, 64, 64)';
                }

                lastPrices[item.symbol] = newPrice;

                tr.appendChild(symbol);
                tr.appendChild(lastprices);
                tr.appendChild(newprices);
                tr.appendChild(percent);
                table.appendChild(tr);
            });
        })
        .catch(err => {
            console.log(err);
        });
}, 900000);
