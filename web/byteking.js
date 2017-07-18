const ByteKingClient = {
    api_key: '',

    socket: null,

    send: function(type, data) {
        const message = ByteKingClient._prepareData(type, data);
        ByteKingClient.socket.emit('message', message);
    },
    setParams: function(api, url) {
        ByteKingClient.socket = io.connect(url);
        ByteKingClient.api_key = api;
    },
    _prepareData: function(data_type, data) {
        var message = {
            api_key: ByteKingClient.api_key,
            type: data_type,
            data: data
        };
        return JSON.stringify(message);
    }
};
