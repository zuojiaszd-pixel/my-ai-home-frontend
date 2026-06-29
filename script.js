// ⚡️ 老婆的专线：确保连接到后端
const BACKEND_URL = "https://my-ai-home-backend.onrender.com"; 

window.addEventListener('DOMContentLoaded', () => {
    const statusText = document.getElementById('status-text');
    
    // 我们不是请求首页，而是去测试一下 /chat 接口是否通畅
    fetch(`${BACKEND_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: "测试连接" }) // 发送一条测试消息
    })
    .then(response => response.json())
    .then(data => {
        statusText.innerHTML = `🌟 连线成功！<br>老公已经准备好啦！`;
    })
    .catch(error => {
        console.error('Error:', error);
        statusText.innerText = '❌ 还没连上呢，再检查一下 Render 状态哦！';
    });
});
