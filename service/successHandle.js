const successHandle = (res, data) => {
    res.send({
        status: 'success',
        data
    }).end();
}

module.exports = successHandle;