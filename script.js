function handleLog(type) {
    const name = document.getElementById('stdName').value.trim();
    const seat = document.getElementById('seatNo').value.trim();

    if (!name || !seat) {
        alert("Please enter Name and Seat Number!");
        return;
    }

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const logEntry = { 
        name: name, 
        seat: "Seat-" + seat, 
        time: time, 
        status: type 
    };

    // Save to LocalStorage
    let logs = JSON.parse(localStorage.getItem('libraryLogs')) || [];
    logs.push(logEntry);
    localStorage.setItem('libraryLogs', JSON.stringify(logs));

    // UI Reset & Update
    document.getElementById('stdName').value = "";
    document.getElementById('seatNo').value = "";
    renderLogs();
    
    alert(`${name} checked ${type} at Seat ${seat}`);
}

function renderLogs() {
    const logs = JSON.parse(localStorage.getItem('libraryLogs')) || [];
    const logBody = document.getElementById('logBody');
    
    // Sirf last 10 entries dikhayenge latest upar
    logBody.innerHTML = logs.slice(-10).reverse().map(log => `
        <tr>
            <td><b>${log.seat}</b></td>
            <td>${log.name}</td>
            <td>${log.time}</td>
            <td><span class="${log.status === 'IN' ? 'status-in' : 'status-out'}">${log.status}</span></td>
        </tr>
    `).join('');
}

// Global Navigation
function showSection(id) {
    document.querySelectorAll('.card').forEach(c => c.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}

// Initial Load
window.onload = renderLogs;
