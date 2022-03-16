import WebSocketAsPromised from 'websocket-as-promised';
const websocketRoot = process.env.REACT_APP_WS_ROOT;
export default class MatchAdmin {
  constructor(matchId) {
    this.matchId = matchId;
    this.websocketUrl = `${websocketRoot}/development/`;
    this.wsp = new WebSocketAsPromised(this.websocketUrl, {
      unpackMessage: m => JSON.parse(m).message,
      packMessage: m => JSON.stringify(m)
    });
    this.wsp.onError.addListener(e => console.log(e));
    this.wsp.onClose.addListener(e => console.log(e));
    this.wsp.onUnpackedMessage.addListener(message => {
      if (message.message && message.message.action === 'close') {
        this.wsp.close();
      }
    });
  }
  ping = () => {
    this.wsp.send('ping');
    setTimeout(this.ping, 40 * 1000);
  };
  onConnection(onMessageHandler) {
    this.wsp.onMessage.addListener(message => {
      const e = JSON.parse(message);
      if (e.message === 'Connected') {
        onMessageHandler(e.connectionId);
        setTimeout(this.ping, 40 * 1000);
      }
    });
  }
  onPointUpdate = onPointUpdateHandler => {
    this.wsp.onUnpackedMessage.addListener(message => {
      if (message.message && message.message.type === 'point') {
        if (message.message.action === 'add') {
          onPointUpdateHandler(
            message.message.value,
            message.message.participant
          );
        } else {
          onPointUpdateHandler(
            message.message.value * -1,
            message.message.participant
          );
        }
      }
    });
  };
  onTimerUpdate = onTimerUpdateHandler => {
    this.wsp.onUnpackedMessage.addListener(message => {
      console.log(message);
      if (message.message && message.message.type === 'timer') {
        if (message.message.action === 'add') {
          onTimerUpdateHandler(message.message.value);
        } else {
          onTimerUpdateHandler(message.message.value * -1);
        }
      }
    });
  };
  onAdvantageUpdate = onAdvantageUpdateHandler => {
    this.wsp.onUnpackedMessage.addListener(message => {
      console.log(message);
      if (message.message && message.message.type === 'advantage') {
        if (message.message.action === 'add') {
          onAdvantageUpdateHandler(1, message.message.participant);
        } else {
          onAdvantageUpdateHandler(-1, message.message.participant);
        }
      }
    });
  };
  onAdvantageUpdate = onAdvantageUpdateHandler => {
    this.wsp.onUnpackedMessage.addListener(message => {
      console.log(message);
      if (message.message && message.message.type === 'advantage') {
        if (message.message.action === 'add') {
          onAdvantageUpdateHandler(1, message.message.participant);
        } else {
          onAdvantageUpdateHandler(-1, message.message.participant);
        }
      }
    });
  };
  onPenaltyUpdate = onPenaltyUpdateHandler => {
    this.wsp.onUnpackedMessage.addListener(message => {
      console.log(message);
      if (message.message && message.message.type === 'penalty') {
        if (message.message.action === 'add') {
          onPenaltyUpdateHandler(1, message.message.participant);
        } else {
          onPenaltyUpdateHandler(-1, message.message.participant);
        }
      }
    });
  };
  onAdvantageUpdate = onAdvantageUpdateHandler => {
    this.wsp.onUnpackedMessage.addListener(message => {
      console.log(message);
      if (message.message && message.message.type === 'advantage') {
        if (message.message.action === 'add') {
          onAdvantageUpdateHandler(1, message.message.participant);
        } else {
          onAdvantageUpdateHandler(-1, message.message.participant);
        }
      }
    });
  };
  onReady = onReadyHandler => {
    this.wsp.onUnpackedMessage.addListener(message => {
      if (message.message && message.message.action === 'ready') {
        onReadyHandler();
      }
    });
  };
  onStart = onStartHandler => {
    this.wsp.onUnpackedMessage.addListener(message => {
      if (message.message && message.message.action === 'start') {
        onStartHandler();
      }
    });
  };
  onStop = onStopHandler => {
    this.wsp.onUnpackedMessage.addListener(message => {
      if (message.message && message.message.action === 'stop') {
        onStopHandler(message.message.time);
      }
    });
  };
  onResume = onResumeHandler => {
    this.wsp.onUnpackedMessage.addListener(message => {
      if (message.message && message.message.action === 'resume') {
        onResumeHandler(message.message.time);
      }
    });
  };
  onClose = onCloseHandler => {
    this.wsp.onUnpackedMessage.addListener(message => {
      if (message.message && message.message.action === 'close') {
        onCloseHandler();
      }
    });
  };
  onEnd = onEndHandler => {
    this.wsp.onUnpackedMessage.addListener(message => {
      if (message.message && message.message.action === 'end') {
        onEndHandler();
      }
    });
  };
  onWin = onWinnerHandler => {
    this.wsp.onUnpackedMessage.addListener(message => {
      if (message.message && message.message.action === 'win') {
        onWinnerHandler(message.message.participant, message.message.by);
      }
    });
  };

  advantage = participant => {
    this.send({
      action: 'sendMessage',
      matchId: this.matchId,
      message: {
        type: 'advantage',
        action: 'add',
        participant: participant
      }
    });
  };
  disadvantage = participant => {
    this.send({
      action: 'sendMessage',
      matchId: this.matchId,
      message: {
        type: 'advantage',
        action: 'subtract',
        participant: participant
      }
    });
  };
  penalize = participant => {
    this.send({
      action: 'sendMessage',
      matchId: this.matchId,
      message: {
        type: 'penalty',
        action: 'add',
        participant: participant
      }
    });
  };
  depenalize = participant => {
    this.send({
      action: 'sendMessage',
      matchId: this.matchId,
      message: {
        type: 'penalty',
        action: 'subtract',
        participant: participant
      }
    });
  };
  addPoints = (participant, points) => {
    this.send({
      action: 'sendMessage',
      matchId: this.matchId,
      message: {
        type: 'point',
        action: 'add',
        value: points,
        participant: participant
      }
    });
  };
  subtractPoints = (participant, points) => {
    this.send({
      action: 'sendMessage',
      matchId: this.matchId,
      message: {
        type: 'point',
        action: 'subtract',
        value: points,
        participant: participant
      }
    });
  };
  subtractFromTimer = seconds => {
    this.send({
      action: 'sendMessage',
      matchId: this.matchId,
      message: {
        type: 'timer',
        action: 'subtract',
        value: seconds
      }
    });
  };
  addToTimer = seconds => {
    this.send({
      action: 'sendMessage',
      matchId: this.matchId,
      message: {
        type: 'timer',
        action: 'add',
        value: seconds
      }
    });
  };
  ready = () => {
    this.send({
      action: 'sendMessage',
      matchId: this.matchId,
      message: {
        action: 'ready'
      }
    });
  };
  startMatch = () => {
    this.send({
      action: 'sendMessage',
      matchId: this.matchId,
      message: {
        action: 'start'
      }
    });
  };
  stopMatch = atTime => {
    this.send({
      action: 'sendMessage',
      matchId: this.matchId,
      message: {
        action: 'stop',
        time: atTime
      }
    });
  };
  resumeMatch = fromTime => {
    this.send({
      action: 'sendMessage',
      matchId: this.matchId,
      message: {
        action: 'resume',
        time: fromTime
      }
    });
  };
  endMatch = () => {
    this.send({
      action: 'sendMessage',
      matchId: this.matchId,
      message: {
        action: 'end'
      }
    });
  };
  declareWinner = (participant, by) => {
    this.send({
      action: 'sendMessage',
      matchId: this.matchId,
      message: {
        action: 'win',
        participant,
        by
      }
    });
  };
  close = () => {
    this.send({
      action: 'sendMessage',
      matchId: this.matchId,
      message: {
        action: 'close'
      }
    });
  };
  send(message) {
    this.wsp.sendPacked(message);
  }
  async init() {
    await this.wsp.open();
  }
}
