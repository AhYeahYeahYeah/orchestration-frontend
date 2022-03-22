const wsUrl = 'ws://conductor.rinne.top:10451/roomsocket';
// const wsUrl = 'ws://localhost:10451/roomsocket';

export default class CooperationApi {
    static socket;

    static roomsData = new Map();

    static roomInstance = new Map();

    static newElements = new Map();

    static deleteInfo = new Map();

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
                        if (this.roomInstance.has(data.account)) this.roomInstance.get(data.account)(data);
                        break;
                    case 'V1/Room/Query':
                        // this.roomsData = data;
                        console.log(data);
                        if (this.roomsData.has(data.data.account)) this.roomsData.get(data.data.account)(data.data.rooms);
                        // this.roomInstance = data;
                        break;
                    case 'V1/Data/Edit':
                        // this.elements = data;
                        // console.log(data.flow);
                        if (this.newElements.has(data.data.account)) this.newElements.get(data.data.account)(data.data.flow);
                        break;
                    case 'V1/Room/Delete':
                        // this.elements = data;
                        console.log(data);
                        // console.log(this.deleteInfo);
                        if (this.deleteInfo.has(data.account)) this.deleteInfo.get(data.account)(data);
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

    static subscribeToRoomData(account, handleRoomData) {
        this.roomsData.set(account, handleRoomData);
    }

    static unsubscribeToRoomData(account) {
        this.roomsData.delete(account);
    }

    static subscribeToDeleteInfo(account, handleDeleteInfo) {
        this.deleteInfo.set(account, handleDeleteInfo);
    }

    static unsubscribeToDeleteInfo(account) {
        this.deleteInfo.delete(account);
    }

    static subscribeToRoomInstance(account, handleRoomInstance) {
        this.roomInstance.set(account, handleRoomInstance);
    }

    static unsubscribeToRoomInstance(account) {
        this.roomInstance.delete(account);
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
