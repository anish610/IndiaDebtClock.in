// Data from provided table
const stateDebtData = [
    { state: "Tamil Nadu", debt: 8.30, gsdp: "26.4" },
    { state: "Uttar Pradesh", debt: 7.69, gsdp: "30.8" },
    { state: "Maharashtra", debt: 7.22, gsdp: "18.0" },
    { state: "West Bengal", debt: 6.60, gsdp: "36.9–38.9" },
    { state: "Karnataka", debt: 6.00, gsdp: "23.9" },
    { state: "Rajasthan", debt: 5.62, gsdp: "36.0" },
    { state: "Andhra Pradesh", debt: 4.90, gsdp: "33.3–35.1" },
    { state: "Gujarat", debt: 4.70, gsdp: "23.0" },
    { state: "Kerala", debt: 4.30, gsdp: "34.0–34.9" },
    { state: "Madhya Pradesh", debt: 3.80, gsdp: "30.7" },
    { state: "Punjab", debt: 3.05, gsdp: "44.1–47.3" },
    { state: "Telangana", debt: 3.66, gsdp: "28.0" },
    { state: "Haryana", debt: 2.87, gsdp: "27.2" },
    { state: "Bihar", debt: 2.80, gsdp: "35.7–52.0" },
    { state: "Himachal Pradesh", debt: 0.86, gsdp: "40.5–42.5" },
    { state: "Odisha", debt: 0.97, gsdp: "Not specified" },
    { state: "Arunachal Pradesh", debt: "Not specified", gsdp: "40.8–45.9" },
    { state: "Nagaland", debt: "Not specified", gsdp: "38.6–47.8" },
    { state: "Meghalaya", debt: "Not specified", gsdp: "37.9" },
    { state: "Sikkim", debt: "Not specified", gsdp: "34.0" },
    { state: "Tripura", debt: "Not specified", gsdp: "34.5" },
    { state: "Manipur", debt: "Not specified", gsdp: "34.5" },
    { state: "Jammu & Kashmir (UT)", debt: "Not specified", gsdp: "51.0" },
    { state: "Puducherry (UT)", debt: 0.12, gsdp: "<30.0" },
    { state: "Total State Debt", debt: 83.3, gsdp: "N/A" }
];

// Initial values (in ₹ crore for easier calculation)
let centralDebt = 168720000; // ₹168.72 lakh crore
let totalSpending = 47660000; // ₹47.66 lakh crore
let goldValue = 5950000; // ₹5.95 lakh crore
let perCitizenDebt = 121000; // ₹1.21 lakh

// Daily increase estimates
const dailyDebtIncrease = 4383; // ₹4,383 crore/day (based on fiscal deficit)
const dailySpendingIncrease = 13057; // ₹13,057 crore/day (₹47.66 lakh crore ÷ 365)

// Format numbers to Indian system (e.g., 1,23,45,678)
function formatIndianNumber(value) {
    return value.toLocaleString('en-IN', { maximumFractionDigits: 2 });
}

// Update counters
function updateCounters() {
    centralDebt += dailyDebtIncrease / (24 * 3600); // Per second increase
    totalSpending += dailySpendingIncrease / (24 * 3600); // Per second increase
    perCitizenDebt = centralDebt / 1400; // Per million population (1.4 billion)

    document.getElementById('central-debt').textContent = `₹${formatIndianNumber(centralDebt / 100000)} lakh crore`;
    document.getElementById('per-citizen-debt').textContent = `${formatIndianNumber(perCitizenDebt / 1000)} lakh`;
    document.getElementById('total-spending').textContent = `₹${formatIndianNumber(totalSpending / 100000)} lakh crore`;
    document.getElementById('gold-value').textContent = `₹${formatIndianNumber(goldValue / 100000)} lakh crore`;
}

// Populate state debt table
function populateStateDebtTable() {
    const tbody = document.getElementById('state-debt-body');
    stateDebtData.forEach(data => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data.state}</td>
            <td>${data.debt === "Not specified" ? data.debt : `₹${data.debt} lakh crore`}</td>
            <td>${data.gsdp}</td>
        `;
        tbody.appendChild(row);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    populateStateDebtTable();
    updateCounters();
    setInterval(updateCounters, 1000); // Update every second
});
