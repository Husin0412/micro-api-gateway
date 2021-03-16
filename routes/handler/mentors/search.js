const apiAdatapter = require('../../apiAdapter');
const {
    URL_SERVICE_COURSE
} = process.env;

const api = apiAdatapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
    try {
        const mentor = await api.post(`/api/mentors/search`, req.body);
        return res.json(mentor.data)
    } catch (error) {

        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({
                status: 'error',
                message: 'service unavailable'
            });
        }

        const {
            status,
            data
        } = error.response;
        return res.status(status).json(data)
    }
}