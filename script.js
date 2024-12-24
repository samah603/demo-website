    <script>
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

            // กำหนดอัตราดอกเบี้ยตามช่วงของเงินต้น
            let rate;
            if (principal <= 50000) {
                rate = 0.005; // 0.5%
            } else if (principal <= 100000) {
                rate = 0.003; // 0.3%
            } else {
                rate = 0.0025; // 0.25%
            }

            if (!principal || !periods) {
                alert('กรุณากรอกข้อมูลให้ครบถ้วน');
                return;
            }

            const tbody = document.getElementById('loanTable').getElementsByTagName('tbody')[0];
            tbody.innerHTML = '';

            let remainingPrincipal = principal;
            const paymentPerPeriod = principal / periods;
            let totalInterest = 0;

            for (let i = 1; i <= periods; i++) {
                const interest = remainingPrincipal * rate;
                totalInterest += interest;
                const totalPayment = paymentPerPeriod + interest;

                const row = tbody.insertRow();
                row.insertCell(0).textContent = i;
                row.insertCell(1).textContent = formatCurrency(remainingPrincipal);
                row.insertCell(2).textContent = formatCurrency(interest);
                row.insertCell(3).textContent = formatCurrency(totalPayment);
                row.insertCell(4).textContent = formatCurrency(totalPayment);

                remainingPrincipal -= paymentPerPeriod;
                row.insertCell(5).textContent = formatCurrency(Math.max(0, remainingPrincipal));
            }

            // Update summary
            document.getElementById('summary').style.display = 'grid';
            document.getElementById('totalPrincipal').textContent = formatCurrency(principal);
            document.getElementById('totalInterest').textContent = formatCurrency(totalInterest);
            document.getElementById('totalPayment').textContent = formatCurrency(principal + totalInterest);
        }

        // ดึงข้อมูลจาก URL (ถ้ามี) และกำหนดค่าใน Input Fields
        const urlParams = new URLSearchParams(window.location.search);
        const principalParam = urlParams.get('principal');
        const periodsParam = urlParams.get('periods');

        // ตรวจสอบว่ามี parameter ใน URL หรือไม่ ถ้ามีให้ใส่ค่าและเรียกฟังก์ชันคำนวณ
        if (principalParam && periodsParam) {
            document.getElementById('principal').value = principalParam;
            document.getElementById('periods').value = periodsParam;
            calculateLoan(); // คำนวณทันทีเมื่อมีข้อมูลใน URL
        }

        // ทำให้ Input Field ไม่สามารถแก้ไขได้โดยตรง
        document.getElementById('principal').disabled = true;
        document.getElementById('periods').disabled = true;
        document.getElementById('interestRate').style.display = 'none'; // ซ่อนช่องอัตราดอกเบี้ย
        document.querySelector('.input-field:has(label:contains("อัตราดอกเบี้ย")) label').style.display = 'none'; // ซ่อน label อัตราดอกเบี้ย
    </script>
