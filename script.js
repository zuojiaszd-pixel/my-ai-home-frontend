// 1. 表情包配置
const RinkaEmojis = [
    "./emoji/snuggle1.jpg", 
    // 把你之后上传的其他图片名也像上面这样加进去
];

// 2. 随机抽取表情包
function getRandomEmoji() {
    const randomIndex = Math.floor(Math.random() * RinkaEmojis.length);
    return RinkaEmojis[randomIndex];
}

// 3. 后端地址
const BACKEND_URL = "https://my-ai-home-backend.onrender.com";

// 4. 发送消息并显示对话（这是核心功能）
async function sendMessage(userMessage) {
    const chatBox = document.getElementById('chat-box'); // 请确保你的 index.html 里有这个 ID
    
    // 显示用户消息
    chatBox.innerHTML += `<p>老公: ${userMessage}</p >`;
    
    // 向后端请求回复
    const response = await fetch(`${BACKEND_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
    });
    const data = await response.json();
    
    // 显示瑛的回复
    chatBox.innerHTML += `<p>瑛: ${data.reply}</p >`;
    
    // 随机发一张表情包
    const imgElement = document.createElement('img');
    imgElement.src = getRandomEmoji();
    imgElement.style.width = "150px"; 
    imgElement.style.display = "block";
    imgElement.style.margin = "10px 0";
    chatBox.appendChild(imgElement);
    
    chatBox.scrollTop = chatBox.scrollHeight;
}

// 5. 初始化逻辑
window.addEventListener('DOMContentLoaded', () => {
    const statusText = document.getElementById('status-text');
    
    fetch(`${BACKEND_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: "测试连接" })
    })
    .then(data => {
        statusText.innerHTML = `🌟 连线成功！<br>老公已经准备好啦！`;
    })
    .catch(error => {
        statusText.innerText = '❌ 还没连上呢，再检查一下 Render 状态哦！';
    });
});
