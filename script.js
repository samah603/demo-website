        function formatCurrency(number) {
            return new Intl.NumberFormat('th-TH', {
                style: 'currency',
                currency: 'THB',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(number);
        }

        function calculateLoan() {
            const principal = parseFloat(document.getElementById('principal').value);
            const periods = parseInt(document.getElementById('periods').value);

            if (!principal || !periods) {
                alert('กรุณากรอกข้อมูลให้ครบถ้วน');
                return;
            }

            let rate;
            if (principal <= 50000) {
                rate = 0.005; // 0.5%
            } else if (principal <= 100000) {
                rate = 0.003; // 0.3%
            } else {
                rate = 0.0025; // 0.25%
            }

            const tbody = document.getElementById('loanTable').getElementsByTagName('tbody')[0];
            tbody.innerHTML = '';

            let remainingPrincipal = principal;
            let totalInterest = 0;

            for (let i = 1; i <= periods; i++) {
                const interest = remainingPrincipal * rate;
                totalInterest += interest;
                const totalPayment = (principal / periods) + interest;

                const row = tbody.insertRow();
                row.insertCell(0).textContent = i;
                row.insertCell(1).textContent = formatCurrency(remainingPrincipal);
                row.insertCell(2).textContent = formatCurrency(interest);
                row.insertCell(3).textContent = formatCurrency(totalPayment);
                row.insertCell(4).textContent = formatCurrency(totalPayment);
                
                remainingPrincipal -= (principal / periods);
                row.insertCell(5).textContent = formatCurrency(Math.max(0, remainingPrincipal));
            }

            // Update summary
            document.getElementById('summary').style.display = 'grid';
            document.getElementById('totalPrincipal').textContent = formatCurrency(principal);
            document.getElementById('totalInterest').textContent = formatCurrency(totalInterest);
            document.getElementById('totalPayment').textContent = formatCurrency(principal + totalInterest);
        }
