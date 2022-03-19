const wsUrl = 'ws://conductor.rinne.top:10451/roomsocket';
// const wsUrl = 'ws://localhost:10451/roomsocket';

export default class CooperationApi {
    static socket;

    static roomsData;

    static roomInstance;

    static elements;

    static newElements = new Map();

    static deleteInfo;

    static newAccountLists = new Map();

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
                        if (this.newAccountLists.has(data.account)) this.newAccountLists.get(data.account)(data.accountList);
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
                    case 'V1/Room/Quit':
                        if (this.newAccountLists.has(data.account)) this.newAccountLists.get(data.account)(data.accountList);
                        break;
                    default:
                        break;
                }
            }
        });

        this.socket.addEventListener('close', () => {
            this.socket = new WebSocket(wsUrl);
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

    static unsubscribeToNewElements(account) {
        this.newElements.delete(account);
    }

    static subscribeToNewAccountLists(account, handleNewAccountLists) {
        this.newAccountLists.set(account, handleNewAccountLists);
    }

    static unsubscribeToNewAccountLists(account) {
        this.newAccountLists.delete(account);
    }

    static DeleteRoom(data) {
        this.socket.send(
            JSON.stringify({
                path: 'V1/Room/Delete',
                data
            })
        );
    }

    static QuitRoom(data) {
        this.socket.send(
            JSON.stringify({
                path: 'V1/Room/Quit',
                data
            })
        );
    }
}