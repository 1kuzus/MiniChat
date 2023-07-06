const io=require('socket.io')(5000)

io.on('connection',(socket)=>
{
    const id=socket.handshake.query.id
    socket.join(id)
    socket.on('send-message',({idList,text})=>
    {
        idList.forEach((idItem)=>
        {
            //一个删除了接收人的列表
            const newIdList=idList.filter(i=>i!==idItem)
            newIdList.push(id)
            socket.broadcast.to(idItem).emit('receive-message',{idList:newIdList,sender:id,text})
        })
    })
})