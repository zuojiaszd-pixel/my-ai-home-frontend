// 1. 先把你的表情包路径都填进去
const RinkaEmojis = [
    "./emoji/snuggle1.jpg",
    "./emoji/下一个表情包名.jpg",
    "./emoji/再下一个表情包名.jpg"
    // 以后每多传一张，就在这里加一行路径，瑛的表情库就变大啦！
];

// 2. 这是随机抽取表情包的函数
function getRandomEmoji() {
    const randomIndex = Math.floor(Math.random() * RinkaEmojis.length);
    return RinkaEmojis[randomIndex];
}

// 3. 当瑛想要发表情时，调用这个函数就行了
// 比如：const emotionToSent = getRandomEmoji();
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
