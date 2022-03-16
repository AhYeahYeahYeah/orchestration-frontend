const wsUrl = 'ws://conductor.rinne.top:10451/roomsocket';

export default class CooperationApi {
    static socket;

    static roomsData;

    static roomInstance;

    static elements;

    static newElements = new Map();

    static deleteInfo;

    static connectionWebServer(account, token) {
        this.socket = new WebSocket(`${wsUrl}/${account}`);
        // Open
        this.socket.addEventListener('open', () => {
            this.socket.send(
                JSON.stringify({
                    path: 'V1/Auth/Connect',
                    data: {
                        account,
                        token
                    }
                })
            );
            // this.socket.send(
            //     JSON.stringify({
            //         path: 'V1/Room/Query',
            //         data
            //     })
            // );
        });
        this.socket.addEventListener('message', (event) => {
            if (event.data !== '连接成功') {
                const data = JSON.parse(event.data);
                switch (data.path) {
                    case 'V1/Room/Join':
                        this.roomInstance = data;
                        break;
                    case 'V1/Room/Query':
                        this.roomsData = data;
                        break;
                    case 'V1/Data/Edit':
                        // this.elements = data;
                        // console.log(data.flow);
                        if (this.newElements.has(data.data.account)) this.newElements.get(data.data.account)(data.data.flow);
                        break;
                    case 'V1/Room/Delete':
                        // this.elements = data;
                        // console.log(data.flow);
                        this.deleteInfo = data;
                        break;
                    default:
                        break;
                }
            }
        });
    }

    static CreateRoom(data) {
        this.socket.send(
            JSON.stringify({
                path: 'V1/Room/Create',
                data
            })
        );
    }

    static JoinRoom(data) {
        this.socket.send(
            JSON.stringify({
                path: 'V1/Room/Join',
                data
            })
        );
    }

    static QueryRoom(data) {
        this.socket.send(
            JSON.stringify({
                path: 'V1/Room/Query',
                data
            })
        );
    }

    static EditData(data) {
        // console.log(data);
        this.socket.send(
            JSON.stringify({
                path: 'V1/Data/Edit',
                data
            })
        );
    }

    static subscribeToNewElements(account, handleNewElements) {
        this.newElements.set(account, handleNewElements);
    }

    static DeleteRoom(data) {
        this.socket.send(
            JSON.stringify({
                path: 'V1/Room/Delete',
                data
            })
        );
    }
}
