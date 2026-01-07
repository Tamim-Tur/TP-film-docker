async function testAuth() {
    const API_URL = 'http://localhost:5050/api/auth';
    const uniqueId = Date.now();
    const user = {
        username: `testuser_${uniqueId}`,
        email: `testuser_${uniqueId}@example.com`,
        password: 'password123'
    };

    console.log('--- Testing Registration ---');
    try {
        const regRes = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });

        console.log(`Status: ${regRes.status} ${regRes.statusText}`);
        const text = await regRes.text();
        try {
            const json = JSON.parse(text);
            console.log('Response JSON:', json);
        } catch (e) {
            console.log('Response Text:', text);
        }

    } catch (err) {
        console.error('❌ Registration Network Error:', err);
    }

    console.log('\n--- Testing Login ---');
    try {
        const loginRes = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: user.email,
                password: user.password
            })
        });

        console.log(`Status: ${loginRes.status} ${loginRes.statusText}`);
        const text = await loginRes.text();
        try {
            const json = JSON.parse(text);
            console.log('Response JSON:', json);
        } catch (e) {
            console.log('Response Text:', text);
        }
    } catch (err) {
        console.error('❌ Login Network Error:', err);
    }
}

testAuth();
