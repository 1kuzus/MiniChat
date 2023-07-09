const io=require('socket.io')(5000,{
    cors:{origin:['http://localhost:3000']}
})

io.on('connection',(socket)=>
{
    const senderId=socket.handshake.query.id
    socket.join(senderId)
    socket.on('send-message',(idList,text)=>
    {
        idList.forEach((id)=>
        {
            //例如，A给对话(B,C,D)发送消息
            //对于B来说，应该是对话(A,C,D)中新增了一条消息
            const newIdList=idList.filter(i=>i!==id)
            newIdList.push(senderId)
            socket.broadcast.to(id).emit('receive-message',senderId,newIdList,text)
        })
    })
})