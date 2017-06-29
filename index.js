const dgram = require('dgram');

const ByteKingClient = {
    api_key: '',
    transport_type: 'upd',
    port: 41452,
    host: '127.0.0.1',

    transport_client: null,

    send: function(type, data) {
        if(ByteKingClient.client === undefined) {
            ByteKingClient.client = dgram.createSocket('udp4');
        }
        const message = ByteKingClient._prepareData(type, data);
        ByteKingClient.client.send(message, 0, message.length, ByteKingClient.port, ByteKingClient.host, (err) => {
            //ByteKingClient.client.close();
        });
    },
    setParams: function(api, host_param, port_param, transport) {
        ByteKingClient.api_key = api;
        ByteKingClient.transport_type = transport || 'upd';
        ByteKingClient.port = port_param || 41452;
        ByteKingClient.host = host_param || '127.0.0.1';
    },
    _prepareData: function(data_type, data) {
        "use strict";
        let message = {
            api_key: ByteKingClient.api_key,
            type: data_type,
            data: data
        };
        return new Buffer(JSON.stringify(message));
    }
};

module.exports = ByteKingClient;