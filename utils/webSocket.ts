type WebSocketProps = {
  current
}

const connect = (ws: WebSocketProps) => {
  ws.current = new WebSocket('ws://localhost:4000/')
  ws.current.onopen = () => console.log('Game start...')

  ws.current.onclose = function (e) {
    console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason)
    setTimeout(function () {
      connect(ws)
    }, 1000)
  }

  ws.current.onerror = function (err) {
    console.error('Socket encountered error: ', err.message, 'Closing socket')
    ws.current.close()
  }
}

export default connect
