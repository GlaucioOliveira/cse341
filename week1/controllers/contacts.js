const getAll = async (req, res) => {

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Melissa Oliveira');
};

module.exports = { getAll };
